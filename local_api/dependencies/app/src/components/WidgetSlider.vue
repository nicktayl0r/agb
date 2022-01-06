<template>
	<div class="slidecontainer" :class="AddRemoveClasses">
		<input :id="id" v-show="visibleStore" :disabled="disabled" type="range" :min="min" :max="max" v-model="valStore" class="slider" @change="changed" :class="AddRemoveClasses" :step="step">
	</div>
</template>

<script lang="ts">
import debounce from "debounce";
import { Component, Prop } from "vue-property-decorator";

import { widgetValPrimitive } from "@/data models/widgetModels";
import Widget from "./Widget";
import { ConditionsList } from "@/data models/conditionModels";
import { logMessage } from "@/helpers/debugHelpers";
import { runWidgetEventConditions } from "@/helpers/widgetHelpers";
import WidgetEnabled from "@/mixins/WidgetEnabled";
import WidgetSharedData from "@/mixins/WidgetSharedData";

@Component({ mixins: [WidgetEnabled, WidgetSharedData] })
export default class WidgetSlider extends Widget {
	@Prop({ default: 0 })
	min: number;

	@Prop({ default: 100 })
	max: number;

	@Prop({ default: 50 })
	val: number;

	@Prop({ default: 1 })
	step: number;

	@Prop()
	changeEffects: ConditionsList;

	mounted() {
	  if (this.$props.sharedDataReadKey) {
	    const sharedValueOveride = this.propSharedDataOverride(
	      "val",
	      this.$props.sharedDataReadKey
	    );
	    // this.updateWidget("val", sharedValueOveride);
	    if (this.$props.sharedDataWriteKey) {
	      this.updateSharedDataVal(
	        this.$props.sharedDataWriteKey,
	        sharedValueOveride
	      );
	    }
	  } else if (this.$props.sharedDataWriteKey) this.updateSharedDataVal(this.$props.sharedDataWriteKey, this.val);
	  // custom event "quitting" created in effectHelpers.ts
	  window.addEventListener("quitting", this.flushDebounce, true);
	  (this.$el.children[0] as HTMLInputElement).step = this.$props.step;
	}

	/** this will get called when sliderwidget is change,
	 * note that @change="changed" is still needed in the template
	 * The change event does not fire immediately, demonstrated by the fact that the value on the page does not change until the slider stops moving.
	 */
	changed() {
	  if (!this.$store || !this.notGrapes) return;

	  // logMessage(this.$props.id, "changed");

	  runWidgetEventConditions(this, this.$props.changeEffects, this.$props.id);
	}

	set valStore(value) {
	  if (this.$props.sharedDataWriteKey) {
	    this.debouncedWriteValue_SharedData(value);
	  }
	  this.debouncedWriteValue_LocalData(value);
	}

	debouncedWriteValue_SharedData = debounce(this.writeSharedDataValue, 17);

	debouncedWriteValue_LocalData = debounce(this.writeLocalDataValue, 250);

	writeSharedDataValue(value: widgetValPrimitive) {
	  logMessage(this.$props.id, "writeSharedDataValue", value);
	  if (this.$props.sharedDataWriteKey) this.updateSharedDataVal(this.$props.sharedDataWriteKey, value);
	}

	writeLocalDataValue(value: widgetValPrimitive) {
	  this.updateWidget("val", value);
	}

	get valStore() {
	  if (this.$props.sharedDataReadKey) return this.propSharedDataOverride("val", this.$props.sharedDataReadKey);
	  return this.propStoreOverride("val");
	}

	flushDebounce() {
	  logMessage("slider flushDebounce");
	  this.debouncedWriteValue_SharedData.flush();
	  this.debouncedWriteValue_LocalData.flush();
	}

	beforeDestroy() {
	  logMessage("slider beforeDestroy");
	  window.removeEventListener("quitting", this.flushDebounce, true);
	  this.flushDebounce();
	}
}
</script>

<style>
.slidecontainer {
	width: 100%;
	height: 4.25vh;
}

.slider {
	-webkit-appearance: none;
	width: 100%;
	height: 0.7vh;
	background: var(--color-grey2);
	outline: none;
	border-radius: 0.7vh;
	touch-action: pan-y; /* prevents scrolling in Chrome when touching vertical sliders */
}

.slider::-webkit-slider-thumb {
  transition-property: transform;
	transition-duration: 0.4s;
	background: linear-gradient(var(--color-grey5), var(--color-grey6));
	-webkit-appearance: none;
	width: 5.4vh;
	height: 5.4vh;
	border-radius: 5.4vh;
	cursor: pointer;
	box-shadow: 0px 0px 0px 0.7vh var(--color-grey2);
}

.slider::-moz-range-thumb {
  transition-property: transform;
	transition-duration: 0.4s;
	background: linear-gradient(var(--color-grey5), var(--color-grey6));
	-moz-appearance: none;
	width: 5.4vh;
	height: 5.4vh;
	border-radius: 5.4vh;
	cursor: pointer;
	box-shadow: 0px 0px 0px 0.7vh var(--color-grey2);
}

.slider:enabled::-webkit-slider-thumb:hover {
  transition-property: transform;
	transition-duration: 0.4s;
	-webkit-appearance: none;
	width: 5.4vh;
	height: 5.4vh;
	border-radius: 5.4vh;
	cursor: pointer;
	box-shadow: 0px 0px 0px 0.9vh var(--color-blue4);
}
.slider:disabled::-webkit-slider-thumb {
	background: var(--color-grey2);
}

.slider:disabled::-webkit-slider-thumb:hover {
	cursor: not-allowed;
}

.slider:enabled::-moz-range-thumb:hover {
  transition-property: transform;
	transition-duration: 0.4s;
	-moz-appearance: none;
	width: 5.4vh;
	height: 5.4vh;
	border-radius: 5.4vh;
	cursor: pointer;
	box-shadow: 0px 0px 0px 0.9vh var(--color-blue4);
}
.slider:disabled::-moz-range-thumb:hover {
	cursor: not-allowed;
}
.slider:disabled::-moz-range-thumb {
	background: var(--color-grey2);
}
input[type="range"]::-moz-focus-outer {
	/* fixes selection border in Firefox when using the slider */
	border: 0;
}
</style>