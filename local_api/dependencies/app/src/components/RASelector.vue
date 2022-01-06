<template>
  <div :projectIsReady="projectLoaded">
    <div v-if="RAs.length > 1 && pageID">
      <div>This page is in multiple resource activities, please select one.</div>
      <br>
      <div v-for="RA in RAs" :key="RA.trackGroupID">
        <router-link :to="'/' + RA.trackGroupID + '/pages/' + pageID">{{RA.name}}</router-link>
      </div>
    </div>
    <div v-if="RAs.length == 0 && pageID">
      <div>This page is not in a resource activity (AKA track group). You can test it, but things like track conditions and prev/next buttons wont work.</div>
      <br>
      <router-link :to="'/test/pages/' + pageID">yeah yeah, I want to see it anyway.</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop } from "vue-property-decorator";
import Vue, { VueConstructor } from "vue";
import { TrackGroup, emptyTrack } from "../data models/projectModels";
import { readProjectDataExists } from "../store/modules/appData";
import { getPageTrackGroups } from "../helpers/projectHelpers";
import { glossaryShowHide, handleRootPath } from "@/helpers/widgetHelpers";
import {
  commitSetCurrentTrackGroup,
  commitSetModuleCurrentPage
} from "@/store/modules/userData";
import { isDebug, logMessage } from "../helpers/debugHelpers";

@Component
export default class RASelector extends Vue {
  @Prop({ default: false })
  projectIsReady: boolean;

  projectNowReady = false;

  pageID = "";

  RAs: TrackGroup[] = [];

  get projectLoaded() {
    // logMessage("projectLoaded computed property detects change");
    const storeProjectExists = readProjectDataExists(this.$store);
    if (!this.projectNowReady && storeProjectExists && isDebug()) {
      this.projectNowReady = true;

      if (this.$route.params.glossaryPageID) {
        // set glossary pageID and open,
        commitSetModuleCurrentPage(this.$store, {
          moduleName: "glossary",
          pageID: this.$route.params.glossaryPageID
        });
        glossaryShowHide(true);
        this.$router.push("/");
      } else if (this.$route.params.resourceActivityID) {
        commitSetCurrentTrackGroup(
          this.$store,
          this.$route.params.resourceActivityID
        );
        this.$router.push("/");
      }

      handleRootPath(this);

      if (this.$route.params.pageID) {
        this.pageID = this.$route.params.pageID;

        const pageGroups = getPageTrackGroups(this.pageID);

        if (pageGroups && pageGroups.length > 0) this.RAs = pageGroups;
        else this.$router.push(`/test/pages/${this.pageID}`);

        if (this.RAs.length == 1) {
          this.$router.push(
            `/${this.RAs[0].trackGroupID}/pages/${this.pageID}`
          );
        }
      }
    }
    return storeProjectExists;
  }
}
</script>