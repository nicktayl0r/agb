<template>
  <div
    class="progressBar"
    v-bind:class="openModule"
    :data-project-loaded="projectLoaded"
  >
    <div class="moduleSelection" v-show="!guideOnly">
      <span class="moduleButton case">
        <input
          type="radio"
          id="caseRadio"
          @change="setCase"
          name="module"
          style="display: none"
          :disabled="caseButtonDisabled"
        />
        <label for="caseRadio" class="noSelect">Case</label>
      </span>
      <span class="moduleButton guide">
        <input
          type="radio"
          id="guideRadio"
          @change="setGuide"
          name="module"
          style="display: none"
          :disabled="guideButtonDisabled"
        />
        <label for="guideRadio" class="noSelect">Handbook</label>
      </span>
    </div>
    <div class="sections">
      <div
        v-for="section in Sections"
        :key="section.name"
        class="section"
        :class="{
          open: sectionOpen(section),
          unlocked: sectionUnlocked(section.name),
          handbookPages: showHandbookPages,
        }"
        :style="{
          color: sectionColor(section),
          'border-left-color': sectionColor(section),
        }"
        v-show="showSection(section)"
      >
        <span v-if="sectionUnlocked(section.name)">
          <span class="sectionName unlocked">
            <span @click="sectionClick(section)" v-html="section.name"></span>
          </span>
          <span class="pages" v-show="showSectionPages(section)">
            <div
              v-for="page in section.pages"
              :key="page.pageID"
              class="page"
              :id="page.pageID"
              v-show="showPage(page)"
            >
              <router-link
                v-if="pageUnlocked(page.pageID)"
                :to="'/' + trackGroupID + '/pages/' + page.pageID"
                @click.native="pageClick(page.pageID)"
                :class="{
                  currentPage: currentPage == page.pageID,
                  unlockedNextPage: isUnlockedCasePage(page.pageID),
                }"
              >
                <span>{{ page.name }}</span>
              </router-link>
              <span v-else class="locked">{{ page.name }}</span>
            </div>
          </span>
          <span class="subsections" v-show="showSectionSubsections(section)">
            <div
              v-for="subsection in getSubsections(section)"
              :key="subsection.name"
              :style="{
                color: sectionColor(subsection),
                'border-left-color': sectionColor(subsection),
              }"
            >
              <span
                class="subsection"
                v-if="sectionUnlocked(subsection.name)"
                :class="{
                  open: subsectionOpen(subsection.name),
                  unlocked: sectionUnlocked(subsection.name),
                }"
                v-show="showSection(subsection)"
                @click="subsectionClick(subsection.name)"
              >
                <span class="subsectionName unlocked">
                  <span>{{ subsection.name }}</span>
                </span>
                <span class="pages" v-show="showSectionPages(subsection)">
                  <div
                    v-for="subpage in subsection.pages"
                    :key="subpage.pageID"
                    class="page"
                    :id="subpage.pageID"
                    v-show="showPage(subpage)"
                  >
                    <router-link
                      v-if="pageUnlocked(subpage.pageID)"
                      :to="'/' + trackGroupID + '/pages/' + subpage.pageID"
                      @click.native="pageClick(subpage.pageID)"
                      :class="{
                        currentPage: currentPage == subpage.pageID,
                        unlockedNextPage: isUnlockedCasePage(subpage.pageID),
                      }"
                    >
                      <span>{{ subpage.name }}</span>
                    </router-link>
                    <span v-else class="locked">{{ subpage.name }}</span>
                  </div>
                </span>
              </span>
              <span v-else class="subsection subsectionName locked">{{
                subsection.name
              }}</span>
            </div>
          </span>
        </span>
        <span v-else class="sectionName locked" v-html="section.name"></span>
      </div>
    </div>
    <div class="bottomButtons">
      <span id="glossaryButton" class="noSelect" @click="glossaryButtonClick"
        >Glossary</span
      >
      <span
        id="muteButton"
        class="noSelect"
        v-if="!muted"
        @click="setMute(true)"
        >Mute</span
      >
      <span id="muteButton" class="noSelect" v-else @click="setMute(false)"
        >Unmute</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import tinycolor from "tinycolor2";
