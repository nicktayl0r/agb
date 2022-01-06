import Vue from "vue";
import VueRouter, { Route } from "vue-router";

//import { logInfo } from '@/helpers/debugHelpers';

const PageAsyncLoader = () => import(
  /* webpackChunkName: "App" */
  "@/components/PageAsyncLoader.vue"
);

const RASelector = () => import(
  /* webpackChunkName: "App" */
  "@/components/RASelector.vue"
);

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "*", redirect: "/" }, // fallback for invalid routes
    { path: "/", component: RASelector },
    { path: "/pages/:pageID", component: RASelector },
    { path: "/:resourceActivityID/", component: RASelector },
    { path: "/glossary/:glossaryPageID", component: RASelector },
    { path: "/:resourceActivityID/pages/:pageID", component: PageAsyncLoader }
  ]
});

export function beforeEach(to: Route, from: Route, next: any) {

  if (to.path === '/' && from.path !== '/') {
    console.log(`block routing from ${from.path} to ${to.path}`);
    next(false);
  }
  else {
    console.log("routing from", from.path, "to", to.path);
    next();
  }
}

router.beforeEach(beforeEach);

export default router;
