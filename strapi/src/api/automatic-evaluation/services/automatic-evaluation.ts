/**
 * automatic-evaluation service
 */

import { factories } from '@strapi/strapi';
import {createPartFromUri, createUserContent, GoogleGenAI} from "@google/genai";
import path from "path";

export default factories.createCoreService('api::automatic-evaluation.automatic-evaluation', ({ strapi }) => ({
    async createAutomaticEvaluation(ctx: any) {
        const { tenderId } = ctx.request.body;

        const tender = await strapi.documents('api::tender.tender').findOne({
            documentId: tenderId,
            populate: ['documents', 'criteria_document']
        });

        const offers = await strapi.documents('api::offer.offer').findMany({
            filters: {
                tender: {
                    documentId: tenderId
                },
            },
            populate: ['documents', 'vendor'],
        });

        const evaluations = [];


        for (const offer of offers) {
            const ai = new GoogleGenAI({ apiKey: "AIzaSyDd7EPWsM1xXwkt0esVbt6u9FaCLKlbQHQ" });

            const evaluationDocument = await ai.files.upload({
                file: path.join(strapi.dirs.static.public, tender.criteria_document.url),
                config: {mimeType: tender.criteria_document.mime}
            });

            const offerDocuments = []

            for (const document of offer.documents) {
                const file = await ai.files.upload({
                    file: path.join(strapi.dirs.static.public, document.url),
                    config: { mimeType: document.mime }
                });

                offerDocuments.push(file);
            }

            const evaluationPart = createPartFromUri(evaluationDocument.uri, evaluationDocument.mimeType);
            const offerParts = offerDocuments.map((document) => createPartFromUri(document.uri, document.mimeType));

            const response = await ai.models.generateContent({
                model: "gemini-2.5-pro-exp-03-25",
                contents: createUserContent([
                    "Attached you will find the bidding details that are required to submit an offer for a procurement.",
                    evaluationPart,
                    "Below you will find the offer documents that were submitted by the vendor.",
                    "The logic is quite simple, extract all the eligibility criteria that are necessary to be qualified for the offer. " +
                    "If one of the criteria is missing, the offer should automatically be rejected. " +
                    "Do not create anything, just verify if the vendor passes the criteria.",
                    ...offerParts,
                    "Use the following details for a JSON response",
                    "overall_qualification_status (PASS or FAIL), missing_documents (array of strings with documents missing), criteria_verification which is an array of objects with the following fields: " +
                    "criteria_name, criteria_status, requirement_source, evidence_found",
                ])
            });

            const evaluation = this.safeJsonParse(
                response.text
                .trim()
                .replace(/^```json/, '')
                .replace(/```$/, '')
            );

            await strapi.documents('api::automatic-evaluation.automatic-evaluation').create({
                data: {
                    overall_qualification_status: evaluation.overall_qualification_status,
                    missing_documents: evaluation.missing_documents,
                    criteria_verification: evaluation.criteria_verification,
                },
                status: 'published'
            });

            evaluations.push({
                'offer': offer.documentId,
                'evaluation': evaluation,
            });
        }

        return evaluations;
    },

    safeJsonParse(jsonString: string) {
        try {
            return JSON.parse(jsonString);
        } catch (err) {
            const fixed = jsonString.replace(/:\s*"([^"]*?)(?<!\\)"([^"]*?)"/g, (match, p1, p2) => {
                return `: "${p1.replace(/"/g, '\\"')}${p2}"`;
            });

            try {
                return JSON.parse(fixed);
            } catch (e) {
                throw new Error("Invalid JSON and failed to auto-repair.");
            }
        }
    }
}));
