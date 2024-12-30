var app = require('./app.js');

console.log('Starting server...');

require('greenlock-express')

.init({
    packageRoot: __dirname,

    // where to look for configuration
    configDir: './greenlock.d',

    // maintainer email
    maintainerEmail: 'lucasrezende12@hotmail.com',

    // whether or not to run at cloudscale
    cluster: false
})

.serve(app);