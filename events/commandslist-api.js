const client = require("../index");

const express = require('express')
const app = express()
const https = require('https');
const port = 3010;
const { readFileSync } = require("fs");

client.on("ready", async () => {

  app.get('/commandslist', (req, res) => {
     res.header("Access-Control-Allow-Origin", "*");
     res.contentType('application/json; charset=utf-8');
     res.send(JSON.stringify(client.commands));
	})
 
 https.createServer({
         key: readFileSync('./events/sslkeys/privkey.pem'),
         cert: readFileSync('./events/sslkeys/fullchain.pem'),
         passphrase: 'test1111'
     }, app)
     .listen(port);

});
