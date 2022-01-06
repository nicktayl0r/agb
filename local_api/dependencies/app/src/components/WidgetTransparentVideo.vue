<template>
	<div :id="id" v-show="visibleStore" v-bind:title="debugTitle()">
		<video class="video-js vjs-default-skin" preload="auto" :autoplay="autoPlayStore" :poster="getPoster()" :muted="mutedStore" :play-state="playStateStore" :speed="speedStore" :startTime="startTimeStore" :endTIme="endTimeStore" :alphaMask="alphaMask" :staticMask="staticMask" ref="videoElement">
			<source v-if="isChrome()" :src="srcWebm" type="video/webm">
			<source v-if="srcMp4ios && isMobileSafari()" :src="srcMp4ios" type="video/mp4">
			<source :src="srcMp4" type="video/mp4">
			<img v-if="staticMask !== ''" ref="staticAlphaMask" :src="staticMask" style="display: none;">
			<p class="vjs-no-js">
				To view this video please enable JavaScript, and consider upgrading to a web browser that
				<a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
			</p>
		</video>
		<div class="videoReplay" v-show="showRetry()">
			<div class="textBackgroundBasic dropShadow" v-bind:class="{ smallVideoReplay:!showRetryText() }">
				<p v-show="showRetryText()">There was an issue playing the video. Please wait a moment and try again.</p>
				<span class="buttonParent buttonBasic-Grey buttonBlinkBlue marginTop2">
					<fieldset class="button" @click="clickedRetry">
						<span class="bgImage"></span>
						<span class="slot">
							<p>Retry</p>
						</span>
					</fieldset>
				</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import seeThru from "seethru";
import videojs from "video.js";
import { Component, Prop } from "vue-property-decorator";

import { isChrome, isMobileSafari, isSafari } from "@/helpers/browserHelpers";
import WidgetVideoPlayer from "@/components/WidgetVideoPlayer.vue";
import { logMessage } from "@/helpers/debugHelpers";

@Component
export default class WidgetTransparentVideo extends WidgetVideoPlayer {
	@Prop({ default: "" })
	staticMask: string;

	@Prop({ default: true })
	alphaMask: boolean;

  createVjsInstance() {
    const id = this.$el.querySelector(".video-js");
    const options = { plugins: { offset: {} } };

	  this.videoInstance = videojs(
      //@ts-ignore
	    id,
	    options,
	    () => {
	      if (!(isChrome() && this.videoInstance.canPlayType('video/webm; codecs="vp8"'))) {
	        this.createSeeThru(); // use double height mp4
	      }
	    }
    );
  }

	createSeeThru() {
	  seeThru
	    .create(this.videoInstance.el().querySelector("video"), {
	      alphaMask: this.$props.alphaMask,
	      mask: this.$refs.staticAlphaMask
	    })
	    .ready(() => {
	      // logMessage("ready");
	      if (!this.$props.staticMask) {
	        this.videoInstance.width(this.videoInstance.currentWidth() / 2.0);
	      }
	      if (isSafari() && this.autoPlay)
	      //force autoplay on mobile safari
	        { this.videoInstance.play(); }

	      if (this.getPoster()) {
	        this.$nextTick(() => {
	          this.SetupCanvasPoster();
	        });
	      }
	    });
	}

	getPoster() {
	  // logMessage("Movie Poster is: ", this.poster);
	  if (this.poster == "") return undefined;
	  return this.poster;
	}

	lastCanvasRect: ClientRect;

	posterEL: HTMLElement | null;

	canvas: HTMLCanvasElement | null;

	SetupCanvasPoster() {
	  // logMessage("SetupCanvasPoster");
	  this.canvas = this.videoInstance.el().querySelector(".seeThru-display");
	  this.posterEL = this.videoInstance.el().querySelector(".vjs-poster");
	  // if (this.canvas == null || this.posterEL == null)
	  // 	logMessage("UHOH Canvas:", this.canvas, ", posterEL:", this.posterEL);

	  window.addEventListener("resize", this.ResizePoster, false);
	  // this.canvas!.style.display = "none"; //hide the canvas, so that it matches the behavior of webm
	  const context = this.canvas!.getContext("2d");
		context!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
		this.videoInstance.on("play", () => {
			this.canvas!.style.display = "";
		});
	}

	ResizePoster() {
	  if (
	    this.getPoster()
			&& this.posterEL != null
			&& getComputedStyle(this.posterEL!).display != "none"
	  ) {
	    const hideCanvas = this.canvas!.style.display == "none";
	    if (hideCanvas) this.canvas!.style.display = "";
	    const newCanvasRect = this.canvas!.getBoundingClientRect();
	    if (
	      !this.lastCanvasRect
				|| newCanvasRect.width !== this.lastCanvasRect.width
				|| newCanvasRect.height !== this.lastCanvasRect.height
				|| newCanvasRect.left !== this.lastCanvasRect.left
				|| newCanvasRect.top !== this.lastCanvasRect.top
	    ) {
				this.posterEL!.style.width = `${newCanvasRect.width}px`;
				this.posterEL!.style.height = `${newCanvasRect.height}px`;
				// logMessage(
				// 	this.id,
				// 	"Upate poster width: ",
				// 	this.posterEL!.style.width,
				// 	", height: ",
				// 	this.posterEL!.style.height
				// );
				const canvasParent = this.canvas!.parentElement!.getBoundingClientRect();
				this.posterEL!.style.left =					`${newCanvasRect.left - canvasParent.left}px`;
				this.posterEL!.style.top = `${newCanvasRect.top - canvasParent.top}px`;
	    }
	    this.lastCanvasRect = newCanvasRect;
	    if (hideCanvas) this.canvas!.style.display = "none";
	  }
	}

	get visibleStore() {
	  // logMessage(this.id, "trans video visible override.");
	  const isVisible = this.propStoreOverride("visible") as boolean;
	  if (isVisible) {
	    this.$nextTick(() => {
	      this.ResizePoster();
	    });
	  }
	  return isVisible;
	}
}
</script>

<style>
.videoFill .seeThru-display {
	height: 100%;
	width: auto;
}
</style>
