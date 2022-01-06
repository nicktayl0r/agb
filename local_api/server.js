const project = require("../project/config/project.json");
const setTitle = require("node-bash-title");
if (project != undefined)
	setTitle(
		"⚒️" + project.name + " - " + project.version + " Project Editor ⚒️",
	);
else setTitle("🍻  Server");
//initalize npm/webpack for app preview
//go to parent project directory and 'webpack-dev-server'

const express = require("express");
// const MongoClient = require('mongodb').MongoClient;
const bodyParser = require("body-parser");
// const db = require('./config/db');
const commands = require("./utils/commandHelper");

const app = express();

let port = process.env.PROJECT_PORT | 8000;

async function runServer() {
	await commands.getGitVersions();

	app.use(bodyParser.json({ limit: "500mb" }));
	app.use(bodyParser.urlencoded({ extended: true }));
	// app.use('player_dist/data/', express.static('../project/config/'));
	// app.use('player_dist/data/pages/', express.static('../project/pages/'));
	app.use(express.static("../project/"));
	app.use(express.static("../"));
	app.use(express.static("./"));

	require("./App/routes")(app);

	if (app.get("env") === "development") {
		const webPackMiddleware = require("webpack-dev-middleware");
		const webpack = require("webpack");

		const config = require("./webpack-preview.config");

		app.use(
			webPackMiddleware(webpack(config), {
				publicPath: config.output.publicPath,
				watchOptions: {
					aggregateTimeout: 5000,
				},
				//writeToDisk: true			//uncomment to output CSS in preview/assets
			}),
		);

		console.log("publicPath: " + config.output.publicPath);
	}

	app.listen(port, function () {        
        console.log("We are live on " + port);
    })
    .on('error', function (err) {
        if (err.code === 'EADDRINUSE') {
            port++; 
            console.log('Address in use, retrying on port ' + port);
            setTimeout(function () {
                app.listen(port);
            }, 250);
        }

    });
}

process.env.PROJECT_PORT= port;

runServer();

