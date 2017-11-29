const path = require('path');

module.exports = {
    entry: './src/mosyrejs/index.js',
    output: {
        path: path.join(__dirname, 'build/mosyrejs'),
        filename: 'mosyrejs.min.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['babel-preset-env']
            }
        }]
    }
}