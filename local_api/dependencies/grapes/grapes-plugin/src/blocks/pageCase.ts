import grapesjs from "grapesjs";

import { AddPageIDToString } from "../blocks";

export default (bm: grapesjs.BlockManagerInstance, config) => {

	bm.add("case-base", {
		label: "<img src='./img/blocks/blockIcon_Case_BaseV1.jpg'></img><br>Case Base V1",
		category: "Layout: Case Pages",
		attributes: {
			class: "imgIcon"
		},
		content: "<div class=' grid_CaseBase grid_CaseBase_MQ' data-gjs-custom-name='grid_CaseBase'><div class='dropShadow  item1_CaseBase_Header div_Header div_Header_MQ' data-gjs-custom-name='item1_CaseBase_Header'><div class='dot dotRed ' data-gjs-custom-name='div_Dot'></div><h1 class=' text_Header' data-gjs-custom-name='text_Header'>Page Title</h1></div><div class='dropShadow  item2_CaseBase_PageBackground div_PageBackground div_PageBackground_MQ' data-gjs-custom-name='item2_CaseBase_PageBackground'><div class='' data-gjs-custom-name='div_PageContent'><p class='' data-gjs-custom-name='text_Placeholder'>Page Content</p></div></div></div>"
	})

	bm.add("case-base-mini", {
		label: "<img src='./img/blocks/blockIcon_Case_BaseV1.jpg'></img><br>Case Base Mini",
		category: "Layout: Case Pages",
		attributes: {
			class: "imgIcon"
		},
		content: "<div class='grid_CaseBase_Mini' data-gjs-custom-name='grid_CaseBase_Mini'><div class='dropShadow item1_CaseBase_Header div_Header' data-gjs-custom-name='item1_CaseBase_Header'><div class='dot dotRed' data-gjs-custom-name='div_Dot'></div><h1 class='text_Header' data-gjs-custom-name='text_Header'>Page Title</h1></div><div class='dropShadow  item2_CaseBase_PageBackground div_PageBackground' data-gjs-custom-name='item2_CaseBase_PageBackground'><div class='' data-gjs-custom-name='div_PageContent'><p class='' data-gjs-custom-name='text_Placeholder'>Page Content</p></div></div></div>"
	})

	bm.add("page-hypothesis", {
		label:
			"<img src='./img/blocks/blockIcon_Hypothesis_Basic.jpg'></img><br>Hypothesis: Basic",
		category: "Layout: Case Pages",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`
		<div class="grid_CaseBase grid_CaseBase_MQ " data-gjs-custom-name="grid_CaseBase">
			<div class="dropShadow item1_CaseBase_Header div_Header div_Header_MQ " data-gjs-custom-name="item1_CaseBase_Header">
				<div class="dot dotRed " data-gjs-custom-name="div_Dot">
				</div>
				<h1 class="text_Header " data-gjs-custom-name="text_Header">Hypothesis
				</h1>
			</div>
			<div class="dropShadow item2_CaseBase_PageBackground div_PageBackground div_PageBackground_MQ " data-gjs-custom-name="item2_CaseBase_PageBackground">
				<div class="grid_T9 " data-gjs-custom-name="grid_T9">
				<div class="item1_T9 " data-gjs-custom-name="item1_T9">
					<p class="" data-gjs-custom-name="text_Top">text_1
					</p>
				</div>
				<div class="item2_T9 " data-gjs-custom-name="item2_T9">
					<p class=" marginBottom2" data-gjs-custom-name="text_Question">Question Text
					</p>
					<div class="grid_T16 " data-gjs-custom-name="grid_T16_ButtonsGrp">
					<widget-radio :visible="true" :enabled="true" id="iryq" group="i3am" class="buttonRadio  radioMultiLine radioFillHeight item1_T16 grid_T1" data-gjs-custom-name="item1_T16_grid_T1_Button1">
						<div class=" item1_T1 grid_T2" data-gjs-custom-name="item1_T1_grid_T2_TextGrp">
						<p class=" item1_T2" data-gjs-custom-name="item1_T2_text_ButtonLabel_1">Label 1
						</p>
						</div>
					</widget-radio>
					<widget-radio :visible="true" :enabled="true" id="i3bi" group="i3am" class="buttonRadio  radioMultiLine radioFillHeight item2_T16 grid_T1" data-gjs-custom-name="item2_T16_grid_T1_Button2">
						<div class=" item1_T1 grid_T2" data-gjs-custom-name="item1_T1_grid_T2_TextGrp">
						<p class=" item1_T2" data-gjs-custom-name="item1_T2_text_ButtonLabel_2">Label 2
						</p>
						</div>
					</widget-radio>
					<widget-radio :visible="true" :enabled="true" id="if3h" group="i3am" class="buttonRadio  radioMultiLine radioFillHeight item3_T16 grid_T1" data-gjs-custom-name="item3_T16_grid_T1_Button3">
						<div class=" item1_T1 grid_T2" data-gjs-custom-name="item1_T1_grid_T2_TextGrp">
						<p class=" item1_T2" data-gjs-custom-name="item1_T2_text_ButtonLabel_3">Label 3
						</p>
						</div>
					</widget-radio>
					</div>
				</div>
				<div class=" item3_T9" data-gjs-custom-name="item3_T9: Written Response Grp">
					<container-enable-disable :visible="false" :enabled="true" id="ir2c" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'radioSelection',group:'i3am',selected:'any'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ir2c',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class=" ED_EnableDisable" data-gjs-custom-name="ED_WR_Grp">
					<div class=" grid_T27" data-gjs-custom-name="grid_T27_WR_Grp">
						<p class=" item1_T27" data-gjs-custom-name="item1_T27_text_Question">Justify your choice by writing a hypothesis....
						</p>
						<div class=" item2_T27" data-gjs-custom-name="item2_T27_WRBox">
						<widget-textarea :visible="true" :enabled="true" id="iagl" placeholder="Type your answer here" shared-data-write-key="first_Hypo_Text" class=" WR_WritingField" data-gjs-custom-name="text_WritingField">
						</widget-textarea>
						</div>
						<div class=" item3_T27" data-gjs-custom-name="item3_T27_Submit">
						<widget-button :visible="true" :enabled="false" id="i32d" :conditions="{conditionList:[{comparisons:[{comparisonData:{comparisonType:'textLength',textID:'iagl'}},{comparisonData:{comparisonType:'radioSelection',group:'i3am',selected:'any'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i32d',key:'enabled',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'addClasses',widgetID:'i32d',classes:'buttonBlinkBlue '},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'i32d',key:'enabled',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i32d',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ir2c',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:null,key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'unlockNextPage'},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[{rubricID:'Case.Version.HypothesisMultipleChoice',responseData:{responseType:'radioGroup',format:'none',headerPairs:[{header:'',group:'i3am'}]},fireOnceID:''},{rubricID:'Case.Version.HypothesisExplanation',responseData:{responseType:'revisableWidget',headerPair:{header:'Initial Hypothesis',widgetID:'iagl',key:'text'}},fireOnceID:''}],responsesFail:[]}]}" class="buttonBasic-Grey " data-gjs-custom-name="button_Submit">
							<span class=" marginRight2 marginLeft2" data-gjs-custom-name="text_Submit">Submit</span>
						</widget-button>
						</div>
					</div>
					</container-enable-disable>
				</div>
				</div>
			</div>
		</div>
		<style>
		.grid_T1.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr;
			align-items:center;
			justify-items:center;
		  }
		  .item1_T1.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:2;
			grid-row-start:1;
			grid-row-end:2;
			justify-self:center;
			align-self:center;
			padding:1.5vh;
		  }
		  .grid_T2.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr;
			align-items:center;
			height:100%;
			width:100%;
		  }
		  .item1_T2.$$pageID$$ {
			align-self:center;
			grid-column-start:1;
			grid-column-end:2;
			grid-row-start:1;
			grid-row-end:2;
			justify-self:center;
		  }
		  .grid_T9.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr .5fr 1fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
		  }
		  .item1_T9.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		  }
		  .item2_T9.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		  }
		  .item3_T9.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		  }
		  .grid_T16.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr 1fr;
			grid-template-rows:1fr;
			grid-column-gap:3vh;
			grid-row-gap:0vh;
			width:100%;
		  }
		  .item1_T16.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		  }
		  .item2_T16.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		  }
		  .item3_T16.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		  }
		  .grid_T23.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:3fr 1fr;
			grid-column-gap:0vh;
			grid-row-gap:1.5vh;
			width:100%;
			height:100%;
		  }
		  .item1_T23.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		  }
		  .item2_T23.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		  }
		  .grid_T27.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr 1fr .5fr;
			grid-column-gap:0vh;
			grid-row-gap:1.5vh;
			width:100%;
		  }
		  .item1_T27.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		  }
		  .item2_T27.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		  }
		  .item3_T27.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		  }
		  .div_Submit.$$pageID$$ {
			height:4.5vh;
		  }
		  .WR_WritingField.$$pageID$$ {
			height:100%;
		  }
		</style>
		`),
	});

	

	bm.add("page-summary3", {
		label:
			"<img src='./img/blocks/blockIcon_CaseSummary3.jpg'></img><br>Case Summary (3)",
		category: "Layout: Case Pages",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`
		<div class="grid_CaseBase_Summary grid_CaseBase grid_CaseBase_MQ " data-gjs-custom-name="grid_CaseBase_Summary">
			<div class="dropShadow " data-gjs-custom-name="div_DropShadow">
			</div>
			<div class="item1_CaseBase_Header div_Header div_Header_MQ " data-gjs-custom-name="item1_CaseBase_Header">
				<div class="dot dotViolet " data-gjs-custom-name="div_Dot">
				</div>
				<h1 class="text_Header " data-gjs-custom-name="text_Header">Case Summary
				</h1>
			</div>
			<p class="item2_CaseBase_Summary_Instruction div_Summary_Instruction" data-gjs-custom-name="item2_CaseBase_text_Instruction">1. Answer the questions below to help you write your case summary.
				<br class="" data-gjs-custom-name="Br">2. Use the scroll bar on the right to move down the page.
			</p>
			<div class="item3_CaseBase_Summary_Questions div_Summary_Questions" data-gjs-custom-name="item3_CaseBase_Questions">
				<container-enable-disable :visible="false" :enabled="true" id="i1cc" class="ED_Questions " data-gjs-custom-name="ED_Questions">
					<div class="grid_Questions " data-gjs-custom-name="grid_Questions">
						<div class="item1_Q1 " data-gjs-custom-name="item1_Q1">
							<p class="text_Summary_Question_Title " data-gjs-custom-name="text_Summary_Question_Title">Question 1 Title
							</p>
							<p class="text_Summary_Question " data-gjs-custom-name="text_Summary_Question">Question text goes here.
							</p>
							<widget-textarea :visible="true" :enabled="true" id="im3p" placeholder="Type your answer here" class="TextArea " data-gjs-custom-name="text_Area_Q1">
							</widget-textarea>
						</div>
						<div class="item2_Q2 pagec7ef " data-gjs-custom-name="item2_Q2">
							<p class="text_Summary_Question_Title " data-gjs-custom-name="text_Summary_Question_Title">Question 2 Title
							</p>
							<p class="text_Summary_Question " data-gjs-custom-name="text_Summary_Question">Question text goes here.
							</p>
							<widget-textarea :visible="true" :enabled="true" id="ih67" placeholder="Type your answer here" class="" data-gjs-custom-name="text_Area_Q2">
							</widget-textarea>
						</div>
						<div class="item3_Q3 " data-gjs-custom-name="item3_Q3">
							<p class="text_Summary_Question_Title " data-gjs-custom-name="text_Summary_Question_Title">Question 3 Title
							</p>
							<p class="text_Summary_Question " data-gjs-custom-name="text_Summary_Question">Question text goes here.
							</p>
							<widget-textarea :visible="true" :enabled="true" id="iv8a" placeholder="Type your answer here" class="" data-gjs-custom-name="text_Area_Q3">
							</widget-textarea>
						</div>
					</div>
				</container-enable-disable>
			</div>
			<div class="item4_CaseBase_Summary_Submit div_Summary_Submit div_Submit_MQ " data-gjs-custom-name="item4_CaseBase_Submit">
				<widget-button text="" :visible="true" :enabled="false" id="it72" :conditions="{conditionList:[{comparisons:[{comparisonData:{comparisonType:'textLength',textID:'im3p'}},{comparisonData:{comparisonType:'textLength',textID:'ih67'}},{comparisonData:{comparisonType:'textLength',textID:'iv8a'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'it72',key:'enabled',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'it72',key:'enabled',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]},{comparisons:[{comparisonData:{comparisonType:'textLength',textID:'im3p'}},{comparisonData:{comparisonType:'textLength',textID:'ih67'}},{comparisonData:{comparisonType:'textLength',textID:'iv8a'}}],comparisonsLogic:'or',effectsPass:[],effectsFail:[],responsesPass:[{rubricID:'rubricIDHere',responseData:{responseType:'widget',format:'html',headerPairs:[{header:'question 1 text here...',widgetID:'im3p',key:'text'},{header:'question 2 text here...',widgetID:'ih67',key:'text'},{header:'question 3 text here...',widgetID:'iv8a',key:'text'}]}}],responsesFail:[]}]}" :click-effects="{conditionList:[{comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i1cc',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'it72',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'unlockNextPage'},fireOnceID:'c6_A_NextPageUnlock',delay:1},{effectData:{effectType:'updateWidget',widgetID:'i0ywf',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i8c5b',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ia8d',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[{rubricID:'Meiosis.A.CaseSummary',responseData:{responseType:'widget',format:'html',headerPairs:[{header:'Question 1 text...',widgetID:'im3p',key:'text'},{header:'Question 2 text...',widgetID:'ih67',key:'text'},{header:'Question 3 text...',widgetID:'iv8a',key:'text'}]},fireOnceID:''}],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue marginRight3 " data-gjs-custom-name="button_Submit">
					<p class="textSubmit marginLeft2 marginRight2 " data-gjs-custom-name="text_Submit">Submit
					</p>
				</widget-button>
				<container-show-hide :visible="true" id="ia8d" class="SH_SubmitNote " data-gjs-custom-name="SH_SubmitNote">
					<p class="" data-gjs-custom-name="text_SubmitNote">You can submit your case summary once you have answered
						<strong class="" data-gjs-custom-name="text_Bold">all</strong> of the questions.
					</p>
				</container-show-hide>
			</div>
			<widget-button :visible="false" :enabled="true" id="ilym" :conditions="{conditionList:[{evaluateWhen:'pageLoads',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ilym',key:'visible',val:true},fireOnceID:'beginSummaryButtonShow_$$pageID$$',delay:2}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ilym',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i1cc',key:'visible',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i0ywf',key:'visible',val:true},fireOnceID:'',delay:1},{effectData:{effectType:'updateWidget',widgetID:'i8c5b',key:'visible',val:true},fireOnceID:'',delay:2}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey item5_CaseBase_Summary_button_Begin buttonBlinkBlue " data-gjs-custom-name="item5_CaseBase_Summary_button_Begin">
				<p class="marginLeft2 marginRight2 " data-gjs-custom-name="text_BeginCaseSummary">Begin Case Summary
				</p>
			</widget-button>
			<container-show-hide :visible="true" id="ixml" class="item6_CaseBase_Summary_AnchorPopperScroll " data-gjs-custom-name="item6_CaseBase_Summary_AnchorPopperScroll_SH">
			</container-show-hide>
			<container-show-hide :visible="true" :enabled="true" id="ihky" class="item7_CaseBase_Summary_AnchorPopperReview " data-gjs-custom-name="item7_CaseBase_Summary_AnchorPopperReview_SH">
			</container-show-hide>
			<widget-popper :visible="false" :click-to-dismiss="true" id="i0ywf" :delay="0" :delay-once="false" :options="{placement:'right'}" anchor-id="ihky" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="textBackground-Popup-Blue " data-gjs-custom-name="popper_Blue_Review">
				<span class="" data-gjs-custom-name="Text">You can review any topic using the progress bar.</span>
			</widget-popper>
			<widget-popper :visible="false" :click-to-dismiss="true" :delay="0" :delay-once="false" :options="{placement:'left'}" anchor-id="ixml" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[],effectsFail:[],responsesPass:[],responsesFail:[]}]}" id="i8c5b" class="textBackground-Popup-Blue " data-gjs-custom-name="popper_Blue_Scroll">
				<span class="" data-gjs-custom-name="Text">Drag to scroll.</span>
			</widget-popper>
		</div>
		<style>
		.grid_Questions.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr 1fr 1fr;
			grid-row-gap:4.5vh;
		}
		.item1_Q1.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_Q2.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_Q3.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		.buttonBasic-Grey.$$pageID$$ {
			align-self:center;
		}
		.dropShadow.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 4;
			border-radius:1.5vh;
		}
		.SH_SubmitNote.$$pageID$$ {
			display:flex;
			align-items:center;
		}
		</style>
		`),
	});

	bm.add("page-summary4", {
		label:
			"<img src='./img/blocks/blockIcon_CaseSummary4.jpg'></img><br>Case Summary (4)",
		category: "Layout: Case Pages",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`
		<div class=" grid_CaseBase_Summary grid_CaseBase grid_CaseBase_MQ" data-gjs-custom-name="grid_CaseBase_Summary">
			<div class="dropShadow " data-gjs-custom-name="div_DropShadow">
			</div>
			<div class=" item1_CaseBase_Header div_Header div_Header_MQ" data-gjs-custom-name="item1_CaseBase_Header">
				<div class="dot dotViolet " data-gjs-custom-name="div_Dot">
				</div>
				<h1 class=" text_Header" data-gjs-custom-name="text_Header">Case Summary
				</h1>
			</div>
			<p class="item2_CaseBase_Summary_Instruction div_Summary_Instruction" data-gjs-custom-name="item2_CaseBase_text_Instruction">1. Answer the questions below to help you write your case summary.
				<br data-gjs-custom-name="Br">2. Use the scroll bar on the right to move down the page.
			</p>
			<div class=" item3_CaseBase_Summary_Questions div_Summary_Questions" data-gjs-custom-name="item3_CaseBase_Questions">
				<container-enable-disable :visible="false" :enabled="true" id="itxci" class=" ED_Questions" data-gjs-custom-name="ED_Questions">
					<div class=" grid_Questions" data-gjs-custom-name="grid_Questions">
						<div class="item1_Q1 " data-gjs-custom-name="item1_Q1">
							<p class="text_Summary_Question_Title " data-gjs-custom-name="text_Summary_Question_Title">Question 1 Title
							</p>
							<p class="text_Summary_Question " data-gjs-custom-name="text_Summary_Question">Question text goes here.
							</p>
							<widget-textarea :visible="true" :enabled="true" id="i04et" placeholder="Type your answer here" class="TextArea " data-gjs-custom-name="text_Area_Q1">
							</widget-textarea>
						</div>
						<div class="item2_Q2 pagec7ef" data-gjs-custom-name="item2_Q2">
							<p class="text_Summary_Question_Title " data-gjs-custom-name="text_Summary_Question_Title">Question 2 Title
							</p>
							<p class="text_Summary_Question " data-gjs-custom-name="text_Summary_Question">Question text goes here.
							</p>
							<widget-textarea :visible="true" :enabled="true" id="i7l0l" placeholder="Type your answer here" class="" data-gjs-custom-name="text_Area_Q2">
							</widget-textarea>
						</div>
						<div class="item3_Q3 " data-gjs-custom-name="item3_Q3">
							<p class="text_Summary_Question_Title " data-gjs-custom-name="text_Summary_Question_Title">Question 3 Title
							</p>
							<p class="text_Summary_Question " data-gjs-custom-name="text_Summary_Question">Question text goes here.
							</p>
							<widget-textarea :visible="true" :enabled="true" id="i1kmj" placeholder="Type your answer here" class="" data-gjs-custom-name="text_Area_Q3">
							</widget-textarea>
						</div>
						<div class="item4_Q4 " data-gjs-custom-name="item4_Q4">
							<p class="text_Summary_Question_Title " data-gjs-custom-name="text_Summary_Question_Title">Question 4 Title
							</p>
							<p class="text_Summary_Question " data-gjs-custom-name="text_Summary_Question">Question text goes here.
							</p>
							<widget-textarea :visible="true" :enabled="true" placeholder="Type your answer here" id="ir914" class="" data-gjs-custom-name="text_Area_Q4">
							</widget-textarea>
						</div>
					</div>
				</container-enable-disable>
			</div>
			<div class="item4_CaseBase_Summary_Submit div_Summary_Submit div_Submit_MQ" data-gjs-custom-name="item4_CaseBase_Submit">
				<widget-button text="" :visible="true" :enabled="false" id="iyhl3" :conditions="{conditionList:[{comparisons:[{comparisonData:{comparisonType:'textLength',textID:'i04et'}},{comparisonData:{comparisonType:'textLength',textID:'i7l0l'}},{comparisonData:{comparisonType:'textLength',textID:'i1kmj'}},{comparisonData:{comparisonType:'textLength',textID:'ir914'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iyhl3',key:'enabled',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'iyhl3',key:'enabled',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}, {comparisons:[{comparisonData:{comparisonType:'textLength',textID:'i04et'}},{comparisonData:{comparisonType:'textLength',textID:'i7l0l'}},{comparisonData:{comparisonType:'textLength',textID:'i1kmj'}},{comparisonData:{comparisonType:'textLength',textID:'ir914'}}],comparisonsLogic:'or',effectsPass:[],effectsFail:[],responsesPass:[{rubricID:'rubricIDHere',responseData:{responseType:'widget',format:'html',headerPairs:[{header:'question 1 text here...',widgetID:'i04et',key:'text'},{header:'question 2 text here...',widgetID:'i7l0l',key:'text'},{header:'question 3 text here...',widgetID:'i1kmj',key:'text'},{header:'question 4 text here...',widgetID:'ir914',key:'text'}]}}],responsesFail:[]}]}" :click-effects="{conditionList:[{comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'itxci',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iyhl3',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'unlockNextPage'},fireOnceID:'c6_A_NextPageUnlock',delay:1},{effectData:{effectType:'updateWidget',widgetID:'iiogt',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ima0fe',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ijrst',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[{rubricID:'Meiosis.A.CaseSummary',responseData:{responseType:'widget',format:'html',headerPairs:[{header:'Question 1 text...',widgetID:'i04et',key:'text'},{header:'Question 2 text...',widgetID:'i7l0l',key:'text'},{header:'Question 3 text...',widgetID:'i1kmj',key:'text'},{header:'Question 4 text...',widgetID:'ir914',key:'text'}]},fireOnceID:''}],responsesFail:[]}]}" class="buttonBasic-Grey  buttonBlinkBlue marginRight3" data-gjs-custom-name="button_Submit">
					<p class="textSubmit  marginLeft2 marginRight2" data-gjs-custom-name="text_Submit">Submit
					</p>
				</widget-button>
				<container-show-hide :visible="true" id="ijrst" class="SH_SubmitNote " data-gjs-custom-name="SH_SubmitNote">
					<p class="" data-gjs-custom-name="text_SubmitNote">You can submit your case summary once you have answered
						<strong class="" data-gjs-custom-name="text_Bold">all</strong> of the questions.
					</p>
				</container-show-hide>
			</div>
			<widget-button :visible="false" :enabled="true" id="ir12s" :conditions="{conditionList:[{evaluateWhen:'pageLoads',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ir12s',key:'visible',val:true},fireOnceID:'beginSummaryButtonShow_$$pageID$$',delay:2}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ir12s',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'itxci',key:'visible',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iiogt',key:'visible',val:true},fireOnceID:'',delay:1},{effectData:{effectType:'updateWidget',widgetID:'ima0fe',key:'visible',val:true},fireOnceID:'',delay:2}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey  item5_CaseBase_Summary_button_Begin buttonBlinkBlue" data-gjs-custom-name="item5_CaseBase_Summary_button_Begin">
				<p class="marginLeft2 marginRight2 " data-gjs-custom-name="text_BeginCaseSummary">Begin Case Summary
				</p>
			</widget-button>
			<container-show-hide :visible="true" id="imzh" class=" item6_CaseBase_Summary_AnchorPopperScroll" data-gjs-custom-name="item6_CaseBase_Summary_AnchorPopperScroll_SH">
			</container-show-hide>
			<container-show-hide :visible="true" :enabled="true" id="id6lk" class="item7_CaseBase_Summary_AnchorPopperReview " data-gjs-custom-name="item7_CaseBase_Summary_AnchorPopperReview_SH">
			</container-show-hide>
			<widget-popper :visible="false" :click-to-dismiss="true" id="iiogt" :delay="0" :delay-once="false" :options="{placement:'right'}" anchor-id="id6lk" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="textBackground-Popup-Blue " data-gjs-custom-name="popper_Blue_Review">
				<span class="" data-gjs-custom-name="Text">You can review any topic using the progress bar.</span>
			</widget-popper>
			<widget-popper :visible="false" :click-to-dismiss="true" :delay="0" :delay-once="false" :options="{placement:'left'}" anchor-id="imzh" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[],effectsFail:[],responsesPass:[],responsesFail:[]}]}" id="ima0fe" class="textBackground-Popup-Blue " data-gjs-custom-name="popper_Blue_Scroll">
				<span class="" data-gjs-custom-name="Text">Drag to scroll.</span>
			</widget-popper>
		</div>
		<style>
				.grid_Questions.$$pageID$$ {
					display:grid;
					grid-template-columns:1fr;
					grid-template-rows:1fr 1fr 1fr 1fr;
					grid-row-gap:4.5vh;
				}
				.item1_Q1.$$pageID$$ {
					grid-column-start:1;
					grid-column-end:span 1;
					grid-row-start:1;
					grid-row-end:span 1;
				}
				.item2_Q2.$$pageID$$ {
					grid-column-start:1;
					grid-column-end:span 1;
					grid-row-start:2;
					grid-row-end:span 1;
				}
				.item3_Q3.$$pageID$$ {
					grid-column-start:1;
					grid-column-end:span 1;
					grid-row-start:3;
					grid-row-end:span 1;
				}
				.item4_Q4.$$pageID$$ {
					grid-column-start:1;
					grid-column-end:span 1;
					grid-row-start:4;
					grid-row-end:span 1;
				}
				.buttonBasic-Grey.$$pageID$$ {
					align-self:center;
				}
				.dropShadow.$$pageID$$ {
					grid-column-start:1;
					grid-column-end:span 1;
					grid-row-start:1;
					grid-row-end:span 4;
					border-radius:1.5vh;
				}
				.SH_SubmitNote.$$pageID$$ {
					display:flex;
					align-items:center;
				}
		</style>
		`),
	});

	bm.add("page-summary5", {
		label:
			"<img src='./img/blocks/blockIcon_CaseSummary5.jpg'></img><br>Case Summary (5)",
		category: "Layout: Case Pages",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`
		<div class=" grid_CaseBase_Summary grid_CaseBase grid_CaseBase_MQ" data-gjs-custom-name="grid_CaseBase_Summary">
			<div class="dropShadow " data-gjs-custom-name="div_DropShadow">
			</div>
			<div class=" item1_CaseBase_Header div_Header div_Header_MQ" data-gjs-custom-name="item1_CaseBase_Header">
				<div class="dot dotViolet " data-gjs-custom-name="div_Dot">
				</div>
				<h1 class=" text_Header" data-gjs-custom-name="text_Header">Case Summary
				</h1>
			</div>
			<p class="item2_CaseBase_Summary_Instruction div_Summary_Instruction" data-gjs-custom-name="item2_CaseBase_text_Instruction">1. Answer the questions below to help you write your case summary.
				<br data-gjs-custom-name="Br">2. Use the scroll bar on the right to move down the page.
			</p>
			<div class=" item3_CaseBase_Summary_Questions div_Summary_Questions" data-gjs-custom-name="item3_CaseBase_Questions">
				<container-enable-disable :visible="false" :enabled="true" id="itxci" class=" ED_Questions" data-gjs-custom-name="ED_Questions">
					<div class=" grid_Questions" data-gjs-custom-name="grid_Questions">
						<div class="item1_Q1 " data-gjs-custom-name="item1_Q1">
							<p class="text_Summary_Question_Title " data-gjs-custom-name="text_Summary_Question_Title">Question 1 Title
							</p>
							<p class="text_Summary_Question " data-gjs-custom-name="text_Summary_Question">Question text goes here.
							</p>
							<widget-textarea :visible="true" :enabled="true" id="i04et" placeholder="Type your answer here" class="TextArea " data-gjs-custom-name="text_Area_Q1">
							</widget-textarea>
						</div>
						<div class="item2_Q2 pagec7ef" data-gjs-custom-name="item2_Q2">
							<p class="text_Summary_Question_Title " data-gjs-custom-name="text_Summary_Question_Title">Question 2 Title
							</p>
							<p class="text_Summary_Question " data-gjs-custom-name="text_Summary_Question">Question text goes here.
							</p>
							<widget-textarea :visible="true" :enabled="true" id="i7l0l" placeholder="Type your answer here" class="" data-gjs-custom-name="text_Area_Q2">
							</widget-textarea>
						</div>
						<div class="item3_Q3 " data-gjs-custom-name="item3_Q3">
							<p class="text_Summary_Question_Title " data-gjs-custom-name="text_Summary_Question_Title">Question 3 Title
							</p>
							<p class="text_Summary_Question " data-gjs-custom-name="text_Summary_Question">Question text goes here.
							</p>
							<widget-textarea :visible="true" :enabled="true" id="i1kmj" placeholder="Type your answer here" class="" data-gjs-custom-name="text_Area_Q3">
							</widget-textarea>
						</div>
						<div class="item4_Q4 " data-gjs-custom-name="item4_Q4">
							<p class="text_Summary_Question_Title " data-gjs-custom-name="text_Summary_Question_Title">Question 4 Title
							</p>
							<p class="text_Summary_Question " data-gjs-custom-name="text_Summary_Question">Question text goes here.
							</p>
							<widget-textarea :visible="true" :enabled="true" placeholder="Type your answer here" id="ir914" class="" data-gjs-custom-name="text_Area_Q4">
							</widget-textarea>
						</div>
						<div class=" item5_Q5" data-gjs-custom-name="item5_Q5">
							<p class="text_Summary_Question_Title " data-gjs-custom-name="text_Summary_Question_Title">Question 5 Title
							</p>
							<p class="text_Summary_Question " data-gjs-custom-name="text_Summary_Question">Question text goes here.
							</p>
							<widget-textarea :visible="true" :enabled="true" placeholder="Type your answer here" id="img4oa" class="" data-gjs-custom-name="text_Area_Q5">
							</widget-textarea>
						</div>
					</div>
				</container-enable-disable>
			</div>
			<div class="item4_CaseBase_Summary_Submit div_Summary_Submit div_Submit_MQ" data-gjs-custom-name="item4_CaseBase_Submit">
				<widget-button text="" :visible="true" :enabled="false" id="iyhl3" :conditions="{conditionList:[{comparisons:[{comparisonData:{comparisonType:'textLength',textID:'i04et'}},{comparisonData:{comparisonType:'textLength',textID:'i7l0l'}},{comparisonData:{comparisonType:'textLength',textID:'i1kmj'}},{comparisonData:{comparisonType:'textLength',textID:'ir914'}},{comparisonData:{comparisonType:'textLength',textID:'img4oa'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iyhl3',key:'enabled',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'iyhl3',key:'enabled',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}, {comparisons:[{comparisonData:{comparisonType:'textLength',textID:'i04et'}},{comparisonData:{comparisonType:'textLength',textID:'i7l0l'}},{comparisonData:{comparisonType:'textLength',textID:'i1kmj'}},{comparisonData:{comparisonType:'textLength',textID:'ir914'}},{comparisonData:{comparisonType:'textLength',textID:'img4oa'}}],comparisonsLogic:'or',effectsPass:[],effectsFail:[],responsesPass:[{rubricID:'rubricIDHere',responseData:{responseType:'widget',format:'html',headerPairs:[{header:'question 1 text here...',widgetID:'i04et',key:'text'},{header:'question 2 text here...',widgetID:'i7l0l',key:'text'},{header:'question 3 text here...',widgetID:'i1kmj',key:'text'},{header:'question 4 text here...',widgetID:'ir914',key:'text'},{header:'question 5 text here...',widgetID:'img4oa',key:'text'}]}}],responsesFail:[]}]}" :click-effects="{conditionList:[{comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'itxci',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iyhl3',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'unlockNextPage'},fireOnceID:'c6_A_NextPageUnlock',delay:1},{effectData:{effectType:'updateWidget',widgetID:'iiogt',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ima0fe',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ijrst',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[{rubricID:'Meiosis.A.CaseSummary',responseData:{responseType:'widget',format:'html',headerPairs:[{header:'Question 1 text...',widgetID:'i04et',key:'text'},{header:'Question 2 text...',widgetID:'i7l0l',key:'text'},{header:'Question 3 text...',widgetID:'i1kmj',key:'text'},{header:'Question 4 text...',widgetID:'ir914',key:'text'},{header:'Question 5 text...',widgetID:'img4oa',key:'text'}]},fireOnceID:''}],responsesFail:[]}]}" class="buttonBasic-Grey  buttonBlinkBlue marginRight3" data-gjs-custom-name="button_Submit">
					<p class="textSubmit  marginLeft2 marginRight2" data-gjs-custom-name="text_Submit">Submit
					</p>
				</widget-button>
				<container-show-hide :visible="true" id="ijrst" class="SH_SubmitNote " data-gjs-custom-name="SH_SubmitNote">
					<p class="" data-gjs-custom-name="text_SubmitNote">You can submit your case summary once you have answered
						<strong class="" data-gjs-custom-name="text_Bold">all</strong> of the questions.
					</p>
				</container-show-hide>
			</div>
			<widget-button :visible="false" :enabled="true" id="ir12s" :conditions="{conditionList:[{evaluateWhen:'pageLoads',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ir12s',key:'visible',val:true},fireOnceID:'beginSummaryButtonShow_$$pageID$$',delay:2}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ir12s',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'itxci',key:'visible',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iiogt',key:'visible',val:true},fireOnceID:'',delay:1},{effectData:{effectType:'updateWidget',widgetID:'ima0fe',key:'visible',val:true},fireOnceID:'',delay:2}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey  item5_CaseBase_Summary_button_Begin buttonBlinkBlue" data-gjs-custom-name="item5_CaseBase_Summary_button_Begin">
				<p class="marginLeft2 marginRight2 " data-gjs-custom-name="text_BeginCaseSummary">Begin Case Summary
				</p>
			</widget-button>
			<container-show-hide :visible="true" id="imzh" class=" item6_CaseBase_Summary_AnchorPopperScroll" data-gjs-custom-name="item6_CaseBase_Summary_AnchorPopperScroll_SH">
			</container-show-hide>
			<container-show-hide :visible="true" :enabled="true" id="id6lk" class="item7_CaseBase_Summary_AnchorPopperReview " data-gjs-custom-name="item7_CaseBase_Summary_AnchorPopperReview_SH">
			</container-show-hide>
			<widget-popper :visible="false" :click-to-dismiss="true" id="iiogt" :delay="0" :delay-once="false" :options="{placement:'right'}" anchor-id="id6lk" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="textBackground-Popup-Blue " data-gjs-custom-name="popper_Blue_Review">
				<span class="" data-gjs-custom-name="Text">You can review any topic using the progress bar.</span>
			</widget-popper>
			<widget-popper :visible="false" :click-to-dismiss="true" :delay="0" :delay-once="false" :options="{placement:'left'}" anchor-id="imzh" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[],effectsFail:[],responsesPass:[],responsesFail:[]}]}" id="ima0fe" class="textBackground-Popup-Blue " data-gjs-custom-name="popper_Blue_Scroll">
				<span class="" data-gjs-custom-name="Text">Drag to scroll.</span>
			</widget-popper>
		</div>
		<style>
		.grid_Questions.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr 1fr 1fr 1fr 1fr;
			grid-row-gap:4.5vh;
		}
		.item1_Q1.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_Q2.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_Q3.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		.item4_Q4.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:4;
			grid-row-end:span 1;
		}
		.item5_Q5.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:5;
			grid-row-end:span 1;
		}
		.buttonBasic-Grey.$$pageID$$ {
			align-self:center;
		}
		.dropShadow.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 4;
			border-radius:1.5vh;
		}
		.SH_SubmitNote.$$pageID$$ {
			display:flex;
			align-items:center;
		}
		</style>
		`),
	});
	bm.add("case-further-research", {
		label:
			"<img src='./img/blocks/blockIcon_HandbookSimFullPage.jpg'></img><br>Case: Further Research",
		category: "Layout: Case Pages",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`
			<div class="grid_CaseBase grid_CaseBase_MQ bg_Image" data-gjs-custom-name="grid_CaseBase">
				<div class="dropShadow item1_CaseBase_Header div_Header div_Header_MQ " data-gjs-custom-name="item1_CaseBase_Header">
					<div class="dot dotRed " data-gjs-custom-name="div_Dot"></div>
					<h1 class="text_Header " data-gjs-custom-name="text_Header">Further Research</h1>
				</div>
				<div class="dropShadow item2_CaseBase_PageBackground div_PageBackground div_PageBackground_MQ " data-gjs-custom-name="item2_CaseBase_PageBackground">
					<div class=" grid_PageContent" data-gjs-custom-name="grid_PageContent">
						<container-enable-disable :visible="true" :enabled="true" id="i3cl" :conditions="{conditionList:[{evaluateWhen:'pageLoads',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'unlockNextPage'},fireOnceID:'unlockNext_',delay:4}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="ED_UnlockNextPage_OnPageLoad " data-gjs-custom-name="ED_UnlockNextPage_OnPageLoad"></container-enable-disable>
						<p class=" text_PC" data-gjs-custom-name="text_PC">Body text</p>
						<div class=" item1_PC articleLink_Boxes" data-gjs-custom-name="item1_PC">
							<p class=" colorBlack text_LinkDescription" data-gjs-custom-name="text_LinkDescription">Link Description</p>
							<div class=" div_ImageLink" data-gjs-custom-name="div_ImageLink">
								<widget-image src="" :visible="true" id="i6za" class=" images_Style" data-gjs-custom-name="image_1"></widget-image>
							</div><a href="" target="_blank" class=" textCenter link_External" data-gjs-custom-name="link_1">Article Link</a>
							<div class=" greyLine_Horizontal" data-gjs-custom-name="greyLine_Horizontal"></div>
							<div class=" greyLine_Vertical" data-gjs-custom-name="greyLine_Vertical"></div>
						</div>
						<div class=" articleLink_Boxes item2_PC" data-gjs-custom-name="item2_PC">
							<p class=" colorBlack text_LinkDescription" data-gjs-custom-name="text_LinkDescription">Link Description</p>
							<div class=" div_ImageLink" data-gjs-custom-name="div_ImageLink">
								<widget-image src="" :visible="true" id="izb4x" class=" images_Style" data-gjs-custom-name="image_2"></widget-image>
							</div><a href="" target="_blank" class=" textCenter link_External" data-gjs-custom-name="link_2">Article Link</a>
							<div class=" greyLine_Horizontal" data-gjs-custom-name="greyLine_Horizontal"></div>
							<div class=" greyLine_Vertical" data-gjs-custom-name="greyLine_Vertical"></div>
						</div>
						<div class=" articleLink_Boxes item3_PC" data-gjs-custom-name="item3_PC">
							<p class=" colorBlack text_LinkDescription" data-gjs-custom-name="text_LinkDescription">Link Description</p>
							<div class=" div_ImageLink" data-gjs-custom-name="div_ImageLink">
								<widget-image src="" :visible="true" id="i1pa6" class=" images_Style" data-gjs-custom-name="image_3"></widget-image>
							</div><a href="" target="_blank" class=" textCenter link_External" data-gjs-custom-name="link_3">Article Link</a>
							<div class=" greyLine_Horizontal" data-gjs-custom-name="greyLine_Horizontal"></div>
							<div class=" greyLine_Vertical" data-gjs-custom-name="greyLine_Vertical"></div>
						</div>
						<div class=" articleLink_Boxes item4_PC" data-gjs-custom-name="item4_PC">
							<p class=" colorBlack text_LinkDescription" data-gjs-custom-name="text_LinkDescription">Link Description</p>
							<div class=" div_ImageLink" data-gjs-custom-name="div_ImageLink">
								<widget-image :visible="true" id="ikg6g" src="" class=" images_Style" data-gjs-custom-name="image_4"></widget-image>
							</div><a href="" target="_blank" class=" textCenter link_External" data-gjs-custom-name="link_4">Article Link</a>
							<div class=" greyLine_Horizontal" data-gjs-custom-name="greyLine_Horizontal"></div>
							<div class=" greyLine_Vertical" data-gjs-custom-name="greyLine_Vertical"></div>
						</div>
					</div>
				</div>
			</div>
			<style>
			.grid_PageContent.$pageID$ {
				display: grid;
				grid-template-columns: 1fr 1fr;
				grid-template-rows: min-content 1fr 1fr;
				width: 100%;
				height: 100%;
				grid-column-gap: 4vh;
				grid-row-gap: 4vh;
			}
			.text_PC.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			.item1_PC.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			.item2_PC.$pageID$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			.item3_PC.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 3;
				grid-row-end: 4;
			}
			.item4_PC.$pageID$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 3;
				grid-row-end: 4;
			}
			.articleLink_Boxes.$pageID$ {
				display: grid;
				grid-template-columns: min-content 1fr;
				grid-template-rows: 1fr min-content;
				background-color: #efefef;
				height: 27.5vh;
				width: auto;
				border-radius: 1vh;
			}
			.div_ImageLink.$pageID$ {
				overflow: hidden;
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 3;
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr;
				width: 24vh;
				height: 27.5vh;
				padding: 0.25vh 0 0.25vh 0.25vh;
				justify-self: center;
				align-self: center;
			}
			.images_Style.$pageID$ {
				height: 27vh;
				width: auto;
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				justify-self: center;
				align-self: center;
				border-radius: .75vh 0 0 .75vh;
			}
			.text_LinkDescription.$pageID$ {
				padding: 2vh 2vh 2vh 2vh;
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 2;
				font-size: 2.5vh;
			}
			.link_External.$pageID$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 2;
				grid-row-end: 3;
				padding: 2vh 2vh 2vh 2vh;
			}
			.greyLine_Horizontal.$pageID$ {
				background-color: #d4d3d3;
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 2;
				justify-self: stretch;
				width: 100%;
				align-self: end;
				height: 0.2vh;
			}
			.greyLine_Vertical.$pageID$ {
				background-color: #d4d3d3;
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 3;
				width: 0.2%;
				height: 100%;
				align-self: stretch;
				justify-self: start;
			}
			.bg_Image.$pageID$ {
				background-image: none;
				background-repeat: no-repeat;
				background-attachment: local;
				background-position: center center;
				background-size: cover;
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
		`)
	});

	bm.add("page-completed", {
		label:
			"<img src='./img/blocks/blockIcon_CaseCompleted_Sim.jpg'></img><br>Case Completed - Sim",
		category: "Layout: Case Pages",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`
		<div class="simParent " data-gjs-custom-name="page_SimParent_FullPage">
			<widget-sim-view id="ie7s" scenename="Fish Tank Lab" simstateid="3u5eiy" :visible="true" :enabled="true" play-state="default" class="simPreview " data-gjs-custom-name="widget_SimView">
			</widget-sim-view>
			<div class=" grid_T62" data-gjs-custom-name="grid_T62_PageContent">
				<div class=" item1_T62_Header" data-gjs-custom-name="item1_T62_Header">
				<h2 class="text_Completed  colorWhite textCenter" data-gjs-custom-name="text_Completed">You Have Completed the _______ Case!
				</h2>
				</div>
				<div class=" item2_T62_grid_Footer" data-gjs-custom-name="item2_T62_grid_Footer">
				<widget-image src="../../assets/case/SVG/Other/logo_GA_Color_SVG.svg" :visible="true" id="i0i4" class=" item1_Footer_image_GAPeach" data-gjs-custom-name="item1_Footer_image_GAPeach">
				</widget-image>
				<p class="item1_Footer_text_Credits  colorWhite" data-gjs-custom-name="item2_Footer_text_Credits">This project was completed with assistance from the Digital Entertainment team, a division of the Georgia Department of Economic Development
				</p>
				<div class=" item3_Footer_div_Music" data-gjs-custom-name="item3_Footer_div_Music">
					<span class=" white" data-gjs-custom-name="Music Credit">Music Credit:&nbsp;</span>
					<widget-link :options="{type:'external',href:'https://freemusicarchive.org/music/Chris_Zabriskie/Vendaface/',target:'_blank'}" text="Chris Zabriskie, Album: [AlbumName]" :visible="true" id="ioui" class="page04fc link" data-gjs-custom-name="Album Link">
					</widget-link>
					<span class=" white" data-gjs-custom-name="License">&nbsp;- License:&nbsp;</span>
					<widget-link :options="{type:'external',href:'https://creativecommons.org/licenses/by/4.0/',target:'_blank'}" text="CC BY 4.0" :visible="true" id="i922v" class=" link" data-gjs-custom-name="License Link">
					</widget-link>
				</div>
				</div>
			</div>
		</div>
		<style>
		.grid_T62.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:min-content 1fr 0.2fr;
			width:100%;
			height:100%;
			z-index:1;
			position:relative;
		  }
		  .item1_T62_Header.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:2;
			grid-row-start:1;
			grid-row-end:2;
			display:flex;
			padding:3vh;
			background-color:rgba(57, 58, 57, 0.9);
			align-items:center;
			justify-content:center;
		  }
		  .item2_T62_grid_Footer.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:2;
			grid-row-start:3;
			grid-row-end:4;
			padding:3vh 5vh 3vh 5vh;
			background-color:rgba(57, 58, 57, 0.9);
			justify-self:stretch;
			align-self:stretch;
			justify-content:center;
			align-items:center;
			display:grid;
			grid-template-columns:0.1fr 1fr;
			grid-template-rows:1fr 1fr;
		grid-column-gap:5vh;
		  }
		  .item1_Footer_image_GAPeach.$$pageID$$ {
			height:4rem;
			grid-column-start:1;
			grid-column-end:2;
			grid-row-start:1;
			grid-row-end:2;
			width:auto;
			margin:0vh;
			align-self:center;
			justify-self:end;
		  }
		  .item1_Footer_text_Credits.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:3;
			grid-row-start:1;
			grid-row-end:2;
		  }
		  .item3_Footer_div_Music.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:3;
			grid-row-start:2;
			text-align:center;
		  }
		  .simPreview.$$pageID$$ {
			width:100%;
			height:100%;
			z-index:0;
			top:0vh;
			right:0vh;
			position:absolute;
			background-color:rgb(255, 255, 255);
		  }
		  .simParent.$$pageID$$ {
			width:100%;
			height:100%;
			position:relative;
			top:0vh;
			margin:0vh;
		  }
		</style>
		`),
	});

	bm.add("page-completedImg", {
		label:
			"<img src='./img/blocks/blockIcon_CaseCompleted_Img.jpg'></img><br>Case Completed - Img",
		category: "Layout: Case Pages",
		attributes: {
			class: "imgIcon",
		},
		content: AddPageIDToString(`
		<div class=" bodyParent" data-gjs-custom-name="page_CaseCompleted">
			<div class=" grid_T62" data-gjs-custom-name="grid_T62_PageContent">
				<div class=" item1_T62_Header" data-gjs-custom-name="item1_T62_Header">
				<h2 class="text_Completed  colorWhite textCenter" data-gjs-custom-name="text_Completed">You Have Completed the _______ Case!
				</h2>
				</div>
				<div class=" item2_T62_grid_Footer" data-gjs-custom-name="item2_T62_grid_Footer">
				<widget-image src="../../assets/case/SVG/Other/logo_GA_Color_SVG.svg" :visible="true" id="i0i4" class=" item1_Footer_image_GAPeach" data-gjs-custom-name="item1_Footer_image_GAPeach">
				</widget-image>
				<p class="item1_Footer_text_Credits  colorWhite" data-gjs-custom-name="item2_Footer_text_Credits">This project was completed with assistance from the Digital Entertainment team, a division of the Georgia Department of Economic Development
				</p>
				<div class=" item3_Footer_div_Music" data-gjs-custom-name="item3_Footer_div_Music">
					<span class=" white" data-gjs-custom-name="Music Credit">Music Credit:&nbsp;</span>
					<widget-link :options="{type:'external',href:'https://freemusicarchive.org/music/Chris_Zabriskie/Vendaface/',target:'_blank'}" text="Chris Zabriskie, Album: [AlbumName]" :visible="true" id="ioui" class=" link" data-gjs-custom-name="Album Link">
					</widget-link>
					<span class=" white" data-gjs-custom-name="License">&nbsp;- License:&nbsp;</span>
					<widget-link :options="{type:'external',href:'https://creativecommons.org/licenses/by/4.0/',target:'_blank'}" text="CC BY 4.0" :visible="true" id="i922v" class=" link" data-gjs-custom-name="License Link">
					</widget-link>
				</div>
				</div>
			</div>
		</div>
		<style>
		.grid_T62.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:min-content 1fr 0.2fr;
			width:100%;
			height:100%;
		  }
		  .item1_T62_Header.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:2;
			grid-row-start:1;
			grid-row-end:2;
			display:flex;
			padding:3vh;
			background-color:rgba(57, 58, 57, 0.9);
			align-items:center;
			justify-content:center;
		  }
		  .item2_T62_grid_Footer.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:2;
			grid-row-start:3;
			grid-row-end:4;
			padding:3vh 5vh 3vh 5vh;
			background-color:rgba(57, 58, 57, 0.9);
			justify-self:stretch;
			align-self:stretch;
			justify-content:center;
			align-items:center;
			display:grid;
			grid-template-columns:0.1fr 1fr;
			grid-template-rows:1fr 1fr;
		grid-column-gap:5vh;
		  }
		  .item1_Footer_image_GAPeach.$$pageID$$ {
			height:4rem;
			grid-column-start:1;
			grid-column-end:2;
			grid-row-start:1;
			grid-row-end:2;
			width:auto;
			margin:0vh;
			align-self:center;
			justify-self:end;
		  }
		  .item1_Footer_text_Credits.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:3;
			grid-row-start:1;
			grid-row-end:2;
		  }
		  .item3_Footer_div_Music.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:3;
			grid-row-start:2;
			text-align:center;
		  }
		  .bodyParent.$$pageID$$ {
			height:100%;
		  }
		</style>
		`),
	});
};
