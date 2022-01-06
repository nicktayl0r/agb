import grapesjs from "grapesjs";

import { AddPageIDToString } from "../blocks";

export default (bm: grapesjs.BlockManagerInstance, config) => {

	bm.add("top-text-db", {
		label:
			"<img src='./img/blocks/blockIcon_TopText_DarkBlue.jpg'></img><br>Top Text Dark Blue",
		category: "Layout: General",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`
			<div class="grid_T4 " data-gjs-custom-name="grid_T4_TextTop">
				<div class="item1_T4 dropShadow textBackgroundBasic textBackground-DarkBlue " data-gjs-custom-name="item1_T4">
					<p class="" data-gjs-custom-name="text_basic_BackgroundDarkBlue">Text Box Blue</p>
				</div>
			</div>
			<style>
			.grid_T4.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: min-content 1fr;
				grid-column-gap: 0vh;
				grid-row-gap: 0vh;
				width: 100%;
				height: 100%;
				padding: 6vh;
				background-image: url();
				background-repeat: no-repeat;
				background-attachment: local;
				background-position: center center;
				background-size: cover;
			}
			.item1_T4.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}
			</style>
		`)
	});

	bm.add("top-text-white", {
		label:
			"<img src='./img/blocks/blockIcon_TopText_White.jpg'></img><br>Top Text White",
		category: "Layout: General",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`
			<div class="grid_T4" data-gjs-custom-name="grid_T4_TextTop">
				<div class="item1_T4 dropShadow textBackgroundBasic" data-gjs-custom-name="item1_T4">
					<p class="" data-gjs-custom-name="text_basic_Background">Text Box White</p>
				</div>
			</div>
			<style>
			.grid_T4.$$pageID$$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: min-content 1fr;
				grid-column-gap: 0vh;
				grid-row-gap: 0vh;
				width: 100%;
				height: 100%;
				padding: 6vh;
				background-image: url();
				background-repeat: no-repeat;
				background-attachment: local;
				background-position: center center;
				background-size: cover;
			}
			.item1_T4.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}
			</style>
		`)
	});

	bm.add("top-text-db-bkgd", {
		label:
			"<img src='./img/blocks/blockIcon_TopText_DarkBlueBkg.jpg'></img><br>Top Text Dark Blue Background",
		category: "Layout: General",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`
			<div class="grid_T4" data-gjs-custom-name="grid_T4_TextTop">
				<div class="item1_T4 colorWhite" data-gjs-custom-name="item1_T4">
					<p class="" data-gjs-custom-name="text">Body text</p>
				</div>
			</div>
			<style>
			.grid_T4.$$pageID$$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: min-content 1fr;
				grid-column-gap: 0vh;
				grid-row-gap: 0vh;
				width: 100%;
				height: 100%;
				padding: 6vh;
				background-image: linear-gradient(#1B2937, #273D52);
			}
			.item1_T4.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}
			</style>
		`)
	});

	bm.add("top-text-3sh", {
		label:
			"<img src='./img/blocks/blockIcon_TopText_DarkBlue.jpg'></img><br>Top Text + 3 Show/Hide",
		category: "Layout: General",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`
			<div class="grid_T4 " data-gjs-custom-name="grid_T4_HandbookTextTop">
				<div class="item1_T4 dropShadow textBackgroundBasic textBackground-DarkBlue " data-gjs-custom-name="item1_T4">
					<p class=" text_Top1" data-gjs-custom-name="text_Top1">Text Box Blue
					</p>
					<widget-button :visible="false" :enabled="true" id="ia5w" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ia5w',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i4er',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue  marginTop2 button_text_Top_Next" data-gjs-custom-name="button_text_Top_Next">
						<p class="" data-gjs-custom-name="text">Next</p>
					</widget-button>
					<widget-button :visible="false" :enabled="true" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iyfuh',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i64rs',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" id="iyfuh" class="buttonBasic-Grey buttonBlinkBlue  marginTop2 button_text_Top_Next" data-gjs-custom-name="button_text_Top_Next2">
						<p class="" data-gjs-custom-name="text">Next</p>
					</widget-button>
					<widget-button :visible="false" :enabled="true" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iz80y',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ietvg',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" id="iz80y" class="buttonBasic-Grey buttonBlinkBlue  marginTop2 button_text_Top_Next" data-gjs-custom-name="button_text_Top_Next3">
						<p class="" data-gjs-custom-name="text">Next</p>
					</widget-button>
					<container-show-hide :visible="false" id="i4er" class=" text_Top2_SH" data-gjs-custom-name="text_Top2_SH">
						<p class=" text_Top2" data-gjs-custom-name="text_Top2">Text Box Blue
						</p>
					</container-show-hide>
					<container-show-hide :visible="false" id="i64rs" class=" text_Top3_SH" data-gjs-custom-name="text_Top3_SH">
						<p class=" text_Top3" data-gjs-custom-name="text_Top3">Text Box Blue
						</p>
					</container-show-hide>
					<container-show-hide :visible="false" id="ietvg" class=" text_Top4_SH" data-gjs-custom-name="text_Top4_SH">
						<p class=" text_Top4" data-gjs-custom-name="text_Top4">Text Box Blue
						</p>
					</container-show-hide>
				</div>
			</div>
			<style>
			.grid_T4.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: min-content 1fr;
				column-gap: 0vh;
				row-gap: 0vh;
				width: 100%;
				height: 100%;
				padding-top: 6vh;
				padding-right: 6vh;
				padding-bottom: 6vh;
				padding-left: 6vh;
			}

			.item1_T4.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}
			</style>
		`),
	});

	bm.add("fullscreen-video-layout", {
		label:
			"<img src='./img/blocks/blockIcon_m00_V2Top.jpg'></img><br>Fullscreen Video Layout",
		category: "Layout: General",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`
			<div class="grid_Main" data-gjs-custom-name="grid_Main">
				<div class="grid_T4" data-gjs-custom-name="grid_T4_HandbookTextTop">
					<div class="item1_T4 dropShadow textBackgroundBasic textBackground-DarkBlue" data-gjs-custom-name="item1_T4">
						<p class="text_1" data-gjs-custom-name="text_1">Body text</p>
					</div>
					<div class="textBackground-DarkBlue div_PlayReplay" data-gjs-custom-name="div_PlayReplay">
						<widget-button :visible="true" :enabled="true" id="ixug" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ife4',key:'playState',val:'play'},fireOnceID:'',delay:0},{effectData:{effectType:'removeClasses',widgetID:'ixug',classes:'buttonBgImgBlinkBlue '},fireOnceID:' RemoveButtonBlinkBlueFromPlayOnClick_',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonPlay buttonBgImgBlinkBlue " data-gjs-custom-name="button_Play"></widget-button>
						<widget-button :visible="false" :enabled="true" id="ifg6" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ife4',key:'playState',val:'stop'},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ife4',key:'playState',val:'play'},fireOnceID:'',delay:0.05}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonReplay " data-gjs-custom-name="button_Replay"></widget-button>
						<p class="text_PlayReplay " data-gjs-custom-name="text">text</p>
					</div>
				</div>
				<div class="grid_Clipping" data-gjs-custom-name="grid_Clipping">
					<div class="grid_Visuals" data-gjs-custom-name="grid_Visuals">
						<widget-video-player id="ife4" :visible="true" play-state="default" :muted="true" :speed="1" :loop="false" :controls="false" :auto-play="false" :enable-scrub="false" :start-time="0" :end-time="0" :end-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ixug',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ifg6',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :conditions="{conditionList:[{evaluateWhen:'pageLoads',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ife4',key:'playState',val:'stop'},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ife4',key:'playState',val:'play'},fireOnceID:'',delay:0.05}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="videoFill video_Styles " data-gjs-custom-name="video_1"></widget-video-player>
					</div>
				</div>
			</div>
			<style>
			.grid_Main.$$pageID$$ {
				display: grid;
				width: 100%;
				height: 100%;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr;
			}
			.grid_T4.$$pageID$$ {
				z-index: 3;
				width: 100%;
				height: 100%;
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: min-content 1fr;
				padding: 6vh;
			}
			.item1_T4.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}
			.grid_Clipping.$$pageID$$ {
				overflow: hidden;
				-webkit-mask-image: -webkit-radial-gradient(center, white, black);
				width: 100%;
				height: 100%;
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr;
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			.grid_Visuals.$$pageID$$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr;
				height: 102%;
				width: 102%;
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				justify-self: center;
				align-self: center;
			}
			.video_Styles.$$pageID$$ {
				z-index: 0;
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				align-self: stretch;
				justify-self: stretch;
			}
			.div_PlayReplay.$$pageID$$ {
				display: flex;
				flex-direction: row;
				align-items: center;
				width: auto;
				padding: 1.5vh;
				border-width: 0.2vh solid;
				border-radius: 1.5vh;
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
				justify-self: start;
				align-self: end;
			}
			.text_PlayReplay.$$pageID$$ {
				margin-left: 1.5vh;
			}
			</style>
		`)
	});

	bm.add("simWidget-background", {
		label: "Fullscreen Sim Layout",
		category: "Layout: General",
		attributes: { class: "fa fa-globe" },
		content: AddPageIDToString(`
			<div class="simParent" data-gjs-custom-name="SimBackgroundWrapper">
			<widget-sim-view id="s082b" scenename="setScene" simstateid="setID" :visible="true" :enabled="true" class="simPreview" data-gjs-custom-name="Widget-sim-view">
			</widget-sim-view>
			<div class="simPageContent" data-gjs-custom-name="Page Content"></div>
		  </div>
		  <style>
		  .simPreview.$$pageID$$ {
			width:100%;
			height:100%;
			z-index:0;
			top:0px;
			right:0px;
			position:absolute;
			background-color:#ffffff;
		  }
		  .simParent.$$pageID$$ {
			width:100%;
			height:100%;
			position:relative;
			top:0px;
			margin:0em 0px 0px 0px;
		  }
		  .simPageContent.$$pageID$$ {
			z-index:1;
			position:relative;
		  }
		  </style>
		  `)
	});

	bm.add("page-SimFull", {
		label:
			"<img src='./img/blocks/blockIcon_CaseSimFullPage.jpg'></img><br>Sim - Full Page + Text Box White",
		category: "Layout: General",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`
		<div class="simParent " data-gjs-custom-name="page_SimParent_FullPage">
			<widget-sim-view id="iztl" scenename="Sim_Meiosis_BaseScene" simstateid="o5sriz" :visible="true" :enabled="true" play-state="default" class="simPreview " data-gjs-custom-name="widget_SimView">
			</widget-sim-view>
			<div class="grid_T62  simPageContent" data-gjs-custom-name="grid_T62_SimPageContent">
				<div class="dropShadow textBackgroundBasic item1_T62" data-gjs-custom-name="item1_T62_text_BkgWhite"><p class="" data-gjs-custom-name="text_1">Text Box Blue</p>
				</div>
				<div class="item2_T62  div_PlayReplay colorBkgndGrey2 marginLeft2" data-gjs-custom-name="item2_T62_div_PlayReplay">
				<widget-button :visible="true" :enabled="true" id="i9xk" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iztl',key:'playState',val:'play'},fireOnceID:'',delay:0},{effectData:{effectType:'removeClasses',widgetID:'i9xk',classes:'buttonBgImgBlinkBlue '},fireOnceID:'RemoveButtonBlinkBlueFromPlayOnClick_',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class=" buttonPlay buttonBgImgBlinkBlue" data-gjs-custom-name="button_Play">
				</widget-button>
				<widget-button :visible="false" :enabled="true" id="ibid" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iztl',key:'playState',val:'stop'},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iztl',key:'playState',val:'play'},fireOnceID:'',delay:0.05}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class=" buttonReplay" data-gjs-custom-name="button_Replay">
				</widget-button>
				<p class=" text_PlayReplay" data-gjs-custom-name="text_Label">Label
				</p>
				</div>
			</div>
		</div>
		<style>
		.grid_T62.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:min-content 1fr;
			grid-column-gap:0vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		  }
		  .item1_T62.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		  }
		  .item2_T62.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
			justify-self:start;
			align-self:end;
		  }
		  .div_PlayReplay.$$pageID$$ {
			display:flex;
			flex-direction:row;
			align-items:center;
			width:auto;
			padding:1.5vh 1.5vh 1.5vh 1.5vh;
			border:.2vh solid rgba(205,204,204,1);
			border-radius:1.5vh 1.5vh 1.5vh 1.5vh;
		  }
		  .text_PlayReplay.$$pageID$$ {
			margin-left:1.5vh;
		  }
		  .simPreview.$$pageID$$ {
			width:100%;
			height:100%;
			z-index:1;
			top:0px;
			right:0px;
			position:absolute;
			background-color:rgb(255, 255, 255);
		  }
		  .simParent.$$pageID$$ {
			width:100%;
			height:100%;
			position:relative;
			top:0px;
			margin-top:0em;
			margin-right:0px;
			margin-bottom:0px;
			margin-left:0px;
		  }
		  .simPageContent.$$pageID$$ {
			z-index:2;
			position:relative;
		  }

		</style>
		`),
	});

	bm.add("handbook-simFullPage", {
		label:
			"<img src='./img/blocks/blockIcon_HandbookSimFullPage.jpg'></img><br>Sim - Full Page + Text Box Dark Blue",
		category: "Layout: General",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`
		<div class="simParent " data-gjs-custom-name="page_SimParent_FullPage">
		<widget-sim-view id="iztl" scenename="" simstateid="" :visible="true" :enabled="true" play-state="default" class="simPreview " data-gjs-custom-name="widget_SimView">
		</widget-sim-view>
		<div class="grid_T62  simPageContent" data-gjs-custom-name="grid_T62_SimPageContent">
			<div class="dropShadow textBackgroundBasic textBackground-DarkBlue item1_T62" data-gjs-custom-name="item1_T62_text_BkgDarkBlue"><p class="" data-gjs-custom-name="text_1">Text Box Blue</p>
			</div>
			<div class="item2_T62  div_PlayReplay colorBkgndGrey2 marginLeft2" data-gjs-custom-name="item2_T62_div_PlayReplay">
			<widget-button :visible="true" :enabled="true" id="i9xk" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iztl',key:'playState',val:'play'},fireOnceID:'',delay:0},{effectData:{effectType:'removeClasses',widgetID:'i9xk',classes:'buttonBgImgBlinkBlue '},fireOnceID:'RemoveButtonBlinkBlueFromPlayOnClick_',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class=" buttonPlay buttonBgImgBlinkBlue" data-gjs-custom-name="button_Play">
			</widget-button>
			<widget-button :visible="false" :enabled="true" id="ibid" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iztl',key:'playState',val:'stop'},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iztl',key:'playState',val:'play'},fireOnceID:'',delay:0.05}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class=" buttonReplay" data-gjs-custom-name="button_Replay">
			</widget-button>
			<p class=" text_PlayReplay" data-gjs-custom-name="text_Label">Label
			</p>
			</div>
		</div>
		</div>
		<style>
		.grid_T62.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:min-content 1fr;
			grid-column-gap:0vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		  }
		  .item1_T62.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		  }
		  .item2_T62.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
			justify-self:start;
			align-self:end;
		  }
		  .div_PlayReplay.$$pageID$$ {
			display:flex;
			flex-direction:row;
			align-items:center;
			width:auto;
			padding:1.5vh 1.5vh 1.5vh 1.5vh;
			border:.2vh solid rgba(205,204,204,1);
			border-radius:1.5vh 1.5vh 1.5vh 1.5vh;
		  }
		  .text_PlayReplay.$$pageID$$ {
			margin-left:1.5vh;
		  }
		  .simPreview.$$pageID$$ {
			width:100%;
			height:100%;
			z-index:1;
			top:0px;
			right:0px;
			position:absolute;
			background-color:rgb(255, 255, 255);
		  }
		  .simParent.$$pageID$$ {
			width:100%;
			height:100%;
			position:relative;
			top:0px;
			margin-top:0em;
			margin-right:0px;
			margin-bottom:0px;
			margin-left:0px;
		  }
		  .simPageContent.$$pageID$$ {
			z-index:2;
			position:relative;
		  }

		</style>
		`),
	});

	bm.add("text-image-text", {
		label:
			"<img src='./img/blocks/blockIcon_TextImageText.png'></img><br>Text Image Text",
		category: "Layout: General",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`
		<container-show-hide :visible="true" id="inf5g" class="SH_Text-Image-Text " data-gjs-custom-name="SH_Text-Image-Text"><p class="item1_TIT " data-gjs-custom-name="item1_TIT">Body text</p><div class="item2_TIT " data-gjs-custom-name="item2_TIT"><widget-image :visible="true" id="inajh" class="image_1 " data-gjs-custom-name="image_1"></widget-image></div><p class="item3_TIT " data-gjs-custom-name="item3_TIT">Body text</p></container-show-hide><style>.SH_Text-Image-Text.$pageID$ {grid-column-start:1;grid-column-end:2;grid-row-start:1;grid-row-end:2;justify-self:center;align-self:center;display:grid;grid-template-columns:1fr;grid-template-rows:min-content 1fr min-content;width:40vh;height:auto;grid-row-gap:3vh;border-radius:1.3vh;padding:3vh;border:0.5vh solid;border-color:var(--color-grey2);background-color:var(--color-white);}.item1_TIT.$pageID$ {grid-column-start:1;grid-column-end:2;grid-row-start:1;grid-row-end:2;}.item2_TIT.$pageID$ {overflow:hidden;-webkit-mask-image:-webkit-radial-gradient(white, black);margin:0 -3vh 0 -3vh;width:39vh;display:grid;grid-template-columns:1fr;grid-template-rows:1fr;height:auto;}.item3_TIT.$pageID$ {grid-column-start:1;grid-column-end:2;grid-row-start:3;grid-row-end:4;}.image_1.$pageID$ {width:39vh;height:auto;grid-column-start:1;grid-column-end:2;grid-row-start:1;grid-row-end:2;justify-self:center;align-self:center;}</style>
		`),
	});
};
