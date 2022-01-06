import grapesjs from "grapesjs";

import { AddPageIDToString } from "../blocks";

export default (bm: grapesjs.BlockManagerInstance, config) => {
	bm.add("popper", {
		label: "<img src='./img/blocks/blockIcon_PopperWhite.png'></img><br>Popper White",
		category: "Poppers",
		attributes: { class: "imgIcon" },
		content:
			"<widget-popper data-gjs-custom-name='popperW'><span data-gjs-custom-name='text'>Popper Text</span></widget-popper>"
	});
	bm.add("popper-blue", {
		label: "<img src='./img/blocks/blockIcon_PopperBlue.png'></img><br>Popper Blue",
		category: "Poppers",
		attributes: { class: "imgIcon" },
		content:
			"<widget-popper class='textBackground-Popup-Blue' data-gjs-custom-name='popperB'><span data-gjs-custom-name='text'>Popper Text</span></widget-popper>"
	});
	bm.add("popper-dark-blue", {
		label: "<img src='./img/blocks/blockIcon_PopperDarkBlue.png'></img><br>Popper Dark Blue",
		category: "Poppers",
		attributes: { class: "imgIcon" },
		content:
			"<widget-popper class='textBackground-DarkBlue' data-gjs-custom-name='popperDB'><span data-gjs-custom-name='text'>Popper Text</span></widget-popper>"
	});
	bm.add("popper-white2", {
		label: "<img src='./img/blocks/blockIcon_PopperWhite2.png'></img><br>Popper White 2",
		category: "Poppers",
		attributes: { class: "imgIcon" },
		content:
			"<widget-popper class='textBackground-White2' data-gjs-custom-name='popperW2'><span data-gjs-custom-name='text'>Popper Text</span></widget-popper>"
	});
	bm.add("popper-arrow-widget", {
		label: "<img src='./img/blocks/blockIcon_PopperWhite_wArrowWidget.png'></img><br>Popper White + Arrow Widget",
		category: "Poppers",
		attributes: { class: "imgIcon" },
		content: AddPageIDToString(`<container-show-hide :visible="true" id="inyf" class="dropShadow textBackgroundBasic popper_ArrowWidget_White" data-gjs-custom-name="popper_ArrowWidget_White"><p class="" data-gjs-custom-name="text_Popper">Popper Text</p><widget-arrow :visible="true" id="ikjm" :source-offset-x="50" :source-offset-y="0" :target-offset-x="100" :target-offset-y="100" source-id="inyf" color="var(--color-grey2)" :width="3" :show-head="true" :duration="0" :delay="0" class="" data-gjs-custom-name="Widget-arrow"></widget-arrow></container-show-hide><style>.popper_ArrowWidget_White.$$pageID$$ {width:auto;}</style>`)
	});
	bm.add("popper-blue-arrow-widget", {
		label: "<img src='./img/blocks/blockIcon_PopperBlue_wArrowWidget.png'></img><br>Popper Blue + Arrow Widget",
		category: "Poppers",
		attributes: { class: "imgIcon" },
		content: AddPageIDToString(`<container-show-hide :visible="true" id="inyf" class="dropShadow textBackgroundBasic textBackground-Popup-Blue popper_ArrowWidget_Blue" data-gjs-custom-name="popper_ArrowWidget_Blue"><p class="" data-gjs-custom-name="text_Popper">Popper Text</p><widget-arrow :visible="true" id="ikjm" :source-offset-x="50" :source-offset-y="0" :target-offset-x="100" :target-offset-y="100" source-id="inyf" color="var(--color-blue4)" :width="3" :show-head="true" :duration="0" :delay="0" class="" data-gjs-custom-name="Widget-arrow"></widget-arrow></container-show-hide><style>.popper_ArrowWidget_Blue.$$pageID$$ {width:auto;}</style>`)
	});
	bm.add("popper-dark-blue-arrow-widget", {
		label: "<img src='./img/blocks/blockIcon_PopperDarkBlue_wArrowWidget.png'></img><br>Popper Dark Blue + Arrow Widget",
		category: "Poppers",
		attributes: { class: "imgIcon" },
		content: AddPageIDToString(`<container-show-hide :visible="true" id="inyf" class="dropShadow textBackgroundBasic textBackground-DarkBlue popper_ArrowWidget_DarkBlue" data-gjs-custom-name="popper_ArrowWidget_DarkBlue"><p class="" data-gjs-custom-name="text_Popper">Popper Text</p><widget-arrow :visible="true" id="ikjm" :source-offset-x="50" :source-offset-y="0" :target-offset-x="100" :target-offset-y="100" source-id="inyf" color="#1b2937" :width="3" :show-head="true" :duration="0" :delay="0" class="" data-gjs-custom-name="Widget-arrow"></widget-arrow></container-show-hide><style>.popper_ArrowWidget_DarkBlue.$$pageID$$ {width:auto;}</style>`)
	});
	bm.add("popper-white2-arrow-widget", {
		label: "<img src='./img/blocks/blockIcon_PopperWhite2_wArrowWidget.png'></img><br>Popper White2 + Arrow Widget",
		category: "Poppers",
		attributes: { class: "imgIcon" },
		content: AddPageIDToString(`<container-show-hide :visible="true" id="inyf" class="dropShadow textBackgroundBasic textBackground-White2 popper_ArrowWidget_White2" data-gjs-custom-name="popper_ArrowWidget_White2"><p class="" data-gjs-custom-name="text_Popper">Popper Text</p><widget-arrow :visible="true" id="ikjm" :source-offset-x="50" :source-offset-y="0" :target-offset-x="100" :target-offset-y="100" source-id="inyf" color="#1b2937" :width="3" :show-head="true" :duration="0" :delay="0" class="" data-gjs-custom-name="Widget-arrow"></widget-arrow></container-show-hide><style>.popper_ArrowWidget_White2.$$pageID$$ {width:auto;}</style>`)
	});

	bm.add("popper-next-button", {
		label: "<img src='./img/blocks/blockIcon_Popper_wButtons_White.png'></img><br>Popper White + Next Button",
		category: "Poppers",
		attributes: { class: "imgIcon" },
		content: AddPageIDToString(`
			<widget-popper :visible="true" :click-to-dismiss="false" id="inpi" :delay="0" :delay-once="false" class="popperClickable popper_wNextButton" data-gjs-custom-name="popperB_wNextButton"><span class="popperText1" data-gjs-custom-name="popperText1">Popper Text</span>
				<container-show-hide :visible="false" id="iqb3" class="SH_PopperText_2" data-gjs-custom-name="SH_Text"><span class="" data-gjs-custom-name="popperText2">SH Popper Text</span></container-show-hide>
				<widget-button :visible="true" :enabled="true" id="iiyk" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iiyk',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iqb3',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'inpi',key:'visible',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iiyk',key:'visible',val:true},fireOnceID:'popperNextButton_RevealShowOnce_$$pageID$$',delay:2}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue button_PopperNext_Reveal" data-gjs-custom-name="button_PopperNext_Reveal">
					<p class="" data-gjs-custom-name="text">Next</p>
				</widget-button>
				<widget-button :visible="true" :enabled="true" id="ictf" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'inpi',key:'visible',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ictf',key:'visible',val:true},fireOnceID:'popperNextButton_DismissShowOnce_$$pageID$$',delay:2}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'inpi',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic_InvisibleW buttonBlinkBlue button_PopperNext_Dismiss" data-gjs-custom-name="button_PopperNext_Dismiss">
					<p class="" data-gjs-custom-name="text">Next</p>
				</widget-button>
			</widget-popper>
			<style>
			.popper_wNextButton.$$pageID$$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: min-content min-content min-content;
				grid-row-gap: 0;
			}
			.popperText1.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			.SH_PopperText_2.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
				margin: 2vh 0 0 0;
			}
			.button_PopperNext_Reveal.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 3;
				grid-row-end: 4;
				justify-self: start;
				margin: 2vh 0 0 0;
			}
			.button_PopperNext_Dismiss.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 3;
				grid-row-end: 4;
				justify-self: end;
				margin: 2vh 0 0 0;
			}
			</style>
		`)
	});
	bm.add("popper-blue-next-button", {
		label: "<img src='./img/blocks/blockIcon_Popper_wButtons_Blue.png'></img><br>Popper Blue + Next Button",
		category: "Poppers",
		attributes: { class: "imgIcon" },
		content: AddPageIDToString(`
		<widget-popper :visible="true" :click-to-dismiss="false" id="inpi" :delay="0" :delay-once="false" class="popperClickable textBackground-Popup-Blue popper_wNextButton" data-gjs-custom-name="popperB_wNextButton"><span class="popperText1" data-gjs-custom-name="popperText1">Popper Text</span>
			<container-show-hide :visible="false" id="iqb3" class="SH_PopperText_2" data-gjs-custom-name="SH_Text"><span class="" data-gjs-custom-name="popperText2">SH Popper Text</span></container-show-hide>
			<widget-button :visible="true" :enabled="true" id="iiyk" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iiyk',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iqb3',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'inpi',key:'visible',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iiyk',key:'visible',val:true},fireOnceID:'popperNextButton_RevealShowOnce_$$pageID$$',delay:2}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkWhite button_PopperNext_Reveal" data-gjs-custom-name="button_PopperNext_Reveal">
				<p class="" data-gjs-custom-name="text">Next</p>
			</widget-button>
			<widget-button :visible="true" :enabled="true" id="ictf" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'inpi',key:'visible',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ictf',key:'visible',val:true},fireOnceID:'popperNextButton_DismissShowOnce_$$pageID$$',delay:2}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'inpi',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic_InvisibleW buttonBlinkWhite button_PopperNext_Dismiss" data-gjs-custom-name="button_PopperNext_Dismiss">
				<p class="" data-gjs-custom-name="text">Next</p>
			</widget-button>
		</widget-popper>
		<style>
		.popper_wNextButton.$$pageID$$ {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: min-content min-content min-content;
			grid-row-gap: 0;
		}
		.popperText1.$$pageID$$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 2;
		}
		.SH_PopperText_2.$$pageID$$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 2;
			grid-row-end: 3;
			margin: 2vh 0 0 0;
		}
		.button_PopperNext_Reveal.$$pageID$$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 3;
			grid-row-end: 4;
			justify-self: start;
			margin: 2vh 0 0 0;
		}
		.button_PopperNext_Dismiss.$$pageID$$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 3;
			grid-row-end: 4;
			justify-self: end;
			margin: 2vh 0 0 0;
		}
		</style>
	`)
	});
	bm.add("popper-dark-blue-next-button", {
		label: "<img src='./img/blocks/blockIcon_Popper_wButtons_DarkBlue.png'></img><br>Popper Dark Blue + Next Button",
		category: "Poppers",
		attributes: { class: "imgIcon" },
		content: AddPageIDToString(`
		<widget-popper :visible="true" :click-to-dismiss="false" id="inpi" :delay="0" :delay-once="false" class="popperClickable textBackground-DarkBlue popper_wNextButton" data-gjs-custom-name="popperB_wNextButton"><span class="popperText1" data-gjs-custom-name="popperText1">Popper Text</span>
			<container-show-hide :visible="false" id="iqb3" class="SH_PopperText_2" data-gjs-custom-name="SH_Text"><span class="" data-gjs-custom-name="popperText2">SH Popper Text</span></container-show-hide>
			<widget-button :visible="true" :enabled="true" id="iiyk" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iiyk',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iqb3',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'inpi',key:'visible',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iiyk',key:'visible',val:true},fireOnceID:'popperNextButton_RevealShowOnce_$$pageID$$',delay:2}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkWhite button_PopperNext_Reveal" data-gjs-custom-name="button_PopperNext_Reveal">
				<p class="" data-gjs-custom-name="text">Next</p>
			</widget-button>
			<widget-button :visible="true" :enabled="true" id="ictf" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'inpi',key:'visible',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ictf',key:'visible',val:true},fireOnceID:'popperNextButton_DismissShowOnce_$$pageID$$',delay:2}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'inpi',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic_InvisibleW buttonBlinkWhite button_PopperNext_Dismiss" data-gjs-custom-name="button_PopperNext_Dismiss">
				<p class="" data-gjs-custom-name="text">Next</p>
			</widget-button>
		</widget-popper>
		<style>
		.popper_wNextButton.$$pageID$$ {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: min-content min-content min-content;
			grid-row-gap: 0;
		}
		.popperText1.$$pageID$$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 2;
		}
		.SH_PopperText_2.$$pageID$$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 2;
			grid-row-end: 3;
			margin: 2vh 0 0 0;
		}
		.button_PopperNext_Reveal.$$pageID$$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 3;
			grid-row-end: 4;
			justify-self: start;
			margin: 2vh 0 0 0;
		}
		.button_PopperNext_Dismiss.$$pageID$$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 3;
			grid-row-end: 4;
			justify-self: end;
			margin: 2vh 0 0 0;
		}
		</style>
	`)
	});
	bm.add("popper-white2-next-button", {
		label: "<img src='./img/blocks/blockIcon_Popper_wButtons_White2.png'></img><br>Popper White2 + Next Button",
		category: "Poppers",
		attributes: { class: "imgIcon" },
		content: AddPageIDToString(`
		<widget-popper :visible="true" :click-to-dismiss="false" id="inpi" :delay="0" :delay-once="false" class="popperClickable textBackground-White2 popper_wNextButton" data-gjs-custom-name="popperB_wNextButton"><span class="popperText1" data-gjs-custom-name="popperText1">Popper Text</span>
			<container-show-hide :visible="false" id="iqb3" class="SH_PopperText_2" data-gjs-custom-name="SH_Text"><span class="" data-gjs-custom-name="popperText2">SH Popper Text</span></container-show-hide>
			<widget-button :visible="true" :enabled="true" id="iiyk" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iiyk',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iqb3',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'inpi',key:'visible',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iiyk',key:'visible',val:true},fireOnceID:'popperNextButton_RevealShowOnce_$$pageID$$',delay:2}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue button_PopperNext_Reveal" data-gjs-custom-name="button_PopperNext_Reveal">
				<p class="" data-gjs-custom-name="text">Next</p>
			</widget-button>
			<widget-button :visible="true" :enabled="true" id="ictf" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'inpi',key:'visible',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ictf',key:'visible',val:true},fireOnceID:'popperNextButton_DismissShowOnce_$$pageID$$',delay:2}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'inpi',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic_InvisibleW buttonBlinkBlue button_PopperNext_Dismiss" data-gjs-custom-name="button_PopperNext_Dismiss">
				<p class="" data-gjs-custom-name="text">Next</p>
			</widget-button>
		</widget-popper>
		<style>
		.popper_wNextButton.$$pageID$$ {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: min-content min-content min-content;
			grid-row-gap: 0;
		}
		.popperText1.$$pageID$$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 2;
		}
		.SH_PopperText_2.$$pageID$$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 2;
			grid-row-end: 3;
			margin: 2vh 0 0 0;
		}
		.button_PopperNext_Reveal.$$pageID$$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 3;
			grid-row-end: 4;
			justify-self: start;
			margin: 2vh 0 0 0;
		}
		.button_PopperNext_Dismiss.$$pageID$$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 3;
			grid-row-end: 4;
			justify-self: end;
			margin: 2vh 0 0 0;
		}
		</style>
	`)
	});

	bm.add("popper-multi-arrow", {
		label: "<img src='./img/blocks/blockIcon_Popper_MultiArrow_White.png'></img><br>Multi-Arrow Popper White",
		category: "Poppers",
		attributes: { class: "imgIcon" },
		content: AddPageIDToString(`
			<container-show-hide :visible="true" id="it5f" class="popper_MultiArrow_White" data-gjs-custom-name="popper_MultiArrow_White">
				<container-show-hide :visible="true" id="i0t4" class="popperArrow_Up_White div_arrow_Top" data-gjs-custom-name="div_arrow_Top"></container-show-hide>
				<container-show-hide :visible="true" id="i45g" class="popperArrow_Right_White div_arrow_Right" data-gjs-custom-name="div_arrow_Right"></container-show-hide>
				<container-show-hide :visible="true" id="if7n" class="popperArrow_Left_White div_arrow_Left" data-gjs-custom-name="div_arrow_Left"></container-show-hide>
				<container-show-hide :visible="true" id="i4uw" class="popperArrow_Down_White div_arrow_Bottom" data-gjs-custom-name="div_arrow_Bottom"></container-show-hide>
				<div id="ixxm" class="dropShadow textBackgroundBasic div_Popper" data-gjs-custom-name="div_popper">
					<p class="" data-gjs-custom-name="text_Popper">Popper Text</p>
				</div>
			</container-show-hide>
			<style>
			.popper_MultiArrow_White.$$pageID$$ {
				display: grid;
				grid-template-columns: min-content 1fr min-content;
				grid-template-rows: min-content 1fr min-content;
			}
			.div_Popper.$$pageID$$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			.grid_popper.$$pageID$$ {
				display: grid;
				grid-template-rows: min-content 1fr 1fr;
				grid-template-columns: 1fr;
				width: auto;
			}
			.popperArrow_Up_White.$$pageID$$ {
				border-bottom-color: rgb(217, 217, 217);
				border-left-color: transparent;
				border-right-color: transparent;
				border-top-color: transparent;
				border-style: solid;
				border-width: 0vh 2vh 2vh 2vh;
				width: 0;
				height: 0;
			}
			.popperArrow_Right_White.$$pageID$$ {
				border-bottom-color: transparent;
				border-left-color: rgb(217, 217, 217);
				border-right-color: transparent;
				border-top-color: transparent;
				border-style: solid;
				border-width: 2vh 0vh 2vh 2vh;
				width: 0;
				height: 0;
			}
			.popperArrow_Left_White.$$pageID$$ {
				border-bottom-color: transparent;
				border-left-color: transparent;
				border-right-color: rgb(217, 217, 217);
				border-top-color: transparent;
				border-style: solid;
				border-width: 2vh 2vh 2vh 0vh;
				width: 0;
				height: 0;
			}
			.popperArrow_Down_White.$$pageID$$ {
				border-bottom-color: transparent;
				border-left-color: transparent;
				border-right-color: transparent;
				border-top-color: rgb(217, 217, 217);
				border-style: solid;
				border-width: 2vh 2vh 0vh 2vh;
				width: 0;
				height: 0;
			}
			.div_arrow_Top.$$pageID$$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 2;
				justify-self: center;
				align-self: stretch;
			}
			.div_arrow_Right.$$pageID$$ {
				grid-column-start: 3;
				grid-column-end: 4;
				grid-row-start: 2;
				grid-row-end: 3;
				align-self: center;
				justify-self: stretch;
			}
			.div_arrow_Left.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
				align-self: center;
				justify-self: stretch;
			}
			.div_arrow_Bottom.$$pageID$$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 3;
				grid-row-end: 4;
				justify-self: center;
				align-self: stretch;
			}
			</style>
		`)
	});
	bm.add("popper-blue-multi-arrow", {
		label: "<img src='./img/blocks/blockIcon_Popper_MultiArrow_Blue.png'></img><br>Multi-Arrow Popper Blue",
		category: "Poppers",
		attributes: { class: "imgIcon" },
		content: AddPageIDToString(`
			<container-show-hide :visible="true" id="it5f" class="popper_MultiArrow_Blue" data-gjs-custom-name="popper_MultiArrow_Blue">
				<container-show-hide :visible="true" id="i0t4" class="popperArrow_Up_Blue div_arrow_Top" data-gjs-custom-name="div_arrow_Top"></container-show-hide>
				<container-show-hide :visible="true" id="i45g" class="popperArrow_Right_Blue div_arrow_Right" data-gjs-custom-name="div_arrow_Right"></container-show-hide>
				<container-show-hide :visible="true" id="if7n" class="popperArrow_Left_Blue div_arrow_Left" data-gjs-custom-name="div_arrow_Left"></container-show-hide>
				<container-show-hide :visible="true" id="i4uw" class="popperArrow_Down_Blue div_arrow_Bottom" data-gjs-custom-name="div_arrow_Bottom"></container-show-hide>
				<div id="ixxm" class="dropShadow textBackgroundBasic textBackground-Popup-Blue div_Popper" data-gjs-custom-name="div_popper">
					<p class="" data-gjs-custom-name="text_Popper">Popper Text</p>
				</div>
			</container-show-hide>
			<style>
			.popper_MultiArrow_Blue.$$pageID$$ {
				display: grid;
				grid-template-columns: min-content 1fr min-content;
				grid-template-rows: min-content 1fr min-content;
			}
			.div_Popper.$$pageID$$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			.grid_popper.$$pageID$$ {
				display: grid;
				grid-template-rows: min-content 1fr 1fr;
				grid-template-columns: 1fr;
				width: auto;
			}
			.popperArrow_Up_Blue.$$pageID$$ {
				border-bottom-color: rgb(85, 188, 234);
				border-left-color: transparent;
				border-right-color: transparent;
				border-top-color: transparent;
				border-style: solid;
				border-width: 0vh 2vh 2vh 2vh;
				width: 0;
				height: 0;
			}
			.popperArrow_Right_Blue.$$pageID$$ {
				border-bottom-color: transparent;
				border-left-color: rgb(85, 188, 234);
				border-right-color: transparent;
				border-top-color: transparent;
				border-style: solid;
				border-width: 2vh 0vh 2vh 2vh;
				width: 0;
				height: 0;
			}
			.popperArrow_Left_Blue.$$pageID$$ {
				border-bottom-color: transparent;
				border-left-color: transparent;
				border-right-color: rgb(85, 188, 234);
				border-top-color: transparent;
				border-style: solid;
				border-width: 2vh 2vh 2vh 0vh;
				width: 0;
				height: 0;
			}
			.popperArrow_Down_Blue.$$pageID$$ {
				border-bottom-color: transparent;
				border-left-color: transparent;
				border-right-color: transparent;
				border-top-color: rgb(85, 188, 234);
				border-style: solid;
				border-width: 2vh 2vh 0vh 2vh;
				width: 0;
				height: 0;
			}
			.div_arrow_Top.$$pageID$$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 2;
				justify-self: center;
				align-self: stretch;
			}
			.div_arrow_Right.$$pageID$$ {
				grid-column-start: 3;
				grid-column-end: 4;
				grid-row-start: 2;
				grid-row-end: 3;
				align-self: center;
				justify-self: stretch;
			}
			.div_arrow_Left.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
				align-self: center;
				justify-self: stretch;
			}
			.div_arrow_Bottom.$$pageID$$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 3;
				grid-row-end: 4;
				justify-self: center;
				align-self: stretch;
			}
			</style>
		`)
	});
	bm.add("popper-db-multi-arrow", {
		label: "<img src='./img/blocks/blockIcon_Popper_MultiArrow_DarkBlue.png'></img><br>Multi-Arrow Popper Dark Blue",
		category: "Poppers",
		attributes: { class: "imgIcon" },
		content: AddPageIDToString(`
			<container-show-hide :visible="true" id="it5f" class="popper_MultiArrow_DarkBlue" data-gjs-custom-name="popper_MultiArrow_DarkBlue">
				<container-show-hide :visible="true" id="i0t4" class="popperArrow_Up_DarkBlue div_arrow_Top" data-gjs-custom-name="div_arrow_Top"></container-show-hide>
				<container-show-hide :visible="true" id="i45g" class="popperArrow_Right_DarkBlue div_arrow_Right" data-gjs-custom-name="div_arrow_Right"></container-show-hide>
				<container-show-hide :visible="true" id="if7n" class="popperArrow_Left_DarkBlue div_arrow_Left" data-gjs-custom-name="div_arrow_Left"></container-show-hide>
				<container-show-hide :visible="true" id="i4uw" class="popperArrow_Down_DarkBlue div_arrow_Bottom" data-gjs-custom-name="div_arrow_Bottom"></container-show-hide>
				<div id="ixxm" class="dropShadow textBackgroundBasic textBackground-DarkBlue div_Popper" data-gjs-custom-name="div_popper">
					<p class="" data-gjs-custom-name="text_Popper">Popper Text</p>
				</div>
			</container-show-hide>
			<style>
			.popper_MultiArrow_DarkBlue.$$pageID$$ {
				display: grid;
				grid-template-columns: min-content 1fr min-content;
				grid-template-rows: min-content 1fr min-content;
			}
			.div_Popper.$$pageID$$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			.grid_popper.$$pageID$$ {
				display: grid;
				grid-template-rows: min-content 1fr 1fr;
				grid-template-columns: 1fr;
				width: auto;
			}
			.popperArrow_Up_DarkBlue.$$pageID$$ {
				border-bottom-color: rgb(27, 41, 55);
				border-left-color: transparent;
				border-right-color: transparent;
				border-top-color: transparent;
				border-style: solid;
				border-width: 0vh 2vh 2vh 2vh;
				width: 0;
				height: 0;
			}
			.popperArrow_Right_DarkBlue.$$pageID$$ {
				border-bottom-color: transparent;
				border-left-color: rgb(27, 41, 55);
				border-right-color: transparent;
				border-top-color: transparent;
				border-style: solid;
				border-width: 2vh 0vh 2vh 2vh;
				width: 0;
				height: 0;
			}
			.popperArrow_Left_DarkBlue.$$pageID$$ {
				border-bottom-color: transparent;
				border-left-color: transparent;
				border-right-color: rgb(27, 41, 55);
				border-top-color: transparent;
				border-style: solid;
				border-width: 2vh 2vh 2vh 0vh;
				width: 0;
				height: 0;
			}
			.popperArrow_Down_DarkBlue.$$pageID$$ {
				border-bottom-color: transparent;
				border-left-color: transparent;
				border-right-color: transparent;
				border-top-color: rgb(27, 41, 55);
				border-style: solid;
				border-width: 2vh 2vh 0vh 2vh;
				width: 0;
				height: 0;
			}
			.div_arrow_Top.$$pageID$$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 2;
				justify-self: center;
				align-self: stretch;
			}
			.div_arrow_Right.$$pageID$$ {
				grid-column-start: 3;
				grid-column-end: 4;
				grid-row-start: 2;
				grid-row-end: 3;
				align-self: center;
				justify-self: stretch;
			}
			.div_arrow_Left.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
				align-self: center;
				justify-self: stretch;
			}
			.div_arrow_Bottom.$$pageID$$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 3;
				grid-row-end: 4;
				justify-self: center;
				align-self: stretch;
			}
			</style>
		`)
	});
	bm.add("popper-white2-multi-arrow", {
		label: "<img src='./img/blocks/blockIcon_Popper_MultiArrow_White2.png'></img><br>Multi-Arrow Popper White2",
		category: "Poppers",
		attributes: { class: "imgIcon" },
		content: AddPageIDToString(`
			<container-show-hide :visible="true" id="it5f" class="popper_MultiArrow_White2" data-gjs-custom-name="popper_MultiArrow_White2">
				<container-show-hide :visible="true" id="i0t4" class="popperArrow_Up_White2 div_arrow_Top" data-gjs-custom-name="div_arrow_Top"></container-show-hide>
				<container-show-hide :visible="true" id="i45g" class="popperArrow_Right_White2 div_arrow_Right" data-gjs-custom-name="div_arrow_Right"></container-show-hide>
				<container-show-hide :visible="true" id="if7n" class="popperArrow_Left_White2 div_arrow_Left" data-gjs-custom-name="div_arrow_Left"></container-show-hide>
				<container-show-hide :visible="true" id="i4uw" class="popperArrow_Down_White2 div_arrow_Bottom" data-gjs-custom-name="div_arrow_Bottom"></container-show-hide>
				<div id="ixxm" class="dropShadow textBackgroundBasic textBackground-White2 div_Popper" data-gjs-custom-name="div_popper">
					<p class="" data-gjs-custom-name="text_Popper">Popper Text</p>
				</div>
			</container-show-hide>
			<style>
			.popper_MultiArrow_White2.$$pageID$$ {
				display: grid;
				grid-template-columns: min-content 1fr min-content;
				grid-template-rows: min-content 1fr min-content;
			}
			.div_Popper.$$pageID$$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			.grid_popper.$$pageID$$ {
				display: grid;
				grid-template-rows: min-content 1fr 1fr;
				grid-template-columns: 1fr;
				width: auto;
			}
			.popperArrow_Up_White2.$$pageID$$ {
				border-bottom-color: rgb(27, 41, 55);
				border-left-color: transparent;
				border-right-color: transparent;
				border-top-color: transparent;
				border-style: solid;
				border-width: 0vh 2vh 2vh 2vh;
				width: 0;
				height: 0;
			}
			.popperArrow_Right_White2.$$pageID$$ {
				border-bottom-color: transparent;
				border-left-color: rgb(27, 41, 55);
				border-right-color: transparent;
				border-top-color: transparent;
				border-style: solid;
				border-width: 2vh 0vh 2vh 2vh;
				width: 0;
				height: 0;
			}
			.popperArrow_Left_White2.$$pageID$$ {
				border-bottom-color: transparent;
				border-left-color: transparent;
				border-right-color: rgb(27, 41, 55);
				border-top-color: transparent;
				border-style: solid;
				border-width: 2vh 2vh 2vh 0vh;
				width: 0;
				height: 0;
			}
			.popperArrow_Down_White2.$$pageID$$ {
				border-bottom-color: transparent;
				border-left-color: transparent;
				border-right-color: transparent;
				border-top-color: rgb(27, 41, 55);
				border-style: solid;
				border-width: 2vh 2vh 0vh 2vh;
				width: 0;
				height: 0;
			}
			.div_arrow_Top.$$pageID$$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 2;
				justify-self: center;
				align-self: stretch;
			}
			.div_arrow_Right.$$pageID$$ {
				grid-column-start: 3;
				grid-column-end: 4;
				grid-row-start: 2;
				grid-row-end: 3;
				align-self: center;
				justify-self: stretch;
			}
			.div_arrow_Left.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
				align-self: center;
				justify-self: stretch;
			}
			.div_arrow_Bottom.$$pageID$$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 3;
				grid-row-end: 4;
				justify-self: center;
				align-self: stretch;
			}
			</style>
		`)
	});
};
