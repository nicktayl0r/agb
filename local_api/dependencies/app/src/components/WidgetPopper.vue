<template>
	<div :id="id" v-show="visibleStore" @click="clicked" class="dropShadow textBackgroundBasic popper" :class="{ noSelect:notGrapes, AddRemoveClasses}" :data-anchorId="anchorIdStore">
		<slot />
		<div class="popperArrow"></div>
	</div>
</template>

<style scoped>
.popper {
	position: absolute;
	padding: 3vh;
	display: block;
	z-index: 210;
}
.popper .popperArrow {
	width: 0;
	height: 0;
	border-style: solid;
	position: absolute;
	margin: 10px;
	border-color: inherit;
}

.popper[x-placement^="top"] {
	margin-bottom: 2vh;
}
.popper[x-placement^="top"] .popperArrow {
	border-width: 2vh 2vh 0 2vh;
	border-left-color: transparent;
	border-right-color: transparent;
	border-bottom-color: transparent;
	bottom: -2vh;
	left: calc(50% - 20px);
	margin-top: 0;
	margin-bottom: 0;
}
.popper[x-placement^="bottom"] {
	margin-top: 2vh;
}
.popper[x-placement^="bottom"] .popperArrow {
	border-width: 0 2vh 2vh 2vh;
	border-left-color: transparent;
	border-right-color: transparent;
	border-top-color: transparent;
	top: -2vh;
	left: calc(50% - 20px);
	margin-top: 0;
	margin-bottom: 0;
}
.popper[x-placement^="right"] {
	margin-left: 2vh;
}
.popper[x-placement^="right"] .popperArrow {
	border-width: 2vh 2vh 2vh 0;
	border-left-color: transparent;
	border-top-color: transparent;
	border-bottom-color: transparent;
	left: -2vh;
	top: calc(50% - 20px);
	margin-left: 0;
	margin-right: 0;
}
.popper[x-placement^="left"] {
	margin-right: 2vh;
}
.popper[x-placement^="left"] .popperArrow {
	border-width: 2vh 0 2vh 2vh;
	border-top-color: transparent;
	border-right-color: transparent;
	border-bottom-color: transparent;
	right: -2vh;
	top: calc(50% - 20px);
	margin-left: 0;
	margin-right: 0;
}
.popperClickable * {
	-webkit-touch-callout: auto;
    -webkit-user-select: auto;
    -khtml-user-select: auto;
    -moz-user-select: auto;
    -ms-user-select: auto;
	user-select: auto;
	pointer-events: auto;
}
</style>

<script lang="ts">
import Popper from "popper.js";

import { mergeDeepRight } from "ramda";
import { Maybe } from "true-myth";

import { Component, Prop } from "vue-property-decorator";
import Widget from "./Widget";
import WidgetClickable from "../mixins/WidgetClickable";
import { logMessage } from "@/helpers/debugHelpers";
import {
	runWidgetEventConditions,
	WidgetPropEntryOverride,
} from "../helpers/widgetHelpers";
import { delay } from "../helpers/timeHelpers";
import { readWidgetEntryVal } from "../store/modules/userData";
import { widgetValPrimitive } from "@/data models/widgetModels";

@Component({ mixins: [WidgetClickable] })
export default class WidgetPopper extends Widget {
	@Prop() anchorId: string;

	@Prop() delay: number; // if the popper is visible on the page, delay showing for this many seconds

	@Prop({ default: false })
	delayOnce: boolean; // if true only delay the first time the popper is shown

	@Prop() options: object; // we can pass in more JSON options

	@Prop({ default: true })
	clickToDismiss: boolean;

	referenceElement: Element | null;

	popperInstance: Popper;

	popperCreateCallback = (data: object) => {
		//logMessage("popper created", data);
	};

	popperUpdateCallback = (data: object) => {}; //logMessage("popper updated", data);

	currentAnchorId: string;

	delaying = false;

	observer: MutationObserver;

	mounted() {
		logMessage("popper mounted");
		this.currentAnchorId = this.propStoreOverride("anchorId") as string;

		createPopper(this);
		window.addEventListener("resize", this.reposition, false);
	}

	updated() {
		if (this.popperInstance) this.reposition();
		else createPopper(this);
	}

	beforeDestroy() {
		window.removeEventListener("resize", this.reposition, false);
		if (this.observer) this.observer.disconnect();
		this.referenceElement = null;
		this.destroyPopperInstance();
	}

