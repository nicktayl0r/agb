<template>
	<img :id="id" v-show="visibleStore" :class="AddRemoveClasses" :src="currentSrc" :data-srcStore="srcStore" :alt="altStore" @click="clicked" />
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import Widget from "./Widget";
import WidgetClickable from "../mixins/WidgetClickable";
import { logError } from "@/helpers/debugHelpers";

@Component({ mixins: [WidgetClickable] })
export default class WidgetImage extends Widget {
	@Prop()
	src: string;

	@Prop()
	alt: string;

	created() {
	  this.currentSrc = this.srcStore;
	}

	currentSrc = "";

	get srcStore() {
	  const newSrc = this.propStoreOverride("src") as string;
	  if (this.currentSrc !== "") {
	    loadImage(newSrc, this)
	      .then(value => {
	        // logMessage("loaded", newSrc);
	        const img = value as WidgetImage;
	        img.currentSrc = newSrc;
	        // logMessage("img src", img.currentSrc);
	      })
	    // Error processing modified to avoid a possible CORS exception.
	    // https://stackoverflow.com/questions/44815172/log-shows-error-object-istrustedtrue-instead-of-actual-error-data
	      .catch(error => {
	        console.error(error);
	        logError(
	          "Error on WidgetImage.loadImage:",
	          JSON.stringify(error, ["message", "arguments", "type", "name"]),
	          `Src:${newSrc}`
	        );
	      });
	  }

	  // logMessage("currentSrc", this.currentSrc);
	  return newSrc;
	}

	get altStore() {
	  return this.propStoreOverride("alt");
	}
}

async function loadImage(src: string, wImg: WidgetImage) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(wImg);
    img.onerror = reject;
    img.src = src;
  });
}
</script>

<style scoped>
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