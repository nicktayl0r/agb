import { Page } from "../../../app/dist";

import grapesjs from "grapesjs";
import {
  debounce,
  find,
  isFunction,
  isObject,
  isString,
  isUndefined,
} from "lodash";

import { AddNonWidgetID, RemoveNonWidgetID } from "./nonWidgetIDs";
import {
  AddWidgetID,
  ChangeWidgetName,
  RemoveWidgetID,
  WidgetIDExists,
} from "./widgetIDs";

export const widgetPropDict = {};

export let compFactories: Array<Function> = [];

export default async (editor: grapesjs.EditorInstance, config = {}) => {
  const domc = editor.DomComponents;

  const em = editor.getModel();

  // enabling hovering allows some elements to bubble through and reveal class
  em.off("change:componentHovered");
  em.off("component:unhovered");

  const defaultType = domc.getType("default");

  if (defaultType === undefined) {
    console.error("couldn't find default component type");
    return;
  }
  const originalInitialize = defaultType.model.prototype.initialize;
  const newDefault = defaultType.model.extend({
    // defaults: Object.assign({}, defaultType.model.prototype.defaults, {
    // 	toolbar: [
    // 		{
    // 			attributes: { class: "fa fa-arrows" },
    // 			command: "tlb-move"
    // 		}
    // 	]
    // })
    initToolbar() {
      CustomToolbar(this);
    },
    initialize() {
      OverrideInitialize(this, originalInitialize, arguments);
    },
  });

  domc.addType("default", {
    model: newDefault,
    view: defaultType.view,
  });

  const defaultModel = newDefault;
  const defaultView = defaultType.view;

  /** overwrite default image component so we can add src as a trait */
  let imageType = domc.getType("image");
  //console.log("imageType", imageType);
  if (imageType) {
    const originalInitialize = imageType.model.prototype.initialize;
    const newImageModel = imageType.model.extend({
      //@ts-ignore
      defaults: Object.assign({}, imageType.model.prototype.defaults, {
        traits: [
          {
            type: "text",
            label: "alt",
            name: "alt",
          },
          {
            type: "text",
            label: "src",
            name: "src",
            changeProp: 1,
          },
        ],
      }),
      initToolbar() {
        CustomToolbar(this);
      },
      initialize() {
        OverrideInitialize(this, originalInitialize, arguments);
      },
    });

    domc.addType("image", {
      model: newImageModel,
      view: imageType.view,
    });
  }

  const containerComponents = [
    "container-enable-disable",
    "container-show-hide",
    "widget-popper",
    "widget-drag",
    "widget-drop",
    "widget-button",
    "widget-radio",
    "widget-checkbox",
    "widget-link",
    "widget-anchor",
    "widget-svg-group",
  ];

  const assetComponents = ["widget-animated-svg", "widget-image"];

  async function compFactoryPromise(
    factory: Function,
    componentName: string,
    componentTagName: string
  ): Promise<any> {
    const vueModule = await factory();
    // the vue component is actually vueModule.default
    await createComponent(vueModule.default, componentName, componentTagName);
  }

  // don't show these props as traits
  // in the case of correctStyle we only want to set it via effect
  const propsToSkip = ["correctStyle", "sceneLoaded_ReadOnly"];

  const page = new Page();
  // console.log(page);
  const components = Object.getPrototypeOf(page.$options.components as object);
  const componentNames = Object.getOwnPropertyNames(components);

  for (const componentName of componentNames) {
    const componentTagName = toKebab(componentName); // component name is in PascalCase, needs to be converted to kebab-case for our custom tag
    // console.log(components[componentName]);
    //console.log(toKebab(componentName), "props:");

    if (
      componentTagName === "store-override-prop" ||
      componentTagName === "page" ||
      componentTagName === "loading-bar"
    ) {
      continue;
    }

    // console.log(componentTagName);

    // if components are not modularized (everything is in build.js)
    // createComponent(components[componentName], componentName, componentTagName);

    // else the component is an async factory function, we need to call it
    // to load the comp in the page to get it's props
    const compFactoryFunc = components[componentName] as Function;
    // this is actually creating a factory function to create a promise to run the vue factory function, sheesh
    // this let's us wait for all of these to finish in storage.ts
    compFactories.push(() =>
      compFactoryPromise(compFactoryFunc, componentName, componentTagName)
    );
  }

  async function createComponent(
    vueComp: any,
    componentName: string,
    componentTagName: string
  ) {
    const props = vueComp.options.props;

    if (props === undefined) return;

    const propNames = Object.getOwnPropertyNames(props);
    // const numProps: number = propNames.length;
    let traitsFromProps = new Array<object>();

    widgetPropDict[componentName] = [];

    for (const i in propNames) {
      const propObject = props[propNames[i]];
      const typeConstructor = propObject.type;

      const typeInstance =
        typeof typeConstructor === "function" ? typeConstructor() : {}; // this is the breaking line
      const typeString = typeof typeInstance;
      // const required = propObect.required;
      const defaultVal = propObject.default;

      widgetPropDict[componentName].push({
        name: propNames[i],
        type: typeString,
      });

      const propNameV = vBindPropName(propNames[i], typeString);
      const traitType = vueTypeToTraitType(typeString, propNameV);

      if (propsToSkip.indexOf(propNames[i]) == -1) {
        traitsFromProps.push({
          type: traitType,
          label: propNames[i],
          name: propNameV,
          default: defaultVal,
          placeholder:
            propNameV === "group-id" || propNameV === "allowed-group-id"
              ? ""
              : undefined,
        });
      }
    }
    // console.log("traitsFromProps for ", componentTagName, traitsFromProps);

    let isDroppable = containerComponents.indexOf(componentTagName) !== -1;
    let isAssetAssignable = assetComponents.indexOf(componentTagName) !== -1;
    let isVoid = !isDroppable; // an element that doesn't require a closing tag

    const componentModel = defaultModel.extend(
      {
        // Extend default properties
        //@ts-ignore
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          // name: componentName,
          tagName: componentTagName,
          // Can be dropped only inside `form` elements
          //draggable: "form, form *",
          // Can't drop other elements inside it
          droppable: isDroppable,
          void: isVoid,
          // Traits (Settings)
          traits: traitsFromProps,
          vueComponentName: componentName, //store the component name, important when changingIDs later
        }),
        // override intitialize so we can set the ID
        initialize(props = {}, opt = {}) {
          // console.log("create component model: " + componentName);
          if (this.getName() == undefined) this.set("name", componentName);

          const attributesPreInit = this.get("attributes"); // if we are loading an existing page we want the attributes from that
          //@ts-ignore
          defaultModel.prototype.initialize.apply(this, arguments);
          const attributesPostInit = this.get("attributes"); // if we are creating a new component we want the post init attributes
          const grapesID = this.ccid;
          const attributes = { ...attributesPostInit, ...attributesPreInit }; // let preInit attributes override postInit

          //console.log("attributes", attributes);
          //console.log("attributes id", attributes.id, "grapes ccid", grapesID);

          let id = grapesID;
          if (attributes.id != undefined) id = attributes.id;

          this.set("attributes", { ...attributes, id });

          if (!WidgetIDExists(id)) {
            // most likely this would happen when loading an existing page
            // don't register IDs for children, they will also get this called on initialize
            RegisterIDs(this, false);
          } else {
            // most likely a duplicated component, don't remove the old id
            // also don't generate new IDs for children, they will also get this called on initialize
            GenerateNewIDs(this, false, false);
          }

          this.on("change:name", () => {
            // console.log("custom name change", this);
            const id = this.get("attributes").id;
            const name = this.getName();
            ChangeWidgetName(id, name);
            // console.log("widgetIDs", widgetIDs);
          });

          /**
           * The grapes view functions call each other a lot,
           * so let's wait for them all to finish (debounce)
           * before we do our vue render for better performance.
           * Added to the model so it is unique per instance
           */
          this.VueRenderComponent = debounce(ActuallyVueRenderComponent, 150);

          // console.log("initialized", this.get("attributes").id, this);
        },
        clone() {
          const clonedID = this.get("attributes").id;
          // console.log("cloned", clonedID);
          //@ts-ignore
          const cloned = defaultType.model.prototype.clone.apply(
            this,
            arguments
          );
          cloned.set("clonedID", clonedID);

          cloneStack.push(cloned);
          // console.log("cloneStack", cloneStack);
          debounceClonePreserveRefs(editor);

          return cloned;
        },
        toHTML(opts = {}) {
          const model = this;
          const attrs: string[] = [];
          const classes = [];
          const tag = model.get("tagName");
          const sTag = model.get("void");
          //@ts-ignore
          const customAttr = opts.attributes;
          let attributes = this.getAttrToHTML();

          // Get custom attributes if requested
          if (customAttr) {
            if (isFunction(customAttr)) {
              attributes = customAttr(model, attributes) || {};
            } else if (isObject(customAttr)) {
              attributes = customAttr;
            }
          }

          for (let attr in attributes) {
            const val = attributes[attr];
            const value = isString(val) ? val.replace(/"/g, "&quot;") : val;

            if (!isUndefined(value)) {
              // here I've removed the logic for boolean attributes, because we don't want them in present/not present format
              attrs.push(`${attr}="${value}"`);
            }
          }

          let attrString = attrs.length ? ` ${attrs.join(" ")}` : "";
          let code = `<${tag}${attrString}${sTag ? "/" : ""}>${model.get(
            "content"
          )}`;
          model.get("components").each((comp) => (code += comp.toHTML(opts)));
          !sTag && (code += `</${tag}>`);

          return code;
        },
      },
      // The second argument of .extend are static methods and we'll put inside our
      // isComponent() method. As you're putting a new Component type on top of the stack,
      // not declaring isComponent() might probably break stuff, especially if you extend
      // the default one.
      {
        isComponent(el) {
          if (
            el.tagName != undefined &&
            el.tagName.toUpperCase() == componentTagName.toUpperCase()
          ) {
            return { type: componentTagName };
          }
          return undefined;
        },
      }
    );

    const componentView = defaultView.extend({
      events: {
        dblclick: "openModal",
        click: "initResize",
      },

      initialize(o) {
        const model = this.model;
        defaultView.prototype.initialize.apply(this, arguments);
        this.listenTo(model, "change:src", this.updateSrc);
        this.listenTo(model, "dblclick active", this.openModal);
        this.classEmpty = `${this.ppfx}plh-image`;
        const config = this.config;
        config.modal && (this.modal = config.modal);
        config.am && (this.am = config.am);
        // console.log("vueComponentName:", model.get("vueComponentName"));
        if (model.get("vueComponentName") == "WidgetArrow") {
          //limiting the extra subscriptions to widgetArrow for now. Might be nice for Popper?
          // console.log("frame element", editor.Canvas.getFrameEl());
          window.addEventListener(
            "load",
            () => {
              // console.log("editor canvas load");
              this.render();
            },
            false
          );
          const iFrame = editor.Canvas.getFrameEl() as HTMLIFrameElement;
          if (iFrame != null) {
            iFrame.contentWindow!.addEventListener(
              "resize",
              () => {
                // console.log("canvas iframe resize");
                if (model.VueRenderComponent)
                  model.VueRenderComponent(this, editor, editor.$);
              },
              false
            );
          }
        }
      },
      /**
       * Update src attribute
       * @private
       */
      updateSrc() {
        const src = this.model.get("src");
        // console.log("updateSrc src:" + src);
        for (var i in this.model.target) console.log("\t" + JSON.stringify(i));
        console.log(this.model);

        //const attributes = this.model.get("attributes");
        this.model.attributes.attributes.src = src;
        //this.model.set("attributes", attributes);

        var em = this.opts.config.em;
        var editor = em ? em.get("Editor") : "";
        editor.TraitManager.render();

        this.updateAttributes();
      },

      /**
       * Open dialog for image changing
       * @private
       */
      openModal(e) {
        // console.log("openModal isAssetAssignable?" + isAssetAssignable);
        var em = this.opts.config.em;
        var editor = em ? em.get("Editor") : "";

        if (editor && isAssetAssignable) {
          editor.runCommand("open-assets", {
            target: this.model,
            types: ["animated-svg"],
            accept: "image/*",
            onSelect() {
              editor.Modal.close();
              editor.AssetManager.setTarget(null);
            },
          });
        }
      },

      getChildrenContainer() {
        let defaultSlot = this.el.querySelector(".defaultSlot");

        if (
          !defaultSlot &&
          this.el.className.split != undefined &&
          this.el.className.split(" ").indexOf("defaultSlot") > -1
        ) {
          defaultSlot = this.el;
        }

        if (defaultSlot) return defaultSlot;
        return this.el;
      },
      render() {
        if (defaultType) {
          defaultType.view.prototype.updateAttributes.apply(this, arguments);
          // updateAttributes calls updateHighlight and updateStyle
        }
        this.updateContent();
        // this.renderChildren(); // do this after we do our vue render and have them in the right slot
        this.updateScript();
        this.onRender();

        if (this.model.VueRenderComponent)
          this.model.VueRenderComponent(this, editor, editor.$);
        return this;
      },
      updateAttributes: function () {
        //console.log("updateAttributes el", this.el);
        if (defaultType)
          defaultType.view.prototype.updateAttributes.apply(this, arguments); // updateAttributes calls updateHighlight and updateStyle
        if (this.model.VueRenderComponent)
          this.model.VueRenderComponent(this, editor, editor.$);
      },
      updateStatus: function () {
        // console.log("updateStatus el", this.el);
        //called by view after state changes (selected, etc)
        if (defaultType)
          defaultType.view.prototype.updateStatus.apply(this, arguments);
        // this shouldn't really be necessary, but it's only way I could figure out
        // to set pointer-events:all on non vue rendered children after they re-render
        if (this.model.VueRenderComponent)
          this.model.VueRenderComponent(this, editor, editor.$);
      },
    });

    domc.addType(componentTagName, {
      model: componentModel,
      view: componentView,
    });

    //console.log(domc.getType(componentTagName));
  }

  //console.log(domc.componentTypes);

  /** After a block root component is removed,
   * unregister its ID with the widgetID list
   */
  editor.on("component:remove", (removedComp) => {
    const id = removedComp.get("attributes").id;
    // console.log("component:remove", id, removedComp);
    UnRegisterIDs(removedComp);
    return removedComp;
  });

  /** We need this when existing elements
   * are moved around in a page
   */
  editor.on("component:add", (addedComp) => {
    const id = addedComp.get("attributes").id;
    // console.log("component:add", id, addedComp);
    RegisterIDs(addedComp);
  });

  editor.on("canvas:drop", (data, addedComp) => {
    if (addedComp === undefined) return;
    if (addedComp.options && addedComp.options.temporary === 1) return;

    GenerateNewIDs(addedComp);
    preserveConditionReferences(addedComp, editor);
    editor.DomComponents.render(); // hack to to address the "double entry" bug. https://github.com/artf/grapesjs/issues/569
  });

  /** Overide the basic text component.
   * Only become a text node when in a span, p, heading tag
   */
  const originalTextComp = editor.DomComponents.getType("text");
  if (originalTextComp) {
    const originalTextInitialize = originalTextComp.model.prototype.initialize;
    const newText = originalTextComp.model.extend({
      initToolbar() {
        CustomToolbar(this);
      },
      initialize() {
        OverrideInitialize(this, originalTextInitialize, arguments);
      },
    });

    const allowedTextTags = ["P", "SPAN", "H1", "H2", "H3", "H4", "H5", "H6"];
    editor.DomComponents.addType("text", {
      model: newText,
      isComponent: function (el) {
        //if el tag name is in the array, then we can be a text component
        if (allowedTextTags.indexOf(el.tagName) > -1) return { type: "text" };
        else return undefined;
      },
      view: originalTextComp.view,
    });
  }

  // Add new element to contain comments

  var textnodeType = domc.getType("textnode");
  if (textnodeType) {
    domc.addType("inline-comment", {
      model: textnodeType.model.extend(
        {
          toHTML() {
            return `<!--${this.get("content")}-->`;
          },
        },
        {
          isComponent(el) {
            if (el.nodeType == 8) {
              return {
                tagName: "NULL", // just need this to avoid some parser rule
                type: "inline-comment",
                content: el.textContent,
              };
            }
            return null;
          },
        }
      ),
      view: textnodeType.view,
    });
  }

  var tableType = domc.getType("table");
  if (tableType) {
    const originalInitialize = tableType.model.prototype.initialize;
    const newTableModel = tableType.model.extend({
      initToolbar() {
        CustomToolbar(this);
      },
      initialize() {
        OverrideInitialize(this, originalInitialize, arguments);
      },
    });
    domc.addType("table", {
      model: newTableModel,
      view: tableType.view,
    });
  }
};

