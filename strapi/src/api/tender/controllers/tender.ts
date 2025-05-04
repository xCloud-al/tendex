/**
 * tender controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::tender.tender', ({ strapi }): {} => ({
    async getTendersCount(ctx: any) {
        return await strapi.service('api::tender.tender').getTendersCount(ctx);
    }
}));
