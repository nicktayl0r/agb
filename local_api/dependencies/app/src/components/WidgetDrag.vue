<template>
	<fieldset
    :id="id"
    v-show="visibleStore"
    :disabled="disabled"
    draggable="true"
    @dragstart="dragstart"
    @dragenter="dragenter"
    class="drag"
    :class="AddRemoveClasses"
    :style="{order: childIndex}">
		<span class="slot">
			<slot />
		</span>
	</fieldset>
</template>

<script lang="ts">
// I chose fieldset over span because it has a disabled attribute
import { polyfill } from "mobile-drag-drop";
import { scrollBehaviourDragImageTranslateOverride } from "mobile-drag-drop/scroll-behaviour";
import { isMobileSafari } from "@/helpers/browserHelpers";
import { logError, logWarning } from "@/helpers/debugHelpers";
import { removeDragWidget, addDragWidget } from "@/components/WidgetDrop.vue";

polyfill({
	// use this to make use of the scroll behaviour
	dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
	forceApply: true,
});

//@ts-ignore
window.doMobileSafariDragScrollWorkaround = false;

import { Maybe } from "true-myth";
import { Component, Prop } from "vue-property-decorator";

import Widget from "./Widget";
import { canAccessTopWindow } from "@/helpers/browserHelpers";
import { logMessage } from "@/helpers/debugHelpers";
import WidgetEnabled from "@/mixins/WidgetEnabled";
import WidgetSharedData from "@/mixins/WidgetSharedData";
import { readWidgetEntryVal, dispatchUpdateWidget } from "@/store/modules/userData";
import { getStore } from "@/helpers/storeHelpers";
import { getCurrentPageID } from "@/helpers/userHelpers";

@Component({ mixins: [WidgetEnabled, WidgetSharedData] })
export default class WidgetDrag extends Widget {
	@Prop({ default: "" })
	dropId: string;

	@Prop({ default: 0 })
	childIndex: number;

  @Prop({ default: "" })
	groupId: string;

  @Prop({ default: "" })
  correctDropIds: string;
	
  prevDropId: string;

	mounted() {
		const setParentDOM = this.dropIDAndSetDOM;
		if (this.$props.sharedDataReadKey) {
			const sharedValueOveride = this.propSharedDataOverride(
				"dropId",
				this.$props.sharedDataReadKey
			);
			this.updateWidget("dropId", sharedValueOveride);
			if (this.$props.sharedDataWriteKey) {
				this.updateSharedDataVal(
					this.$props.sharedDataWriteKey,
					sharedValueOveride
				);
			}
		}

		// prevent child images from doing their default drag behavior
		const slot = this.$el.querySelector(".slot");
		if (slot) {
			const childIMGs = slot.getElementsByTagName("IMG");
			for (let i = 0; i < childIMGs.length; i++) {
				childIMGs[i].setAttribute("draggable", "false");
			}
		}

		this.addMobileSafariScrollWorkaround();
	}

	// this doesn't need to do anything apparently
	safariTouchmove() {}

	beforeDestroy() {
		window.removeEventListener("touchmove", this.safariTouchmove);
	}

	updated() {
		const setParentDOM = this.dropIDAndSetDOM;
	}

	dragstart(ev: DragEvent) {
		if (!this.propStoreOverride("enabled") || !this.notGrapes) return;

		const target = ev.target;
		if (ev.dataTransfer) {
      //@ts-ignore
			ev.dataTransfer.setData("draggedWidgetID", target.id);
			logMessage("shared data key: ", this.$props.sharedDataWriteKey);
			if (this.$props.sharedDataWriteKey != undefined)
				logMessage("drag and send shared data key");
			ev.dataTransfer.setData(
				"draggedWidgetSharedDataWriteKey",
				this.$props.sharedDataWriteKey
			);
		}
	}

	// needed by mobile polyfill
	dragenter(ev: DragEvent) {
		ev.preventDefault();
	}

  get dropIDAndSetDOM() {
		let parentDropId;
		if (this.$props.sharedDataReadKey) {
			parentDropId = this.propSharedDataOverride(
				"dropId",
				this.$props.sharedDataReadKey
			);
		} else parentDropId = this.propStoreOverride("dropId");

		// remove prev drop dragId in store for DropsHaveDragsComparison
		if (this.prevDropId && this.prevDropId !== parentDropId) {
			removeDragWidget(this.prevDropId, this.id, this.pageID);
		}

		if (typeof parentDropId === "string" && parentDropId !== "") {
			if (parentDropId != this.prevDropId) {
				this.setParentDOM(parentDropId);
				// set drop dragId in store for DropsHaveDragsComparison
				addDragWidget(parentDropId, this.id, this.pageID);
			}
		} else {
			logWarning(
				"dropParent is not set on WidgetDrag",
				this.id,
				"has value",
				parentDropId
			);
		}
		this.prevDropId = parentDropId.toString();
		return parentDropId;
	}

