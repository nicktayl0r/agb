// I chose fieldset over span because it has a disabled attribute
<template>
  <span v-show="visibleStore" class="buttonParent" :class="AddRemoveClasses">
    <fieldset :id="id" :disabled="disabled" class="button" v-bind:class="{ noSelect:notGrapes }" @click="clicked">
      <span class="bgImage"></span>
      <span class="slot">
        <slot /></span>
      <p v-if="text" class="textProp marginLeft2 marginRight2">{{text}}</p>
    </fieldset>
  </span>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Widget from "./Widget";
import WidgetEnabled from "../mixins/WidgetEnabled";
import WidgetClickable from "../mixins/WidgetClickable";

@Component({ mixins: [WidgetEnabled, WidgetClickable] })
export default class WidgetButton extends Widget {
  @Prop()
  text: string;
}
</script>

// basic button styles (grey, zoom, forward, back)
<style>
.buttonParent {
  display: inline-block;
  vertical-align: middle;
  z-index: 2; /* this is to prevent divs overlapping buttons being an issue */
}
.button {
  cursor: pointer;
  padding: 0;
  margin: 0;
  border: none;
}
.button:enabled:active {
  transform: scale(0.95);
}
.button:disabled {
  cursor: not-allowed;
}
.button .bgImage {
  vertical-align: middle;
}
.button .slot {
  text-align: center;
  vertical-align: middle;
  display: inline-block;
}
.buttonFillHeight .button {
  height: 100%;
}

.buttonSlotFillWidth .slot {
  width: 100%;
}
.buttonSlotFillHeight .slot {
  height: 100%;
}
.noSelect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
/** children **/
.noSelect * {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  pointer-events: none;
}

.buttonBasic-Grey .button {
  display: flex;
  justify-content: center;
  align-items: center;
  transition-property: transform;
  transition-duration: 0.4s;
  background: linear-gradient(var(--color-grey5), var(--color-grey6));
  border: 0.25vh solid var(--color-grey6);
  padding: 1.2vh;
  color: var(--color-white);
  margin: 0px;
  font-size: inherit;
  min-width: 4.5vh;
  min-height: 4.5vh;
  line-height: 1.2em;
  border-radius: 1.3vh;
}
.buttonBasic-Grey .button:enabled:active {
  background: linear-gradient(var(--color-grey5), var(--color-grey6));
}
.buttonBasic-Grey .button:enabled:hover {
  box-shadow: 0 0 0 0.45vh var(--color-blue3);
}
.buttonBasic-Grey .button:disabled {
  background: linear-gradient(var(--color-grey4), var(--color-grey5));
  opacity: 0.5;
  border-color: var(--color-grey5);
}

.buttonOutlineBlue .button {
  box-shadow: 0 0 0 0.15rem var(--color-blue3);
}
.buttonOutlineWhite .button {
  box-shadow: 0 0 0 0.15rem var(--color-white);
}

.buttonZoom .button .bgImage {
  display: block;
  background: url(../assets/svg/buttonZoom_Normal.svg);
  background-repeat: no-repeat;
  width: 5.4vh;
  height: 5.4vh;
  margin: 0 auto;
  border: none;
  transition-property: transform;
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
}
.buttonZoom .button .slot {
  display: block;
}
.buttonZoom .button:enabled:hover .bgImage {
  background: url(../assets/svg/buttonZoom_HoverDepressed.svg);
  background-repeat: no-repeat;
}
.buttonZoom .button:disabled .bgImage,
.buttonZoom_White .button:disabled .bgImage {
  background: url(../assets/svg/buttonZoomDisabled.svg);
  background-repeat: no-repeat;
}

/* .buttonZoom_White - START */
.buttonZoom_White .button .bgImage {
  display: block;
  background: url(../assets/svg/buttonZoom_White_Normal.svg);
  background-repeat: no-repeat;
  width: 5.4vh;
  height: 5.4vh;
  margin: 0 auto;
  border: none;
  transition-property: transform;
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
}
.buttonZoom_White .button .slot {
  display: block;
}
.buttonZoom_White .button:enabled:hover .bgImage {
  background: url(../assets/svg/buttonZoom_White_HoverDepressed.svg);
  background-repeat: no-repeat;
}
/* .buttonZoom_White - END */

