// I chose fieldset over span because it has a disabled attribute
<template>
	<fieldset
    :id="id"
    v-show="visibleStore"
    :disabled="disabled"
    @drop="drop"
    @dragover="dragover"
    @dragenter="dragenter"
    class="drop"
    :class="AddRemoveClasses"
    :maxChildren="maxChildrenStore"
    :overflowStyle="overflowStyleStore">
		<span class="contentSlot noSelect">
			<slot />
		</span>
		<span class="dragSlot"></span>
	</fieldset>
</template>

<script lang="ts">
import { Maybe } from "true-myth";

import { Component, Vue, Prop } from "vue-property-decorator";
import Widget from "./Widget";
import { logMessage, logWarning } from "@/helpers/debugHelpers";
import WidgetEnabled from "@/mixins/WidgetEnabled";
import { readWidgetPropVal } from "@/store/modules/appData";
import {
  readWidgetEntryVal,
  dispatchUpdateWidget
} from "@/store/modules/userData";
import { widgetValPrimitive } from "../data models/widgetModels";
import { getSharedDataUserOrAppVal } from "@/helpers/sharedDataHelpers";
import { getStore } from "@/helpers/storeHelpers";

@Component({ mixins: [WidgetEnabled] })
export default class WidgetDrop extends Widget {
	@Prop({ default: 1 })
	maxChildren: number;

	@Prop({ default: "reset-child" })
	overflowStyle: "reset-child" | "swap";

  @Prop({ default: "" })
	allowedGroupId: string;

	// written into the store in WidgetDrag, because drags can be moved by effects
	get maxChildrenStore() {
	  const max = this.propStoreOverride("maxChildren") as number;
	  if (this.$el) {
	    const dragSlot = this.$el.getElementsByClassName("dragSlot")[0];
	    if (dragSlot.children.length > max) {
	      const extra = dragSlot.children.length - max;
	      for (let i = 0; i < extra; i++) {
	        const extraChild = dragSlot.children[
	          dragSlot.children.length - 1 - i
	        ] as HTMLElement;
	        const extraChildID = extraChild.id;
	        const extraChildWriteKey = extraChild.getAttribute(
	          "shared-data-write-key"
	        );
	        const startDropID = this.GetPropDropID(extraChildID);
          this.UpdateChildDropID(
	          extraChildID,
	          extraChildWriteKey,
	          extraChild,
	          startDropID
	        );
	      }
	    }
	  }
	  return max;
	}

	get overflowStyleStore() {
	  return this.propStoreOverride("overflowStyle") as string;
	}

	mounted() {
	  // prevent child images in contentSlot from doing their default drag behavior
	  const contentSlot = this.$el.querySelector(".contentSlot");
	  if (contentSlot) {
	    const childIMGs = contentSlot.getElementsByTagName("IMG");
	    for (let i = 0; i < childIMGs.length; i++) {
	      childIMGs[i].setAttribute("draggable", "false");
	    }
	  }
	}

	dragover(ev: DragEvent) {
	  ev.preventDefault();
	}

	// needed by mobile polyfill
	dragenter(ev: DragEvent) {
	  ev.preventDefault();
	}

