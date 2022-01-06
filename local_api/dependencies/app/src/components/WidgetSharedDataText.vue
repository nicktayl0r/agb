<template>
	<span :id="id" v-show="visibleStore" :class="AddRemoveClasses">
		{{ textStore }}
	</span>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Widget from "@/components/Widget";

@Component
export default class WidgetSharedDataText extends Widget {
	@Prop()
	sharedDataReadKey: string;

	@Prop({ default: "" })
	text: string;

	mounted() {
	  if (this.$props.sharedDataReadKey) {
	    const sharedValueOveride = this.propSharedDataOverride(
	      "text",
	      this.$props.sharedDataReadKey
	    );
	  }
	}

	get textStore() {
	  if (this.$props.sharedDataReadKey) return this.propSharedDataOverride("text", this.$props.sharedDataReadKey);
	  return this.propStoreOverride("text");
	}
}
</script>