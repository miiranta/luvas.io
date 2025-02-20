let oreons_contacts_map = {
    'localhost': [
        {
            id: 0,
            name: 'John Doe',
            phone: '123-456-7890',
            address: '1234 Main St, City, State 12345'
        },
    ]
}

function api_oreons_contacts(app) {

    // GET Contacts
    app.get('/api/oreons/contacts', (req, res) => {

        // Get the hostname
        const hostname = req.ip;

        // Hostname exists in the map
        if (!(hostname in oreons_contacts_map)) {
            // Add the hostname to the map
            oreons_contacts_map[hostname] = [];
        }

        // Send JSON
        res.json(oreons_contacts_map[hostname]);
    });

    // ADD Contact
    app.post('/api/oreons/contacts', (req, res) => {
        // Get the hostname
        const hostname = req.ip;

        // Hostname exists in the map
        if (!(hostname in oreons_contacts_map)) {
            // Add the hostname to the map
            oreons_contacts_map[hostname] = [];
        }

        // Parse body
        let name = req.body.name;
        let phone = req.body.phone;
        let address = req.body.address;

        // Validate
        if (!name) {name = 'Unknown';}
        if (!phone) {phone = '';}
        if (!address) {address = '';}

        // Create the contact
        const biggest_id = oreons_contacts_map[hostname].reduce((acc, curr) => {
            return Math.max(acc, curr.id);
        }, 0);
        req.body = {
            id: biggest_id + 1,
            name: name,
            phone: phone,
            address: address
        };

        // Add the contact
        oreons_contacts_map[hostname].push(req.body);

        // Send JSON
        res.json(oreons_contacts_map[hostname]);
    });

    // EDIT Contact
    app.put('/api/oreons/contacts/:id', (req, res) => {
        // Get the hostname
        const hostname = req.ip;

        // Hostname exists in the map
        if (!(hostname in oreons_contacts_map)) {
            // Add the hostname to the map
            oreons_contacts_map[hostname] = [];
        }

        // Parse body
        let name = req.body.name;
        let phone = req.body.phone;
        let address = req.body.address;

        // Validate
        if (!name) {name = 'Unknown';}
        if (!phone) {phone = '';}
        if (!address) {address = '';}

        // Get the contact
        const contact_id = parseInt(req.params.id);
        const contact = oreons_contacts_map[hostname].find((contact) => {
            return contact.id === contact_id;
        });

        // Contact exists
        if (contact) {
            contact.name = name;
            contact.phone = phone;
            contact.address = address;
        }

        // Send JSON
        res.json(oreons_contacts_map[hostname]);

    });

    // DELETE Contact
    app.delete('/api/oreons/contacts/:id', (req, res) => {
        // Get the hostname
        const hostname = req.ip;

        // Hostname exists in the map
        if (!(hostname in oreons_contacts_map)) {
            // Add the hostname to the map
            oreons_contacts_map[hostname] = [];
        }

        // Get the contact
        const contact_id = parseInt(req.params.id);
        const contact_index = oreons_contacts_map[hostname].findIndex((contact) => {
            return contact.id === contact_id;
        });

        // Contact exists
        if (contact_index >= 0) {
            oreons_contacts_map[hostname].splice(contact_index, 1);
        }

        // Send JSON
        res.json(oreons_contacts_map[hostname]);
    });

}

export default api_oreons_contacts;