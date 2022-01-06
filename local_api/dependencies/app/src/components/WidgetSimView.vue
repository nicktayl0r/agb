<template>
	<div class="simView" v-bind:class="{unsetZIndex:showRetry()}" :id="id" v-show="visibleStore" :scenename="scenename" :simstateid="simStateIDStore" :play-state="playStateStore" :muted="mutedStore">
		<loading-bar v-show="getShowProgressBar" ref="loadingBar" />
		<div class="simStateRetry" v-show="showRetry()">
			<div class="textBackgroundBasic dropShadow" v-bind:class="{ smallSimRetry:!showRetryText() }">
				<p v-show="showRetryText()">There was an issue loading this simulation. Please wait a moment and try again.</p>
				<span class="buttonParent buttonBasic-Grey buttonBlinkBlue marginTop2">
					<fieldset id="retrySimStateButton" class="button" @click="clickedRetry">
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
import { Component, Prop } from "vue-property-decorator";
import Widget from "./Widget";
import { LoadingBar } from "@/helpers/asyncHelpers";
import WidgetPlayable, { state } from "@/mixins/WidgetPlayable";

import { logError, logMessage, logWarning } from "@/helpers/debugHelpers";
import { getSimManager } from "@/helpers/simHelpers";
import { runWidgetEventConditions } from "@/helpers/widgetHelpers";
import { readAudioMuted } from "@/store/modules/userData";
import { ConditionsList } from "@/data models/conditionModels";

@Component({ mixins: [WidgetPlayable], components: { LoadingBar } })
export default class WidgetSimView extends Widget {
	@Prop()
	scenename: string;

	@Prop()
	simstateid: string;

	@Prop() sceneLoadedEffects: ConditionsList;

	@Prop({ default: false })
	muted: boolean;

	sceneLoaded = false;
	holdSimManagerInstructions: boolean = true;
	beforeCreate() {
		this.holdSimManagerInstructions = true;
	}

	mounted() {
		this.holdSimManagerInstructions = false;

		// this.$nextTick(function() {
		logMessage(
			"widgetSim mounted. sceneName: ",
			this.scenename,
			", simstateid: ",
			this.simstateid
		);
		//get the $el and then send the info to the simManager
		this.subscribeToSimManagerEvents();
		if (this.$el !== undefined) {
			getSimManager().AppendCanvasToElement(
				this.$el as HTMLElement,
				this.scenename
			);
			window.addEventListener("resize", this.handleResize, false);
			if (this.notGrapes) {
				this.sceneLoaded = getSimManager().GetSimInstIsLoaded(this.scenename);

				if (this.sceneLoaded) {
					runWidgetEventConditions(
						this,
						this.$props.sceneLoadedEffects,
						this.$props.id
					);
				}
			}
		} else logError("no $el on simView");

		this.DoMute(this.mutedStore);
		this.loadSimState(this.simStateIDStore);
	}

	handleResize() {
		getSimManager().UpdateCanvasSize(this.$el, this.scenename);
	}

	beforeDestroy() {
		window.removeEventListener("resize", this.handleResize, false);
		getSimManager()
			.terminateLoadSimState(this.scenename, this.owner)
			.catch((err) => {
				logError(err);
			});
		this.unsubscribeFromSimManagerEvents();
		getSimManager().UnHookSimUpdate(this.scenename);
	}

	updated() {
		// logMessage("------widgetSim updated---------");
		if (this.$el && (this.propStoreOverride("visible") as boolean)) {
			logMessage(
				"simViewWidget (",
				this.id,
				") updated, refreshing canvas size."
			);
			getSimManager().UpdateCanvasSize(this.$el, this.scenename);
		}
	}

	onAnimationDoneEvent(s: any, sN: any) {
		if (sN === this.scenename) {
			this.updateWidget("playState", "default"); //if set to "stop" then stopEffects is called.
			runWidgetEventConditions(this, this.$props.endEffects, this.$props.id);
		}
	}

	onAnimationLoopEvent(s: any, sN: any) {
		if (sN === this.scenename) {
			runWidgetEventConditions(this, this.$props.loopEffects, this.$props.id);
		}
	}

	onPreloadProgressEvent(sN: any, value: any) {
		if (sN === this.scenename) {
			// logMessage("simWidget has the loading value of ", value)
			try {
				// progress bar can fail to animate between two pages loading the same sim, where the first page hasn't finished loading the sim
				// catch the error so loading progress can continue
				const { loadingBar } = this.$refs;
				(loadingBar as any).progressBar.animate(value);
			} catch (err) {}
			if (value >= 1) {
				this.sceneLoaded = true;
				runWidgetEventConditions(
					this,
					this.$props.sceneLoadedEffects,
					this.$props.id
				);
			}
		}
	}

