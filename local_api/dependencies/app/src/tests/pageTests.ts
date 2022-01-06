import { equals } from "ramda";
import { Vue } from "vue-property-decorator";

import Widget from "@/components/Widget";
import { Condition } from "@/data models/conditionModels";
import { Effect } from "@/data models/effectModels";
import { logMessage } from "@/helpers/debugHelpers";

const conditionLists = [
  "conditions",
  "clickEffects",
  "playEffects",
  "pauseEffects",
  "stopEffects",
  "endEffects",
  "loopEffects"
];
const unlockEffects = [
  "unlockNextPage",
  "unlockPage",
  "unlockGuide",
  "unlockCase"
];

export function doWidgetsHaveUnlockEffect(comps: Vue[]): boolean {
  for (const comp of comps) {
    const widget = comp as Widget;
    for (const conditionListName of conditionLists) {
      if (
        comp.$props[conditionListName]
				&& comp.$props[conditionListName].conditionList
      ) {
        for (const condition of comp.$props[conditionListName].conditionList) {
          if (condition.effectsPass) {
            for (const effect of condition.effectsPass) {
              if (unlockEffects.indexOf(effect.effectData.effectType) !== -1) {
                logMessage(
                  effect.effectData.effectType,
                  "on",
                  widget.widgetType,
                  comp.$props.id,
                  conditionListName
                );
                if (condition.comparisons) {
                  logMessage(
                    widget.widgetType,
                    comp.$props.id,
                    conditionListName,
                    "comparisons:",
                    condition.comparisons
                  );
                }
                isWidgetVisibleAndEnabled(comp, comps);
                return true;
              }
            }
          }
        }
      }
    }
    if (doWidgetsHaveUnlockEffect(comp.$children)) return true;
  }
  return false;
}

let lastCompID = "";

function isWidgetVisibleAndEnabled(comp: Vue, comps: Vue[]) {
  if (comp.$props.id === lastCompID) return; // prevent infinite loops
  lastCompID = comp.$props.id;

  if (comp.$props.enabled !== undefined && !comp.$props.enabled) {
    logMessage(comp.$props.id, "not enabled");

    const enableEffect: Effect = {
      effectData: {
        effectType: "updateWidget",
        widgetID: comp.$props.id,
        key: "enabled",
        val: true
      },
      fireOnceID: "",
      delay: 0
    };
    doWidgetsHaveEffect(comps, enableEffect);
  }
  if (!comp.$props.visible) {
    logMessage(comp.$props.id, "not visible");

    const setVisibleEffect: Effect = {
      effectData: {
        effectType: "updateWidget",
        widgetID: comp.$props.id,
        key: "visible",
        val: true
      },
      fireOnceID: "",
      delay: 0
    };
    doWidgetsHaveEffect(comps, setVisibleEffect);
  }
}

function doWidgetsHaveEffect(comps: Vue[], effect: Effect): boolean {
  for (const comp of comps) {
    const widget = comp as Widget;
    for (const conditionListName of conditionLists) {
      if (
        comp.$props[conditionListName]
				&& comp.$props[conditionListName].conditionList
      ) {
        const conditions: Condition[] =					comp.$props[conditionListName].conditionList;
        for (const condition of conditions) {
          if (condition.effectsPass) {
            for (const widgetEffect of condition.effectsPass) {
              if (equals(widgetEffect.effectData, effect.effectData)) {
                logMessage(
                  "on",
                  widget.widgetType,
                  comp.$props.id,
                  conditionListName,
                  widgetEffect.effectData
                );
                if (condition.comparisons) {
                  logMessage(
                    widget.widgetType,
                    comp.$props.id,
                    conditionListName,
                    "comparisons:",
                    condition.comparisons
                  );
                }
                isWidgetVisibleAndEnabled(comp, comps);
                return true;
              }
            }
          }
        }
      }
    }
    doWidgetsHaveEffect(comp.$children, effect);
  }
  return false;
}
