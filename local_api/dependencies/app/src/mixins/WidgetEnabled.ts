import { Component, Prop } from "vue-property-decorator";

import Widget from "@/components/Widget";

@Component
export default class WidgetEnabled extends Widget {
	@Prop({ default: true })
	enabled: boolean;

	get enabledStore() {
	  return this.propStoreOverride("enabled");
	}

	get disabled() {
	  return !this.enabledStore;
	}
}
