/**
 * automatic-evaluation controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::automatic-evaluation.automatic-evaluation', ({ strapi }) => ({
    async create(ctx: any) {
        return await strapi.service('api::automatic-evaluation.automatic-evaluation').createAutomaticEvaluation(ctx);
    }
}));
