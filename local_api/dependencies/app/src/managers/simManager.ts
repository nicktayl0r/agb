//@ts-ignore
import * as pc from "../../../PlaycanvasEngine/dist/playcanvas-engine";

import { EventDispatcher } from "ste-events";
import axios from "axios";

import { Sim } from "@/data models/projectModels";
import { widgetValPrimitive } from "@/data models/widgetModels";
import { logError, logMessage, logWarning } from "@/helpers/debugHelpers";
import {
  CreatePlaycanvasDevices,
  CreatePlaycanvasElement,
  CreatePlaycanvasOptions,
  preloadModules,
} from "@/helpers/playcanvasHelpers";
import { getCurrentPageID } from "@/helpers/userHelpers";
import { state } from "@/mixins/WidgetPlayable";
import { setSharedDataUserOrAppVal } from "@/helpers/sharedDataHelpers";

import { SimInstance, EntityState } from "@/data models/simInstance";
import { SimEventQueue } from "@/managers/simEventQueue";
import { notGrapes } from "@/helpers/widgetHelpers";

export class SimManager {
  private pool: { [sceneName: string]: SimInstance } = {}; //dictionary of simInstances. Key: sceneName, Value: SimInstance

  private simsLoading: Sim[];

  private simsOnDemand: Sim[];

  private simsLoaded: Sim[];

  private eventQueue: SimEventQueue;

  private inLoading: boolean;

  //* Create SimInstances for every scene in every sim.
  public init(sims: Sim[]) {
    this.simsOnDemand = sims.filter((s) => s.loadMode === "LoadOnDemand");
    this.simsLoading = sims.filter((s) => s.loadMode === "LoadOnStart");
    this.simsLoaded = [];
    this.eventQueue = new SimEventQueue();
    this.InitSimInsts(sims); //create everything for all simInst, except the pc.application
    this.LoadSimInsts(this.simsLoading);
  }

  private InitSimInsts(sims: Sim[]) {
    for (const sim of sims) {
      for (const scene of sim.scenes) {
        const newCanvas = CreatePlaycanvasElement(scene.name);
        const devices = CreatePlaycanvasDevices(newCanvas);
        const options = CreatePlaycanvasOptions(devices, sim);
        newCanvas.setAttribute("projectID", sim.id);
        const sceneID = scene.fileName.replace(".json", "");
        newCanvas.setAttribute("sceneID", sceneID);
        const simInst = new SimInstance(scene.name, newCanvas, options);
        simInst.sim = sim;
        this.pool[scene.name] = simInst;
        // logMessage("init simInstance: ", scene.name, " is: ", simInst);
      }
    }
  }

  private LoadSimInsts(sims: Sim[]) {
    // logMessage("Load Sim inst");
    if (sims.length > 0) {
      const sim = sims[0];

      this.CreateSimInstApp(sim!, () => {
        // logWarning("move sim ", sim.name, " from simLoading to simLoaded");

        sims.splice(this.simsLoading.indexOf(sim), 1);
        this.simsLoaded.push(sim);

        this.eventQueue.fireAllSceneEventsInQueue(
          this.pool[sim.scenes[0].name]
        );

        this.pool[sim.scenes[0].name].ResizeApp();

        //Mark all loading sims as _stayloaded to ensure they are correctly unhooked and rehooked if more sims are loading
        //@ts-ignore
        this.pool[sim.scenes[0].name].app._stayLoaded = true;

        // After a sim is loaded for the first time,
        // rehook all sims that we unhooked and tagged as '_stayLoaded' before loading this current sim
        for (const sceneName in this.pool) {
          if (
            sceneName !== sim.scenes[0].name &&
            this.pool[sceneName] &&
            this.pool[sceneName].app &&
            //@ts-ignore
            this.pool[sceneName].app._stayLoaded
          ) {
            this.HookSimUpdate(sceneName);
          }
        }

        this.inLoading = false;

        this.LoadSimInsts(sims);
      });
    } else {
      //Now that all the simInsts have been created for the page,
      //Clear _stayLoaded for all sims  marked as _stayLoaded
      for (const sceneName in this.pool) {
        if (
          this.pool[sceneName] &&
          this.pool[sceneName].app &&
          //@ts-ignore
          this.pool[sceneName].app._stayLoaded
        ) {
          //@ts-ignore
          this.pool[sceneName].app._stayLoaded = false;
        }
      }
    }
  }