function UnRegisterIDs(component) {
  if (component == undefined) return;
  if (component.opt && component.opt.temporary == 1) return;
  if (component instanceof Array) {
    for (const child of component) {
      UnRegisterIDs(child);
      return;
    }
  }

  const compID = component.get("attributes").id;
  if (compID) {
    RemoveWidgetID(compID);
    RemoveNonWidgetID(compID);
  }
  if (component.get("components").models.length > 0)
    for (let child of component.get("components").models) {
      UnRegisterIDs(child);
      RemoveNonWidgetID(compID);
    }
}

function RegisterIDs(component, children: boolean = true) {
  if (component == undefined) return;
  if (component.opt && component.opt.temporary == 1) return;
  if (component instanceof Array) {
    for (const child of component) {
      RegisterIDs(child);
      return;
    }
  }

  if (component.get("attributes").id != undefined) {
    AddWidgetID(
      component.get("attributes").id,
      component.getName(),
      component.get("vueComponentName"),
      component
    );
  }

  if (children) {
    for (let child of component.get("components").models) {
      RegisterIDs(child);
    }
  }
}

function GenerateNewIDs(
  component,
  removeOldID: boolean = true,
  children: boolean = true
) {
  if (!component) return;
  if (component.opt && component.opt.temporary == 1) return;

  if (component.get("attributes").id != undefined) {
    //this component has an id, let's change it.

    const attr = component.get("attributes");
    const origID = attr.id;
    const newID = createId();
    component.set("attributes", { ...attr, id: newID });

    const traits = component.get("traits");
    traits.models[0].set("value", newID); // I don't know why but this is necessary to update the id trait

    if (removeOldID) RemoveWidgetID(origID);
    if (component.get("vueComponentName") != undefined) {
      //non widgets are leaking into the widgetID list if they are in a block and have an ID
      AddWidgetID(
        newID,
        component.getName(),
        component.get("vueComponentName"),
        component
      );
    }
  }
  if (children) {
    for (let child of component.get("components").models) {
      GenerateNewIDs(child, removeOldID);
    }
  }
}

