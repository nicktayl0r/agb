<template>
	<div :id="id" v-show="visibleStore" @click="clicked" class="dropShadow textBackgroundBasic popper textBackground-Popup-Blue" :class="{ noSelect:notGrapes, AddRemoveClasses, collapsed }" :data-anchorId="anchorIdStore">
		<span v-if="collapsed">{{collapsedText}}</span>
		<slot v-else />
		<div class="popperArrow"></div>
	</div>
</template>

<style>
.popper.collapsed {
	padding-left: 10px;
	padding-right: 10px;
}
</style>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";

import WidgetPopper from "./WidgetPopper.vue";
import { logMessage } from "@/helpers/debugHelpers";
import { runWidgetEventConditions } from "../helpers/widgetHelpers";

@Component
export default class WidgetPopperCollapsible extends WidgetPopper {
	@Prop({ default: false })
	collapsed: boolean;

	@Prop({ default: "<<" })
	collapsedText: string;
  
	@Prop({ default: "" })
	pageID: string;

	clicked() {
	  logMessage(this.$props.id, "clicked");
	  this.toggleCollapsed();

	  if (!this.$store || !this.notGrapes) return;

	  runWidgetEventConditions(this, this.$props.clickEffects, this.$props.id);
	  if (this.$props.clickToDismiss) this.updateWidget("visible", false);
	}

	toggleCollapsed() {
	  this.collapsed = !this.collapsed;
	}
}
</script>
