import Backbone from "backbone";
import grapesjs from "grapesjs";
import flexboxPlugin from "grapesjs-blocks-flexbox";
import ckeditorPlugin from "grapesjs-plugin-ckeditor";
import gradientPlugin from "grapesjs-style-gradient";
import parserPostCSS from "grapesjs-parser-postcss";

import loadAssets from "./assets";
import loadBlocks from "./blocks";
import loadCommands from "./commands";
import loadComponents from "./components";
import loadPanels from "./panels";
import loadProjectSimData from "./projectSimInfo";
import loadRouter, { currentPageID } from "./router";
import loadCkeSettings from "./rte/ckesettings";
import loadStorage from "./storage";
import loadSMClassesAutocomplete from "./StyleManagerClassesAutocomplete";
import loadStyles from "./styles";
import loadTraits from "./traits";

const CodeMirrorWithPlugins = require("./commands/edit_source/CodeMirrorEditor");

const vueStyles = ["./dist/css/vue-extracted-styles.css"];
// const caseStyle = GetCaseCSS(); //"../Project/assets/case.css";
const editorIframeStyle = "editoriframe.css";

export default grapesjs.plugins.add(
  "project-api-plugin",
  (editor: grapesjs.EditorInstance, opts = {}) => {
    const options = {
      ...{
        // default options
        apiBaseURL: GetApiUrl(),
      },
      ...opts,
    };

    loadComponents(editor, options);
    loadStorage(editor, options);
    loadRouter(editor, options);
    loadBlocks(editor, options);
    loadCommands(editor, options);
    loadPanels(editor, options);
    loadTraits(editor, options);
    loadAssets(editor, options);
    loadStyles(editor, options);
    loadCkeSettings();
    loadProjectSimData();
  }
);

function GetCaseCSS() {
  const apiURL = GetApiUrl();
  const toReturn= apiURL.replace("api/", "project/assets/case.css");
  console.log("case css url:", toReturn)
  return toReturn;
}

function GetApiUrl() {
  const url = window.location.href;
  const split = url.split("/");
  // console.log("url split", split);
  if (split.length >= 3) {
    if (split[2].includes("8080") || split[2].includes("8081")) {
      return "http://localhost:8000/api/";
    } else {
      split.length = 3;
      return split.join("/") + "/api/";
    }
  } else return split.join("/") + "/api/";
}

// we need to do this to call the factory function for these other plugins
const loadGradientPlugin = gradientPlugin;
const loadCkeditorPlugin = ckeditorPlugin;
const loadFlexboxPlugin = flexboxPlugin;

