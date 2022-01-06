<template>
	<div :id="id" v-show="visibleStore" :sourceId="sourceIdStore" :source-offset-x="sourceOffsetXStore" :source-offset-y="sourceOffsetYStore" :target-id="targetIdStore" :target-offset-x="targetOffsetXStore" :target-offset-y="targetOffsetYStore" :duration="duration" :text="text" :delay="delay" :color="colorStore" :width="width" :class="AddRemoveClasses" :show-head="showHead" :control-points="controlPoints">
		<slot />
	</div>
</template>
<style>
.yarrow {
	position: absolute;
	pointer-events: none;
	z-index: 100;
	overflow: visible;
}
.yarrow .arrow {
	stroke-width: 0.1vh;
	stroke: #000;
	fill: none;
	-webkit-animation: 2s linear 2s 1 normal forwards yarrow-draw;
	-moz-animation: 2s linear 2s 1 normal forwards yarrow-draw;
	-ms-animation: 2s linear 2s 1 normal forwards yarrow-draw;
	-o-animation: 2s linear 2s 1 normal forwards yarrow-draw;
	animation: 2s linear 2s 1 normal forwards yarrow-draw;
}
.yarrow .arrow.tip-1 {
}
.yarrow .arrow.tip-2 {
}
.yarrow .arrow.text {
	stroke: none;
	fill: #000;
}

@-webkit-keyframes yarrow-draw {
	to {
		stroke-dashoffset: 0;
	}
}
@-moz-keyframes yarrow-draw {
	to {
		stroke-dashoffset: 0;
	}
}
@-ms-keyframes yarrow-draw {
	to {
		stroke-dashoffset: 0;
	}
}
@keyframes yarrow-draw {
	to {
		stroke-dashoffset: 0;
	}
}
</style>

<script lang="ts">
import { Yarrow } from "yarrow";
import { Component, Prop } from "vue-property-decorator";
import Widget from "./Widget";
import { logError, logMessage, logWarning } from "@/helpers/debugHelpers";
import { delay } from "../helpers/timeHelpers";

const yarrow = new Yarrow();

export class controlPoint {
	public x: number;

	public y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

@Component
export default class WidgetArrow extends Widget {
	@Prop()
	sourceId: string;

	// @Prop({ default: "MM" })
	// sourceSnap: string;
	@Prop({ default: 50 })
	sourceOffsetX: number;

	@Prop({ default: 50 })
	sourceOffsetY: number;

	@Prop()
	targetId: string;

	// @Prop({ default: "MM" })
	// targetSnap: string;
	@Prop({ default: 50 })
	targetOffsetX: number;

	@Prop({ default: 50 })
	targetOffsetY: number;

	@Prop({ default: 0 })
	duration: number;

	@Prop({ default: 0 })
	delay: number;

	@Prop({ default: "#ffffff" })
	color: string;

	@Prop({ default: 1 })
	width: number;

	@Prop({ default: "" })
	text: string;

	@Prop({ default: true })
	showHead: boolean;

	@Prop({ default: "" })
	controlPoints: string;

	arrow: any;

	opts: any = {};

	retryFind = 10;

	retries = 0;

