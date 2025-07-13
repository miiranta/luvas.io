var app = require('./app.js');

console.log('Starting server...');

// Simple HTTP server - SSL handled by nginx proxy
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});