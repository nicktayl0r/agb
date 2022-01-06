import { Component, Vue } from "vue-property-decorator";

import { logMessage } from "@/helpers/debugHelpers";
import { getPageID } from "../helpers/widgetHelpers";
import { doWidgetsHaveUnlockEffect } from "../tests/pageTests";

// // importing this way builds all components into a single build.js
// import ContainerEnableDisable from "./ContainerEnableDisable.vue";
// import ContainerShowHide from "./ContainerShowHide.vue";
// import WidgetAnchor from "./WidgetAnchor.vue";
// import WidgetAnimatedSvg from "./WidgetAnimatedSvg.vue";
// import WidgetArrow from "./WidgetArrow.vue";
// import WidgetButton from "./WidgetButton.vue";
// import WidgetCheckbox from "./WidgetCheckbox.vue";
// import WidgetDrag from "./WidgetDrag.vue";
// import WidgetDrop from "./WidgetDrop.vue";
// import WidgetImage from "./WidgetImage.vue";
// import WidgetLink from "./WidgetLink.vue";
// import WidgetPopper from "./WidgetPopper.vue";
// import WidgetPopperCollapsible from "./WidgetPopperCollapsible.vue";
// import WidgetRadio from "./WidgetRadio.vue";
// import WidgetSlider from "./WidgetSlider.vue";
// import WidgetTextarea from "./WidgetTextarea.vue";
// import WidgetTextbox from "./WidgetTextbox.vue";
// import WidgetSimView from "./WidgetSimView.vue";
// import WidgetSharedDataText from "./WidgetSharedDataText.vue";
// import WidgetStopwatch from "./WidgetStopwatch.vue";
// import WidgetTurntable from "./WidgetTurntable.vue";
// import WidgetVideoPlayer from "./WidgetVideoPlayer.vue";
// import WidgetTransparentVideo from "./WidgetTransparentVideo.vue";
// import StoreOverrideProp from "./StoreOverrideProp.vue";

// or these import factory functions will make webpack do code splitting,
// and vue will asynchronously load them on demand
const ContainerEnableDisable = () => import(
  /* webpackChunkName: "App" */
  "./ContainerEnableDisable.vue"
);
const ContainerShowHide = () => import(
  /* webpackChunkName: "App" */
  "./ContainerShowHide.vue"
);
const WidgetAnchor = () => import(
  /* webpackChunkName: "App" */
  "./WidgetAnchor.vue"
);
const WidgetAnimatedSvg = () => import(
  /* webpackChunkName: "App" */
  "./WidgetAnimatedSvg.vue"
);
const WidgetArrow = () => import(
  /* webpackChunkName: "App" */
  "./WidgetArrow.vue"
);
const WidgetButton = () => import(
  /* webpackChunkName: "App" */
  "./WidgetButton.vue"
);
const WidgetCheckbox = () => import(
  /* webpackChunkName: "App" */
  "./WidgetCheckbox.vue"
);
const WidgetDrag = () => import(
  /* webpackChunkName: "App" */
  "./WidgetDrag.vue"
);
const WidgetDrop = () => import(
  /* webpackChunkName: "App" */
  "./WidgetDrop.vue"
);
const WidgetImage = () => import(
  /* webpackChunkName: "App" */
  "./WidgetImage.vue"
);
const WidgetLink = () => import(
  /* webpackChunkName: "App" */
  "./WidgetLink.vue"
);
const WidgetPopper = () => import(
  /* webpackChunkName: "App" */
  "./WidgetPopper.vue"
);
const WidgetPopperCollapsible = () => import(
  /* webpackChunkName: "App" */
  "./WidgetPopperCollapsible.vue"
);
const WidgetRadio = () => import(
  /* webpackChunkName: "App" */
  "./WidgetRadio.vue"
);
const WidgetSlider = () => import(
  /* webpackChunkName: "App" */
  "./WidgetSlider.vue"
);
const WidgetTextarea = () => import(
  /* webpackChunkName: "App" */
  "./WidgetTextarea.vue"
);
const WidgetTextbox = () => import(
  /* webpackChunkName: "App" */
  "./WidgetTextbox.vue"
);
const WidgetSimView = () => import(
  /* webpackChunkName: "App" */
  "./WidgetSimView.vue"
);
const WidgetSharedDataText = () => import(
  /* webpackChunkName: "App" */
  "./WidgetSharedDataText.vue"
);
const WidgetStopwatch = () => import(
  /* webpackChunkName: "App" */
  "./WidgetStopwatch.vue"
);
const WidgetSvgGroup = () => import(
  /* webpackChunkName: "App" */
  "./WidgetSvgGroup.vue"
);
const WidgetSvg = () => import(
  /* webpackChunkName: "App" */
  "./WidgetSvg.vue"
);
const WidgetTurntable = () => import(
  /* webpackChunkName: "App" */
  "./WidgetTurntable.vue"
);
const WidgetVideoPlayer = () => import(
  /* webpackChunkName: "App" */
  "./WidgetVideoPlayer.vue"
);
const WidgetTransparentVideo = () => import(
  /* webpackChunkName: "App" */
  "./WidgetTransparentVideo.vue"
);
const StoreOverrideProp = () => import(
  /* webpackChunkName: "App" */
  "./StoreOverrideProp.vue"
);

const LoadingBar = () => import(
  /* webpackChunkName: "LoadingBar" */
  "./LoadingBar.vue"
);

const WidgetCodonWheel = () => import(
  /* webpackChunkName: "WidgetCodonWheel" */
  "./WidgetCodonWheel.vue"
);

@Component({
  components: {
    ContainerEnableDisable,
    ContainerShowHide,
    WidgetAnchor,
    WidgetAnimatedSvg,
    WidgetArrow,
    WidgetButton,
    WidgetCheckbox,
    WidgetDrag,
    WidgetDrop,
    WidgetImage,
    WidgetSvg,
    WidgetLink,
    WidgetPopper,
    WidgetPopperCollapsible,
    WidgetRadio,
    WidgetSlider,
    WidgetStopwatch,
    WidgetSvgGroup,
    WidgetTextbox,
    WidgetTextarea,
    WidgetSimView,
    WidgetSharedDataText,
    WidgetVideoPlayer,
    WidgetTransparentVideo,
    WidgetTurntable,
    StoreOverrideProp,
    LoadingBar,
    WidgetCodonWheel
  }
})
export default class Page extends Vue {
  mounted() {
    (<any>window).page = this;
  }

  testIsValidPage(): boolean {
    logMessage("testing page", getPageID(this));
    return doWidgetsHaveUnlockEffect(this.$children);
  }
}

