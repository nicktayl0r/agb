const webpack = require('webpack');
const path = require('path');
const configuration = require('./config.json');
const CopyWebpackPlugin = require("copy-webpack-plugin");


configuration.browsers = configuration.browsers || "> 1%";

module.exports = {
    entry: {
        'playcanvas-scripts': './main.js',
    },
    output: {
        path: path.resolve(__dirname, "..", 'dist'),
        filename: '[name].min.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
        new CopyWebpackPlugin(
            [
                { from: "./node_modules/babel-polyfill/dist/polyfill.min.js", to: "polyfill.min.js" }
            ]
        ),
    ],
    externals: {
        'babel-polyfill': 'window'// 'window._babelPolyfill ? window : window.importScripts("https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js")'
    },
    devtool: '#source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: [["babel-preset-env", {
                    "targets": {
                        "browsers": [configuration.browsers]
                    }
                }]]
            }
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader", options: {
                    sourceMap: true
                }
            }]
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader", options: {
                    sourceMap: true
                }
            }, {
                loader: "sass-loader", options: {
                    sourceMap: true
                }
            }]
        }, {
            test: /\.glsl$/,
            use: [{loader: 'raw-loader'}]
        }]
    }
};

