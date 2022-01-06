<template>
  <span v-show="visibleStore" class="radioParent" :class="AddRemoveClasses">
    <input
      type="radio"
      :id="id"
      :disabled="disabled"
      :name="group"
      :value="id"
      v-model="selected"
      @change="clicked"
    />
    <label
      :for="id"
      class="radioButton"
      :class="{ noSelect: notGrapes, correct: addCorrectStyleClass }"
    >
      <span class="checkmark"></span>
      <span class="slot">
        <slot />
      </span>
      <p v-if="text" class="marginLeft2 marginRight2">{{ text }}</p>
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
    WidgetSharedData
  ]
})
export default class WidgetRadio extends Widget {
  @Prop({ default: "" })
  group: string;

  @Prop()
  text: string;

  @Prop()
  value: string;

  mounted() {
    if (this.$props.sharedDataReadKey) {
      const sharedValueOveride = this.propSharedDataOverrideID(
        this.$props.group,
        "selected",
        this.$props.sharedDataReadKey
      ) as string;
      this.updateWidgetID(this.$props.group, "selected", sharedValueOveride); // I'm writing the group instead of the widgetID. The value is this widget's id
      if (this.$props.sharedDataWriteKey) {
        this.updateSharedDataVal(
          this.$props.sharedDataWriteKey,
          sharedValueOveride
        );
      }
    }
  }

  set selected(value: string) {
    this.updateWidgetID(this.$props.group, "selected", value); // I'm writing the group instead of the widgetID. The value is this widget's id
    if (this.$props.sharedDataWriteKey) this.updateSharedDataVal(this.$props.sharedDataWriteKey, value);
  }

  get selected(): string {
    // returns the groups selected widget id
    if (this.$props.sharedDataReadKey) {
      return this.propSharedDataOverrideID(
        this.$props.group,
        "selected",
        this.$props.sharedDataReadKey
      ) as string;
    } return this.propStoreOverrideID(this.$props.group, "selected") as string;
  }
}
</script>

<style scoped>
.radioParent {
  display: inline-block;
  min-width: 4.5vh;
  min-height: 4.5vh;
}
input:enabled + .radioButton:active {
  transform: scale(0.95);
}

.radioButtonMargin {
  margin: 15px;
}

.buttonRadio .radioButton {
  display: inline-block;
  transition-property: transform;
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
  text-align: center;
  text-decoration: none;
  background-color: transparent;
  border: 0.45vh solid var(--color-blue4);
  line-height: 4.5vh;
  min-height: 4.5vh;
  border-radius: 1.3vh;
  vertical-align: middle;
  cursor: pointer;
  padding: 0;
  width: 100%;
}
input:disabled + .radioButton {
  cursor: not-allowed;
}

.buttonRadio input {
  display: none;
}
.buttonRadio input:enabled + .radioButton:hover {
  background-color: rgba(
    126,
    214,
    255,
    0.5
  ); /* color-blue3 at 50% transparency */
}
.buttonRadio input:enabled:checked + .radioButton {
  background: linear-gradient(var(--color-blue3), var(--color-blue4));
}

.buttonRadio.incorrect input:disabled + .radioButton,
.buttonRadio.incorrect input:disabled:checked + .radioButton {
  background: linear-gradient(var(--color-pink2), var(--color-red3));
  border: 0.45vh solid var(--color-red3);
  color: var(--color-black);
  opacity: 1;
}

.buttonRadio input:disabled + .radioButton.correct,
.buttonRadio input:disabled:checked + .radioButton.correct {
  border: 0.45vh solid var(--color-green3);
  background: linear-gradient(var(--color-green4), var(--color-green3));
  color: var(--color-black);
  opacity: 1;
}

.buttonRadio input:disabled + .radioButton {
  border: 0.45vh solid var(--color-grey4);
  color: rgb(83, 84, 83);
  opacity: 0.5;
}
.buttonRadio input:disabled:checked + .radioButton {
  background: linear-gradient(var(--color-grey3), var(--color-grey4));
  opacity: 0.5;
}
.buttonRadio.buttonBlinkBlue input:enabled + .radioButton {
  animation-name: blinkBlue; /* this animation is defined in WidgetButton */
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;
  animation-direction: alternate;
}
.buttonRadio.Variation .radioButton {
  padding: 1.3vh;
}
.buttonRadio.Variation input:enabled:checked + .radioButton {
  color: var(--color-white);
}
.buttonRadio.Variation input:disabled:checked + .radioButton {
  color: var(--color-grey8);
}
.buttonRadio.Up .radioButton {
  line-height: 0px;
  padding: 0;
}
.buttonRadio.Up .radioButton .checkmark {
  background: url(../assets/svg/iconArrowUp_Normal.svg) no-repeat center,
    transparent;
  background-size: 50%, 100%;
  display: inline-block;
  width: 3.7vh;
  height: 3.7vh;
}

.buttonRadio.Up input:enabled + .radioButton:hover .checkmark {
  background: url(../assets/svg/iconArrowUp_HoverDepressed.svg) center;
  background-repeat: no-repeat;
  background-size: 50%, 100%;
  display: inline-block;
  width: 3.7vh;
  height: 3.7vh;
  opacity: 0.5;
}
.buttonRadio.Up input:enabled:checked + .radioButton .checkmark,
.buttonRadio.Up input:disabled + .radioButton.correct .checkmark,
.buttonRadio.Up.incorrect input:disabled + .radioButton .checkmark {
  background: url(../assets/svg/iconArrowUp_HoverDepressed.svg) center;
  background-repeat: no-repeat;
  background-size: 50%, 100%;
  display: inline-block;
  width: 3.7vh;
  height: 3.7vh;
  opacity: 1;
}

.buttonRadio.Up input:disabled + .radioButton .checkmark {
  background: url(../assets/svg/iconArrowUp_HoverDepressed.svg) no-repeat center;
  background-size: 50%, 100%;
  display: inline-block;
  width: 3.7vh;
  height: 3.7vh;
  opacity: 1;
}

.buttonRadio.NoChange .radioButton {
  line-height: 0px;
  padding: 0;
}
.buttonRadio.NoChange .radioButton .checkmark {
  background: url(../assets/svg/iconArrowNoChange_Normal.svg) no-repeat center,
    transparent;
  background-size: 75%, 100%;
  display: inline-block;
  width: 3.7vh;
  height: 3.7vh;
}
.buttonRadio.NoChange input:enabled + .radioButton:hover .checkmark {
  background: url(../assets/svg/iconArrowNoChange_HoverDepressed.svg) no-repeat
    center;
  background-size: 75%, 100%;
  display: inline-block;
  width: 3.7vh;
  height: 3.7vh;
  opacity: 0.5;
}

