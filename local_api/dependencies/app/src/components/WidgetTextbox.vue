<template>
	<div>
		<input v-show="visibleStore" v-model="textStore" :id="id" :placeholder="placeholder" :maxlength="maxlength" :class="AddRemoveClasses" :disabled="disabled" type="text" :filter="filter" autocomplete="off" />
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

// removes unwanted chars from a string with a given regex
export const stringFilter = function(str: string, filter: RegExp): string {
	return str
		.split("")
		.filter((char: string) => {
			filter.lastIndex = 0;
			return filter.test(char);
		})
		.join("");
};

@Component({ mixins: [WidgetEnabled, WidgetSharedData] })
export default class WidgetTextbox extends Widget {
	@Prop({ default: "" })
	placeholder: string;

	@Prop({ default: "" })
	text: string;

	@Prop({ default: "text" })
	filter: "text" | "integer" | "float" | "allow-list";

	@Prop({ default: 900 })
	maxlength: number;

	@Prop({ default: "" })
	filterList: string;

	listRegEx: RegExp = /^[${this.$props.filterList}$]/g;

	debouncedWriteTextValue = debounce(this.writeTextValue, 1000);

	created() {
		if (this.filter === "allow-list") {
			//search for any characters that aren't in the list, case-sensitive
			this.listRegEx = new RegExp(`^[${this.$props.filterList}$]`, "g");
		}
	}

	mounted() {
		const { sharedDataReadKey, sharedDataWriteKey } = this.$props;
		if (sharedDataReadKey) {
			const sharedValueOveride = this.propSharedDataOverride(
				"text",
				sharedDataReadKey
			);
			this.updateWidget("text", sharedValueOveride);
			// What just happened to the sharedDataWriteKey? Can you write without being able to read? What is the relationship?
			if (sharedDataWriteKey) {
				this.updateSharedDataVal(sharedDataWriteKey, sharedValueOveride);
			}
		}
		// custom event "quitting" created in effectHelpers.ts
		window.addEventListener("quitting", this.flushDebounce, true);
	}

	set textStore(value: string) {
		const {
			debouncedWriteTextValue,
			listRegEx,
			$props: { filter }
		} = this;
		const integerRegEx = /^-?\d*$/;
		const floatRegEx = /^-?\d*[.]?\d*$/;
		let filteredValue = "";

		switch (filter) {
			case "integer": //filters from: https://jsfiddle.net/emkey08/zgvtjc51, https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
				filteredValue = stringFilter(value, integerRegEx);
				break;
			case "float":
				filteredValue = stringFilter(value, floatRegEx);
				break;
			case "allow-list":
				filteredValue = stringFilter(value, listRegEx);
				listRegEx.lastIndex = 0; //Set the search index back to the beginning. Otherwise, this.listRegEx doesn't start at the beginning on multiple searches.
				break;
			case "text":
				filteredValue = value;
				break;
		}

		// TODO: the line below shouldn't be necessary given Vue's reactivity, should be removed in a refactor
		(this.$el.firstElementChild as HTMLInputElement).value = filteredValue;
		debouncedWriteTextValue(filteredValue);
	}

	writeTextValue(value: widgetValPrimitive) {
		const { sharedDataWriteKey } = this.$props;

		this.updateWidget("text", value);
		if (sharedDataWriteKey) {
			this.updateSharedDataVal(sharedDataWriteKey, value);
		}
	}

	get textStore(): string {
		const { sharedDataReadKey } = this.$props;

		this.debouncedWriteTextValue.flush(); // write any new user input to store before reading from it
		return sharedDataReadKey
			? (this.propSharedDataOverride("text", sharedDataReadKey) as string)
			: (this.propStoreOverride("text") as string);
	}

	flushDebounce() {
		logMessage("textbox flushDebounce");
		this.debouncedWriteTextValue.flush();
	}

	beforeDestroy() {
		logMessage("textbox beforeDestroy");
		window.removeEventListener("quitting", this.flushDebounce, true);
		this.flushDebounce();
	}
}
</script>

<style>
input[type="text"] {
	background-color: var(--color-grey1);
	border: 0.2vh solid var(--color-grey3);
	box-shadow: inset 0 0 1.2vh var(--color-grey3);
	border-radius: 0.7vh;
	padding: 0.7vh;
	margin: 0;
	width: 100%;
	font-size: inherit;
}
input[type="text"]:disabled {
	background-color: var(--color-grey2);
}
input[type="text"]:focus {
	border: 1px solid var(--color-blue3);
	outline: none;
}
input[type="text"]::placeholder {
	font-style: italic;
	color: var(--color-grey3);
}
</style>