import { filter } from "ramda";
import { Maybe } from "true-myth";
import { Component, Watch, Prop } from "vue-property-decorator";
import Vue, { VueConstructor } from "vue";
import { Page, Track, emptyTrack, Section } from "@/data models/projectModels";
import { showHandbookPages, logMessage } from "@/helpers/debugHelpers";
import { mute, playSound } from "@/managers/audioManager";
import {
  getPageSectionName,
  openFirstPageOfGuideSection,
  getSectionSubsections,
  isPageContainedInSection,
} from "@/helpers/projectHelpers";
import {
  glossaryHideIfOpen,
  toggleGlossary,
  useTeacherView,
} from "@/helpers/widgetHelpers";
import {
  getNextPageID,
  isPageUnlocked,
  isSectionUnlocked,
  getPageUserState,
  openCurrentCasePage,
  openCurrentGuidePage,
  getModuleCurrentTrack,
  getNextPageUserState,
  getCurrentPageUserState,
} from "@/helpers/userHelpers";
import { readProjectDataExists } from "@/store/modules/appData";
import {
  readAudioMuted,
  readModulesState,
  readPageVisibleUser,
  readSectionVisibleUser,
  commitCurrentModule,
} from "@/store/modules/userData";
import { openableModules } from "../data models/userModels";
import {
  killSpecialPopper,
  showNextPagePopper,
  casePopperFlag,
  setCasePopperFlag,
} from "@/helpers/specialPopperHelpers";
import { getStore } from "@/helpers/storeHelpers";

@Component
export default class ProgressBar extends Vue {
  trackGroupID = "";

  currentPage = "";

  openSection = "";

  openModule: openableModules = "case";

  teacherView = false;

  showHandbookPages = false;

  guideButtonLocked = true;

  caseButtonLocked = false;

  projectNowReady = false;

  guideOnly = false;

  created() {
    this.teacherView = useTeacherView();
    this.showHandbookPages = showHandbookPages();
  }

  updated() {
    const userModuleState = readModulesState(getStore());
    const isCase = userModuleState.moduleOpen === "case";
    if (isCase && casePopperFlag) {
      showNextPagePopper(readModulesState(getStore()).moduleOpen);
      setCasePopperFlag(false);
    }
  }

  get projectLoaded() {
    logMessage("projectLoaded computed property detects change");
    const storeProject = readProjectDataExists(this.$store);
    if (!this.projectNowReady && storeProject) {
      const userModuleState = readModulesState(this.$store);
      // if there is a trackgroup then user progress is loaded
      if (
        userModuleState.currentTrackGroupID &&
        userModuleState.currentTrackGroupID != ""
      ) {
        this.trackGroupID = userModuleState.currentTrackGroupID;
        this.guideButtonLocked = userModuleState.guideState.locked;
        this.caseButtonLocked = userModuleState.caseState.locked;
        if (userModuleState.caseState.currentTrackID.trim() === "") {
          this.guideOnly = true;
          this.openModule = "guide";
        }
        this.projectNowReady = true;
      }
    }
    return storeProject;
  }
  get Sections(): Section[] {
    const userModuleState = readModulesState(this.$store);

    let nextPageState: any = {};
    const maybeNext = getNextPageUserState();
    if (maybeNext.isJust()) {
      nextPageState = Maybe.unsafelyUnwrap(maybeNext);
    }

    let currPageState: any = {};
    const maybeCurrent = getCurrentPageUserState();
    if (maybeCurrent.isJust()) {
      currPageState = Maybe.unsafelyUnwrap(maybeCurrent);
    }

    const trueVisited =
      currPageState.teacherVisited && nextPageState.teacherVisited;

    if (this.projectNowReady) {
      this.guideButtonLocked = userModuleState.guideState.locked;
      this.caseButtonLocked = userModuleState.caseState.locked;
    }

    this.trackGroupID = userModuleState.currentTrackGroupID;
    this.openModule = userModuleState.moduleOpen;
    if (userModuleState.moduleOpen === "case") {
      this.currentPage = userModuleState.caseState.currentPageID;
      this.setRadioChecked("#caseRadio");
    } else if (userModuleState.moduleOpen === "guide") {
      this.currentPage = userModuleState.guideState.currentPageID;
      this.setRadioChecked("#guideRadio");
    }
    const maybeTrack = getModuleCurrentTrack(userModuleState.moduleOpen);
    if (maybeTrack.isJust()) {
      const track = Maybe.unsafelyUnwrap(maybeTrack);
      const maybeSection = getPageSectionName(
        userModuleState.moduleOpen,
        track.trackID,
        this.currentPage
      );
      // we are using this to highlight the guide section the current page is in
      if (userModuleState.moduleOpen === "guide" && maybeSection.isJust())
        this.openSection = Maybe.unsafelyUnwrap(maybeSection);
      const sections = filter(
        (section) =>
          !("parentSectionName" in section) || section.parentSectionName === "",
        track.sections
      );
      return sections;
    }
    return [];
  }
  getSubsections(section: Section): Section[] {
    const maybeSubsections = getSectionSubsections(
      this.openModule,
      section.name
    );
    if (maybeSubsections.isJust()) {
      const subsections = Maybe.unsafelyUnwrap(maybeSubsections);
      return subsections;
    }
    return [];
  }
  setCase() {
    killSpecialPopper();
    glossaryHideIfOpen();
    commitCurrentModule(this.$store, "case");
    openCurrentCasePage();
    this.openModule = "case";
  }
  setGuide() {
    killSpecialPopper();
    glossaryHideIfOpen();
    commitCurrentModule(this.$store, "guide");
    openCurrentGuidePage();
    this.openModule = "guide";
  }
  subsectionClick(sectionName: string) {
    glossaryHideIfOpen();
    logMessage(`subsectionClick ${sectionName}`);
    if (this.openSection !== sectionName) {
      playSound(
        "assets/audio/SectionOpen.webm",
        "assets/audio/SectionOpen.mp3",
        "sfxOneShot"
      );
    }
    if (this.openModule == "guide") openFirstPageOfGuideSection(sectionName);
  }