	destroyPopperInstance() {
		if (
			this.popperInstance &&
			// @ts-ignore popperInstance.state
			!this.popperInstance.state.isDestroyed
		)
			this.popperInstance.destroy();
	}

	clicked() {
		if (!this.$store || !this.notGrapes) return;

		logMessage(this.$props.id, "clicked");

		runWidgetEventConditions(this, this.$props.clickEffects, this.$props.id);

		if (this.$props.clickToDismiss) this.updateWidget("visible", false);
	}

	get anchorIdStore(): string {
		const storeAnchorId = this.propStoreOverride("anchorId");
		// console.log(
		// 	"start: wigetPopper.currentAnchorID:",
		// 	this.currentAnchorId,
		// 	"storeID: ",
		// 	storeAnchorId
		// );
		if (typeof storeAnchorId === "string") {
			if (this.currentAnchorId !== storeAnchorId) {
				this.currentAnchorId = storeAnchorId;
				if (this.popperInstance) {
					//@ts-ignore - the below is not defined in the type
					this.popperInstance.reference = document.getElementById(
						this.currentAnchorId
					);
					this.reposition();
				}
			}
			// console.log("end: wigetPopper.currentAnchorID:", this.currentAnchorId);
			return storeAnchorId;
		}
		return "";
	}

	prevVisible = false;

	get visibleStore() {
		// logMessage("widgetPopper override visibleStore");
		const isVisible = this.propStoreOverride("visible") as boolean;
		if (isVisible && !this.prevVisible) {
			// logMessage("widgetPopper now visible");
			this.reposition();
		}
		this.prevVisible = isVisible;
		return isVisible;
	}

	reposition() {
		this.$nextTick(() => {
			// logMessage("widgetPopper reposition next tick");
			if (this.popperInstance) this.popperInstance.scheduleUpdate();
		});
	}
}

function getBoundariesEl() {
	return document.getElementById("case-content");
}

async function createPopper(popperWidget: WidgetPopper) {
	if (!popperWidget.$el) {
		console.warn("couldn't find popper widget element in createPopper");
		return;
	}

	if (popperWidget.delaying) return;

	if (popperWidget.notGrapes) {
		const maybeDelayedAlready = readWidgetEntryVal(popperWidget.$store)(
			popperWidget.pageID,
			popperWidget.$props.id,
			"delayed"
		);

		if (
			popperWidget.delay &&
			popperWidget.delay !== 0 &&
			popperWidget.visibleStore &&
			!(
				popperWidget.$props.delayOnce &&
				maybeDelayedAlready.isJust() &&
				Maybe.unsafelyUnwrap(maybeDelayedAlready)
			) // we need to only delay once, and haven't done it yet
		) {
			const htmlEl = popperWidget.$el as HTMLElement;
			const displayVal = htmlEl.style.display;
			// instead of setting visible = false in the store, let's just set the style
			// that way if some other widget sets it to false with an effect we can respect that after the delay
			htmlEl.style.display = "none";
			popperWidget.delaying = true;
			// logMessage("delaying popper", popperWidget.delay);
			await delay(popperWidget.delay);
			popperWidget.delaying = false;

			const maybeVisible = WidgetPropEntryOverride(
				popperWidget.pageID,
				popperWidget.$props.id,
				"visible"
			);
			if (maybeVisible.isJust()) {
				const visible = maybeVisible.unsafelyUnwrap();
				if (visible) htmlEl.style.display = displayVal;
			}

			if (popperWidget.$props.delayOnce)
				popperWidget.updateWidget("delayed", true);
			// logMessage("popper done delaying", popperWidget);
		}

		const maybeAnchorElementVisible = WidgetPropEntryOverride(
			popperWidget.pageID,
			popperWidget.currentAnchorId,
			"visible"
		);

		if (maybeAnchorElementVisible.isJust()) {
			if (maybeAnchorElementVisible.unsafelyUnwrap() === false) {
				// logMessage(
				// 	"popper:",
				// 	popperWidget.$props.id,
				// 	"anchor widget:",
				// 	popperWidget.currentAnchorId,
				// 	"is not visible",
				// );
				popperWidget.updateWidget("visible", false);
				return;
			}
		}
	}

	popperWidget.referenceElement = document.getElementById(
		popperWidget.currentAnchorId
	);
	// this is a workaround for widget-radios, where the id is set on the input element, which is set to display:none
	if (
		popperWidget.referenceElement &&
		getComputedStyle(popperWidget.referenceElement).display == "none"
	) {
		popperWidget.referenceElement = popperWidget.referenceElement.parentElement;
	}
	// logMessage("popper referenceElement", popperWidget.referenceElement);

	if (popperWidget.referenceElement != null) {
		//logMessage("popping on", referenceElement);

		const arrowElement = popperWidget.$el.querySelector(".popperArrow");

		// set some defaults
		let options: Popper.PopperOptions = {
			placement: "top",
			modifiers: {
				preventOverflow: {
					boundariesElement: getBoundariesEl()!,
					escapeWithReference: false,
				},
				keepTogether: { enabled: false },
			},
		};
		// merge options from props, allowing to overwrite defaults
		if (popperWidget.$props.options)
			options = mergeDeepRight(options, popperWidget.$props.options);
		// overwrite that with stuff we require
		options = mergeDeepRight(options, {
			modifiers: {
				arrow: {
					element: arrowElement,
				},
			},
			onCreate: popperWidget.popperCreateCallback,
			onUpdate: popperWidget.popperUpdateCallback,
			removeOnDestroy: true,
		}) as Popper.PopperOptions;
		// I had to mod the arrow modifier function to get arrows to point without keepTogether,
		// which we don't want because it puts poppers outside the boundariesElement
		if (
			options.modifiers &&
			options.modifiers.keepTogether &&
			options.modifiers.keepTogether.enabled === false
		) {
			options = mergeDeepRight(options, {
				modifiers: {
					arrow: {
						fn: arrowModifierFunc,
					},
				},
			});
		}
		// console.log("popperOptions", options);

		popperWidget.popperInstance = new Popper(
			popperWidget.referenceElement,
			popperWidget.$el,
			options
		);
		//logMessage("popper instance", popperWidget.popperInstance);

		popperWidget.observer = new MutationObserver((mutations) => {
			// logMessage("referenceEl updated: ", mutations);
			//Go through the mutations and if any of the targets are not this element (therefore referenceEl), reposition the widget.
			for (const mut of mutations) {
				if (mut.target != popperWidget.$el) {
					// logMessage("reposition popper");
					popperWidget.reposition();
					break;
				}
			}
		});
		popperWidget.observer.observe(popperWidget.referenceElement, {
			childList: true,
			subtree: true,
			attributes: true,
		});
	} else popperWidget.destroyPopperInstance();
}

