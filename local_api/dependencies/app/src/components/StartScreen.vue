<template>
  <div id="startScreen" class="startScreenBG" :projectIsReady="projectLoaded">
    <div id="startScreenContainer" class="textBackgroundBasic dropShadow">
      Welcome to the
      <br><br>
      <h3>{{projectName}}</h3>
      <br>
      <span id="projectType">{{projectType}}</span>
      <br><br><br>
      <widget-button id="startButton" class="buttonBasic-Grey buttonBlinkBlue" @click.native="$emit('start-clicked', true)">Click when ready</widget-button>
    </div>
    <link v-if="isSafari() && preloadCurrentPageURL" rel="preload" :href="preloadCurrentPageURL" as="fetch" crossorigin />
    <link v-else-if="!isFirefox() && preloadCurrentPageURL" rel="prefetch" :href="preloadCurrentPageURL" as="fetch" crossorigin />
    <link v-if="isSafari() && preloadGlossaryPageURL" rel="preload" :href="preloadGlossaryPageURL" as="fetch" crossorigin />
    <link v-else-if="!isFirefox() && preloadGlossaryPageURL" rel="prefetch" :href="preloadGlossaryPageURL" as="fetch" crossorigin />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Maybe } from "true-myth";
import WidgetButton from "@/components/WidgetButton.vue";
import { TrackGroup } from "@/data models/projectModels";
import { isFirefox, isSafari } from "@/helpers/browserHelpers";
import { logMessage } from "@/helpers/debugHelpers";
import { getEnvPageURL } from "@/helpers/envHelpers";
import { getTrackGroupByID } from "@/helpers/projectHelpers";
import {
  getCurrentPageID,
  getCurrentGlossaryPage
} from "@/helpers/userHelpers";
import {
  readProjectDataExists,
  readProjectName
} from "@/store/modules/appData";
import { readModulesState } from "@/store/modules/userData";

@Component({
  components: {
    WidgetButton
  }
})
export default class StartScreen extends Vue {
  projectNowReady = false;

  projectName = "";

  get projectLoaded() {
    logMessage("StartScreen - projectLoaded computed property detects change");
    const storeProject = readProjectDataExists(this.$store);
    if (!this.projectNowReady && storeProject) {
      this.projectNowReady = true;
      this.projectName = readProjectName(this.$store);
    }
    return storeProject;
  }

  get projectType() {
    const userModuleState = readModulesState(this.$store);
    let maybeTrackGroup = Maybe.nothing<TrackGroup>();
    if (
      userModuleState.currentTrackGroupID
      && userModuleState.currentTrackGroupID.trim() != ""
    ) {
      maybeTrackGroup = getTrackGroupByID(userModuleState.currentTrackGroupID);
    } else if (this.$route.params.resourceActivityID) {
      maybeTrackGroup = getTrackGroupByID(
        this.$route.params.resourceActivityID
      );
    }
    if (maybeTrackGroup.isJust()) {
      const trackGroup = maybeTrackGroup.unsafelyUnwrap();
      if (trackGroup.caseID.trim() == "") {
        return "Handbook.";
      }
    }
    return "STEM Case.";
  }

  get preloadCurrentPageURL(): string {
    const maybeCurrentPage = getCurrentPageID();
    let currentPage = "";
    if (maybeCurrentPage.isJust()) currentPage = maybeCurrentPage.unsafelyUnwrap();
    if (currentPage == "" && this.$route.params.pageID) currentPage = this.$route.params.pageID;
    if (currentPage != "") {
      logMessage("preload current page", currentPage);
      return getEnvPageURL(currentPage);
    }
    return "";
  }

  get preloadGlossaryPageURL(): string {
    const glossaryPage = getCurrentGlossaryPage();
    let glossaryPageId = "";
    if (glossaryPage) glossaryPageId = glossaryPage.pageID;
    if (glossaryPageId == "" && this.$route.params.glossaryPage) glossaryPageId = this.$route.params.glossaryPage;
    if (glossaryPageId != "") {
      logMessage("preload glossary page", glossaryPageId);
      return getEnvPageURL(glossaryPageId);
    }
    return "";
  }

  // firefox doesn't preload, and prefetch seems to be fetching twice so let's not (see also PageAsyncLoader.vue)
  isFirefox() {
    return isFirefox();
  }

  isSafari() {
    return isSafari();
  }
}
</script>

<style>
#startScreen {
  height: 96vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.startScreenBG {
  background-size: cover;
}
#startScreenContainer {
  padding: 5vh !important;
}
</style>