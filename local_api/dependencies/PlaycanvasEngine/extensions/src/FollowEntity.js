var FollowEntity = pc.createScript('followEntity');

// set the proper camera in the inspector
FollowEntity.attributes.add("entityToFollow", {type:"entity"});
FollowEntity.attributes.add("followNodeName", {type:"string"});

// initialize code called once per entity
FollowEntity.prototype.initialize = function() {

    this.startPosition = this.entity.getPosition().clone();

    this.startRotation = this.entity.getRotation().clone();

    if(this.entityToFollow) {
        if(this.followNodeName) {
            this.followNode = this.entityToFollow.findByName(this.followNodeName);
            if(this.followNode) {
                this.entity.follow(this.followNode);
            }
        } else {
            this.followNode = this.entityToFollow;
            this.entity.follow(this.followNode);
        }
    }

    this.on("state", function (enabled) {
        if (enabled) {
            this.reset();
            this.entity.follow(this.followNode);
        } else {
            this.entity.unfollow();
            this.reset();
        }
    });

};

FollowEntity.prototype.reset = function() {
    this.entity.setPosition(this.startPosition);
    this.entity.setRotation(this.startRotation);
}
