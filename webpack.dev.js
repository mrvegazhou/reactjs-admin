const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const paths = require('./config/paths');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        host: 'localhost',
        port: 3001,
        open: true,
        hot: true
    },
    resolve: {
        alias: {
            '@': paths.appSrc
        },
    }
})