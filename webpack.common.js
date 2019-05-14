const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const path = require('path')

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve('./dist'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /^node_modules$/,
                use:[{
                    loader:'babel-loader',
                    options:{
                        presets:['react','env']
                    }
                }]
            },
            {
                test: /\.s(a|c)ss$/,
                use:[{
                        loader:'style-loader'
                    },{
                        loader:'postcss-loader',
                        options:{
                            presets:['@babel/preset-env']
                        }
                    }
                ]
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
        new HtmlWebPackPlugin({
            filename:'index.html',
            template: 'index.html',
            title: '输出管理'
        }),
        new ExtractTextPlugin('main.css'),
        new CleanWebpackPlugin()
    ]
}