require("@/tests/jest/__polyfill__/TextEncoder");
import {
  SimEventQueue, SimEvent
} from "@/managers/simEventQueue";

describe("SimEventQueue registerEvent", () => {
  let queue: SimEventQueue;
  beforeEach(() => {
    queue = new SimEventQueue();
  });

  it.each`
        sceneName | simEvent | once | priority
        ${"sceneName1"} | ${{ eventName: "event1", eventData: "string data", eventOwner: { ownerName: "name" } }} | ${true} | ${false}
        ${"sceneName1"} | ${{ eventName: "event2", eventData: true, eventOwner: { ownerName: "name" } }} | ${true} | ${false}
        ${"sceneName1"} | ${{ eventName: "event3", eventData: false, eventOwner: { ownerName: "name" } }} | ${true} | ${false}
        ${"sceneName1"} | ${{ eventName: "event4", eventData: { key: "key1", value: "valueA" }, eventOwner: { ownerName: "name" } }} | ${true} | ${false}
        ${"sceneName1"} | ${{ eventName: "event5", eventData: { scripts: ["one", "two", "three"] }, eventOwner: { ownerName: "name" } }} | ${true} | ${false}
        ${"sceneName1"} | ${{ eventName: "event6", eventData: { scripts: ["one", "two", "three"], extension: true }, eventOwner: { ownerName: "name" } }} | ${true} | ${false}
        `("enqueue",
    ({
      sceneName, simEvent, once, priority
    }) => {
      queue.registerEvent(sceneName, simEvent, once, priority);

      expect(queue.sceneEvents[sceneName]).not.toBe(undefined);
      expect(queue.sceneEvents[sceneName][0]).toStrictEqual(simEvent);
    });
});


describe("SimEventQueue register options", () => {
  let queue: SimEventQueue;
  let events: SimEvent[] = [];

  beforeEach(() => {
    queue = new SimEventQueue();

    events = [];
    events.push({ eventName: "event1", eventData: "string data", eventOwner: { ownerName: "name" } });
    events.push({ eventName: "event2", eventData: true, eventOwner: { ownerName: "name" } });
    events.push({ eventName: "event3", eventData: false, eventOwner: { ownerName: "name" } });
    events.push({ eventName: "event4", eventData: { key: "key1", value: "valueA" }, eventOwner: undefined });
    events.push({ eventName: "event5", eventData: { scripts: { one: { attr1: 1 }, two: { attr1: true }, three: { attr1: 57 } } }, eventOwner: { ownerName: "name" } });
    events.push({ eventName: "event6", eventData: { scripts: { one: { attr1: 1 }, two: { attr1: true }, three: { attr1: 57 } } }, eventOwner: { ownerName: "name" } });

    events.forEach((event) => { queue.registerEvent("sceneName1", event); });
  });

  it.each`
        index | sceneName | simEvent | once | priority
        ${0} | ${"sceneName1"} | ${{ eventName: "event1", eventData: "string data", eventOwner: { ownerName: "name" } }} | ${true} | ${false}
        ${1} | ${"sceneName1"} | ${{ eventName: "event2", eventData: true, eventOwner: { ownerName: "name" } }} | ${true} | ${false}
        ${2} | ${"sceneName1"} | ${{ eventName: "event3", eventData: false, eventOwner: { ownerName: "name" } }} | ${true} | ${false}
        ${3} | ${"sceneName1"} | ${{ eventName: "event4", eventData: { key: "key1", value: "valueA" }, eventOwner: undefined }} | ${true} | ${false}
        ${4} | ${"sceneName1"} | ${{ eventName: "event5", eventData: { scripts: { one: { attr1: 1 }, two: { attr1: true }, three: { attr1: 57 } } }, eventOwner: { ownerName: "name" } }} | ${true} | ${false}
    ${5} | ${"sceneName1"} | ${{ eventName: "event6", eventData: { scripts: { one: { attr1: 1 }, two: { attr1: true }, three: { attr1: 57 } } }, eventOwner: { ownerName: "name" } }} | ${true} | ${false}
        `("test index",
    ({
      index, sceneName, simEvent, once, priority
    }) => {
      expect(queue.sceneEvents[sceneName]).not.toBe(undefined);
      expect(queue.sceneEvents[sceneName][index]).toStrictEqual(simEvent);
    });
});