  public GetSimInstIsLoaded(sceneName: string) {
    if (this.pool[sceneName]) return this.pool[sceneName].loaded;

    logError(
      `Something is wrong. No simInst in the pool has the sceneName: ${sceneName}`
    );
    return false;
  }

  public UnHookSimUpdate(sceneName: string) {
    // UnHook a sim from the render loop
    if (this.pool && this.pool[sceneName] && this.pool[sceneName].app) {
      //@ts-ignore
      window.cancelAnimationFrame(this.pool[sceneName].app._tickID);
      //@ts-ignore
      this.pool[sceneName].app._tickID = undefined;
      if (
        //@ts-ignore
        this.pool[sceneName].app._soundManager &&
        //@ts-ignore
        this.pool[sceneName].app._soundManager.context
      ) {
        //@ts-ignore
        this.pool[sceneName].app._soundManager.suspend();
      }
    }
  }

  public HookSimUpdate(sceneName: string) {
    // Hook up a sim to the render loop if it currently isn't
    if (this.pool[sceneName].app) {
      //@ts-ignore
      if (!this.pool[sceneName].app._tickID) {
        //@ts-ignore
        this.pool[sceneName].app._tickID = window.requestAnimationFrame(
          //@ts-ignore
          this.pool[sceneName].app.tick
        );
        if (
          //@ts-ignore
          this.pool[sceneName].app._soundManager &&
          //@ts-ignore
          this.pool[sceneName].app._soundManager.context
        ) {
          //@ts-ignore
          this.pool[sceneName].app._soundManager.resume();
        }
      }
    }
  }

  private CreateSimInstApp(sim: Sim, callback: () => void) {
    this.inLoading = true;

    // When loading a sim for the first time, unhook all actively rendering sims (those with a '_tickID'),
    // but mark them as '_stayLoaded' to rehook after the current sim is loaded
    // **This will make sure we don't override pc.Application._currentApplication while loading a new sim/app**
    for (const sceneName in this.pool) {
      if (
        this.pool[sceneName].app &&
        //@ts-ignore
        this.pool[sceneName].app._tickID
      ) {
        //@ts-ignore
        this.pool[sceneName].app._stayLoaded = true;
        this.UnHookSimUpdate(sceneName);
      }
    }
    for (const scene of sim.scenes) {
      const simInst = this.pool[scene.name];
      preloadModules(sim, () => {
        simInst.CreateApp();
        this.SubscribeToSceneEvents(simInst);

        this.LoadAssets(simInst, () => {
          this.LoadScene(simInst, (simI) => {
            simInst!.loaded = true;
            callback();
          });
        });
      });
    }
  }

  private GetSimInstByName(sceneName: string): SimInstance | undefined {
    if (this.pool[sceneName] == undefined) return undefined;

    if (this.pool[sceneName].loaded) {
      if (!this.inLoading) {
        this.HookSimUpdate(sceneName);
      }
      return this.pool[sceneName];
    }
    if (this.simsLoading) {
      let index;
      index = this.simsLoading.findIndex(
        (s) => s.scenes.findIndex((c) => c.name === sceneName) !== -1
      );
      if (index === -1) {
        let demandIndex;
        demandIndex = this.simsOnDemand.findIndex(
          (s) => s.scenes.findIndex((c) => c.name === sceneName) !== -1
        );
        if (demandIndex !== -1) {
          // logWarning("move sim scene", sceneName, " from simsOnDemand to start of simsLoading");
          this.simsLoading.unshift(this.simsOnDemand.splice(demandIndex, 1)[0]);
          if (this.simsLoading.length === 1) {
            this.LoadSimInsts(this.simsLoading);
          }
        } else {
          logError(
            "cannot find sim with scene",
            sceneName,
            " in either OnStart or OnDemand lists"
          );
        }
        return this.pool[sceneName];
      }
      if (index !== 0) {
        // logWarning("move sim scene", sceneName, " to the start of simsLoading");
        this.simsLoading.unshift(this.simsLoading.splice(index, 1)[0]);
        if (this.simsLoading.length === 1) {
          this.LoadSimInsts(this.simsLoading);
        }
      }
      return this.pool[sceneName];
    }
    return this.pool[sceneName];
  }

