<template>
	<div>
		<textarea :style="styles" :id="id" v-show="visibleStore" v-model="textStore" :disabled="disabled" :placeholder="placeholder" :class="AddRemoveClasses" maxlength="900" autocomplete="off"></textarea>
	</div>
</template>

<script lang="ts">
import debounce from "debounce";
import { Component, Prop } from "vue-property-decorator";

import { widgetValPrimitive } from "@/data models/widgetModels";
import Widget from "@/components/Widget";
import { logMessage } from "@/helpers/debugHelpers";
import WidgetEnabled from "@/mixins/WidgetEnabled";
import WidgetSharedData from "@/mixins/WidgetSharedData";

@Component({ mixins: [WidgetEnabled, WidgetSharedData] })
export default class WidgetTextarea extends Widget {
	@Prop({ default: "" })
	placeholder: string;

	@Prop({ default: "" })
	text: string;

	@Prop({ default: "resize: none;" })
	styles: string;

	mounted() {
	  if (this.$props.sharedDataReadKey) {
	    const sharedValueOveride = this.propSharedDataOverride(
	      "text",
	      this.$props.sharedDataReadKey
	    );
	    this.updateWidget("text", sharedValueOveride);
	    if (this.$props.sharedDataWriteKey) {
	      this.updateSharedDataVal(
	        this.$props.sharedDataWriteKey,
	        sharedValueOveride
	      );
	    }
	  }
	  // custom event "quitting" created in effectHelpers.ts
	  window.addEventListener("quitting", this.flushDebounce, true);
	}

	set textStore(value) {
	  this.debouncedWriteTextValue(value);
	}

	debouncedWriteTextValue = debounce(this.writeTextValue, 1000);

	writeTextValue(value: widgetValPrimitive) {
	  this.updateWidget("text", value);
	  if (this.$props.sharedDataWriteKey) this.updateSharedDataVal(this.$props.sharedDataWriteKey, value);
	}

	get textStore() {
	  this.debouncedWriteTextValue.flush(); // write any new user input to store before reading from it
	  if (this.$props.sharedDataReadKey) return this.propSharedDataOverride("text", this.$props.sharedDataReadKey);
	  return this.propStoreOverride("text");
	}

	flushDebounce() {
	  logMessage("textarea flushDebounce");
	  this.debouncedWriteTextValue.flush();
	}

	beforeDestroy() {
	  logMessage("textarea beforeDestroy");
	  window.removeEventListener("quitting", this.flushDebounce, true);
	  this.flushDebounce();
	}
}
</script>

<style>
textarea {
	background-color: var(--color-grey1);
	border: 0.2vh solid var(--color-grey3);
	box-shadow: inset 0 0 1.2vh var(--color-grey3);
	border-radius: 0.7vh;
	padding: 0.7vh;
	margin: 0;
	min-height: 11.5vh;
	width: 100%;
	font-size: inherit;
}
textarea:disabled {
	background-color: var(--color-grey2);
}
textarea:focus {
	border: 1px solid var(--color-blue3);
	outline: none;
}
textarea::placeholder {
	font-style: italic;
	color: var(--color-grey3);
}
</style>


