<template>
  <component
    :is="page"
    :projectIsReady="projectLoaded"
    :pageID="glossaryPageID"
    class="glossaryPage"
  />
</template>

<script lang="ts">
import { AxiosResponse } from "axios";
import { AxiosRetryInstance } from "@/helpers/requestHelpers";
import { Component, Prop } from "vue-property-decorator";


import Page from "./Page";
import { logMessage } from "@/helpers/debugHelpers";
import { tryCatch } from "@/helpers/projectHelpers";

import { getEnvPageURL } from "@/helpers/envHelpers";
import { readProjectDataExists } from "@/store/modules/appData";
import { readModulesState } from "@/store/modules/userData";

@Component
export default class GlossaryPageAsync extends Page {
  page = Page.extend({ template: "<div>loading...</div>" });

  @Prop({ default: false })
  projectIsReady: boolean;

  @Prop()
  pageID: string;

  projectNowReady = false;

  get projectLoaded() {
    logMessage("glossary projectLoaded computed property detects change");
    const storeProject = readProjectDataExists(this.$store);
    if (!this.projectNowReady && storeProject) {
      this.projectNowReady = true;
      const pageID = this.glossaryPageID; // this will call loadPageIfValid
    }
    return storeProject;
  }

  get glossaryPageID(): string {
    const modulesState = readModulesState(this.$store);
    const pageID = modulesState.currentGlossaryPageID;
    this.loadPageIfValid(pageID);
    return pageID;
  }

  loadPageIfValid(pageID: string) {
    if (pageID) {
      this.getPageAsync(pageID);
    }
  }

  getPageAsync(pageID: string) {
    logMessage("attempting to async load glossary page", pageID);
    AxiosRetryInstance.get(getEnvPageURL(pageID), {
      responseType: "text"
    })
      .then(response => tryCatch(() => this.setPage(pageID, response)))
      .catch(error => tryCatch(() => {
        this.page = Page.extend({
          template: `<div>Couldn't load page ${pageID} because ${error}</div>`
        });
      }));
  }

  setPage(pageID: string, response: AxiosResponse) {
    const wrappedTemplate = `<div>${response.data}</div>`; // Vue wants templates to have a single parent element
    this.page = Page.extend({ template: wrappedTemplate });
  }
}
</script>

<style scoped>
.glossaryPage {
  height: 100%;
}
</style>
