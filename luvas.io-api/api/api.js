const api_oreons_contacts = require('./api_oreons_contacts').default;

function api_routes(app) {

    // API Oreons Contacts
    api_oreons_contacts(app);
}

module.exports = api_routes;