  sectionClick(section: Section) {
    glossaryHideIfOpen();
    killSpecialPopper();
    logMessage(`sectionClick ${section.name}`);
    const pageInSection = isPageContainedInSection(
      this.currentPage,
      section,
      this.openModule
    );
    if (!pageInSection) {
      playSound(
        "assets/audio/SectionOpen.webm",
        "assets/audio/SectionOpen.mp3",
        "sfxOneShot"
      );
    }
    if (this.openSection !== section.name) {
      this.openSection = section.name;
      if (this.openModule === "guide" && !showHandbookPages()) {
        openFirstPageOfGuideSection(section.name);
      }
    } else if (!pageInSection) {
      this.openSection = "";
    } else if (this.openSection === section.name && this.openModule === "case") {
      this.openSection = "";
    }
  }

  setRadioChecked(selector: string) {
    if (this.$el) {
      const radioEl = this.$el.querySelector(selector) as HTMLInputElement;
      if (radioEl) radioEl.checked = true;
    }
  }
  showSectionSubsections(section: Section): boolean {
    return (
      this.openSection == section.name ||
      isPageContainedInSection(this.currentPage, section, this.openModule)
    );
  }

  showSectionPages(section: Section): boolean {
    const showModulePages =
      this.openModule === "case" ||
      (this.openModule === "guide" && showHandbookPages());
    const sectionOpen =
      this.openSection === section.name ||
      isPageContainedInSection(this.currentPage, section, this.openModule);

    const userModuleState = readModulesState(this.$store);

    const caseModuleSectionShowPageCondition = (
      // are we currently in a case module?
      this.openModule === "case"
      && (
      // is the lastpage in the section...
        isPageContainedInSection(this.currentPage, section, "case")
      // or is the opensection equal to the current section?
        || (this.openSection === section.name)
      )
    );

    return (
      caseModuleSectionShowPageCondition
      || (this.openModule === "guide" && showModulePages && sectionOpen)
    );
  }

