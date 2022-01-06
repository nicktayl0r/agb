// Component Wrapper for lottie-web
/* Documentation: https://github.com/airbnb/lottie-web
Events
  onComplete
  onLoopComplete
  onEnterFrame
  onSegmentStart

you can also use addEventListener with the following events:
  complete
  loopComplete
  enterFrame
  segmentStart
  config_ready (when initial config is done)
  data_ready (when all parts of the animation have been loaded)
  loaded_images (when all image loads have either succeeded or errored)
  DOMLoaded (when elements have been added to the DOM)
  destroy
*/

<template>
	<div :id="id" v-show="visibleStore" :class="AddRemoveClasses" :play-state="playStateStore" :src="getSrc" :loop="loop" :autoplay="autoplay" :speed="speed" :start-frame="getStartFrame" :end-frame="getEndFrame"></div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import lottie from "lottie-web";
import Widget from "./Widget";
import WidgetPlayable from "../mixins/WidgetPlayable";
import { state } from "../mixins/WidgetPlayable";
import { logMessage, logWarning } from "@/helpers/debugHelpers";
import { runWidgetEventConditions } from "../helpers/widgetHelpers";

@Component({ mixins: [WidgetPlayable] })
export default class WidgetAnimatedSvg extends Widget {
	@Prop({ default: "" })
	src: string;

	@Prop({ default: true })
	loop: boolean;

	@Prop({ default: true })
	autoplay: boolean;

	@Prop({ default: 1 })
	speed: number;

	@Prop({ default: 0 })
	startFrame: number;

	@Prop()
	endFrame: number;

	animSrc: string;

	anim: any;

	mounted() {
		this.prevStartFrame = this.propStoreOverride("startFrame") as number;
		this.loadAnimation(this.propStoreOverride("src") as string);
	}

	DoPlayState(s: state) {
		// logMessage("DoPlayState() has been overridden");
		this.play();
	}

	DoStopState(s: state) {
		// logMessage("DoStopState() has been overridden");
		this.stop();
	}

	DoPauseState(s: state) {
		// logMessage("DoPauseState() has been overridden");
		this.pause();
	}

	stop() {
		if (this.anim != undefined) {
			//if playState is set to "stop" in the tag, this can happen
			this.anim.stop();
		} else logWarning(this.id, " - Could not stop(), this.anim is undefined.");
	}

	play() {
		if (this.anim != undefined) {
			//if playState is set to "play" in the tag, this can happen
			const start = this.propStoreOverride("startFrame") as number;
			const end = this.propStoreOverride("endFrame") as number;
			// logMessage(
			//   this.id,
			//   " - WidgetAnimatedSvg: startFrame= ",
			//   start,
			//   ", endFrame= ",
			//   end,
			// );
			//start frame should be 0 if not set. just start playing from the startFrame
			let last_frame = end;
			if (end == undefined) {
				last_frame = this.anim.getDuration(true);
			} else {
				//both startFrame and endFrame are defined, so play that range.
			}
			const segments = [start, last_frame];
			this.anim.playSegments(segments, true);
		} else logWarning(this.id, " - Could not play(), this.anim is undefined.");
	}

	pause() {
		if (this.anim != undefined) {
			//if playState is set to "pause" in the tag, this can happen
			this.anim.pause();
		} else logWarning(this.id, " - Could not pause(), this.anim is undefined.");
	}

	get getSrc(): string {
		const sSrc = this.propStoreOverride("src") as string;
		//logMessage("WidgetAnimatedSvg.get src. return: ", sSrc);
		if (this.$el != undefined) {
			if (sSrc != this.animSrc) {
				logMessage("WidgetAnimatedSvg.get src. loadAnimation: ", sSrc);
				this.loadAnimation(sSrc);
			}
			/*else {
        logWarning(
          "src: ",
          sSrc,
          " is already loaded. Ignoring load request.",
        );
      }*/
		} else {
			logMessage(
				"src: ",
				sSrc,
				", widget has no element, Ignoring load request. This is normal when the widget loads for the first time."
			);
		}
		return sSrc;
	}

	prevStartFrame: number;

	get getStartFrame() {
		// logMessage("----- getStartFrame");
		const sFrame = this.propStoreOverride("startFrame") as number;
		if (this.anim != undefined) {
			const pState = this.propStoreOverride("playState") as string;
			if (pState == "stop" || pState == "default") {
				//animation is stopped, waiting to play, or has finished playing
				if (this.prevStartFrame != sFrame) {
					//anim can be null when the widget starts
					// logMessage(
					//   this.id,
					//   " is going to goToAndStop at ",
					//   sFrame,
					//   ", anim= ",
					//   this.anim,
					// );
					this.anim.goToAndStop(sFrame, true);
					this.anim.renderer.renderFrame(sFrame);
					this.prevStartFrame = sFrame;
				}
			}
			// }
		}
		return sFrame;
	}

	get getEndFrame(): number {
		const eFrame = this.propStoreOverride("endFrame") as number;
		return eFrame;
	}

	loadAnimation(fileSrc: string) {
		if (this.anim) {
			this.anim.destroy();
			this.anim = null;
		}

		logMessage(`loadAnimation:${fileSrc}`, this.id);
		this.anim = lottie.loadAnimation({
			container: this.$el,
			renderer: "svg",
			loop: this.loop,
			autoplay: false, //wait until data_ready before determining when to play
			path: fileSrc,
		});
		this.animSrc = fileSrc;
		this.anim.setSpeed(this.speed);
		this.$emit("animCreated", this.anim);
		this.anim.addEventListener("complete", this.OnAnimationComplete);
		this.anim.addEventListener("loopComplete", this.OnLoopComplete);
		this.anim.addEventListener("data_ready", this.OnDataReady);
	}

	OnAnimationComplete() {
		this.updateWidget("playState", "default"); //if set to "stop" then stopEffects is called.
		runWidgetEventConditions(this, this.$props.endEffects, this.$props.id);
	}

	OnLoopComplete() {
		runWidgetEventConditions(this, this.$props.loopEffects, this.$props.id);
	}

	OnDataReady() {
		//need to incorporate start and end frame. Manually call play() if autoPlay is true.
		// logMessage(this.id, " WidgetAnimatedSvg data is ready");
		// logMessage(this.id, " WidgetAnimatedSvg autoPlay is ", this.autoplay);
		const pState = this.propStoreOverride("playState") as string;
		if (this.autoplay || pState == "play") this.play();
		else {
			//autoplay is false, so go to the start frame and stop
			const sFrame = this.propStoreOverride("startFrame") as number;
			this.anim.goToAndStop(sFrame, true);
		}
	}

	beforeDestroy() {
		logMessage("destroying animatedSVG", this.id);
		if (this.anim) this.anim.destroy();
		// Destroying lottie was causing a problem on experiment pages in Photosynthesis with SVGs and links to glossary pages with SVGs.
		// When the second glossary page was opened, the svg on the first glossary page would destoy lottie,
		// which would kill the SVGs on the case page.
		// So it's probably not a good idea to destroy lottie.
		// if (lottie) lottie.destroy();
	}
}
</script>

<style>
/* in safari we need to apply this style to the child <svg> element */
.imageOutline > svg {
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
