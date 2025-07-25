const express = require('express');
const cors = require('cors');
const path = require('path');
const api_routes = require('./api/api.js');

var productionMode = false;
process.argv.forEach((val, index) => {
    // Is production "--prod"
    if (val === '--prod') {
        productionMode = true;
    }
});

// Express and middleware
const app = express();
app.use(cors());
app.use(express.json());

// API routes
api_routes(app);

// Angular index (production)
if (productionMode) {

    app.use(express.static( __dirname + '/../luvas.io-app/dist/luvas.io-app/browser/'));
    app.get('/*', (req, res) => {
        res.sendFile("index.html", {"root": __dirname + '/../luvas.io-app/dist/luvas.io-app/browser/'} );
    }
    );

    app.listen(process.env.PORT_PROD_API || 3000, () => console.log('Server started on port ' + (process.env.PORT_PROD_API || 3000) + ' (PROD)'));
}

// Angular index (development)
else {

    app.listen(process.env.PORT_DEV_API || 3001, () => console.log('Server started on port ' + (process.env.PORT_DEV_API || 3001) + ' (DEV)'));
    
}

module.exports = app;