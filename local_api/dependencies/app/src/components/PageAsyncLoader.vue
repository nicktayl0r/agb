<template>
	<div>
		<component :is="page" :projectIsReady="projectLoaded" class="page" />
		<div id="debugLabel" ref="debugLabel"></div>
		<link v-if="isSafari() && nextPageURL" rel="preload" :href="nextPageURL" as="fetch" crossorigin />
		<link v-else-if="!isFirefox() && nextPageURL" rel="prefetch" :href="nextPageURL" as="fetch" crossorigin />
	</div>
</template>

<style>
#debugLabel {
	position: absolute;
	z-index: 1000;
	font-size: 10px;
	font-weight: bold;
	color: red;
	background-color: white;
}
</style>

<script lang="ts">
import { AxiosResponse } from "axios";
import { AxiosRetryInstance } from "@/helpers/requestHelpers";
import { Component, Watch, Prop } from "vue-property-decorator";

interface Route {
	path: string;
	name?: string | null;
	hash: string;
	query: any;
	params: any;
	fullPath: string;
	matched: any;
	redirectedFrom?: string;
	meta?: any;
}

import { readAttemptId, readSessionId } from "@/store/modules/authData";

import Page from "./Page";
import {
	canAccessTopWindow,
	isFirefox,
	isSafari,
} from "@/helpers/browserHelpers";
import { isDebug, logMessage, logWarningSecurely, showDebugLabel } from "@/helpers/debugHelpers";
import { getEnv, getEnvPageURL } from "@/helpers/envHelpers";
import {
	getPageExistsInTrackGroup,
	getPageModel,
	tryCatch,
} from "@/helpers/projectHelpers";
import {
	getNextPageID,
	unlockAndSetFirstPages,
	setCurrentPage,
} from "@/helpers/userHelpers";
import {
	readProjectDataExists,
	readProjectName,
} from "@/store/modules/appData";
import {
	commitSetCurrentTrackGroup,
	readModulesState,
} from "@/store/modules/userData";

@Component
export default class PageAsyncLoader extends Page {
	loadingPage = Page.extend({ template: "<loading-bar />" });

	page = this.loadingPage;

	@Prop({ default: false })
	projectIsReady: boolean;

	projectNowReady = false;

	nextPageURL = "";

	get projectLoaded() {
		logMessage("pageAsync - projectLoaded computed property detects change");
		const storeProject = readProjectDataExists(this.$store);
		if (!this.projectNowReady && storeProject) {
			this.projectNowReady = true;
			this.loadPageIfValid();
		}
		return storeProject;
	}

	@Watch("$route")
	onRouteChanged(newRoute: Route, oldRoute: Route) {
		logMessage(`PageAsyncLoader.onRouteChanged: ${newRoute.path}`);
		if (newRoute.params.pageID && this.projectNowReady) {
			this.loadPageIfValid();
		} else {
			console.warn(
				"route change: project data isn't ready, waiting to load page."
			);
		}
	}

	loadPageIfValid() {
		const modulesState = readModulesState(this.$store);
		const { pageID } = this.$route.params;
		const resourceActivity = this.$route.params.resourceActivityID;

		if (
			getPageExistsInTrackGroup(resourceActivity, pageID) ||
			resourceActivity == "test"
		) {
			logMessage("PageAsyncLoader - project data is now ready, loading page.");

			if (modulesState.currentTrackGroupID !== resourceActivity) {
			  if (!isDebug()) logWarningSecurely("currentTrackGroupID is not equal to route resourceActivityID", `currentTrackGroupID: ${modulesState.currentTrackGroupID}`, `$route resourceActivityID: ${resourceActivity}`);
			  commitSetCurrentTrackGroup(this.$store, resourceActivity);
			}
			unlockAndSetFirstPages();

			this.getPageAsync(pageID);
		} else if (isDebug()) {
			//only try other routes during testing.
			logMessage(
				"I don't know what to do with this. RA:",
				resourceActivity,
				"pageID",
				pageID
			);
			// maybe this page is in another track?
			this.$router.push(`/pages/${pageID}`);
		} else
			logMessage("Page is not in a track group and connectToServer is true.");
	}

	getPageAsync(pageID: string) {
		logMessage("attempting to async load page", pageID);
		this.page = this.loadingPage;
		AxiosRetryInstance.get(getEnvPageURL(pageID), {
			responseType: "text",
		})
			.then((response) => tryCatch(() => this.setPage(pageID, response)))
			.catch((error) =>
				tryCatch(
					() =>
						(this.page = Page.extend({
							template: `<div>Couldn't load page ${pageID} because ${error}</div>`,
						}))
				)
			);
	}

	setPage(pageID: string, response: AxiosResponse) {
		setCurrentPage(pageID);
		const wrappedTemplate = `<div>${response.data}</div>`; // Vue wants templates to have a single parent element
		this.page = Page.extend({ template: wrappedTemplate });

		if (getEnv() !== "production") {
			const pageModel = getPageModel(pageID);
			const pageName = pageModel ? pageModel.name : "";
			const pageLabel = `${pageName} (${pageID})`;
			const docTitle = `${pageLabel} - ${readProjectName(this.$store)}`;
			document.title = docTitle;
			if (canAccessTopWindow()) window.top.document.title = docTitle;
			if (showDebugLabel()) {
				const debugLabelEl = this.$refs.debugLabel as HTMLElement;

				const attemptId = readAttemptId(this.$store);
				let sessionID: any = readSessionId(this.$store);
				if (sessionID == null || sessionID == "") sessionID = "null";

				debugLabelEl.innerHTML = `${pageLabel}<br> Attempt#: ${attemptId} <br> Sess#: ${sessionID}`;
			}
		}
	}

	// prefetching the next page on updated seems to at least let the currrent page
	// load any widget bundles before requesting the next page html
	updated() {
		const maybeNextPageID = getNextPageID();
		if (maybeNextPageID.isJust())
			this.nextPageURL = getEnvPageURL(maybeNextPageID.unsafelyUnwrap());
	}

	// firefox doesn't preload, and prefetch seems to be fetching twice so let's not (see also StartScreen.vue)
	isFirefox() {
		return isFirefox();
	}

	isSafari() {
		return isSafari();
	}
}
</script>

<style scoped>
.page {
	/* the following is to fix a bug that causes scrolling to the top in Safari */
	position: absolute;
	height: 100%;
	width: 100%;
}
</style>

