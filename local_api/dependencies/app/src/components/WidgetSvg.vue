<template>
	<div :id="id" @click="clicked" v-show="visibleStore" class="widgetSVG" :class="AddRemoveClasses">
		<object type="image/svg+xml" :data="currentData" :data-dataStore="dataStore"></object>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import Widget from "./Widget";
import WidgetClickable from "../mixins/WidgetClickable";
import { logError } from "@/helpers/debugHelpers";

@Component({ mixins: [WidgetClickable] })
export default class WidgetSvg extends Widget {
	@Prop()
	data: string;

	created() {
	  this.currentData = this.dataStore;
	}

	currentData = "";

	get dataStore() {
	  const newData = this.propStoreOverride("data") as string;
	  if (this.currentData !== "") {
	    loadImage(newData, this)
	      .then(value => {
	        const img = value as WidgetSvg;
	        img.currentData = newData;
	      })
	      .catch(error => logError("Error on WidgetSvg.loadImage:", error));
	  }
	  return newData;
	}
}

function ForwardClick() {
  //@ts-ignore - clicked is in mixin
  this.clicked();
}

async function loadImage(src: string, wImg: WidgetSvg) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(wImg);
    img.onerror = reject;
    img.src = src;
  });
}
</script>

<style>
.widgetSVG {
	pointer-events: all;
}
.widgetSVG object {
	pointer-events: none;
}
.imageOutline {
	filter: drop-shadow(0.2rem 0.2rem 0 var(--color-blue4))
		drop-shadow(-0.2rem 0.2rem 0 var(--color-blue4))
		drop-shadow(0.2rem -0.2rem 0 var(--color-blue4))
		drop-shadow(-0.2rem -0.2rem 0 var(--color-blue4));
	-webkit-filter: drop-shadow(0.2rem 0.2rem 0 var(--color-blue4))
		drop-shadow(-0.2rem 0.2rem 0 var(--color-blue4))
		drop-shadow(0.2rem -0.2rem 0 var(--color-blue4))
		drop-shadow(-0.2rem -0.2rem 0 var(--color-blue4));
}
</style>