  showSection(section: Section): boolean {
    const maybeUserSectionVizVal = readSectionVisibleUser(this.$store)(
      this.openModule,
      section.name
    );
    if (maybeUserSectionVizVal.isJust())
      return maybeUserSectionVizVal.unsafelyUnwrap();
    return section.visible === undefined || section.visible;
  }
  showPage(page: Page): boolean {
    const maybeUserPageVizVal = readPageVisibleUser(this.$store)(
      this.openModule,
      page.pageID
    );
    if (maybeUserPageVizVal.isJust())
      return maybeUserPageVizVal.unsafelyUnwrap();
    return page.visible === undefined || page.visible;
  }
  get guideButtonDisabled(): boolean {
    return !(this.teacherView || !this.guideButtonLocked);
  }
  get caseButtonDisabled(): boolean {
    return !(this.teacherView || !this.caseButtonLocked);
  }
  pageUnlocked(pageID: string): boolean {
    return this.teacherView || isPageUnlocked(pageID);
  }
  sectionOpen(section: Section): boolean {
    return (
      this.openSection == section.name // || isPageContainedInSection(this.currentPage, section, this.openModule))
    );
  }
  subsectionOpen(sectionName: string): boolean {
    return this.openSection == sectionName && !showHandbookPages();
  }
  sectionUnlocked(sectionName: string): boolean {
    return this.teacherView || isSectionUnlocked(sectionName);
  }
  isUnlockedCasePage(pageID: string): boolean {
    // is this the last unlocked unvisited case page?
    if (this.openModule === "case") {
      const userModuleState = readModulesState(this.$store);
      if (userModuleState.caseState.currentPageID == pageID) return false;
      if (!userModuleState.caseState.hasOwnProperty("lastUnlockedPageID"))
        return false; // just in case we have old data without this prop

      if (userModuleState.caseState.lastUnlockedPageID != pageID) return false;
      const unlocked = isPageUnlocked(pageID);

      if (!unlocked) return false; //don't bother with following logic if we aren't unlocked.
      let visitedPageBefore = false;
      const maybePageUserState = getPageUserState(pageID);
      if (maybePageUserState.isJust()) {
        const pageState = Maybe.unsafelyUnwrap(maybePageUserState);
        if (pageState.visited != undefined)
          visitedPageBefore = pageState.visited;
      }
      const displayUnlocked = !visitedPageBefore && unlocked;
      if (displayUnlocked) {
        // open the page's section
        const maybeSectionName = getPageSectionName(
          "case",
          userModuleState.caseState.currentTrackID,
          pageID
        );
        if (maybeSectionName.isJust()) {
          const sectionName = Maybe.unsafelyUnwrap(maybeSectionName);
          this.openSection = sectionName;
        }
        return true;
      }
    } else {
      const userModuleState = readModulesState(this.$store);

      if (userModuleState.guideState.currentPageID == pageID) return false;
      if (!userModuleState.guideState.hasOwnProperty("lastUnlockedPageID"))
        return false; // just in case we have old data without this prop

      let unlocked: any = "";
      let visitedPageBefore = false;

      const maybeNextPageID = getNextPageID();
      if (maybeNextPageID.isJust()) {
        const nextPageID = Maybe.unsafelyUnwrap(maybeNextPageID);
        unlocked = isPageUnlocked(nextPageID);

        const maybePageUserState = getNextPageUserState();
        if (maybePageUserState.isJust()) {
          const pageState = Maybe.unsafelyUnwrap(maybePageUserState);
          if (pageState.visited != undefined)
            visitedPageBefore = pageState.visited;
        }
      }

      let p: any;
      const maybePageUserState = getPageUserState(pageID);
      if (maybePageUserState.isJust()) {
        const pageState = Maybe.unsafelyUnwrap(maybePageUserState);
        p = pageState;
        if (pageState.visited != undefined) {
          visitedPageBefore = !!(pageState.visited || pageState.teacherVisited);
        }
      }
      const displayUnlocked = !visitedPageBefore && unlocked;
      const n = getNextPageID();
      if (n.isJust()) {
        const nextPageID = Maybe.unsafelyUnwrap(n);

        let nextPageState: any = {};
        const maybeNext = getNextPageUserState();
        if (maybeNext.isJust()) {
          nextPageState = Maybe.unsafelyUnwrap(maybeNext);
        }

        let currPageState: any = {};
        const maybeCurrent = getCurrentPageUserState();
        if (maybeCurrent.isJust()) {
          currPageState = Maybe.unsafelyUnwrap(maybeCurrent);
        }

        const trueVisited =
          currPageState.teacherVisited && nextPageState.teacherVisited;
      }
    }
    return false;
  }
  getBoundariesEl() {
    return document.getElementById("app");
  }
  pageClick(pageID: string): void {
    glossaryHideIfOpen();
    killSpecialPopper();
    if (this.currentPage !== pageID) {
      playSound(
        "assets/audio/PageSelected.webm",
        "assets/audio/PageSelected.mp3",
        "sfxOneShot"
      );
    }
  }
  sectionColor(section: Section) {
    if (this.teacherView || isSectionUnlocked(section.name))
      return section.tocColor;
    return tinycolor(section.tocColor).desaturate(85).darken(20).toString();
  }
  glossaryButtonClick() {
    toggleGlossary();
  }
  setMute(val: boolean) {
    mute(val);
  }
  get muted() {
    return readAudioMuted(this.$store);
  }
}
</script>

