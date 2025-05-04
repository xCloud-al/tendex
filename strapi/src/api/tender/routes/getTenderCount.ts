export default {
    routes: [
        {
            method: 'GET',
            path: '/tenders/count',
            handler: 'tender.getTendersCount',
            config: {
                auth: false
            }
        },
    ]
}