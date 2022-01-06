<template>
	<div>
		<loading-bar v-if="loading" class="appLoadingBar" ref="appLoadingBar" />
		<start-screen v-else-if="!started" @start-clicked="startClicked" />
		<div v-else id="app" class="appGrid">
			<div id="case-content">
				<router-view />
			</div>
			<glossary id="glossaryContainer" ref="glossary" @hook:mounted="glossaryMounted" @hook:beforeDestory="glossaryBeforeDestroy" />
			<guide-page-buttons id="guideButtonsContainer" />
			<progress-bar />
		</div>
	</div>
</template>

<script lang="ts">
import "reflect-metadata"; // This needs to be imported before vue-property-decorator. We need it to send type metadata to grapes.

import { Component, Vue } from "vue-property-decorator";
// for some reason this needs to happen first

import {
	startAttempt,
	requestProjectVersion,
	openStartAttempt,
	setProjectConfigData,
} from "@/helpers/messages/startAttemptMessageHelper";
import { testMessage } from "@/helpers/messages/testMessageHelper";
import Glossary from "@/components/Glossary.vue";

import { setGlossary } from "@/helpers/glossaryHelper";
import { getProjectData } from "@/helpers/envHelpers";

import GuidePageButtons from "@/components/GuidePageButtons.vue";
import { LoadingBar, setLoadingBar, setMainApp } from "@/helpers/asyncHelpers";
import ProgressBar from "@/components/ProgressBar.vue";
import StartScreen from "@/components/StartScreen.vue";

import {
	isDebug,
	logMessage,
	logWarningSecurely,
	gizmoLogSecurely,
} from "@/helpers/debugHelpers";
import { isServerHealthy, isOriginAllowed } from "@/helpers/serverHelpers";
import { setEnv, EnvironmentOptions } from "@/helpers/envHelpers";

import { getInternetTime } from "@/helpers/timeHelpers";
import { handleRootPath, notGrapes } from "@/helpers/widgetHelpers";
import { initSentry } from "@/helpers/sentryHelper";

@Component({
	components: {
		ProgressBar,
		GuidePageButtons,
		Glossary,
		LoadingBar,
		StartScreen,
	},
})
export default class App extends Vue {
	loading = true;

	started = false;

	listenFor_startAttempt = false;

	async created() {
		await getInternetTime();
		if (isDebug()) {
			//for debugging purposes where we aren't trying to connect to the server, just get the project.
			setEnv(EnvironmentOptions.debug);
			await getProjectData();
      
      interface VersionData {
        projectGitVersion: string;
        playerVersion: string;
      }

      let version: VersionData = {
        projectGitVersion: "",
        playerVersion: ""
      }

      try {
			 const response = await requestProjectVersion();
       version = response;
      } catch {
        console.warn("version .txt files not found")
      }

			// init sentry after env has been set, but before the project is loaded and everything really starts
			initSentry(version.playerVersion);
			const projectData = await getProjectData();
			setProjectConfigData(projectData, version);

			this.loading = false;
			handleRootPath(this);

			window.addEventListener("message", this.handleMessages, false);
		} else if (notGrapes()) {
			isServerHealthy();
			this.listenFor_startAttempt = true;
			window.addEventListener("message", this.handleMessages, false);
			window.parent.postMessage("caseAppReady", "*");
		}
		this.$emit("app-loaded", true);

		setLoadingBar(this.$refs.appLoadingBar);
		setMainApp(this);
	}

	glossaryMounted() {
		setGlossary(this.$refs.glossary as Glossary); //this can be moved to App.vue.mounted() event
	}

	glossaryBeforeDestroy() {
		setGlossary(null);
	}

	handleMessages(event: any) {
		if (!event.data || !event.data.messageName) {
			logMessage("Invalid postMessage event. No data or messageName");
			return;
		}
		console.log("handleMessages messageName:", event.data.messageName);
		if (isOriginAllowed(event.origin)) {
			switch (event.data.messageName) {
				//ToDo: Add testGizmoLog
				case "testGizmoLog":
				case "testApollo":
				case "testSentry":
					testMessage(event);
					break;
				case "repeatCaseAppReady":
					logMessage("postMessage: repeatCaseAppReady");
					if (!this.listenFor_startAttempt) {
						this.listenFor_startAttempt = true;
					}
					window.parent.postMessage("caseAppReady", "*");
					break;
				case "openStartAttempt":
					openStartAttempt();
					if (!this.listenFor_startAttempt) {
						this.listenFor_startAttempt = true;
					}
					break;
				case "startAttempt":
					if (!this.listenFor_startAttempt) {
						logWarningSecurely("startAttempt has already been received", event);
						return;
					}
					startAttempt(event);
					// prevent starting multiple attempts
					this.listenFor_startAttempt = false;
					break;
				default:
					gizmoLogSecurely(
						`handleMessage message from origin: ${event.origin}`,
						event.data
					);
					break;
			}
		} // else logError("message ignored from origin: " + event.origin);
	}

	startClicked() {
		this.started = true;
	}
}
</script>

//Grid styles and font scaling
<style lang="scss">
#guidePopper {
	dropshadow: 0 0 3px 0 rgba(17, 18, 17, 0.25);
}
#progressBarPopper {
	dropshadow: 0 0 3px 0 rgba(17, 18, 17, 0.25);
}
.appLoadingBar.loadingBarParent {
	height: 97vh;
}
.appGrid {
	margin: 0 auto; /* align center */
	display: grid;
	grid-template-columns: auto minmax(128px, 20vw);
	grid-template-rows: auto;
	min-width: 640px;
	min-height: 400px;
	max-width: 160vh; /* 16:10 - max 160% of height */
	max-height: 62vw; /* 16:10 - max 62% of width */
	height: 62vw; /* 16:10 - 62% of width - (10/16) = .625 */
	width: 100vw; /* full size width */
	background-color: white;
	overflow: hidden;
}
#case-content {
	position: relative;
	grid-column-start: 1;
	grid-row-start: 1;
	overflow: auto;
}
.simParentContent {
	width: 100%;
	height: 100%;
	overflow: auto;
}
.simPageContent {
	overflow: auto;
}
#guideButtonsContainer {
	position: relative;
	grid-column-start: 1;
	grid-row-start: 1;
	z-index: 120;
	pointer-events: none;
}
#glossaryContainer {
	position: relative;
	grid-column-start: 1;
	grid-row-start: 1;
}