.buttonRadio.NoChange input:enabled:checked + .radioButton .checkmark,
.buttonRadio.NoChange input:disabled + .radioButton.correct .checkmark,
.buttonRadio.NoChange.incorrect input:disabled + .radioButton .checkmark {
  background: url(../assets/svg/iconArrowNoChange_HoverDepressed.svg) center;
  background-repeat: no-repeat;
  background-size: 75%, 100%;
  display: inline-block;
  width: 3.7vh;
  height: 3.7vh;
  opacity: 1;
}

.buttonRadio.NoChange input:disabled + .radioButton .checkmark {
  background: url(../assets/svg/iconArrowNoChange_HoverDepressed.svg) no-repeat
    center;
  background-size: 75%, 100%;
  display: inline-block;
  width: 3.7vh;
  height: 3.7vh;
  opacity: 1;
}

.buttonRadio.Down .radioButton {
  line-height: 0px;
  padding: 0;
}
.buttonRadio.Down .radioButton .checkmark {
  background: url(../assets/svg/iconArrowDown_Normal.svg) no-repeat center,
    transparent;
  background-size: 50%, 100%;
  display: inline-block;
  width: 3.7vh;
  height: 3.7vh;
}

.buttonRadio.Down .radioButton:hover .checkmark {
  background: url(../assets/svg/iconArrowDown_HoverDepressed.svg) no-repeat
    center;
  background-size: 50%, 100%;
  display: inline-block;
  width: 3.7vh;
  height: 3.7vh;
  opacity: 0.5;
}

.buttonRadio.Down input:enabled:checked + .radioButton .checkmark,
.buttonRadio.Down input:disabled + .radioButton.correct .checkmark,
.buttonRadio.Down.incorrect input:disabled + .radioButton .checkmark {
  background: url(../assets/svg/iconArrowDown_HoverDepressed.svg) center;
  background-repeat: no-repeat;
  background-size: 50%, 100%;
  display: inline-block;
  width: 3.7vh;
  height: 3.7vh;
  opacity: 1;
}

.buttonRadio.Down input:disabled + .radioButton .checkmark {
  background: url(../assets/svg/iconArrowDown_HoverDepressed.svg) no-repeat
    center;
  background-size: 50%, 100%;
  display: inline-block;
  width: 3.7vh;
  height: 3.7vh;
  opacity: 1;
}

.slotHorizontal .slot {
  display: flex;
  align-items: center;
}
.radioFillHeight .radioButton {
  height: 100%;
}
.radioMultiLine .radioButton {
  line-height: normal;
}
</style>
<style>
/* INCOMPLETE PARTS - Start */
.buttonRadio_Complete1_Incomplete input {
  /* Turns off the little round radio button */
  display: none;
}
.buttonRadio_Complete1_Incomplete .slot {
  /* MainButtonShape */
  align-content: stretch;
  display: inline-flex;
  justify-content: flex-start;
  align-items: stretch;
}

/* Incomplete: Normal (Enabled) */
.buttonRadio_Complete1_Incomplete .radioButton {
  align-content: stretch;
  display: inline-flex;
  justify-content: flex-start;
  align-items: stretch;
  transition-property: transform;
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
  background-color: rgba(126, 214, 255, 0.5);
  border-radius: 1.3vh;
  line-height: 3vh;
  min-height: 4.5vh;
  vertical-align: middle;
  cursor: pointer;
  padding: 0;
  height: 100%;
}
.buttonRadio_Complete1_Incomplete input:enabled + .radioButton {
  border-width: 0;
  border-style: solid;
  border-color: none;
}
.buttonRadio_Complete1_Incomplete input:enabled + label .radioInComplete_Text {
  background-image: -webkit-linear-gradient(
    top,
    var(--color-grey5) 4.58716%,
    var(--color-grey6) 99%
  );
  border-right: 0 solid var(--color-grey7);
  border-top: 0.25vh solid var(--color-grey7);
  border-left: 0.25vh solid var(--color-grey7);
  border-bottom: 0.25vh solid var(--color-grey7);
}
.buttonRadio_Complete1_Incomplete
  input:enabled
  + label
  .radioInComplete_box_Check {
  background-color: var(--color-white);
  border: 0.25vh solid var(--color-grey2);
}
/* Incomplete: Disabled */
.buttonRadio_Complete1_Incomplete input:disabled + .radioButton {
  background-color: rgba(255, 255, 255, 0);
  border: 0 solid var(--color-grey4);
  border-radius: 1.3vh;
}
.buttonRadio_Complete1_Incomplete input:disabled + label .radioInComplete_Text {
  background-color: rgba(255, 255, 255, 0);
  background-image: -webkit-linear-gradient(
    top,
    rgb(153, 153, 153) 4.58716%,
    var(--color-grey5) 99%
  );
  border-top: 0.25vh solid var(--color-grey5);
  border-right: 0 solid var(--color-grey5);
  border-bottom: 0.25vh solid var(--color-grey5);
  border-left: 0.25vh solid var(--color-grey5);
  opacity: 0.5;
}
.buttonRadio_Complete1_Incomplete
  input:disabled
  + label
  .radioInComplete_box_Check {
  background-color: var(--color-white);
  border: 0.25vh solid var(--color-grey5);
  opacity: 0.5;
}

/* Incomplete: Hover (Enabled) */
.buttonRadio_Complete1_Incomplete input:enabled + .radioButton:hover {
  /* border-width: 0.313rem; */
  background-color: rgba(126, 214, 255, 0);
  box-shadow: 0 0 0 0.45vh var(--color-blue3);
}
/* .buttonRadio_Complete1_Incomplete
	input:enabled
	+ label:hover
	.radioInComplete_Text {
	background-image: -webkit-linear-gradient(
		top,
		rgb(126, 214, 255, 0.5) 4.58716%,
		rgb(85, 188, 234, 0.5) 99%
	);
	border-right: 0 solid var(--color-blue3);
	border-top: 0.25vh solid var(--color-blue3);
	border-left: 0.25vh solid var(--color-blue3);
	border-bottom: 0.25vh solid var(--color-blue3);
	background-color: transparent;
}
.buttonRadio_Complete1_Incomplete
	input:enabled
	+ label:hover
	.radioInComplete_box_Check {
	background-image: -webkit-linear-gradient(
		top,
		rgb(126, 214, 255, 0.5) 4.58716%,
		rgb(85, 188, 234, 0.5) 99%
	);
	border: 0.25vh solid var(--color-blue3);
}

.buttonRadio_Complete1_Incomplete
	input:enabled
	+ label:hover
	.radioInComplete_box_Check
	img {
	opacity: 0.5;
} */

