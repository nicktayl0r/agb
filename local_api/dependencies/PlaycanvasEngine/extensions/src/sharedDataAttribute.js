import { logWarning } from "./helpers/debugHelper";
import {sprintf} from 'sprintf-js';
var SharedDataAttribute = pc.createScript('sharedDataAttribute');

// set the proper camera in the inspector
SharedDataAttribute.attributes.add("sharedDataKey", {type:"string"});
SharedDataAttribute.attributes.add("nodeName", {type:"string"});
SharedDataAttribute.attributes.add("attributeKey", {type:"string"});
SharedDataAttribute.attributes.add("formatString", {type:"string"});
SharedDataAttribute.attributes.add("regexString", {type:"string"});
SharedDataAttribute.attributes.add("outputType", {type:"string", enum: [
    {'string': 'string'},
    {'number': 'number'},
]});

// initialize code called once per entity
SharedDataAttribute.prototype.initialize = function() {

    this.split = this.attributeKey.split('.');

    this.node = this.app.root.findByName(this.nodeName);

    if(!this.node){
        logWarning('SharedDataAttribute:', 'Cannot find node with name:', this.nodeName);
        return;
    }

    this.attr = this.node;
    for (var s = 0; s < this.split.length; s++) {
        if(this.attr === undefined) {
            logWarning('SharedDataAttribute:', this.attributeKey,'is not a valid attribute key for', this.nodeName);
            return;
        }
            
        this.attr = this.attr[this.split[s]];
    }

    if(this.attr === undefined) {
        logWarning('SharedDataAttribute:', this.attributeKey,'is not a valid attribute key for', this.nodeName);
        return;
    }

    if (this.regexString) {
        this.regExFilters= []; //going with double array instead of dict b/c of possibility of dup replacements
        this.regExReplacements= [];
        // console.log(regexString);
        let reg= this.regexString.split("/");
        if (reg.length >= 3) { //reg[0] is ""
            for (let i= 1; i < reg.length; i=i + 2) {
                let replacement= reg[i+1];
                if (replacement == undefined) break; //we dont' have a complete replace, replacement is missing
                else if (replacement == "$!") replacement= ""; //$! = remove what you find
                this.regExFilters.push(new RegExp(reg[i],"g"));
                this.regExReplacements.push(replacement);
            }
        }
    }
};

// update code called every frame
SharedDataAttribute.prototype.update = function(dt) {
            
    if(this.node && this.attr !== undefined){
        if(this.sharedDataKey && this.sharedDataKey !== ""){
            
            this.attr = this.node;
            for (var s = 0; s < this.split.length; s++) {
                if(!this.attr)
                    return;

                this.attr = this.attr[this.split[s]];
            }
            
            if(this.lastAttr !== this.attr) {

                this.lastAttr = this.attr;

                if(this.formatString) {
                    let format = sprintf(this.formatString, this.attr)
                    if (this.regexString) {
                        // console.log(regexString);
                        let replaced= format;
                        for (let i= 0; i < this.regExFilters.length; i++) {
                            replaced= replaced.replace(this.regExFilters[i], this.regExReplacements[i]);
                        }
                        this.app.fire("SharedDataMessage", this.sharedDataKey, this.castOutput(replaced));
                    }
                    else this.app.fire("SharedDataMessage", this.sharedDataKey, this.castOutput(format));
                } else {
                    this.app.fire("SharedDataMessage", this.sharedDataKey, this.castOutput(this.attr));
                }                
            }
        }
        else {
            logWarning('SharedDataAttribute: "No sharedDataKeySet on',this.entity.name);
        }
    }
};

SharedDataAttribute.prototype.castOutput = function(toOutput) {
    if (this.outputType == "number") {
        if (typeof(toOutput) == "number") return toOutput;
        try {
            const toReturn= Number.parseFloat(toOutput)
            return toReturn;
        } catch (error) {
            logWarning(toOutput, "could not be parsed into a number. Returning string instead.")
            return toOutput;
        }
    }
    else {
        if (typeof(toOutput) == "string") return toOutput;
        else return toOutput.toString();
    }
}
