const webpack = require('webpack');
const path = require('path');
const PlayCanvasWebpackPlugin = require('./plugins/playcanvas-webpack-plugin/index');
const configuration = require('./config.json');

configuration.browsers = configuration.browsers || "> 1%";

module.exports = {
    entry: {
        main: './main.js',
    },
    output: {
        path: path.resolve(__dirname, "..", 'dist'),
        filename: 'playcanvas-scripts.dev.build.js'
    },
    plugins: [
        new PlayCanvasWebpackPlugin({
            skipUpload: process.env.UPLOAD === "no" || !configuration.bearer || configuration.bearer.length != 32,
            bearer: configuration.bearer,
            projects: configuration.projects,
            files: configuration.files || {
                "playcanvas-scripts.dev.build.js": {path: "playcanvas-scripts.dev.build.js", assetId: configuration.assetId}
            }
        })
    ],
    devtool: '#inline-source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: [["env", {
                    "targets": {
                        "browsers": [configuration.browsers]
                    }
                }]],
                plugins: ['transform-runtime']
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

