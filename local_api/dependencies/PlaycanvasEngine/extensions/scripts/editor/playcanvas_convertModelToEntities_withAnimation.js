
jQuery.noConflict();

// console.log(pc.app)

var entityJSON = editor.call('entities:selection')[0].json();
console.log(entityJSON.components.model);
var entityModel = editor.call('assets:get', entityJSON.components.model.asset);
console.log(entityModel)
var entityModelFile = entityModel.get('file');

var animComponent = entityJSON.components.animation;
console.log(animComponent)
var animAssets = animComponent.assets
var animAssetID = animAssets[0]

var animAsset = editor.call('assets:get', animAssetID);
var animAssetFile = animAsset.get('file')

console.log(animAsset)

var modelMapping = entityModel.get('data.mapping')
console.log(modelMapping)

var entities

var modelURL = entityModelFile.url
var animURL = animAssetFile.url

jQuery.when(jQuery.getJSON(modelURL), jQuery.getJSON(animURL)).done(function(modeljson, animjson) {
    var json = modeljson[0]
    var json2 = animjson[0]
    console.log(json);
    console.log(json2);
    var modelJSON = json.model;
    var animJSON = json2.animation;
    var entities = new Array(modelJSON.nodes.length);

    var allBones = []
    
    // get all named bones
    for(var i = 0; i < modelJSON.skins.length; i++) {
        allBones = allBones.concat(modelJSON.skins[i].boneNames);
    }

    console.log(allBones)

    // create all entities
    for(var i = 0; i < modelJSON.nodes.length; i++) {
        // if this node is not a bone
        if (allBones.indexOf(modelJSON.nodes[i].name) === -1) {

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


            var hasMesh = modelJSON.meshInstances.find(x => x.node === i)
            var skinNode = undefined
            var skinChildrenArray = []

            if (hasMesh) {
                var hasSkin = modelJSON.meshes[hasMesh.mesh].skin

                if(hasSkin !== undefined) {
                    skinNode = modelJSON.skins[hasSkin]

                    skinChildrenArray = function getAllChildren (skinIndex) {
                        var childArray = []
                        function recurse(index) {
                            for (var p = 0; p < modelJSON.parents.length; p++) {
                                if(modelJSON.parents[p] === index) {
                                    childArray = childArray.concat([p])
                                    recurse(p);
                                }
                            }
                        }
                        recurse(skinIndex);
                        return childArray;
                    }.call(this, hasMesh.node);

                    console.log(skinChildrenArray)


                }
            }

            //add animations
            var animNode = animJSON.nodes.find(x => x.name == modelJSON.nodes[i].name)
            // check if this entity has an animation node in the animation file
            if (animNode || skinNode) {

                console.log(animNode)

                // add animation component to this entity
                editor.call('entities:addComponent', [ent], 'animation')

                var animNodes = []

                if(animNode) {

                    // clone animation node for this entity
                    var animNodeClone = Object.assign({}, animNode)

                    console.log(animNodeClone)

                    animNodeClone.name = "RootNode";

                    console.log(animNodeClone)
                    console.log(animNode)

                    // rewrite animation default values with transformed values to node clone
                    if (animNodeClone.defaults.p) {
                        animNodeClone.defaults.p = [(animNodeClone.defaults.p[0] - currentNode.position[0]) / currentNode.scale[0],
                            (animNodeClone.defaults.p[1] - currentNode.position[1]) / currentNode.scale[1],
                            (animNodeClone.defaults.p[2] - currentNode.position[2]) / currentNode.scale[2]]
                    }
                    if (animNodeClone.defaults.s) {
                        animNodeClone.defaults.s = [animNodeClone.defaults.s[0] / currentNode.scale[0],
                            animNodeClone.defaults.s[1] / currentNode.scale[1],
                            animNodeClone.defaults.s[2] / currentNode.scale[2]]
                    }
                    if (animNodeClone.defaults.r) {
                        animNodeClone.defaults.r = [animNodeClone.defaults.r[0] - currentNode.rotation[0],
                            animNodeClone.defaults.r[1] - currentNode.rotation[1],
                            animNodeClone.defaults.r[2] - currentNode.rotation[2]]
                    }

                    // rewrite animation keys with transformed values to node clone
                    animNodeClone.keys.forEach((part, index) => {
                        if (part.p) {
                            part.p = [(part.p[0] - currentNode.position[0]) / currentNode.scale[0],
                                (part.p[1] - currentNode.position[1]) / currentNode.scale[1],
                                (part.p[2] - currentNode.position[2]) / currentNode.scale[2]]
                        }
                        if (part.s) {
                            part.s = [part.s[0] / currentNode.scale[0], part.s[1] / currentNode.scale[1], part.s[2] / currentNode.scale[2]]
                        }
                        if (part.r) {
                            part.r = [part.r[0] - currentNode.rotation[0], part.r[1] - currentNode.rotation[1], part.r[2] - currentNode.rotation[2]]
                        }
                    })
                }

                animNodes = animNodes.concat([animNodeClone])


                if(skinNode) {
                    var skinBones = skinNode.boneNames


                    skinBones.forEach((e) => {
                        var n = animJSON.nodes.find(x => x.name === e)
                        if (n) {
                            animNodes = animNodes.concat([n])
                        }  
                    })
                }
                

                // create new animation definition with cloned node
                var animDef = {
                    "animation":
                    {
                        "version": 4,
                        "name": animJSON.name,
                        "duration": animJSON.duration,
                        "nodes": animNodes
                    }
                }

                // create new animation asset definition with new animation definition
                var asset = {
                    name: modelJSON.nodes[i].name + '.json',
                    type: 'animation',
                    source: false,
                    preload: true,
                    parent: editor.call('assets:panel:currentFolder'),
                    filename: modelJSON.nodes[i].name + '.json',
                    file: new Blob([ JSON.stringify(animDef) ], { type: 'application/json' }),
                    scope: {
                        type: 'project',
                        id: config.project.id
                    }
                }

                // create the new animation asset for this animation node
                editor.call('assets:create', asset, function(err, id) {

                    console.log(id)
                    onceAnimAssetLoad(id, this)

                }.bind(ent), true);
            }
        } else {
            entities[i] = undefined;
        }
    }

    onceAnimAssetLoad = function(id, stuff) {
        var target = editor.call('assets:get', id);

        console.log(target)
            
        if(target) {
            onceAnimFileSet(target, id, stuff)
        } else { 
            editor.once('assets:add[' + id + ']', function(ass) {
                onceAnimFileSet(ass, id, stuff)
            })
        }
    };

    onceAnimFileSet = function(asset, id, stuff) {
        console.log(asset)
        console.log(id)
        console.log(stuff)

        // this is stupid, but important
        asset.set('type', 'animation');

        setTimeout(function () {
            stuff.set('components.animation.assets.0', id)
        }, 1500);
    }

    var sceneRoot = editor.call('entities:root')
    console.log(sceneRoot)
    var sceneRootChildren = sceneRoot.get('children')
    console.log(sceneRootChildren)
    // reparant all entities to rebuild the hierarchy
    for(var i = 1; i < modelJSON.nodes.length; i++) {
        var ent = entities[i]
        if(ent !== undefined) {
            editor.call('entities:addEntity', ent, entities[modelJSON.parents[i]])
            if(entities[modelJSON.parents[i]]) ent.set('parent', entities[modelJSON.parents[i]].get('resource_id'))

            var indexOfChild = sceneRootChildren.indexOf(ent.get('resource_id'))

            if(indexOfChild !== -1) {
                sceneRootChildren.splice(indexOfChild, 1)
            }
        }
    }

    console.log(sceneRootChildren)

    sceneRoot.set('children', sceneRootChildren)
    
//     // reparant all entities to rebuild the hierarchy
//     for(var i = 1; i < modelJSON.nodes.length; i++) {
//         var ent = entities[i]
//         if(ent !== undefined) {
//             editor.call('entities:addEntity', ent, entities[modelJSON.parents[i]])
//         }
//     }

    var needModelComp = []
    for(var i = 0; i < modelJSON.meshInstances.length; i++) {
        var mInst = modelJSON.meshInstances[i]
        var node = modelJSON.nodes[mInst.node]

//         needModelComp.push(entities[mInst.node])
        editor.call('entities:addComponent', [entities[mInst.node]], 'model')

        var mesh = modelJSON.meshes[mInst.mesh]

        var verts = modelJSON.vertices[mesh.vertices]

        var modelDef = {}

        if(mesh.skin !== undefined) {

            var modelSkin = modelJSON.skins[mesh.skin]
            var boneParents =[-1]
            var rootIndex = mInst.node

            var boneNodes = [
                    {
                        "name": "RootNode",
                        "position": [0, 0, 0],
                        "rotation": [0, 0, 0],
                        "scale": [1, 1, 1],
                        "scaleCompensation": false
                    }];

            skinChildrenArray = function getAllChildren (skinIndex) {
                var childArray = []
                function recurse(index) {
                    for (var p = 0; p < modelJSON.parents.length; p++) {
                        if(modelJSON.parents[p] === index) {
                            childArray = childArray.concat([p])
                            recurse(p);
                        }
                    }
                }
                recurse(skinIndex);
                return childArray;
            }.call(this, hasMesh.node);

            console.log(skinChildrenArray)

            modelSkin.boneNames.forEach((part, index) => {
                var b = modelJSON.nodes.find(x => x.name === part);
                var bIndex = modelJSON.parents[modelJSON.nodes.indexOf(b)]
                boneNodes = boneNodes.concat([b]);
                boneParents = boneParents.concat(0)//([bIndex - rootIndex])
            })

            console.log(boneNodes);

            modelDef = {
                "model":
                {
                    "version": 3,
                    "nodes": boneNodes,
                    "parents": boneParents,
                    "skins": [modelSkin],
                    "morphs": [],
                    "vertices": [verts],
                    "meshes": [
                    {
                        "aabb": mesh.aabb,
                        "vertices": 0,
                        "skin": 0,
                        "indices": mesh.indices,
                        "type": mesh.type,
                        "base": mesh.base,
                        "count": mesh.count
                    }],
                    "meshInstances": [
                    {
                        "node": 0,
                        "mesh": 0
                    }]
                }
            }
        } else {

            modelDef = {
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
                    "meshes": [
                    {
                        "aabb": mesh.aabb,
                        "vertices": 0,
                        "indices": mesh.indices,
                        "type": mesh.type,
                        "base": mesh.base,
                        "count": mesh.count
                    }],
                    "meshInstances": [
                    {
                        "node": 0,
                        "mesh": 0
                    }]
                }
            }
        }

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

        var newMap = [modelMapping[i]]
        console.log(newMap)

        var bunchOfStuff = {
            map: newMap,
            nodeInt: mInst.node
        }

        editor.call('assets:create', asset, function(err, id) {
            
            console.log(id)
            onceAssetLoad(id, this, newMap)

        }.bind(bunchOfStuff), true);
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


        