import { logError, logMessage, logWarning } from "@/helpers/debugHelpers";
import { widgetValPrimitive } from "@/data models/widgetModels";
import { SimInstance, EntityState } from "@/data models/simInstance";

const deepEqual = require("deep-equal");

export interface SharedDataPair {
    key: string;
    value: widgetValPrimitive;
}

export interface SimEvent {
    eventName: string;
    eventData: EntityState | SharedDataPair | string | boolean; //tack on others as necessary
    eventOwner: any;
}

export class SimEventQueue {
    sceneEvents: { [sceneName: string]: SimEvent[] };

    constructor() {
      this.sceneEvents = {};
    }

    public registerEvent(
      sceneName: string,
      event: SimEvent,
      once?: boolean,
      priority?: boolean
    ) {
      if (this.sceneEvents[sceneName] === undefined) {
        this.sceneEvents[sceneName] = [];
      }
      if (once) {
        const curEvent = this.sceneEvents[sceneName].find(cE => {
          return cE.eventName === event.eventName;
        });
        if (curEvent !== undefined) curEvent.eventData = event.eventData;
        else this.sceneEvents[sceneName].push(event);
      } else this.sceneEvents[sceneName].push(event);

      if (priority) {
        const curIndex = this.sceneEvents[sceneName].indexOf(event);
        this.sceneEvents[sceneName].splice(curIndex, 1);
        this.sceneEvents[sceneName].unshift(event);
        // logMessage("prioritized, list is now: ", this.sceneEvents[sceneName]);
      }
      // logMessage(sceneName, "registerEvent: ", event);
    }

    public fireAllSceneEventsInQueue(simInst: SimInstance | undefined) {
      if (simInst !== undefined && simInst.loaded) {
        //shouldn't be possible to be false as fireAllSceneEventsInQueue is supposed to be fired after scene load
        const allSceneEvents = this.sceneEvents[simInst.sceneName];
        if (allSceneEvents !== undefined) {
          for (const event of allSceneEvents) {
            // logMessage("app.fire: ", event.eventName, ", ", event.eventData);
            simInst.app.fire(event.eventName, event.eventData);
          }
          this.sceneEvents[simInst.sceneName] = [];
        }
      } else {
        logWarning("Could not fireAllSceneEventsInQueue. simInst is null or not loaded!");
      }
    }

    public getEventsByOwner(sceneName: string, owner: any) {
      return this.sceneEvents[sceneName].filter((ele) => { return (ele.eventOwner !== undefined) && deepEqual(ele.eventOwner, owner); });
    }

    public removeEvent(sceneName: string, event: SimEvent) {
      this.sceneEvents[sceneName] = this.sceneEvents[sceneName].filter((ele) => { return !deepEqual(ele, event); });
    }
}