	mounted() {
		logMessage("arrow mounted");
		const startSourceID = this.sourceIdStore; //don't call the getter more than once on start
		const startTargetID = this.targetIdStore; //don't call the getter more than once on start
		const htmlEl = this.$el as HTMLElement;
		this.opts = {
			animation: false,

			source: document.getElementById(startSourceID),

			target: document.getElementById(startTargetID),

			delay: this.$props.delay,

			duration: this.$props.duration,

			x1: (_: any) => {
				if (_.source) {
					let rectX = 0;
					if (_.source.element.hasAttribute("x-placement")) {
						//source is a popper.
						rectX = this.getTranslateCoords(
							_.source.element.style.getPropertyValue("transform")
						).x;
					}
					return (
						htmlEl.offsetLeft +
						_.source.left +
						rectX +
						(_.source.width * this.sourceOffsetXStore) / 100
						// rect.x + (_.source.width * this.$props.sourceOffsetX) / 100
					);
				}
				return this.sourceOffsetXStore;
			},

			y1: (_: any) => {
				if (_.source) {
					let rectY = 0;
					if (_.source.element.hasAttribute("x-placement")) {
						//source is a popper.
						rectY = this.getTranslateCoords(
							_.source.element.style.getPropertyValue("transform")
						).y;
					}
					return (
						htmlEl.offsetTop +
						_.source.top +
						rectY +
						(_.source.height * this.sourceOffsetYStore) / 100
					);
				}
				return this.sourceOffsetYStore;
			},

			x2: (_: any) => {
				if (_.target) {
					let rectX = 0;
					if (_.target.element.hasAttribute("x-placement")) {
						//source is a popper.
						rectX = this.getTranslateCoords(
							_.target.element.style.getPropertyValue("transform")
						).x;
					}
					return (
						htmlEl.offsetLeft +
						_.target.left +
						rectX +
						(_.target.width * this.targetOffsetXStore) / 100
					);
				}
				return this.targetOffsetXStore;
			},

			y2: (_: any) => {
				if (_.target) {
					let rectY = 0;
					if (_.target.element.hasAttribute("x-placement")) {
						//source is a popper.
						rectY = this.getTranslateCoords(
							_.target.element.style.getPropertyValue("transform")
						).y;
					}
					return (
						htmlEl.offsetTop +
						_.target.top +
						rectY +
						(_.target.height * this.targetOffsetYStore) / 100
					);
				}
				return this.targetOffsetYStore;
			},
			d: (_: any, u: any) => {
				if (
					this.controlPoints != undefined &&
					this.controlPoints != "" &&
					this.controlPoints != " "
				) {
					const cPs: string[] = this.controlPoints.split(" ");
					if (cPs.length == 1) {
						const xy = cPs[0].split(",");
						if (xy.length != 2) {
							logError(
								`${this.$props.id} has coordinates in the improper format. Use space separated coordinates: \`0,0 0,1\` : [${this.controlPoints}]`
							);
							return;
						}
						const controlP = this.createControlPoint(_, xy[0], xy[1]);
						const toReturn = u.join(
							u.M(_.dx > 0 ? 0 : _.w, _.dy > 0 ? 0 : _.h),
							u.Q(
								controlP.x,
								controlP.y,
								_.dx > 0 ? _.dx : 0,
								_.dy > 0 ? _.dy : 0
							) //adding in the quadratic notation
						);
						return toReturn;
					}
					if (cPs.length >= 2) {
						const p1 = cPs[0].split(",");
						const p2 = cPs[1].split(",");
						if (p1.length != 2 || p2.length != 2) {
							logError(
								`${this.$props.id} has coordinates in the improper format. Use space separated coordinates: \`0,0 0,1\` : [${this.controlPoints}]`
							);
							return;
						}
						const cp1 = this.createControlPoint(_, p1[0], p1[1]);
						const cp2 = this.createControlPoint(_, p2[0], p2[1]);
						const toReturn = u.join(
							u.M(_.dx > 0 ? 0 : _.w, _.dy > 0 ? 0 : _.h),
							u.C(
								cp1.x,
								cp1.y,
								cp2.x,
								cp2.y,
								_.dx > 0 ? _.dx : 0,
								_.dy > 0 ? _.dy : 0
							) //adding in the benzier notation
						);
						if (cPs.length > 2) {
							logWarning(
								`${this.$props.id} has more than 2 coordinates. Only 2 coordinates are supported at this time : [${this.controlPoints}]`
							);
						}
						return toReturn;
					}
					logWarning(
						`${this.$props.id} has coordinates in the improper format. Use space separate coordinates: \`0,0 0,1\` : [${this.controlPoints}]`
					);
				} else {
					return u.join(
						//original line code from source
						u.M(_.dx > 0 ? 0 : _.w, _.dy > 0 ? 0 : _.h),
						u.L(_.dx > 0 ? _.dx : 0, _.dy > 0 ? _.dy : 0)
					);
				}
			},
			// rewrite arrow tip paths to draw a triangle with one tip and don't draw the other
			d1: () => {
				// logMessage(
				//   "Widget Arrow.d1: ",
				//   getComputedStyle(document.documentElement).fontSize
				// );
				const { fontSize } = getComputedStyle(document.documentElement);
				if (fontSize != null) {
					let scaleBy: number | null = parseInt(fontSize, 10);
					if (scaleBy < 20 && scaleBy > 6) scaleBy = 1.5 * scaleBy - 10;
					else if (scaleBy <= 6) {
						scaleBy = 2;
					}

					const scaleBy_Half = scaleBy / 2;

					if (this.showHead)
						return `M 0,0 -${scaleBy},-${scaleBy_Half} -${scaleBy},${scaleBy_Half} z`;
					return "M 0,0";
				}
				if (this.showHead) return "M 0,0 -20,-10 -20,10 z";
				return "M 0,0";
			},
			d2: "M 0,0",

			arrowStyles: {
				stroke: this.colorStore,
				"stroke-width": this.$props.width * 0.1 + "vh",
				// fill: this.$props.color,
			},

			text: this.$props.text,
		};

		this.redraw();

		//redraw the arrows when the browser window changes size
		window.addEventListener("resize", this.redraw, false);
		//redraw the arrows after the page has finished loading. Sometimes images pop in and the arrow positions are off.
		if (this.notGrapes) {
			this.$nextTick(() => {
				this.subscribeToSourceTargetEvents(
					startSourceID,
					this.lastSourceRect,
					this.sourceObserver,
					true
				);
				this.subscribeToSourceTargetEvents(
					startTargetID,
					this.lastTargetRect,
					this.targetObserver,
					false
				);
			});
		}
	}