  private LoadAssets(simInst: SimInstance, callback: () => void) {
    const assets = simInst.app.assets as any; //need to check a property I added and typescript is being typescript
    if (!assets.preLoadStarted && !assets.preLoadFinished) {
      assets.preLoadStarted = true;
      simInst.app.configure(
        `assets/scenes/${simInst.sim.id}/config.json`,
        (err: string | null) => {
          if (err) {
            logError(err);
          }

          simInst!.app.preload(() => {
            // if (err) {
            //   logError(err);
            // } else {
            assets.preLoadFinished = true;
            logMessage(simInst.sceneName, " assets have finished loading");
            callback();
            simInst.app.fire("preloadFinished", "");
            // }
            return {};
          });
        }
      );
    } else if (!assets.preLoadFinished) {
      //assets have started loading, but haven't finished
      logMessage(
        simInst.sceneName,
        " already has assets loading. Skipping preLoad, waiting for assets to finish before loading scene."
      );
      simInst.app.on("preloadFinished", callback);
    } else if (assets.preLoadFinished) {
      logMessage("assets have already finished loading.");
      callback();
    }
  }

  private LoadScene(
    simInst: SimInstance,
    callback: (simInstance: SimInstance) => void
  ) {
    // logMessage("LoadScene: ", simInst.sceneName);
    const scene = simInst.sim.scenes.find((s) => {
      return s.name == simInst.sceneName;
    });
    if (scene) {
      const sceneFileName = scene.fileName;
      simInst!.app.scenes.loadScene(
        sceneFileName,
        (err: string | null, scene: pc.Entity | undefined) => {
          if (err) {
            logError(err);
          } else {
            // logMessage("app.start()");
            const scriptNames = simInst.app.scripts
              .list()
              .map((o: { name: any }) => o.name);
            if (scriptNames) {
              logMessage(scriptNames.toString());
            } else {
              logWarning("SimManager couldn't find script names");
            }
            simInst.app.start();
            simInst.app.setCanvasFillMode(pc.FILLMODE_NONE);
            callback(simInst);
          }
          return {};
        }
      );
    } else logError("could not load scene with name: ", simInst.sceneName);
  }

  public loadSimState(
    sceneName: string,
    stateID: string,
    callback: (sceneName: string, stateID: string) => void,
    cancelCallback: (sceneName: string, stateID: string) => void,
    errorCallback: (sceneName: string, stateID: string) => void,
    owner: any
  ) {
    // logMessage("loadSimState with scene: ", sceneName);
    //check simInstances for instance
    return new Promise<void>((resolutionFunc, rejectionFunc) => {
      const simInst = this.GetSimInstByName(sceneName);
      if (simInst) {
        if (simInst.requestingState) {
          simInst.cancelTokenSource.cancel(
            "New loadSimState request. Cancelling Previous"
          );
        }
        Promise.all([simInst.requestSimStatePromise]).then((values) => {
          this.callback_RequestSimSimState(
            simInst,
            stateID,
            callback,
            cancelCallback,
            errorCallback,
            owner
          );
          resolutionFunc();
        });
        // resolutionFunc();
        // this.callback_RequestSimSimState(simInst, stateID, callback, cancelCallback, errorCallback, owner);
      } else {
        logError(
          "Cannot request sim state. ",
          sceneName,
          " has a simInst that is undefined."
        );
        rejectionFunc();
      }
    });
  }

  private callback_RequestSimSimState(
    simInst: SimInstance,
    _stateID: string,
    callback: (sceneName: string, stateID: string) => void,
    cancelCallback: (sceneName: string, stateID: string) => void,
    errorCallback: (sceneName: string, stateID: string) => void,
    owner: any
  ) {
    simInst.RequestSimState(
      _stateID,
      (simState) => {
        try {
          if (simInst.loaded) {
            simInst.app.fire("LoadSimState", simState);
            // Apply any accumulated events from waiting on sim state request
            this.eventQueue.fireAllSceneEventsInQueue(simInst);
            callback(simInst.sceneName, _stateID);
          } else {
            logMessage(
              simInst.sceneName,
              "is not loaded yet, pushing simState to queue."
            );
            this.eventQueue.registerEvent(
              simInst.sceneName,
              {
                eventName: "LoadSimState",
                eventData: simState,
                eventOwner: owner,
              },
              true,
              true
            );
            callback(simInst.sceneName, _stateID);
          }
        } catch (error) {
          logError(
            `loadSimState exception during callBack ${simInst.sceneName}`,
            { sceneName: simInst.sceneName, stateID: _stateID },
            error
          );
        }
      },
      (error: any, _stateID: any) => {
        if (axios.isCancel(error)) {
          this.eventQueue
            .getEventsByOwner(simInst.sceneName, owner)
            .forEach((val) => {
              this.eventQueue.removeEvent(simInst.sceneName, val);
            });
          logMessage("RequestSimState canceled", error.message);
          try {
            cancelCallback(simInst.sceneName, _stateID);
          } catch (error) {
            logError(
              `loadSimState exception during errorCallback ${simInst.sceneName}`,
              { sceneName: simInst.sceneName, stateID: _stateID },
              error
            );
          }
        } else {
          try {
            errorCallback(simInst.sceneName, _stateID);
          } catch (error) {
            logError(
              `loadSimState exception during errorCallback ${simInst.sceneName}`,
              { sceneName: simInst.sceneName, stateID: _stateID },
              error
            );
          }
        }
      }
    );
  }

