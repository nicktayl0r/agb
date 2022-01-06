const _ = require('lodash')
const request = require('request-promise')

function PlayCanvasWebpackPlugin(options) {
    this.options = _.extend({
        files: {}
    }, options)
}

PlayCanvasWebpackPlugin.prototype.apply = function (compiler) {
    let options = this.options
    compiler.plugin('emit', (compilation, callback) => {
        try {
            if (options.skipUpload) {
                console.log("Skipping Upload")
                callback()
                return
            }
            Object.keys(compilation.assets)
                .forEach(key => {
                    let asset = compilation.assets[key]
                    if (!asset || !asset.children) return
                    let filename = options.files[key]
                    if (filename) {
                        if (!options.projects) {
                            throw new Error("No project, aborting " + filename.path)
                        }
                        if (!options.bearer) {
                            throw new Error("No bearer token, aborting")
                        }
                        options.projects
                            .forEach(projectID => {
                                console.log("Uploading " + filename.path + " to PlayCanvas")
                                let content = asset.children.map(c => c._value ? c._value : c).join('\n')
                                let req = request({
                                    uri: "https://playcanvas.com/api/projects/"+projectID+"/assets",
                                    method: 'GET',
                                    headers: {
                                        "Authorization": `Bearer ${options.bearer}`
                                    }
                                })
                                req.then((data) => {
                                    console.log("Got assets for project " + projectID)
                                    // console.log(data)

                                    var asset = JSON.parse(data)["result"].find(x => x.name === filename.path);
                                    if(asset) {
                                        var assetID = asset.id;

                                        let req = request({
                                            uri: "https://playcanvas.com/api/assets/"+assetID,
                                            method: 'PUT',
                                            headers: {
                                                "Authorization": `Bearer ${options.bearer}`
                                            }
                                        })
                                        let form = req.form()
                                        form.append("file", content, {
                                            filename: filename.path,
                                            contentType: "text/javascript"
                                        })
                                        req.then(() => {
                                            console.log("Upload complete for file " + filename.path + " with assetID " + assetID)
                                            callback()
                                        }, (e) => {
                                            console.error(e)
                                            compilation.errors.push(e)
                                            callback()
                                        })
                                    } else {
                                        console.log("No asset exists in project " + projectID + " with name " + filename.path)
                                        callback()
                                    }
                                }, (e) => {
                                    console.error(e)
                                    compilation.errors.push(e)
                                    callback()
                                })
                            }
                        );
                    }
                })
        } catch (e) {
            compilation.errors.push(e)
            callback()
        }
    })

}

module.exports = PlayCanvasWebpackPlugin