@function strip-unit($value) {
	@return $value / ($value * 0 + 1);
}

@mixin fluid-type(
	$min-vw,
	$max-vw,
	$min-vh,
	$max-vh,
	$min-font-size,
	$max-font-size
) {
	$u1: unit($min-vw);
	$u2: unit($max-vw);
	$u3: unit($min-vh);
	$u4: unit($max-vh);
	$u5: unit($min-font-size);
	$u6: unit($max-font-size);
	@if $u1 == $u2 and $u1 == $u3 and $u1 == $u4 and $u1 == $u5 and $u1 == $u6 {
		& {
			font-size: $min-font-size;
			@media screen and (min-height: $min-vh) {
				font-size: 2.75vh;
			}
			// @media screen and (min-width: $min-vw) and (max-aspect-ratio: 16/9) {
			//   font-size: calc(
			//     #{$min-font-size} + #{strip-unit($max-font-size - $min-font-size)} *
			//       ((100vw - #{$min-vw}) / #{strip-unit($max-vw - $min-vw)})
			//   );
			// }
			// @media screen and (min-width: $max-vw) {
			//   font-size: $max-font-size;
			// }
		}
	}
}
$min_height: 400px;
$max_height: 1440px;
$min_width: 640px;
$max_width: 2304px;
$min_font: 11px;
$max_font: 27px;
html {
	font-family: Roboto, sans-serif;
	@include fluid-type(
		$min_width,
		$max_width,
		$min_height,
		$max_height,
		$min_font,
		$max_font
	);
}
</style>