  public terminateLoadSimState(sceneName: string, owner: any) {
    return new Promise<void>((resolutionFunc, rejectionFunc) => {
      const simInst = this.GetSimInstByName(sceneName);
      if (simInst) {
        if (simInst.requestingState) {
          simInst.cancelTokenSource.cancel(
            "New loadSimState request. Cancelling Previous"
          );
        }
        Promise.all([simInst.requestSimStatePromise])
          .then((values) => {
            this.eventQueue
              .getEventsByOwner(sceneName, owner)
              .forEach((val: any) => {
                this.eventQueue.removeEvent(sceneName, val);
              });
            resolutionFunc();
          })
          .catch((reason: any) =>
            logError(`terminateLoadSimState failed.`, reason)
          );
      } else {
        logWarning(
          `terminateLoadSimState failed. simInst for sceneName [${sceneName}] not found.`
        );
        resolutionFunc();
      }
    });
  }

  public AppendCanvasToElement(widgetElement: HTMLElement, sceneName: string) {
    if (this.pool[sceneName] == undefined) return; //safety test for Grapes.
    // logMessage(
    // 	"pre append size: ",
    // 	this.pool[sceneName].canvas.width,
    // 	" x ",
    // 	this.pool[sceneName].canvas.height
    // );
    widgetElement.appendChild(this.pool[sceneName].canvas);
    this.SetCanvasSizeToElement(this.pool[sceneName], widgetElement);
  }

  private SetCanvasSizeToElement(simInst: SimInstance, widgetElement: Element) {
    // logMessage(
    // 	"width: ",
    // 	(<HTMLElement>widgetElement).getBoundingClientRect().width,
    // 	", height: ",
    // 	(<HTMLElement>widgetElement).getBoundingClientRect().height
    // );
    if (simInst) {
      simInst.canvas.style.display = "none";
      // getBoundingClientRect will give us the size with decimal precision
      const domRect = widgetElement.getBoundingClientRect();
      // logMessage("domRect: ", domRect);
      simInst.height = domRect.height;
      simInst.width = domRect.width;
      // logMessage(
      // 	"new width: ",
      // 	simInst.width,
      // 	", new height: ",
      // 	simInst.height
      // );
      if (simInst.app) simInst.ResizeApp();
      else {
        logMessage(
          "SimManager:: Ignoring resolution change until app is available."
        );
      }
    } else logWarning("No sim inst, cannot set size.");
  }

  public UpdateCanvasSize(widgetElement: Element, sceneName: string) {
    this.SetCanvasSizeToElement(this.pool[sceneName], widgetElement);
  }

  public ChangeSimStatePlayState(sceneName: string, state: state, owner: any) {
    // logMessage(
    // 	"SimManager.ChangeSimStatePlayState - sceneName: ",
    // 	sceneName,
    // 	", state: ",
    // 	state
    // );
    const simInst = this.pool[sceneName];
    if (simInst && simInst.loaded && !simInst.requestingState) {
      switch (state) {
        case "play":
          this.pool[sceneName].app.fire("PlayAllAnimations", undefined);
          break;
        case "stop":
          this.pool[sceneName].app.fire("StopAllAnimations", undefined);
          break;
        case "pause":
          this.pool[sceneName].app.fire("PauseAllAnimations", undefined);
          break;
      }
    } else if (this.eventQueue != undefined) {
      switch (state) {
        case "play":
          //eventQueue can be undefined in the Grapes vue instance.
          this.eventQueue.registerEvent(sceneName, {
            eventName: "PlayAllAnimations",
            eventData: {},
            eventOwner: owner,
          }); //add state to queue to be applied later
          break;
        case "stop":
          //eventQueue can be undefined in the Grapes vue instance.
          this.eventQueue.registerEvent(sceneName, {
            eventName: "StopAllAnimations",
            eventData: {},
            eventOwner: owner,
          }); //add state to queue to be applied later
          break;
        case "pause":
          //eventQueue can be undefined in the Grapes vue instance.
          this.eventQueue.registerEvent(sceneName, {
            eventName: "PauseAllAnimations",
            eventData: {},
            eventOwner: owner,
          }); //add state to queue to be applied later
          break;
      }
    }
  }

