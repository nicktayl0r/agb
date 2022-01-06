<template>
	<span class="checkboxContainer" v-show="visibleStore" :class="AddRemoveClasses">
		<input type="checkbox" :id="id" :disabled="disabled" v-model="checkedStore" @change="clicked" />
		<label :for="id" class="checkbox" :class="{ noSelect:notGrapes, correct:addCorrectStyleClass }">
			<span class="checkmark"></span>
			<span class="slot">
				<slot />
			</span>
			<p>{{text}}</p>
		</label>
	</span>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Widget from "./Widget";
import WidgetEnabled from "../mixins/WidgetEnabled";
import WidgetClickable from "../mixins/WidgetClickable";
import WidgetCorrectStyle from "../mixins/WidgetCorrectStyle";
import WidgetSharedData from "../mixins/WidgetSharedData";

@Component({
	mixins: [
		WidgetEnabled,
		WidgetClickable,
		WidgetCorrectStyle,
		WidgetSharedData,
	],
})
export default class WidgetCheckbox extends Widget {
	@Prop({ default: false })
	checked: boolean;

	@Prop() text: string;

	mounted() {
		if (this.$props.sharedDataReadKey) {
			const sharedValueOverride = this.propSharedDataOverride(
				"checked",
				this.$props.sharedDataReadKey
			);
			this.updateWidget("checked", sharedValueOverride);
			if (this.$props.sharedDataWriteKey) {
				this.updateSharedDataVal(
					this.$props.sharedDataWriteKey,
					sharedValueOverride
				);
			}
		}
	}

	set checkedStore(value) {
		this.updateWidget("checked", value);
		if (this.$props.sharedDataWriteKey)
			this.updateSharedDataVal(this.$props.sharedDataWriteKey, value);
	}

	get checkedStore() {
		if (this.$props.sharedDataReadKey) {
			return this.propSharedDataOverride(
				"checked",
				this.$props.sharedDataReadKey
			);
		}
		return this.propStoreOverride("checked");
	}
}
</script>

<style scoped>
.checkboxContainer {
	display: inline-block;
	vertical-align: top;
}
.checkbox {
	display: inline-block;
	cursor: pointer;
}
input:disabled + .checkbox {
	cursor: not-allowed;
}

.buttonToggle {
	border: none;
}
.buttonToggle input:enabled .checkbox {
	cursor: pointer;
}
.buttonToggle input,
.buttonToggle_White input,
.buttonToggle_Point input {
	display: none;
}

.buttonToggle input:checked:hover + .checkbox .checkmark,
.buttonToggle .checkbox .checkmark {
	background: url(../assets/svg/buttonToggle_Normal.svg);
	background-repeat: no-repeat;
	display: inline-block;
	height: 5.4vh;
	width: 5.4vh;
}
.buttonToggle input:checked + .checkbox .checkmark,
.buttonToggle input:hover + .checkbox .checkmark {
	background: url(../assets/svg/buttonToggle_HoverDepressed.svg);
	background-repeat: no-repeat;
}
.buttonToggle input:disabled + .checkbox .checkmark {
	background: url(../assets/svg/buttonToggle_DisabledUnchecked.svg);
	background-repeat: no-repeat;
}
.buttonToggle input:disabled:checked + .checkbox .checkmark {
	background: url(../assets/svg/buttonToggle_DisabledChecked.svg);
	background-repeat: no-repeat;
}
.buttonToggle input:enabled:active + .checkbox .checkmark {
	transform: scale(0.95);
  transition-property: transform;
	-webkit-transition-duration: 0.2s;
	transition-duration: 0.2s;
}

/* .buttonToggle_White - START */
.buttonToggle_White input:checked:hover + .checkbox .checkmark,
.buttonToggle_White .checkbox .checkmark {
	background: url(../assets/svg/buttonToggle_White_Normal.svg);
	background-repeat: no-repeat;
	display: inline-block;
	height: 5.4vh;
	width: 5.4vh;
}
.buttonToggle_White input:checked + .checkbox .checkmark,
.buttonToggle_White input:hover + .checkbox .checkmark {
	background: url(../assets/svg/buttonToggle_White_HoverDepressed.svg);
	background-repeat: no-repeat;
}
.buttonToggle_White input:disabled + .checkbox .checkmark {
	background: url(../assets/svg/buttonToggle_DisabledUnchecked.svg);
	background-repeat: no-repeat;
}
.buttonToggle_White input:disabled:checked + .checkbox .checkmark {
	background: url(../assets/svg/buttonToggle_DisabledChecked.svg);
	background-repeat: no-repeat;
}
/* .buttonToggle_White - END */

