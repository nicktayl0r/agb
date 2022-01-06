const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env = {}) => {
	return {
		entry: {
			projectEditor: "./src/index.ts",
			jsoneditor: "./src/jsonEditor/jsoneditor.js",
			rubricEditor: "./src/rubricIndex.ts"
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: "ts-loader",
					exclude: /node_modules/
				},
				{
					test: /\.(json)$/,
					enforce: "pre",
					loader: "string-replace-loader",
					query: {
						search: '"\\$ref": "(.*?)"', //look for "$ref": "./pathtoschema.json"
						replace: '"$ref": "require(\'$1\')"', //replace with "$ref": "require('./pathtoschema.json')"
						flags: "g" //search the whole file for matches
					}
				},
				{
					test: /\.(json)$/,
					loader:
						"url-loader?limit=10&name=[path][name].[ext]!nested-require-loader?rawString=true"
				}
			]
		},
		plugins: [
			new CopyWebpackPlugin(
				[
					{ 
						from : "../static",
						to: "../",
						ignore: ["**/README.md"],
					},
					{ from: "./src/jsonEditor/default.css", to: "./jquery.sceditor.default.css" }
				]
			),
		],
		resolve: {
			extensions: [".tsx", ".ts", ".js", ".json"]
		},
		output: {
			filename: "[name].min.js",
			path: path.resolve(__dirname, "../dist/jsonEditor")
		},
		devServer: {
			contentBase: "../dist/jsonEditor"
		}
	};
};
