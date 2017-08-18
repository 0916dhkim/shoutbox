const fs = require('fs');
const configPath = 'shoutbox.config.json';

module.exports = JSON.parse(fs.readFileSync(configPath));
