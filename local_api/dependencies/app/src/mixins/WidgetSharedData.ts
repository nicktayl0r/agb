import { Component, Prop } from "vue-property-decorator";

import Widget from "@/components/Widget";

@Component
export default class WidgetSharedData extends Widget {
	@Prop() sharedDataReadKey: string;

	@Prop() sharedDataWriteKey: string;
}
