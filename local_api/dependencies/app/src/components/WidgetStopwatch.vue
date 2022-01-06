<template>
	<span :id="id" v-show="visibleStore" :class="AddRemoveClasses" :start_ms="start_msStore" :end_ms="end_msStore" :play-state="playStateStore" :speed="speedStore" :autoplay="autoPlayStore">
		{{ formattedTimeString }}
	</span>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";

import { logMessage, logWarning } from "@/helpers/debugHelpers";
import { runWidgetEventConditions } from "@/helpers/widgetHelpers";
import WidgetPlayable, { state } from "@/mixins/WidgetPlayable";
import { readWidgetEntryVal } from "@/store/modules/userData";

import Widget from "./Widget";
import { setInterval, clearInterval } from "timers";

@Component({ mixins: [WidgetPlayable] })
export default class WidgetStopwatch extends Widget {
	@Prop({ default: 0 }) start_ms: number; //milliseconds

	@Prop({ default: 10000 }) end_ms: number; //milliseconds

	@Prop({ default: 1 }) speed: number;

	@Prop({ default: false }) autoPlay: boolean;

	@Prop({ default: "colon" }) format: "colon" | "hrs/mins" | "mins" | "secs";

	@Prop() sharedDataWriteKey: string;

	currentElapsedMS = 0;

	pastElapsedMS = 0; // use this to store time elapsed in previous plays, that may have been at different speeds

	// these are in js Date format: the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.
	startJSDate = 0;

	nowJSDate = 0;

	// window.startInterval and window.clearInterval use this number as an ID to reference the interval function
	intervalHandler: number | null = null;

	mounted() {
	  // @ts-ignore playStateStore is in WidgetPlayable
	  if (this.playStateStore != "play" && this.autoPlayStore) this.updateWidget("playState", "play");

	  this.pastElapsedMS = 0;
	}

	get start_msStore() {
	  return this.propStoreOverride("start_ms") as number;
	}

	get end_msStore() {
	  return this.propStoreOverride("end_ms") as number;
	}

	get autoPlayStore() {
	  return this.propStoreOverride("autoPlay") as boolean;
	}

	prevSpeed = 1;

	get speedStore() {
	  const newSpeed = this.propStoreOverride("speed") as number;
	  if (this.prevSpeed !== newSpeed) this.currentToPastElapsed();
	  this.prevSpeed = newSpeed;
	  return newSpeed;
	}

	get formattedTimeString(): string {
	  switch (this.$props.format) {
	  case "hrs/mins":
	    return (
	      `${(this.totalMS < 0 ? "-" : "")
					+ this.hours
					 } hrs ${
					 this.minutes
					 } mins`
	    );
	  case "colon":
	    let val = "";
	    if (this.totalMS < 0) val += "-";
	    if (this.hours != "00") val += `${this.hours}:`;
	    if (this.minutes != "00") val += `${this.minutes}:`;
	    val += `${this.seconds}:${this.hundredthSeconds}`;
	    return val;
	  case "mins":
	    return this.totalminutes;
	  case "secs":
	    return this.totalseconds;
	  }
	  return "";
	}

	get totalElapsedMS() {
	  return this.pastElapsedMS + this.currentElapsedMS;
	}

	get hours(): string {
	  const trim = this.totalMS >= 0 ? Math.floor : Math.ceil;

	  // const hrs = Math.abs(
	  // 	this.countDown
	  // 		? trim((this.start_msStore - this.totalElapsedMS) / 1000 / 60 / 60)
	  // 		: trim(this.totalElapsedMS / 1000 / 60 / 60)
	  // );
	  const hrs = Math.abs(trim(this.totalMS / 1000 / 60 / 60));
	  return hrs >= 10 ? hrs.toString() : `0${hrs}`;
	}

	get minutes(): string {
	  const trim = this.totalMS >= 0 ? Math.floor : Math.ceil;
	  // const min = Math.abs(
	  // 	this.countDown
	  // 		? trim(((this.start_msStore - this.totalElapsedMS) / 1000 / 60) % 60)
	  // 		: trim((this.totalElapsedMS / 1000 / 60) % 60)
	  // );
	  const min = Math.abs(trim((this.totalMS / 1000 / 60) % 60));
	  return min >= 10 ? min.toString() : `0${min}`;
	}

	get seconds(): string {
	  const trim = this.totalMS >= 0 ? Math.floor : Math.ceil;
	  // const sec = Math.abs(
	  // 	this.countDown
	  // 		? trim(((this.start_msStore - this.totalElapsedMS) / 1000) % 60)
	  // 		: trim((this.totalElapsedMS / 1000) % 60)
	  // );
	  const sec = Math.abs(trim((this.totalMS / 1000) % 60));
	  return sec >= 10 ? sec.toString() : `0${sec}`;
	}

