import { logWarning } from './helpers/debugHelper';

var ColorTween = pc.createScript('colorTween');

ColorTween.attributes.add("material", { type: 'asset', assetType: 'material'});
ColorTween.attributes.add("colorProperty", {type:"string"});
ColorTween.attributes.add("tweenColor", {type:"rgba"});

ColorTween.attributes.add('length', { type: 'number', default: 1.0});
ColorTween.attributes.add('delay', {type: 'number', default: 0.0});
ColorTween.attributes.add('easing', {
    type: 'string',
    default: "Linear",
    enum: [
        {"Linear": "Linear"},
        {"QuadraticIn": "QuadraticIn"},
        {"QuadraticOut": "QuadraticOut"},
        {"QuadraticInOut": "QuadraticInOut"},
        {"CubicIn": "CubicIn"},
        {"CubicOut": "CubicOut"},
        {"CubicInOut": "CubicInOut"},
        {"QuarticIn": "QuarticIn"},
        {"QuarticOut": "QuarticOut"},
        {"QuarticInOut": "QuarticInOut"},
        {"QuinticIn": "QuinticIn"},
        {"QuinticOut": "QuinticOut"},
        {"QuinticInOut": "QuinticInOut"},
        {"SineIn": "SineIn"},
        {"SineOut": "SineOut"},
        {"SineInOut": "SineInOut"},
        {"ExponentialIn": "ExponentialIn"},
        {"ExponentialOut": "ExponentialOut"},
        {"ExponentialInOut": "ExponentialInOut"},
        {"CircularIn": "CircularIn"},
        {"CircularOut": "CircularOut"},
        {"CircularInOut": "CircularInOut"},
        {"BackIn": "BackIn"},
        {"BackOut": "BackOut"},
        {"BackInOut": "BackInOut"},
        {"BounceIn": "BounceIn"},
        {"BounceOut": "BounceOut"},
        {"BounceInOut": "BounceInOut"},
        {"ElasticIn": "ElasticIn"},
        {"ElasticOut": "ElasticOut"},
        {"ElasticInOut": "ElasticInOut"}
    ]
});
ColorTween.attributes.add('loop', {type: 'boolean', default: false});
ColorTween.attributes.add('yoyo', {type: 'boolean', default: false});
ColorTween.attributes.add('repeat', {type: 'number', default: 0});

// initialize code called once per entity
ColorTween.prototype.initialize = function() {
    this.on("state", function (enabled) {
        if (enabled) {
            if (this.material && this.material.resource) {
                if(this.material.resource[this.colorProperty]){
                    // delay a frame after enabled is set to make sure script attributes have been updated
                    setTimeout(function() {
                        this.doTween(this.material.resource[this.colorProperty], this.tweenColor, this.colorProperty, this.material.resource);
                    }.bind(this),0);
                } else {
                    logWarning("ColorTween: property \'"+this.colorProperty+"\' does not exist on material \'"+this.material.name+"\'");
                }   
            }
        } else {
            if (this.material && this.material.resource) {
                if(this.material.resource[this.colorProperty] && this.origColor){
                    if(this.tween) this.tween.stop();
                    this.material.resource[this.colorProperty].copy(this.origColor);
                    this.material.resource.update();
                }
            }
        }
    });

    if (this.material && this.material.resource) {
        if(this.material.resource[this.colorProperty]){
            this.origColor = this.material.resource[this.colorProperty].clone();
            if(this.entity.enabled){

                this.entity.enabled = false;
                // this.doTween(this.material.resource[this.colorProperty], this.tweenColor, this.colorProperty, this.material.resource);
            }
        } else {
            logWarning("ColorTween: property \'"+this.colorProperty+"\' does not exist on material \'"+this.material.name+"\'");
        }  
    }
};

ColorTween.prototype.doTween = function(color, newColor, colorProp, material) {
    // tweens don't seem to work well with no length. just set the newColor
    if (this.length <= 0) {
        material[colorProp].copy(newColor);
        material.update();
    } else {
        this.tween = this.app.tween(color)
        .to(newColor, this.length, pc[this.easing])
        .delay(this.delay)
        .loop(this.loop)
        .yoyo(this.yoyo)

        if (! this.loop)
            this.tween.repeat(this.repeat);

        this.tween.on('update', function () {
            material[colorProp] = color;
            material.update();
        })

        this.tween.start();
    }
}