	drop(ev: DragEvent) {
	  ev.preventDefault();

	  if (!this.propStoreOverride("enabled") || !this.notGrapes) return;

	  const target = this.$el.getElementsByClassName("dragSlot")[0];

	  if (!ev.dataTransfer) {
	    logWarning("null ev.dataTransfer", ev);
	    return;
	  }
	  const draggedWidgetID = ev.dataTransfer.getData("draggedWidgetID");
	  const dragPropDropId: widgetValPrimitive = this.GetPropDropID(
	    draggedWidgetID
	  );
	  const dragStorePropId: widgetValPrimitive = this.GetStoreDropID(
	    draggedWidgetID
	  );

    const maybeDragGroupId = readWidgetPropVal(this.$store)(
      //@ts-ignore
	    this.pageID,
	    draggedWidgetID,
	    "groupId"
	  );

    const dragGroupId = maybeDragGroupId.isJust() ? maybeDragGroupId.unsafelyUnwrap() : ""

	  const droppedEl = document.getElementById(draggedWidgetID);
	  const writeKey = ev.dataTransfer.getData("draggedWidgetSharedDataWriteKey");
    if(this.allowedGroupId === "" || this.allowedGroupId === dragGroupId) {

      //go ahead and append the new drag widget. It's important in order to free up the other dropWidget.
      if (dragStorePropId == "") {
        //the drag's dropID is at its original value. Don't fire an update if the original dropID equals our dropID
        if (dragPropDropId !== this.id) {
          const dragSlot = this.$el.getElementsByClassName("dragSlot")[0];
            this.UpdateChildDropID(draggedWidgetID, writeKey, droppedEl, this.id);
        }
      } else if (dragStorePropId !== this.id) {
        // the drag being dropped isn't already in here
        const dragSlot = this.$el.getElementsByClassName("dragSlot")[0];
          this.UpdateChildDropID(draggedWidgetID, writeKey, droppedEl, this.id);
      }
      if (target.children.length >= this.maxChildrenStore) {
        //we are at the max children allowed, swap out the last drag
        //first send the last drag back to its starting drop
        const lastChildEL = target.children[target.children.length - 1];
        const lastChildID = lastChildEL.id;
        if (lastChildID == draggedWidgetID) return; //fixes jest tests. In jest - children.length is already 1, while in real dom children.length is 0.
        const lastChildPropId: widgetValPrimitive = this.GetPropDropID(
          lastChildID
        );
        const lastChildWriteKey: string = Maybe.unwrapOr(
          "",
          readWidgetPropVal(this.$store)(this.pageID, draggedWidgetID, "dropId")
        ).toString();

        const pageID = this.pageID;
        const store = this.$store;
        const prevDropAvailable = function(): boolean {
          const dropChildren = Array.from(document.querySelectorAll(`#${lastChildPropId} fieldset`));

          const dropMaxChildrenMaybe: any =  readWidgetPropVal(store)(
            pageID,
            lastChildPropId,
            "maxChildren"
          );
          const dropMaxChildren = dropMaxChildrenMaybe.unsafelyUnwrap();

          return dropChildren.length >= dropMaxChildren
            ? false
            : true
        }

        switch (this.overflowStyleStore) {
        case "reset-child":
          if(prevDropAvailable()) {
            this.UpdateChildDropID(
              lastChildID,
              lastChildWriteKey,
              lastChildEL as HTMLElement,
              lastChildPropId
            );
          }
          break;
        case "swap":
            if (dragStorePropId === "") {
              //send the lastChild to the dropID of the incoming
              if (dragPropDropId != this.id) {
                this.UpdateChildDropID(
                  lastChildID,
                  lastChildWriteKey,
                  lastChildEL as HTMLElement,
                  dragPropDropId
                );
              }
            } else {
              // the drag being dropped isn't already in here
              this.UpdateChildDropID(
                lastChildID,
                lastChildWriteKey,
                  lastChildEL as HTMLElement,
                  dragStorePropId
              );
              this.UpdateChildDropID(draggedWidgetID, writeKey, droppedEl, this.id);
            }
            break;
        }
      }
    }
	}

	UpdateChildDropID(
	  childID: string,
	  writeKey: string | null,
	  droppedEl: HTMLElement | null,
	  dropID: string
	) {
	  if (dropID) {
	    this.updateWidgetID(childID, "dropId", dropID);
	    if (writeKey) {
	      this.updateSharedDataVal(writeKey, dropID);
	    }
	    if (droppedEl) {
	      const droppedVm: Vue = (droppedEl as any).__vue__;
	      if (droppedVm) droppedVm.$forceUpdate();
	    }
	  }
	}

	GetPropDropID(draggedWidgetID: string) {
	  //get the dropID currently in the store
	  const maybePropVal = readWidgetPropVal(this.$store)(
	    this.pageID,
	    draggedWidgetID,
	    "dropId"
	  );
	  return Maybe.unwrapOr("", maybePropVal).toString();
	}

	GetStoreDropID(draggedWidgetID: string) {
	  const maybeStoreVal = readWidgetEntryVal(this.$store)(
	    this.pageID,
	    draggedWidgetID,
	    "dropId"
	  );
	  return Maybe.unwrapOr("", maybeStoreVal).toString();
	}
}