	get hundredthSeconds(): string {
	  const trim = this.totalElapsedMS >= 0 ? Math.ceil : Math.floor;
	  // const hund = Math.abs(
	  // 	this.countDown
	  // 		? trim(((this.start_msStore - this.totalElapsedMS) / 10) % 100)
	  // 		: trim((this.totalElapsedMS / 10) % 100)
	  // );
	  const hund = Math.abs(trim((this.totalMS / 10) % 100));

	  if (hund == 100) return "00";
	  return hund >= 10 ? hund.toString() : `0${hund}`;
	}

	get totalminutes(): string {
	  // const min = this.countDown
	  // 	? Math.floor((this.start_msStore - this.totalElapsedMS) / 1000 / 60)
	  // 	: Math.floor(this.totalElapsedMS / 1000 / 60);
	  const min = Math.floor(this.totalMS / 1000 / 60);
	  return min.toString();
	}

	get totalseconds(): string {
	  // const secs = this.countDown
	  // 	? Math.floor((this.start_msStore - this.totalElapsedMS) / 1000)
	  // 	: Math.floor(this.totalElapsedMS / 1000);

	  const secs = Math.floor(this.totalMS / 1000);
	  return secs.toString();
	}

	get totalMS() {
	  return this.countDown
	    ? this.maxMS - this.totalElapsedMS
	    : this.totalElapsedMS + this.minMS;
	}

	get durationMS() {
	  return this.maxMS - this.minMS;
	}

	get countDown() {
	  return this.start_msStore >= this.end_msStore;
	}

	get minMS() {
	  if (!this.countDown) return this.start_msStore;
	  return this.end_msStore;
	}

	get maxMS() {
	  if (!this.countDown) return this.end_msStore;
	  return this.start_msStore;
	}

	DoPlayState(s: state) {
	  this.stopInterval();
	  logMessage("stopwatch DoPlayState", s);

	  if (this.totalElapsedMS >= this.durationMS) return; // prevent effects causing a play/end infinite loop

	  this.startJSDate = Date.now();
	  this.nowJSDate = this.startJSDate;
	  this.currentElapsedMS = 0;
	  const prevElapsed = readWidgetEntryVal(this.$store)(
	    this.pageID,
	    this.$props.id,
	    "elapsedMS"
	  );
	  logMessage("prevElapsed", prevElapsed.toString());
	  if (prevElapsed.isJust()) this.pastElapsedMS = prevElapsed.unsafelyUnwrap() as number;

	  logMessage("currentElapsedMS", this.currentElapsedMS.toString());
	  logMessage("totalElapsedMS", this.totalElapsedMS.toString());

	  this.StoreTime();

	  this.intervalHandler = window.setInterval(this.updateCurrentTime, 10); // 10ms is .01 seconds
	}

	DoStopState(s: state) {
	  this.stopInterval();

	  this.startJSDate = Date.now();
	  this.nowJSDate = this.startJSDate;
	  this.currentElapsedMS = 0;

	  this.StoreTime();
	}

	DoPauseState(s: state) {
	  this.stopInterval();

	  this.StoreTime();
	  this.currentToPastElapsed();
	}

	currentToPastElapsed() {
	  const currentVal = this.currentElapsedMS;
	  this.currentElapsedMS = 0;
	  this.pastElapsedMS += currentVal;
	  this.startJSDate = Date.now();
	}

	DoEnd() {
	  this.stopInterval();

	  this.StoreTime();
	  runWidgetEventConditions(this, this.$props.endEffects, this.$props.id);
	}

	StoreTime() {
	  if (this.$props.sharedDataWriteKey) {
	    this.updateSharedDataVal(
	      this.$props.sharedDataWriteKey,
	      this.formattedTimeString
	    );
	  }
	}

	beforeDestroy() {
	  this.StoreTime();
	}

	updateCurrentTime() {
	  // @ts-ignore playStateStore is in WidgetPlayable
	  //console.log("updateCurrentTime");
	  if (this.playStateStore === "play") {
	    this.nowJSDate = Date.now();
	    this.currentElapsedMS =				(this.nowJSDate - this.startJSDate) * this.speedStore;

	    // console.log(
	    // 	`this.nowJSDate ${this.nowJSDate} this.currentElapsedMS ${this.currentElapsedMS}`
	    // );
	    if (this.totalElapsedMS >= this.durationMS) {
	      //logMessage("totalElapsedMS", this.totalElapsedMS, "durationMS", this.durationMS);
	      logMessage("totalMS", this.totalMS, "maxMS", this.maxMS);
	      this.currentElapsedMS = this.durationMS + this.pastElapsedMS; // don't go over duration
	      // @ts-ignore currentPlayState is in WidgetPlayable
	      this.currentPlayState = "default"; // necessary to get ApplyPlayState to run play events after this
	      this.updateWidget("playState", "default");
	      this.DoEnd();
	    }
	  }
	}

	stopInterval() {
	  if (this.intervalHandler) window.clearInterval(this.intervalHandler);
	  this.intervalHandler = null;
	}
}
</script>