.buttonForward .button .bgImage {
  background: url(../assets/svg/arrowNext_Normal.svg) no-repeat top right;
  background-size: contain;
  border: 0;
  display: inline-block;
  width: 4.5vh;
  height: 4.5vh;
}
.buttonForward .button:enabled:hover .bgImage {
  background: url(../assets/svg/arrowNext_HoverDepressed.svg) no-repeat top
    right;
}
.buttonForward .button:disabled .bgImage {
  background: url(../assets/svg/arrowNext_Disabled.svg) no-repeat top right;
}

.buttonBack .button .bgImage {
  background: url(../assets/svg/arrowPrevious_Normal.svg) no-repeat top left;
  background-size: contain;
  border: 0;
  display: inline-block;
  width: 4.5vh;
  height: 4.5vh;
}
.buttonBack .button:enabled:hover .bgImage {
  background: url(../assets/svg/arowPrevious_HoverDepressed.svg) no-repeat top
    left;
}
.buttonBack .button:disabled .bgImage {
  background: url(../assets/svg/arrowPrevious_Disabled.svg) no-repeat top left;
}

.buttonPlay,
.buttonReplay,
.buttonPause {
  display: inline-block;
  transition-property: transform;
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
  text-align: center;
  text-decoration: none;
  background-color: transparent;
  width: 4.5vh;
  height: 4.5vh;
  vertical-align: middle;
  cursor: pointer;
  padding: 0;
}

.buttonPlay .bgImage,
.buttonReplay .bgImage,
.buttonPause .bgImage {
  border: 0.45vh solid var(--color-blue4);
  border-radius: 1.3vh;
  width: 4.5vh;
  height: 4.5vh;
}

.buttonPlay .bgImage {
  display: inline-block;
  background: url(../assets/svg/iconPlay_Normal.svg) no-repeat center;
  background-size: 70%, 100%;
}
.buttonPlay .button:enabled:hover .bgImage {
  background: url(../assets/svg/iconPlay_Hover.svg) no-repeat center,
    linear-gradient(var(--color-blue3-a), var(--color-blue4-a));
  background-size: 70%, 100%;
}
.buttonPlay .button:disabled .bgImage {
  border: 0.45vh solid var(--color-grey4);
  color: var(--color-grey4);
  background: url(../assets/svg/iconPlay_Disabled.svg) no-repeat center;
  background-size: 70%, 100%;
  opacity: 0.5;
  /* width: 4.5vh; */
  /* height: 4.5vh; */
  /* border-radius: 1.3vh; */
}

.buttonPlay .button:enabled:active .bgImage {
  background: url(../assets/svg/iconPlay_HoverDepressed.svg) no-repeat center,
    linear-gradient(var(--color-blue3), var(--color-blue4));
  background-size: 70%, 100%;
  /* border-radius: 1vh; */
  opacity: 1;
}

.buttonPause .button .bgImage {
  display: block;
  /* border: 0 solid var(--color-blue4); */
  /* border-radius: 0; */
  background: url(../assets/svg/iconPause_Normal.svg) no-repeat center;
  background-size: 50%, 100%;
  /* width: 3.7vh;
  height: 3.7vh; */
}
.buttonPause .button:enabled:hover .bgImage {
  background: url(../assets/svg/iconPause_Hover.svg) no-repeat center,
    linear-gradient(var(--color-blue3-a), var(--color-blue4-a));
  background-size: 50%, 100%;
  /* opacity: 0.5; */
  /* border-radius: 1vh; */
}

.buttonPause .button:enabled:active .bgImage {
  background: url(../assets/svg/iconPause_HoverDepressed.svg) no-repeat center,
    linear-gradient(var(--color-blue3), var(--color-blue4));
  background-size: 50%, 100%;
  /* border-radius: 1vh; */
  opacity: 1;
}
.buttonPause .button:disabled .bgImage {
  border: 0.45vh solid var(--color-grey4);
  color: var(--color-grey4);
  background: url(../assets/svg/iconPause_Disabled.svg) no-repeat center;
  background-size: 50%, 100%;
  opacity: 0.5;
}