  public PassSharedData(_key: string, _val: widgetValPrimitive) {
    for (const sceneName in this.pool) {
      if (this.pool[sceneName]) {
        const pair = { key: _key, value: _val };
        if (this.pool[sceneName].app && this.pool[sceneName].loaded) {
          this.pool[sceneName].app.fire("IncomingSharedDataMessage", pair);
        } else if (this.eventQueue != undefined) {
          this.eventQueue.registerEvent(
            sceneName,
            {
              eventName: "IncomingSharedDataMessage",
              eventData: pair,
              eventOwner: undefined,
            },
            true
          );
        }
      }
    }
  }

  public ChangeMute(mute: boolean) {
    for (const sceneName in this.pool) {
      if (this.pool[sceneName]) {
        if (this.pool[sceneName].app && this.pool[sceneName].loaded) {
          this.pool[sceneName].app.fire("MuteAudio", mute);
        } else if (this.eventQueue != undefined) {
          this.eventQueue.registerEvent(
            sceneName,
            {
              eventName: "MuteAudio",
              eventData: mute,
              eventOwner: undefined,
            },
            true
          );
        }
      }
    }
  }

  private _onAnimationEvent = new EventDispatcher();

  private _onLoopEvent = new EventDispatcher();

  private _onProgressEvent = new EventDispatcher();

  private SubscribeToSceneEvents(simInst: SimInstance) {
    simInst.app.on("OnAnimationDone", () => this._OnAnimationDone(simInst));
    simInst.app.on("OnAnimationLoop", () => this._OnAnimationLoop(simInst));
    simInst.app.on("SharedDataMessage", (key: string, value: string) =>
      this.OnSharedDataMessage(simInst, key, value)
    );
    simInst.app.on("preload:progress", (value: number) =>
      this._OnPreloadProgress(simInst, value)
    );
    simInst.app.on("preload:end", () => this._OnPreloadProgress(simInst, 1));
  }

  public get OnPreloadProgress() {
    return this._onProgressEvent.asEvent();
  }

  private _OnPreloadProgress(simInst: SimInstance, value: number) {
    // logMessage(
    // 	"SimManager.OnPreloadProgress() subscription called from ",
    // 	simInst.sceneName,
    // 	"with value: ",
    // 	value
    // );
    this._onProgressEvent.dispatch(simInst.sceneName, value);
  }

  private _OnAnimationDone(simInst: SimInstance) {
    logMessage(
      "SimManager.OnAnimationDone() subscription called from ",
      simInst.sceneName
    );
    this._onAnimationEvent.dispatch(simInst, simInst.sceneName);
  }

  public get OnAnimationDone() {
    return this._onAnimationEvent.asEvent();
  }

  private _OnAnimationLoop(simInst: SimInstance) {
    // logMessage(
    // 	"SimManager.OnAnimationLoop() subscription called from ",
    // 	simInst.sceneName
    // );
    this._onLoopEvent.dispatch(simInst, simInst.sceneName);
  }

  public get OnAnimationLoop() {
    return this._onLoopEvent.asEvent();
  }

  private OnSharedDataMessage(
    simInst: SimInstance,
    key: string,
    value: string
  ) {
    // logMessage(
    // 	"SimManager.OnSharedDataMessage() from ",
    // 	simInst.sceneName,
    // 	key,
    // 	value
    // );
    //get shared data key's value

    const maybePageID = getCurrentPageID();
    let pageID = "";
    if (maybePageID.isJust()) pageID = maybePageID.unsafelyUnwrap();

    setSharedDataUserOrAppVal(pageID, key, value);
  }

  public ApplyChanges(sceneName: string, state: EntityState) {
    const simInst = this.pool[sceneName];
    if (simInst && simInst.loaded) {
      this.pool[sceneName].app.fire("ApplyChanges", state);
    } else if (this.eventQueue != undefined) {
      //eventQueue can be undefined in the Grapes vue instance.
      this.eventQueue.registerEvent(sceneName, {
        eventName: "ApplyChanges",
        eventData: state,
        eventOwner: undefined,
      }); //add state to queue to be applied later
    }
  }
}
