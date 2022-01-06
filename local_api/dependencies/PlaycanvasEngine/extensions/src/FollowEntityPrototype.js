//Playcanvas engine code extension to set entities to follow other entities/nodes
//Primarily for animated camera transitions in sim states

pc.Entity.prototype.follow = function(node) {

    this.unfollow();

    this.followNode = node;

    // this update call get replaced with bind in pc-engine v1.10.7
    pc.ComponentSystem.bind("update", onUpdate, this);
    // pc.ComponentSystem.on("update", onUpdate, this);
}

function onUpdate(dt) {
    if(this.followNode) {
        this.setPosition(this.followNode.getPosition());
        this.setRotation(this.followNode.getRotation());
    }
}

pc.Entity.prototype.unfollow = function() {
    this.followNode = undefined;

    // this update call get replaced with bind in pc-engine v1.10.7
    pc.ComponentSystem.unbind("update", onUpdate, this);
    // pc.ComponentSystem.off("update", onUpdate, this);
}

