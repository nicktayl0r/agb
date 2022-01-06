import Vue from "vue";

import AppLoader from "@/AppLoader.vue";
import router from "@/router";

import { notGrapes } from "@/helpers/widgetHelpers";
import { getStore } from "@/helpers/storeHelpers";

// for grapes, no router or store
let vueApp: Vue = new Vue({
  components: {
    AppLoader
  },
  render: createElement => {
    return createElement(AppLoader);
  }
});

if (notGrapes()) {
  vueApp = new Vue({
    components: {
      AppLoader
    },
    render: createElement => {
      return createElement(AppLoader);
    },
    router,
    store: getStore()
  });
}

if (document.getElementById("app")) {
  vueApp.$mount("#app");
}

export { vueApp };
export { default as Page } from "@/components/Page";
