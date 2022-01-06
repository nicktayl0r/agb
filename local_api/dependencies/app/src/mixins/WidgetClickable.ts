import debounce from "debounce";
import { Component, Prop } from "vue-property-decorator";

import Widget from "@/components/Widget";
import { ConditionsList } from "@/data models/conditionModels";
import { logMessage } from "@/helpers/debugHelpers";
import { runWidgetEventConditions } from "@/helpers/widgetHelpers";

@Component
export default class WidgetClickable extends Widget {
  @Prop() clickEffects: ConditionsList;

  /** this will get called when widgets is clicked,
   * note that @click="clicked" is still needed in the template
   */
  clicked() {
    if (!this.$store || !this.notGrapes) return;

    this.debouncedClick(this, this.$props.id, this.$props.clickEffects);
  }

  // add a timeout to prevent double clicks from running conditional effects multiple times before they have applied
  // for example: button click has effects that disables the button and also increments a sharedData
  // we don't want to allow an increment SD again before the button gets disabled
  debouncedClick = debounce(
    (widget: Widget, id: string, clickEffects: ConditionsList) => {
      const visible = this.propStoreOverride("visible");
      let enabled = this.propStoreOverride("enabled");
      logMessage(id, "clicked. visible", visible, "enabled", enabled);
      // it's unlikely, but it's possible that we could have a widget that has the WidgetClickable mixin, but not the WidgetEnabled mixin
      if (enabled == undefined) enabled = true;
      if (visible && enabled) {
        runWidgetEventConditions(widget, clickEffects, id);
      }
    },
    225,
    true
  );
}
