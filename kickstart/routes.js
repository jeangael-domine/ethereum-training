// The require returns a function that is immediately called
const routes = require('next-routes')();

routes.add('/campaigns/new', '/campaigns/new')
    .add('/campaigns/:address', '/campaigns/show')
    .add('/campaigns/:campaignAddress/requests', '/campaigns/requests/index')
    .add('/campaigns/:campaignAddress/requests/new', '/campaigns/requests/new');

module.exports = routes;