/* Incomplete: Depressed - Down/Chosen/Checked (Enabled) */
.buttonRadio_Complete1_Incomplete input:enabled:checked + .radioButton {
  background-color: rgba(126, 214, 255, 0.5);
  border-width: 0vh;
  border-style: solid;
  border-color: var(--color-blue4);
  margin-left: 0vh;
  box-shadow: 0 0 0 0.45vh var(--color-blue3);
}
.buttonRadio_Complete1_Incomplete
  input:enabled:checked
  + label
  .radioInComplete_Text {
  background-image: -webkit-linear-gradient(
    top,
    var(--color-grey5) 4.58716%,
    var(--color-grey6) 99%
  );
  border-top: 0.25vh solid var(--color-grey6);
  border-bottom: 0.25vh solid var(--color-grey6);
  border-left: 0.25vh solid var(--color-grey6);
  border-right: 0 solid var(--color-grey6);
}
.buttonRadio_Complete1_Incomplete
  input:enabled:checked
  + label
  .radioInComplete_box_Check {
  background-color: var(--color-blue3);
  background-image: -webkit-linear-gradient(
    top,
    var(--color-blue3) 4.58716%,
    var(--color-blue4) 99%
  );
  border-top: 0.25vh solid var(--color-blue4);
  border-bottom: 0.25vh solid var(--color-blue4);
  border-right: 0.25vh solid var(--color-blue4);
  border-left: 0.25vh solid var(--color-blue4);
}
/* Turning on and off the black and grey checkmarks */
.buttonRadio_Complete1_Incomplete
  input:enabled:checked
  + label
  .radioInComplete_black_check {
  display: block;
}
.buttonRadio_Complete1_Incomplete
  input:enabled:checked
  + label
  .radioInComplete_grey_check {
  display: none;
}

/* INCOMPLETE PARTS - END */
/* COMPLETE PARTS - Start */
.buttonRadio_Complete1_Completed input {
  /* Turns off the little round radio button */
  display: none;
}
.buttonRadio_Complete1_Completed .slot {
  /* MainButtonShape */
  align-content: stretch;
  display: inline-flex;
  justify-content: flex-start;
  align-items: stretch;
}

/* Complete: Normal (Enabled) */
.buttonRadio_Complete1_Completed .radioButton {
  align-content: stretch;
  display: inline-flex;
  justify-content: flex-start;
  align-items: stretch;
  transition-property: transform;
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
  background-color: var(--color-grey6);
  border-radius: 1.3vh;
  line-height: 3vh;
  min-height: 4.5vh;
  vertical-align: middle;
  cursor: pointer;
  padding: 0;
  height: 100%;
}
.buttonRadio_Complete1_Completed input:enabled + .radioButton {
  border-width: 0;
  border-style: solid;
  border-color: none;
}
.buttonRadio_Complete1_Completed input:enabled + label .radioInComplete_Text {
  background-color: var(--color-grey7);
  background-image: -webkit-linear-gradient(
    top,
    var(--color-grey5) 4.58716%,
    var(--color-grey6) 99%
  );
  border-top: 0.25vh solid var(--color-grey6);
  border-right: 0 solid var(--color-grey6);
  border-bottom: 0.25vh solid var(--color-grey6);
  border-left: 0.25vh solid var(--color-grey6);
}
.buttonRadio_Complete1_Completed
  input:enabled
  + label
  .radioInComplete_box_Check {
  background-color: var(--color-grey7);
  background-image: -webkit-linear-gradient(
    top,
    var(--color-grey5) 4.58716%,
    var(--color-grey6) 99%
  );
  border: 0.25vh solid var(--color-grey6);
}
/* Complete: Disabled */
.buttonRadio_Complete1_Completed input:disabled + .radioButton {
  background-color: rgba(255, 255, 255, 0);
  border-width: 0vh;
  border-style: solid;
  border-color: var(--color-grey2);
}
.buttonRadio_Complete1_Completed input:disabled + label .radioInComplete_Text {
  background-color: rgba(255, 255, 255, 0);
  background-image: -webkit-linear-gradient(
    top,
    rgb(153, 153, 153) 4.58716%,
    var(--color-grey5) 99%
  );
  border-top: 0.25vh solid var(--color-grey5);
  border-right: 0 solid var(--color-grey5);
  border-bottom: 0.25vh solid var(--color-grey5);
  border-left: 0.25vh solid var(--color-grey5);
  opacity: 0.5;
}
.buttonRadio_Complete1_Completed
  input:disabled
  + label
  .radioInComplete_box_Check {
  background-color: rgba(255, 255, 255, 0);
  background-image: -webkit-linear-gradient(
    top,
    rgb(153, 153, 153) 4.58716%,
    var(--color-grey5) 99%
  );
  border: 0.25vh solid var(--color-grey5);
  opacity: 0.5;
}

/* Complete: Depressed - Down/Chosen/Checked (Enabled) */
.buttonRadio_Complete1_Completed input:enabled:checked + .radioButton {
  background-color: rgba(126, 214, 255, 0.5);
  border-width: 0vh;
  border-style: solid;
  border-color: var(--color-blue4);
  margin-left: 0vh;
  /* box-shadow: 0 0 0 0.45vh var(--color-blue3); */
}
.buttonRadio_Complete1_Completed
  input:enabled:checked
  + label
  .radioInComplete_Text {
  background-image: -webkit-linear-gradient(
    top,
    var(--color-grey5) 4.58716%,
    var(--color-grey6) 99%
  );
  border-top: 0.25vh solid var(--color-grey6);
  border-bottom: 0.25vh solid var(--color-grey6);
  border-left: 0.25vh solid var(--color-grey6);
  border-right: 0 solid var(--color-grey6);
}
.buttonRadio_Complete1_Completed
  input:enabled:checked
  + label
  .radioInComplete_black_check {
  display: inherit;
}
.buttonRadio_Complete1_Completed
  input:enabled:checked
  + label
  .radioInComplete_grey_check {
  display: none;
}

