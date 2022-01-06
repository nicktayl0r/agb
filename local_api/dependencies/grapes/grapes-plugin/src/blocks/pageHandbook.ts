import grapesjs from "grapesjs";

import { AddPageIDToString } from "../blocks";

export default (bm: grapesjs.BlockManagerInstance, config) => {

	bm.add("handbook-m00V1", {
		label:
			"<img src='./img/blocks/blockIcon_m00_V1Right.jpg'></img><br>m00: V1 Right",
		category: "Layout: Handbook Pages",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`
		<div class="grid_T12 " data-gjs-custom-name="grid_T12_page_m00">
			<h1 class=" item1_T12 textCenter" data-gjs-custom-name="item1_T12_text_Title">Welcome to the Topic Handbook
			</h1>
			<widget-popper :visible="false" :click-to-dismiss="true" id="ilif" :delay="0" :delay-once="false" anchor-id="guideNextPage" :options="{placement:'left'}" :conditions="{conditionList:[{evaluateWhen:'pageLoads',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'unlockNextPage'},fireOnceID:'1657571146',delay:2},{effectData:{effectType:'updateWidget',widgetID:'ilif',key:'visible',val:true},fireOnceID:'7300838305',delay:2}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'pageLoads',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ilif',key:'visible',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ilif',key:'visible',val:false},fireOnceID:'',delay:0.01}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="textBackground-Popup-Blue " data-gjs-custom-name="popper_Blue_NextPage">
				<span class="" data-gjs-custom-name="text_Popper">Use the arrows to navigate through the pages. Click here to begin!</span>
			</widget-popper>
			<container-enable-disable :visible="true" :enabled="true" id="iaza" :conditions="{conditionList:[{evaluateWhen:'pageLoads',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'unlockNextPage'},fireOnceID:'ED_UnlockNextPage_OnPageLoad_',delay:3},{effectData:{effectType:'updateWidget',widgetID:'ilif',key:'visible',val:true},fireOnceID:'popper_Blue_NextPage_Show_',delay:3}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="ED_UnlockNextPage_OnPageLoad " data-gjs-custom-name="ED_UnlockNextPage_OnPageLoad">
			</container-enable-disable>
		</div>
		<style>
		.grid_T12.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr;
			grid-template-rows:1fr;
			grid-column-gap:0vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		  }
		  .item1_T12.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
			justify-self:center;
			align-self:center;
		  }
		  .ED_UnlockNextPage_OnPageLoad.$$pageID$$ {
			min-height:0px;
		  }

		</style>
		`),
	});

	bm.add("handbook-m00V2", {
		label:
			"<img src='./img/blocks/blockIcon_m00_V2Top.jpg'></img><br>m00: V2 Top",
		category: "Layout: Handbook Pages",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`
		<div class="grid_T51 " data-gjs-custom-name="grid_T51_page_m00">
			<div class=" item1_T51 textCenter" data-gjs-custom-name="item1_T51_Title">
				<h1 class="" data-gjs-custom-name="text_Title_Top">Welcome to the
				</h1>
				<h1 class="" data-gjs-custom-name="text_Title_Bottom">Topic Handbook
				</h1>
			</div>
			<widget-image src="../../assets/case/images/Cell/cellZygote_IMAGE.png" :visible="true" id="i5z4" class=" item2_T51" data-gjs-custom-name="item2_T51_image">
			</widget-image>
			<widget-popper :visible="false" :click-to-dismiss="true" id="idzl" :delay="0" :delay-once="false" anchor-id="guideNextPage" :options="{placement:'left'}" class="textBackground-Popup-Blue " data-gjs-custom-name="popper_Blue_NextPage">
				<span class="" data-gjs-custom-name="text_Popper">Use the arrows to navigate through the pages. Click here to begin!</span>
			</widget-popper>
			<container-enable-disable :visible="true" :enabled="true" id="iq3c" :conditions="{conditionList:[{evaluateWhen:'pageLoads',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'unlockNextPage'},fireOnceID:'ED_UnlockNextPage_OnPageLoad_',delay:3},{effectData:{effectType:'updateWidget',widgetID:'idzl',key:'visible',val:true},fireOnceID:'popper_Blue_NextPage_Show_',delay:3}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="ED_UnlockNextPage_OnPageLoad " data-gjs-custom-name="ED_UnlockNextPage_OnPageLoad">
			</container-enable-disable>
		</div>
		<style>
		.grid_T51.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 5fr 1fr;
			grid-template-rows:min-content 1fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		  }
		  .item1_T51.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 3;
			grid-row-start:1;
			grid-row-end:span 1;
		  }
		  .item2_T51.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		  }
		  .ED_UnlockNextPage_OnPageLoad.$$pageID$$ {
			min-height:0px;
		  }

		</style>
		`),
	});

	bm.add("handbook-m00V3", {
		label:
			"<img src='./img/blocks/blockIcon_m00_V3Center.jpg'></img><br>m00: V3 Center",
		category: "Layout: Handbook Pages",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`
		<div class="grid_T64 " data-gjs-custom-name="grid_T64_page_m00">
			<h1 class=" item1_T64 textCenter" data-gjs-custom-name="item1_T64_text_Title">Welcome to the Topic Handbook
			</h1>
			<container-enable-disable :visible="true" :enabled="true" id="i1r8" :conditions="{conditionList:[{evaluateWhen:'pageLoads',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'unlockNextPage'},fireOnceID:'ED_UnlockNextPage_OnPageLoad_',delay:3},{effectData:{effectType:'updateWidget',widgetID:'i1gi',key:'visible',val:true},fireOnceID:'popper_Blue_NextPage_Show_',delay:3}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="ED_UnlockNextPage_OnPageLoad " data-gjs-custom-name="ED_UnlockNextPage_OnPageLoad">
			</container-enable-disable>
			<widget-popper :visible="false" :click-to-dismiss="true" id="i1gi" :delay="1" :delay-once="false" anchor-id="guideNextPage" :options="{placement:'left'}" class="textBackground-Popup-Blue popper-blue_NextPage " data-gjs-custom-name="popper_Blue_NextPage">
				<span class="text_Popper " data-gjs-custom-name="text_Popper">Use the arrows to navigate through the pages.
				Click here to begin!</span>
			</widget-popper>
		</div>
		<style>
		.grid_T64.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:2fr 1fr 2fr;
			grid-column-gap:0vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		  }
		  .item1_T64.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		  }
		  .ED_UnlockNextPage_OnPageLoad.$$pageID$$ {
			min-height:0px;
		  }

		</style>
		`),
	});

	bm.add("handbook-review-8", {
		label:
			"<img src='./img/blocks/blockIcon_Handbook_Review_8.jpg'></img><br>Handbook: Review 8",
		category: "Layout: Handbook Pages",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`
			<div class="grid_T4" data-gjs-custom-name="grid_T4_HandbookTextTop">
			<div class="item1_T4 dropShadow textBackgroundBasic textBackground-DarkBlue" data-gjs-custom-name="item1_T4">
				<p class="" data-gjs-custom-name="text_basic_BackgroundDarkBlue">Body text</p>
			</div>
			<div class="grid_Links" data-gjs-custom-name="GRID">
				<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="i61pi" class="linkMain link_1" data-gjs-custom-name="link_1">
					<div class="linkBox" data-gjs-custom-name="Box_1">
						<div class=" div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
						<div class="linkTxt" data-gjs-custom-name="text_Label">
							<p data-gjs-custom-name="Text">Label</p>
						</div>
						<widget-image :visible="true" id="il3fh" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
					</div>
				</widget-button>
				<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="ih2ji" class="linkMain link_2" data-gjs-custom-name="link_2">
					<div class="linkBox" data-gjs-custom-name="Box_2">
						<div class=" div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
						<div class="linkTxt" data-gjs-custom-name="text_Label">
							<p data-gjs-custom-name="Text">Label</p>
						</div>
						<widget-image :visible="true" id="i1hrs" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
					</div>
				</widget-button>
				<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:null},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="iiw24" class="linkMain link_3" data-gjs-custom-name="link_3">
					<div class="linkBox" data-gjs-custom-name="Box_3">
						<div class=" div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
						<div class="linkTxt" data-gjs-custom-name="text_Label">
							<p data-gjs-custom-name="Text">Label</p>
						</div>
						<widget-image :visible="true" id="i9gvh" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
					</div>
				</widget-button>
				<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="imipt" class="linkMain link_4" data-gjs-custom-name="link_4">
					<div class="linkBox" data-gjs-custom-name="Box_4">
						<div class=" div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
						<div class="linkTxt" data-gjs-custom-name="text_Label">
							<p data-gjs-custom-name="Text">Label</p>
						</div>
						<widget-image :visible="true" id="illd4" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
					</div>
				</widget-button>
				<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="iw7uk" class="linkMain link_5" data-gjs-custom-name="link_5">
					<div class="linkBox" data-gjs-custom-name="Box_5">
						<div class=" div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
						<div class="linkTxt" data-gjs-custom-name="text_Label">
							<p data-gjs-custom-name="Text">Label</p>
						</div>
						<widget-image :visible="true" id="icp9v" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
					</div>
				</widget-button>
				<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="ivflu" class="linkMain link_6" data-gjs-custom-name="link_6">
					<div class="linkBox" data-gjs-custom-name="Box_6">
						<div class=" div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
						<div class="linkTxt" data-gjs-custom-name="text_Label">
							<p data-gjs-custom-name="Text">Label</p>
						</div>
						<widget-image :visible="true" id="i8ffk" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
					</div>
				</widget-button>
				<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="inxl8" class="linkMain link_7" data-gjs-custom-name="link_7">
					<div class="linkBox" data-gjs-custom-name="Box_7">
						<div class=" div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
						<div class="linkTxt" data-gjs-custom-name="text_Label">
							<p data-gjs-custom-name="Text">Label</p>
						</div>
						<widget-image :visible="true" id="i0rm3" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
					</div>
				</widget-button>
				<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="iacjx" class="linkMain link_8" data-gjs-custom-name="link_8">
					<div class="linkBox" data-gjs-custom-name="Box_8">
						<div class=" div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
						<div class="linkTxt" data-gjs-custom-name="text_Label">
							<p data-gjs-custom-name="Text">Label</p>
						</div>
						<widget-image :visible="true" id="iyg75" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
					</div>
				</widget-button>
			</div>
			<container-show-hide :visible="true" id="il8m" :conditions="{conditionList:[{evaluateWhen:'pageLoads',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'unlockNextPage'},fireOnceID:'unlockNextPage_',delay:5}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class=" SH_UnlockNext" data-gjs-custom-name="SH_UnlockNext"></container-show-hide>
		</div>
		<style>
		.grid_T4.$$pageID$$ {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: min-content 1fr;
			width: 100%;
			height: 100%;
			padding: 6vh;
			background-repeat: no-repeat;
			background-attachment: local;
			background-position: center center;
			background-size: cover;
			grid-row-gap: 3vh;
		}
		.item1_T4.$$pageID$$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 2;
		}
		.grid_Links.$$pageID$$ {
			display: grid;
			grid-template-rows: 1fr 1fr;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			align-items: center;
			justify-items: center;
			justify-content: center;
			align-content: center;
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 2;
			grid-row-end: 3;
			width: auto;
			height: auto;
		}
		.linkBox.$$pageID$$ {
			border: .4vh solid #45C1FF;
			background-color: #45C1FF;
			border-radius: 1.5vh;
			height: 30vh;
			width: 26vh;
			overflow: hidden;
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 5vh 1fr;
		}
		.linkTxt.$$pageID$$ {
			padding: 1vh;
			font-weight: normal;
			color: white;
			text-align: center;
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 2;
			justify-self: center;
			align-self: start;
		}
		.link_Image.$$pageID$$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 2;
			grid-row-end: 3;
			justify-self: center;
			align-self: center;
		}
		.linkMain.$$pageID$$ {
			width: auto;
		}
		.link_1.$$pageID$$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 2;
		}
		.link_2.$$pageID$$ {
			grid-column-start: 2;
			grid-column-end: 3;
			grid-row-start: 1;
			grid-row-end: 2;
		}
		.link_3.$$pageID$$ {
			grid-column-start: 3;
			grid-column-end: 4;
			grid-row-start: 1;
			grid-row-end: 2;
		}
		.link_4.$$pageID$$ {
			grid-column-start: 4;
			grid-column-end: 5;
			grid-row-start: 1;
			grid-row-end: 2;
		}
		.link_5.$$pageID$$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 2;
			grid-row-end: 3;
		}
		.link_6.$$pageID$$ {
			grid-column-start: 2;
			grid-column-end: 3;
			grid-row-start: 2;
			grid-row-end: 3;
		}
		.link_7.$$pageID$$ {
			grid-column-start: 3;
			grid-column-end: 4;
			grid-row-start: 2;
			grid-row-end: 3;
		}
		.link_8.$$pageID$$ {
			grid-column-start: 4;
			grid-column-end: 5;
			grid-row-start: 2;
			grid-row-end: 3;
		}
		.image_Link.$$pageID$$ {
			width: 25vh;
			height: 24vh;
		}
		.SH_UnlockNext.$$pageID$$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 2;
			justify-self: start;
			align-self: start;
			width: 0;
			height: 0;
		}
		</style>
		`),
	});

	bm.add("handbook-review-7", {
		label:
			"<img src='./img/blocks/blockIcon_Handbook_Review_7.jpg'></img><br>Handbook: Review 7",
		category: "Layout: Handbook Pages",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`<div class="grid_T4" data-gjs-custom-name="grid_T4_HandbookTextTop">
		<div class="item1_T4 dropShadow textBackgroundBasic textBackground-DarkBlue" data-gjs-custom-name="item1_T4">
			<p class="" data-gjs-custom-name="text_basic_BackgroundDarkBlue">Body text</p>
		</div>
		<div class="grid_Links" data-gjs-custom-name="GRID">
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="ivw2" class="linkMain link_1" data-gjs-custom-name="link_1">
				<div class="linkBox" data-gjs-custom-name="Box_1">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="i0hq" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="iwgm" class="linkMain link_2" data-gjs-custom-name="link_2">
				<div class="linkBox" data-gjs-custom-name="Box_2">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="iymz" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:null},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="ialo" class="linkMain link_3" data-gjs-custom-name="link_3">
				<div class="linkBox" data-gjs-custom-name="Box_3">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="ic1x" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="ikvw" class="linkMain link_4" data-gjs-custom-name="link_4">
				<div class="linkBox" data-gjs-custom-name="Box_4">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="iggq" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="ituj" class="linkMain link_5" data-gjs-custom-name="link_5">
				<div class="linkBox" data-gjs-custom-name="Box_5">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="iejli" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="iw0pi" class="linkMain link_6" data-gjs-custom-name="link_6">
				<div class="linkBox" data-gjs-custom-name="Box_6">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="iqfr6" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="itcb6" class="linkMain link_7" data-gjs-custom-name="link_7">
				<div class="linkBox" data-gjs-custom-name="Box_7">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="ikyfl" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
		</div>
		<container-show-hide :visible="true" id="isulg" :conditions="{conditionList:[{evaluateWhen:'pageLoads',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'unlockNextPage'},fireOnceID:'unlockNextPage_',delay:5}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="SH_UnlockNext" data-gjs-custom-name="SH_UnlockNext"></container-show-hide>
		</div>
		<style>
		.grid_T4.$pageID$ {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: min-content 1fr;
			width: 100%;
			height: 100%;
			padding: 6vh;
			background-repeat: no-repeat;
			background-attachment: local;
			background-position: center center;
			background-size: cover;
			grid-row-gap: 3vh;
		}
		
		.item1_T4.$pageID$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 2;
		}
		
		.grid_Links.$pageID$ {
			display: grid;
			grid-template-rows: 1fr 1fr;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			align-items: center;
			justify-items: center;
			justify-content: center;
			align-content: center;
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 2;
			grid-row-end: 3;
			width: auto;
			height: auto;
		}
		
		.linkBox.$pageID$ {
			border: .4vh solid #45C1FF;
			background-color: #45C1FF;
			border-radius: 1.5vh;
			height: 30vh;
			width: 26vh;
			overflow: hidden;
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 5vh 1fr;
		}
		
		.linkTxt.$pageID$ {
			padding: 1vh;
			font-weight: normal;
			color: white;
			text-align: center;
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 2;
			justify-self: center;
			align-self: start;
		}
		
		.link_Image.$pageID$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 2;
			grid-row-end: 3;
			justify-self: center;
			align-self: center;
		}
		
		.linkMain.$pageID$ {
			width: auto;
		}
		
		.link_1.$pageID$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 2;
		}
		
		.link_2.$pageID$ {
			grid-column-start: 2;
			grid-column-end: 3;
			grid-row-start: 1;
			grid-row-end: 2;
		}
		
		.link_3.$pageID$ {
			grid-column-start: 3;
			grid-column-end: 4;
			grid-row-start: 1;
			grid-row-end: 2;
		}
		
		.link_4.$pageID$ {
			grid-column-start: 4;
			grid-column-end: 5;
			grid-row-start: 1;
			grid-row-end: 2;
		}
		
		.link_5.$pageID$ {
			grid-column-start: 1;
			grid-column-end: 3;
			grid-row-start: 2;
			grid-row-end: 3;
		}
		
		.link_6.$pageID$ {
			grid-column-start: 2;
			grid-column-end: 4;
			grid-row-start: 2;
			grid-row-end: 3;
		}
		
		.link_7.$pageID$ {
			grid-column-start: 3;
			grid-column-end: 5;
			grid-row-start: 2;
			grid-row-end: 3;
		}
		
		.image_Link.$pageID$ {
			width: 25vh;
			height: 24vh;
		}
		
		.SH_UnlockNext.$pageID$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 2;
			justify-self: start;
			align-self: start;
			width: 0;
			height: 0;
		}
		</style>
		`),
	});

	bm.add("handbook-review-6", {
		label:
			"<img src='./img/blocks/blockIcon_Handbook_Review_6.jpg'></img><br>Handbook: Review 6",
		category: "Layout: Handbook Pages",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`<div class="grid_T4" data-gjs-custom-name="grid_T4_HandbookTextTop">
		<div class="item1_T4 dropShadow textBackgroundBasic textBackground-DarkBlue" data-gjs-custom-name="item1_T4">
			<p class="" data-gjs-custom-name="text_basic_BackgroundDarkBlue">Body text</p>
		</div>
		<div class="grid_Links" data-gjs-custom-name="GRID">
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="ivw2" class="linkMain link_1" data-gjs-custom-name="link_1">
				<div class="linkBox" data-gjs-custom-name="Box_1">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="i0hq" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="iwgm" class="linkMain link_2" data-gjs-custom-name="link_2">
				<div class="linkBox" data-gjs-custom-name="Box_2">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="iymz" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:null},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="ialo" class="linkMain link_3" data-gjs-custom-name="link_3">
				<div class="linkBox" data-gjs-custom-name="Box_3">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="ic1x" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="ikvw" class="linkMain link_4" data-gjs-custom-name="link_4">
				<div class="linkBox" data-gjs-custom-name="Box_4">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="iggq" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="ituj" class="linkMain link_5" data-gjs-custom-name="link_5">
				<div class="linkBox" data-gjs-custom-name="Box_5">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="iejli" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="iw0pi" class="linkMain link_6" data-gjs-custom-name="link_6">
				<div class="linkBox" data-gjs-custom-name="Box_6">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="iqfr6" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
		</div>
		<container-show-hide :visible="true" id="isulg" :conditions="{conditionList:[{evaluateWhen:'pageLoads',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'unlockNextPage'},fireOnceID:'unlockNextPage_',delay:5}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="SH_UnlockNext" data-gjs-custom-name="SH_UnlockNext"></container-show-hide>
	</div>
	<style>
	.grid_T4.$pageID$ {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: min-content 1fr;
		width: 100%;
		height: 100%;
		padding: 6vh;
		background-repeat: no-repeat;
		background-attachment: local;
		background-position: center center;
		background-size: cover;
		grid-row-gap: 3vh;
	}
	
	.item1_T4.$pageID$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.grid_Links.$pageID$ {
		display: grid;
		grid-template-rows: 1fr 1fr;
		grid-template-columns: 1fr 1fr 1fr;
		align-items: center;
		justify-items: center;
		justify-content: center;
		align-content: center;
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 2;
		grid-row-end: 3;
		width: auto;
		height: auto;
	}
	
	.linkBox.$pageID$ {
		border: .4vh solid #45C1FF;
		background-color: #45C1FF;
		border-radius: 1.5vh;
		height: 30vh;
		width: 26vh;
		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 5vh 1fr;
	}
	
	.linkTxt.$pageID$ {
		padding: 1vh;
		font-weight: normal;
		color: white;
		text-align: center;
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
		justify-self: center;
		align-self: start;
	}
	
	.link_Image.$pageID$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 2;
		grid-row-end: 3;
		justify-self: center;
		align-self: center;
	}
	
	.linkMain.$pageID$ {
		width: auto;
	}
	
	.link_1.$pageID$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.link_2.$pageID$ {
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.link_3.$pageID$ {
		grid-column-start: 3;
		grid-column-end: 4;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.link_4.$pageID$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.link_5.$pageID$ {
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.link_6.$pageID$ {
		grid-column-start: 3;
		grid-column-end: 4;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.image_Link.$pageID$ {
		width: 25vh;
		height: 24vh;
	}
	
	.SH_UnlockNext.$pageID$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
		justify-self: start;
		align-self: start;
		width: 0;
		height: 0;
	}
	</style>
		`),
	});

	bm.add("handbook-review-5", {
		label:
			"<img src='./img/blocks/blockIcon_Handbook_Review_5.jpg'></img><br>Handbook: Review 5",
		category: "Layout: Handbook Pages",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`<div class="grid_T4" data-gjs-custom-name="grid_T4_HandbookTextTop">
		<div class="item1_T4 dropShadow textBackgroundBasic textBackground-DarkBlue" data-gjs-custom-name="item1_T4">
			<p class="" data-gjs-custom-name="text_basic_BackgroundDarkBlue">Body text</p>
		</div>
		<div class="grid_Links" data-gjs-custom-name="GRID">
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="ivw2" class="linkMain link_1" data-gjs-custom-name="link_1">
				<div class="linkBox" data-gjs-custom-name="Box_1">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="i0hq" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="iwgm" class="linkMain link_2" data-gjs-custom-name="link_2">
				<div class="linkBox" data-gjs-custom-name="Box_2">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="iymz" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:null},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="ialo" class="linkMain link_3" data-gjs-custom-name="link_3">
				<div class="linkBox" data-gjs-custom-name="Box_3">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="ic1x" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="ikvw" class="linkMain link_4" data-gjs-custom-name="link_4">
				<div class="linkBox" data-gjs-custom-name="Box_4">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="iggq" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="ituj" class="linkMain link_5" data-gjs-custom-name="link_5">
				<div class="linkBox" data-gjs-custom-name="Box_5">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="iejli" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
		</div>
		<container-show-hide :visible="true" id="isulg" :conditions="{conditionList:[{evaluateWhen:'pageLoads',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'unlockNextPage'},fireOnceID:'unlockNextPage_',delay:5}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="SH_UnlockNext" data-gjs-custom-name="SH_UnlockNext"></container-show-hide>
	</div>
	<style>
	.grid_T4.$pageID$ {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: min-content 1fr;
		width: 100%;
		height: 100%;
		padding: 6vh;
		background-repeat: no-repeat;
		background-attachment: local;
		background-position: center center;
		background-size: cover;
		grid-row-gap: 3vh;
	}
	
	.item1_T4.$pageID$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.grid_Links.$pageID$ {
		display: grid;
		grid-template-rows: 1fr 1fr;
		grid-template-columns: 1fr 1fr 1fr;
		align-items: center;
		justify-items: center;
		justify-content: center;
		align-content: center;
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 2;
		grid-row-end: 3;
		width: auto;
		height: auto;
	}
	
	.linkBox.$pageID$ {
		border: .4vh solid #45C1FF;
		background-color: #45C1FF;
		border-radius: 1.5vh;
		height: 30vh;
		width: 26vh;
		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 5vh 1fr;
	}
	
	.linkTxt.$pageID$ {
		padding: 1vh;
		font-weight: normal;
		color: white;
		text-align: center;
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
		justify-self: center;
		align-self: start;
	}
	
	.link_Image.$pageID$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 2;
		grid-row-end: 3;
		justify-self: center;
		align-self: center;
	}
	
	.linkMain.$pageID$ {
		width: auto;
	}
	
	.link_1.$pageID$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.link_2.$pageID$ {
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.link_3.$pageID$ {
		grid-column-start: 3;
		grid-column-end: 4;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.link_4.$pageID$ {
		grid-column-start: 1;
		grid-column-end: 3;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.link_5.$pageID$ {
		grid-column-start: 2;
		grid-column-end: 4;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.image_Link.$pageID$ {
		width: 25vh;
		height: 24vh;
	}
	
	.SH_UnlockNext.$pageID$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
		justify-self: start;
		align-self: start;
		width: 0;
		height: 0;
	}
	</style>
		`),
	});

	bm.add("handbook-review-4", {
		label:
			"<img src='./img/blocks/blockIcon_Handbook_Review_4.jpg'></img><br>Handbook: Review 4",
		category: "Layout: Handbook Pages",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`<div class="grid_T4" data-gjs-custom-name="grid_T4_HandbookTextTop">
		<div class="item1_T4 dropShadow textBackgroundBasic textBackground-DarkBlue" data-gjs-custom-name="item1_T4">
			<p class="" data-gjs-custom-name="text_basic_BackgroundDarkBlue">Body text</p>
		</div>
		<div class="grid_Links" data-gjs-custom-name="GRID">
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="ivw2" class="linkMain link_1" data-gjs-custom-name="link_1">
				<div class="linkBox" data-gjs-custom-name="Box_1">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="i0hq" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="iwgm" class="linkMain link_2" data-gjs-custom-name="link_2">
				<div class="linkBox" data-gjs-custom-name="Box_2">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="iymz" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:null},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="ialo" class="linkMain link_3" data-gjs-custom-name="link_3">
				<div class="linkBox" data-gjs-custom-name="Box_3">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="ic1x" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="ikvw" class="linkMain link_4" data-gjs-custom-name="link_4">
				<div class="linkBox" data-gjs-custom-name="Box_4">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="iggq" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
		</div>
		<container-show-hide :visible="true" id="isulg" :conditions="{conditionList:[{evaluateWhen:'pageLoads',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'unlockNextPage'},fireOnceID:'unlockNextPage_',delay:5}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="SH_UnlockNext" data-gjs-custom-name="SH_UnlockNext"></container-show-hide>
	</div>
	<style>
	.grid_T4.$pageID$ {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: min-content 1fr;
		width: 100%;
		height: 100%;
		padding: 6vh;
		background-repeat: no-repeat;
		background-attachment: local;
		background-position: center center;
		background-size: cover;
		grid-row-gap: 3vh;
	}
	
	.item1_T4.$pageID$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.grid_Links.$pageID$ {
		display: grid;
		grid-template-rows: 1fr 1fr;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		justify-items: center;
		justify-content: center;
		align-content: center;
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 2;
		grid-row-end: 3;
		width: auto;
		height: auto;
	}
	
	.linkBox.$pageID$ {
		border: .4vh solid #45C1FF;
		background-color: #45C1FF;
		border-radius: 1.5vh;
		height: 30vh;
		width: 50vh;
		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 5vh 1fr;
	}
	
	.linkTxt.$pageID$ {
		padding: 1vh;
		font-weight: normal;
		color: white;
		text-align: center;
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
		justify-self: center;
		align-self: start;
	}
	
	.link_Image.$pageID$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 2;
		grid-row-end: 3;
		justify-self: center;
		align-self: center;
	}
	
	.linkMain.$pageID$ {
		width: auto;
	}
	
	.link_1.$pageID$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.link_2.$pageID$ {
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.link_3.$pageID$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.link_4.$pageID$ {
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.image_Link.$pageID$ {
		width: 49vh;
		height: 24vh;
	}
	
	.SH_UnlockNext.$pageID$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
		justify-self: start;
		align-self: start;
		width: 0;
		height: 0;
	}
	</style>
		`),
	});

	bm.add("handbook-review-3", {
		label:
			"<img src='./img/blocks/blockIcon_Handbook_Review_3.jpg'></img><br>Handbook: Review 3",
		category: "Layout: Handbook Pages",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`<div class="grid_T4" data-gjs-custom-name="grid_T4_HandbookTextTop">
		<div class="item1_T4 dropShadow textBackgroundBasic textBackground-DarkBlue" data-gjs-custom-name="item1_T4">
			<p class="" data-gjs-custom-name="text_basic_BackgroundDarkBlue">Body text</p>
		</div>
		<div class="grid_Links" data-gjs-custom-name="GRID">
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="ivw2" class="linkMain link_1" data-gjs-custom-name="link_1">
				<div class="linkBox" data-gjs-custom-name="Box_1">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="i0hq" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="iwgm" class="linkMain link_2" data-gjs-custom-name="link_2">
				<div class="linkBox" data-gjs-custom-name="Box_2">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="iymz" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
			<widget-button :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'goToPage',pageID:null},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :visible="true" :enabled="true" id="ialo" class="linkMain link_3" data-gjs-custom-name="link_3">
				<div class="linkBox" data-gjs-custom-name="Box_3">
					<div class="div_ButtonBG" data-gjs-custom-name="div_ButtonBG"></div>
					<div class="linkTxt" data-gjs-custom-name="text_Label">
						<p class="" data-gjs-custom-name="Text">Label</p>
					</div>
					<widget-image :visible="true" id="ic1x" class="link_Image image_Link" data-gjs-custom-name="image_Link"></widget-image>
				</div>
			</widget-button>
		</div>
		<container-show-hide :visible="true" id="isulg" :conditions="{conditionList:[{evaluateWhen:'pageLoads',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'unlockNextPage'},fireOnceID:'unlockNextPage_',delay:5}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="SH_UnlockNext" data-gjs-custom-name="SH_UnlockNext"></container-show-hide>
	</div>
	<style>
	.grid_T4.$pageID$ {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: min-content 1fr;
		width: 100%;
		height: 100%;
		padding: 6vh;
		background-repeat: no-repeat;
		background-attachment: local;
		background-position: center center;
		background-size: cover;
		grid-row-gap: 3vh;
	}
	
	.item1_T4.$pageID$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.grid_Links.$pageID$ {
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 1fr 1fr 1fr;
		align-items: center;
		justify-items: center;
		justify-content: center;
		align-content: center;
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 2;
		grid-row-end: 3;
		width: auto;
		height: auto;
	}
	
	.linkBox.$pageID$ {
		border: .4vh solid #45C1FF;
		background-color: #45C1FF;
		border-radius: 1.5vh;
		height: 50vh;
		width: 35vh;
		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 5vh 1fr;
	}
	
	.linkTxt.$pageID$ {
		padding: 1vh;
		font-weight: normal;
		color: white;
		text-align: center;
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
		justify-self: center;
		align-self: start;
	}
	
	.link_Image.$pageID$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 2;
		grid-row-end: 3;
		justify-self: center;
		align-self: center;
	}
	
	.linkMain.$pageID$ {
		width: auto;
	}
	
	.link_1.$pageID$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.link_2.$pageID$ {
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.link_3.$pageID$ {
		grid-column-start: 3;
		grid-column-end: 4;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.image_Link.$pageID$ {
		width: 34vh;
		height: 44vh;
	}
	
	.SH_UnlockNext.$pageID$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
		justify-self: start;
		align-self: start;
		width: 0;
		height: 0;
	}
	</style>
		`),
	});

	bm.add("handbook-completed", {
		label:
			"<img src='./img/blocks/blockIcon_HandbookCompleted.jpg'></img><br>Handbook: Completed",
		category: "Layout: Handbook Pages",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`
			<div class="grid_T51 " data-gjs-custom-name="grid_T51_page_m00">
				<div class="item1_T51  dropShadow colorWhite" data-gjs-custom-name="item1_T51_Title">
					<h3 class="" data-gjs-custom-name="text_Title_Top">You have completed the</h3>
					<h2 class="" data-gjs-custom-name="text_Title_Bottom">Something Something<br data-gjs-custom-name="Br">Handbook</h2>
				</div>
				<container-enable-disable :visible="true" :enabled="true" id="iqbm" :conditions="{conditionList:[{evaluateWhen:'pageLoads',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'unlockCase'},fireOnceID:'unlockCase_Once_',delay:3},{effectData:{effectType:'setGuideCompleted'},fireOnceID:'setGuideComplete_Once_',delay:3}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="ED_UnlockNextPage_OnPageLoad " data-gjs-custom-name="ED_UnlockNextPage_OnPageLoad"></container-enable-disable>
			</div>
			<style>
			.grid_T51.$pageID$ {
				display: grid;
				grid-template-rows: min-content 1fr;
				padding: 0 0 0 0;
				background-image: none;
				background-repeat: no-repeat;
				background-attachment: local;
				background-position: center center;
				background-size: cover;
				width: 100%;
				height: 100%;
			}
			.item1_T51.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 4;
				grid-row-start: 1;
				grid-row-end: span 1;
				padding: 6vh 6vh 6vh 6vh;
				justify-self: stretch;
				width: 100%;
				border-color: #3e3e3e;
				background-color: rgba(0, 0, 0, 0.76);
				z-index: 2;
			}
			.ED_UnlockNextPage_OnPageLoad.$pageID$ {
				min-height: 0px;
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				justify-self: start;
				align-self: start;
				width: 0;
				height: 0;
			}
			</style>
		`),
	});
};
