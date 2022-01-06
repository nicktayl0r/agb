jQuery.noConflict();

var assets = editor.call('selector:items');

assets.forEach((part, index) => {
    console.log(part.json());

    var id = part.get('id')

    var engineAsset = pc.app.assets._assets.find(x => x.id === part.get('id'))

    engineAsset.type = 'animation';

    var target = editor.call('assets:get', id);

    console.log(target)

    target.set('type', 'animation')

    var assetAnimationFile = part.get('file');

    var animationURL = assetAnimationFile.url

    jQuery.getJSON(animationURL, function(json) {
        console.log(json);
   
        var handler = pc.app.loader.getHandler("animation");
        var animation = handler.open('', json);

        engineAsset.resource = animation;

    })
})