.buttonReplay .button .bgImage {
  display: block;
  /* border: 0 solid var(--color-blue4); */
  /* border-radius: 0; */
  background: url(../assets/svg/iconReplay_Normal.svg) no-repeat center;
  background-size: 70%, 100%;
  /* width: 3.7vh;
  height: 3.7vh; */
}
.buttonReplay .button:enabled:hover .bgImage {
  background: url(../assets/svg/iconReplay_Hover.svg) no-repeat center,
    linear-gradient(var(--color-blue3-a), var(--color-blue4-a));
  background-size: 70%, 100%;
  /* opacity: 0.5; */
  /* border-radius: 1vh; */
}

.buttonReplay .button:enabled:active .bgImage {
  background: url(../assets/svg/iconReplay_HoverDepressed.svg) no-repeat center,
    linear-gradient(var(--color-blue3), var(--color-blue4));
  background-size: 70%, 100%;
}
.buttonReplay .button:disabled .bgImage {
  border: 0.45vh solid var(--color-grey4);
  color: var(--color-grey4);
  background: url(../assets/svg/iconReplay_Disabled.svg) no-repeat center;
  background-size: 70%, 100%;
  opacity: 0.5;
}

.buttonX .button .bgImage {
  display: inline-block;
  background: url(../assets/svg/buttonRadio_X_Normal.svg) no-repeat center;
  width: 4.5vh;
  height: 4.5vh;
}
.buttonX .button:enabled:hover .bgImage {
  background: url(../assets/svg/buttonRadio_X_HoverDepressed.svg) no-repeat
    center;
}
.buttonX .button:disabled .bgImage {
  background: url(../assets/svg/buttonRadio_X_Disabled.svg) no-repeat center;
}
.buttonX.white .button .bgImage {
  filter: invert(100%);
}
.buttonX.white .button:enabled:hover .bgImage,
.buttonX.white .button:disabled .bgImage {
  filter: none;
}

.buttonBlinkBlue .button:enabled {
  animation-name: blinkBlue;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;
  animation-direction: alternate;
}
.buttonBlinkBlue .button:enabled:hover {
  animation-name: none;
}
@keyframes blinkBlue {
  from {
    box-shadow: 0 0 0.175rem 0.175rem rgba(126, 214, 255, 0); /* color-blue3 with 0 alpha */
  }
  to {
    box-shadow: 0 0 0.5rem 0.5rem var(--color-blue3);
  }
}

.buttonBgImgBlinkBlue .button:enabled .bgImage {
  animation-name: bgBlinkBlue;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;
  animation-direction: alternate;
  --buttonBgImgBlinkBlueColor: rgba(126, 214, 255, 0.5);
}

@keyframes bgBlinkBlue {
  from {
    filter: drop-shadow(0 0 var(--buttonBgImgBlinkBlueColor));
    -webkit-filter: drop-shadow(0 0 var(--buttonBgImgBlinkBlueColor));
  }
  to {
    filter: drop-shadow(0.2rem 0 0.2rem var(--buttonBgImgBlinkBlueColor))
      drop-shadow(-0.2rem 0 0.2rem var(--buttonBgImgBlinkBlueColor))
      drop-shadow(0 0.2rem 0.2rem var(--buttonBgImgBlinkBlueColor))
      drop-shadow(0 -0.2rem 0.2rem var(--buttonBgImgBlinkBlueColor));
    -webkit-filter: drop-shadow(
        0.2rem 0 0.2rem var(--buttonBgImgBlinkBlueColor)
      )
      drop-shadow(-0.2rem 0 0.2rem var(--buttonBgImgBlinkBlueColor))
      drop-shadow(0 0.2rem 0.2rem var(--buttonBgImgBlinkBlueColor))
      drop-shadow(0 -0.2rem 0.2rem var(--buttonBgImgBlinkBlueColor));
  }
}
.buttonBlinkWhite .button:enabled {
  animation-name: blinkWhite;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;
  animation-direction: alternate;
}
.buttonBlinkWhite .button:enabled:hover {
  animation-name: none;
  box-shadow: 0 0 0.175rem 0.175rem white;
}
@keyframes blinkWhite {
  from {
    box-shadow: 0 0 0.175rem 0.175rem rgba(255, 255, 255, 0); /* white with 0 alpha */
  }
  to {
    box-shadow: 0 0 0.175rem 0.175rem white;
  }
}

