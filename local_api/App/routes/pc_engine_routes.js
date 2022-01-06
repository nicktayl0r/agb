module.exports = function(app) {
	app.get("/pc_engine_dist/:filename", (req, res) => {
		res.redirect("/node_modules/@is3d/playcanvasengine/"+req.params.filename);
	});
}