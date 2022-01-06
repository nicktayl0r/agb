import { Sim } from "@/data models/projectModels";
//@ts-ignore

import * as pc from "../../../PlaycanvasEngine/dist/playcanvas-engine";

export function CreatePlaycanvasElement(canvasID: string) {
  const newCanvas = document.createElement("canvas");
  newCanvas.setAttribute("id", canvasID);
  newCanvas.setAttribute("width", "1");
  newCanvas.setAttribute("height", "1");
  newCanvas.setAttribute("tabIndex", "0"); //don't highlight when "tabbing" in the doucment
  document.body.appendChild(newCanvas); //need to append it to the main doucment for a moment, otherwise it doesn't load correctly
  //stole from playcanvas __start__.js
  // Disable I-bar cursor on click+drag
  //@ts-ignore
  newCanvas.onselectstart = function () {
    return false;
  };
  return newCanvas;
}

export function CreatePlaycanvasDevices(newCanvas: HTMLCanvasElement) {
  return {
    elementInput: new pc.ElementInput(newCanvas),
    keyboard: new pc.Keyboard(newCanvas), //might need to get the vue element?
    mouse: new pc.Mouse(newCanvas),
    gamepads: new pc.GamePads(),
    touch: new pc.TouchDevice(newCanvas),
  };
}

//made this to experiment with adding the script order property. typescript only allows pc.ApplicationOptions, so I needed to implement that.
export class elApplicationOptions {
  elementInput: pc.ElementInput | undefined;

  keyboard: pc.Keyboard | undefined;

  mouse: pc.Mouse | undefined;

  gamepads: pc.GamePads | undefined;

  touch: pc.TouchDevice | undefined;

  graphicsDeviceOptions: any | undefined;

  assetPrefix: string;

  scriptPrefix: string;

  scriptOrder: string[] | Number[] | undefined;
}

export function CreatePlaycanvasOptions(devices: any, sim: Sim) {
  const options: elApplicationOptions = {
    elementInput: devices.elementInput,
    keyboard: devices.keyboard,
    mouse: devices.mouse,
    gamepads: devices.gamepads,
    touch: devices.touch,
    graphicsDeviceOptions: {
      antialias: sim.antialias !== undefined ? sim.antialias : true,
      alpha: sim.alpha !== undefined ? sim.alpha : true,
      preserveDrawingBuffer:
        sim.preserveDrawingBuffer !== undefined
          ? sim.preserveDrawingBuffer
          : false,
      preferWebGl2: sim.preferWebGl2 !== undefined ? sim.preferWebGl2 : true,
    },
    assetPrefix: `assets/scenes/${sim.id}/`,
    scriptPrefix: "",
    scriptOrder: [],
  };
  return options;
}

export function configureCss(
  canvas: HTMLCanvasElement,
  fillMode: string,
  width: number,
  height: number
) {
  // Configure resolution and resize event
  if (canvas.classList) {
    canvas.classList.add(`fill-mode-${fillMode}`);
  }
  // css media query for aspect ratio changes
  let css = `@media screen and (min-aspect-ratio: ${width}/${height}) {`;
  css += "    #application-canvas.fill-mode-KEEP_ASPECT {";
  css += "        width: auto;";
  css += "        height: 100%;";
  css += "        margin: 0 auto;";
  css += "    }";
  css += "}";

  // append css to style
  //if (document!.head!.querySelector) //using ! means that you can sure that the member exists. So this test will always return true
  //{
  document!.head!.querySelector("style")!.innerHTML += css;
  //}
}

export function preloadModules(sim: Sim, callback: () => void) {
  if (sim.useBasis) {
    //@ts-ignore
    pc.basisInitialize({
      glueUrl: "../../PlaycanvasEngine/dist/basis.wasm.js",
      wasmUrl: "../../PlaycanvasEngine/dist/basis.wasm.wasm",
      fallbackUrl: "../../PlaycanvasEngine/dist/basis.js",
    });
    callback();
  } else {
    callback();
  }
}
