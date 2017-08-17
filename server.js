const express = require('express');
const app = express();
const config = require('./configparser.js');
const chatdb = require('./chatdb.js');

// Serve static resources.
app.use(express.static('dist'));
app.use(express.static('static'));

app.listen(config.portNum, () => { console.log('Shoutbox listening on port ' + config.portNum) });
