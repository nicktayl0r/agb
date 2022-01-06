
jQuery.noConflict();

var entityJSON = editor.call('entities:selection')[0].json();
console.log(entityJSON.components.model);
var entityModel = editor.call('assets:get', entityJSON.components.model.asset);
console.log(entityModel)
var entityModelFile = entityModel.get('file');

var modelMapping = entityModel.get('data.mapping')
console.log(modelMapping)

var entities

var modelURL = entityModelFile.url

jQuery.getJSON(modelURL, function(json) {
    console.log(json);
    var modelJSON = json.model;
    var entities = new Array(modelJSON.nodes.length);

    // create all entities
    for(var i = 0; i < modelJSON.nodes.length; i++) {
        var ent = editor.call('entities:new');
        if(i === 0) {
            ent.set('name', entityJSON.name)
        } else {
            ent.set('name', modelJSON.nodes[i].name)
        }
        console.log(ent.entity)
        entities[i] = ent
        var currentNode = modelJSON.nodes[i];
        ent.set('position', [ modelJSON.nodes[i].position[0], modelJSON.nodes[i].position[1], modelJSON.nodes[i].position[2]]);
        ent.set('rotation', [ modelJSON.nodes[i].rotation[0], modelJSON.nodes[i].rotation[1], modelJSON.nodes[i].rotation[2] ]);
        ent.set('scale',[ modelJSON.nodes[i].scale[0], modelJSON.nodes[i].scale[1], modelJSON.nodes[i].scale[2] ] )
        console.log(ent.entity)
    }

    var sceneRoot = editor.call('entities:root')
    console.log(sceneRoot)
    var sceneRootChildren = sceneRoot.get('children')
    console.log(sceneRootChildren)
    // reparant all entities to rebuild the hierarchy
    for(var i = 1; i < modelJSON.nodes.length; i++) {
        var ent = entities[i]
        editor.call('entities:addEntity', ent, entities[modelJSON.parents[i]])
        ent.set('parent', entities[modelJSON.parents[i]].get('resource_id'))

        var indexOfChild = sceneRootChildren.indexOf(ent.get('resource_id'))

        if(indexOfChild !== -1) {
            sceneRootChildren.splice(indexOfChild, 1)
        }
    }

    console.log(sceneRootChildren)

    sceneRoot.set('children', sceneRootChildren)

    for(var i = 0; i < modelJSON.nodes.length; i++) {
        var nodeMeshes = modelJSON.meshInstances.filter(x => x.node === i)

        console.log(nodeMeshes)

        if(nodeMeshes.length > 0)
        {
            editor.call('entities:addComponent', [entities[i]], 'model')

            var meshInstanceArray = []
            var meshesArray = []

            var verts = modelJSON.vertices[modelJSON.meshes[nodeMeshes[0].mesh].vertices]

            for(var j = 0; j < nodeMeshes.length; j++) {
                mesh = modelJSON.meshes[nodeMeshes[j].mesh]
                console.log(mesh)

                meshesArray = meshesArray.concat(
                [{
                    "aabb": mesh.aabb,
                    "vertices": 0,
                    "indices": mesh.indices,
                    "type": mesh.type,
                    "base": mesh.base,
                    "count": mesh.count
                }])

                meshInstanceArray = meshInstanceArray.concat(
                [{
                    "node": 0,
                    "mesh": j
                }])
            }

            var modelDef = {
                "model":
                {
                    "version": 3,
                    "nodes": [
                    {
                        "name": "RootNode",
                        "position": [0, 0, 0],
                        "rotation": [0, 0, 0],
                        "scale": [1, 1, 1],
                        "scaleCompensation": false
                    }],
                    "parents": [-1],
                    "skins": [],
                    "morphs": [],
                    "vertices": [verts],
                    "meshes": meshesArray,
                    "meshInstances": meshInstanceArray
                }
            }

            console.log(modelDef)

            var node = modelJSON.nodes[i]

            var asset = {
                name: node.name + '.json',
                type: 'model',
                source: false,
                preload: true,
                parent: editor.call('assets:panel:currentFolder'),
                filename: node.name + '.json',
                file: new Blob([ JSON.stringify(modelDef) ], { type: 'application/json' }),
                scope: {
                    type: 'project',
                    id: config.project.id
                }
            }

            var newMap = [modelMapping[nodeMeshes[0].mesh]]
            console.log(newMap)

            var bunchOfStuff = {
                map: newMap,
                nodeInt: i
            }

            editor.call('assets:create', asset, function(err, id) {

                console.log(id)
                onceAssetLoad(id, this, newMap)

            }.bind(bunchOfStuff), true);
        }
    }

    onceAssetLoad = function(id, stuff, map) {
        var target = editor.call('assets:get', id);
            
        if(target) {
            onceFileSet(target, id, stuff, map)
        } else { 
            editor.once('assets:add[' + id + ']', function(ass) {
                onceFileSet(ass, id, stuff, map)
            })
        }
    };

    onceFileSet = function(asset, id, stuff, map) {
        console.log(asset)
        console.log(id)
        console.log(stuff.nodeInt)
        console.log(stuff.map)

        setTimeout(function () {
            entities[stuff.nodeInt].set('components.model.asset', id)

            asset.set('data', {mapping: []});
            asset.set('data.mapping', stuff.map)

        }, 1500);
    }

});
