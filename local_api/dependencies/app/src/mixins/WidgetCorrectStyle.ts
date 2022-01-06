import { Component, Prop } from "vue-property-decorator";

import Widget from "@/components/Widget";

@Component
export default class WidgetCorrectStyle extends Widget {
  // this should only be set in conditions,
  // otherwise users can cheat by seeing the correct style in the page source
  @Prop({ default: false })
  correctStyle: boolean;

  get addCorrectStyleClass(): boolean {
    const correctStyleStore = this.propStoreOverride("correctStyle");
    return correctStyleStore === true;
  }
}