	get sourceIdStore() {
		const sourceStore = this.propStoreOverride("sourceId") as string;
		if (
			this.arrow &&
			this.opts.source != undefined &&
			this.opts.source.id != sourceStore
		) {
			//widgetRadio is special because the ID is on a child element of the template.
			if (
				this.opts.source.classList[0] == "radioParent" &&
				this.opts.source.children[0].id == sourceStore
			)
				return sourceStore;
			// console.log("we've got a new sourceID of", sourceStore);
			this.subscribeToSourceTargetEvents(
				sourceStore,
				this.lastSourceRect,
				this.sourceObserver,
				true
			);
		}
		return sourceStore;
	}

	get sourceOffsetXStore() {
		if (this.arrow) this.redraw(); //don't like it but can't quite get a single instance to update repeatedly.
		return this.propStoreOverride("sourceOffsetX") as number;
	}

	get sourceOffsetYStore() {
		if (this.arrow) this.redraw(); //don't like it but can't quite get a single instance to update repeatedly.
		return this.propStoreOverride("sourceOffsetY") as number;
	}

	get targetIdStore() {
		const targetStore = this.propStoreOverride("targetId") as string;
		if (
			this.arrow &&
			this.opts.target != undefined &&
			this.opts.target.id != targetStore
		) {
			//widgetRadio is special because the ID is on a child element of the template.
			if (
				this.opts.target.classList[0] == "radioParent" &&
				this.opts.target.children[0].id == targetStore
			)
				return targetStore;
			// console.log("we've got a new targetID of", targetStore);
			this.subscribeToSourceTargetEvents(
				targetStore,
				this.lastSourceRect,
				this.sourceObserver,
				false
			);
		}
		return targetStore;
	}

	get targetOffsetXStore() {
		if (this.arrow) this.redraw(); //don't like it but can't quite get a single instance to update repeatedly.
		return this.propStoreOverride("targetOffsetX") as number;
	}

	get targetOffsetYStore() {
		if (this.arrow) this.redraw(); //don't like it but can't quite get a single instance to update repeatedly.
		return this.propStoreOverride("targetOffsetY") as number;
	}

	get colorStore() {
		const cStore = this.propStoreOverride("color") as string;
		if (this.arrow && this.opts.arrowStyles.stroke != cStore) {
			logMessage("got a new color", cStore);
			// this.opts.arrowStyles.stroke = cStore;
			this.arrow.arrowStyles().stroke = cStore;
			this.arrow.render();
		}
		return cStore;
	}

	sourceObserver: MutationObserver;

	targetObserver: MutationObserver;

	lastSourceRect: ClientRect;

	lastTargetRect: ClientRect;

	redrawing: Boolean;

