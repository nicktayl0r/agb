import { logMessage } from './helpers/debugHelper';

var SharedDataListener = pc.createScript('sharedDataListener');

// initialize code called once per entity
SharedDataListener.prototype.initialize = function() {
    
    var messageReceived = function(key, val){
        logMessage("SharedDataMessage received",key,val);
    };
        
    this.app.on("SharedDataMessage", messageReceived);
    
     this.on("destroy", function() {
        this.app.off("SharedDataMessage", messageReceived);
    });
};

// update code called every frame
SharedDataListener.prototype.update = function(dt) {

};
                