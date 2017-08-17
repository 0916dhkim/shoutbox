const path = require('path');

module.exports = {
    entry: './src/main.jsx',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
	},
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }]
    },
    resolve: { modules: [path.join(__dirname, 'node_modules')] }
};