	subscribeToSourceTargetEvents(
		elementID: string,
		lastRect: ClientRect,
		observer: MutationObserver,
		source: boolean
	) {
		let element = document.getElementById(elementID);

		this.redrawing = false;

		if (element) {
			if (element.getAttribute("type") == "radio") {
				// logMessage("got me a radio");
				element = element.parentElement;
			}
			this.setupMutationObserver(element!, lastRect, observer);

			//patch opts
			if (
				source &&
				(this.opts.source == undefined || this.opts.source != element)
			) {
				this.opts.source = element;
				this.redraw();
			}
			if (
				!source &&
				(this.opts.target == undefined || this.opts.target != element)
			) {
				this.opts.target = element;
				this.redraw();
			}
		} else if (elementID && elementID !== "" && elementID != " ") {
			if (this.retries <= this.retryFind) {
				// logMessage(
				//   this.id,
				//   "!Looking for arrow's source/target again: ",
				//   elementID,
				// );
				TryFindSourceTargetAgain(this, elementID, lastRect, observer, source);
				this.retries++;
			} else {
				logError(
					"Widget-Arrow failed to find source/target after 10 tries. pageID: ",
					this.pageID,
					", widgetID: ",
					this.id,
					", can't find ID: ",
					elementID
				);
			}
		}
	}

	setupMutationObserver(
		element: HTMLElement,
		lastRect: ClientRect,
		observer: MutationObserver
	) {
		observer = new MutationObserver((mutations) => {
			const newRect = element!.getBoundingClientRect();

			for (const mut of mutations) {
				if (
					!this.redrawing &&
					(!lastRect ||
						newRect.top !== lastRect.top ||
						newRect.bottom !== lastRect.bottom ||
						newRect.left !== lastRect.left ||
						newRect.right !== lastRect.right ||
						newRect.width !== lastRect.width ||
						newRect.height !== lastRect.height)
				) {
					this.$nextTick(() => {
						this.redraw();
					});

					lastRect = newRect;
				}
				break;
			}
		});

		observer.observe(element, {
			childList: true,
			subtree: true,
			attributes: true,
		});
	}

	beforeDestroy() {
		window.removeEventListener("resize", this.redraw, false);
		// console.log("destroy arrows");
		if (this.sourceObserver) this.sourceObserver.disconnect();
		if (this.targetObserver) this.targetObserver.disconnect();
		if (this.arrow) {
			// takes two params: duration and delay.
			// They both seem to do the same thing, which is delay destroying the arrow
			this.arrow.dispose(0, 0);
			this.arrow = undefined;
		}
	}

	get visibleStore() {
		const isVisible = this.propStoreOverride("visible") as boolean;
		if (isVisible) {
			this.$nextTick(() => {
				this.redraw();
			});
		}
		return isVisible;
	}

	redraw() {
		this.redrawing = true;

		if (this.notGrapes) {
			//grapes gets upset trying to dispose an undefined
			if (this.arrow != undefined) {
				this.arrow.dispose();
				this.arrow = undefined;
			}
		}

		this.arrow = yarrow.arrow(this.opts, this.$el);
		this.arrow.render();
		if (this.$el.children.length > 0) {
			const tips = this.$el.children[0].children[0].children[1] as HTMLElement;
			if (tips != undefined) tips.style.fill = this.colorStore;
		}

		this.$nextTick(() => {
			this.redrawing = false;
		});
	}

	createControlPoint(_: any, x: string, y: string) {
		if (
			Number.isNaN(Number.parseFloat(x)) ||
			Number.isNaN(Number.parseFloat(x))
		) {
			logError(
				`${this.$props.id} has coordinates that aren't numbers. Use space separated coordinates: \`0,0.5 0,1\` : [${this.controlPoints}]`
			);
			return new controlPoint(0, 0);
		}
		return new controlPoint(
			Number.parseFloat(x) * _.w,
			Number.parseFloat(y) * _.h
		);
	}

	getTranslateCoords(styleString: string): { x: number; y: number } {
		styleString = styleString.replace(/translate3d\(|px|,|\)/g, "");
		const split = styleString.split(" ");
		return {
			x: Number.isNaN(Number.parseInt(split[0]))
				? 0
				: Number.parseInt(split[0]),
			y: Number.isNaN(Number.parseInt(split[1]))
				? 0
				: Number.parseInt(split[1]),
		};
	}
}

async function TryFindSourceTargetAgain(
	arrowWidget: WidgetArrow,
	elementID: string,
	lastRect: ClientRect,
	observer: MutationObserver,
	source: boolean
) {
	// logMessage("TryFindSourceTargetAgain in 0.25s");
	await delay(0.25);
	// logMessage("TryFindSourceTargetAgain now: ", arrowWidget.id, elementID);
	arrowWidget.subscribeToSourceTargetEvents(
		elementID,
		lastRect,
		observer,
		source
	);
}
</script>