	setParentDOM(parentDropId: string) {
		const dropEl = document.getElementById(parentDropId);
		if (!dropEl) return;
		const parentElement = dropEl.getElementsByClassName("dragSlot")[0];
		if (parentElement) {
			parentElement.appendChild(this.$el);
		} else {
			console.warn(
				"couldn't find element for dropParentID",
				parentDropId,
				"on WidgetDrag",
				this.id
			);
		}
	}

	addMobileSafariScrollWorkaround() {
		logMessage(
			"doMobileSafariDragScrollWorkaround",
      //@ts-ignore
			window.doMobileSafariDragScrollWorkaround,
			"isMobileSafari",
			isMobileSafari()
		);

      //@ts-ignore
		if (window.doMobileSafariDragScrollWorkaround || isMobileSafari()) {
			try {
				// workaround for iOS11.3/iOS12 touchmove behaviour (https://github.com/timruffles/mobile-drag-drop/issues/124)

				// Test via a getter in the options object to see if the passive property is accessed
				let supportsPassive = false;
				try {
					const opts = Object.defineProperty({}, "passive", {
						get() {
							supportsPassive = true;
						},
					});
					window.addEventListener("testPassive", () => {}, opts);
					window.removeEventListener("testPassive", () => {}, opts);
				} catch (e) {}

				const canAccessTop = canAccessTopWindow();

				logMessage(
					"supportsPasssive",
					supportsPassive,
					"canAccessTop",
					canAccessTop
				);

				if (supportsPassive) {
					window.addEventListener("touchmove", this.safariTouchmove, {
						passive: false,
					});
					// if the case is running in an iFrame, let's apply the iOS workaround to the top window as well
					if (canAccessTop) {
						if (window != window.top) {
							window.top.addEventListener("touchmove", this.safariTouchmove, {
								passive: false,
							});
						}
					}
				} else {
					window.addEventListener("touchmove", () => {});
					if (canAccessTop) {
						if (window != window.top) {
							window.top.addEventListener("touchmove", this.safariTouchmove);
						}
					}
				}
			} catch (err) {
				logError(err);
			}
		}
	}
}
</script>

<style>
/* basic drag "button" styles. (normal aka "diamond", ) */
.drag {
	display: inline-block;
}
.drag:disabled {
	cursor: not-allowed;
	pointer-events: none;
}
.drag:enabled:hover {
	cursor: grab;
}
.drag:enabled:active {
	cursor: grabbing;
}

.buttonDrag {
	background: transparent url(../assets/svg/buttonDrag_Normal.svg) no-repeat
		center;
	width: 8.5vh;
	height: 8.5vh;
	border: none;
	cursor: default;
	text-align: center;
	padding: 0;
	margin: 0 auto;
}
.buttonDrag:enabled:hover {
	background: transparent url(../assets/svg/buttonDrag_HoverDepressed.svg)
		no-repeat center;
}
.buttonDrag:disabled,
.buttonDrag_White:disabled {
	background: transparent url(../assets/svg/buttonDrag_Disabled.svg) no-repeat
		center;
	cursor: not-allowed;
}
.buttonDrag .slot {
	/* this is to vertical align slot contents */
	display: flex;
	justify-content: center;
	flex-direction: column;
	height: 100%;
}

/* .buttonDrag_White - START */
.buttonDrag_White {
	background: transparent url(../assets/svg/buttonDrag_White_Normal.svg)
		no-repeat center;
	width: 8.5vh;
	height: 8.5vh;
	border: none;
	cursor: default;
	text-align: center;
	padding: 0;
	margin: 0 auto;
}
.buttonDrag_White:enabled:hover {
	background: transparent url(../assets/svg/buttonDrag_White_HoverDepressed.svg)
		no-repeat center;
}
/* .buttonDrag_White - END */

.drag.buttonBasic-Grey {
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
.drag.buttonBasic-Grey:enabled:active {
	background: linear-gradient(var(--color-grey5), var(--color-grey6));
}
.drag.buttonBasic-Grey:enabled:hover {
	box-shadow: 0 0 0 0.45vh var(--color-blue3);
}
.drag.buttonBasic-Grey:disabled {
	background: linear-gradient(var(--color-grey4), var(--color-grey5));
	border: 0.25vh solid var(--color-grey5);
	opacity: 0.5;
}
.buttonBlinkBlue.drag:enabled {
	animation-name: blinkBlue;
	animation-duration: 1s;
	animation-iteration-count: infinite;
	animation-timing-function: ease-out;
	animation-direction: alternate;
}

.buttonBlinkBlue.drag:enabled:hover {
	animation-name: none;
}
</style>