/* .buttonToggle_Point - START */
.buttonToggle_Point .checkbox {
	display: grid;
	grid-template-columns: 1;
	grid-template-rows: 1;
	justify-content: center;
	background: transparent;
	border: 0.45vh solid var(--color-blue4);
	border-radius: 6vh;
	min-height: 5.4vh;
	min-width: 5.4vh;
	padding: 0 1.5vh 0 1.5vh;
	color: var(--color-blue4);
}
.buttonToggle_Point .checkbox .checkmark {
	background: transparent;
	grid-row-start: 1;
	grid-row-end: 2;
	grid-column-start: 1;
	grid-column-end: 2;
	align-self: center;
	justify-self: center;
	color: var(--color-blue4);
}
.buttonToggle_Point .checkbox .slot {
	grid-row-start: 1;
	grid-row-end: 2;
	grid-column-start: 1;
	grid-column-end: 2;
	align-self: center;
}
.buttonToggle_Point .checkbox p {
	grid-row-start: 1;
	grid-row-end: 2;
	grid-column-start: 1;
	grid-column-end: 2;
	align-self: center;
}
.buttonToggle_Point .checkbox .checkmark {
	width: 0;
	height: 0;
}
.buttonToggle_Point input:hover + .checkbox {
	background: rgba(126, 214, 255, 0.5);
	border: 0.45vh solid var(--color-blue4);
	color: var(--color-black);
}
.buttonToggle_Point input:checked + .checkbox {
	background: linear-gradient(var(--color-blue3), var(--color-blue4));
	border: 0.45vh solid var(--color-blue4);
	color: var(--color-black);
}
.buttonToggle_Point input:disabled + .checkbox {
	background: transparent;
	border: 0.45vh solid rgba(187, 187, 187, 0.5);
	color: rgba(57, 58, 57, 0.5);
}
.buttonToggle_Point input:disabled + .checkbox .checkmark {
	background: transparent;
}
.buttonToggle_Point input:disabled:checked + .checkbox {
	background: rgba(187, 187, 187, 0.5);
	border: 0.45vh solid rgba(187, 187, 187, 0);
}
.buttonToggle_Point input:disabled:checked + .checkbox .checkmark {
	background: transparent;
}
/* .buttonToggle_Point - END */

.buttonCheck input {
	display: none;
}

.buttonCheck .checkmark {
	border: 0.4vh solid var(--color-blue4);
	display: inline-block;
	border-radius: 1.3vh;
	display: inline-block;
	background: url(../assets/svg/iconCheck_Normal.svg) no-repeat center,
		transparent;
	background-size: 50%, 100%;
	width: 4.5vh;
	height: 4.5vh;
  transition-property: transform;
	-webkit-transition-duration: 0.2s;
	transition-duration: 0.2s;
}
.buttonCheck input:enabled:active + .checkbox .checkmark {
	transform: scale(0.95);
  transition-property: transform;
	-webkit-transition-duration: 0.2s;
	transition-duration: 0.2s;
}
.buttonCheck input:enabled + .checkbox:hover .checkmark {
	background: url(../assets/svg/iconCheck_HoverNormal.svg) center,
		rgba(126, 214, 255, 0.5); /* color-blue3 at 50% transparency */
	background-repeat: no-repeat;
	background-size: 50%, 100%;
	/* opacity: 0.5; */
}
.buttonCheck input:enabled:checked + .checkbox:hover .checkmark {
	background: url(../assets/svg/iconCheck_HoverDepressed.svg) center,
		rgba(126, 214, 255, 0.5); /* color-blue3 at 50% transparency */
	background-repeat: no-repeat;
	background-size: 50%, 100%;
	/* opacity: 0.5; */
}
.buttonCheck input:enabled:checked + .checkbox .checkmark,
.buttonCheck input:disabled + .checkbox.correct .checkmark {
	background: url(../assets/svg/iconCheck_HoverDepressed.svg) center,
		linear-gradient(var(--color-blue3), var(--color-blue4));
	background-repeat: no-repeat;
	background-size: 50%, 100%;
}

