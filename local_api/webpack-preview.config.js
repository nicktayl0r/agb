var path = require("path");
var cssFiles = require("./utils/helpers/previewHelper").findCss;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	// context: path.resolve('../project/assets'),
	entry: cssFiles(),
	output: {
		path: path.resolve("./preview/assets/"),
		filename: "./[name].css",
		publicPath: "/preview/assets/",
	},

	devServer: {
		contentBase: ["preview", __dirname],
		host: "0.0.0.0",
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'],
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				use: [
					{
						loader: "url-loader", //take src links and convert to base64 data if under limit, else use file-loader to put file @ outputPath, but change src to publicPath.
						options: {
							limit: 50000, //limit of 50K, if under limit then convert the file into base64 data and \embed in the html tag (ex: <img src="alsdfaweoradflsasewf203...">)
							outputPath: "assets/images", //where to put the final file if over limit, output.publicPath + assets/images
							publicPath: "assets/images", //what to have the src link be in the html file (ex: <img src= "../../assets/images/[filename]">)
						},
					},
				],
			},
			{
				test: /\.svg/,
				use: {
					loader: "svg-url-loader",
					options: {
						limit: 50000, //limit of 50K, if under limit then convert the file into base64 data and \embed in the html tag (ex: <img src="alsdfaweoradflsasewf203...">)
						outputPath: "assets/images", //where to put the final file if over limit, output.publicPath + assets/images
						publicPath: "assets/images", //what to have the src link be in the html file (ex: <img src= "../../assets/images/[filename]">)
					},
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: {
					loader: "file-loader",
					options: {
						outputPath: "assets/fonts", //where to put the final file if over limit, output.publicPath + assets/images
						publicPath: "assets/fonts", //what to have the src link be in the html file (ex: <img src= "../../assets/images/[filename]">)
					},
				},
			}
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "customCase",
			chunkFilename: "customCase.css",
			fallback: "style-loader",
		}),
	],
	optimization: {
		splitChunks: {
			cacheGroups: { //Extract CSS to single file: https://webpack.js.org/plugins/mini-css-extract-plugin/#extracting-all-css-in-a-single-file
				styles: {
					name: 'customCase_entry',
					test: /\.css$/,
					chunks: 'all',
					enforce: true,
				}
			}
		}
	},

	watch: true,
	watchOptions: {
		aggregateTimeout: 100,
	},
};