async function delay(milliseconds: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

/**
 * Take in an <element> a return the vue rendered result.
 */
async function ActuallyVueRenderComponent(
  componentView: grapesjs.ComponentView,
  editor: grapesjs.EditorInstance,
  $
) {
  if (componentView.model.opt && componentView.model.opt.temporary === 1) {
    return;
  }

  const inEl: HTMLElement = componentView.el;

  // see if the component was hidden in the hierarchy
  const modelStyle = componentView.model.getStyle();
  if (modelStyle && modelStyle.display === "none") return;

  const attrs = componentView.model.get("attributes");
  const classes = inEl.className;
  // console.log("attrs", attrs);

  // we need the inEl to be the vue component tag
  const modelTag = componentView.model.get("tagName");
  // console.log(inEl.tagName.toLowerCase(), modelTag);
  if (inEl.tagName.toLowerCase() !== modelTag) {
    // console.log(
    // 	"render el before",
    // 	componentView.el,
    // 	componentView.el.parentElement
    // );

    const parentEl = inEl.parentElement;
    // console.log("parent", parentEl);
    if (parentEl) {
      const newEl = document.createElement(modelTag);
      // console.log("new newEl", newEl);

      for (let key in attrs) {
        newEl.setAttribute(key, attrs[key]);
      }
      newEl.className = classes;
      // console.log("new newEl attrs", newEl);

      parentEl.replaceChild(newEl, inEl);
      componentView.el = newEl;
    }
    // console.log("render el after", componentView.el);
  }

  // don't let vue actully set it invisible, insteady give it a low opacity
  let setInvisible = attrs[":visible"] == false;
  if (setInvisible) {
    componentView.el.setAttribute(":visible", "true");
    // we'll set the opacity after rendering
  }

  const toRender = <HTMLElement>componentView.el.cloneNode(false);
  const voidElement = componentView.model.get("void");
  if (voidElement === false) {
    toRender.innerHTML = "<span class='defaultSlot'></span>";
  }

  const vm = new Page({ template: toRender.outerHTML });
  vm.$mount(componentView.el);

  //console.log("vue instance", vm);
  // console.log("vue render", vm.$el.outerHTML);

  // console.log("$el before", componentView.el);

  let mountedEl: HTMLElement = vm.$el;

  let waitCount = 0;
  // for some reason the el is a comment before it renders
  while (mountedEl.nodeType == Node.COMMENT_NODE && waitCount < 20) {
    waitCount++;
    mountedEl = vm.$el;
    // console.log(
    // 	"waiting for rendering",
    // 	waitCount,
    // 	mountedEl.nodeType,
    // 	inEl.id
    // );
    await delay(50);
  }

  componentView.el = mountedEl;

  // console.log("$el after", componentView.el);

  // make template children not clickable
  for (let i = 0; i < mountedEl.childNodes.length; i++) {
    if (mountedEl.childNodes[i].nodeType === Node.ELEMENT_NODE) {
      const htmlEl = <HTMLElement>mountedEl.childNodes[i];
      //console.log("child", htmlEl);
      htmlEl.style["pointer-events"] = "none";
    }
  }

  const defaultSlotChild = mountedEl.querySelector(".defaultSlot");
  if (defaultSlotChild) {
    const slotParent = defaultSlotChild.parentElement;
    if (slotParent) {
      slotParent.classList.add("defaultSlot");
      slotParent.removeChild(defaultSlotChild);
      // console.log("slotParent", slotParent);

      const content = componentView.model.get("content");
      if (content) {
        //console.log("adding content", content);
        slotParent.innerHTML = content;
      }

      componentView.renderChildren();

      // make children clickable
      // console.log("slot with", slotParent.childNodes.length, "children");
      for (let i = 0; i < slotParent.childNodes.length; i++) {
        if (slotParent.childNodes[i].nodeType === Node.ELEMENT_NODE) {
          const htmlEl = <HTMLElement>slotParent.childNodes[i];
          //console.log("child", htmlEl);
          htmlEl.style["pointer-events"] = "all";
        }
      }
    }
  }

  // make self clickable
  componentView.el.style["pointer-events"] = "all";

  if (componentView.model.get("highlightable")) {
    componentView.el.setAttribute("data-highlightable", "1");
  }

  const mountedComputedStyle = getComputedStyle(componentView.el, undefined);
  //console.log("mountedComputedStyle", mountedComputedStyle);
  let mountedDisplayStyle = mountedComputedStyle.getPropertyValue("display");
  // console.log("mountedDisplayStyle", mountedDisplayStyle);

  // this should let the inEl be sized correctly and clickable
  if (!mountedDisplayStyle || mountedDisplayStyle == "inline") {
    componentView.el.style.display = "inline-block";
  }

  if (setInvisible) {
    componentView.el.style.opacity = "0.2";
  }

  // we don't really need vue to hang around and do stuff, just render once
  // with the exception of poppers, which need to reposition
  if (modelTag !== "widget-popper") vm.$destroy();

  componentView.$el = $(componentView.el); // grapes uses this cash-dom version of the el
  // and these cash-dom data associations to know which component to select when you click an element
  $(componentView.el).data("model", componentView.model);
  $(componentView.el).data("collection", componentView.model.get("components"));
  // console.log($(componentView.el).data());

  if (modelTag == "widget-animated-svg") {
    componentView.el.addEventListener("click", function (e) {
      // console.log("click!", componentView.el);
      //componentView.model.trigger("click");
      if (editor) editor.select(componentView.model);
    });

    componentView.el.addEventListener("dblclick", function (e) {
      // console.log("dblclick!", componentView.el);
      componentView.model.trigger("dblclick active");
    });
  } else if (modelTag == "widget-image") {
    componentView.el.addEventListener("dblclick", function (e) {
      // console.log("dblclick!", componentView.el);
      componentView.model.trigger("dblclick active");
    });
  }

  // console.log("outEL", componentView.el);
}

function toKebab(name: string) {
  return name.replace(/([a-zA-Z])([A-Z])/g, "$1-$2").toLowerCase();
}

function vueTypeToTraitType(type: string, propNameV: string): string {
  if (propNameV === "correct-drop-ids") return "json";
  if (propNameV === "allowed-group-id") return "text";
  if (propNameV === "group-id") return "text";
  switch (type) {
    case "boolean":
      return "checkboxFix";
    case "string":
      if (propNameV === "id") return "textReadOnly";
      if (select2Props.indexOf(propNameV) !== -1) return "select2";
      if (propNameV === "color") return "color";
      if (
        propNameV === "src" ||
        propNameV === "src-mp4" ||
        propNameV === "src-webm" ||
        propNameV === "src-mp4ios" ||
        propNameV === "poster" ||
        propNameV === "static-mask" ||
        propNameV === "data"
      )
        return "sourcePath";
      return "text";
    case "number":
      return "numberFix";
    case "object":
      return "json";
  }
  return "text";
}

export const select2Props = [
  //a list of props that need the select2 drop down
  "anchor-id",
  "drop-id",
  "scenename",
  "simstateid",
  "play-state",
  "shared-data-read-key",
  "shared-data-write-key",
  "target-id",
  "source-id",
  "sim-widget-id",
  "filter",
  "format",
  "overflow-style",
];

const idProps = [
  //a list of props that are for widgetIDs
  "anchor-id",
  "drop-id",
  "target-id",
  "source-id",
  "sim-widget-id",
];

// props that are not strings require a v-bind
function vBindPropName(propName: string, type: string): string {
  const kebabPropName = toKebab(propName);
  if (type !== "string") return ":" + kebabPropName;
  return kebabPropName;
}

export const conditionProps = [
  ":conditions",
  ":click-effects",
  ":play-effects",
  ":pause-effects",
  ":stop-effects",
  ":end-effects",
  ":loop-effects",
  ":change-effects",
  ":scene-loaded-effects",
];

interface referenceIDPair {
  referenceID: string;
  actualID: string;
}
export let referenceIDPairs: Array<referenceIDPair> = [];

function getReferenceIDPairs(addedComp) {
  if (addedComp instanceof Array) {
    addedComp.map((comp) => getReferenceIDPairs(comp));
    return;
  }

  const attr = addedComp.get("attributes");
  const prevAttr = addedComp._previousAttributes.attributes;
  const clonedID = addedComp.get("clonedID");

  if (clonedID && attr.id !== clonedID) {
    // console.log("comparing clonedID", clonedID, attr.id);
    referenceIDPairs.push({ referenceID: clonedID, actualID: attr.id });
  } else if (prevAttr.id && attr.id !== prevAttr.id) {
    // console.log("comparing prevAttrID", prevAttr.id, attr.id);
    referenceIDPairs.push({ referenceID: prevAttr.id, actualID: attr.id });
  }

  if (attr.group) {
    if (!find(referenceIDPairs, (id) => id.referenceID === attr.group)) {
      referenceIDPairs.push({ referenceID: attr.group, actualID: createId() });
    }
  }
  addedComp.attributes.components.models.map((comp) =>
    getReferenceIDPairs(comp)
  );
}

function replaceReferenceIDs(addedComp, editor) {
  if (addedComp instanceof Array) {
    addedComp.map((comp) => replaceReferenceIDs(comp, editor));
    return;
  }

  const attr = addedComp.get("attributes");
  for (let prop of conditionProps) {
    if (attr[prop]) {
      for (let id of referenceIDPairs) {
        let dedupedID = id.referenceID.split("-")[0]; // grapes now adds -2 etc to the end of duplicate IDs, account for that
        attr[prop] = attr[prop].replace(
          new RegExp(dedupedID, "g"),
          id.actualID
        );
        // console.log("replaced", attr[prop], id.referenceID, id.actualID);
      }
    }
  }
  for (let idProp of idProps) {
    if (attr[idProp] != undefined) {
      for (let id of referenceIDPairs) {
        let dedupedID = id.referenceID.split("-")[0]; // grapes now adds -2 etc to the end of duplicate IDs, account for that
        attr[idProp] = attr[idProp].replace(
          new RegExp(dedupedID, "g"),
          id.actualID
        );
        // console.log("replaced", attr[idProp], id.referenceID, id.actualID);
      }
    }
  }
  if (attr.group) {
    const groupIDs = find(
      referenceIDPairs,
      (id) => id.referenceID === attr.group
    );
    if (groupIDs) attr.group = groupIDs.actualID;
  }
  addedComp.set("attributes", attr);
  if (addedComp.view !== undefined) addedComp.view.render();
  addedComp.attributes.components.models.map((comp) =>
    replaceReferenceIDs(comp, editor)
  );
}

let cloneStack: Array<any> = [];

const debounceClonePreserveRefs = debounce(
  clonePreserveConditionReferences,
  100
);

function clonePreserveConditionReferences(editor) {
  // console.log(
  // 	"Attempting to preserve condition references on cloned components",
  // 	cloneStack
  // );
  referenceIDPairs = [];
  cloneStack.map((comp) => getReferenceIDPairs(comp));
  cloneStack.map((comp) => replaceReferenceIDs(comp, editor));
  // console.log("cloned referenceIDPairs", referenceIDPairs);
  cloneStack = [];
}

function preserveConditionReferences(component, editor) {
  referenceIDPairs = [];
  getReferenceIDPairs(component);
  replaceReferenceIDs(component, editor);
  // console.log("preserved referenceIDPairs", referenceIDPairs);
}

let componentIndex = 0;
function createId() {
  componentIndex++;
  // Testing 1000000 components with `+ 2` returns 0 collisions
  const ilen = componentIndex.toString().length + 2;
  const uid = (Math.random() + 1.1).toString(36).slice(-ilen);
  const nextId = "i" + uid;
  return nextId;
}

function CustomToolbar(model) {
  if (!model.get("toolbar")) {
    const tb: any[] = [];
    if (model.collection) {
      tb.push({
        attributes: { class: "fa fa-arrow-up" },
        command: "select-parent",
      });
    }
    if (model.get("draggable")) {
      tb.push({
        attributes: { class: "fa fa-arrows", draggable: true },
        //events: hasDnd(this.em) ? { dragstart: 'execCommand' } : '',
        command: "tlb-move",
      });
    }
    if (model.get("copyable")) {
      tb.push({
        attributes: { class: "fa fa-clone" },
        command: "tlb-clone",
      });
    }
    if (model.get("removable")) {
      tb.push({
        attributes: { class: "fa fa-trash-o" },
        command: "tlb-delete",
      });
    }

    //set our new button
    tb.unshift({
      attributes: { class: "fa fa-bookmark" },
      command: "project-block-modal",
    });
    model.set("toolbar", tb);
  }
}

function OverrideInitialize(model, originalInitialize, args) {
  // const attributesPreInit = this.get("attributes"); // if we are loading an existing page we want the attributes from that
  //@ts-ignore
  originalInitialize.apply(model, args);
  // const attributesPostInit = this.get("attributes"); // if we are creating a new component we want the post init attributes
  const vCN = model.get("vueComponentName");
  if (vCN == undefined) {
    //only want to pay attention to components that aren't our vue components.
    // console.log("componentName", this.get("vueComponentName"));
    const attributes = model.get("attributes");
    // console.log("override default init", attributes);
    if (attributes.id) {
      //do something to register the ID
      AddNonWidgetID(
        attributes.id,
        model.getName(),
        model.get("tagName"),
        model
      );
    }
    model.on("change:attributes:id", () => {
      console.log("change: attributes:id");
      const id = model.get("attributes").id;
      const changed = model.previousAttributes().attributes.id;
      // console.log("custom id change:", id, "from ", changed);
      //if changed!= undefined, remove it
      if (changed) {
        RemoveNonWidgetID(changed);
      }
      AddNonWidgetID(id, model.getName(), model.get("tagName"), model);
    });
  }
}