.buttonCheck.white1 input:enabled:checked + .checkbox .checkmark,
.buttonCheck.white1 input:disabled + .checkbox.correct .checkmark {
	background: url(../assets/svg/iconCheck_HoverDepressed_White.svg) no-repeat
			center,
		transparent;
	background-repeat: no-repeat;
	background-size: 50%, 100%;
}

.buttonCheck input:disabled + .checkbox .checkmark {
	background-image: url(../assets/svg/iconCheck_HoverDepressed.svg);
	background-color: Transparent;
	border: 0.45vh solid var(--color-grey4);
	color: var(--color-grey4);
	opacity: 0.5;
}
.buttonCheck input:disabled:checked + .checkbox .checkmark {
	background: url(../assets/svg/iconCheck_HoverDepressed.svg) center,
		linear-gradient(var(--color-grey3), var(--color-grey4));
	background-repeat: no-repeat;
	background-size: 50%, 100%;
	color: var(--color-grey4);
	opacity: 0.5;
}
.buttonCheck input:disabled + .checkbox.correct .checkmark {
	border: 0.45vh solid var(--color-green3);
	background: url(../assets/svg/iconCheck_HoverDepressed.svg) center,
		linear-gradient(var(--color-green4), var(--color-green3));
	background-repeat: no-repeat;
	background-size: 50%, 100%;
	color: var(--color-black);
	opacity: 1;
}
.buttonCheck.incorrect input:disabled + .checkbox .checkmark {
	border: 0.45vh solid var(--color-red3);
	background: url(../assets/svg/iconCheck_HoverDepressed.svg) center,
		linear-gradient(var(--color-pink2), var(--color-red3));
	background-repeat: no-repeat;
	background-size: 50%, 100%;
	color: var(--color-black);
	opacity: 1;
}

.buttonCheck.grey1 + .checkbox .checkmark {
	background: url(../assets/svg/iconCheck_Normal_Grey.svg) no-repeat center,
		transparent;
}

/* Checkbox Empty */
.checkboxEmpty input {
  display: none;
}

.checkboxEmpty .checkbox {
  border: 0.4vh solid var(--color-blue4);
  display: inline-block;
  border-radius: 1.3vh;
  display: inline-block;
  background-size: 50%, 100%;
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
  padding: 1vh;
}

.checkboxEmpty input:enabled:active+.checkbox {
  transform: scale(0.95);
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
}

.checkboxEmpty input:enabled+.checkbox:hover {
  background: rgba(126, 214, 255, 0.5);
  background-repeat: no-repeat;
  background-size: 50%, 100%;
}

.checkboxEmpty input:enabled:checked+.checkbox:hover {
  background: linear-gradient(var(--color-blue3), var(--color-blue4));
  background-repeat: no-repeat;
  opacity: 0.9;
}

.checkboxEmpty input:enabled:checked+.checkbox,
.checkboxEmpty input:disabled+.checkbox.correct {
  background: linear-gradient(var(--color-blue3), var(--color-blue4));
  background-size: 50%, 100%;
}

.checkboxEmpty input:disabled+.checkbox {
  border: 0.45vh solid var(--color-grey4);
  color: var(--color-grey4);
  opacity: 0.5;
}

.checkboxEmpty input:disabled:checked+.checkbox {
  background: linear-gradient(var(--color-grey3), var(--color-grey4));
  background-repeat: no-repeat;
  color: var(--color-grey4);
  opacity: 0.5;
}

.checkboxEmpty input:disabled+.checkbox.correct {
  border: 0.45vh solid var(--color-green3);
  background: linear-gradient(var(--color-green4), var(--color-green3));
  background-repeat: no-repeat;
  color: var(--color-black);
  opacity: 1;
}

.checkboxEmpty.incorrect input:disabled+.checkbox .checkmark {
  border: 0.45vh solid var(--color-red3);
  background: linear-gradient(var(--color-pink2), var(--color-red3));
  background-repeat: no-repeat;
  color: var(--color-black);
  opacity: 1;
}
</style>