/* Complete: Hover (Enabled) */
.buttonRadio_Complete1_Completed input:enabled + .radioButton:hover {
  background-color: rgba(126, 214, 255, 0);
  box-shadow: 0 0 0 0.45vh var(--color-blue3);
}
/* .buttonRadio_Complete1_Completed
	input:enabled
	+ label:hover
	.radioInComplete_Text {
	background-image: -webkit-linear-gradient(
		top,
		rgb(126, 214, 255, 0.5) 4.58716%,
		rgb(85, 188, 234, 0.5) 99%
	);
	border-left: 0.25vh solid var(--color-blue3);
	border-top: 0.25vh solid var(--color-blue3);
	border-right: 0 solid var(--color-blue3);
	border-bottom: 0.25vh solid var(--color-blue3);
	background-color: transparent;
} */
/* .buttonRadio_Complete1_Completed
	input:enabled
	+ label:hover
	.radioInComplete_box_Check
	img {
	opacity: 0.5;
} */

/* .buttonRadio_Complete1_Completed
	input:enabled
	+ label:hover
	.radioInComplete_box_Check {
	background-image: -webkit-linear-gradient(
		top,
		rgb(126, 214, 255, 0.5) 4.58716%,
		rgb(85, 188, 234, 0.5) 99%
	);
	border: 0.25vh solid var(--color-blue3);
	background-color: transparent;
} */

