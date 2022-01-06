import grapesjs from "grapesjs";

import { AddPageIDToString } from "../blocks";

export default (bm: grapesjs.BlockManagerInstance, config) => {
	bm.add("unlock-page", {
		label: "Unlock Next Page",
		category: "Basic",
		attributes: { class: "fa fa-unlock-alt" },
		content: AddPageIDToString(`
		<container-enable-disable :visible="true" :enabled="true" id="izg4" :conditions="{conditionList:[{evaluateWhen:'pageLoads',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'unlockNextPage'},fireOnceID:'unlockNext_',delay:5}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="ED_UnlockNextPage_OnPageLoad " data-gjs-custom-name="ED_UnlockNextPage_OnPageLoad">
</container-enable-disable>
		<style>
		.ED_UnlockNextPage_OnPageLoad.$$pageID$$ {
			min-height:0px;
		}		  
		</style>`)
	});
	bm.add("carousel", {
		label: "Carousel_3_Pages",
		category: "Clusters: Functionality",
		attributes: {
			class: "fa fa-exchange-alt"
		},
		content: AddPageIDToString(`
		<div class="grid_Carousel" data-gjs-custom-name="grid_Carousel">
			<container-show-hide :visible="true" id="ici9" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ici9',key:'visible',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iiuqk',key:'visible',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ip2ck',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'il1ox',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="imageContainer slide1" data-gjs-custom-name="sh_1"></container-show-hide>
			<container-show-hide :visible="false" id="iwfe" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iwfe',key:'visible',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iiuqk',key:'visible',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ip2ck',key:'visible',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'il1ox',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="imageContainer slide2" data-gjs-custom-name="sh_2"></container-show-hide>
			<container-show-hide :visible="false" id="iu0n" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iu0n',key:'visible',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iiuqk',key:'visible',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ip2ck',key:'visible',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'il1ox',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="imageContainer slide3" data-gjs-custom-name="sh_3"></container-show-hide>
			<div class="grid_T21" data-gjs-custom-name="grid_T21_arrows">
				<container-show-hide :visible="false" id="iiuqk" class="SH_PageUnlockedCheckpoint" data-gjs-custom-name="SH_PageUnlockedCheckpoint"></container-show-hide>
				<div class="item1_T21" data-gjs-custom-name="item1_T21">
					<widget-button :visible="false" :enabled="true" id="ip2ck" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'il1ox',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iwfe',key:'visible',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iwfe',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ici9',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iu0n',key:'visible',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iu0n',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iwfe',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="arrowButton buttonCarousel_Arrow left" data-gjs-custom-name="button_left"></widget-button>
				</div>
				<div class="item2_T21" data-gjs-custom-name="item2_T21">
					<widget-button :visible="false" :enabled="true" id="il1ox" :conditions="{conditionList:[{evaluateWhen:'pageLoads',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'il1ox',key:'visible',val:true},fireOnceID:'buttonShow_',delay:3}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iwfe',key:'visible',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iwfe',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iu0n',key:'visible',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'il1ox',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ip2ck',key:'visible',val:true},fireOnceID:'buttonLeftFirstShow_',delay:3},{effectData:{effectType:'removeClasses',widgetID:'il1ox',classes:'buttonBgImgBlinkBlue '},fireOnceID:'',delay:0},{effectData:{effectType:' unlockNextPage'},fireOnceID:'nextPageUnlock_',delay:3},{effectData:{effectType:'updateWidget',widgetID:'iiuqk',key:'visible',val:true},fireOnceID:'',delay:3}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ici9',key:'visible',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ici9',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iwfe',key:'visible',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'il1ox',key:'visible',val:false},fireOnceID:'sh1_hideRight_once_',delay:0},{effectData:{effectType:'updateWidget',widgetID:'il1ox',key:'visible',val:true},fireOnceID:'sh1_showRight_once_',delay:3}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="arrowButton buttonCarousel_Arrow right buttonBgImgBlinkBlue" data-gjs-custom-name="button_right"></widget-button>
				</div>
			</div>
		</div>
		<style>
		.grid_Carousel.$$pageID$$ {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;
			height: 100%;
			width: 100%;
		}

		.imageContainer.$$pageID$$ {
			height: 100%;
			width: 100%;
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 2;
		}

		.slide1.$$pageID$$ {
			background-repeat: no-repeat;
			background-attachment: local;
			background-position: center center;
			background-size: cover;
		}

		.slide2.$$pageID$$ {
			background-repeat: no-repeat;
			background-attachment: local;
			background-position: center center;
			background-size: cover;
		}

		.slide3.$$pageID$$ {
			background-repeat: no-repeat;
			background-attachment: local;
			background-position: center center;
			background-size: cover;
		}

		.grid_T21.$$pageID$$ {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;
			width: 100%;
			height: 100%;
			padding: 6vh;
			position: absolute;
			pointer-events: none;
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 2;
		}

		.item1_T21.$$pageID$$ {
			grid-column-start: 1;
			grid-column-end: span 1;
			grid-row-start: 1;
			grid-row-end: span 1;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
		}

		.item2_T21.$$pageID$$ {
			grid-column-start: 1;
			grid-column-end: span 1;
			grid-row-start: 1;
			grid-row-end: span 1;
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			justify-content: center;
		}

		.arrowIcon.$$pageID$$ {
			width: 9vh;
		}

		.arrowButton.$$pageID$$ {
			z-index: 10;
			width: 9vh;
			height: 9vh;
			pointer-events: auto;
		}

		.SH_PageUnlockedCheckpoint.$$pageID$$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 2;
			justify-self: start;
			align-self: end;
			height: 0vh;
			width: 0vh;
		}
		</style>
		`)
	});

	bm.add("next-text-sh", {
		label: "Next Text SH",
		category: "Clusters: Functionality",
		attributes: {
			class: "fa fa-exchange-alt"
		},
		content: AddPageIDToString(`
		<div class="div_Text2" data-gjs-custom-name="div_Text2">
			<widget-button :visible="true":enabled="true"id="ietr":click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ietr',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ihxs',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}"class="buttonBasic-Grey buttonBlinkBlue marginTop2" data-gjs-custom-name="button_Next">
				<p class=""data-gjs-custom-name="text">Next</p>
			</widget-button>
			<container-show-hide :visible="true"id="ihxs"class=""data-gjs-custom-name="SH_Text2">
				<p class=""data-gjs-custom-name="text_2">Body text</p>
			</container-show-hide>
		</div>
		<style>
		.div_Text2.$pageID$ {
			height: auto;
		}
		</style>
		`)
	});

	bm.add("next-textbox-sh", {
		label: "Next TextBox SH",
		category: "Clusters: Functionality",
		attributes: {
			class: "fa fa-exchange-alt"
		},
		content: AddPageIDToString(`
		<div class="div_NextTextBox_SH" data-gjs-custom-name="div_NextTextBox_SH"><widget-button :visible="true" :enabled="true" id="if6w" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'if6w',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i1zz',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue" data-gjs-custom-name="button_Next"><p class="" data-gjs-custom-name="text">Next</p></widget-button><container-show-hide :visible="false" id="i1zz" class="dropShadow textBackgroundBasic" data-gjs-custom-name="SH_TextBlock"><p class="" data-gjs-custom-name="Text">Text Box Basic</p></container-show-hide></div><style>.div_NextTextBox_SH.$$pageID$$ {display:flex;flex-direction:row;justify-content:center;align-items:center;}</style>
		`)
	});

	bm.add("playReplay_Text", {
		label: "div_PlayReplay",
		category: "Clusters: Functionality",
		attributes: { class: "fa fa-play" },
		content: AddPageIDToString(`
		<div class="textBackground-DarkBlue div_PlayReplay" data-gjs-custom-name="div_PlayReplay">
		<widget-button :visible="true" :enabled="true" id="ibhk" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:null,key:'playState',val:'play'},fireOnceID:'',delay:0},{effectData:{effectType:'removeClasses',widgetID:'ibhk',classes:'buttonBgImgBlinkBlue '},fireOnceID:'RemoveButtonBlinkBlueFromPlayOnClick_$$pageID$$',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonPlay buttonBgImgBlinkBlue" data-gjs-custom-name="button_Play">
		</widget-button>
		<widget-button :visible="false" :enabled="true" id="ixw1" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:null,key:'playState',val:'stop'},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:null,key:'playState',val:'play'},fireOnceID:'',delay:0.05}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonReplay" data-gjs-custom-name="button_Replay">
		</widget-button>
		<p class="text_PlayReplay" data-gjs-custom-name="text">text
		</p>
		</div>
	  <style>
	  .div_PlayReplay.$$pageID$$ {
		display:flex;
		flex-direction:row;
		align-items:center;
		width:auto;
		padding:1.5vh;
		border-width:0.2vh;
		border-style:solid;
		border-image-source:initial;
		border-image-slice:initial;
		border-image-width:initial;
		border-image-outset:initial;
		border-image-repeat:initial;
		border-radius:1.5vh	  
	  }
	  .text_PlayReplay.$$pageID$$ {
		margin-left:1.5vh;
	  }
	</style>
		  `)
	});

	bm.add("playReplay_animated svg", {
		label: "div_PlayReplay_JSON",
		category: "Clusters: Functionality",
		attributes: { class: "fa fa-play" },
		content: AddPageIDToString(`
		<div id="inh38" class="playReplayBlock" data-gjs-custom-name="div_PlayReplay_JSON">
		<widget-animated-svg src="/img/placeholders/placeholderAnimatedSVG.json" :visible="true" :loop="false" :autoplay="false" :speed="1"
		id="i4ge" play-state="default" :end-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],
		comparisonsLogic:'and',
		effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iewi',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="animatedSVG" data-gjs-custom-name="JSON">
		</widget-animated-svg>
		<div class="playReplayGroup textBackground-DarkBlue marginLeft2 marginRight2 marginBottom2" data-gjs-custom-name="div_PlayReplay">
		  <widget-button :visible="false" :enabled="true" id="iewi" :click-effects="{
			  conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',
			  effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i4ge',key:'playState',val:'stop'},fireOnceID:'',delay:0},
			  {effectData:{effectType:'updateWidget',widgetID:'i4ge',key:'playState',val:'play'},fireOnceID:'',delay:0.05}
		  	,{effectData:{effectType:'updateWidget',widgetID:'iewi',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonReplay buttonOverlay" data-gjs-custom-name="button_Replay">
		  </widget-button>
		  <widget-button :visible="true" :enabled="true" id="i2cg" :click-effects="{conditionList:[
			  {evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',
			  effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i4ge',key:'playState',val:'play'},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i2cg',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonPlay buttonOverlay" data-gjs-custom-name="button_Play">
		  </widget-button>
		  <p class="text_PlayReplay" data-gjs-custom-name="text">text</p>
		</div>
	  </div>
	  <style>
	  .playReplayBlock.$$pageID$$
		{
			display:block;
		}
	  .playReplayGroup.$$pageID$$ {
		z-index:10;
		bottom: 0;
		position:absolute;
		float:right;
		display:flex;
		flex-direction:row;
		align-items:center;
		width:auto;
		padding:1.5vh;
		border-width:0.2vh;
		border-style:solid;
		border-image-source:initial;
		border-image-slice:initial;
		border-image-width:initial;
		border-image-outset:initial;
		border-image-repeat:initial;
		border-radius:1.5vh	  
	  }
	  .text_PlayReplay.$$pageID$$ {
		margin-left:1.5vh;
	  }
	</style>
		  `)
	});
	bm.add("playReplay_animated sim", {
		label: "div_PlayReplay_Sim",
		category: "Clusters: Functionality",
		attributes: { class: "fa fa-play" },
		content: AddPageIDToString(`
		<div id="inh38" class="playReplayBlock" data-gjs-custom-name="div_PlayReplay_Sim">
		<widget-sim-view id="i9tf" scenename="setScene" simstateid="setID" :visible="true" :enabled="true" play-state="default"
		:end-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',
		effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iewi',key:'visible',val:true},fireOnceID:'',delay:0}],
		effectsFail:[],
		responsesPass:[],responsesFail:[]}]}"
		class="simPreview" data-gjs-custom-name="widget_Sim">
		</widget-sim-view>
		<div class="playReplayGroup textBackground-DarkBlue marginLeft2 marginRight2 marginBottom2" data-gjs-custom-name="div_PlayReplay">
		  <widget-button :visible="false" :enabled="true" id="iewi" :click-effects="
			  {conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],
			  comparisonsLogic:'and',
			  effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i9tf',key:'playState',val:'stop'},fireOnceID:'',delay:0},
			  {effectData:{effectType:'updateWidget',widgetID:'i9tf',key:'playState',val:'play'},fireOnceID:'',delay:0.05},
			  {effectData:{effectType:'updateWidget',widgetID:'iewi',key:'visible',val:false},fireOnceID:'',delay:0}],
			  effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonReplay buttonOverlay" data-gjs-custom-name="button_Replay">
		  </widget-button>
		  <widget-button :visible="true" :enabled="true" id="i2cg"
				  :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',
				  effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i9tf',key:'playState',val:'play'},fireOnceID:'',delay:0},
				  {effectData:{effectType:'updateWidget',widgetID:'i2cg',key:'visible',val:false},fireOnceID:'',delay:0}],
				  effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonPlay buttonOverlay" data-gjs-custom-name="button_Play">
		  </widget-button>
		  <p class="text_PlayReplay" data-gjs-custom-name="text">text</p>
		</div>
	  </div>
	  <style>
	  .playReplayBlock.$$pageID$$
		{
			display:block;
		}
		.playReplayGroup.$$pageID$$ {
			z-index:10;
			bottom: 0;
			position:absolute;
			float:right;
			display:flex;
			flex-direction:row;
			align-items:center;
			width:auto;
			padding:1.5vh;
			border-width:0.2vh;
			border-style:solid;
			border-image-source:initial;
			border-image-slice:initial;
			border-image-width:initial;
			border-image-outset:initial;
			border-image-repeat:initial;
			border-radius:1.5vh	  
		  }
		  .text_PlayReplay.$$pageID$$ {
			margin-left:1.5vh;
		  }
	</style>
		  `)
	});
	bm.add("drag_start", {
		label: "Drag Start",
		category: "Clusters: Functionality",
		attributes: { class: "fa fa-arrows-alt" },
		content: AddPageIDToString(`
			<div class="div_DragStart" data-gjs-custom-name="div_DragStart">
				<div class="div_StartingDropText noSelect" data-gjs-custom-name="div_StartingDropText">
					<p class="text_DragNumbers" data-gjs-custom-name="text_DragNumbers">1</p>
				</div>
				<widget-drop :visible="true" :enabled="true" :max-children="1" overflow-style="reset-child" id="iyo7" class="startingDrop_Appearance" data-gjs-custom-name="startingDrop_1"></widget-drop>
				<widget-drag :visible="true" :enabled="true" id="ijyy" :child-index="0" drop-id="iyo7" class="drag_Appearance dragButtons_Appearance" data-gjs-custom-name="drag_1">
					<div class="div_DragFiller" data-gjs-custom-name="div_DragFiller">
						<p class="text_DragNumbers" data-gjs-custom-name="text_DragNumbers">1</p>
					</div>
				</widget-drag>
			</div>
			<style>
			.drag_Appearance.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				justify-self: center;
				align-self: center;
				padding: 0 0 0 0;
				width: 15vh;
				height: 10vh;
			}
			.startingDrop_Appearance.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				justify-self: center;
				align-self: center;
				width: 16vh;
				height: 10vh;
				padding: 0 0 0 0;
				background-color: #ffffff40;
				color: #ffffff80;
				border: 0.6vh solid #ffffff80;
				border-radius: 1.3vh;
			}
			.div_DragStart.$$pageID$$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr;
			}
			.div_DragFiller.$$pageID$$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr;
				width: 15vh;
				height: 10vh;
				color: black;
			}
			.div_StartingDropText.$$pageID$$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr;
				width: 15vh;
				height: 10vh;
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				justify-self: center;
				align-self: center;
				color: #d9d9d9;
			}
			.text_DragNumbers.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				justify-self: center;
				align-self: center;
				font-size: 5vh;
				width: auto;
				height: auto;
			}
			</style>
		`)
	});
	bm.add("drag_end", {
		label: "Drag End",
		category: "Clusters: Functionality",
		attributes: { class: "fa fa-square-o" },
		content: AddPageIDToString(`
			<widget-drop :visible="true" :enabled="true" :max-children="1" overflow-style="reset-child" id="i457u" class="drop_Appearance drop_1 " data-gjs-custom-name="drop_end">
				<container-show-hide :visible="true" id="i88jo" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'dropsHaveDrags',dropIDs:['i457u']}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i88jo',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'i88jo',key:'visible',val:true},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}]}" class="SH_DropHere " data-gjs-custom-name="SH_DropHere1">
					<p class="textCenter text_DropHere " data-gjs-custom-name="text_DropHere">Drop<br class="" data-gjs-custom-name="Br">​​​​​​​Here<br class="" data-gjs-custom-name="Br"></p>
				</container-show-hide>
			</widget-drop>
			<style>
			.drop_Appearance.$$pageID$$ {
				border-radius: 1.3vh;
				border: 0.6vh solid var(--color-grey2);
				background-color: var(--color-white);
				width: 16vh;
				height: 10vh;
				padding: 0 0 0 0;
			}
			
			.text_DropHere.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				justify-self: center;
				align-self: center;
				color: #999999;
			}
			
			.SH_DropHere.$$pageID$$ {
				width: 16vh;
				height: 8.75vh;
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				justify-self: center;
				align-self: center;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
			</style>
		`)
	});
};