function arrowModifierFunc(data: any, options: any) {
	const arrowElement = options.element;

	const placement = data.placement.split("-")[0];
	const { popper, reference } = data.offsets;
	const isVertical = ["left", "right"].indexOf(placement) !== -1;

	const len = isVertical ? "height" : "width";
	const sideCapitalized = isVertical ? "Top" : "Left";
	const side = sideCapitalized.toLowerCase();
	const altSide = isVertical ? "left" : "top";
	const opSide = isVertical ? "bottom" : "right";
	const arrowElementSize = getOuterSizes(arrowElement)[len];

	// compute center of the popper
	const center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

	// Compute the sideValue using the updated popper offsets
	// take popper margin in account because we don't have this info available
	//@ts-ignore
	const css = getStyleComputedProperty(data.instance.popper);
	//@ts-ignore
	const popperMarginSide = parseFloat(css[`margin${sideCapitalized}`], 10);
	//@ts-ignore
	const popperBorderSide = parseFloat(css[`border${sideCapitalized}Width`], 10);
	let sideValue =
		center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

	// prevent arrowElement from being placed not contiguously to its popper
	sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

	data.arrowElement = arrowElement;
	data.offsets.arrow = {
		[side]: Math.round(sideValue),
		[altSide]: "", // make sure to unset any eventual altSide value from the DOM node
	};

	return data;
}

function getOuterSizes(element: any) {
	const window = element.ownerDocument.defaultView;
	const styles = window.getComputedStyle(element);
	const x =
		parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
	const y =
		parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
	const result = {
		width: element.offsetWidth + y,
		height: element.offsetHeight + x,
	};
	return result;
}

function getStyleComputedProperty(element: any, property: any) {
	if (element.nodeType !== 1) {
		return [];
	}
	// NOTE: 1 DOM access here
	const window = element.ownerDocument.defaultView;
	const css = window.getComputedStyle(element, null);
	return property ? css[property] : css;
}

function getClientRect(offsets: any) {
	return {
		...offsets,
		right: offsets.left + offsets.width,
		bottom: offsets.top + offsets.height,
	};
}
</script>
