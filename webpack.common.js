const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src'); //__dirname 中的src目录，以此类推

module.exports = {
    entry: [
        'react-hot-loader/patch',
        './src/index.js'
    ],
    devtool: 'inline-source-map',
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /^node_modules$/,
                use: 'babel-loader',
                include: [APP_PATH]
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /^node_modules$/,
                use:ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader','sass-loader']}),
                include: [APP_PATH]
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "less-loader",
                            options: { javascriptEnabled: true }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg)$/,
                exclude: /^node_modules$/,
                use: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
                //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
                include: [APP_PATH]
            },
            {
                test: /\.jsx$/,
                exclude: /^node_modules$/,
                use: ['jsx-loader', 'babel-loader'],
                include: [APP_PATH]
            }
        ],
        // loaders: [
        //     { test: /\.js$/, loader: "jsx!babel", include: /src/},
        //     { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss")},
        //     { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!postcss!sass")},
        //     { test: /\.(png|jpg|gif)$/, loader: 'url?limit=819200'}
        // ]
    },
    // babel: {
    //     presets: ['es2015', 'stage-0', 'react'],
    //     plugins: ['transform-runtime', ['import', {
    //         libraryName: 'antd',
    //         style: 'css'
    //     }]]
    // },
    // postcss: [
    //     require('autoprefixer')    //调用autoprefixer插件,css3自动补全
    // ],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
            filename:'index.html',
            template: path.resolve('index.html'),
            title: '输出管理'
        }),
        new ExtractTextPlugin('main.css'),
        new CleanWebpackPlugin()
    ]
}