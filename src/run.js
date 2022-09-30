const fs              = require('fs');
const https           = require('https');
const path            = require('path');
const express         = require('express');
const helmet          = require('helmet')
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

const publicDirectory = path.join(__dirname, "../public") 
const pagesDirectory = path.join(__dirname, "../pages")
const sslDirectory = path.join(__dirname, "../ssl")

const app = express();
const httpsport = 443;
const httpport  = 80;

app.use(express.static(publicDirectory))
app.use(redirectToHTTPS([], [], 301));
app.use(helmet())
 
app.get('/*', (req, res) => {
  res.sendFile(pagesDirectory + "/index.html")
})

var httpsOptions = {
  key: fs.readFileSync(sslDirectory + '/privkey.pem'),
  cert: fs.readFileSync(sslDirectory + '/cert.pem'),
};

//Listen to http and redirect to https
app.listen(httpport);

//Listen to https
https.createServer(httpsOptions, app).listen(httpsport, () => {
  console.log(`Server is up on port ${httpsport}!`);
});