.textProp {
  display: inline;
}

/* .buttonBasic_Invisible - START */
.buttonBasic_Invisible .button,
.buttonBasic_Invisible .button:disabled {
  transition-duration: 0.4s;
  transition-property: transform;
  background: transparent;
  box-shadow: 0 0 0 0.45vh rgba(85, 188, 234, 0);
  padding: 1.2vh;
  border-radius: 1vh;
  margin: 0px;
  font-size: inherit;
  min-width: 4.5vh;
  min-height: 4.5vh;
  line-height: 3vh;
}
.buttonBasic_Invisible .button:enabled:active {
  box-shadow: 0 0 0 0.45vh rgba(85, 188, 234, 0);
  background: linear-gradient(var(--color-blue3), var(--color-blue4));
}
.buttonBasic_Invisible .button:enabled:hover {
  box-shadow: 0 0 0 0.45vh rgba(85, 188, 234, 1);
}
.buttonBasic_Invisible.noPadding .button {
  padding: 0;
  margin: 0;
}
.buttonBasic_Invisible.circle .button{
  border-radius: 50%;
}
/* .buttonBasic_Invisible - END */
/* .buttonBasic_InvisibleWhite - START */
.buttonBasic_InvisibleW .button,
.buttonBasic_InvisibleW .button:disabled {
  transition-duration: 0.4s;
  transition-property: transform;
  background: transparent;
  box-shadow: 0 0 0 0.45vh rgba(85, 188, 234, 0);
  padding: 1.2vh;
  border-radius: 1vh;
  margin: 0px;
  font-size: inherit;
  min-width: 4.5vh;
  min-height: 4.5vh;
  line-height: 3vh;
}
.buttonBasic_InvisibleW .button:enabled:active {
  box-shadow: 0 0 0 0.45vh rgba(85, 188, 234, 0);
  background: white;
  color: black;
}
.buttonBasic_InvisibleW .button:enabled:hover {
  box-shadow: 0 0 0 0.45vh white;
}
.buttonBasic_InvisibleW.noPadding .button {
  padding: 0;
  margin: 0;
}
.buttonBasic_InvisibleW.circle .button{
  border-radius: 50%;
}
/* .buttonBasic_InvisibleWhite - END */
/* .buttonBasic_Image - START */
.buttonBasic_Image .button{
  transition-duration: 0.4s;
  transition-property: transform;
  background: transparent;
  margin: 0px;
  font-size: inherit;
}
.buttonBasic_Image .button:disabled {
  cursor: inherit;
}
.buttonBasic_Image .button:enabled {
  animation-name: bgBlinkBlue;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;
  animation-direction: alternate;
  --buttonBgImgBlinkBlueColor: rgba(126, 214, 255, 0.5);
}
/* .buttonBasic_Image - END */

/* .buttonBasic_Arrow - START */
.buttonBasic_Arrow .button {
  transition-duration: 0.4s;
  transition-property: transform;
  color: var(--color-white);
  margin: 0px;
  font-size: inherit;
  min-width: 4.5vh;
  min-height: 4.5vh;
  width: 100%;
  height: 100%;
}

.buttonBasic_Arrow.up .button {
  background: url("../assets/svg/arrow_Large_Grey_Up_SVG.svg") no-repeat center;
}

.buttonBasic_Arrow.up .button:enabled:active {
  background: url("../assets/svg/arrow_Large_Normal_Up_SVG.svg") no-repeat
    center;
}

.buttonBasic_Arrow.up .button:enabled:hover {
  background: url("../assets/svg/arrow_Large_Grey_Hover_Up_SVG.svg") no-repeat
    center;
}