/* COMPLETE PARTS - END */
.buttonBlinkBlue input:enabled + label {
  border: none;
  animation-name: blinkBlue;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;
  animation-direction: alternate;
}
.buttonBlinkBlue input:enabled + label:hover {
  animation-name: none;
}
.radioInComplete_Text {
  background-color: rgb(43, 43, 43);
  background-image: -webkit-linear-gradient(
    top,
    rgb(83, 84, 83) 4.58716%,
    rgba(57, 58, 57, 0.97) 99%
  );
  border-radius: 1vh 0px 0px 1vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.radioInComplete_buttonText {
  margin: 1.5vh;
  text-align: center;
}
.radioInComplete_box_Check {
  background-color: rgb(255, 255, 255);
  width: 5.75vh;
  height: auto;
  padding: 0.7vh;
  border-radius: 0px 1vh 1vh 0px;
  display: flex;
}
.radioInComplete_image_Check {
  align-self: center;
}
.radioInComplete_black_check {
  display: none;
}
/* INCOMPLETE BLUE PARTS - Start */
.buttonRadio_CompleteBlue_Incomplete input {
  /* Turns off the little round radio button */
  display: none;
}

.buttonRadio_CompleteBlue_Incomplete .slot {
  /* MainButtonShape */
  align-content: stretch;
  display: inline-flex;
  justify-content: flex-start;
  align-items: stretch;
}

/* Incomplete: Normal (Enabled) */
.buttonRadio_CompleteBlue_Incomplete .radioButton {
  align-content: stretch;
  display: inline-flex;
  justify-content: flex-start;
  align-items: stretch;
  transition-property: transform;
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
  background-color: transparent;
  border-radius: 1vh;
  line-height: 3vh;
  min-height: 4.5vh;
  vertical-align: middle;
  cursor: pointer;
  padding: 0;
  height: 100%;
}

.buttonRadio_CompleteBlue_Incomplete input:enabled + .radioButton {
  border-width: 0;
  border-style: solid;
  border-color: none;
}

.buttonRadio_CompleteBlue_Incomplete
  input:enabled
  + label
  .radioInComplete_Text {
  background-color: transparent;
  border-top: 0.45vh solid var(--color-blue4);
  border-right: 0vh solid var(--color-blue4);
  border-bottom: 0.45vh solid var(--color-blue4);
  border-left: 0.45vh solid var(--color-blue4);
  background-image: none;
}

.buttonRadio_CompleteBlue_Incomplete
  input:enabled
  + label
  .radioInComplete_box_Check {
  background-color: transparent;
  border: 0.45vh solid var(--color-blue4);
}

/* Incomplete: Disabled */
.buttonRadio_CompleteBlue_Incomplete input:disabled + .radioButton {
  background-color: rgba(255, 255, 255, 0);
  border: 0 solid var(--color-grey4);
  border-radius: 1.3vh;
}

.buttonRadio_CompleteBlue_Incomplete
  input:disabled
  + label
  .radioInComplete_Text {
  background-color: rgba(255, 255, 255, 0);
  background-image: none;
  border-top: 0.45vh solid var(--color-grey4);
  border-right: 0 solid var(--color-grey4);
  border-bottom: 0.45vh solid var(--color-grey4);
  border-left: 0.45vh solid var(--color-grey4);
  opacity: 0.5;
}

.buttonRadio_CompleteBlue_Incomplete
  input:disabled
  + label
  .radioInComplete_box_Check {
  background-color: transparent;
  border: 0.45vh solid var(--color-grey4);
  opacity: 0.5;
}

/* Incomplete: Hover (Enabled) */
.buttonRadio_CompleteBlue_Incomplete input:enabled + .radioButton:hover {
  background-color: rgba(126, 214, 255, 0.5);
}

.buttonRadio_CompleteBlue_Incomplete
  input:enabled
  + label:hover
  .radioInComplete_Text,
.buttonRadio_CompleteBlue_Incomplete
  input:enabled:checked
  + label:hover
  .radioInComplete_Text {
  background-color: rgba(126, 214, 255, 0.5);
  background-image: none;
}

.buttonRadio_CompleteBlue_Incomplete
  input:enabled
  + label:hover
  .radioInComplete_box_Check,
.buttonRadio_CompleteBlue_Incomplete
  input:enabled:checked
  + label:hover
  .radioInComplete_box_Check {
  background-color: rgba(126, 214, 255, 0.5);
  background-image: none;
  border: 0.45vh solid var(--color-blue4);
}

/* Incomplete: Depressed - Down/Chosen/Checked (Enabled) */
.buttonRadio_CompleteBlue_Incomplete input:enabled:checked + .radioButton {
  background-image: none;
  /*border-width: 0.45vh;
	border-style: solid;
	border-color: var(--color-blue4);*/
  margin-left: 0vh;
}

.buttonRadio_CompleteBlue_Incomplete
  input:enabled:checked
  + label
  .radioInComplete_Text {
  background-image: -webkit-linear-gradient(
    top,
    var(--color-blue3) 4.58716%,
    var(--color-blue4) 99%
  );
}

.buttonRadio_CompleteBlue_Incomplete
  input:enabled:checked
  + label
  .radioInComplete_box_Check {
  background-color: transparent;
}

/* Turning on and off the black and grey checkmarks */
.buttonRadio_CompleteBlue_Incomplete
  input:enabled:checked
  + label
  .radioInComplete_black_check,
.buttonRadio_CompleteBlue_Completed
  input:enabled:checked
  + label
  .radioInComplete_black_check,
.buttonRadio_CompleteBlue_Completed
  input:enabled
  + label
  .radioInComplete_black_check,
.buttonRadio_CompleteBlue_Incomplete
  input:enabled:hover
  + label
  .radioInComplete_black_check {
  display: block;
}

.buttonRadio_CompleteBlue_Incomplete
  input:enabled:hover
  + label
  .radioInComplete_black_check {
  opacity: 0.5;
}

.buttonRadio_CompleteBlue_Incomplete
  input:enabled:checked
  + label
  .radioInComplete_blue_check,
.buttonRadio_CompleteBlue_Completed
  input:enabled
  + label
  .radioInComplete_blue_check,
.buttonRadio_CompleteBlue_Incomplete
  input:enabled:hover
  + label
  .radioInComplete_blue_check {
  display: none;
}

/* INCOMPLETE BLUE PARTS - END */
/* COMPLETE BLUE PARTS - Start */
.buttonRadio_CompleteBlue_Completed input {
  /* Turns off the little round radio button */
  display: none;
}

.buttonRadio_CompleteBlue_Completed .slot {
  /* MainButtonShape */
  align-content: stretch;
  display: inline-flex;
  justify-content: flex-start;
  align-items: stretch;
}

/* Complete: Normal (Enabled) */
.buttonRadio_CompleteBlue_Completed .radioButton {
  align-content: stretch;
  display: inline-flex;
  justify-content: flex-start;
  align-items: stretch;
  transition-property: transform;
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
  background-color: var(--color-grey6);
  border-radius: 1.3vh;
  line-height: 3vh;
  min-height: 4.5vh;
  vertical-align: middle;
  cursor: pointer;
  padding: 0;
  height: 100%;
}

.buttonRadio_CompleteBlue_Completed input:enabled + .radioButton {
  border-width: 0;
  border-style: solid;
  border-color: none;
}

.buttonRadio_CompleteBlue_Completed
  input:enabled
  + label
  .radioInComplete_Text {
  background-color: transparent;
  background-image: -webkit-linear-gradient(
    top,
    var(--color-blue3) 4.58716%,
    var(--color-blue4) 99%
  );
  border-top: 0.45vh solid var(--color-blue4);
  border-right: 0 solid var(--color-blue4);
  border-bottom: 0.45vh solid var(--color-blue4);
  border-left: 0.45vh solid var(--color-blue4);
}

.buttonRadio_CompleteBlue_Completed
  input:enabled
  + label
  .radioInComplete_box_Check {
  background-color: transparent;
  background-image: -webkit-linear-gradient(
    top,
    var(--color-blue3) 4.58716%,
    var(--color-blue4) 99%
  );
  border: 0.45vh solid var(--color-blue4);
}

/* Complete: Disabled */
.buttonRadio_CompleteBlue_Completed input:disabled + .radioButton {
  background-color: rgba(255, 255, 255, 0);
  border-width: 0vh;
  border-style: solid;
  border-color: var(--color-grey2);
}

.buttonRadio_CompleteBlue_Completed
  input:disabled
  + label
  .radioInComplete_Text {
  background-color: rgba(255, 255, 255, 0);
  background-image: -webkit-linear-gradient(
    top,
    var(--color-grey3) 4.58716%,
    var(--color-grey4) 99%
  );
  border-top: 0.45vh solid var(--color-grey4);
  border-right: 0 solid var(--color-grey4);
  border-bottom: 0.45vh solid var(--color-grey4);
  border-left: 0.45vh solid var(--color-grey4);
  opacity: 0.5;
}

.buttonRadio_CompleteBlue_Completed
  input:disabled
  + label
  .radioInComplete_box_Check {
  background-color: rgba(255, 255, 255, 0);
  background-image: -webkit-linear-gradient(
    top,
    var(--color-grey3) 4.58716%,
    var(--color-grey4) 99%
  );
  border: 0.45vh solid var(--color-grey4);
  opacity: 0.5;
}

/* Complete: Hover (Enabled) */
.buttonRadio_CompleteBlue_Completed input:enabled + .radioButton:hover {
  background-color: rgba(126, 214, 255, 0);
}

.buttonRadio_CompleteBlue_Completed
  input:enabled
  + label:hover
  .radioInComplete_Text {
  background-color: rgba(126, 214, 255, 0.5);
  background-image: none;
  border-left: 0.45vh solid var(--color-blue4);
  border-top: 0.45vh solid var(--color-blue4);
  border-right: 0 solid var(--color-blue4);
  border-bottom: 0.45vh solid var(--color-blue4);
}

.buttonRadio_CompleteBlue_Completed
  input:enabled
  + label:hover
  .radioInComplete_box_Check {
  background-color: rgba(126, 214, 255, 0.5);
  background-image: none;
}

/* Complete: Depressed - Down/Chosen/Checked (Enabled) */
.buttonRadio_CompleteBlue_Completed input:enabled:checked + .radioButton {
  background-color: rgba(126, 214, 255, 0.5);
  border-width: 0vh;
  border-style: solid;
  border-color: var(--color-blue4);
  margin-left: 0vh;
}

.buttonRadio_CompleteBlue_Completed
  input:enabled:checked
  + label
  .radioInComplete_Text {
  background-image: -webkit-linear-gradient(
    top,
    var(--color-blue3) 4.58716%,
    var(--color-blue4) 99%
  );
  border-top: 0.45vh solid var(--color-blue4);
  border-bottom: 0.45vh solid var(--color-blue4);
  border-left: 0.45vh solid var(--color-blue4);
  border-right: 0 solid var(--color-blue4);
}

.buttonRadio_CompleteBlue_Completed
  input:enabled:checked
  + label
  .radioInComplete_box_Check {
  background-color: var(--color-blue3);
  background-image: -webkit-linear-gradient(
    top,
    var(--color-blue3) 4.58716%,
    var(--color-blue4) 99%
  );
  border: 0.45vh solid var(--color-blue4);
}

/* COMPLETEBLUE PARTS - END */
/* Radio3_Incomplete: PARTS - Start */
.buttonRadio-Complete3 input {
  /* Turns off the little round radio button */
  display: none;
}

.buttonRadio-Complete3 .slot {
  /* MainButtonShape */
  align-content: stretch;
  display: inline-flex;
  justify-content: flex-start;
  align-items: stretch;
}

.buttonRadio-Complete3 .inclBox_1 {
  border-radius: 0px 1vh 0px 0px;
}

.buttonRadio-Complete3 .inclBox_3 {
  border-radius: 0px 0px 1vh 0px;
}

.radioInComplete3_Text {
  background-color: none;
  background-image: -webkit-linear-gradient(
    top,
    var(--color-grey5) 4.58716%,
    var(--color-grey6) 99%
  );
  border: 0.25vh solid var(--color-grey6);
  border-radius: 1vh 0px 0px 1vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12vh;
  color: white;
}

.radioInComplete3_buttonText {
  margin: 1.5vh;
  text-align: center;
}

.radioInComplete3_box_Check {
  background-color: rgb(255, 255, 255);
  width: 4.75vh;
  height: auto;
  display: flex;
  justify-content: center;
  color: var(--color-grey4);
}

.buttonRadio-Complete3 .inclBox_1 {
  border-top-width: 0.25vh;
  border-right-width: 0.25vh;
  border-bottom-width: 0.13vh;
  border-left-width: 0;
  border-color: var(--color-grey3);
  border-style: solid;
}

.buttonRadio-Complete3 .inclBox_2 {
  border-top-width: 0.13vh;
  border-right-width: 0.25vh;
  border-bottom-width: 0.13vh;
  border-left-width: 0;
  border-color: var(--color-grey3);
  border-style: solid;
}

.buttonRadio-Complete3 .inclBox_3 {
  border-top-width: 0.13vh;
  border-right-width: 0.25vh;
  border-bottom-width: 0.25vh;
  border-left-width: 0;
  border-color: var(--color-grey3);
  border-style: solid;
}

.radioInComplete3_image_Check {
  align-self: center;
}

.radioInComplete3_check,
.radioInComplete3_checkWhite {
  display: none;
  height: 2.7vh;
  padding: 0.4vh 0 0.4vh 0;
}

/* Radio3_Incomplete: Normal (Enabled) */
.buttonRadio-Complete3 .radioButton {
  align-content: stretch;
  display: inline-flex;
  justify-content: flex-start;
  align-items: stretch;
  transition-property: transform;
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
  background-color: none;
  border-radius: 1vh;
  line-height: 3vh;
  min-height: 4.5vh;
  vertical-align: middle;
  cursor: pointer;
  padding: 0;
}

.buttonRadio-Complete3 input:enabled + .radioButton {
  border-width: 0;
  border-style: solid;
  border-color: none;
}

.buttonRadio-Complete3 .radioInComplete3_box_Check {
  background-color: var(--color-white);
  transition-property: transform;
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
}

/* Incomplete: Disabled */
.buttonRadio-Complete3 input:disabled + label .radioInComplete3_Text {
  background-color: none;
  opacity: 0.5;
  transition-property: transform;
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
}

.buttonRadio-Complete3 input:disabled + label .radioInComplete3_box_Check {
  background-color: var(--color-white);
  opacity: 0.5;
}

/* Radio3_Incomplete: Hover (Enabled) */
.buttonRadio-Complete3 input:enabled + .radioButton:hover {
  background-color: none;
  border: 0.45vh solid var(--color-blue3);
  border-radius: 1.5vh;
}

.buttonRadio-Complete3 input:enabled + label:hover .radioInComplete3_Text {
  background-image: -webkit-linear-gradient(
    top,
    var(--color-grey5) 4.58716%,
    var(--color-grey6) 99%
  );
  border: 0.25vh solid var(--color-grey6);
  color: white;
}

/* Hover, highlight the appropriate box */
.buttonRadio-Complete3.select1 input:enabled + label:hover .inclBox_1,
.buttonRadio-Complete3.select2 input:enabled + label:hover .inclBox_2,
.buttonRadio-Complete3.select3 input:enabled + label:hover .inclBox_3 {
  background-color: none;
  background-image: -webkit-linear-gradient(
    top,
    var(--color-blue3) 4.58716%,
    var(--color-blue4) 99%
  );
  border-color: var(--color-blue4);
  border-style: solid;
  color: black;
}

/* Incomplete: Depressed - Down/Chosen/Checked (Enabled) */
.buttonRadio-Complete3 input:enabled:checked + .radioButton {
  background-image: -webkit-linear-gradient(
    top,
    var(--color-blue3) 4.58716%,
    var(--color-blue4) 99%
  );
  border: 0vh solid var(--color-blue4);
  margin-left: 0vh;
}

/* when the button is enabled and checked, highlight whole button */
.buttonRadio-Complete3 input:enabled:checked + .radioButton:hover {
  border: 0.45vh solid var(--color-blue3);
}

/* when the button is enabled and checked, color left text blue */
.buttonRadio-Complete3 input:enabled:checked + label .radioInComplete3_Text {
  background-image: -webkit-linear-gradient(
    top,
    var(--color-blue3) 4.58716%,
    var(--color-blue4) 99%
  );
  border: 0.25vh solid var(--color-blue4);
  color: black;
}

/* Selected, highlight the number box */
.buttonRadio-Complete3.select1 input:enabled:checked + label .inclBox_1,
.buttonRadio-Complete3.select2 input:enabled:checked + label .inclBox_2,
.buttonRadio-Complete3.select3 input:enabled:checked + label .inclBox_3 {
  background-image: -webkit-linear-gradient(
    top,
    var(--color-blue3) 4.58716%,
    var(--color-blue4) 99%
  );
  border-color: var(--color-blue4);
  color: black;
}

/* Set the box background to grey gradient */
.buttonRadio-Complete3.complete1 .inclBox_1,
.buttonRadio-Complete3.select2 .inclBox_1,
.buttonRadio-Complete3.complete2 .inclBox_1,
.buttonRadio-Complete3.complete2 .inclBox_2,
.buttonRadio-Complete3.select3 .inclBox_1,
.buttonRadio-Complete3.select3 .inclBox_2,
.buttonRadio-Complete3.complete3 .inclBox_1,
.buttonRadio-Complete3.complete3 .inclBox_2,
.buttonRadio-Complete3.complete3 .inclBox_3 {
  background-color: rgb(43, 43, 43);
  background-image: -webkit-linear-gradient(
    top,
    var(--color-grey5) 4.58716%,
    var(--color-grey6) 99%
  );
  border-color: var(--color-grey6);
}

/* Hide the number 1 in the box */
.buttonRadio-Complete3.complete1 .inclBox_1 .stepNumber,
.buttonRadio-Complete3.select2 .inclBox_1 .stepNumber,
.buttonRadio-Complete3.complete2 .inclBox_1 .stepNumber,
.buttonRadio-Complete3.select3 .inclBox_1 .stepNumber,
.buttonRadio-Complete3.complete3 .inclBox_1 .stepNumber {
  display: none;
}

/* Show the arrow in the 1 box */
.buttonRadio-Complete3.complete1 .inclBox_1 .radioInComplete3_check,
.buttonRadio-Complete3.select2 .inclBox_1 .radioInComplete3_check,
.buttonRadio-Complete3.complete2 .inclBox_1 .radioInComplete3_check,
.buttonRadio-Complete3.select3 .inclBox_1 .radioInComplete3_check,
.buttonRadio-Complete3.complete3 .inclBox_1 .radioInComplete3_check {
  display: block;
}

/* Hide the number 2 in the box */
.buttonRadio-Complete3.complete2 .inclBox_2 .stepNumber,
.buttonRadio-Complete3.select3 .inclBox_2 .stepNumber,
.buttonRadio-Complete3.complete3 .inclBox_2 .stepNumber {
  display: none;
}

/* Show the arrow in the 2 box */
.buttonRadio-Complete3.complete2 .inclBox_2 .radioInComplete3_check,
.buttonRadio-Complete3.select3 .inclBox_2 .radioInComplete3_check,
.buttonRadio-Complete3.complete3 .inclBox_2 .radioInComplete3_check {
  display: block;
}

/* Hide the number 3 in the box */
.buttonRadio-Complete3.complete3 .inclBox_3 .stepNumber {
  display: none;
}

/* Show the arrow in the 3 box */
.buttonRadio-Complete3.complete3 .inclBox_3 .radioInComplete3_check {
  display: block;
}

/* Hide white checkmark */
.buttonRadio-Complete3 .inclBox_2 .radioInComplete3_checkWhite,
.buttonRadio-Complete3 .inclBox_3 .radioInComplete3_checkWhite,
.buttonRadio-Complete3 .inclBox_1 .radioInComplete3_checkWhite {
  display: none;
}

/* Show white checkmark when completed button is disabled */
.buttonRadio-Complete3.complete1
  input:disabled
  + label
  .inclBox_1
  .radioInComplete3_checkWhite,
.buttonRadio-Complete3.complete2
  input:disabled
  + label
  .inclBox_2
  .radioInComplete3_checkWhite,
.buttonRadio-Complete3.complete3
  input:disabled
  + label
  .inclBox_3
  .radioInComplete3_checkWhite {
  display: block;
}

/* Hide black checkmark when completed button is disabled */
.buttonRadio-Complete3.complete1
  input:disabled
  + label
  .inclBox_1
  .radioInComplete3_check,
.buttonRadio-Complete3.complete2
  input:disabled
  + label
  .inclBox_2
  .radioInComplete3_check,
.buttonRadio-Complete3.complete3
  input:disabled
  + label
  .inclBox_3
  .radioInComplete3_check {
  display: none;
}

/* Radio3_Incomplete: PARTS - END */
.arrowRadio .radioButton {
  display: block;
  transition-property: transform;
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
  background-color: transparent;
  border: 0vh solid var(--color-blue4);
  height: 100%;
  vertical-align: middle;
  cursor: pointer;
  padding: 0;
  width: 100%;
  line-height: 4.5vh;
  min-height: 4.5vh;
}

.arrowRadio input {
  display: none;
}

.arrowRadio .checkmark {
  background: none;
}

/* .arrowRadio.large.up - START */

.arrowRadio.up.large .radioButton {
  background: url("../assets/svg/arrow_Large_Normal_Up_SVG.svg") no-repeat
    center;
}
.arrowRadio.up.large.white .radioButton {
  background: url("../assets/svg/arrow_Large_Up_SVG.svg") no-repeat center;
}

.arrowRadio.up.large input:enabled + .radioButton:hover {
  background: url("../assets/svg/arrow_Large_Hover_Up_SVG.svg") no-repeat center;
}

.arrowRadio.up.large input:enabled:checked + .radioButton {
  background: url("../assets/svg/arrow_Large_Depressed_Up_SVG.svg") no-repeat
    center;
}

.arrowRadio.up.large input:disabled + .radioButton.correct,
.arrowRadio.up.large input:disabled:checked + .radioButton.correct {
  background: url("../assets/svg/arrow_Large_Correct_Up_SVG.svg") no-repeat
    center;
  color: var(--color-black);
  border: 0vh solid var(--color-blue4);
  cursor: not-allowed;
}

.arrowRadio.up.large.incorrect input:disabled + .radioButton,
.arrowRadio.up.large.incorrect input:disabled:checked + .radioButton {
  background: url("../assets/svg/arrow_Large_Incorrect_Up_SVG.svg") no-repeat
    center;
  color: var(--color-black);
  border: 0vh solid var(--color-blue4);
  cursor: not-allowed;
}

.arrowRadio.up.large.keyConcept input:disabled:checked + .radioButton {
  background: url("../assets/svg/arrow_Large_KeyConcept_Up_SVG.svg") no-repeat
    center;
}

.arrowRadio.up.large input:disabled + .radioButton {
  background: url("../assets/svg/arrow_Large_DisabledNormal_Up_SVG.svg")
    no-repeat center;
  color: var(--color-grey4);
  border: 0vh solid var(--color-blue4);
  cursor: not-allowed;
  opacity: 1;
}

.arrowRadio.up.large input:disabled:checked + .radioButton {
  background: url("../assets/svg/arrow_Large_DisabledDepressed_Up_SVG.svg")
    no-repeat center;
  border: 0vh solid var(--color-blue4);
  cursor: not-allowed;
  opacity: 1;
}

/* .arrowRadio.large.up - END */
/* .arrowRadio.large.down - START */
.arrowRadio.down.large .radioButton {
  background: url("../assets/svg/arrow_Large_Normal_Down_SVG.svg") no-repeat
    center;
}
.arrowRadio.down.large.white .radioButton {
  background: url("../assets/svg/arrow_Large_Down_SVG.svg") no-repeat center;
}

.arrowRadio.down.large input:enabled + .radioButton:hover {
  background: url("../assets/svg/arrow_Large_Hover_Down_SVG.svg") no-repeat
    center;
}

.arrowRadio.down.large input:enabled:checked + .radioButton {
  background: url("../assets/svg/arrow_Large_Depressed_Down_SVG.svg") no-repeat
    center;
}

.arrowRadio.down.large input:disabled + .radioButton.correct,
.arrowRadio.down.large input:disabled:checked + .radioButton.correct {
  background: url("../assets/svg/arrow_Large_Correct_Down_SVG.svg") no-repeat
    center;
  color: var(--color-black);
  border: 0vh solid var(--color-blue4);
  cursor: not-allowed;
}

.arrowRadio.down.large.incorrect input:disabled + .radioButton,
.arrowRadio.down.large.incorrect input:disabled:checked + .radioButton {
  background: url("../assets/svg/arrow_Large_Incorrect_Down_SVG.svg") no-repeat
    center;
  color: var(--color-black);
  border: 0vh solid var(--color-blue4);
  cursor: not-allowed;
}

.arrowRadio.down.large.keyConcept input:disabled:checked + .radioButton {
  background: url("../assets/svg/arrow_Large_KeyConcept_Down_SVG.svg") no-repeat
    center;
}

.arrowRadio.down.large input:disabled + .radioButton {
  background: url("../assets/svg/arrow_Large_DisabledNormal_Down_SVG.svg")
    no-repeat center;
  color: var(--color-grey4);
  border: 0vh solid var(--color-blue4);
  cursor: not-allowed;
  opacity: 1;
}

.arrowRadio.down.large input:disabled:checked + .radioButton {
  background: url("../assets/svg/arrow_Large_DisabledDepressed_Down_SVG.svg")
    no-repeat center;
  border: 0vh solid var(--color-blue4);
  cursor: not-allowed;
  opacity: 1;
}

/* .arrowRadio.large.down - END */
/* .arrowRadio.large.left - START */
.arrowRadio.left.large .radioButton {
  background: url("../assets/svg/arrow_Large_Normal_Left_SVG.svg") no-repeat
    center;
}
.arrowRadio.left.large.white .radioButton {
  background: url("../assets/svg/arrow_Large_Left_SVG.svg") no-repeat center;
}

.arrowRadio.left.large input:enabled + .radioButton:hover {
  background: url("../assets/svg/arrow_Large_Hover_Left_SVG.svg") no-repeat
    center;
}

.arrowRadio.left.large input:enabled:checked + .radioButton {
  background: url("../assets/svg/arrow_Large_Depressed_Left_SVG.svg") no-repeat
    center;
}

.arrowRadio.left.large input:disabled + .radioButton.correct,
.arrowRadio.left.large input:disabled:checked + .radioButton.correct {
  background: url("../assets/svg/arrow_Large_Correct_Left_SVG.svg") no-repeat
    center;
  color: var(--color-black);
  border: 0vh solid var(--color-blue4);
  cursor: not-allowed;
}

.arrowRadio.left.large.incorrect input:disabled + .radioButton,
.arrowRadio.left.large.incorrect input:disabled:checked + .radioButton {
  background: url("../assets/svg/arrow_Large_Incorrect_Left_SVG.svg") no-repeat
    center;
  color: var(--color-black);
  border: 0vh solid var(--color-blue4);
  cursor: not-allowed;
}

.arrowRadio.left.large.keyConcept input:disabled:checked + .radioButton {
  background: url("../assets/svg/arrow_Large_KeyConcept_Left_SVG.svg") no-repeat
    center;
}

.arrowRadio.left.large input:disabled + .radioButton {
  background: url("../assets/svg/arrow_Large_DisabledNormal_Left_SVG.svg")
    no-repeat center;
  color: var(--color-grey4);
  border: 0vh solid var(--color-blue4);
  cursor: not-allowed;
  opacity: 1;
}

.arrowRadio.left.large input:disabled:checked + .radioButton {
  background: url("../assets/svg/arrow_Large_DisabledDepressed_Left_SVG.svg")
    no-repeat center;
  border: 0vh solid var(--color-blue4);
  cursor: not-allowed;
  opacity: 1;
}

/* .arrowRadio.large.left - END */
/* .arrowRadio.large.right - START */
.arrowRadio.right.large .radioButton {
  background: url("../assets/svg/arrow_Large_Normal_Right_SVG.svg") no-repeat
    center;
}
.arrowRadio.right.large.white .radioButton {
  background: url("../assets/svg/arrow_Large_Right_SVG.svg") no-repeat center;
}

.arrowRadio.right.large input:enabled + .radioButton:hover {
  background: url("../assets/svg/arrow_Large_Hover_Right_SVG.svg") no-repeat
    center;
}

.arrowRadio.right.large input:enabled:checked + .radioButton {
  background: url("../assets/svg/arrow_Large_Depressed_Right_SVG.svg") no-repeat
    center;
}

.arrowRadio.right.large input:disabled + .radioButton.correct,
.arrowRadio.right.large input:disabled:checked + .radioButton.correct {
  background: url("../assets/svg/arrow_Large_Correct_Right_SVG.svg") no-repeat
    center;
  color: var(--color-black);
  border: 0vh solid var(--color-blue4);
  cursor: not-allowed;
}

.arrowRadio.right.large.incorrect input:disabled + .radioButton,
.arrowRadio.right.large.incorrect input:disabled:checked + .radioButton {
  background: url("../assets/svg/arrow_Large_Incorrect_Right_SVG.svg") no-repeat
    center;
  color: var(--color-black);
  border: 0vh solid var(--color-blue4);
  cursor: not-allowed;
}

.arrowRadio.right.large.keyConcept input:disabled:checked + .radioButton {
  background: url("../assets/svg/arrow_Large_KeyConcept_Right_SVG.svg")
    no-repeat center;
}

.arrowRadio.right.large input:disabled + .radioButton {
  background: url("../assets/svg/arrow_Large_DisabledNormal_Right_SVG.svg")
    no-repeat center;
  color: var(--color-grey4);
  border: 0vh solid var(--color-blue4);
  cursor: not-allowed;
  opacity: 1;
}

.arrowRadio.right.large input:disabled:checked + .radioButton {
  background: url("../assets/svg/arrow_Large_DisabledDepressed_Right_SVG.svg")
    no-repeat center;
  border: 0vh solid var(--color-blue4);
  cursor: not-allowed;
  opacity: 1;
}

/* .arrowRadio.large.right - END */
</style>
