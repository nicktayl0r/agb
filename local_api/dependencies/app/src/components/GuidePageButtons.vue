<template>
  <div v-show="guideOpen" :data-currentPage="guideCurrentPage">
    <widget-button id="guidePreviousPage" ref="guidePreviousPage" class="buttonBack" v-show="showPrevButton" :clickEffects="{conditionList:[ { effectsPass:[{effectData:{effectType: 'previousPage'}}] } ]}" />
    <widget-button id="guideNextPage" ref="guideNextPage" class="buttonForward" v-show="showNextButton" :class="{ buttonBgImgBlinkBlue: blinkNextPage() }" :clickEffects="{conditionList:[ { effectsPass:[{effectData:{effectType: 'nextPage'}}] } ]}" />
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop } from "vue-property-decorator";
import Vue, { VueConstructor } from "vue";
import { Maybe } from "true-myth";

import { readModulesState } from "../store/modules/userData";
import {
  getModuleFirstPageID,
  getModuleLastPageID
} from "../helpers/projectHelpers";
import Widget from "./Widget";
import WidgetButton from "./WidgetButton.vue";
import { logMessage } from "@/helpers/debugHelpers";
import {
  getNextPageID,
  isPageUnlocked,
  getNextPageUserState
} from "../helpers/userHelpers";
import { useTeacherView } from "@/helpers/widgetHelpers";

@Component({
  components: {
    WidgetButton
  }
})
export default class GuidePageButtons extends Vue {
  teacherView = false;

  guideCurrentPage = "";

  // for most widgets on pages we set their pageID on created
  // and we don't want them to navigate if the current page isn't their page
  // (if an effect is delayed, and the user navigates somewhere else)
  // since these buttons are special and exists outside of a page,
  // let's update their pageID whenever the current guide page changes in the store
  getGuideCurrentPage() {
    logMessage("GuidePageButtons.getGuideCurrentPage()");
    const modulesState = readModulesState(this.$store);
    const prevPageButton = this.$refs.guidePreviousPage as Widget;
    const nextPageButton = this.$refs.guideNextPage as Widget;

    this.guideCurrentPage = modulesState.guideState.currentPageID;
    if (prevPageButton) prevPageButton.pageID = this.guideCurrentPage;
    else {
      logMessage(
        "GuidePageButtons.prevPageButton not available cannot set guideCurrentPage"
      );
    }
    if (nextPageButton) nextPageButton.pageID = this.guideCurrentPage;
    else {
      logMessage(
        "GuidePageButtons.nextPageButton not available cannot set guideCurrentPage"
      );
    }
  }

  created() {
    this.teacherView = useTeacherView();
  }

  mounted() {
    this.getGuideCurrentPage();
  }

  get guideOpen() {
    this.getGuideCurrentPage();
    const modulesState = readModulesState(this.$store);
    return modulesState.moduleOpen === "guide";
  }

  get showPrevButton() {
    this.getGuideCurrentPage();
    const maybePageID = getModuleFirstPageID("guide");
    if (maybePageID.isJust()) {
      const pageID = Maybe.unsafelyUnwrap(maybePageID);
      logMessage(pageID);

      const modulesState = readModulesState(this.$store);
      return modulesState.guideState.currentPageID !== pageID;
    }
    return true;
  }

  get showNextButton() {
    this.getGuideCurrentPage();
    const maybeLastPageID = getModuleLastPageID("guide");
    if (maybeLastPageID.isJust()) {
      const lastPageID = Maybe.unsafelyUnwrap(maybeLastPageID);
      const modulesState = readModulesState(this.$store);
      if (modulesState.guideState.currentPageID === lastPageID) return false;
    }

    if (this.teacherView) return true;

    const maybeNextPageID = getNextPageID();
    if (maybeNextPageID.isJust()) {
      const nextPageID = Maybe.unsafelyUnwrap(maybeNextPageID);
      return isPageUnlocked(nextPageID);
    }

    return true;
  }

  blinkNextPage(): boolean {
    const maybeNextPageID = getNextPageID();
    if (maybeNextPageID.isJust()) {
      const nextPageID = Maybe.unsafelyUnwrap(maybeNextPageID);
      const unlocked = isPageUnlocked(nextPageID);

      let visitedPageBefore = false;
      const maybePageUserState = getNextPageUserState();
      if (maybePageUserState.isJust()) {
        const pageState = Maybe.unsafelyUnwrap(maybePageUserState);
        if (pageState.visited != undefined) visitedPageBefore = pageState.visited;
      }
      const blink = !visitedPageBefore && unlocked;
      return blink;
    }
    return false;
  }
}
</script>

<style>
#guidePreviousPage {
  position: absolute;
  bottom: 1.137vh;
  left: 1.725vh;
  pointer-events: all;
}
#guidePreviousPage .bgImage,
#guideNextPage .bgImage {
  width: 6vh;
  height: 6vh;
}

#guideNextPage {
  position: absolute;
  bottom: 1.137vh;
  right: 1.725vh;
  pointer-events: all;
}
</style>