function getDragIDs(dropID: string, pageID: string) {
  //get value from store, convert to string[], retain string value if string
  const maybeDragIds = readWidgetEntryVal(getStore())(pageID, dropID, "dragId");
  let dragIdArray: string[] | undefined = undefined;
  if (maybeDragIds.isJust()) {
    const maybeDragIds_val = Maybe.unsafelyUnwrap(maybeDragIds);
    if (typeof maybeDragIds_val === "string" && maybeDragIds_val != "") {
      dragIdArray = [];
      dragIdArray.push(maybeDragIds_val);
    } else dragIdArray = (maybeDragIds_val as string[]).slice(); //important to copy the array. Don't edit store values directly.
  }
  return dragIdArray;
}

export function removeDragWidget(
  dropID: string,
  dragID: string,
  pageID: string
) {
  const dragIdArray = getDragIDs(dropID, pageID);
  if (dragIdArray == undefined) return;
  if (dragIdArray.includes(dragID)) {
    //remove from the array
    const removeIndex = dragIdArray.indexOf(dragID);
    dragIdArray.splice(removeIndex, 1);
  } else return;
  dispatchUpdateWidget(getStore(), {
    pageID,
    widgetID: dropID,
    key: "dragId",
    //@ts-ignore dragIdArray won't be undefined.
    value: dragIdArray
  });
}

export function addDragWidget(dropID: string, dragID: string, pageID: string) {
  let dragIdArray = getDragIDs(dropID, pageID);
  if (dragIdArray == undefined) dragIdArray = [];
  if (!dragIdArray.includes(dragID)) {
    dragIdArray.push(dragID);
  } else return;
  dispatchUpdateWidget(getStore(), {
    pageID,
    widgetID: dropID,
    key: "dragId",
    value: dragIdArray
  });
}
</script>

<style>
.drop {
	display: inline-block;
}
.buttonDrop {
  transition-property: transform;
	transition-duration: 0.4s;
	background-color: var(--color-white);
	/* opacity: 0%; */
	border: 0.4vh solid var(--color-grey2);
	border-radius: 1.3vh;
	min-width: 4.5vh;
	min-height: 4.5vh;
	line-height: 3vh;
	padding: 0;
	margin: 0 auto;
	text-align: center;
	vertical-align: middle;
}
.buttonDrop .contentSlot {
	/* this is to vertical align slot contents */
	display: flex;
	justify-content: center;
	flex-direction: column;
	height: 100%;
	z-index: 0;
}
.buttonDrop .dragSlot {
	/* this is to vertical align slot contents */
	display: flex;
	justify-content: center;
	flex-direction: column;
	min-width: 4.5vh;
	min-height: 4.5vh;
	line-height: 3vh;
	/* top: -10.25vh; */
	position: relative;
	z-index: 1;
}
.buttonDrop:enabled:hover {
	background-color: var(--color-white);
	border: 3px solid var(--color-blue3);
	border-radius: 5px;
  transition-property: transform;
	transition-duration: 0.4s;
}
.dropFlexHorizontal .dragSlot {
	flex-direction: row;
}
.dropFlexVertical .dragSlot {
	flex-direction: column;
}
.drop.dropDiamond {
	background: url("../assets/svg/dropDiamond.svg") no-repeat center;
	border: 0vh solid var(--color-grey2);
	border-radius: 0;
  transition-property: transform;
	transition-duration: 0.4s;
	width: 8.5vh;
	height: 8.5vh;
	padding: 0;
	margin: 0 auto;
	text-align: center;
	vertical-align: middle;
}
.drop.drop_ButtonBasic-Grey_Dark {
	background-color: #ffffff80;
	color: #ffffff80;
	border: 0.25vh solid #ffffff80;
	border-radius: 1.3vh;
	min-width: 4.5vh;
	min-height: 4.5vh;
	padding: 0;
}
.drop.drop_ButtonBasic-Grey_Light {
	background-color: #ffffff40;
	color: #ffffff80;
	border: 0.25vh solid #ffffff80;
	border-radius: 1.3vh;
	min-width: 4.5vh;
	min-height: 4.5vh;
	padding: 0;
}
</style>
