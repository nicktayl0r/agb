<template>
	<div id="glossaryParent" v-show="show">
		<div id="glossaryBG" @click="toggleShow"></div>
		<div id="glossaryBody">
			<div id="glossaryTitleBar">
				<b>Glossary</b>
				<widget-button id="glossaryCloseButton" class="buttonX white" @click.native="toggleShow" />
			</div>
			<div id="glossaryContent">
				<div id="glossaryDefinitionTitle">
					<b v-html="currentTermName"></b>
				</div>
				<div id="glossaryDefinition">
					<glossary-page-async />
				</div>
				<div id="glossaryRelatedTerms">
					<span v-if="RelatedTerms.length > 0">Related terms: </span>
					<span v-for="(relatedTerm, index) in RelatedTerms" :key="relatedTerm.pageID">
						<router-link :id="relatedTerm.pageID" :class="{'internalLink':true, glossarySelectedTerm: relatedTerm.pageID === currentTermID}" @click.native="clickedRelatedTerm(relatedTerm.pageID)" to="" :title='relatedTerm.name'>
							<slot /><span v-html="relatedTerm.name"></span>
						</router-link>
						<span v-if="index + 1 < RelatedTerms.length">, </span>

					</span>
				</div>
				<div id="glossarySidebarSearch">
					<input id="searchInput" ref="searchInput" type="text" placeholder="Search" v-model.trim="searchQuery">
					<widget-button id="glossarySearchClearButton" class="buttonX glossarySearchClear" @click.native="clearSearch" />
				</div>
				<div id="glossarySidebar">
					<div id="termsScroll" ref="termsScroll">
						<div v-for="term in Terms" :key="term.pageID" class="glossaryTermLink">
							<router-link :id="term.pageID" :class="{'internalLink':true, glossarySelectedTerm: term.pageID === currentTermID}" @click.native="clickedRelatedTerm(term.pageID)" to="" :title='term.name'>
								<slot /><span v-html="term.name"></span>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";
import { Maybe } from "true-myth";

import GlossaryPageAsync from "@/components/GlossaryPageAsync.vue";
import WidgetButton from "@/components/WidgetButton.vue";
import WidgetLink from "@/components/WidgetLink.vue";
import {
	GlossaryModule,
	GlossaryTrack,
	GlossaryPage,
	GlossaryRelatedTerm,
} from "@/data models/projectModels";
import {
	getCurrentGlossaryTrack,
	getCurrentGlossaryPage,
} from "@/helpers/userHelpers";
import { readGlossary } from "@/store/modules/appData";
import {
	readModulesState,
	commitGlossaryOpenState,
} from "@/store/modules/userData";
import { commitSetModuleCurrentPage } from "@/store/modules/userData";

@Component({
	components: {
		GlossaryPageAsync,
		WidgetButton,
		WidgetLink,
	},
})
export default class Glossary extends Vue {
	searchQuery = "";

	show = false;

	toggleShow(): void {
		this.show = !this.show;
		commitGlossaryOpenState(this.$store, this.show);
	}

	showHide(val: boolean): void {
		this.show = val;
		commitGlossaryOpenState(this.$store, this.show);

		if (this.show) {
			this.$nextTick(() => {
				const termEl = document.getElementById(this.currentTermID);
				if (termEl) {
					// center the term in the parent scroll container
					const termPos = termEl.offsetTop;
					const termHalfHeight = termEl.getBoundingClientRect().height * 0.5;
					const scrollParent = this.$refs.termsScroll as Element;
					const parentHalfHeight = scrollParent.clientHeight * 0.5;
					const scrollPos = termPos + termHalfHeight - parentHalfHeight;
					scrollParent.scrollTop = scrollPos;
				}
			});
		}
	}

	hideIfOpen(): void {
		if (this.show) this.showHide(false);
	}

	clearSearch() {
		this.searchQuery = "";
	}

