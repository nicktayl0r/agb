<template>
  <div>
    <loading-bar v-if="!loaded" class="appLoadingBar" ref="appLoadingBar" />
    <app @app-loaded="appLoaded" />
  </div>
</template>

<script lang="ts">
import "reflect-metadata"; // This needs to be imported before vue-property-decorator. We need it to send type metadata to grapes.
import { Component, Vue } from "vue-property-decorator";
import { App, LoadingBar } from "@/helpers/asyncHelpers";

@Component({
  components: {
    App,
    LoadingBar
  }
})
export default class AppLoader extends Vue {
  loaded = false;

  appLoaded() {
    this.loaded = true;
  }

  animatedLoading = false;

  updated() {
    if (!this.animatedLoading) {
      this.animatedLoading = true;
      // const loadingBar: any = this.$refs.appLoadingBar;
      // this is a complete lie, but at least it will look like something is happening
      // if (loadingBar) loadingBar.progressBar.animate(0.99, { duration: 15000 });
    }
  }
}
</script>

<style>
.appLoadingBar.loadingBarParent {
  height: 97vh;
}
</style>