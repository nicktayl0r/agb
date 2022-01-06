import { without } from "ramda";
import { Maybe } from "true-myth";
import { Component, Prop, Vue } from "vue-property-decorator";


import {
  isChrome, isFirefox, isMobileSafari, isSafari
} from "@/helpers/browserHelpers";
import { ConditionsList } from "@/data models/conditionModels";
import { widgetValPrimitive } from "@/data models/widgetModels";
import { logMessage } from "@/helpers/debugHelpers";
import { getPageID } from "@/helpers/widgetHelpers";
import { commitInitWidgetProps } from "@/store/modules/appData";
import {
  dispatchUserUpdateSharedData,
  dispatchUpdateWidget,
  readWidgetAddRemoveClasses,
  readWidgetEntryVal
} from "@/store/modules/userData";
import { getSharedDataUserOrAppVal } from "@/helpers/sharedDataHelpers";

@Component
export default class Widget extends Vue {
  @Prop({ required: true })
  id: string;

  @Prop({ default: true })
  visible: boolean;

  @Prop()
  conditions: ConditionsList;

  get visibleStore() {
    return this.propStoreOverride("visible");
  }

  pageID: string;

  get notGrapes() {
    return this.$store != undefined;
  }

  created() {
    if (this.notGrapes) {
      this.pageID = getPageID(this);

      commitInitWidgetProps(this.$store, {
        pageID: this.pageID,
        widgetID: this.$props.id,
        props: this.$props,
        conditionsProp: this.$props.conditions
      });
    }
  }

  propStoreOverride(key: string): widgetValPrimitive {
    return this.propStoreOverrideID(this.id, key);
  }

  propStoreOverrideID(widgetID: string, key: string): widgetValPrimitive {
    const propVal = this.$props[key];
    if (this.$store === undefined) return propVal;

    const storeVal = readWidgetEntryVal(this.$store)(
      this.pageID,
      widgetID,
      key
    );

    // this will return propVal if storeVal is Nothing
    const val = Maybe.unwrapOr(propVal, storeVal);

    // if (val === propVal) {
    //   logMessage(widgetID + " " + key + " " + val + " from prop");
    // } else {
    //   logMessage(widgetID + " " + key + " " + val + " from store");
    // }

    return val;
  }

  propSharedDataOverride(
    key: string,
    sharedDataID: string
  ): widgetValPrimitive {
    return this.propSharedDataOverrideID(this.id, key, sharedDataID);
  }

  propSharedDataOverrideID(
    widgetID: string,
    key: string,
    sharedDataID: string
  ): widgetValPrimitive {
    logMessage(
      "propSharedDataOverrideID start with widget: ",
      widgetID,
      ", key: ",
      key,
      ", sharedDataID: ",
      sharedDataID
    );
    const propVal = this.$props[key];
    if (this.$store === undefined) return propVal;

    const storeVal = readWidgetEntryVal(this.$store)(
      this.pageID,
      widgetID,
      key
    );
    let val;
    logMessage("storeVal is nothing: ", Maybe.isNothing(storeVal));
    if (Maybe.isJust(storeVal)) {
      val = storeVal.unsafelyUnwrap();
    } else {
      const sharedDataVal = getSharedDataUserOrAppVal(
        this.$store,
        sharedDataID
      );
      logMessage("sharedDataVal: ", sharedDataVal);
      if (sharedDataVal != undefined) val = sharedDataVal;
      else val = propVal;
    }
    logMessage("propSharedDataOverrideID return: ", val);
    return val;
  }

  /** these updateWidget functions will get called on form actions,
   * such as the user typing in a textbox, or clicking on a checkbox or radio button
   */
  updateWidget(key: string, value: widgetValPrimitive) {
    this.updateWidgetID(this.id, key, value);
  }

  updateWidgetID(widgetID: string, key: string, value: widgetValPrimitive) {
    logMessage(
      `Widget.updateWidget ${
        this.pageID
      } ${
        widgetID
      } ${
        key
      } ${
        value}`
    );

    if (!this.$store) return;

    dispatchUpdateWidget(this.$store, {
      pageID: this.pageID,
      widgetID,
      key,
      value
    });
  }

  updateSharedDataVal(sharedDataID: string, value: widgetValPrimitive) {
    logMessage(
      "updateSharedDataVal - sharedDataID: ",
      sharedDataID,
      ", value: ",
      value
    );
    dispatchUserUpdateSharedData(this.$store, {
      pageID: this.pageID,
      sharedDataID,
      value
    });
  }

  get AddRemoveClasses() {
    if (!this.notGrapes) return "";

    const addedClasses: string[] = [];

    const addRemoveClassesStoreVal = readWidgetAddRemoveClasses(this.$store)(
      this.pageID,
      this.id
    );

    if (addRemoveClassesStoreVal.isJust()) {
      const storeClasses = Maybe.unsafelyUnwrap(addRemoveClassesStoreVal);

      for (const className in storeClasses) {
        // if this was a class defined on the page, remove it from Vue's data obj,
        // we'll handle it dynamically from here
        if (
          this.$vnode.data
          && this.$vnode.data.staticClass
          && this.$vnode.data.staticClass.includes(className)
        ) {
          const oldStaticClasses = this.$vnode.data.staticClass.split(" ");
          const newStaticClasses = without([className], oldStaticClasses);
          this.$vnode.data.staticClass = newStaticClasses.join(" ");
        }

        if (storeClasses[className]) {
          // a class to add
          addedClasses.push(className);
        } else {
          // a class to remove
          if (this.$el) this.$el.classList.remove(className);
        }
      }
    }

    return addedClasses.join(" ");
  }

  get widgetType(): string {
    // @ts-ignore
    return this.constructor.options.name;
  }

  // wrap these browser check functions so widgets can use them in their templates
  isChrome() {
    return isChrome();
  }

  isFirefox() {
    return isFirefox();
  }

  isMobileSafari() {
    return isMobileSafari();
  }

  isSafari() {
    return isSafari();
  }
}
