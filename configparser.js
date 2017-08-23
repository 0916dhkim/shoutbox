const fs = require('fs');
const configPath = 'shoutbox.config.json';
const defaultConfigPath = configPath + '.default';

var ret = {};

try {
    // Check read access to default config file.
    fs.accessSync(defaultConfigPath, fs.constants.R_OK);

    // Read default config file.
    var defaultConfig = JSON.parse(fs.readFileSync(defaultConfigPath));

    var customConfig = undefined;
    try {
        // Check read access to custom config file.
        fs.accessSync(configPath, fs.constants.R_OK);

        // Read custom config file.
        customConfig = JSON.parse(fs.readFileSync(configPath));

        // Override with custom config.
        for (var conf in defaultConfig) {
            if (customConfig[conf] === undefined) {
                // If there is no custom config,
                // use default value.
                ret[conf] = defaultConfig[conf];
            } else {
                // If there is custom config,
                // use custom value.
                ret[conf] = customConfig[conf];
            }
        }
    } catch (e) {
        // If there is no custom config file,
        // use default.
        ret = defaultConfig;
    }

} catch (e) {
    // If there is no default config file,
    console.log('Default configuration read fail');
    // Exit.
    process.exit(1);
}

module.exports = ret;
