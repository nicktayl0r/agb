var fs = require("fs");
const path = require("path");

module.exports = function(app) {
	const projectPath = path.join(".", "..", "project");
	const rubricConfigPath = path.join(projectPath, "config", "rubrics.json");
	/* 
		Route: /api/rubrics
		Request: GET
		Response_OK: status [200], body [{project.json file data}]
		Response_FAIL: status [400], body ['error message']
		*/
	app.get("/api/rubrics", (req, res) => {
		fs.access(rubricConfigPath, err => {
			//is project.json accessible?
			if (err) {
				//if any problem getting project.json
				console.log(
					"API:GET:[/api/rubrics/] error getting " +
						rubricConfigPath +
						", error: " +
						err,
				);
				res.status(400);
				res.send("error getting " + rubricConfigPath + ", error: " + err);
			} else {
				//project.json accessible
				console.log(
					"API:GET:[/api/rubrics/] found project file: " + rubricConfigPath,
				);
				fs.readFile(rubricConfigPath, "utf8", (err, data) => {
					//get the file contents
					if (err) {
						res.status(400);
						res.send("error reading " + rubricConfigPath + ", error: " + err);
					} else {
						//convert file text to JSON
						console.log(
							"API:GET:[/api/rubrics/] success reading project file: " +
								rubricConfigPath,
						);
						fileData = JSON.parse(data);
						//return JSON
						res.status(200);
						res.send(fileData);
					}
				});
			}
		});
	});

	/* 
    Route: /api/rubrics
    Request: POST, header [content-type= application/json], body [json of the project]
    Response_OK: status [200], body ['success message']
    Response_FAIL: status [400], body ['error message']
    */
   app.post("/api/rubrics", (req, res) => {
	//write contents to a project file
	console.log(
		"API:POST:[/api/rubrics/] project data to write: " +
			JSON.stringify(req.body),
	);
	//run validation test?
	if (req.body != "undefined") {
		fs.writeFile(
			rubricConfigPath,
			JSON.stringify(req.body, null, "\t"),
			function(err) {
				if (err) {
					res.status(400);
					res.send("error writing project file. error: " + err);
					console.log(
						"API:POST:[/api/rubrics/] error writing project file. error: " +
							err,
					);
				} else {
					res.status(200);
					res.send(rubricConfigPath + " created successfully.");
					console.log(
						"API:POST:[/api/rubrics/] The file was saved to: " +
							rubricConfigPath,
					);
				}
			},
		);
	} else {
		res.status(400);
		res.send(
			"API:POST:[/api/rubrics/] Request body is empty, ignoring save.",
		);
	}
});
}