<style>
body {
	margin: 0px;
}
/* ==
Color Variables
== */
:root {
	/* ==== Colors ==== */
	/* == GENERAL == */
	--color-white: rgba(255, 255, 255, 1); /* #ffffff */
	--color-black: rgba(0, 0, 0, 1); /* #000000 */
	--color-transparent: rgba(
		255,
		255,
		255,
		0
	); /* #ffffffff (transparent white)  Use For:  making table lines 'invisible' */

	/* == GREY == */
	--color-grey1: rgba(
		241,
		241,
		241,
		1
	); /* #f1f1f1  Use For: slider bar background,  text input field background, instruction text background, tableCell-Grey, */
	--color-grey2: rgba(
		217,
		217,
		217,
		1
	); /* #d9d9d9  Use For: Grey button Disabled, normal state icons arrows and check, slider bar, slider bar button outline (normal) and entire button disabled, time slider hands (normal), Text Box - Note Grey, textBackground-Instruction border, textBackgroundPage border, textBackground-Popup-White border, slider bar border */
	--color-grey3: rgba(
		187,
		187,
		187,
		1
	); /* #cdcccc Use For: tableTitle-Grey, drop shadow color */
	--color-grey4: rgba(
		153,
		153,
		153,
		1
	); /* #bbbbbb  Use For: dividing line color, placeholder text color, Text Box - Note Border Grey */
	--color-grey5: rgba(
		83,
		84,
		83,
		1
	); /* #535453  Use For:  Grey button gradient top, */
	--color-grey6: rgba(57, 58, 57, 1);
	/* #393a39  Use For:  Grey button gradient bottom, */
	--color-grey7: rgba(
		33,
		37,
		41,
		1
	); /* #212529  Use For:  page title backgrounds, drop shadows (we may need varying drop shadow colors depending on if we need varying levels of opacity), and progress bar background, as well as the body text color (if it is dark enough) */
	--color-grey8: rgb(17, 18, 17);
	--color-grey8-trans: rgba(
		17,
		18,
		17,
		0.25
	); /* #111211 (transparent)  Used For: top and bottom of linear gradient for .hero-image background (this is the dimming of that page’s background image) */
	/* == RED == */
	--color-red1: rgba(242, 223, 223, 1); /* #f2dfdf   Use For: tableCell-Red, */
	--color-red2: rgba(249, 88, 88, 1);
	/* #f95858  Use For: progressBarSection-Red, Incorrect border */
	--color-red3: rgba(254, 161, 161, 1); /* #fea1a1  Use For: tableTitle-Red */
	/* == ORANGE == */
	--color-orange1: rgba(
		242,
		236,
		223,
		1
	); /* #f2ecdf  Use For: tableCell-Orange, */
	--color-orange2: rgba(
		252,
		178,
		89,
		1
	); /* #fcb259  Use For: progressBarSection-Orange, */
	--color-orange3: rgba(
		254,
		216,
		147,
		1
	); /* #fed893  Use For: tableTitle-Orange, */
	--color-orange4: rgba(
		235,
		169,
		31,
		1
	); /* #eba91f  Use For: Text Box - Key Concept Border Yellow */
	--color-orange5: rgba(
		236,
		137,
		26,
		1
	); /* #ec891a  Use For: only terms linked to glossary */
	/* == YELLOW == */
	--color-yellow1: rgba(
		236,
		242,
		223,
		1
	); /* #ecf2df  Use For: tableCell-Yellow, */
	--color-yellow2: rgba(
		255,
		250,
		153,
		1
	); /* #fffa99  Use For: progressBarSection-Yellow, tableTitle-Yellow, */
	--color-yellow3: rgba(
		255,
		236,
		106,
		1
	); /* #ffec6a Use For: Text Box - Key Concept Yellow */
	/* == GREEN == */
	--color-green1: rgba(
		223,
		242,
		223,
		1
	); /* #dff2df  Use For: tableCell-Green, */
	--color-green2: rgba(
		193,
		255,
		138,
		1
	); /* #c1ff8a  Use For: progressBarSection-Green, tableTitle-Green, */
	--color-green3: rgba(
		146,
		222,
		28,
		1
	); /* #92de1c  Use For: Text Box - Correct Border Green */
	--color-green4: rgba(
		188,
		248,
		98,
		1
	); /* #bcf862  Use For: bottom of correct button gradient */
	--color-green5: rgba(
		214,
		247,
		135,
		1
	); /* #d6f787  Use For: Text Box - Correct Green, top of correct button gradient */
	/* == TEAL == */
	--color-teal1: rgba(223, 242, 236, 1); /* #dff2ec  Use For: tableCell-Teal, */
	--color-teal2: rgba(
		131,
		255,
		214,
		1
	); /* #83ffd6  Use For: progressBarSection-Teal, */
	--color-teal3: rgba(
		169,
		255,
		251,
		1
	); /* #a9fffb  Use For: tableTitle-Teal, */
	/* == BLUE == */
	--color-blue1: rgba(223, 236, 242, 1); /* #dfecf2  Use For: tableCell-Blue, */
	--color-blue2: rgba(133, 203, 255, 1);
	/* #85cbff  Use For: progressBarSection-Blue, tableTitle-Blue, */
	--color-blue3: rgba(
		126,
		214,
		255,
		1
	); /* #7ed6ff  Use For:  Blue Hover Outline, Blinking HLB,  External/Hyperlink/Glossary-Hover, Blue button gradient top, */
	--color-blue3-a: rgba(
		126,
		214,
		255,
		0.5
	); /* #7ed6ff  Use For:  Blue Hover Outline, Blinking HLB,  External/Hyperlink/Glossary-Hover, Blue button gradient top, */
	--color-blue4: rgba(
		85,
		188,
		234,
		1
	); /* #55bcea  Use For:  Blue button gradient bottom, Popup blue border */
	--color-blue4-a: rgba(
		85,
		188,
		234,
		0.5
	); /* #55bcea  Use For:  Blue button gradient bottom, Popup blue border */
	--color-blue5: rgba(
		61,
		133,
		198,
		1
	); /* #3d85c6  Use For: External/Hyperlink-Normal */
	--color-blue6: rgba(
		39,
		61,
		82,
		1
	); /* #273d52 Use For: Text Box - Manual Blue */
	--color-blue7: rgba(
		27,
		41,
		55,
		1
	); /* #1b2937 Use For: Text Box - Manual Border Blue */
	/* == INDIGO == */
	--color-indigo1: rgba(223, 223, 242, 1);
	/* #dfdff2  Use For: tableCell-Indigo, */
	--color-indigo2: rgba(
		169,
		179,
		252,
		1
	); /* #a9b3fc  Use For: progressBarSection-Indigo, tableTitle-Indigo, */
	/* == PURPLE == */
	--color-purple1: rgba(
		236,
		223,
		242,
		1
	); /* #ecdff2  Use For: tableCell-Purple, */
	--color-purple2: rgba(
		227,
		153,
		255,
		1
	); /* #e399ff  Use For: progressBarSection-Purple, */
	--color-purple3: rgba(
		207,
		172,
		254,
		1
	); /* #cfacfe  Use For: tableTitle-Purple, */
	--color-purple4: rgba(
		103,
		78,
		167,
		1
	); /* #674ea7  Use For:  External/Hyperlink-Visited/Clicked (but not glossary links), */
	/* == PINK == */
	--color-pink1: rgba(242, 223, 236, 1); /* #f2dfec  Use For: tableCell-Pink, */
	--color-pink2: rgba(255, 203, 205, 1);
	/* #ffcbcd Use For: Text Box - Incorrect Box, Placeholder Color */
	--color-pink3: rgba(254, 170, 224, 1);
	/* #feaae0 Use For: tableTitle-Pink, */
}
/* ==
Color classes
== */
.colorWhite {
	color: var(--color-white);
}
.colorBlack {
	color: var(--color-black);
}
.colorGrey1 {
	color: var(--color-grey1);
}
.colorGrey2 {
	color: var(--color-grey2);
}
.colorGrey3 {
	color: var(--color-grey3);
}
.colorGrey4 {
	color: var(--color-grey4);
}
.colorGrey5 {
	color: var(--color-grey5);
}
.colorGrey6 {
	color: var(--color-grey6);
}
.colorGrey7 {
	color: var(--color-grey7);
}
.colorRed1 {
	color: var(--color-red1);
}
.colorRed2 {
	color: var(--color-red2);
}
.colorRed3 {
	color: var(--color-red3);
}
.colorOrange1 {
	color: var(--color-orange1);
}
.colorOrange2 {
	color: var(--color-orange2);
}
.colorOrange3 {
	color: var(--color-orange3);
}
.colorOrange4 {
	color: var(--color-orange4);
}
.colorOrange5 {
	color: var(--color-orange5);
}
.colorYellow1 {
	color: var(--color-yellow1);
}
.colorYellow2 {
	color: var(--color-yellow2);
}
.colorYellow3 {
	color: var(--color-yellow3);
}
.colorGreen1 {
	color: var(--color-green1);
}
.colorGreen2 {
	color: var(--color-green2);
}
.colorGreen3 {
	color: var(--color-green3);
}
.colorGreen4 {
	color: var(--color-green4);
}
.colorGreen5 {
	color: var(--color-green5);
}
.colorTeal1 {
	color: var(--color-teal1);
}
.colorTeal2 {
	color: var(--color-teal2);
}
.colorTeal3 {
	color: var(--color-teal3);
}
.colorBlue1 {
	color: var(--color-blue1);
}
.colorBlue2 {
	color: var(--color-blue2);
}
.colorBlue3 {
	color: var(--color-blue3);
}
.colorBlue4 {
	color: var(--color-blue4);
}
.colorBlue5 {
	color: var(--color-blue5);
}
.colorBlue6 {
	color: var(--color-blue6);
}
.colorBlue7 {
	color: var(--color-blue7);
}
.colorIndigo1 {
	color: var(--color-indigo1);
}
.colorIndigo2 {
	color: var(--color-indigo2);
}
.colorPurple1 {
	color: var(--color-purple1);
}
.colorPurple2 {
	color: var(--color-purple2);
}
.colorPurple3 {
	color: var(--color-purple3);
}
.colorPurple4 {
	color: var(--color-purple4);
}
.colorPink1 {
	color: var(--color-pink1);
}
.colorPink2 {
	color: var(--color-pink2);
}
.colorPink3 {
	color: var(--color-pink3);
}
/* ==
Color background classes
== */
.colorBkgndWhite {
	background-color: var(--color-white);
}
.colorBkgndBlack {
	background-color: var(--color-black);
}
.transparency {
	background-color: var(--color-transparent);
}
.colorBkgndGrey1 {
	background-color: var(--color-grey1);
}
.colorBkgndGrey2 {
	background-color: var(--color-grey2);
}
.colorBkgndGrey3 {
	background-color: var(--color-grey3);
}
.colorBkgndGrey4 {
	background-color: var(--color-grey4);
}
.colorBkgndGrey5 {
	background-color: var(--color-grey5);
}
.colorBkgndGrey6 {
	background-color: var(--color-grey6);
}
.colorBkgndGrey7 {
	background-color: var(--color-grey7);
}
.colorBkgndRed1 {
	background-color: var(--color-red1);
}
.colorBkgndRed2 {
	background-color: var(--color-red2);
}
.colorBkgndRed3 {
	background-color: var(--color-red3);
}
.colorBkgndOrange1 {
	background-color: var(--color-orange1);
}
.colorBkgndOrange2 {
	background-color: var(--color-orange2);
}
.colorBkgndOrange3 {
	background-color: var(--color-orange3);
}
.colorBkgndOrange4 {
	background-color: var(--color-orange4);
}
.colorBkgndOrange5 {
	background-color: var(--color-orange5);
}
.colorBkgndYellow1 {
	background-color: var(--color-yellow1);
}
.colorBkgndYellow2 {
	background-color: var(--color-yellow2);
}
.colorBkgndYellow3 {
	background-color: var(--color-yellow3);
}
.colorBkgndGreen1 {
	background-color: var(--color-green1);
}
.colorBkgndGreen2 {
	background-color: var(--color-green2);
}
.colorBkgndGreen3 {
	background-color: var(--color-green3);
}
.colorBkgndGreen4 {
	background-color: var(--color-green4);
}
.colorBkgndGreen5 {
	background-color: var(--color-green5);
}
.colorBkgndTeal1 {
	background-color: var(--color-teal1);
}
.colorBkgndTeal2 {
	background-color: var(--color-teal2);
}
.colorBkgndTeal3 {
	background-color: var(--color-teal3);
}
.colorBkgndBlue1 {
	background-color: var(--color-blue1);
}
.colorBkgndBlue2 {
	background-color: var(--color-blue2);
}
.colorBkgndBlue3 {
	background-color: var(--color-blue3);
}
.colorBkgndBlue4 {
	background-color: var(--color-blue4);
}
.colorBkgndBlue5 {
	background-color: var(--color-blue5);
}
.colorBkgndBlue6 {
	background-color: var(--color-blue6);
}
.colorBkgndBlue7 {
	background-color: var(--color-blue7);
}
.colorBkgndIndigo1 {
	background-color: var(--color-indigo1);
}
.colorBkgndIndigo2 {
	background-color: var(--color-indigo2);
}
.colorBkgndPurple1 {
	background-color: var(--color-purple1);
}
.colorBkgndPurple2 {
	background-color: var(--color-purple2);
}
.colorBkgndPurple3 {
	background-color: var(--color-purple3);
}
.colorBkgndPurple4 {
	background-color: var(--color-purple4);
}
.colorBkgndPink1 {
	background-color: var(--color-pink1);
}
.colorBkgndPink2 {
	background-color: var(--color-pink2);
}
.colorBkgndPink3 {
	background-color: var(--color-pink3);
}
/* ==
Text Styling
== */
.placeholderText {
	font-style: italic;
	color: var(--color-grey2);
}
h1 {
	font-size: 3em;
	margin: 0px;
}
/* h2: 2.25x the size of the body text ~36px */
h2 {
	font-size: 2.25em;
	margin: 0px;
}
/* h3: .75x the size of the body text ~28px */
h3 {
	font-size: 1.75em;
	margin: 0px;
}
/* h4: .75x the size of the body text ~18px */
h4 {
	font-size: 1.125em;
	margin: 0px;
}
/* h5: same size as body text just bold */
h5 {
	font-weight: bold;
	margin: 0px;
}
/* h5: same size as body text just the light version */
h6 {
	font-weight: 300;
	/* 300 = roboto light */
	margin: 0px;
}
/* roughly google 14pt font */
.font14 {
  font-size: 1.166666667rem;
}
/* roughly google 18pt font */
.font18 {
  font-size: 1.5rem;
}
/* roughly google 20pt font */
.font20 {
  font-size: 1.666666667rem;
}
/* roughly google 33pt font */
.font22 {
  font-size: 1.833333333rem;
}
/* roughly google 30pt font */
.font30 {
  font-size: 2.5rem;
}
p {
	margin: 0px;
}
/* ======== Start - Background: Text ======== */
.textBackgroundBasic {
	/* textBackgroundBasic: displays as a white background is used only in the Case
           Used:  on all basic text boxes within the case an manual */
	border-radius: 1.3vh;
	padding: 3vh;
	margin: 0px; /* margin: 40px 0 40px 0;
  margin-top: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  margin-left: 10px; */
	border: 0.2vh solid;
	border-color: var(--color-grey2);
	background-color: var(
		--color-white
	); /* max-width: 0%; Need a max width setting
        min-width: 0%; Need a min width setting */
}
.dropShadow {
	box-shadow: 0 4px 8px 0 rgba(17, 18, 17, 0.25),
		0 6px 20px 0 rgba(17, 18, 17, 0.25);
}
.textBackground-Transparent {
	border: none;
	background-color: transparent;
}
.textBackground-Transparent-White {
	border: none;
	color: var(--color-white); /* makes text white */
	background-color: black; /* replace "var(--color-black)" with "none" on actual implimentation */
}
.textBackground-DarkBlue {
	/* Used: only in the Manual */
	background-color: var(--color-blue6);
	border-color: var(--color-blue7);
	color: var(--color-white); /* makes text white */
}
.textBackground-White2 { /* for Handbook poppers on DarkBlue background */
  background-color: var(--color-white);
  border-color: var(--color-blue7);
}
.textBackground-DarkMode {
  background-color: var(--color-grey6);
  border-color: var(--color-grey7);
  color: var(--color-white);
}
.textBackground-Correct {
	background-color: var(--color-green5);
	border-color: var(--color-green3);
}
.textBackground-Incorrect {
	background-color: var(--color-pink2);
	border-color: var(--color-red2);
}
.textBackground-KeyConcept {
	background-color: var(--color-yellow3);
	border-color: var(--color-orange4);
}
.textBackground-Note {
	background-color: var(--color-grey2);
	border-color: var(--color-grey3);
}
.title {
	font-family: "Roboto", sans-serif;
	font-size: 1em;
	font-weight: 500;
	padding: 0; /* margin: 10px 0; */
	color: var(--color-grey6);
}
/* ==== Start - Popups ==== */
/* textBackground-Popup is the sizeing basics of a popup and how it functions */
.textBackground-Popup {
	max-width: 250px; /* 25% = 25% of the container the popup is held inside */ /* Need to specify a max width setting */ /* In order for the position attribute (below) to work correctly the popup needs to be inside a container that matches the size of the whole "visual space" and that visual space needs to have it's position: relative; */
	position: absolute;
}
.textBackground-Popup-Blue {
	background-color: var(--color-blue3);
	border-color: var(--color-blue4);
}
.textBackground-Popup-White {
	background-color: var(--color-white);
	border-color: var(--color-grey2);
}
.white {
	color: var(--color-white);
}
.pLight {
	font-weight: 300; /* 300 = light */
}
.textCenter {
	text-align: center;
}
.textRight {
	text-align: right;
}
.textInline {
	display: inline;
}
/* ===
Page styles - Deprecated
== */
.overlayBackground {
	position: absolute;
	left: 0; /* top: 0; */
	width: 100%;
}
.textBackground-SemiTransparent {
	opacity: 0.5;
	filter: alpha(opacity=50);
	background-color: var(--color-white);
	position: absolute;
	padding: 10px 20px 10px 20px;
}
.textBackgroundPage {
	padding: 4.5vh;
	border-radius: 0 0 10px 10px;
	border: 1px solid;
	border-color: var(--color-grey2);
	height: auto;
	overflow-y: auto;
	overflow-x: hidden;
	background-color: var(
		--color-white
	); /* box-shadow: 0 4px 8px 0 var(--color-grey3), 0 6px 20px 0 var(--color-grey3); */
}
.textBackground-Instruction {
	background-color: var(--color-grey1);
	padding: 30px 61px 30px 61px; /* margin: 0; */
	border-left: 1px solid var(--color-grey2);
	border-right: 1px solid var(--color-grey2);
	top: 0;
	position: relative;
}
.textBackground-Credits {
	background-color: var(--color-grey6); /* height: 100%;
      width: 100%; */
	opacity: 0.75; /* margin: 0; */
}
.pageHeader {
	/* box-shadow: 0 4px 8px 0 var(--color-grey3), 0 6px 20px 0 var(--color-grey3); */
	border-radius: 10px 10px 0 0;
	background-color: var(--color-grey6);
	padding: 14px 20px 18px 20px;
}
.pageHeaderText {
	color: var(--color-white);
	font-family: "Roboto", sans-serif;
	font-weight: 300;
	font-style: normal;
	font-size: 1.5em;
	display: inline;
	padding-left: 15px;
	vertical-align: middle;
}
.pagePadding {
	padding: 60px;
}
.pageBaseWrapper {
	margin: 9.185vh;
	box-shadow: 0 4px 8px 0 var(--color-grey3), 0 6px 20px 0 var(--color-grey3);
}
.pageBase {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto 1fr;
	align-items: stretch;
	width: 100%;
	height: 100%;
	padding: 9.185vh 9.185vh 9.185vh 9.185vh;
	border-radius: 10px 10px 10px 10px;
	margin: 0;
	position: relative;
}
.span_Box1_CBP {
	grid-column-start: 1;
	grid-column-end: span 1;
	grid-row-start: 1;
	grid-row-end: span 1;
}
.span_Box2_CBP {
	grid-column-start: 1;
	grid-column-end: span 1;
	grid-row-start: 2;
	grid-row-end: span 1;
	/* the following is to fix a bug that causes scrolling to the top in Safari */
	position: absolute;
	height: 100%;
	width: 100%;
}
.pageHeader.span_Box1_CBP {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.articleTitleBackground {
	background-color: var(--color-grey1);
	margin: 0px 20px 40px 0px;
	padding: 20px;
}
.dotRed {
	background-color: var(--color-red2);
}
.dotOrange {
	background-color: var(--color-orange2);
}
.dotYellow {
	background-color: var(--color-yellow2);
}
.dotGreen {
	background-color: var(--color-green2);
}
.dotTeal {
	background-color: var(--color-teal2);
}
.dotBlue {
	background-color: var(--color-blue2);
}
.dotIndigo {
	background-color: var(--color-indigo2);
}
.dotViolet {
	background-color: var(--color-purple2);
}
/* ===
Page styles - vh
== */
.grid_CaseBase {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: min-content 1fr;
	align-items: stretch;
	width: 100%;
	height: 100%;
	margin: 0;
	position: relative;
  padding: 6vh;
  border-radius: 0;
}
.grid_CaseBase_Mini {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: min-content 1fr;
	align-items: stretch;
	width: 100%;
	height: 100%;
	margin: 0;
	position: relative;
  padding: 0vh;
  border-radius: 0;
}
.div_Header {
	background-color: var(--color-grey6);
	padding: 2vh 4.5vh 2vh 4.5vh;
	border: 0.2vh solid var(--color-grey7);
  border-radius: 1.5vh 1.5vh 0 0;
}
.div_PageBackground {
	position: absolute;
	height: 100%;
	width: 100%;
	padding: 4.5vh;
	border: 0.2vh solid var(--color-grey2);
	overflow-y: auto;
	overflow-x: hidden;
	background-color: var(--color-white);
  border-radius: 0 0 1.5vh 1.5vh;
}
.div_Summary_Submit {
  background-color:var(--color-grey1);
  border-right: 0.2vh solid var(--color-grey2);
  border-left: 0.2vh solid var(--color-grey2);
  border-bottom: 0.2vh solid var(--color-grey2);
  padding:2vh 4.5vh 2vh 4.5vh;
  border-radius: 0 0 1.5vh 1.5vh;
}
@media (min-width: 640px), (max-width: 640px) {
	.div_Header_MQ {
		border-radius: 0;
	}
}
@media (min-width: 640px), (max-width: 640px) {
	.div_PageBackground_MQ {
		border-radius: 0;
	}
}
@media (min-width: 640px), (max-width: 640px) {
	.grid_CaseBase_MQ {
		padding: 0;
		border-radius: 0;
	}
}
@media (min-width: 640px), (max-width: 640px) {
	.div_Submit_MQ {
		border-radius: 0;
	}
}
@media (min-width: 880px) {
	.div_Header_MQ {
		border-radius: 1.5vh 1.5vh 0 0;
	}
}
@media (min-width: 880px) {
	.div_PageBackground_MQ {
		border-radius: 0 0 1.5vh 1.5vh;
	}
}
@media (min-width: 880px) {
	.grid_CaseBase_MQ {
		padding: 6vh;
		border-radius: 0;
	}
}
@media (min-width: 880px) {
	.div_Submit_MQ {
		border-radius: 0 0 1.5vh 1.5vh;
	}
}
.item1_CaseBase_Header {
	grid-column-start: 1;
	grid-column-end: span 1;
	grid-row-start: 1;
	grid-row-end: span 1;
}
.item2_CaseBase_PageBackground {
	grid-column-start: 1;
	grid-column-end: span 1;
	grid-row-start: 2;
	grid-row-end: span 1;
}
.grid_CaseBase_Summary {
	grid-template-rows:min-content min-content 1fr .2fr;
}
.item2_CaseBase_Summary_Instruction {
  grid-column-start:1;
  grid-column-end:span 1;
  grid-row-start:2;
  grid-row-end:span 1;
}
.div_Summary_Instruction {
  padding:2vh 4.5vh 2vh 4.5vh;
  background-color:var(--color-grey1);
  border-right: 0.2vh solid var(--color-grey2);
  border-left: 0.2vh solid var(--color-grey2);
}
.item3_CaseBase_Summary_Questions {
  grid-column-start:1;
  grid-column-end:span 1;
  grid-row-start:3;
  grid-row-end:span 1;
}
.div_Summary_Questions {
  padding:2vh 4.5vh 2vh 4.5vh;
  overflow-y:auto;
  overflow-x:hidden;
  background-color:var(--color-white);
  border: 0.2vh solid var(--color-grey2);
  border-radius:0;
}
.item4_CaseBase_Summary_Submit {
  grid-column-start:1;
  grid-column-end:span 1;
  grid-row-start:4;
  grid-row-end:span 1;
  display:flex;
}
.item5_CaseBase_Summary_button_Begin {
  grid-column-start:1;
  grid-column-end:2;
  grid-row-start:3;
  grid-row-end:4;
  justify-self:center;
  align-self:center;
}
.item6_CaseBase_Summary_AnchorPopperScroll {
  grid-column-start:1;
  grid-column-end:2;
  grid-row-start:3;
  grid-row-end:4;
  max-width:8vh;
  max-height:6vh;
  justify-self:end;
  align-self:start;
}
.item7_CaseBase_Summary_AnchorPopperReview {
  grid-column-start:1;
  grid-column-end:2;
  grid-row-start:1;
  grid-row-end:2;
  max-width:2vh;
  position:static;
  justify-self:end;
}
.dot {
	height: 2.5vh;
	width: 2.5vh;
	border-radius: 50%;
	display: inline-block;
	vertical-align: middle;
}
.text_Header {
	color: var(--color-white);
	font-family: "Roboto", sans-serif;
	font-weight: 300;
	font-style: normal;
	font-size: 1.5em;
	display: inline;
	padding-left: 1.5vh;
	vertical-align: middle;
}
.text_Summary_Question_Title {
  margin:0 0 var(--length1) 0;
  color:#000000;
  font-weight:800;
  padding: 0 0 0.7vh 0;
}
.text_Summary_Question {
  margin:0 0 var(--length2) 0;
  font-weight:400;
  color:rgb(57, 58, 57);
  padding: 0 0 1.5vh 0;
}

/* ==
link styles
== */
.linkGlossaryTerm {
	color: var(--color-orange5);
	font-weight: bold;
	text-decoration: none;
}
.linkGlossaryTerm:visited {
	color: var(--color-orange5);
}
.linkGlossaryTerm:hover,
visited {
	color: var(--color-orange5);
}
.linkGlossaryTerm-underlined {
	text-decoration: underline;
}
/* Regular <a> tag links */
a {
	color: var(--color-blue5);
	text-decoration: underline;
}
a:hover {
	color: var(--color-blue3);
}
a:visited {
	color: var(--color-purple4);
}
a:hover,
visited {
	color: var(--color-blue3);
}
/* Button Links (btn = button) */
.btn-link {
	padding: 0;
	font-size: 0.95em;
	color: var(--color-blue5);
	text-decoration: underline;
}
.btn-link:hover {
	color: var(--color-blue3);
}
.btn-link:visited {
	color: var(--color-purple4);
}
.btn-link:hover,
visited {
	color: var(--color-blue3);
}
/* ==
placeholder styles
== */
.placeholderWindow {
	margin: 0;
}
.placeholderTemplateBorder {
	border: 2px solid var(--color-grey3);
	max-width: 100%;
	height: 100%;
}
/* ==
 table styles
 == */
/* ======== Start - Tables (Renee) ======== */
/* Table: General */
table {
	width: 100%;
}
table,
th,
td {
	/* table = whole table; th = table headers; td = table rows */
	border: 0.3vh solid var(--color-white);
	border-collapse: collapse;
	text-align: center;
	font-weight: normal;
	padding-top: 0.7vh;
	padding-right: 0.7vh;
	padding-bottom: 0.7vh;
	padding-left: 0.7vh;
}
.th-LowSameHigh {
	width: 10%;
}
.tableCaseSpecific-CellRepiration {
	width: 14.285714285714286%;
}
.tableCaseSpecific-Diffusion-Data1 {
	width: 18%;
}
.tableCaseSpecific-Diffusion-Data2 {
	width: 10%;
}
.tableCaseSpecific-Diffusion-Data3 {
	width: 5%;
}
.unitsOfMeasure {
	/* Scales down the font size for units of measure mM, mmHg, Microns, etc */
	font-size: 0.75em;
}
/* Special Tabel Styles */
.th1emptyNoTLBoarder {
	/* no border on the Top/Left */
	border-top: 3px solid var(--color-transparent);
	border-left: 3px solid var(--color-transparent);
}
.th1emptyNoTRLBoarder {
	/* no border on the Top/Right/Left */
	border-top: 3px solid var(--color-transparent);
	border-left: 3px solid var(--color-transparent);
	border-right: 3px solid var(--color-transparent);
}
.th1emptyNoRBLBoarder {
	/* no border on the Right/Bottom/Left */
	border-right: 3px solid var(--color-transparent);
	border-bottom: 3px solid var(--color-transparent);
	border-left: 3px solid var(--color-transparent);
}
.th1emptyNoTRBLBoarder {
	border: 3px solid var(--color-transparent);
}
.thTabT {
	/* Tab effect on Top of cell */
	border-radius: 20px 20px 0 0;
}
.thTabB {
	/* Tab effect on Bottom of cell */
	border-radius: 0 0 20px 20px;
}
.td1-BackgroundColorSplit70 {
	background: linear-gradient(
		to left,
		var(--color-grey1) 70%,
		var(--color-transparent) 0%
	);
}
/* Tabel Headers */
.th1,
.tableHeader_grey,
.grey3 {
	/* this is the 1st cell in a column */
	background-color: rgb(204, 204, 204);
}
.th2,
.tableHeader_red,
.red3 {
	/* this is the 2nd cell in a column */
	background-color: var(--color-red3);
}
.th3,
.tableHeader_orange,
.orange3 {
	/* this is the 3rd cell in a column */
	background-color: var(--color-orange3);
}
.th4,
.tableHeader_yellow,
.yellow2 {
	/* this is the 4th cell in a column */
	background-color: var(--color-yellow2);
}
.th5,
.tableHeader_green,
.green2 {
	/* this is the 5th cell in a column */
	background-color: var(--color-green2);
}
.th6,
.tableHeader_teal,
.teal3 {
	/* this is the 6th cell in a column */
	background-color: var(--color-teal3);
}
.th7,
.tableHeader_blue,
.blue2 {
	/* this is the 7th cell in a column */
	background-color: var(--color-blue2);
}
.th8,
.tableHeader_indigo,
.indigo2 {
	/* this is the 8th cell in a column */
	background-color: var(--color-indigo2);
}
.th9,
.tableHeader_purple,
.purple3 {
	/* this is the 9th cell in a column */
	background-color: var(--color-purple3);
}
.th10,
.tableHeader_pink,
.pink3 {
	/* this is the 10th cell in a column */
	background-color: var(--color-pink3);
}
/* Tabel Rows */
.td1,
.tableData_grey,
.grey1 {
	/* this is the 1st cell in a row */
	background-color: rgb(234, 234, 234);
}
.td2,
.tableData_red,
.red1 {
	/* this is the 2nd cell in a row */
	background-color: var(--color-red1);
}
.td3,
.tableData_orange,
.orange1 {
	/* this is the 3rd cell in a row */
	background-color: var(--color-orange1);
}
.td4,
.tableData_yellow,
.yellow1 {
	/* this is the 4th cell in a row */
	background-color: var(--color-yellow1);
}
.td5,
.tableData_green,
.green1 {
	/* this is the 5th cell in a row */
	background-color: var(--color-green1);
}
.td6,
.tableData_teal,
.teal1 {
	/* this is the 6th cell in a row */
	background-color: var(--color-teal1);
}
.td7,
.tableData_blue,
.blue1 {
	/* this is the 7th cell in a row */
	background-color: var(--color-blue1);
}
.td8,
.tableData_indigo,
.indigo1 {
	/* this is the 8th cell in a row */
	background-color: var(--color-indigo1);
}
.td9,
.tableData_purple,
.purple1 {
	/* this is the 9th cell in a row */
	background-color: var(--color-purple1);
}
.td10,
.tableData_pink,
.pink1 {
	/* this is the 10th cell in a row */
	background-color: var(--color-pink1);
}
.arrowInTable {
	width: 25%;
	height: 25%;
}
/* Exclusive for grid_Table */
.border-bottom-right-radius_GridTable {
	border-bottom-right-radius: 1vh;
}
.border-bottom-left-radius_GridTable {
	border-bottom-left-radius: 1vh;
}
.border-top-left-radius_GridTable {
	border-top-left-radius: 1vh;
}
.border-top-right-radius_GridTable {
	border-top-right-radius: 1vh;
}
/* Exclusive for all other tables (not made using css grid) */
.border-bottom-right-radius_Table {
	border-bottom-right-radius: 1.5vh;
}
.border-bottom-left-radius_Table {
	border-bottom-left-radius: 1.5vh;
}
.border-top-left-radius_Table {
	border-top-left-radius: 1.5vh;
}
.border-top-right-radius_Table {
	border-top-right-radius: 1.5vh;
}
/* * put this before margin classes so they can override margin: 0 */
.no-border {
	border: 0;
	padding: 0;
	margin: 0;
	width: 100%;
	min-height: 25px;
}
:root {
	/* ==== Lengths ==== */
	--length1: 0.7vh; /* 10.8px/2=5.4px */
	--length2: 1.5vh; /* 21.6px/2=10.8px */
	--length3: 3vh; /* 43.2px/2=21.6px */
	--length4: 4.5vh; /* 64.8px/2=32.4px */
}
/* * margins for grid */
.marginBottom1 {
	/* Used between label and associated element */
	margin-bottom: var(--length1);
}
.marginBottom2 {
	/* Used for elements that are associated with each other */
	margin-bottom: var(--length2);
}
.marginBottom3 {
	/* Used for elements not associated with each other */
	margin-bottom: var(--length3);
}
.marginBottom4 {
	/* Used for spacing between edge of layout and page content */
	margin-bottom: var(--length4);
}
/* marginRight */
.marginRight1 {
	margin-right: var(--length1);
}
.marginRight2 {
	margin-right: var(--length2);
}
.marginRight3 {
	margin-right: var(--length3);
}
.marginRight4 {
	margin-right: var(--length4);
}
/* marginLeft */
.marginLeft1 {
	margin-left: var(--length1);
}
.marginLeft2 {
	margin-left: var(--length2);
}
.marginLeft3 {
	margin-left: var(--length3);
}
.marginLeft4 {
	margin-left: var(--length4);
}
/* marginTop */
.marginTop1 {
	margin-top: var(--length1);
}
.marginTop2 {
	margin-top: var(--length2);
}
.marginTop3 {
	margin-top: var(--length3);
}
.marginTop4 {
	margin-top: var(--length4);
}
/* ==
scaling
== */
.scaleBy90Percent {
	transform: scale(0.9);
}
.scaleBy80Percent {
	transform: scale(0.8);
}
.scaleBy75Percent {
	transform: scale(0.75);
}
.scaleBy70Percent {
	transform: scale(0.7);
}
.scaleBy60Percent {
	transform: scale(0.6);
}
.scaleBy50Percent {
	transform: scale(0.5);
}
.scaleBy45Percent {
	transform: scale(0.45);
}
.scaleBy40Percent {
	transform: scale(0.4);
}
.scaleBy30Percent {
	transform: scale(0.3);
}
.scaleBy25Percent {
	transform: scale(0.25);
}
.scaleBy20Percent {
	transform: scale(0.2);
}
.scaleBy10Percent {
	transform: scale(0.1);
}
/* ==
image styles
== */
img {
	max-width: 100%;
	max-height: 100%;
}
.backgroundImage {
	background-size: cover;
	resize: both;
	position: absolute;
	z-index: -1;
	height: 100%;
	width: 100%;
	padding: 0;
	overflow: hidden;
}
/* Unsure of how to get the images to be positioned at the bottom of the page */
.hero-image {
	background: linear-gradient(rgba(17, 18, 17, 0.45), rgba(17, 18, 17, 0.45)),
		url("http://dev.cogenteducation.com/public/WebStyle/img/labBlurredScreenshot.png");
	height: 100%;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;
}
.imageGaLogo {
	position: absolute;
	right: 30px;
	bottom: 30px;
	height: 15%;
}
.imageNIHLogo {
	position: absolute;
	right: 30px;
	bottom: 200px;
	height: 3%;
}
.placeholderImage-FurtherResearch {
	background-color: var(--color-pink2);
	margin: 0px 0px 40px 20px;
	padding: 20px;
}
/* ==
//lines and boxes
== */
.colorBox {
	width: 100%;
	height: 100%;
}
.line {
	width: 100%;
	height: 0.2vh;
}
.vLine {
	height: 100%;
	width: 2px;
	min-height: 2px;
}
/* ==
//arrow heads
== */
.arrowDown {
	background: url(./assets/svg/arrowDown.svg);
	background-repeat: no-repeat;
	width: 10px;
	height: 10px;
}
.arrowLeft {
	background: url(./assets/svg/arrowLeft.svg);
	background-repeat: no-repeat;
	width: 10px;
	height: 10px;
}
.arrowRight {
	background: url(./assets/svg/arrowRight.svg);
	background-repeat: no-repeat;
	width: 10px;
	height: 10px;
}
.arrowUp {
	background: url(./assets/svg/arrowUp.svg);
	background-repeat: no-repeat;
	width: 10px;
	height: 10px;
}
.horizontalArrow {
	display: flex;
	align-items: center;
	flex-direction: row;
}
.verticalArrow {
	display: flex;
	align-items: center;
	flex-direction: column;
}
</style>

