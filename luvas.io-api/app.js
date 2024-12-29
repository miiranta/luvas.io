const express = require('express');
const cors = require('cors');

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

// Angular index (production)
if (productionMode) {

    app.use(express.static( __dirname + '/../luvas.io-app/dist/luvas.io-app/browser/'));
    app.get('/*', (req, res) => {
        res.sendFile("index.html", {"root": __dirname + '/../luvas.io-app/dist/luvas.io-app/browser/'} );
    }
    );

    app.listen(8080, () => console.log('Server started on port 8080 (PROD)'));
}

// Angular index (development)
else {

    app.listen(4201, () => console.log('Server started on port 4201 (DEV)'));
    
}