const fs                    = require('fs');
const https                 = require('https');
const path                  = require('path');
const express               = require('express');
const helmet                = require('helmet')
const cookieSession         = require("cookie-session")
const redirectToHTTPS       = require('express-http-to-https').redirectToHTTPS

const publicDirectory = path.join(__dirname, "../public");
const pagesDirectory = path.join(__dirname, "../pages");
const sslDirectory = process.env.SSLDIR;

const httpsOptions = {
  key: fs.readFileSync(sslDirectory + '/privkey.pem'),
  cert: fs.readFileSync(sslDirectory + '/cert.pem'),
};

const exp = express();
const server = https.createServer(httpsOptions, exp)
const httpsport = process.env.PORT_HTTPS;
const httpport  = process.env.PORT_HTTP;

exp.use(express.static(publicDirectory))
exp.use(redirectToHTTPS([], [], 301));
exp.use(helmet())
 
const session = cookieSession({
  name: 'session',
  keys: [process.env.SESSION_KEY_1, process.env.SESSION_KEY_1]
})

exp.get('/*', (req, res) => {
  res.sendFile(pagesDirectory + "/index.html")
})

//Listen to http and redirect to https
exp.listen(httpport);

//Listen to https
server.listen(httpsport, () => {
  console.log(`Server is up on port ${httpsport}!`);
});


