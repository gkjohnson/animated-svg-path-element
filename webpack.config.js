const path = require('path')

// TODO: Fix this config so it properly loads node_modules
// for some reason wc-loader doesn't seem to be loading polkmer
module.exports = {
    entry: path.resolve(__dirname, 'example/build.html'),

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'example')
    },

    resolve: {
        modules: [ 'node_modules' ]
    },

    module: {
        rules: [
        {
            test: /\.js$/,
            use: 'babel-loader'
        },
        {
            test: /\.html$/,
            use: [{ loader: 'babel-loader' }, { loader: 'wc-loader' }]
        }]
    }
}