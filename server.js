const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./configparser.js');
const chatdb = require('./chatdb.js');

// Serve static resources.
app.use(express.static('dist'));
app.use(express.static('static'));

// Use JSON body parser.
app.use(bodyParser.json());

app.get('/messages/since/date/:date', (req, res) => {
    chatdb.getMessagesSinceDate(req.params.date, (err, messages) => {
        sendMessages(err, messages, res);
    });
});

app.get('/messages/since/id/:id', (req, res) => {
    chatdb.getMessagesSinceID(req.params.id, (err, messages) => {
        sendMessages(err, messages, res);
    });
});

app.post('/message', (req, res) => {
    chatdb.addMessage(req.body, err => {
        if (err) {
            // Return internal server error code if error occurs.
            res.sendStatus(500);
        } else {
            // Return OK.
            res.sendStatus(200);
        }
    });
});

app.listen(config.portNum, () => { console.log('Shoutbox listening on port ' + config.portNum) });

function sendMessages(err, messages, res) {
    if (err) {
        // Return internal server error code if error occurs.
        res.sendStatus(500);
    } else {
        // Stringify message array and send it.
        res.send(JSON.stringify(messages));
    }
}