	subscribeToSimManagerEvents() {
		getSimManager().OnAnimationDone.subscribe(this.onAnimationDoneEvent);
		getSimManager().OnAnimationLoop.subscribe(this.onAnimationLoopEvent);
		getSimManager().OnPreloadProgress.subscribe(this.onPreloadProgressEvent);
	}

	unsubscribeFromSimManagerEvents() {
		getSimManager().OnAnimationDone.unsubscribe(this.onAnimationDoneEvent);
		getSimManager().OnAnimationLoop.unsubscribe(this.onAnimationLoopEvent);
		getSimManager().OnPreloadProgress.unsubscribe(this.onPreloadProgressEvent);
	}

	previousSimState = "";

	get simStateIDStore() {
		if (!this.notGrapes) return "";

		const simStateID = this.propStoreOverride("simstateid") as string;
		//logMessage("WidgetPlayable.get simStateIDStore. return: ", sState);
		if (simStateID != this.previousSimState) {
			logMessage(
				"WidgetSimView.get simStateIDStore. loadSimState: ",
				simStateID
			);
			this.previousSimState = simStateID;
			this.loadSimState(simStateID);
		}
		return simStateID;
	}

	get getShowProgressBar() {
		return this.notGrapes ? !this.sceneLoaded : false;
	}

	get owner() {
		return {
			PageID: this.pageID,
			WidgetID: this.id,
			SceneName: this.scenename,
			SimStateID: this.simStateIDStore,
		};
	}

	DoPlayState(s: state) {
		logMessage("WidgetSimView.DoPlayState() has been overridden");
		this.changeSimStatePlayState(s);
	}

	DoStopState(s: state) {
		logMessage("WidgetSimView.DoStopState() has been overridden");
		this.changeSimStatePlayState(s);
	}

	DoPauseState(s: state) {
		logMessage("WidgetSimView.DoPauseState() has been overridden");
		this.changeSimStatePlayState(s);
	}

	get mutedStore() {
		if (!this.notGrapes) return true;
		const m = readAudioMuted(this.$store);
		this.DoMute(m);
		return m;
	}

	DoMute(m: boolean) {
		if (!this.holdSimManagerInstructions) getSimManager().ChangeMute(m);
	}

	showRetry() {
		return this.showRetryElement;
	}

	showRetryElement = false;
	retryCount = 0;

	clickedRetry() {
		const simStateID = this.propStoreOverride("simstateid") as string;

		logWarning(
			"Sim state retry after: Network Error",
			this.scenename,
			simStateID
		);
		this.showRetryElement = false;

		setTimeout(() => {
			this.retryCount++;
			this.loadSimState(simStateID);
		}, 250);
	}

	showRetryText() {
		if (this.$el != undefined) {
			return this.$el.clientWidth > 300;
		}
		return true;
	}

	//SimManager Instructions
	changeSimStatePlayState(s: state) {
		if (!this.holdSimManagerInstructions)
			getSimManager().ChangeSimStatePlayState(this.scenename, s, this.owner);
	}

	loadSimState(simStateID: string) {
		if (!this.holdSimManagerInstructions)
			getSimManager()
				.loadSimState(
					this.scenename,
					simStateID,
					this.OnSimStateRequest,
					this.OnSimStateRequestCancelled,
					this.OnSimStateRequestFailed,
					this.owner
				)
				.catch((err) => {
					logError(
						`WidgetSimView loadSimState`,
						this.scenename,
						simStateID,
						err
					);
				});
	}

	OnSimStateRequest(sceneName: string, stateID: string) {
		//@ts-ignore this is from WidgetPlayable
		this.ApplyPlayState(false, true);
		this.retryCount = 0;
	}

	OnSimStateRequestCancelled(sceneName: string, stateID: string) {
		this.retryCount = 0;
	}

	OnSimStateRequestFailed(sceneName: string, stateID: string) {
		if (this.retryCount >= 3) return;
		//don't show the modal, don't execute effects, they will have happened already
		if (this.retryCount == 2) {
			this.updateWidget("playState", "default"); //if set to "stop" then stopEffects is called.
			//run both end and loop effects
			runWidgetEventConditions(this, this.$props.endEffects, this.$props.id);
			runWidgetEventConditions(this, this.$props.loopEffects, this.$props.id);
			this.showRetryElement = false;
			this.retryCount = 0;
		} else {
			this.showRetryElement = true;
		}
	}
}
</script>

<style>
.simView {
	overflow: hidden;
}

.simStateRetry {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	padding: 6vh;
	font-size: initial;
	color: initial;
	position: relative;
	background-color: rgba(0, 0, 0, 0.75);
	z-index: 110; /* 10 behind App.vue #guideButtonsContainer */
}

.simStateRetry .textBackgroundBasic {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.smallSimRetry {
	background: transparent;
	border: none;
	box-shadow: none;
}

.unsetZIndex {
	z-index: unset !important;
}
</style>