.buttonBasic_Arrow.up .button:disabled {
  background: url("../assets/svg/arrow_Large_Grey_DisabledDepressed_Down_SVG.svg")
    no-repeat center;
}
.buttonBasic_Arrow.down .button {
  background: url("../assets/svg/arrow_Large_Grey_Down_SVG.svg") no-repeat
    center;
}

.buttonBasic_Arrow.down .button:enabled:active {
  background: url("../assets/svg/arrow_Large_Grey_Normal_Down_SVG.svg")
    no-repeat center;
}

.buttonBasic_Arrow.down .button:enabled:hover {
  background: url("../assets/svg/arrow_Large_Grey_Hover_Down_SVG.svg") no-repeat
    center;
}

.buttonBasic_Arrow.down .button:disabled {
  background: url("../assets/svg/arrow_Large_Grey_DisabledDepressed_Down_SVG.svg")
    no-repeat center;
}
.buttonBasic_Arrow.left .button {
  background: url("../assets/svg/arrow_Large_Grey_Left_SVG.svg") no-repeat
    center;
}

.buttonBasic_Arrow.left .button:enabled:active {
  background: url("../assets/svg/arrow_Large_Normal_Left_SVG.svg") no-repeat
    center;
}

.buttonBasic_Arrow.left .button:enabled:hover {
  background: url("../assets/svg/arrow_Large_Grey_Hover_Left_SVG.svg") no-repeat
    center;
}

.buttonBasic_Arrow.left .button:disabled {
  background: url("../assets/svg/arrow_Large_DisabledDepressed_Left_SVG.svg")
    no-repeat center;
}
.buttonBasic_Arrow.right .button {
  background: url("../assets/svg/arrow_Large_Grey_Right_SVG.svg") no-repeat
    center;
}

.buttonBasic_Arrow.right .button:enabled:active {
  background: url("../assets/svg/arrow_Large_Normal_Right_SVG.svg") no-repeat
    center;
}

.buttonBasic_Arrow.right .button:enabled:hover {
  background: url("../assets/svg/arrow_Large_Grey_Hover_Right_SVG.svg")
    no-repeat center;
}

.buttonBasic_Arrow.right .button:disabled {
  background: url("../assets/svg/arrow_Large_DisabledDepressed_Right_SVG.svg")
    no-repeat center;
}
/* .buttonBasic_Arrow - END */

/* .buttonCarousel_Arrow - START */
.buttonCarousel_Arrow .button {
  transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s;
  transition-property: transform;
	color: var(--color-white);
	margin: 0px;
	font-size: inherit;
	min-width: 4.5vh;
	min-height: 4.5vh;
	width: 100%;
	height: 100%;
}

.buttonCarousel_Arrow.left .button {
	background: url("../assets/svg/arrowLeft_Carousel_Normal.svg") no-repeat
		center;
}

.buttonCarousel_Arrow.left .button:enabled:active {
	background: url("../assets/svg/arrowLeft_Carousel_Depressed.svg") no-repeat
		center;
}

.buttonCarousel_Arrow.left .button:enabled:hover {
	background: url("../assets/svg/arrowLeft_Carousel_Hover.svg") no-repeat
		center;
}


.buttonCarousel_Arrow.right .button {
	background: url("../assets/svg/arrowRight_Carousel_Normal.svg") no-repeat
		center;
}

.buttonCarousel_Arrow.right .button:enabled:active {
	background: url("../assets/svg/arrowRight_Carousel_Depressed.svg") no-repeat
		center;
}

.buttonCarousel_Arrow.right .button:enabled:hover {
	background: url("../assets/svg/arrowRight_Carousel_Hover.svg")
		no-repeat center;
}

.buttonCarousel_Arrow.buttonBgImgBlinkBlue .button:enabled {
	animation-name: bgBlinkBlue;
	animation-duration: 1s;
	animation-iteration-count: infinite;
	animation-timing-function: ease-out;
	animation-direction: alternate;
	--buttonBgImgBlinkBlueColor: rgba(126, 214, 255, 0.5);
}
/* .buttonCarousel_Arrow - END */
</style>