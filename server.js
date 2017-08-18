const express = require('express');
const app = express();
const config = require('./configparser.js');
const chatdb = require('./chatdb.js');

// Serve static resources.
app.use(express.static('dist'));
app.use(express.static('static'));

app.get('/messages/since/date/:date', (req, res) => {
    chatdb.getMessagesSince(req.params.date, (err, messages) => {
        if (err) {
            // Return internal server error code if query fails.
            res.sendStatus(500);
        } else {
            res.send(JSON.stringify(messages));
        }
    });
});

app.listen(config.portNum, () => { console.log('Shoutbox listening on port ' + config.portNum) });
