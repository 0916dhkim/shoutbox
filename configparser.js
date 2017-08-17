const fs = require('fs');
const configPath = 'shoutboxconfig.json';

module.exports = JSON.parse(fs.readFileSync(configPath));
