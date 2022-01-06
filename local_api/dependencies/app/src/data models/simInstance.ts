//@ts-ignore
import * as pc from "../../../PlaycanvasEngine/dist/playcanvas-engine";

import { Sim } from "@/data models/projectModels";
import { elApplicationOptions } from "@/helpers/playcanvasHelpers";
import { logError, logMessage, logWarning } from "@/helpers/debugHelpers";
import axios, { CancelTokenSource } from "axios";

export interface EntityState {
  scripts?: {
    [scriptName: string]: { [scriptAttr: string]: number | boolean };
  };
  //extend as necessary, just make things optional
}

export class SimInstance {
  loaded = false; //has this scene been loaded?

  public requestingState = false; //are we waiting on a sim state request?

  assetsLoaded: boolean;

  cancelTokenSource: CancelTokenSource;

  requestSimStatePromise: any = Promise.resolve(true);

  public sim: Sim; //keep a reference to the sim around, might be useful later with optimization to see if scenes can be loaded together

  public app: pc.Application; //the engine instance associated with the sim

  public height: number;

  public width: number;

  constructor(
    public sceneName: string, //the name of the scene that's loaded
    public canvas: HTMLCanvasElement, //the canvas element to render the engine on
    public options: elApplicationOptions
  ) {}

  public CreateApp() {
    this.app = new pc.Application(this.canvas, this.options);
    // logMessage("created app for ", this.sceneName, ": ", this.app);
  }

  makeCancelTokenSource() {
    return axios.CancelToken.source();
  }

  public RequestSimState(
    stateID: string,
    callback: (simState: any) => void,
    errorCallback: (error: any, stateID: any) => void
  ) {
    const fileName = `./data/sims/${this.sim.id}/${stateID}.json`;
    this.cancelTokenSource = this.makeCancelTokenSource();
    this.requestingState = true;
    this.requestSimStatePromise = axios
      .get(fileName, { cancelToken: this.cancelTokenSource.token })
      .then((res) => {
        // logMessage(res);
        this.requestingState = false;
        callback(res.data);
      })
      .catch((error) => {
        this.requestingState = false;
        logError(`RequestSimState failed. error: ${error}`);
        if (axios.isCancel(error)) {
          logMessage(`RequestSimState(${stateID}) canceled`, error.message);
        } else {
          logError(`RequestSimState(${stateID}) failed. error: ${error}`);
        }
        errorCallback(error, stateID);
      });
  }

  public ResizeApp() {
    this.app.resizeCanvas(this.width, this.height);
    this.app.setCanvasResolution(pc.RESOLUTION_FIXED, this.width, this.height);
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.display = "block";
    this.canvas.style.outline = "none";
  }
}
