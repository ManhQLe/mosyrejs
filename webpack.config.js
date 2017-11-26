const path = require('path');

module.exports = {
    entry: './src/mar3/index.js',
    output: {
        path: path.join(__dirname, 'build/mar3'),
        filename: 'mar3.min.js'
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