describe("SimEventQueue getEventsByOwner", () => {
  let queue: SimEventQueue;
  const events: SimEvent[] = [];
  beforeEach(() => {
    events.push({ eventName: "event1", eventData: "string data", eventOwner: { ownerName: "name" } });
    events.push({ eventName: "event2", eventData: true, eventOwner: { ownerName: "name" } });
    events.push({ eventName: "event3", eventData: false, eventOwner: { ownerName: "name" } });
    events.push({ eventName: "event4", eventData: { key: "key1", value: "valueA" }, eventOwner: { ownerName: "name" } });
    events.push({ eventName: "event5", eventData: { scripts: { one: { attr1: 1 }, two: { attr1: true }, three: { attr1: 57 } } }, eventOwner: { ownerName: "name" } });
    events.push({ eventName: "event6", eventData: { scripts: { one: { attr1: 1 }, two: { attr1: true }, three: { attr1: 57 } } }, eventOwner: { ownerName: "name" } });
    events.push({ eventName: "event7", eventData: { scripts: { one: { attr1: 1 }, two: { attr1: true }, three: { attr1: 57 } } }, eventOwner: { ownerName: "name2" } });

    queue = new SimEventQueue();
    events.forEach((event) => { queue.registerEvent("sceneName1", event); });
  });

  it.each`
        index | sceneName | simEvent | once | priority
        ${0} | ${"sceneName1"} | ${{ eventName: "event1", eventData: "string data", eventOwner: { ownerName: "name" } }} | ${true} | ${false}
        ${1} | ${"sceneName1"} | ${{ eventName: "event2", eventData: true, eventOwner: { ownerName: "name" } }} | ${true} | ${false}
        ${2} | ${"sceneName1"} | ${{ eventName: "event3", eventData: false, eventOwner: { ownerName: "name" } }} | ${true} | ${false}
        ${3} | ${"sceneName1"} | ${{ eventName: "event4", eventData: { key: "key1", value: "valueA" }, eventOwner: { ownerName: "name" } }} | ${true} | ${false}
        ${4} | ${"sceneName1"} | ${{ eventName: "event5", eventData: { scripts: { one: { attr1: 1 }, two: { attr1: true }, three: { attr1: 57 } } }, eventOwner: { ownerName: "name" } }} | ${true} | ${false}
        ${5} | ${"sceneName1"} | ${{ eventName: "event6", eventData: { scripts: { one: { attr1: 1 }, two: { attr1: true }, three: { attr1: 57 } } }, eventOwner: { ownerName: "name" } }} | ${true} | ${false}
        ${6} | ${"sceneName1"} | ${{ eventName: "event7", eventData: { scripts: { one: { attr1: 1 }, two: { attr1: true }, three: { attr1: 57 } } }, eventOwner: { ownerName: "name2" } }} | ${true} | ${false}
        `("test index",
    ({
      index, sceneName, simEvent, once, priority
    }) => {
      expect(queue.getEventsByOwner(sceneName, simEvent.eventOwner)[index]).toStrictEqual(simEvent);
    });
});



describe("SimEventQueue removeEvent", () => {
  let queue: SimEventQueue;
  let events: SimEvent[] = [];


  beforeEach(() => {
    events = [];
    events.push({ eventName: "event1", eventData: "string data", eventOwner: { ownerName: "name" } });
    events.push({ eventName: "event2", eventData: true, eventOwner: { ownerName: "name" } });
    events.push({ eventName: "event3", eventData: false, eventOwner: { ownerName: "name" } });
    events.push({ eventName: "event4", eventData: { key: "key1", value: "valueA" }, eventOwner: { ownerName: "name" } });
    events.push({ eventName: "event5", eventData: { scripts: { one: { attr1: 1 }, two: { attr1: true }, three: { attr1: 57 } } }, eventOwner: { ownerName: "name" } });
    events.push({ eventName: "event6", eventData: { scripts: { one: { attr1: 1 }, two: { attr1: true }, three: { attr1: 57 } } }, eventOwner: { ownerName: "name" } });
    events.push({ eventName: "event7", eventData: { scripts: { one: { attr1: 1 }, two: { attr1: true }, three: { attr1: 57 } } }, eventOwner: { ownerName: "name2" } });

    queue = new SimEventQueue();
    events.forEach((event) => { queue.registerEvent("sceneName1", event); });
  });

  it.each`
        index | sceneName | simEvent | once | priority
        ${0} | ${"sceneName1"} | ${{ eventName: "event1", eventData: "string data", eventOwner: { ownerName: "name" } }} | ${true} | ${false}
        ${1} | ${"sceneName1"} | ${{ eventName: "event2", eventData: true, eventOwner: { ownerName: "name" } }} | ${true} | ${false}
        ${2} | ${"sceneName1"} | ${{ eventName: "event3", eventData: false, eventOwner: { ownerName: "name" } }} | ${true} | ${false}
        ${3} | ${"sceneName1"} | ${{ eventName: "event4", eventData: { key: "key1", value: "valueA" }, eventOwner: { ownerName: "name" } }} | ${true} | ${false}
        ${4} | ${"sceneName1"} | ${{ eventName: "event5", eventData: { scripts: { one: { attr1: 1 }, two: { attr1: true }, three: { attr1: 57 } } }, eventOwner: { ownerName: "name" } }} | ${true} | ${false}
        ${5} | ${"sceneName1"} | ${{ eventName: "event6", eventData: { scripts: { one: { attr1: 1 }, two: { attr1: true }, three: { attr1: 57 } } }, eventOwner: { ownerName: "name" } }} | ${true} | ${false}
        ${6} | ${"sceneName1"} | ${{ eventName: "event7", eventData: { scripts: { one: { attr1: 1 }, two: { attr1: true }, three: { attr1: 57 } } }, eventOwner: { ownerName: "name2" } }} | ${true} | ${false}
        `("test index",
    ({
      index, sceneName, simEvent, once, priority
    }) => {
      const compareQueue: any[] = [];
      events.forEach((copyEvent, copyIndex) => {
        if (copyIndex !== index) compareQueue.push(copyEvent);
      });

      queue.removeEvent(sceneName, simEvent);

      compareQueue.forEach((compareEvent, compareIndex) => {
        expect(queue.sceneEvents[sceneName][compareIndex]).toStrictEqual(compareEvent);
      });
    });
});