const apiRoutes = require('./api_routes');
const projectRoutes = require('./project_routes');
const rubricRoutes= require('./rubric_routes');
const pc_engineRoutes = require('./pc_engine_routes');

module.exports = function(app) {
    apiRoutes(app);
    projectRoutes(app);
    // Other route groups could go here later
    rubricRoutes(app);
    pc_engineRoutes(app);
}