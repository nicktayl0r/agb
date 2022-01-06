require("@/tests/jest/__polyfill__/TextEncoder");
import mockAxios from "jest-mock-axios";
import axios from "axios";

const projectData = require("@/tests/jest/__data__/project.json");
/*
"sims": [
    {
      "name": "Sim_Evolution_Lab_Fixes",
      "id": "553729",
      "loadMode": "LoadOnDemand",
      "unloadMode": "UnloadOnDemand",
      "scenes": [
        {
          "name": "background",
          "fileName": "610117.json"
        }
      ]
    },
*/


const simStates = require("@/tests/jest/__data__/sims.json");
/*
  "553729": {
    "simStates": {
      "jwtsfo": "default",
      "krpgei": "background",
      "aeoifas": "background clone"
    }
    },
*/

//A simstate
const simStateJWTSFO = require("@/tests/jest/__data__/553729/jwtsfo.json");

import { Sim } from "@/data models/projectModels";
import { SimManager } from "@/managers/simManager";
import {
  SimEventQueue
} from "@/managers/simEventQueue";




describe("SimManager loadSimState", () => {
  let simManager: SimManager;
  let eventQueue: SimEventQueue;
  beforeEach(() => {
    simManager = new SimManager();
    //Technical Debt: casting (simManager as any) to mock private function is lazy.
    //		this code should be refactor to move the function in their own classes with public method wrapping these private methods
    //		the class and the public methods should be mocked out.
    (simManager as any).LoadSimInsts = jest.fn((sims: Sim[]) => { });
    // (simManager as any).GetSimInstByName = jest.fn((sceneName: string) => {
    // 	return (simManager as any).pool[sceneName];
    // });
    simManager.init(projectData.sims);

    eventQueue = (simManager as any).eventQueue as SimEventQueue;
  });


  //Required
  //Required
  //Required
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
  });

  it("test private fn mocks", () => {
    expect((simManager as any).LoadSimInsts).toHaveBeenCalled();
    const simPool: any = (simManager as any).pool;
    projectData.sims.forEach((sim: any) => {
      sim.scenes.forEach((scene: any) => {
        expect(simPool[scene.name]).not.toBeUndefined();
      });
    });
  });

  //1. axios mock sim state request  "./data/sims/" + this.sim.id + "/" + stateID + ".json";
  //		200 status and 400 status
  //2. mock success call, mock error call back
  //3. verify appropriate callback is invoked.
  //4. verify that relate data is returned
  //5. verify that "loadSimState" event is in queue with expected owner
  it.each`
	STATUS | STATUS_TEXT 	|  PASS 	| SCENE_NAME	  | SIM_ID		| SIM_STATE_ID | RESPONSE_DATA 
	${404} | ${"Not Found"} | ${false} 	| ${"background"} | ${"553729"} | ${"invalid"} |  ${"invalid"} 
	${200} | ${"OK"}        | ${true} 	| ${"background"} | ${"553729"} |  ${"jwtsfo"} | ${simStateJWTSFO}`("single simState request with !loaded simInst", async ({
    STATUS, STATUS_TEXT, PASS, SCENE_NAME, SIM_ID, SIM_STATE_ID, RESPONSE_DATA, CALLBACK_VALUE
  }) => {
    expect(true).toBe(true);
    //Create mock functions to expect being called
    const errorFn = jest.fn(),
      cancelFn = jest.fn(),
      thenFn = jest.fn();

    const owner = { id: "adoiuawasdf" };

    const simInst: any = (simManager as any).GetSimInstByName(SCENE_NAME);
    simInst.loaded = false;
    expect(simInst).not.toBeUndefined();

    //Make a request
    await simManager.loadSimState(SCENE_NAME, SIM_STATE_ID, thenFn, cancelFn, errorFn, owner);

    expect(mockAxios.get).toHaveBeenCalledWith(`./data/sims/${SIM_ID}/${SIM_STATE_ID}.json`, { cancelToken: {} });

    const response = {
      data: RESPONSE_DATA, status: STATUS, statusText: STATUS_TEXT, config: {}, headers: {}
    };
    if (!PASS) {
      //Use mockError to simulate non-2xx responses
      mockAxios.mockError(response);
      expect(errorFn).toHaveBeenCalledWith(SCENE_NAME, SIM_STATE_ID);
      expect(thenFn).not.toHaveBeenCalled();
      expect(cancelFn).not.toHaveBeenCalled();
    } else { //SUCCESS
      //Use mockError to simulate 2xx "OK" responses
      mockAxios.mockResponse(response);
      expect(thenFn).toHaveBeenCalledWith(SCENE_NAME, SIM_STATE_ID);

      // catch should not have been called
      expect(errorFn).not.toHaveBeenCalled();
      expect(cancelFn).not.toHaveBeenCalled();

      expect(eventQueue.sceneEvents[SCENE_NAME].length).toBe(1);

      //becuase !simInst.loaded, a "LoadSimState" event should be added to event queue with owner.
      const loadEvents = eventQueue.getEventsByOwner(SCENE_NAME, owner);
      expect(loadEvents.length).toBe(1);
      expect(loadEvents[0].eventData).toStrictEqual(RESPONSE_DATA);
      expect(loadEvents[0].eventOwner).toStrictEqual(owner);
      expect(loadEvents[0].eventName).toBe("LoadSimState");
    }
  });


  it.each`
	STATUS | STATUS_TEXT 	|  PASS 	| SCENE_NAME	  | SIM_ID		| SIM_STATE_ID | SIM_STATE_ID2 | RESPONSE_DATA 
	${404} | ${"Not Found"} | ${false} 	| ${"background"} | ${"553729"} | ${"invalid"} | ${"krpgei"} |  ${"invalid"} 
	${200} | ${"OK"}        | ${true} 	| ${"background"} | ${"553729"} |  ${"jwtsfo"} |${"krpgei"} | ${simStateJWTSFO} `("multiple simState request with !loaded simInst",
    async ({
      STATUS, STATUS_TEXT, PASS, SCENE_NAME, SIM_ID, SIM_STATE_ID, SIM_STATE_ID2, RESPONSE_DATA
    }) => {
      expect(true).toBe(true);
      //Create mock functions to expect being called
      const errorFn = jest.fn(),
        cancelFn = jest.fn(),
        thenFn = jest.fn();

      const owner = { id: "adoiuawasdf" };

      //mock cancelTokenSource
      const simInst: any = (simManager as any).GetSimInstByName(SCENE_NAME);
      simInst.loaded = false;
      const token = axios.CancelToken.source();
      token.cancel = jest.fn((errorString?: string) => {
        mockAxios.mockError(
          { toString: () => { return errorString; }, __CANCEL__: 1 }
        );
      });

      (simInst as any).makeCancelTokenSource = () => {
        return token;
      };
      expect(simInst).not.toBeUndefined();

      //Make a request
      await simManager.loadSimState(SCENE_NAME, SIM_STATE_ID, thenFn, cancelFn, errorFn, owner);
      expect(mockAxios.get).toHaveBeenCalledWith(`./data/sims/${SIM_ID}/${SIM_STATE_ID}.json`, { cancelToken: {} });

      simManager.ChangeSimStatePlayState(SCENE_NAME, "play", owner);
      const loadEvents = eventQueue.getEventsByOwner(SCENE_NAME, owner);
      expect(loadEvents.length).toBe(1);
      expect(loadEvents[0].eventData).toStrictEqual({});
      expect(loadEvents[0].eventOwner).toStrictEqual(owner);
      expect(loadEvents[0].eventName).toBe("PlayAllAnimations");

      await simManager.loadSimState(SCENE_NAME, SIM_STATE_ID2, thenFn, cancelFn, errorFn, owner);
      expect(mockAxios.get).toHaveBeenCalledWith(`./data/sims/${SIM_ID}/${SIM_STATE_ID2}.json`, { cancelToken: {} });

      const response = {
        data: RESPONSE_DATA, status: STATUS, statusText: STATUS_TEXT, config: {}, headers: {}
      };
      if (!PASS) {
        //Use mockError to simulate non-2xx responses
        mockAxios.mockError(response);
        expect(errorFn).toHaveBeenCalledWith(SCENE_NAME, SIM_STATE_ID2);
        expect(thenFn).not.toHaveBeenCalled();
        expect(cancelFn).toHaveBeenCalledWith(SCENE_NAME, SIM_STATE_ID);
      } else { //SUCCESS
        //Use mockError to simulate 2xx "OK" responses
        mockAxios.mockResponse(response);
        expect(thenFn).toHaveBeenCalledWith(SCENE_NAME, SIM_STATE_ID2);
        expect(errorFn).not.toHaveBeenCalled();
        // catch should not have been called FOR THE FIRST SimStateRequest
        expect(cancelFn).toHaveBeenCalledWith(SCENE_NAME, SIM_STATE_ID);

        expect(eventQueue.sceneEvents[SCENE_NAME].length).toBe(1);

        //becuase !simInst.loaded, a "LoadSimState" event should be added to event queue with owner.
        const loadEvents = eventQueue.getEventsByOwner(SCENE_NAME, owner);
        expect(loadEvents.length).toBe(1);
        expect(loadEvents[0].eventData).toStrictEqual(RESPONSE_DATA);
        expect(loadEvents[0].eventOwner).toStrictEqual(owner);
        expect(loadEvents[0].eventName).toBe("LoadSimState");
      }

      expect(simInst.cancelTokenSource.cancel).toBeCalled();
    });


  it.each`
			SCENE_NAME	  | SIM_ID		| SIM_STATE_ID 
			 ${"background"} | ${"553729"} |  ${"jwtsfo"} `("terminateLoadSimState - with pending loadSimState request", async ({ SCENE_NAME, SIM_ID, SIM_STATE_ID }) => {
    expect(true).toBe(true);
    //Create mock functions to expect being called
    const errorFn = jest.fn(),
      cancelFn = jest.fn(),
      thenFn = jest.fn();

    const owner = { id: "adoiuawasdf" };

    //mock cancelTokenSource
    const simInst: any = (simManager as any).GetSimInstByName(SCENE_NAME);
    simInst.loaded = false;
    const token = axios.CancelToken.source();
    token.cancel = jest.fn((errorString?: string) => {
      mockAxios.mockError(
        { toString: () => { return errorString; }, __CANCEL__: 1 }
      );
    });

    (simInst as any).makeCancelTokenSource = () => {
      return token;
    };
    expect(simInst).not.toBeUndefined();

    //Make a request
    await simManager.loadSimState(SCENE_NAME, SIM_STATE_ID, thenFn, cancelFn, errorFn, owner);
    expect(mockAxios.get).toHaveBeenCalledWith(`./data/sims/${SIM_ID}/${SIM_STATE_ID}.json`, { cancelToken: {} });

    //ChangeSimStatePlayState
    simManager.ChangeSimStatePlayState(SCENE_NAME, "play", owner);
    const loadEvents = eventQueue.getEventsByOwner(SCENE_NAME, owner);
    expect(loadEvents.length).toBe(1);
    expect(loadEvents[0].eventData).toStrictEqual({});
    expect(loadEvents[0].eventOwner).toStrictEqual(owner);
    expect(loadEvents[0].eventName).toBe("PlayAllAnimations");

    simManager.terminateLoadSimState(SCENE_NAME, owner);

    //Terminate should cancel pending loadSimState request
    expect(thenFn).not.toHaveBeenCalled();
    expect(errorFn).not.toHaveBeenCalled();
    expect(cancelFn).toHaveBeenCalledWith(SCENE_NAME, SIM_STATE_ID);

    //Terminate should remove pooled change in play state
    expect(eventQueue.sceneEvents[SCENE_NAME].length).toBe(0);
  });


  it.each`
			SCENE_NAME	  | SIM_ID		| SIM_STATE_ID | RESPONSE_DATA 
			 ${"background"} | ${"553729"} |  ${"jwtsfo"} | ${simStateJWTSFO} `("terminateLoadSimState - with pooled loadSimState event", async ({
    SCENE_NAME, SIM_ID, SIM_STATE_ID, RESPONSE_DATA
  }) => {
    expect(true).toBe(true);
    //Create mock functions to expect being called
    const errorFn = jest.fn(),
      cancelFn = jest.fn(),
      thenFn = jest.fn();

    const owner = { id: "adoiuawasdf" };


    //mock cancelTokenSource
    const simInst: any = (simManager as any).GetSimInstByName(SCENE_NAME);
    simInst.loaded = false;
    const token = axios.CancelToken.source();
    token.cancel = jest.fn((errorString?: string) => {
      mockAxios.mockError(
        { toString: () => { return errorString; }, __CANCEL__: 1 }
      );
    });

    (simInst as any).makeCancelTokenSource = () => {
      return token;
    };
    expect(simInst).not.toBeUndefined();

    //Make a request
    await simManager.loadSimState(SCENE_NAME, SIM_STATE_ID, thenFn, cancelFn, errorFn, owner);
    expect(mockAxios.get).toHaveBeenCalledWith(`./data/sims/${SIM_ID}/${SIM_STATE_ID}.json`, { cancelToken: {} });

    const response = {
      data: RESPONSE_DATA, status: 200, statusText: "OK", config: {}, headers: {}
    };

    //Use mockError to simulate 2xx "OK" responses
    mockAxios.mockResponse(response);
    expect(thenFn).toHaveBeenCalledWith(SCENE_NAME, SIM_STATE_ID);
    expect(cancelFn).not.toHaveBeenCalled();
    expect(errorFn).not.toHaveBeenCalled();

    //ChangeSimStatePlayState
    simManager.ChangeSimStatePlayState(SCENE_NAME, "play", owner);
    const loadEvents = eventQueue.getEventsByOwner(SCENE_NAME, owner);
    expect(loadEvents.length).toBe(2);
    expect(eventQueue.sceneEvents[SCENE_NAME].length).toBe(2);

    await simManager.terminateLoadSimState(SCENE_NAME, owner);

    //Terminate should remove pooled loadSimState request
    //Terminate should remove pooled change in play state
    expect(eventQueue.sceneEvents[SCENE_NAME].length).toBe(0);
  });
});