const editor = grapesjs.init({
  height: "100%",
  showOffsets: 1,
  noticeOnUnload: 0,
  avoidInlineStyle: 0, // setting this to 1 saves eyeball icon display:none to the page with the id selector of the element, I don't think we want that.

  storageManager: { autoload: 0, type: "remote" },

  container: "#gjs2",
  fromElement: true,

  canvas: {
    styles: [
		editorIframeStyle,
		"https://fonts.googleapis.com/css?family=Roboto:normal,bold&display=swap",
		...vueStyles,
		GetCaseCSS()], // apply css for vue components to canvas
  },

  plugins: [
    "project-api-plugin",
    "gjs-style-gradient",
    "gjs-plugin-ckeditor",
    // "gjs-blocks-flexbox", // this plugin contained a flexbox starter block that was deemed to be unnessecary. Can be restored, if needed
    parserPostCSS
  ],
  pluginsOpts: {
    "project-api-plugin": {},
    "gjs-style-gradient": {
      colorPicker: "default",
      grapickOpts: {
        min: 1,
        max: 99,
      },
    },
  },
  layerManager: {
    appendTo: "#layers-container",
    showWrapper: 0,
  },
  blockManager: {
    appendTo: "#blocks",
  },
  styleManager: {
    appendTo: "#style-manager-container",
  },
  selectorManager: {
    appendTo: "#selectors-container",
  },
  traitManager: {
    appendTo: "#traits-container",
  },
  panels: {
    defaults: [
      {
        id: "layers",
        el: "#layers",
        resizable: {
          tc: 0,
          bc: 0,
          cl: 1,
          cr: 0,
          keyWidth: "flex-basis",
          // onStart: iFrameSixteenByTen,
          // onMove: iFrameSixteenByTen,
          onEnd: iFrameSixteenByTen,
        },
      },
      {
        id: "styles",
        el: "#style-manager",
        resizable: {
          tc: 0,
          bc: 0,
          cl: 1,
          cr: 0,
          keyWidth: "flex-basis",
          // onStart: iFrameSixteenByTen,
          // onMove: iFrameSixteenByTen,
          onEnd: iFrameSixteenByTen,
        },
      },
      {
        id: "blocks",
        el: "#blocks",
        resizable: {
          tc: 0,
          bc: 0,
          cl: 0,
          cr: 1,
          keyWidth: "flex-basis",
          // onStart: iFrameSixteenByTen,
          // onMove: iFrameSixteenByTen,
          onEnd: iFrameSixteenByTen,
        },
      },
      {
        id: "options",
        el: "#options",
      },
    ],
  },
  deviceManager: {
    devices: [
      {
        name: "Less wide (16:10) - 150px (progress bar)",
        width: "100%",
        height: "100%",
        class: "SixteenByTen",
      },
      {
        name: "Narrow (4:3) - 150px (progress bar)",
        width: "100%",
        height: "100%",
        class: "FourByThree",
      },
      {
        name: "Less narrow (3:2) - 150px (progress bar)",
        width: "100%",
        height: "100%",
        class: "ThreeByTwo",
      },
      {
        name: "Wide (16:9) - 150px (progress bar)",
        width: "100%",
        height: "100%",
        class: "SixteenByNine",
      },
      {
        name: "Auto - stay between 4:3 and 16:9 with a min size of 640x480px",
        width: "100%",
        height: "100%",
        class: "auto",
      },
      {
        name: "Smallest [490x480] (4:3) 640x480 - 150px (progress bar)",
        width: "490px",
        height: "480px",
      },
      {
        name:
          "old iPad landscape [874x768] (4:3) 1024x768 - 150px (progress bar)",
        width: "874px",
        height: "768px",
      },
      {
        name:
          "new iPad landscape [1898x1536] (4:3) 2048x1536 - 150px (progress bar)",
        width: "2048px",
        height: "1536px",
      },
      {
        name: "720p [1130x720] (16:9) 1280x720 - 150px (progress bar)",
        width: "1130px",
        height: "720px",
      },
      {
        name: "1080p [1770x1080] (16:9) 1920x1080 - 150px (progress bar)",
        width: "1770px",
        height: "1080px",
      },
      {
        // without a device with empty width everything breaks as of grapes 0.14.52 :( !!!!!
        name: "Fill Canvas",
        width: "",
      },
    ],
    deviceLabel: "Canvas",
  },
  showDevices: false,
});
window["editor"] = editor;

console.log("grapes version", grapesjs.version);
console.log("keymaps", editor.Keymaps.getAll());

// const myDeviceManagerParent = document.querySelector("#devices");
// if (myDeviceManagerParent) {
// 	const renderedDM = editor.DeviceManager.render();
// 	myDeviceManagerParent.appendChild(renderedDM);
// 	const selectEl = renderedDM.getElementsByClassName(
// 		"gjs-devices"
// 	) as HTMLSelectElement;
// 	// console.log("selectEl", selectEl);
// 	$(selectEl).val("Less wide (16:10) - 150px (progress bar)");
// }

// fired when the Editor has loaded
editor.on("load", () => {
  // const wrapperEL = editor.Canvas.getWrapperEl();
  // wrapperEL.className = "SixteenByTen";
  loadSMClassesAutocomplete(editor);
  editor.CodeManager.addViewer("CodeMirror", new CodeMirrorWithPlugins());
  iFrameSixteenByTen();
});