<style scoped>
.progressBar {
  grid-column-start: 2;
  grid-column-end: span 1;
  grid-row-start: 1;
  background-color: rgb(37, 37, 37);
  color: white;
  overflow: hidden;
  font-size: 2.75vh;
  position: relative;
  display: flex;
  flex-direction: column;
}
.pages .locked {
  color: #adadad;
}
.sectionName {
  font-weight: bold;
}
.sectionName.unlocked,
.subsectionName.unlocked {
  cursor: pointer;
}
.sections {
  overflow-x: hidden;
  overflow-y: auto;
  height: 0; /* this fixes a flexbox scroll resizing quirk in Chrome */
  flex-grow: 1;
  /* the folling is to break long words */
  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;
  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: none;
  -moz-hyphens: none;
  -webkit-hyphens: none;
  hyphens: none;
  padding: 0 0 0 0.4rem;
}
.section {
  padding: 0.4rem;
}
.subsections,
.pages {
  display: block;
  position: relative;
  left: 0.8em;
  width: calc(100% - 0.8em);
}
.subsection {
  display: block;
}
.subsection,
.page {
  margin: 0.75em 0 0.75em 0;
}
.page a {
  color: white;
  text-decoration: none;
  width: 100%;
}
.page a.currentPage {
  color: #393a39;
  background-color: white;
  border-radius: 0.15em;
  padding: 0.25em;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}
.page a.currentPage span {
  position: relative;
}
.page a.unlockedNextPage {
  border-radius: 0.15em;
  padding: 0.1em;
  margin: 0.15em;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  animation-name: blinkGray;
  animation-duration: 1.25s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;
  animation-direction: alternate;
}
@keyframes blinkGray {
  from {
    background-color: rgba(105, 105, 105, 0);
    box-shadow: 0 0 0.15rem 0.15rem rgba(105, 105, 105, 0); /* white with 0 alpha */
  }
  to {
    background-color: gray;
    box-shadow: 0 0 0.15rem 0.15rem gray;
  }
}
.pages :last-child,
.subsections :last-child .subsection {
  margin-bottom: 0;
}
.guide .section.open:not(.handbookPages) {
  padding-top: 0.8em;
  padding-bottom: 0.8em;
}
.guide .sections .section.open:not(.handbookPages) .sectionName {
  color: #273e51;
  background-color: white;
  border-radius: 0.15em;
  padding: 0.25em;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}
.guide .sections .section.open:not(.handbookPages) .sectionName span {
  position: relative;
}
.guide .subsections .subsection.open:not(.handbookPages) .subsectionName {
  color: #273e51;
  background-color: white;
  border-radius: 0.15em;
  padding: 0.25em;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}
.guide .subsections .subsection.open:not(.handbookPages) .subsectionName span {
  position: relative;
}
.moduleSelection,
.bottomButtons {
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: row;
  text-align: center;
}
.moduleSelection {
  align-items: stretch;
  padding: 0 0 0.2rem 0;
}
.bottomButtons {
  justify-content: space-evenly;
  align-self: flex-end;
  padding: 0.2rem;
}
.bottomButtons span {
  padding: 0.4em 0.2em;
  flex-grow: 1;
  cursor: pointer;
  border-radius: 0.2rem;
}
.moduleButton {
  flex-grow: 1;
}
.moduleButton label {
  padding: 0.4em;
  display: inline-block;
  width: 100%;
}
.moduleButton input:enabled + label {
  cursor: pointer;
}
.moduleButton input:disabled + label {
  color: #adadad;
}
.moduleButton input:checked + label {
  color: white;
}
.progressBar.case .moduleButton.case input + label {
  border-radius: 0 0.3em 0 0;
}
.progressBar.case .moduleButton.guide input + label {
  border-radius: 0 0 0 0.3em;
}
.progressBar.guide .moduleButton.case input + label {
  border-radius: 0 0 0.3em 0;
}
.progressBar.guide .moduleButton.guide input + label {
  border-radius: 0.3em 0 0 0;
}
#glossaryButton {
  background-color: #5c4866;
  margin-right: 0.2rem;
}
.progressBar.case,
#caseRadio + label,
.moduleButton.guide {
  background-color: #393939;
}
.progressBar.case #muteButton {
  background-color: #606060;
}
/* .sections .section.unlocked {
  border-left-style: solid;
  border-left-width: 5px;
} */
.progressBar.guide,
#guideRadio + label,
.moduleButton.case {
  background-color: #3d627a;
}
.progressBar.guide #muteButton {
  background-color: #273e51;
}
</style>
