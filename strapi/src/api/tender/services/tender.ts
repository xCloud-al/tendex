/**
 * tender service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::tender.tender', ({ strapi }) => ({
    async getTendersCount() {
        try {
            let tendersCount = await strapi.documents('api::tender.tender').count({})
            return {
                tendersCount
            }
        } catch (error) {
            throw new Error(`Error fetching published articles count: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}));
