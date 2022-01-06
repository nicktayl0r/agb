var AnimateReactant = pc.createScript('animateReactant');

AnimateReactant.attributes.add("animationName", {type:"string"});
AnimateReactant.attributes.add("rangeStart", {type:"number"});
AnimateReactant.attributes.add("rangeEnd", {type:"number"});

// initialize code called once per entity
AnimateReactant.prototype.initialize = function() {
    
    var messageReceived = function(anim, val){
        if(anim === this.animationName) {
            console.log("AnimationSharedDataChanged received",anim,val);
            
            if(val >= this.rangeStart && val < this.rangeEnd) {
                StopAnimation(this.entity);
                PlayAnimation(this.entity);
            } else {
                StopAnimation(this.entity);
            }
        }
    }.bind(this);
    
    var StopAnimation = function(ent){
        ent.animation.playing = false;
        if(ent.animation.speed >= 0) {
            ent.animation.skeleton.setTime(ent.animation.skeleton.startTime);
        } else {
            ent.animation.skeleton.setTime(ent.animation.skeleton.endTime);
        }
        ent.animation.skeleton.updateGraph();
    };

    var PlayAnimation = function(ent){
        ent.animation.playing = true;
    };

    
    this.app.on("AnimationSharedDataChanged", messageReceived);
    
     this.on("destroy", function() {
        this.app.off("AnimationSharedDataChanged", messageReceived);
    });
};
