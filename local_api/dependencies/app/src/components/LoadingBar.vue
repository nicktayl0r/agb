<template>
  <div class="loadingBarParent">
    <div class="loadingBar">
      <div class="loadingBarSpinner"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";
const ProgressBar = require("progressbar.js");

@Component
export default class LoadingBar extends Vue {
  progressBar: any;

  mounted() {
    const barElement = this.$el.querySelectorAll(".loadingBar")[0];
    this.progressBar = new ProgressBar.Line(barElement, {
      strokeWidth: 5,
      color: "#337BB4",
      from: { color: "#337BB4", width: 2 },
      to: { color: "#F28446", width: 5 },
      trailWidth: 0.8,
      step(state: any, line: any) {
        line.path.setAttribute("stroke", state.color);
        line.path.setAttribute("stroke-width", state.width);
        if (line.text) line.text.style.color = state.color;
        const value = Math.round(line.value() * 100);
        if (value === 0) {
          line.setText("Loading");
        } else {
          line.setText(`${value}%`);
        }
      },
      text: {
        className: "loadingBarText",
        value: "Loading",
        style: {
          padding: "10px"
        }
      },
      duration: 10
    });
  }

  beforeDestroy() {
    this.progressBar.destroy();
  }
}
</script>


<style>
.loadingBarParent {
  height: 100%;
  width: 100%;
  position: inherit;
  display: flex;
  background-image: url("../assets/svg/circleBg.svg");
}
.loadingBar {
  max-width: 50%;
  align-self: center;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.loadingBarText {
  text-align: center;
}
.loadingBarSpinner {
  align-self: center;
  margin: 0 auto;
  width: 18.15vh;
  height: 18.15vh;
  background-image: url("../assets/svg/dnaSpinner.svg");
  background-repeat: no-repeat;
  background-size: contain;
}
</style>