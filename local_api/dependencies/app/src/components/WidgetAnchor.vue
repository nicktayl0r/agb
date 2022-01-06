<template>
  <div :id="id" class="anchorTransition" :class="AddRemoveClasses" v-show="visibleStore" :sim-widget-id="simWidgetId" :shared-data-read-key=anchorStore>
    <slot />
  </div>
</template>

<style>
.anchorTransition {
  transition: top, left 0.0666s linear;
}
</style>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Widget from "./Widget";
import { logMessage } from "@/helpers/debugHelpers";
import { getSharedDataUserOrAppVal } from "@/helpers/sharedDataHelpers";
import WidgetEnabled from "../mixins/WidgetEnabled";
import WidgetSharedData from "../mixins/WidgetSharedData";
import { Maybe } from "true-myth";

@Component({ mixins: [WidgetEnabled] })
export default class WidgetAnchor extends Widget {
  @Prop() simWidgetId: string;

  @Prop() sharedDataReadKey: string;

  observer: MutationObserver;

  mounted() {
    // logMessage("widget anchor mounted");
    this.reAnchor(this.anchorStore);
    this.observer = new MutationObserver(mutations => {
      // logMessage("anchor slot updated: ", mutations);
      //Go through the mutations and if any of the targets are not this element (therefore slot child), reposition the widget.
      for (const mut of mutations) {
        if (mut.target != this.$el) {
          // logMessage("REDRAW");
          this.reAnchor(this.anchorStore);
          break;
        }
      }
    });
    if (this.$slots.default != undefined) {
      //Watch this element's dom node for changes to attributes, child nodes, and child node attribute changes
      this.observer.observe(this.$el, {
        childList: true,
        subtree: true,
        attributes: true
      });
    }
  }

  beforeDestroy() {
    if (this.observer) this.observer.disconnect();
  }

  prevVisible = false;

  get visibleStore() {
    // logMessage("widgetAnchor override visibleStore");
    const isVisible = this.propStoreOverride("visible") as boolean;
    if (isVisible && !this.prevVisible) {
      // logMessage("widgetAnchor now visible");
      this.$nextTick(() => {
        // logMessage("widgetAnchor next tick");
        this.reAnchor(this.anchorStore);
      });
    }
    this.prevVisible = isVisible;
    return isVisible;
  }

  get anchorStore() {
    // logMessage("get anchorWidget anchoreStore value");

    if (!this.notGrapes) return this.$props.sharedDataReadKey;

    const sharedDataVal = getSharedDataUserOrAppVal(
      this.$store,
      this.$props.sharedDataReadKey
    );

    if (sharedDataVal) this.reAnchor(sharedDataVal as string);

    return sharedDataVal;
  }

  sim: Element | null;

  caseContent: HTMLElement;

  updateEvent = new Event("updatedPosition");

  reAnchor(anchorString: string) {
    let anchorObj: { x: number; y: number } = { x: 0, y: 0 };
    try {
      anchorObj = JSON.parse(anchorString);
    } catch (e) {
      anchorObj = { x: 0, y: 0 };
    }
    if (anchorObj) {
      if (this.$el) {
        if (this.sim == null) {
          this.sim = document.getElementById(this.$props.simWidgetId);
        }

        if (this.sim) {
          const simRect = this.sim.getBoundingClientRect();
          const elRect = this.$el.getBoundingClientRect();
          //the case content div of the case is relatively sized, so the absolute positioning of the anchor will start there

          const htmlEl = this.$el as HTMLElement;

          if (this.notGrapes) {
            if (this.caseContent == null) {
              const el = document.getElementById("case-content");
              if (el) this.caseContent = el;
            }
            const contentRect = this.caseContent.getBoundingClientRect();
            if (htmlEl.style) {
              htmlEl.style.position = "absolute";
              //have to account for the amount of scrolling on the case-content div
              const contentOffsetY =                contentRect.top - this.caseContent.scrollTop;
              const contentOffsetX =                contentRect.left - this.caseContent.scrollLeft;

              htmlEl.style.top =                `${(
                  simRect.top
                  - contentOffsetY
                  + anchorObj.y
                  - elRect.height / 2
              ).toString()}px`;
              htmlEl.style.left =                `${(
                  simRect.left
                  - contentOffsetX
                  + anchorObj.x
                  - elRect.width / 2
              ).toString()}px`;
              // logMessage("simRect: ", simRect);
              // logMessage(
              //   this.id,
              //   simRect.top,
              //   "+",
              //   anchorObj.y,
              //   "-",
              //   elRect.height / 2,
              //   "=",
              //   this.$el.style.top,
              // );
              this.$el.dispatchEvent(this.updateEvent);
            }
          } else {
            //if we're in grapes, just put it in the top left
            htmlEl.style.position = "absolute";
            htmlEl.style.top = `${simRect.top.toString()}px`;
            htmlEl.style.left = `${simRect.left.toString()}px`;
          }
        }
      }
    }
  }
}
</script>