	get Terms(): GlossaryPage[] {
		const currentTrack = getCurrentGlossaryTrack();
		if (currentTrack && currentTrack.pages) {
			if (
				this.searchQuery &&
				this.searchQuery != "" &&
				this.searchQuery != " "
			) {
				try {
					const includesQueryRegEx = new RegExp(this.searchQuery, "i"); // case insensitive
					return currentTrack.pages.filter((page) =>
						includesQueryRegEx.test(page.name)
					);
				} catch (ex) {
					return [];
				}
			}
			return currentTrack.pages;
		}
		return [];
	}

	get RelatedTerms(): GlossaryRelatedTerm[] {
		const currentGlossaryPage = getCurrentGlossaryPage();
		if (currentGlossaryPage && currentGlossaryPage.relatedTerms)
			return currentGlossaryPage.relatedTerms;
		return [];
	}

	get currentTermID(): string {
		const currentGlossaryPage = getCurrentGlossaryPage();
		if (currentGlossaryPage && currentGlossaryPage.pageID)
			return currentGlossaryPage.pageID;
		return "";
	}

	get currentTermName(): string {
		const currentGlossaryPage = getCurrentGlossaryPage();
		if (currentGlossaryPage && currentGlossaryPage.name)
			return currentGlossaryPage.name;
		return "";
	}

	clickedRelatedTerm(termID: string) {
		if (!this.$store) return;

		commitSetModuleCurrentPage(this.$store, {
			moduleName: "glossary",
			pageID: termID,
		});
	}
}
</script>

<style>
#glossaryParent {
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
}
#glossaryBG {
	position: absolute;
	background-color: rgba(0, 0, 0, 0.75);
	z-index: 200;
	width: 100%;
	height: 100%;
}
#glossaryBody {
	background-color: #5c4866;
	color: white;
	width: 90%;
	height: 90%;
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 5%;
	left: 5%;
	z-index: 220;
	border-radius: 0.626rem;
}
#glossaryTitleBar {
	padding: 1.137vh;
}
#glossaryContent {
	background-color: #74617a;
	margin: 0 1.137vh 1.137vh 1.137vh;
	padding: 2.25vh;
	display: grid;
	grid-template-columns: auto 22.75vh;
	grid-template-rows: min-content 1fr min-content;
	flex-grow: 1;
	max-height: 100%;
	min-height: 0;
	height: 100%;
	border-radius: 0.626rem;
}
#glossaryDefinitionTitle {
	grid-column: 1 / span 1;
	grid-row: 1 / span 1;
}
#glossaryDefinition {
	grid-column: 1 / span 1;
	grid-row: 2 / span 1;
	max-height: 100%;
	overflow-y: auto;
	padding-right: 2.25vh;
}
#glossaryRelatedTerms {
	grid-column: 1 / span 1;
	grid-row: 3 / span 1;
	align-self: center;
	padding-top: 2.25vh;
}
#glossarySidebarSearch {
	grid-column: 2 / span 1;
	grid-row: 1 / span 1;
	padding-left: 2.25vh;
	padding-bottom: 0.2rem;
	border-left: 1px solid #5c4866;
	position: relative;
}
#glossarySidebar {
	grid-column: 2 / span 1;
	grid-row: 2 / span 2;
	border-left: 1px solid #5c4866;
	padding-left: 2.25vh;
	min-height: 0;
	overflow: hidden;
}
#termsScroll {
	position: relative;
	max-height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
}
#glossaryCloseButton {
	position: absolute;
	right: 0;
	top: 0;
}
#searchInput {
  padding-right: 3.3vh;
}
.glossarySelectedTerm {
	color: #5c4866 !important;
	background-color: white;
	border-radius: 0.15em;
	padding: 0.25em;
	box-decoration-break: clone;
	-webkit-box-decoration-break: clone;
}
.glossarySelectedTerm span {
	position: relative;
}
.glossaryTermLink {
	margin: 0.75em 0 0.75em 0;
}
.glossarySearchClear {
	position: absolute;
	top: 0.57vh;
	right: 0.57vh;
}
.glossarySearchClear .bgImage {
	width: 0.75rem !important;
	height: 1.5rem !important;
}
</style>