// editor.on("change:device", () => {
// 	const em = editor.getModel();
// 	const device = em.getDeviceModel();
// 	const wrapperEL = editor.Canvas.getWrapperEl();
// 	if (device) {
// 		const classVal = device.get("class");
// 		if (classVal) wrapperEL.className = classVal;
// 		else wrapperEL.className = "";
// 	}
// });

window.onresize = function () {
  iFrameSixteenByTen();
  // 	const wrapperEL = editor.Canvas.getWrapperEl();
  // 	// const width = wrapperEL.offsetWidth;
  // 	// const height = wrapperEL.offsetHeight;
  // 	// const ratio = width / height;
  // 	// if (ratio > 1.7777 || ratio < 1.33333)
  // 	// console.log("width", width, "height", height, "ratio", ratio);
  // 	const widthMod = wrapperEL.offsetWidth + 150;
  // 	const heightMod = wrapperEL.offsetHeight;
  // 	const ratioMod = widthMod / heightMod;
  // 	// console.log(
  // 	// 	"widthMod",
  // 	// 	widthMod,
  // 	// 	"heightMod",
  // 	// 	heightMod,
  // 	// 	"ratioMod",
  // 	// 	ratioMod
  // 	// );
};

function iFrameSixteenByTen() {
  const iframes = document.getElementsByTagName("iframe");
  if (iframes[0]) {
    const iframeEl = iframes[0] as Element;
    if (iframeEl) {
      const computed = window.getComputedStyle(iframeEl);
      const width = computed.getPropertyValue("width");
      // console.log("width", width);
      const widthNum = Number(width.substring(0, width.length - 2)); // trim out "px" and convert to a number
      const progressBarPX = 150;
      const height = (widthNum + progressBarPX) * (10 / 16);
      console.log("iFrameSixteenByTen", widthNum, height);
      iframeEl.setAttribute("style", "height: " + height + "px");
    }
  }
}

// add gradient plugin to StyleManager
editor.StyleManager.addProperty("Decorations", {
  name: "Gradient",
  property: "background-image",
  type: "gradient",
  defaults: "none",
});

// fired on Asset Manager model opening
editor.on("run:open-assets", () => {
  const am = editor.AssetManager;
  const amConfig = am.getConfig();
  const up = "upload";
  const currentRoute = Backbone.history.getFragment();
  const path = currentRoute.split("/");

  // disable upload if route is incorrect
  amConfig[up] = "false";
  if (path[0].toUpperCase() === "PAGES") {
    if (path[1].toUpperCase() === "CASE" || path[1].toUpperCase() === "GUIDE") {
      const module = path[1];
      console.log(module);
      // set API endpoint module for AssetManager upload config
      amConfig[up] = "http://localhost:8000/api/project/files/" + module;
    }
  }
});

/** Add the page id to everything that is dropped in the canvas. */
// fired when something is dropped in the canvas
editor.on("canvas:drop", (data, addedComp) => {
  // const classes= addedComp.get("attributes").classes;
  AddPageClassToChildren(addedComp);
});

function AddPageClassToChildren(comp: grapesjs.Component) {
  if (typeof comp.getAttributes !== "undefined") {
    const classes: string = ((<grapesjs.Component>comp).getAttributes() as any)
      .class; //object of strings for html attrs
    // console.log("classes: ", classes, ", currentPageID: ", currentPageID);
    if (classes) {
      if (
        !classes.match(new RegExp("/\b" + "page" + currentPageID + "\b", "g"))
      ) {
        //if we don't already have a pagePageID class, add one.
        comp.addClass("page" + currentPageID);
      }
    } else {
      //if we don't already have a pagePageID class, add one.
      comp.addClass("page" + currentPageID);
    }
  }
  for (let child of comp.get("components").models) {
    // console.log("I have a child: ", child);
    AddPageClassToChildren(child); //recurse through the children
  }
}


