require("@/tests/jest/__polyfill__/TextEncoder");
import { SimInstance } from "@/data models/simInstance";
import mockAxios from "jest-mock-axios";
import axios from "axios";

import {
  CreatePlaycanvasDevices,
  CreatePlaycanvasElement,
  CreatePlaycanvasOptions
} from "@/helpers/playcanvasHelpers";

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


//A simstate
const simStateJWTSFO = require("@/tests/jest/__data__/553729/jwtsfo.json");


describe("SimInstance", () => {
  let simInstance: SimInstance;

  beforeEach(() => {
    const newCanvas = CreatePlaycanvasElement(projectData.sims[0].scenes[0]);
    const devices = CreatePlaycanvasDevices(newCanvas);
    const options = CreatePlaycanvasOptions(devices, projectData.sims[0]);

    newCanvas.setAttribute("projectID", projectData.sims[0].id);
    const sceneID = projectData.sims[0].scenes[0].fileName.replace(".json", "");
    newCanvas.setAttribute("sceneID", sceneID);
    simInstance = new SimInstance("scene.name", newCanvas, options);
    simInstance.sim = projectData.sims[0];

    const token = axios.CancelToken.source();
    (simInstance as any).makeCancelTokenSource = () => {
      token.cancel = jest.fn((errorString?: string) => {
        mockAxios.mockError(
          { toString: () => { return errorString; }, __CANCEL__: 1 }
        );
      });
      return token;
    };
  });


  //Required
  //Required
  //Required
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
  });

  it.each`
	STATUS | STATUS_TEXT 	|  PASS 	| SCENE_NAME	  | SIM_ID		| SIM_STATE_ID | RESPONSE_DATA | CALLBACK_VALUE  
	${404} | ${"Not Found"} | ${false} 	| ${"background"} | ${"553729"} | ${"invalid"} |  ${"invalid"} | ${undefined}
	${200} | ${"OK"}        | ${true} 	| ${"background"} | ${"553729"} |  ${"jwtsfo"} | ${simStateJWTSFO} | ${simStateJWTSFO}`("single simState request with !loaded simInst", ({
    STATUS, STATUS_TEXT, PASS, SCENE_NAME, SIM_ID, SIM_STATE_ID, RESPONSE_DATA, CALLBACK_VALUE
  }) => {
    //Create mock functions to expect being called
    const catchFn = jest.fn((error: any, simState: any) => { }),
      thenFn = jest.fn((simState: any) => { });

    simInstance.loaded = false;
    expect(simInstance).not.toBeUndefined();

    //Make a request
    simInstance.RequestSimState(SIM_STATE_ID, thenFn, catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith(`./data/sims/${SIM_ID}/${SIM_STATE_ID}.json`, { cancelToken: {} });

    const response = {
      data: RESPONSE_DATA, status: STATUS, statusText: STATUS_TEXT, config: {}, headers: {}
    };
    if (!PASS) {
      //Use mockError to simulate non-2xx responses
      mockAxios.mockError(response);
      expect(catchFn).toHaveBeenCalledWith(response, RESPONSE_DATA);
      expect(thenFn).not.toHaveBeenCalled();
    } else { //SUCCESS
      //Use mockError to simulate 2xx "OK" responses
      mockAxios.mockResponse(response);
      expect(thenFn).toHaveBeenCalledWith(CALLBACK_VALUE);

      // catch should not have been called
      expect(catchFn).not.toHaveBeenCalled();
    }
  });

  it("cancel request", () => {
    let error: any;
    const catchFn = jest.fn((_error: any, stateID: any) => { error = _error; }),
      thenFn = jest.fn((simState: any) => { });

    const stateID = "jwtsfo";

    simInstance.loaded = false;
    expect(simInstance).not.toBeUndefined();

    //Make a request
    simInstance.RequestSimState(stateID, thenFn, catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith(`./data/sims/553729/${stateID}.json`, { cancelToken: {} });

    simInstance.cancelTokenSource.cancel("New loadSimState request. Cancelling Previous");

    //https://www.npmjs.com/package/jest-mock-axios#missing-features
    /* Missing features
            AxiosMock covers the most popular parts of Axios API,
            meaning that some of the features are missing or only partially implemented (i.e. interceptors).
            AxiosMock provides the axios.CancelToken interface, but with an empty implementation.
        */

    expect(catchFn).toHaveBeenCalledWith(error, stateID);
    expect(axios.isCancel(error)).toBe(true);
    expect(thenFn).not.toHaveBeenCalled();
  });
});
