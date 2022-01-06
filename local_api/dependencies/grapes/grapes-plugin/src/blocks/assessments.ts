import grapesjs from "grapesjs";

import { AddPageIDToString } from "../blocks";

export default (bm: grapesjs.BlockManagerInstance, config) => {

	bm.add("mc2_h", {
		label:
			"<img src='./img/blocks/blockIcon_MC_Across2.jpg'></img><br>Multiple Choice - 2 Across →",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
			<div class="grid_T9 " data-gjs-custom-name="grid_T9_MultipleChoice_2Across">
				<p class="item1_T9 " data-gjs-custom-name="item1_T9_text_Question">Question goes here</p>
				<container-enable-disable :visible="true" :enabled="true" id="icg9" class="item2_T9 " data-gjs-custom-name="item2_T9_ED_ButtonsGrp">
					<div class="grid_T16 " data-gjs-custom-name="grid_T16_2ButtonColumns">
						<widget-radio :visible="true" :enabled="true" id="ic9w" group="ixz6" class="buttonRadio Variation item1_T16 radioFillHeight " data-gjs-custom-name="item1_T16_button_Radio1">
							<p class="text_ButtonTitle " data-gjs-custom-name="text_ButtonTitle1">Title 1</p>
							<p class="text_Placeholder " data-gjs-custom-name="text_placeholder1">placeholder</p>
						</widget-radio>
						<widget-radio :visible="true" :enabled="true" id="iqjk" group="ixz6" class="buttonRadio Variation item2_T16 radioFillHeight " data-gjs-custom-name="item2_T16_button_Radio2">
							<p class="text_ButtonTitle " data-gjs-custom-name="text_ButtonTitle2">Title 2</p>
							<p class="text_Placeholder " data-gjs-custom-name="text_placeholder2">placeholder</p>
						</widget-radio>
					</div>
				</container-enable-disable>
				<div class="item3_T9 " data-gjs-custom-name="item3_T9">
					<widget-button :visible="false" :enabled="true" id="ilbg" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'radioSelection',group:'ixz6',selected:'any'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ilbg',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'icg9',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ilbg',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey marginTop1 buttonBlinkBlue " data-gjs-custom-name="button_Submit">
						<p class="marginLeft2 marginRight2 " data-gjs-custom-name="text_Submit">Submit</p>
					</widget-button>
					<container-show-hide :visible="true" id="iuqb" class="" data-gjs-custom-name="SH_Correct">
						<p class="dropShadow textBackgroundBasic textBackground-Correct " data-gjs-custom-name="text_Correct"><strong class="" data-gjs-custom-name="text_Bold">Correct!</strong> Explanation here</p>
					</container-show-hide>
					<container-show-hide :visible="true" id="ikbi" class="" data-gjs-custom-name="SH_Incorrect">
						<p class="dropShadow textBackgroundBasic textBackground-Incorrect " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="text_Bold">Incorrect.</strong> Explanation here</p>
					</container-show-hide>
				</div>
			</div>
			<style>
			.grid_T9.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: min-content min-content 1fr;
				grid-column-gap: 0vh;
				grid-row-gap: 3vh;
			}
			
			.item1_T9.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}
			
			.item2_T9.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 2;
				grid-row-end: span 1;
			}
			
			.item3_T9.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 3;
				grid-row-end: span 1;
			}
			
			.grid_T16.$pageID$ {
				display: grid;
				grid-template-columns: 1fr 1fr;
				grid-template-rows: 1fr;
				grid-column-gap: 3vh;
				grid-row-gap: 0vh;
			}
			
			.item1_T16.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
				justify-self: stretch;
				align-self: stretch;
			}
			
			.item2_T16.$pageID$ {
				grid-column-start: 2;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
				justify-self: stretch;
				align-self: stretch;
			}
			</style>
		`)
	});

	bm.add("mc3_h", {
		label:
			"<img src='./img/blocks/blockIcon_MC_Across3.jpg'></img><br>Multiple Choice - 3 Across →",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
		<div class="grid_T9 " data-gjs-custom-name="grid_T9_MultipleChoice_3Across">
			<p class=" item1_T9" data-gjs-custom-name="item1_T9_text_Question">Question goes here
			</p>
			<container-enable-disable :visible="true" :enabled="true" id="iul6" class=" item2_T9" data-gjs-custom-name="item2_T9_ED_ButtonsGrp">
				<div class=" grid_T16" data-gjs-custom-name="grid_T16_3ButtonColumns">
					<widget-radio :visible="true" :enabled="true" id="im8f" group="i0ru" class="buttonRadio Variation  item1_T16 radioFillHeight" data-gjs-custom-name="item1_T16_button_Radio1">
						<p class=" text_ButtonTitle" data-gjs-custom-name="text_ButtonTitle1">Title 1
						</p>
						<p class=" text_Placeholder" data-gjs-custom-name="text_placeholder1">placeholder
						</p>
					</widget-radio>
					<widget-radio :visible="true" :enabled="true" id="i1pj" group="i0ru" class="buttonRadio Variation  item2_T16 radioFillHeight" data-gjs-custom-name="item2_T16_button_Radio2">
						<p class=" text_ButtonTitle" data-gjs-custom-name="text_ButtonTitle2">Title 2
						</p>
						<p class=" text_Placeholder" data-gjs-custom-name="text_placeholder2">placeholder
						</p>
					</widget-radio>
					<widget-radio :visible="true" :enabled="true" id="it86" group="i0ru" class="buttonRadio Variation  item3_T16 radioFillHeight" data-gjs-custom-name="item3_T16_button_Radio3">
						<p class=" text_ButtonTitle" data-gjs-custom-name="text_ButtonTitle3">Title 3
						</p>
						<p class=" text_Placeholder" data-gjs-custom-name="text_placeholder3">placeholder
						</p>
					</widget-radio>
				</div>
			</container-enable-disable>
			<div class="item3_T9 " data-gjs-custom-name="item3_T9">
				<widget-button :visible="false" :enabled="true" id="i5gc" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'radioSelection',group:'i0ru',selected:'any'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i5gc',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iul6',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i5gc',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey marginTop1 buttonBlinkBlue" data-gjs-custom-name="button_Submit">
					<p class="marginLeft2 marginRight2" data-gjs-custom-name="text_Submit">Submit
					</p>
				</widget-button>
				<container-show-hide :visible="true" id="iy44" class="" data-gjs-custom-name="SH_Correct">
					<p class="dropShadow textBackgroundBasic textBackground-Correct " data-gjs-custom-name="text_Correct">
						<strong class="" data-gjs-custom-name="text_Bold">Correct!</strong> Explanation here
					</p>
				</container-show-hide>
				<container-show-hide :visible="true" id="iuaw" class="" data-gjs-custom-name="SH_Incorrect">
					<p class="dropShadow textBackgroundBasic textBackground-Incorrect " data-gjs-custom-name="text_Incorrect">
						<strong class="" data-gjs-custom-name="text_Bold">Incorrect.</strong> Explanation here
					</p>
				</container-show-hide>
			</div>
		</div>

		<style>
		.grid_T9.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:min-content min-content 1fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
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
		}
		.item1_T16.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
			justify-self:stretch;
			align-self:stretch;
		}
		.item2_T16.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
			justify-self:stretch;
			align-self:stretch;
		}
		.item3_T16.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
			justify-self:stretch;
			align-self:stretch;
		}

		</style>`)
	});

	bm.add("mc4_h", {
		label:
			"<img src='./img/blocks/blockIcon_MC_Across4.jpg'></img><br>Multiple Choice - 4 Across →",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
		<div class="grid_T9 " data-gjs-custom-name="grid_T9_MultipleChoice_4Across">
			<p class=" item1_T9" data-gjs-custom-name="item1_T9_text_Question">Question goes here
			</p>
			<container-enable-disable :visible="true" :enabled="true" id="i63t" class=" item2_T9" data-gjs-custom-name="item2_T9_ED_4Buttons">
				<div class=" grid_T21" data-gjs-custom-name="grid_T21_4ButtonColumns">
					<widget-radio :visible="true" :enabled="true" id="ink8" group="ipei" class="buttonRadio Variation  item1_T21 radioFillHeight" data-gjs-custom-name="item1_T21_button_Radio1">
						<p class="text_ButtonTitle " data-gjs-custom-name="text_ButtonTitle">Title 1
						</p>
						<p class="" data-gjs-custom-name="text_placeholder">placeholder
						</p>
					</widget-radio>
					<widget-radio :visible="true" :enabled="true" id="io8c" group="ipei" class="buttonRadio Variation  item2_T21 radioFillHeight" data-gjs-custom-name="item2_T21_button_Radio2">
						<p class="text_ButtonTitle " data-gjs-custom-name="text_ButtonTitle">Title 2
						</p>
						<p class="" data-gjs-custom-name="text_placeholder">placeholder
						</p>
					</widget-radio>
					<widget-radio :visible="true" :enabled="true" id="iqi3" group="ipei" class="buttonRadio Variation  item3_T21 radioFillHeight" data-gjs-custom-name="item3_T21_button_Radio3">
						<p class="text_ButtonTitle " data-gjs-custom-name="text_ButtonTitle">Title 3
						</p>
						<p class="" data-gjs-custom-name="text_placeholder">placeholder
						</p>
					</widget-radio>
					<widget-radio :visible="true" :enabled="true" id="ipc7" group="ipei" class="buttonRadio Variation  item4_T21 radioFillHeight" data-gjs-custom-name="item4_T21_button_Radio4">
						<p class="text_ButtonTitle " data-gjs-custom-name="text_ButtonTitle">Title 4
						</p>
						<p class="" data-gjs-custom-name="text_placeholder">placeholder
						</p>
					</widget-radio>
				</div>
			</container-enable-disable>
			<div class="item3_T9 " data-gjs-custom-name="item3_T9_SubmitAndExplanations">
				<widget-button :visible="false" :enabled="true" id="i3bk" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'radioSelection',group:'ipei',selected:'any'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i3bk',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i63t',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i3bk',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey marginTop1 buttonBlinkBlue" data-gjs-custom-name="button_Submit">
					<p class="marginLeft2 marginRight2 buttonBlinkBlue" data-gjs-custom-name="text_Submit">Submit
					</p>
				</widget-button>
				<container-show-hide :visible="true" id="ipkv" class="" data-gjs-custom-name="SH_Correct">
					<p class="dropShadow textBackgroundBasic textBackground-Correct " data-gjs-custom-name="text_Correct">
						<strong data-gjs-custom-name="Text">Correct!</strong> Explanation here
					</p>
				</container-show-hide>
				<container-show-hide :visible="true" id="i6a5" class="" data-gjs-custom-name="SH_Incorrect">
					<p class="dropShadow textBackgroundBasic textBackground-Incorrect " data-gjs-custom-name="text_Incorrect">
						<strong data-gjs-custom-name="Text">Incorrect.</strong> Explanation here
					</p>
				</container-show-hide>
			</div>
		</div>

		<style>
		.grid_T9.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:min-content min-content 1fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
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
		.grid_T21.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr 1fr 1fr;
			grid-template-rows:1fr;
			grid-column-gap:3vh;
			grid-row-gap:0vh;
		}
		.item1_T21.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
			justify-self:stretch;
			align-self:stretch;
		}
		.item2_T21.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
			justify-self:stretch;
			align-self:stretch;
		}
		.item3_T21.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
			justify-self:stretch;
			align-self:stretch;
		}
		.item4_T21.$$pageID$$ {
			grid-column-start:4;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
			justify-self:stretch;
			align-self:stretch;
		}
		.text_ButtonTitle.$$pageID$$ {
			line-height:normal;
		}
		</style>`)
	});

	bm.add("mc2_v", {
		label:
			"<img src='./img/blocks/blockIcon_MC_Down2-.jpg'></img><br>Multiple Choice - 2 Down ↓",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
			<div class="grid_T33 " data-gjs-custom-name="grid_T33_MultipleChoice_2Down">
				<p class="item1_T33 " data-gjs-custom-name="item1_T33_text_Question">Question goes here</p>
				<container-enable-disable :visible="true" :enabled="true" id="iddp" class="item2_T33 " data-gjs-custom-name="item2_T33_ED_2ButtonsAndSubmit">
					<div class="grid_T10 " data-gjs-custom-name="grid_T10_2ButtonRows">
						<div class="item1_T10 grid_T14 " data-gjs-custom-name="item1_T10_grid_T14_RowA">
							<widget-radio :visible="true" :enabled="true" id="igpx" group="i5gp" value="A" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter item1_T14_Button " data-gjs-custom-name="item1_T14_button_RadioA">
								<p class="" data-gjs-custom-name="text_AnswerA">A</p>
							</widget-radio>
							<p class="item2_T14_Answer " data-gjs-custom-name="item2_T14_text_AnswerA">Answer A</p>
						</div>
						<div class="item2_T10 grid_T14 " data-gjs-custom-name="item2_T10_grid_T14_RowB">
							<widget-radio :visible="true" :enabled="true" id="i288" group="i5gp" value="B" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter item1_T14_Button " data-gjs-custom-name="item1_T14_button_RadioB">
								<p class="" data-gjs-custom-name="text_B">B</p>
							</widget-radio>
							<p class="item2_T14_Answer " data-gjs-custom-name="item2_T14_text_AnswerB">Answer B</p>
						</div>
						<div class="pageaccc item3_T10" data-gjs-custom-name="item3_T10_Submit">
							<widget-button :visible="false" :enabled="true" id="i1ck" :conditions="{conditionList:[{comparisons:[{comparisonData:{comparisonType:'radioSelection',group:'i5gp',selected:'any'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i1ck',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'i1ck',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iddp',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i1ck',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue " data-gjs-custom-name="button_Submit">
								<p class="marginLeft2 marginRight2 buttonBlinkBlue " data-gjs-custom-name="text_Submit">Submit</p>
							</widget-button>
						</div>
					</div>
				</container-enable-disable>
				<div class="item3_T33 " data-gjs-custom-name="item3_T33_Explanations">
					<container-show-hide :visible="true" id="i1jw" class="" data-gjs-custom-name="SH_Correct">
						<p class="dropShadow textBackgroundBasic textBackground-Correct " data-gjs-custom-name="text_Correct"><strong class="" data-gjs-custom-name="Text">Correct!</strong> Explanation here</p>
					</container-show-hide>
					<container-show-hide :visible="true" id="ir9o" class="" data-gjs-custom-name="SH_Incorrect">
						<p class="dropShadow textBackgroundBasic textBackground-Incorrect " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="Text">Incorrect.</strong> Explanation here</p>
					</container-show-hide>
				</div>
			</div>
			<style>
			.grid_T10.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr 1fr 1.3fr;
				grid-column-gap: 0vh;
				grid-row-gap: 3vh;
			}
			
			.item1_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			
			.item3_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 3;
				grid-row-end: 4;
				min-height: 3vh;
			}
			
			.grid_T14.$pageID$ {
				display: grid;
				grid-template-columns: min-content 1fr;
				grid-template-rows: 1fr;
				grid-column-gap: 1.5vh;
				width: 100%;
			}
			
			.item1_T14_Button.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2_T14_Answer.$pageID$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 2;
				display: flex;
				align-items: center;
			}
			
			.grid_T33.$pageID$ {
				display: grid;
				grid-template-columns: 1fr 1fr;
				grid-template-rows: 1fr 3fr;
				grid-column-gap: 3vh;
				grid-row-gap: 3vh;
			}
			
			.item1_T33.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2_T33.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			
			.item3_T33.$pageID$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			</style>
		`)
	});

	bm.add("mc3_v", {
		label:
			"<img src='./img/blocks/blockIcon_MC_Down3.jpg'></img><br>Multiple Choice - 3 Down ↓",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
			<div class="grid_T9 " data-gjs-custom-name="grid_T9_MultipleChoice_3Down">
				<p class="item1_T9 " data-gjs-custom-name="item1_T9_text_Question">Question goes here</p>
				<container-enable-disable :visible="true" :enabled="true" id="i2zss" class="item2_T9 " data-gjs-custom-name="item2_T9_ED_ButtonsGrp">
					<div class="grid_T9_ButtonsGroup " data-gjs-custom-name="grid_T9_3ButtonRows">
						<div class="grid_T14  item1_T9_BGroup" data-gjs-custom-name="item1_T9_grid_T14_RowA">
							<widget-radio :visible="true" :enabled="true" id="ir8cg" group="ibb88" value="A" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter item1_T14_Button " data-gjs-custom-name="item1_T14_button_RadioA">
								<p class="" data-gjs-custom-name="text_A">A</p>
							</widget-radio>
							<p class="item2_T14_Answer " data-gjs-custom-name="item2_T14_text_AnswerA">Answer A</p>
						</div>
						<div class="grid_T14  item2_T9_BGroup" data-gjs-custom-name="item2_T9_grid_T14_RowB">
							<widget-radio :visible="true" :enabled="true" id="icckg" group="ibb88" value="B" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter item1_T14_Button " data-gjs-custom-name="item1_T14_button_RadioB">
								<p class="" data-gjs-custom-name="text_B">B</p>
							</widget-radio>
							<p class="item2_T14_Answer " data-gjs-custom-name="item2_T14_text_AnswerB">Answer B</p>
						</div>
						<div class="grid_T14  item3_T9_BGroup" data-gjs-custom-name="item3_T9_grid_T14_RowC">
							<widget-radio :visible="true" :enabled="true" id="ilcxo" group="ibb88" value="C" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter item1_T14_Button " data-gjs-custom-name="item1_T14_button_RadioC">
								<p class="" data-gjs-custom-name="text_C">C</p>
							</widget-radio>
							<p class="item2_T14_Answer " data-gjs-custom-name="item2_T14_text_AnswerC">Answer C</p>
						</div>
					</div>
				</container-enable-disable>
				<div class="item3_T9 " data-gjs-custom-name="item3_T9_SubmitAndExplanations">
					<widget-button :visible="false" :enabled="true" id="i0p3v" :conditions="{conditionList:[{comparisons:[{comparisonData:{comparisonType:'radioSelection',group:'ibb88',selected:'any'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i0p3v',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'i0p3v',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i2zss',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i0p3v',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue " data-gjs-custom-name="button_Submit">
						<p class="marginLeft2 marginRight2 buttonBlinkBlue " data-gjs-custom-name="text_Submit">Submit</p>
					</widget-button>
					<container-show-hide :visible="true" id="ibhod" class="" data-gjs-custom-name="SH_Correct">
						<p class="dropShadow textBackgroundBasic textBackground-Correct " data-gjs-custom-name="text_Correct"><strong class="" data-gjs-custom-name="Text">Correct!</strong> Explanation here</p>
					</container-show-hide>
					<container-show-hide :visible="true" id="iscf2" class="" data-gjs-custom-name="SH_Incorrect">
						<p class="dropShadow textBackgroundBasic textBackground-Incorrect " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="Text">Incorrect.</strong> Explanation here</p>
					</container-show-hide>
				</div>
			</div>
			<style>
			.grid_T9.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: min-content min-content 1fr;
				grid-column-gap: 0vh;
				grid-row-gap: 3vh;
			}

			.item1_T9.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}

			.item2_T9.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 2;
				grid-row-end: span 1;
			}

			.item3_T9.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 3;
				grid-row-end: span 1;
			}

			.grid_T9_ButtonsGroup.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr 1fr 1fr;
				grid-column-gap: 0vh;
				grid-row-gap: 1.5vh;
			}

			.item1_T9_BGroup.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}

			.item2_T9_BGroup.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 2;
				grid-row-end: span 1;
			}

			.item3_T9_BGroup.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 3;
				grid-row-end: span 1;
			}

			.grid_T14.$pageID$ {
				display: grid;
				grid-template-columns: min-content 1fr;
				grid-template-rows: 1fr;
				grid-column-gap: 1.5vh;
				width: 100%;
			}

			.item1_T14_Button.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}

			.item2_T14_Answer.$pageID$ {
				grid-column-start: 2;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
				display: flex;
				align-items: center;
			}
			</style>
		`)
	});

	bm.add("mc4_v", {
		label:
			"<img src='./img/blocks/blockIcon_MC_Down4.jpg'></img><br>Multiple Choice - 4 Down ↓",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
		<div class="grid_T9 " data-gjs-custom-name="grid_T9_MultipleChoice_4Down">
			<p class=" item1_T9" data-gjs-custom-name="item1_T9_text_Question">Question goes here
			</p>
			<container-enable-disable :visible="true" :enabled="true" id="inra" class=" item2_T9" data-gjs-custom-name="item2_T9_ED_ButtonsGrp">
				<div class=" grid_T10" data-gjs-custom-name="grid_T10_4ButtonRows">
					<div class="radioQuestion  item1_T10 grid_T14" data-gjs-custom-name="item1_T10_grid_T14_RowA">
						<widget-radio :visible="true" :enabled="true" id="i3ru" group="ivaq" value="A" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter  item1_T14_Button" data-gjs-custom-name="item1_T14_button_RadioA">
							<p class="" data-gjs-custom-name="text_A">A
							</p>
						</widget-radio>
						<p class=" item2_T14_Answer" data-gjs-custom-name="item2_T14_text_AnswerA">Answer A
						</p>
					</div>
					<div class="radioQuestion  item2_T10 grid_T14" data-gjs-custom-name="item2_T10_grid_T14_RowB">
						<widget-radio :visible="true" :enabled="true" id="irgn" group="ivaq" value="B" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter  item1_T14_Button" data-gjs-custom-name="item1_T14_button_RadioB">
							<p class="" data-gjs-custom-name="text_B">B
							</p>
						</widget-radio>
						<p class=" item2_T14_Answer" data-gjs-custom-name="item2_T14_text_AnswerB">Answer B
						</p>
					</div>
					<div class="radioQuestion  item3_T10 grid_T14" data-gjs-custom-name="item3_T10_grid_T14_RowC">
						<widget-radio :visible="true" :enabled="true" id="ifkp" group="ivaq" value="C" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter  item1_T14_Button" data-gjs-custom-name="item1_T14_button_RadioC">
							<p class="" data-gjs-custom-name="text_C">C
							</p>
						</widget-radio>
						<p class=" item2_T14_Answer" data-gjs-custom-name="item2_T14_text_AnswerC">Answer C
						</p>
					</div>
					<div class="radioQuestion  item4_T10 grid_T14" data-gjs-custom-name="item4_T10_grid_T14_RowD">
						<widget-radio :visible="true" :enabled="true" group="ivaq" id="ilch" value="D" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter  item1_T14_Button" data-gjs-custom-name="item1_T14_button_RadioD">
							<p class="" data-gjs-custom-name="text_D">D
							</p>
						</widget-radio>
						<p class=" item2_T14_Answer" data-gjs-custom-name="item2_T14_text_AnswerD">Answer D
						</p>
					</div>
				</div>
			</container-enable-disable>
			<div class="item3_T9 " data-gjs-custom-name="item3_T9_SubmitAndExplanations">
				<widget-button :visible="false" :enabled="true" id="ie0g" :conditions="{conditionList:[{comparisons:[{comparisonData:{comparisonType:'radioSelection',group:'ivaq',selected:'any'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ie0g',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'ie0g',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'inra',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ie0g',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue" data-gjs-custom-name="button_Submit">
					<p class="marginLeft2 marginRight2 buttonBlinkBlue" data-gjs-custom-name="text_Submit">Submit
					</p>
				</widget-button>
				<container-show-hide :visible="true" id="ivf4" class="" data-gjs-custom-name="SH_Correct">
					<p class="dropShadow textBackgroundBasic textBackground-Correct " data-gjs-custom-name="text_Correct">
						<strong data-gjs-custom-name="Text">Correct!</strong> Explanation here
					</p>
				</container-show-hide>
				<container-show-hide :visible="true" id="idg7" class="" data-gjs-custom-name="SH_Incorrect">
					<p class="dropShadow textBackgroundBasic textBackground-Incorrect " data-gjs-custom-name="text_Incorrect">
						<strong data-gjs-custom-name="Text">Incorrect.</strong> Explanation here
					</p>
				</container-show-hide>
			</div>
		</div>

		<style>
		.grid_T9.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:min-content min-content 1fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
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
		.grid_T10.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr 1fr 1fr 1fr;
			grid-column-gap:0vh;
			grid-row-gap:1.5vh;
		}
		.item1_T10.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T10.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T10.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		.item4_T10.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:4;
			grid-row-end:span 1;
		}
		.grid_T14.$$pageID$$ {
			display:grid;
			grid-template-columns:min-content 1fr;
			grid-template-rows:1fr;
			grid-column-gap:1.5vh;
			width:100%;
		}
		.item1_T14_Button.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T14_Answer.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
			display:flex;
			align-items:center;
		}

		</style>`)
	});

	bm.add("mc3_v_sideby", {
		label:
			"<img src='./img/blocks/blockIcon_MC_Down3-.jpg'></img><br>Multiple Choice - 3 Down ↓ [|]",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
		<div class="grid_T33 " data-gjs-custom-name="grid_T33_MultipleChoice_3Down[-]">
			<p class=" item1_T33" data-gjs-custom-name="item1_T33_text_Question">Question goes here
			</p>
			<container-enable-disable :visible="true" :enabled="true" id="i65a" class=" item2_T33" data-gjs-custom-name="item2_T33_ED_3ButtonsAndSubmit">
				<div class=" grid_T10" data-gjs-custom-name="grid_T10_4ButtonRows">
					<div class=" item1_T10 grid_T14" data-gjs-custom-name="item1_T10_grid_T14_RowA">
						<widget-radio :visible="true" :enabled="true" id="ibtw" group="ijn4" value="A" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter  item1_T14_Button" data-gjs-custom-name="item1_T14_button_RadioA">
							<p class="" data-gjs-custom-name="text_AnswerA">A
							</p>
						</widget-radio>
						<p class=" item2_T14_Answer" data-gjs-custom-name="item2_T14_text_AnswerA">Answer A
						</p>
					</div>
					<div class=" item2_T10 grid_T14" data-gjs-custom-name="item2_T10_grid_T14_RowB">
						<widget-radio :visible="true" :enabled="true" id="i6uk" group="ijn4" value="B" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter  item1_T14_Button" data-gjs-custom-name="item1_T14_button_RadioB">
							<p class="" data-gjs-custom-name="text_B">B
							</p>
						</widget-radio>
						<p class=" item2_T14_Answer" data-gjs-custom-name="item2_T14_text_AnswerB">Answer B
						</p>
					</div>
					<div class=" item3_T10 grid_T14" data-gjs-custom-name="iten3_T10_grid_T14_RowC">
						<widget-radio :visible="true" :enabled="true" id="ikx4" group="ijn4" value="C" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter  item1_T14_Button" data-gjs-custom-name="item1_T14_button_RadioC">
							<p class="" data-gjs-custom-name="text_C">C
							</p>
						</widget-radio>
						<p class=" item2_T14_Answer" data-gjs-custom-name="item2_T14_text_AnswerC">Answer C
						</p>
					</div>
					<div class="pageaccc item4_T10" data-gjs-custom-name="item4_T10_Submit">
						<widget-button :visible="false" :enabled="true" id="irxy" :conditions="{conditionList:[{comparisons:[{comparisonData:{comparisonType:'radioSelection',group:'ijn4',selected:'any'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'irxy',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'irxy',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i65a',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'irxy',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue" data-gjs-custom-name="button_Submit">
							<p class="marginLeft2 marginRight2 buttonBlinkBlue" data-gjs-custom-name="text_Submit">Submit
							</p>
						</widget-button>
					</div>
				</div>
			</container-enable-disable>
			<div class="item3_T33 " data-gjs-custom-name="item3_T33_Explanations">
				<container-show-hide :visible="true" id="in7f" class="" data-gjs-custom-name="SH_Correct">
					<p class="dropShadow textBackgroundBasic textBackground-Correct " data-gjs-custom-name="text_Correct">
						<strong data-gjs-custom-name="Text">Correct!</strong> Explanation here
					</p>
				</container-show-hide>
				<container-show-hide :visible="true" id="i95g" class="" data-gjs-custom-name="SH_Incorrect">
					<p class="dropShadow textBackgroundBasic textBackground-Incorrect " data-gjs-custom-name="text_Incorrect">
						<strong data-gjs-custom-name="Text">Incorrect.</strong> Explanation here
					</p>
				</container-show-hide>
			</div>
		</div>
		<style>
		.grid_T10.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr 1fr 1fr 1.3fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
		}
		.item1_T10.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T10.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T10.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		.item4_T10.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:4;
			grid-row-end:span 1;
			min-height:3vh;
		}
		.grid_T14.$$pageID$$ {
			display:grid;
			grid-template-columns:min-content 1fr;
			grid-template-rows:1fr;
			grid-column-gap:1.5vh;
			width:100%;
		}
		.item1_T14_Button.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T14_Answer.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
			display:flex;
			align-items:center;
		}
		.grid_T33.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr;
			grid-template-rows:1fr 3fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
		}
		.item1_T33.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T33.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T33.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}

		</style>`)
	});

	bm.add("mc4_v_sideby", {
		label:
			"<img src='./img/blocks/blockIcon_MC_Down4-.jpg'></img><br>Multiple Choice - 4 Down ↓ [|]",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
		<div class="grid_T33 " data-gjs-custom-name="grid_T33_MultipleChoice_4Down[-]">
			<p class=" item1_T33" data-gjs-custom-name="item1_T33_text_Question">Question goes here
			</p>
			<container-enable-disable :visible="true" :enabled="true" id="iw8v" class=" item2_T33" data-gjs-custom-name="item2_T33_ED_4ButtonsAndSubmit">
				<div class=" grid_T76" data-gjs-custom-name="grid_T76_5ButtonRows">
					<div class=" item1_T76 grid_T14" data-gjs-custom-name="item1_T76_grid_T14_RowA">
						<widget-radio :visible="true" :enabled="true" id="ikjg" group="ib3f" value="A" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter  item1_T14_Button" data-gjs-custom-name="item1_T14_button_RadioA">
							<p class="" data-gjs-custom-name="text_A">A
							</p>
						</widget-radio>
						<p class=" item2_T14_Answer" data-gjs-custom-name="item2_T14_text_AnswerA">Answer A
						</p>
					</div>
					<div class=" item2_T76 grid_T14" data-gjs-custom-name="item2_T76_grid_T14_RowB">
						<widget-radio :visible="true" :enabled="true" id="ie54" group="ib3f" value="B" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter  item1_T14_Button" data-gjs-custom-name="item1_T14_button_RadioB">
							<p class="" data-gjs-custom-name="text_A">B
							</p>
						</widget-radio>
						<p class=" item2_T14_Answer" data-gjs-custom-name="item2_T14_text_AnswerB">Answer B
						</p>
					</div>
					<div class=" item3_T76 grid_T14" data-gjs-custom-name="item3_T76_grid_T14_RowC">
						<widget-radio :visible="true" :enabled="true" id="ip4p" group="ib3f" value="C" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter  item1_T14_Button" data-gjs-custom-name="item1_T14_button_RadioC">
							<p class="" data-gjs-custom-name="text_C">C
							</p>
						</widget-radio>
						<p class=" item2_T14_Answer" data-gjs-custom-name="item2_T14_text_AnswerC">Answer C
						</p>
					</div>
					<div class=" item4_T76 grid_T14" data-gjs-custom-name="item4_T76_grid_T14_RowD">
						<widget-radio :visible="true" :enabled="true" group="ib3f" id="i9up" value="D" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter  item1_T14_Button" data-gjs-custom-name="item1_T14_button_RadioD">
							<p class="" data-gjs-custom-name="text_C">D
							</p>
						</widget-radio>
						<p class=" item2_T14_Answer" data-gjs-custom-name="item2_T14_text_AnswerD">Answer D
						</p>
					</div>
					<div class=" item5_T76" data-gjs-custom-name="item5_T76_SubmitButton">
						<widget-button :visible="false" :enabled="true" id="i6hd" :conditions="{conditionList:[{comparisons:[{comparisonData:{comparisonType:'radioSelection',group:'ib3f',selected:'any'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i6hd',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'i6hd',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iw8v',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i6hd',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue" data-gjs-custom-name="button_Submit">
							<p class="marginLeft2 marginRight2 buttonBlinkBlue" data-gjs-custom-name="text_Submit">Submit
							</p>
						</widget-button>
					</div>
				</div>
			</container-enable-disable>
			<div class="item3_T33 " data-gjs-custom-name="item3_T33_Explanations">
				<container-show-hide :visible="true" id="iefq" class="" data-gjs-custom-name="SH_Correct">
					<p class="dropShadow textBackgroundBasic textBackground-Correct " data-gjs-custom-name="text_Correct">
						<strong data-gjs-custom-name="Text">Correct!</strong> Explanation here
					</p>
				</container-show-hide>
				<container-show-hide :visible="true" id="icpx" class="" data-gjs-custom-name="SH_Incorrect">
					<p class="dropShadow textBackgroundBasic textBackground-Incorrect " data-gjs-custom-name="text_Incorrect">
						<strong data-gjs-custom-name="Text">Incorrect.</strong> Explanation here
					</p>
				</container-show-hide>
			</div>
		</div>
		<style>
		.grid_T14.$$pageID$$ {
			display:grid;
			grid-template-columns:min-content 1fr;
			grid-template-rows:1fr;
			grid-column-gap:1.5vh;
			width:100%;
		}
		.item1_T14_Button.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T14_Answer.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
			display:flex;
			align-items:center;
		}
		.grid_T33.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr;
			grid-template-rows:1fr 3fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
		}
		.item1_T33.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T33.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T33.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.grid_T76.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr 1fr 1fr 1fr 1.3fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
		}
		.item1_T76.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T76.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T76.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		.item4_T76.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:4;
			grid-row-end:span 1;
		}
		.item5_T76.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:5;
			grid-row-end:span 1;
			min-height:3vh;
		}

		</style>`)
	});

	bm.add("mc2_h-flush", {
		label:
			"<img src='./img/blocks/blockIcon_MC_Across2_Flush.jpg'></img><br>Multiple Choice - 2 Across → Flush Response",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
			<div class="grid_T9 textBackgroundBasic textBackground-DarkBlue " data-gjs-custom-name="grid_T9_MultipleChoice_4Across">
			<p class="item1_T9 " data-gjs-custom-name="item1_T9_text_Question">Question goes here</p>
			<container-enable-disable :visible="true" :enabled="true" id="i6grf" class="item2_T9 " data-gjs-custom-name="item2_T9_ED_4Buttons">
				<div class="grid_T21 " data-gjs-custom-name="grid_T21_4ButtonColumns">
					<widget-radio :visible="true" :enabled="true" id="iebj5" group="iaw8e" class="buttonRadio Variation item1_T21 radioFillHeight " data-gjs-custom-name="item1_T21_button_Radio1">
						<p class="text_ButtonTitle " data-gjs-custom-name="text_ButtonTitle">Title 1</p>
						<p class="" data-gjs-custom-name="text_placeholder">placeholder</p>
					</widget-radio>
					<widget-radio :visible="true" :enabled="true" id="iqc7o" group="iaw8e" class="buttonRadio Variation item2_T21 radioFillHeight " data-gjs-custom-name="item2_T21_button_Radio2">
						<p class="text_ButtonTitle " data-gjs-custom-name="text_ButtonTitle">Title 2</p>
						<p class="" data-gjs-custom-name="text_placeholder">placeholder</p>
					</widget-radio>
				</div>
			</container-enable-disable>
			<div class="item3_T9 " data-gjs-custom-name="item3_T9_SubmitAndExplanations">
				<widget-button :visible="false" :enabled="true" id="ithhw" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'radioSelection',group:'iaw8e',selected:'any'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ithhw',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i6grf',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ithhw',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue button_Submit " data-gjs-custom-name="button_Submit">
					<p class="marginLeft2 marginRight2 buttonBlinkBlue " data-gjs-custom-name="text_Submit">Submit</p>
				</widget-button>
				<container-show-hide :visible="true" id="ie6ap" class="dropShadow textBackgroundBasic textBackground-Correct SH_Correct-Incorrect " data-gjs-custom-name="SH_Correct">
					<p class="colorBlack " data-gjs-custom-name="text_Correct"><strong class="" data-gjs-custom-name="Text">Correct!</strong> Explanation here</p>
				</container-show-hide>
				<container-show-hide :visible="true" id="irigv" class="dropShadow textBackgroundBasic textBackground-Incorrect SH_Correct-Incorrect " data-gjs-custom-name="SH_Incorrect">
					<p class="colorBlack " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="Text">Incorrect.</strong> Explanation here</p>
				</container-show-hide>
			</div>
		</div>
		<style>
		.grid_T9.$pageID$ {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: min-content min-content 1fr;
			grid-column-gap: 0vh;
			grid-row-gap: 3vh;
		}

		.item1_T9.$pageID$ {
			grid-column-start: 1;
			grid-column-end: span 1;
			grid-row-start: 1;
			grid-row-end: span 1;
		}

		.item2_T9.$pageID$ {
			grid-column-start: 1;
			grid-column-end: span 1;
			grid-row-start: 2;
			grid-row-end: span 1;
		}

		.item3_T9.$pageID$ {
			grid-column-start: 1;
			grid-column-end: span 1;
			grid-row-start: 3;
			grid-row-end: span 1;
			margin: 0 -3.2vh -3.2vh -3.2vh;
		}

		.grid_T21.$pageID$ {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr;
			grid-column-gap: 3vh;
			grid-row-gap: 0vh;
		}

		.item1_T21.$pageID$ {
			grid-column-start: 1;
			grid-column-end: span 1;
			grid-row-start: 1;
			grid-row-end: span 1;
			justify-self: stretch;
			align-self: stretch;
		}

		.item2_T21.$pageID$ {
			grid-column-start: 2;
			grid-column-end: span 1;
			grid-row-start: 1;
			grid-row-end: span 1;
			justify-self: stretch;
			align-self: stretch;
		}

		.text_ButtonTitle.$pageID$ {
			line-height: normal;
		}

		.SH_Correct-Incorrect.$pageID$ {
			border-radius: 0 0 1.3vh 1.3vh;
		}

		.button_Submit.$pageID$ {
			padding: 0 0 3.2vh 3.2vh;
		}
		</style>`)
	});

	bm.add("mc3_h-flush", {
		label:
			"<img src='./img/blocks/blockIcon_MC_Across3_Flush.jpg'></img><br>Multiple Choice - 3 Across → Flush Response",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
			<div class="grid_T9 textBackgroundBasic textBackground-DarkBlue " data-gjs-custom-name="grid_T9_MultipleChoice_4Across">
				<p class="item1_T9 " data-gjs-custom-name="item1_T9_text_Question">Question goes here</p>
				<container-enable-disable :visible="true" :enabled="true" id="i6grf" class="item2_T9 " data-gjs-custom-name="item2_T9_ED_4Buttons">
					<div class="grid_T21 " data-gjs-custom-name="grid_T21_4ButtonColumns">
						<widget-radio :visible="true" :enabled="true" id="iebj5" group="iaw8e" class="buttonRadio Variation item1_T21 radioFillHeight " data-gjs-custom-name="item1_T21_button_Radio1">
							<p class="text_ButtonTitle " data-gjs-custom-name="text_ButtonTitle">Title 1</p>
							<p class="" data-gjs-custom-name="text_placeholder">placeholder</p>
						</widget-radio>
						<widget-radio :visible="true" :enabled="true" id="iqc7o" group="iaw8e" class="buttonRadio Variation item2_T21 radioFillHeight " data-gjs-custom-name="item2_T21_button_Radio2">
							<p class="text_ButtonTitle " data-gjs-custom-name="text_ButtonTitle">Title 2</p>
							<p class="" data-gjs-custom-name="text_placeholder">placeholder</p>
						</widget-radio>
						<widget-radio :visible="true" :enabled="true" id="iopaf" group="iaw8e" class="buttonRadio Variation item3_T21 radioFillHeight " data-gjs-custom-name="item3_T21_button_Radio3">
							<p class="text_ButtonTitle " data-gjs-custom-name="text_ButtonTitle">Title 3</p>
							<p class="" data-gjs-custom-name="text_placeholder">placeholder</p>
						</widget-radio>
					</div>
				</container-enable-disable>
				<div class="item3_T9 " data-gjs-custom-name="item3_T9_SubmitAndExplanations">
					<widget-button :visible="false" :enabled="true" id="ithhw" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'radioSelection',group:'iaw8e',selected:'any'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ithhw',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i6grf',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ithhw',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue button_Submit " data-gjs-custom-name="button_Submit">
						<p class="marginLeft2 marginRight2 buttonBlinkBlue " data-gjs-custom-name="text_Submit">Submit</p>
					</widget-button>
					<container-show-hide :visible="true" id="ie6ap" class="dropShadow textBackgroundBasic textBackground-Correct SH_Correct-Incorrect " data-gjs-custom-name="SH_Correct">
						<p class="colorBlack " data-gjs-custom-name="text_Correct"><strong class="" data-gjs-custom-name="Text">Correct!</strong> Explanation here</p>
					</container-show-hide>
					<container-show-hide :visible="true" id="irigv" class="dropShadow textBackgroundBasic textBackground-Incorrect SH_Correct-Incorrect " data-gjs-custom-name="SH_Incorrect">
						<p class="colorBlack " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="Text">Incorrect.</strong> Explanation here</p>
					</container-show-hide>
				</div>
			</div>
			<style>
			.grid_T9.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: min-content min-content 1fr;
				grid-column-gap: 0vh;
				grid-row-gap: 3vh;
			}
			
			.item1_T9.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}
			
			.item2_T9.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 2;
				grid-row-end: span 1;
			}
			
			.item3_T9.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 3;
				grid-row-end: span 1;
				margin: 0 -3.2vh -3.2vh -3.2vh;
			}
			
			.grid_T21.$pageID$ {
				display: grid;
				grid-template-columns: 1fr 1fr 1fr;
				grid-template-rows: 1fr;
				grid-column-gap: 3vh;
				grid-row-gap: 0vh;
			}
			
			.item1_T21.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
				justify-self: stretch;
				align-self: stretch;
			}
			
			.item2_T21.$pageID$ {
				grid-column-start: 2;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
				justify-self: stretch;
				align-self: stretch;
			}
			
			.item3_T21.$pageID$ {
				grid-column-start: 3;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
				justify-self: stretch;
				align-self: stretch;
			}
			
			.text_ButtonTitle.$pageID$ {
				line-height: normal;
			}
			
			.SH_Correct-Incorrect.$pageID$ {
				border-radius: 0 0 1.3vh 1.3vh;
			}
			
			.button_Submit.$pageID$ {
				padding: 0 0 3.2vh 3.2vh;
			}
			</style>`)
	});

	bm.add("mc4_h-flush", {
		label:
			"<img src='./img/blocks/blockIcon_MC_Across4_Flush.jpg'></img><br>Multiple Choice - 4 Across → Flush Response",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
			<div class="grid_T9  textBackgroundBasic textBackground-DarkBlue" data-gjs-custom-name="grid_T9_MultipleChoice_4Across">
				<p class="item1_T9 " data-gjs-custom-name="item1_T9_text_Question">Question goes here</p>
				<container-enable-disable :visible="true" :enabled="true" id="ijst" class="item2_T9 " data-gjs-custom-name="item2_T9_ED_4Buttons">
					<div class="grid_T21 " data-gjs-custom-name="grid_T21_4ButtonColumns">
						<widget-radio :visible="true" :enabled="true" id="iu6f" group="ifej" class="buttonRadio Variation item1_T21 radioFillHeight " data-gjs-custom-name="item1_T21_button_Radio1">
							<p class="text_ButtonTitle " data-gjs-custom-name="text_ButtonTitle">Title 1</p>
							<p class="" data-gjs-custom-name="text_placeholder">placeholder</p>
						</widget-radio>
						<widget-radio :visible="true" :enabled="true" id="iq9s" group="ifej" class="buttonRadio Variation item2_T21 radioFillHeight " data-gjs-custom-name="item2_T21_button_Radio2">
							<p class="text_ButtonTitle " data-gjs-custom-name="text_ButtonTitle">Title 2</p>
							<p class="" data-gjs-custom-name="text_placeholder">placeholder</p>
						</widget-radio>
						<widget-radio :visible="true" :enabled="true" id="i6zn" group="ifej" class="buttonRadio Variation item3_T21 radioFillHeight " data-gjs-custom-name="item3_T21_button_Radio3">
							<p class="text_ButtonTitle " data-gjs-custom-name="text_ButtonTitle">Title 3</p>
							<p class="" data-gjs-custom-name="text_placeholder">placeholder</p>
						</widget-radio>
						<widget-radio :visible="true" :enabled="true" id="iv7f" group="ifej" class="buttonRadio Variation item4_T21 radioFillHeight " data-gjs-custom-name="item4_T21_button_Radio4">
							<p class="text_ButtonTitle " data-gjs-custom-name="text_ButtonTitle">Title 4</p>
							<p class="" data-gjs-custom-name="text_placeholder">placeholder</p>
						</widget-radio>
					</div>
				</container-enable-disable>
				<div class="item3_T9 " data-gjs-custom-name="item3_T9_SubmitAndExplanations">
					<widget-button :visible="false" :enabled="true" id="ihje" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'radioSelection',group:'ifej',selected:'any'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ihje',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ijst',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ihje',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue  button_Submit" data-gjs-custom-name="button_Submit">
						<p class="marginLeft2 marginRight2 buttonBlinkBlue " data-gjs-custom-name="text_Submit">Submit</p>
					</widget-button>
					<container-show-hide :visible="true" id="i2dd" class="dropShadow textBackgroundBasic textBackground-Correct  SH_Correct-Incorrect" data-gjs-custom-name="SH_Correct">
						<p class=" colorBlack" data-gjs-custom-name="text_Correct"><strong class="" data-gjs-custom-name="Text">Correct!</strong> Explanation here</p>
					</container-show-hide>
					<container-show-hide :visible="true" id="i9kk" class="dropShadow textBackgroundBasic textBackground-Incorrect  SH_Correct-Incorrect" data-gjs-custom-name="SH_Incorrect">
						<p class=" colorBlack" data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="Text">Incorrect.</strong> Explanation here</p>
					</container-show-hide>
				</div>
			</div>
			<style>
			.grid_T9.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: min-content min-content 1fr;
				grid-column-gap: 0vh;
				grid-row-gap: 3vh;
			}
			
			.item1_T9.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}
			
			.item2_T9.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 2;
				grid-row-end: span 1;
			}
			
			.item3_T9.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 3;
				grid-row-end: span 1;
				margin: 0 -3.2vh -3.2vh -3.2vh;
			}
			
			.grid_T21.$pageID$ {
				display: grid;
				grid-template-columns: 1fr 1fr 1fr 1fr;
				grid-template-rows: 1fr;
				grid-column-gap: 3vh;
				grid-row-gap: 0vh;
			}
			
			.item1_T21.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
				justify-self: stretch;
				align-self: stretch;
			}
			
			.item2_T21.$pageID$ {
				grid-column-start: 2;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
				justify-self: stretch;
				align-self: stretch;
			}
			
			.item3_T21.$pageID$ {
				grid-column-start: 3;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
				justify-self: stretch;
				align-self: stretch;
			}
			
			.item4_T21.$pageID$ {
				grid-column-start: 4;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
				justify-self: stretch;
				align-self: stretch;
			}
			
			.text_ButtonTitle.$pageID$ {
				line-height: normal;
			}
			
			.SH_Correct-Incorrect.$pageID$ {
				border-radius: 0 0 1.3vh 1.3vh;
			}
			
			.button_Submit.$pageID$ {
				padding: 0 0 3.2vh 3.2vh;
			}
			</style>`)
	});

	bm.add("mc2_v-flush", {
		label:
			"<img src='./img/blocks/blockIcon_MC_Down2_Flush.jpg'></img><br>Multiple Choice - 2 Down → Flush Response",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
			<div class="grid_T9 textBackgroundBasic textBackground-DarkBlue " data-gjs-custom-name="grid_T9_MultipleChoice_2Down">
				<p class="item1_T9 " data-gjs-custom-name="item1_T9_text_Question">Question goes here</p>
				<container-enable-disable :visible="true" :enabled="true" id="i51a" class="item2_T9 " data-gjs-custom-name="item2_T9_ED_ButtonsGrp">
					<div class="grid_T9_ButtonsGroup " data-gjs-custom-name="grid_T9_2ButtonRows">
						<div class="grid_T14 item1_T9_BGroup " data-gjs-custom-name="item1_T9_grid_T14_RowA">
							<widget-radio :visible="true" :enabled="true" id="iujl" group="iyyi" value="A" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter item1_T14_Button " data-gjs-custom-name="item1_T14_button_RadioA">
								<p class="" data-gjs-custom-name="text_A">A</p>
							</widget-radio>
							<p class="item2_T14_Answer " data-gjs-custom-name="item2_T14_text_AnswerA">Answer A</p>
						</div>
						<div class="grid_T14 item2_T9_BGroup " data-gjs-custom-name="item2_T9_grid_T14_RowB">
							<widget-radio :visible="true" :enabled="true" id="irar" group="iyyi" value="B" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter item1_T14_Button " data-gjs-custom-name="item1_T14_button_RadioB">
								<p class="" data-gjs-custom-name="text_B">B</p>
							</widget-radio>
							<p class="item2_T14_Answer " data-gjs-custom-name="item2_T14_text_AnswerB">Answer B</p>
						</div>
					</div>
				</container-enable-disable>
				<div class="item3_T9 " data-gjs-custom-name="item3_T9_SubmitAndExplanations">
					<widget-button :visible="false" :enabled="true" id="iay8" :conditions="{conditionList:[{comparisons:[{comparisonData:{comparisonType:'radioSelection',group:'iyyi',selected:'any'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iay8',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'iay8',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i51a',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iay8',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue button_Submit " data-gjs-custom-name="button_Submit">
						<p class="marginLeft2 marginRight2 buttonBlinkBlue " data-gjs-custom-name="text_Submit">Submit</p>
					</widget-button>
					<container-show-hide :visible="true" id="iajm" class="dropShadow textBackgroundBasic textBackground-Correct SH_Correct-Incorrect " data-gjs-custom-name="SH_Correct">
						<p class="colorBlack " data-gjs-custom-name="text_Correct"><strong class="" data-gjs-custom-name="Text">Correct!</strong> Explanation here</p>
					</container-show-hide>
					<container-show-hide :visible="true" id="i1pe" class="dropShadow textBackgroundBasic textBackground-Incorrect SH_Correct-Incorrect " data-gjs-custom-name="SH_Incorrect">
						<p class="colorBlack " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="Text">Incorrect.</strong> Explanation here</p>
					</container-show-hide>
				</div>
			</div>
			<style>
			.grid_T9.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: min-content min-content 1fr;
				grid-column-gap: 0vh;
				grid-row-gap: 3vh;
			}
			
			.item1_T9.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}
			
			.item2_T9.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 2;
				grid-row-end: span 1;
			}
			
			.item3_T9.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 3;
				grid-row-end: span 1;
				margin: 0 -3.2vh -3.2vh -3.2vh;
			}
			
			.grid_T9_ButtonsGroup.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr 1fr;
				grid-column-gap: 0vh;
				grid-row-gap: 1.5vh;
			}
			
			.item1_T9_BGroup.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}
			
			.item2_T9_BGroup.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 2;
				grid-row-end: span 1;
			}
			
			.grid_T14.$pageID$ {
				display: grid;
				grid-template-columns: min-content 1fr;
				grid-template-rows: 1fr;
				grid-column-gap: 1.5vh;
				width: 100%;
			}
			
			.item1_T14_Button.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}
			
			.item2_T14_Answer.$pageID$ {
				grid-column-start: 2;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
				display: flex;
				align-items: center;
			}
			
			.SH_Correct-Incorrect.$pageID$ {
				border-radius: 0 0 1.3vh 1.3vh;
			}
			
			.button_Submit.$pageID$ {
				margin: 0 0 3.2vh 3.2vh;
			}
			</style>`)
	});

	bm.add("mc3_v-flush", {
		label:
			"<img src='./img/blocks/blockIcon_MC_Down3_Flush.jpg'></img><br>Multiple Choice - 3 Down → Flush Response",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
			<div class="grid_T9  textBackgroundBasic textBackground-DarkBlue" data-gjs-custom-name="grid_T9_MultipleChoice_3Down">
				<p class="item1_T9 " data-gjs-custom-name="item1_T9_text_Question">Question goes here</p>
				<container-enable-disable :visible="true" :enabled="true" id="i8ul" class="item2_T9 " data-gjs-custom-name="item2_T9_ED_ButtonsGrp">
					<div class="grid_T9_ButtonsGroup " data-gjs-custom-name="grid_T9_3ButtonRows">
						<div class="grid_T14 item1_T9_BGroup " data-gjs-custom-name="item1_T9_grid_T14_RowA">
							<widget-radio :visible="true" :enabled="true" id="i7qz" group="ia5l" value="A" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter item1_T14_Button " data-gjs-custom-name="item1_T14_button_RadioA">
								<p class="" data-gjs-custom-name="text_A">A</p>
							</widget-radio>
							<p class="item2_T14_Answer " data-gjs-custom-name="item2_T14_text_AnswerA">Answer A</p>
						</div>
						<div class="grid_T14 item2_T9_BGroup " data-gjs-custom-name="item2_T9_grid_T14_RowB">
							<widget-radio :visible="true" :enabled="true" id="i5rr" group="ia5l" value="B" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter item1_T14_Button " data-gjs-custom-name="item1_T14_button_RadioB">
								<p class="" data-gjs-custom-name="text_B">B</p>
							</widget-radio>
							<p class="item2_T14_Answer " data-gjs-custom-name="item2_T14_text_AnswerB">Answer B</p>
						</div>
						<div class="grid_T14 item3_T9_BGroup " data-gjs-custom-name="item3_T9_grid_T14_RowC">
							<widget-radio :visible="true" :enabled="true" id="i7gp" group="ia5l" value="C" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter item1_T14_Button " data-gjs-custom-name="item1_T14_button_RadioC">
								<p class="" data-gjs-custom-name="text_C">C</p>
							</widget-radio>
							<p class="item2_T14_Answer " data-gjs-custom-name="item2_T14_text_AnswerC">Answer C</p>
						</div>
					</div>
				</container-enable-disable>
				<div class="item3_T9 " data-gjs-custom-name="item3_T9_SubmitAndExplanations">
					<widget-button :visible="false" :enabled="true" id="igff" :conditions="{conditionList:[{comparisons:[{comparisonData:{comparisonType:'radioSelection',group:'ia5l',selected:'any'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'igff',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'igff',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i8ul',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'igff',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue  button_Submit" data-gjs-custom-name="button_Submit">
						<p class="marginLeft2 marginRight2 buttonBlinkBlue " data-gjs-custom-name="text_Submit">Submit</p>
					</widget-button>
					<container-show-hide :visible="true" id="ixuz" class="dropShadow textBackgroundBasic textBackground-Correct  SH_Correct-Incorrect" data-gjs-custom-name="SH_Correct">
						<p class=" colorBlack" data-gjs-custom-name="text_Correct"><strong class="" data-gjs-custom-name="Text">Correct!</strong> Explanation here</p>
					</container-show-hide>
					<container-show-hide :visible="true" id="iqwf" class="dropShadow textBackgroundBasic textBackground-Incorrect  SH_Correct-Incorrect" data-gjs-custom-name="SH_Incorrect">
						<p class=" colorBlack" data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="Text">Incorrect.</strong> Explanation here</p>
					</container-show-hide>
				</div>
			</div>
			<style>
			.grid_T9.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: min-content min-content 1fr;
				grid-column-gap: 0vh;
				grid-row-gap: 3vh;
			}
			
			.item1_T9.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}
			
			.item2_T9.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 2;
				grid-row-end: span 1;
			}
			
			.item3_T9.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 3;
				grid-row-end: span 1;
				margin: 0 -3.2vh -3.2vh -3.2vh;
			}
			
			.grid_T9_ButtonsGroup.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr 1fr 1fr;
				grid-column-gap: 0vh;
				grid-row-gap: 1.5vh;
			}
			
			.item1_T9_BGroup.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}
			
			.item2_T9_BGroup.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 2;
				grid-row-end: span 1;
			}
			
			.item3_T9_BGroup.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 3;
				grid-row-end: span 1;
			}
			
			.grid_T14.$pageID$ {
				display: grid;
				grid-template-columns: min-content 1fr;
				grid-template-rows: 1fr;
				grid-column-gap: 1.5vh;
				width: 100%;
			}
			
			.item1_T14_Button.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}
			
			.item2_T14_Answer.$pageID$ {
				grid-column-start: 2;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
				display: flex;
				align-items: center;
			}
			
			.SH_Correct-Incorrect.$pageID$ {
				border-radius: 0 0 1.3vh 1.3vh;
			}
			
			.button_Submit.$pageID$ {
				margin: 0 0 3.2vh 3.2vh;
			}
			</style>`)
	});

	bm.add("mc4_v-flush", {
		label:
			"<img src='./img/blocks/blockIcon_MC_Down4_Flush.jpg'></img><br>Multiple Choice - 4 Down → Flush Response",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
			<div class="grid_T9 textBackgroundBasic textBackground-DarkBlue " data-gjs-custom-name="grid_T9_MultipleChoice_3Down">
				<p class="item1_T9 " data-gjs-custom-name="item1_T9_text_Question">Question goes here</p>
				<container-enable-disable :visible="true" :enabled="true" id="i11g" class="item2_T9 " data-gjs-custom-name="item2_T9_ED_ButtonsGrp">
					<div class="grid_T9_ButtonsGroup " data-gjs-custom-name="grid_T9_3ButtonRows">
						<div class="grid_T14 item1_T9_BGroup " data-gjs-custom-name="item1_T9_grid_T14_RowA">
							<widget-radio :visible="true" :enabled="true" id="ismu" group="idxs" value="A" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter item1_T14_Button " data-gjs-custom-name="item1_T14_button_RadioA">
								<p class="" data-gjs-custom-name="text_A">A</p>
							</widget-radio>
							<p class="item2_T14_Answer " data-gjs-custom-name="item2_T14_text_AnswerA">Answer A</p>
						</div>
						<div class="grid_T14 item2_T9_BGroup " data-gjs-custom-name="item2_T9_grid_T14_RowB">
							<widget-radio :visible="true" :enabled="true" id="i9hs" group="idxs" value="B" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter item1_T14_Button " data-gjs-custom-name="item1_T14_button_RadioB">
								<p class="" data-gjs-custom-name="text_B">B</p>
							</widget-radio>
							<p class="item2_T14_Answer " data-gjs-custom-name="item2_T14_text_AnswerB">Answer B</p>
						</div>
						<div class="grid_T14 item3_T9_BGroup " data-gjs-custom-name="item3_T9_grid_T14_RowC">
							<widget-radio :visible="true" :enabled="true" id="i3ne" group="idxs" value="C" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter item1_T14_Button " data-gjs-custom-name="item1_T14_button_RadioC">
								<p class="" data-gjs-custom-name="text_C">C</p>
							</widget-radio>
							<p class="item2_T14_Answer " data-gjs-custom-name="item2_T14_text_AnswerC">Answer C</p>
						</div>
						<div class="grid_T14  item4_T9_BGroup" data-gjs-custom-name="item4_T9_grid_T14_RowD">
							<widget-radio :visible="true" :enabled="true" group="iqlj" value="D" id="igli6" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter item1_T14_Button " data-gjs-custom-name="item1_T14_button_RadioD">
								<p class="" data-gjs-custom-name="text_D">D</p>
							</widget-radio>
							<p class="item2_T14_Answer " data-gjs-custom-name="item2_T14_text_AnswerD">Answer D</p>
						</div>
					</div>
				</container-enable-disable>
				<div class="item3_T9 " data-gjs-custom-name="item3_T9_SubmitAndExplanations">
					<widget-button :visible="false" :enabled="true" id="ikej" :conditions="{conditionList:[{comparisons:[{comparisonData:{comparisonType:'radioSelection',group:'idxs',selected:'any'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ikej',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'ikej',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i11g',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ikej',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue button_Submit " data-gjs-custom-name="button_Submit">
						<p class="marginLeft2 marginRight2 buttonBlinkBlue " data-gjs-custom-name="text_Submit">Submit</p>
					</widget-button>
					<container-show-hide :visible="true" id="isf2" class="dropShadow textBackgroundBasic textBackground-Correct SH_Correct-Incorrect " data-gjs-custom-name="SH_Correct">
						<p class="colorBlack " data-gjs-custom-name="text_Correct"><strong class="" data-gjs-custom-name="Text">Correct!</strong> Explanation here</p>
					</container-show-hide>
					<container-show-hide :visible="true" id="i9az" class="dropShadow textBackgroundBasic textBackground-Incorrect SH_Correct-Incorrect " data-gjs-custom-name="SH_Incorrect">
						<p class="colorBlack " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="Text">Incorrect.</strong> Explanation here</p>
					</container-show-hide>
				</div>
			</div>
			<style>
			.grid_T9.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: min-content min-content 1fr;
				grid-column-gap: 0vh;
				grid-row-gap: 3vh;
			}
			
			.item1_T9.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}
			
			.item2_T9.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 2;
				grid-row-end: span 1;
			}
			
			.item3_T9.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 3;
				grid-row-end: span 1;
				margin: 0 -3.2vh -3.2vh -3.2vh;
			}
			
			.grid_T9_ButtonsGroup.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr 1fr 1fr 1fr;
				grid-column-gap: 0vh;
				grid-row-gap: 1.5vh;
			}
			
			.item1_T9_BGroup.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}
			
			.item2_T9_BGroup.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 2;
				grid-row-end: span 1;
			}
			
			.item3_T9_BGroup.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 3;
				grid-row-end: span 1;
			}
			
			.item4_T9_BGroup.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 4;
				grid-row-end: span 1;
			}
			
			.grid_T14.$pageID$ {
				display: grid;
				grid-template-columns: min-content 1fr;
				grid-template-rows: 1fr;
				grid-column-gap: 1.5vh;
				width: 100%;
			}
			
			.item1_T14_Button.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}
			
			.item2_T14_Answer.$pageID$ {
				grid-column-start: 2;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
				display: flex;
				align-items: center;
			}
			
			.SH_Correct-Incorrect.$pageID$ {
				border-radius: 0 0 1.3vh 1.3vh;
			}
			
			.button_Submit.$pageID$ {
				margin: 0 0 3.2vh 3.2vh;
			}
			</style>`)
	});

	bm.add("mc3_v_sideby-flush", {
		label:
			"<img src='./img/blocks/blockIcon_MC_Down3-_Flush.jpg'></img><br>Multiple Choice - 3 Down ↓ [|] - Flush Response",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
			<div class="grid_T33  textBackgroundBasic textBackground-DarkBlue" data-gjs-custom-name="grid_T33_MultipleChoice_4Down[-]">
				<p class="item1_T33 " data-gjs-custom-name="item1_T33_text_Question">Question goes here</p>
				<container-enable-disable :visible="true" :enabled="true" id="idjw" class="item2_T33 " data-gjs-custom-name="item2_T33_ED_4ButtonsAndSubmit">
					<div class="grid_T76 " data-gjs-custom-name="grid_T76_5ButtonRows">
						<div class="item1_T76 grid_T14 " data-gjs-custom-name="item1_T76_grid_T14_RowA">
							<widget-radio :visible="true" :enabled="true" id="i65l" group="id2g" value="A" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter item1_T14_Button " data-gjs-custom-name="item1_T14_button_RadioA">
								<p class="" data-gjs-custom-name="text_A">A</p>
							</widget-radio>
							<p class="item2_T14_Answer " data-gjs-custom-name="item2_T14_text_AnswerA">Answer A</p>
						</div>
						<div class="item2_T76 grid_T14 " data-gjs-custom-name="item2_T76_grid_T14_RowB">
							<widget-radio :visible="true" :enabled="true" id="it1v" group="id2g" value="B" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter item1_T14_Button " data-gjs-custom-name="item1_T14_button_RadioB">
								<p class="" data-gjs-custom-name="text_A">B</p>
							</widget-radio>
							<p class="item2_T14_Answer " data-gjs-custom-name="item2_T14_text_AnswerB">Answer B</p>
						</div>
						<div class="item3_T76 grid_T14 " data-gjs-custom-name="item3_T76_grid_T14_RowC">
							<widget-radio :visible="true" :enabled="true" id="ia0h" group="id2g" value="C" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter item1_T14_Button " data-gjs-custom-name="item1_T14_button_RadioC">
								<p class="" data-gjs-custom-name="text_C">C</p>
							</widget-radio>
							<p class="item2_T14_Answer " data-gjs-custom-name="item2_T14_text_AnswerC">Answer C</p>
						</div>
						<div class="item5_T76 " data-gjs-custom-name="item5_T76_SubmitButton">
							<widget-button :visible="false" :enabled="true" id="izo5" :conditions="{conditionList:[{comparisons:[{comparisonData:{comparisonType:'radioSelection',group:'id2g',selected:'any'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'izo5',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'izo5',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'idjw',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'izo5',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue " data-gjs-custom-name="button_Submit">
								<p class="marginLeft2 marginRight2 buttonBlinkBlue " data-gjs-custom-name="text_Submit">Submit</p>
							</widget-button>
						</div>
					</div>
				</container-enable-disable>
				<div class="item3_T33 " data-gjs-custom-name="item3_T33_Explanations">
					<container-show-hide :visible="true" id="i38d" class="dropShadow textBackgroundBasic textBackground-Correct  SH_Correct-Incorrect" data-gjs-custom-name="SH_Correct">
						<p class=" colorBlack" data-gjs-custom-name="text_Correct"><strong class="" data-gjs-custom-name="Text">Correct!</strong> Explanation here</p>
					</container-show-hide>
					<container-show-hide :visible="false" id="iiiv" class="dropShadow textBackgroundBasic textBackground-Incorrect  SH_Correct-Incorrect" data-gjs-custom-name="SH_Incorrect">
						<p class=" colorBlack" data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="Text">Incorrect.</strong> Explanation here</p>
					</container-show-hide>
				</div>
			</div>
			<style>
			.grid_T14.$pageID$ {
				display: grid;
				grid-template-columns: min-content 1fr;
				grid-template-rows: 1fr;
				grid-column-gap: 1.5vh;
				width: 100%;
			}

			.item1_T14_Button.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}

			.item2_T14_Answer.$pageID$ {
				grid-column-start: 2;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
				display: flex;
				align-items: center;
			}

			.grid_T33.$pageID$ {
				display: grid;
				grid-template-columns: 1fr 1fr;
				grid-template-rows: min-content 1fr;
				grid-column-gap: 3vh;
				grid-row-gap: 3vh;
			}

			.item1_T33.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: span 1;
			}

			.item2_T33.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 2;
				grid-row-end: span 1;
			}

			.item3_T33.$pageID$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 3;
				margin: -3.2vh -3.2vh -3.2vh 0;
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr;
			}

			.grid_T76.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr 1fr 1fr 1.3fr;
				grid-column-gap: 0vh;
				grid-row-gap: 3vh;
			}

			.item1_T76.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}

			.item2_T76.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 2;
				grid-row-end: span 1;
			}

			.item3_T76.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 3;
				grid-row-end: span 1;
			}

			.item4_T76.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 4;
				grid-row-end: span 1;
			}

			.item5_T76.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 4;
				grid-row-end: 5;
				min-height: 3vh;
			}

			.$pageID$.SH_Correct-Incorrect {
				border-radius: 0 1.3vh 1.3vh 0;
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				justify-self: stretch;
				align-self: stretch;
			}
			</style>`)
	});

	bm.add("mc4_v_sideby-flush", {
		label:
			"<img src='./img/blocks/blockIcon_MC_Down4-_Flush.jpg'></img><br>Multiple Choice - 4 Down ↓ [|] - Flush Response",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
			<div class="grid_T33 textBackgroundBasic textBackground-DarkBlue " data-gjs-custom-name="grid_T33_MultipleChoice_4Down[-]">
				<p class="item1_T33 " data-gjs-custom-name="item1_T33_text_Question">Question goes here</p>
				<container-enable-disable :visible="true" :enabled="true" id="i4ck" class="item2_T33 " data-gjs-custom-name="item2_T33_ED_4ButtonsAndSubmit">
					<div class="grid_T76 " data-gjs-custom-name="grid_T76_5ButtonRows">
						<div class="item1_T76 grid_T14 " data-gjs-custom-name="item1_T76_grid_T14_RowA">
							<widget-radio :visible="true" :enabled="true" id="i63g" group="iry3l" value="A" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter item1_T14_Button " data-gjs-custom-name="item1_T14_button_RadioA">
								<p class="" data-gjs-custom-name="text_A">A</p>
							</widget-radio>
							<p class="item2_T14_Answer " data-gjs-custom-name="item2_T14_text_AnswerA">Answer A</p>
						</div>
						<div class="item2_T76 grid_T14 " data-gjs-custom-name="item2_T76_grid_T14_RowB">
							<widget-radio :visible="true" :enabled="true" id="i33w" group="iry3l" value="B" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter item1_T14_Button " data-gjs-custom-name="item1_T14_button_RadioB">
								<p class="" data-gjs-custom-name="text_A">B</p>
							</widget-radio>
							<p class="item2_T14_Answer " data-gjs-custom-name="item2_T14_text_AnswerB">Answer B</p>
						</div>
						<div class="item3_T76 grid_T14 " data-gjs-custom-name="item3_T76_grid_T14_RowC">
							<widget-radio :visible="true" :enabled="true" id="igkf" group="iry3l" value="C" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter item1_T14_Button " data-gjs-custom-name="item1_T14_button_RadioC">
								<p class="" data-gjs-custom-name="text_C">C</p>
							</widget-radio>
							<p class="item2_T14_Answer " data-gjs-custom-name="item2_T14_text_AnswerC">Answer C</p>
						</div>
						<div class="grid_T14  item4_T76" data-gjs-custom-name="item4_T76_grid_T14_RowD">
							<widget-radio :visible="true" :enabled="true" group="iry3l" value="D" id="ivs05" class="buttonRadio buttonRadioNormal buttonRadioNormalCharacter item1_T14_Button " data-gjs-custom-name="item1_T14_button_RadioD">
								<p class="" data-gjs-custom-name="text_C">D</p>
							</widget-radio>
							<p class="item2_T14_Answer " data-gjs-custom-name="item2_T14_text_AnswerD">Answer D</p>
						</div>
						<div class="item5_T76 " data-gjs-custom-name="item5_T76_SubmitButton">
							<widget-button :visible="false" :enabled="true" id="igbw" :conditions="{conditionList:[{comparisons:[{comparisonData:{comparisonType:'radioSelection',group:'iry3l',selected:'any'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'igbw',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'igbw',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i4ck',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'igbw',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue " data-gjs-custom-name="button_Submit">
								<p class="marginLeft2 marginRight2 buttonBlinkBlue " data-gjs-custom-name="text_Submit">Submit</p>
							</widget-button>
						</div>
					</div>
				</container-enable-disable>
				<div class="item3_T33 " data-gjs-custom-name="item3_T33_Explanations">
					<container-show-hide :visible="true" id="iuta" class="dropShadow textBackgroundBasic textBackground-Correct SH_Correct-Incorrect " data-gjs-custom-name="SH_Correct">
						<p class="colorBlack " data-gjs-custom-name="text_Correct"><strong class="" data-gjs-custom-name="Text">Correct!</strong> Explanation here</p>
					</container-show-hide>
					<container-show-hide :visible="false" id="ikad" class="dropShadow textBackgroundBasic textBackground-Incorrect SH_Correct-Incorrect " data-gjs-custom-name="SH_Incorrect">
						<p class="colorBlack " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="Text">Incorrect.</strong> Explanation here</p>
					</container-show-hide>
				</div>
			</div>
			<style>
			.grid_T14.$pageID$ {
				display: grid;
				grid-template-columns: min-content 1fr;
				grid-template-rows: 1fr;
				grid-column-gap: 1.5vh;
				width: 100%;
			}
			
			.item1_T14_Button.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}
			
			.item2_T14_Answer.$pageID$ {
				grid-column-start: 2;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
				display: flex;
				align-items: center;
			}
			
			.grid_T33.$pageID$ {
				display: grid;
				grid-template-columns: 1fr 1fr;
				grid-template-rows: min-content 1fr;
				grid-column-gap: 3vh;
				grid-row-gap: 3vh;
			}
			
			.item1_T33.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: span 1;
			}
			
			.item2_T33.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 2;
				grid-row-end: span 1;
			}
			
			.item3_T33.$pageID$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 3;
				margin: -3.2vh -3.2vh -3.2vh 0;
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr;
			}
			
			.grid_T76.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr 1fr 1fr 1fr 1.3fr;
				grid-column-gap: 0vh;
				grid-row-gap: 3vh;
			}
			
			.item1_T76.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 1;
				grid-row-end: span 1;
			}
			
			.item2_T76.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 2;
				grid-row-end: span 1;
			}
			
			.item3_T76.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 3;
				grid-row-end: span 1;
			}
			
			.item4_T76.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 4;
				grid-row-end: span 1;
			}
			
			.item5_T76.$pageID$ {
				grid-column-start: 1;
				grid-column-end: span 1;
				grid-row-start: 5;
				grid-row-end: 6;
				min-height: 3vh;
			}
			
			.SH_Correct-Incorrect.$pageID$ {
				border-radius: 0 1.3vh 1.3vh 0;
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				justify-self: stretch;
				align-self: stretch;
			}
			</style>`)
	});

	bm.add("ms4_v", {
		label:
			"<img src='./img/blocks/blockIcon_MC_Down4-.jpg'></img><br>Multiple Select - 4 Down ↓",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
			<div class="grid_MultiSelect " data-gjs-custom-name="grid_MultiSelect">
				<p class="item1_MS colorWhite " data-gjs-custom-name="item1_MS_text_Question">Question Text</p>
				<container-enable-disable :visible="true" :enabled="true" id="ic0b" class="item2_MS " data-gjs-custom-name="item2_MS_ED_ButtonsGrp">
					<div class="grid_T10 " data-gjs-custom-name="grid_T10_4ButtonRows">
						<div class="item1_T10 grid_T14 " data-gjs-custom-name="item1_T10_grid_T14_RowA">
							<widget-checkbox :visible="true" :enabled="true" id="i2yk" :checked="false" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_A"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerA">Answer 1</p>
						</div>
						<div class="item2_T10 grid_T14 " data-gjs-custom-name="item2_T10_grid_T14_RowB">
							<widget-checkbox :visible="true" :enabled="true" :checked="false" id="idkg" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_B"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerB">Answer 2</p>
						</div>
						<div class="item3_T10 grid_T14 " data-gjs-custom-name="item3_T10_grid_T14_RowC">
							<widget-checkbox :visible="true" :enabled="true" :checked="false" id="i3sh" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_C"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerC">Answer 3</p>
						</div>
						<div class="item4_T10 grid_T14 " data-gjs-custom-name="item4_T10_grid_T14_RowD">
							<widget-checkbox :visible="true" :enabled="true" :checked="false" id="ivau" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_D"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerD">Answer 4</p>
						</div>
					</div>
				</container-enable-disable>
				<div class="Grid_SubmitExplanations item3_MS " data-gjs-custom-name="Grid_SubmitExplanations">
					<widget-button :visible="false" :enabled="true" id="iv6o" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i2yk',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'idkg',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i3sh',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ivau',key:'checked',val:true}}],comparisonsLogic:'or',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iv6o',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'iv6o',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]},{comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iv6o',key:'visible',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ikt5',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iv6o',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:null,key:'',val:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i2yk',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'idkg',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i3sh',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ivau',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iors',key:'visible',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ic0b',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'unlockNextPage'},fireOnceID:'',delay:2}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'ikt5',key:'visible',val:true},fireOnceID:'',delay:0}],responsesPass:[{rubricID:null,responseData:{responseType:'sharedData',sharedDataKey:null,descriptor:'numAttempts',numCorrectTotal:0},fireOnceID:''}],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'nestedComparisons',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i2yk',key:'checked',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'idkg',key:'checked',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i3sh',key:'checked',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ivau',key:'checked',val:false}}],comparisonsLogic:'or'}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:null,key:'',val:''}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ipc1',key:'visible',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ic0b',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'unlockNextPage'},fireOnceID:'',delay:2},{effectData:{effectType:'updateWidget',widgetID:'ikt5',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i2yk',key:'correctStyle',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'idkg',key:'correctStyle',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i3sh',key:'correctStyle',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ivau',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[{rubricID:null,responseData:{responseType:'widget',format:'html',headerPairs:[]},fireOnceID:''}],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i2yk',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i2yk',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i2yk',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'idkg',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'idkg',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'idkg',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i3sh',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i3sh',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i3sh',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ivau',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ivau',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ivau',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue buttonSubmit " data-gjs-custom-name="button_Submit">
						<p class="marginLeft2 marginRight2 buttonBlinkBlue buttonSubmit " data-gjs-custom-name="text_Submit">Submit</p>
					</widget-button>
					<container-show-hide :visible="false" id="ipc1" class="SH_Correct_Incorrect " data-gjs-custom-name="incorrect-show-hide1">
						<p class="dropShadow textBackgroundBasic textBackground-Incorrect " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="Text">Incorrect.&nbsp;</strong>Explanation</p>
					</container-show-hide>
					<container-show-hide :visible="false" id="ikt5" class="SH_Correct_Incorrect " data-gjs-custom-name="incorrect-show-hide2">
						<p class="dropShadow textBackgroundBasic textBackground-Incorrect " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="Text">Incorrect.</strong> Try again.</p>
					</container-show-hide>
					<container-show-hide :visible="false" id="iors" class="SH_Correct_Incorrect " data-gjs-custom-name="correct-show-hide">
						<p class="dropShadow textBackgroundBasic textBackground-Correct " data-gjs-custom-name="text_Correct"><strong class="" data-gjs-custom-name="Text">Correct!&nbsp;</strong>Explanation</p>
					</container-show-hide>
				</div>
			</div>
			<style>
			.grid_MultiSelect.$pageID$ {
				display: grid;
				grid-template-columns: 1fr 1fr;
				grid-template-rows: min-content 1fr;
				grid-column-gap: 2vh;
				grid-row-gap: 3vh;
			}
			
			.item1_MS.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2_MS.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			
			.item3_MS.$pageID$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			
			.grid_T10.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr 1fr 1fr 1fr;
				grid-column-gap: 0vh;
				grid-row-gap: 1.5vh;
			}
			
			.item1_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			
			.item3_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 3;
				grid-row-end: 4;
			}
			
			.item4_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 4;
				grid-row-end: 5;
			}
			
			.grid_T14.$pageID$ {
				display: grid;
				grid-template-columns: min-content 1fr;
				grid-template-rows: 1fr;
				grid-column-gap: 1.5vh;
				width: 100%;
			}
			
			.item1_T14.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2_T14_Answer.$pageID$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 2;
				align-items: center;
				display: block;
			}
			
			.SH_Correct_Incorrect.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.Grid_SubmitExplanations.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr;
			}
			
			.buttonSubmit.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				align-self: end;
				justify-self: start;
			}
			</style>
		`)
	});

	bm.add("ms5_v", {
		label:
			"<img src='./img/blocks/blockIcon_MC_Down4-.jpg'></img><br>Multiple Select - 5 Down ↓",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
			<div class="grid_MultiSelect " data-gjs-custom-name="grid_MultiSelect">
				<p class="item1_MS colorWhite " data-gjs-custom-name="item1_MS_text_Question">Question Text</p>
				<container-enable-disable :visible="true" :enabled="true" id="ir27" class="item2_MS " data-gjs-custom-name="item2_MS_ED_ButtonsGrp">
					<div class="grid_T10 " data-gjs-custom-name="grid_T10_4ButtonRows">
						<div class="item1_T10 grid_T14 " data-gjs-custom-name="item1_T10_grid_T14_RowA">
							<widget-checkbox :visible="true" :enabled="true" id="iwei" :checked="false" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_A"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerA">Answer 1</p>
						</div>
						<div class="item2_T10 grid_T14 " data-gjs-custom-name="item2_T10_grid_T14_RowB">
							<widget-checkbox :visible="true" :enabled="true" :checked="false" id="i86v" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_B"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerB">Answer 2</p>
						</div>
						<div class="item3_T10 grid_T14 " data-gjs-custom-name="item3_T10_grid_T14_RowC">
							<widget-checkbox :visible="true" :enabled="true" :checked="false" id="i6rd" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_C"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerC">Answer 3</p>
						</div>
						<div class="item4_T10 grid_T14 " data-gjs-custom-name="item4_T10_grid_T14_RowD">
							<widget-checkbox :visible="true" :enabled="true" :checked="false" id="izjh" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_D"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerD">Answer 4</p>
						</div>
						<div class="grid_T14 item5_T10 " data-gjs-custom-name="item5_T10_grid_T14_RowE">
							<widget-checkbox :visible="true" :enabled="true" :checked="false" id="ijvp" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_E"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerE">Answer 5</p>
						</div>
					</div>
				</container-enable-disable>
				<div class="Grid_SubmitExplanations item3_MS " data-gjs-custom-name="Grid_SubmitExplanations">
					<widget-button :visible="false" :enabled="true" id="iuol" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iwei',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i86v',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i6rd',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'izjh',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ijvp',key:'checked',val:true}}],comparisonsLogic:'or',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iuol',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'iuol',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]},{comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iuol',key:'visible',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'is0c',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iuol',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:null,key:'',val:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iwei',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i86v',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i6rd',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'izjh',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ijvp',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'igw7h',key:'visible',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ir27',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'unlockNextPage'},fireOnceID:'',delay:2}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'is0c',key:'visible',val:true},fireOnceID:'',delay:0}],responsesPass:[{rubricID:null,responseData:{responseType:'sharedData',sharedDataKey:null,descriptor:'numAttempts',numCorrectTotal:0},fireOnceID:''}],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'nestedComparisons',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iwei',key:'checked',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i86v',key:'checked',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i6rd',key:'checked',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'izjh',key:'checked',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ijvp',key:'checked',val:false}}],comparisonsLogic:'or'}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:null,key:'',val:''}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ivqn',key:'visible',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ir27',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'unlockNextPage'},fireOnceID:'',delay:2},{effectData:{effectType:'updateWidget',widgetID:'is0c',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iwei',key:'correctStyle',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i86v',key:'correctStyle',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i6rd',key:'correctStyle',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'izjh',key:'correctStyle',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ijvp',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[{rubricID:null,responseData:{responseType:'widget',format:'html',headerPairs:[]},fireOnceID:''}],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iwei',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iwei',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iwei',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i86v',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i86v',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i86v',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i6rd',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i6rd',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i6rd',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'izjh',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'izjh',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'izjh',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ijvp',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ijvp',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ijvp',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue buttonSubmit " data-gjs-custom-name="button_Submit">
						<p class="marginLeft2 marginRight2 buttonBlinkBlue buttonSubmit " data-gjs-custom-name="text_Submit">Submit</p>
					</widget-button>
					<container-show-hide :visible="false" id="ivqn" class="SH_Correct_Incorrect " data-gjs-custom-name="incorrect-show-hide1">
						<p class="dropShadow textBackgroundBasic textBackground-Incorrect " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="Text">Incorrect.&nbsp;</strong>Explanation</p>
					</container-show-hide>
					<container-show-hide :visible="false" id="is0c" class="SH_Correct_Incorrect " data-gjs-custom-name="incorrect-show-hide2">
						<p class="dropShadow textBackgroundBasic textBackground-Incorrect " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="Text">Incorrect.</strong> Try again.</p>
					</container-show-hide>
					<container-show-hide :visible="false" id="igw7h" class="SH_Correct_Incorrect " data-gjs-custom-name="correct-show-hide">
						<p class="dropShadow textBackgroundBasic textBackground-Correct " data-gjs-custom-name="text_Correct"><strong class="" data-gjs-custom-name="Text">Correct!&nbsp;</strong>Explanation</p>
					</container-show-hide>
				</div>
			</div>
			<style>
			.grid_MultiSelect.$pageID$ {
				display: grid;
				grid-template-columns: 1fr 1fr;
				grid-template-rows: min-content 1fr;
				grid-column-gap: 2vh;
				grid-row-gap: 3vh;
			}
			
			.item1_MS.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2_MS.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			
			.item3_MS.$pageID$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			
			.grid_T10.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
				grid-column-gap: 0vh;
				grid-row-gap: 1.5vh;
			}
			
			.item1_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			
			.item3_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 3;
				grid-row-end: 4;
			}
			
			.item4_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 4;
				grid-row-end: 5;
			}
			
			.item5_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 5;
				grid-row-end: 6;
			}
			
			.grid_T14.$pageID$ {
				display: grid;
				grid-template-columns: min-content 1fr;
				grid-template-rows: 1fr;
				grid-column-gap: 1.5vh;
				width: 100%;
			}
			
			.item1_T14.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2_T14_Answer.$pageID$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 2;
				align-items: center;
				display: block;
			}
			
			.SH_Correct_Incorrect.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.Grid_SubmitExplanations.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr;
			}
			
			.buttonSubmit.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				align-self: end;
				justify-self: start;
			}
			</style>
		`)
	});

	bm.add("ms4_flush-right", {
		label:
			"<img src='./img/blocks/blockIcon_MS_Down4-_Flush.jpg'></img><br>Multiple Select - 4 Down ↓ - Flush Response Right",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
			<div class="grid_MultiSelect textBackgroundBasic textBackground-DarkBlue " data-gjs-custom-name="grid_MultiSelect">
				<p class="item1_MS " data-gjs-custom-name="item1_MS_text_Question">Question Text</p>
				<container-enable-disable :visible="true" :enabled="true" id="idiv" class="item2_MS " data-gjs-custom-name="item2_MS_ED_ButtonsGrp">
					<div class="grid_T10 " data-gjs-custom-name="grid_T10_4ButtonRows">
						<div class="item1_T10 grid_T14 " data-gjs-custom-name="item1_T10_grid_T14_RowA">
							<widget-checkbox :visible="true" :enabled="true" id="icpk" :checked="false" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_A"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerA">Answer 1</p>
						</div>
						<div class="item2_T10 grid_T14 " data-gjs-custom-name="item2_T10_grid_T14_RowB">
							<widget-checkbox :visible="true" :enabled="true" :checked="false" id="icmv" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_B"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerB">Answer 2</p>
						</div>
						<div class="item3_T10 grid_T14 " data-gjs-custom-name="item3_T10_grid_T14_RowC">
							<widget-checkbox :visible="true" :enabled="true" :checked="false" id="ix4k" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_C"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerC">Answer 3</p>
						</div>
						<div class="item4_T10 grid_T14 " data-gjs-custom-name="item4_T10_grid_T14_RowD">
							<widget-checkbox :visible="true" :enabled="true" :checked="false" id="iei7" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_D"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerD">Answer 4</p>
						</div>
					</div>
				</container-enable-disable>
				<div class="Grid_SubmitExplanations item3_MS " data-gjs-custom-name="Grid_SubmitExplanations">
					<widget-button :visible="false" :enabled="true" id="ilb1" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'icpk',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'icmv',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ix4k',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iei7',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'imlq',key:'checked',val:true}}],comparisonsLogic:'or',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ilb1',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'ilb1',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]},{comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ilb1',key:'visible',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i2x2',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ilb1',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:null,key:'',val:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'icpk',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'icmv',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ix4k',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iei7',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i103',key:'visible',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'idiv',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'unlockNextPage'},fireOnceID:'',delay:2}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'i2x2',key:'visible',val:true},fireOnceID:'',delay:0}],responsesPass:[{rubricID:null,responseData:{responseType:'widget',format:'html',headerPairs:[]},fireOnceID:''}],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'nestedComparisons',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'icpk',key:'checked',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'icmv',key:'checked',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ix4k',key:'checked',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iei7',key:'checked',val:false}}],comparisonsLogic:'or'}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:null,key:'',val:''}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i85g',key:'visible',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'idiv',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'unlockNextPage'},fireOnceID:'',delay:2},{effectData:{effectType:'updateWidget',widgetID:'i2x2',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'icpk',key:'correctStyle',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'icmv',key:'correctStyle',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ix4k',key:'correctStyle',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iei7',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[{rubricID:null,responseData:{responseType:'widget',format:'html',headerPairs:[]},fireOnceID:''}],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'icpk',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'icpk',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'icpk',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'icmv',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'icmv',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'icmv',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ix4k',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ix4k',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ix4k',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iei7',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iei7',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iei7',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue buttonSubmit " data-gjs-custom-name="button_Submit">
						<p class="buttonBlinkBlue " data-gjs-custom-name="text_Submit">Submit</p>
					</widget-button>
					<container-show-hide :visible="false" id="i85g" class="dropShadow textBackgroundBasic textBackground-Incorrect SH_Correct_Incorrect " data-gjs-custom-name="incorrect-show-hide1">
						<p class="colorBlack " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="Text">Incorrect.&nbsp;</strong>Explanation</p>
					</container-show-hide>
					<container-show-hide :visible="false" id="i2x2" class="dropShadow textBackgroundBasic textBackground-Incorrect SH_Correct_Incorrect " data-gjs-custom-name="incorrect-show-hide2">
						<p class="colorBlack " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="Text">Incorrect.</strong> Try again.</p>
					</container-show-hide>
					<container-show-hide :visible="false" id="i103" class="dropShadow textBackgroundBasic textBackground-Correct SH_Correct_Incorrect " data-gjs-custom-name="correct-show-hide">
						<p class="colorBlack " data-gjs-custom-name="text_Correct"><strong class="" data-gjs-custom-name="Text">Correct!&nbsp;</strong>Explanation</p>
					</container-show-hide>
				</div>
			</div>
			<style>
			.grid_MultiSelect.$pageID$ {
				display: grid;
				grid-template-columns: 1fr 1fr;
				grid-template-rows: min-content 1fr;
				grid-column-gap: 2vh;
				grid-row-gap: 3vh;
			}
			
			.item1_MS.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2_MS.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			
			.item3_MS.$pageID$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 3;
				margin: -3.2vh -3.2vh -3.2vh 0;
			}
			
			.grid_T10.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr 1fr 1fr 1fr;
				grid-column-gap: 0vh;
				grid-row-gap: 1.5vh;
			}
			
			.item1_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			
			.item3_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 3;
				grid-row-end: 4;
			}
			
			.item4_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 4;
				grid-row-end: 5;
			}
			
			.grid_T14.$pageID$ {
				display: grid;
				grid-template-columns: min-content 1fr;
				grid-template-rows: 1fr;
				grid-column-gap: 1.5vh;
				width: 100%;
			}
			
			.item1_T14.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2_T14_Answer.$pageID$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 2;
				align-items: center;
				display: block;
			}
			
			.SH_Correct_Incorrect.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				border-radius: 0 1.3vh 1.3vh 0;
			}
			
			.Grid_SubmitExplanations.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr;
			}
			
			.buttonSubmit.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				align-self: end;
				justify-self: start;
				margin: 0 0 3.2vh 3.2vh;
			}
			</style>
		`)
	});

	bm.add("ms5_flush-right", {
		label:
			"<img src='./img/blocks/blockIcon_MS_Down5-_Flush.jpg'></img><br>Multiple Select - 5 Down ↓ - Flush Response Right",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
			<div class="grid_MultiSelect textBackgroundBasic textBackground-DarkBlue " data-gjs-custom-name="grid_MultiSelect">
				<p class="item1_MS " data-gjs-custom-name="item1_MS_text_Question">Question Text</p>
				<container-enable-disable :visible="true" :enabled="true" id="i8kj" class="item2_MS " data-gjs-custom-name="item2_MS_ED_ButtonsGrp">
					<div class="grid_T10 " data-gjs-custom-name="grid_T10_4ButtonRows">
						<div class="item1_T10 grid_T14 " data-gjs-custom-name="item1_T10_grid_T14_RowA">
							<widget-checkbox :visible="true" :enabled="true" id="ijr8" :checked="false" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_A"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerA">Answer 1</p>
						</div>
						<div class="item2_T10 grid_T14 " data-gjs-custom-name="item2_T10_grid_T14_RowB">
							<widget-checkbox :visible="true" :enabled="true" :checked="false" id="i9mc" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_B"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerB">Answer 2</p>
						</div>
						<div class="item3_T10 grid_T14 " data-gjs-custom-name="item3_T10_grid_T14_RowC">
							<widget-checkbox :visible="true" :enabled="true" :checked="false" id="il1x" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_C"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerC">Answer 3</p>
						</div>
						<div class="item4_T10 grid_T14 " data-gjs-custom-name="item4_T10_grid_T14_RowD">
							<widget-checkbox :visible="true" :enabled="true" :checked="false" id="i1fx" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_D"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerD">Answer 4</p>
						</div>
						<div class="grid_T14 item5_T10 " data-gjs-custom-name="item5_T10_grid_T14_RowE">
							<widget-checkbox :visible="true" :enabled="true" :checked="false" id="i9en" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_E"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerE">Answer 5</p>
						</div>
					</div>
				</container-enable-disable>
				<div class="Grid_SubmitExplanations item3_MS " data-gjs-custom-name="Grid_SubmitExplanations">
					<widget-button :visible="false" :enabled="true" id="iwvh" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ijr8',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i9mc',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'il1x',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i1fx',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i9en',key:'checked',val:true}}],comparisonsLogic:'or',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iwvh',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'iwvh',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]},{comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iwvh',key:'visible',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i3im',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iwvh',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:null,key:'',val:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ijr8',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i9mc',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'il1x',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i1fx',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i9en',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i1qm9',key:'visible',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i8kj',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'unlockNextPage'},fireOnceID:'',delay:2}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'i3im',key:'visible',val:true},fireOnceID:'',delay:0}],responsesPass:[{rubricID:null,responseData:{responseType:'sharedData',sharedDataKey:null,descriptor:'numAttempts',numCorrectTotal:0},fireOnceID:''}],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'nestedComparisons',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ijr8',key:'checked',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i9mc',key:'checked',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'il1x',key:'checked',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i1fx',key:'checked',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i9en',key:'checked',val:false}}],comparisonsLogic:'or'}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:null,key:'',val:''}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i9ug',key:'visible',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i8kj',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'unlockNextPage'},fireOnceID:'',delay:2},{effectData:{effectType:'updateWidget',widgetID:'i3im',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ijr8',key:'correctStyle',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i9mc',key:'correctStyle',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'il1x',key:'correctStyle',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i1fx',key:'correctStyle',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i9en',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[{rubricID:null,responseData:{responseType:'widget',format:'html',headerPairs:[]},fireOnceID:''}],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ijr8',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ijr8',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ijr8',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i9mc',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i9mc',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i9mc',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'il1x',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'il1x',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'il1x',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i1fx',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i1fx',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i1fx',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i9en',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i9en',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i9en',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue buttonSubmit " data-gjs-custom-name="button_Submit">
						<p class="buttonBlinkBlue " data-gjs-custom-name="text_Submit">Submit</p>
					</widget-button>
					<container-show-hide :visible="false" id="i9ug" class="dropShadow textBackgroundBasic textBackground-Incorrect SH_Correct_Incorrect " data-gjs-custom-name="incorrect-show-hide1">
						<p class="colorBlack " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="Text">Incorrect.&nbsp;</strong>Explanation</p>
					</container-show-hide>
					<container-show-hide :visible="false" id="i3im" class="dropShadow textBackgroundBasic textBackground-Incorrect SH_Correct_Incorrect " data-gjs-custom-name="incorrect-show-hide2">
						<p class="colorBlack " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="Text">Incorrect.</strong> Try again.</p>
					</container-show-hide>
					<container-show-hide :visible="false" id="i1qm9" class="dropShadow textBackgroundBasic textBackground-Correct SH_Correct_Incorrect " data-gjs-custom-name="correct-show-hide">
						<p class="colorBlack " data-gjs-custom-name="text_Correct"><strong class="" data-gjs-custom-name="Text">Correct!&nbsp;</strong>Explanation</p>
					</container-show-hide>
				</div>
			</div>
			<style>
			.grid_MultiSelect.$pageID$ {
				display: grid;
				grid-template-columns: 1fr 1fr;
				grid-template-rows: min-content 1fr;
				grid-column-gap: 2vh;
				grid-row-gap: 3vh;
			}
			
			.item1_MS.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2_MS.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			
			.item3_MS.$pageID$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 3;
				margin: -3.2vh -3.2vh -3.2vh 0;
			}
			
			.grid_T10.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
				grid-column-gap: 0vh;
				grid-row-gap: 1.5vh;
			}
			
			.item1_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			
			.item3_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 3;
				grid-row-end: 4;
			}
			
			.item4_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 4;
				grid-row-end: 5;
			}
			
			.item5_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 5;
				grid-row-end: 6;
			}
			
			.grid_T14.$pageID$ {
				display: grid;
				grid-template-columns: min-content 1fr;
				grid-template-rows: 1fr;
				grid-column-gap: 1.5vh;
				width: 100%;
			}
			
			.item1_T14.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2_T14_Answer.$pageID$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 2;
				align-items: center;
				display: block;
			}
			
			.SH_Correct_Incorrect.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				border-radius: 0 1.3vh 1.3vh 0;
			}
			
			.Grid_SubmitExplanations.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr;
			}
			
			.buttonSubmit.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				align-self: end;
				justify-self: start;
				margin: 0 0 3.2vh 3.2vh;
			}
			</style>
		`)
	});

	bm.add("ms4_flush-bottom", {
		label:
			"<img src='./img/blocks/blockIcon_MS_Down4_Flush.jpg'></img><br>Multiple Select - 4 Down ↓ - Flush Response Bottom",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
			<div class="grid_MultiSelect textBackgroundBasic textBackground-DarkBlue " data-gjs-custom-name="grid_MultiSelect">
				<p class="item1_MS " data-gjs-custom-name="item1_MS_text_Question">Question Text</p>
				<container-enable-disable :visible="true" :enabled="true" id="isiy" class="item2_MS " data-gjs-custom-name="item2_MS_ED_ButtonsGrp">
					<div class="grid_T10 " data-gjs-custom-name="grid_T10_4ButtonRows">
						<div class="item1_T10 grid_T14 " data-gjs-custom-name="item1_T10_grid_T14_RowA">
							<widget-checkbox :visible="true" :enabled="true" id="i6iz" :checked="false" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_A"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerA">Answer 1</p>
						</div>
						<div class="item2_T10 grid_T14 " data-gjs-custom-name="item2_T10_grid_T14_RowB">
							<widget-checkbox :visible="true" :enabled="true" :checked="false" id="ig3k" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_B"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerB">Answer 2</p>
						</div>
						<div class="item3_T10 grid_T14 " data-gjs-custom-name="item3_T10_grid_T14_RowC">
							<widget-checkbox :visible="true" :enabled="true" :checked="false" id="injq" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_C"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerC">Answer 3</p>
						</div>
						<div class="item4_T10 grid_T14 " data-gjs-custom-name="item4_T10_grid_T14_RowD">
							<widget-checkbox :visible="true" :enabled="true" :checked="false" id="ii3q" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_D"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerD">Answer 4</p>
						</div>
					</div>
				</container-enable-disable>
				<div class="Grid_SubmitExplanations item3_MS " data-gjs-custom-name="Grid_SubmitExplanations">
					<widget-button :visible="false" :enabled="true" id="izkm" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i6iz',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ig3k',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'injq',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ii3q',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'im3ph',key:'checked',val:true}}],comparisonsLogic:'or',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'izkm',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'izkm',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]},{comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'izkm',key:'visible',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ioe6',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'izkm',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:null,key:'',val:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i6iz',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ig3k',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'injq',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ii3q',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'izb9',key:'visible',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'isiy',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'unlockNextPage'},fireOnceID:'',delay:2}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'ioe6',key:'visible',val:true},fireOnceID:'',delay:0}],responsesPass:[{rubricID:null,responseData:{responseType:'widget',format:'html',headerPairs:[]},fireOnceID:''}],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'nestedComparisons',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i6iz',key:'checked',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ig3k',key:'checked',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'injq',key:'checked',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ii3q',key:'checked',val:false}}],comparisonsLogic:'or'}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:null,key:'',val:''}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ilni',key:'visible',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'isiy',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'unlockNextPage'},fireOnceID:'',delay:2},{effectData:{effectType:'updateWidget',widgetID:'ioe6',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i6iz',key:'correctStyle',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ig3k',key:'correctStyle',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'injq',key:'correctStyle',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ii3q',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[{rubricID:null,responseData:{responseType:'widget',format:'html',headerPairs:[]},fireOnceID:''}],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i6iz',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i6iz',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i6iz',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ig3k',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ig3k',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ig3k',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'injq',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'injq',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'injq',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ii3q',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ii3q',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ii3q',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue buttonSubmit " data-gjs-custom-name="button_Submit">
						<p class="buttonBlinkBlue " data-gjs-custom-name="text_Submit">Submit</p>
					</widget-button>
					<container-show-hide :visible="false" id="ilni" class="dropShadow textBackgroundBasic textBackground-Incorrect SH_Correct_Incorrect " data-gjs-custom-name="incorrect-show-hide1">
						<p class="colorBlack " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="Text">Incorrect.&nbsp;</strong>Explanation</p>
					</container-show-hide>
					<container-show-hide :visible="false" id="ioe6" class="dropShadow textBackgroundBasic textBackground-Incorrect SH_Correct_Incorrect " data-gjs-custom-name="incorrect-show-hide2">
						<p class="colorBlack " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="Text">Incorrect.</strong> Try again.</p>
					</container-show-hide>
					<container-show-hide :visible="false" id="izb9" class="dropShadow textBackgroundBasic textBackground-Correct SH_Correct_Incorrect " data-gjs-custom-name="correct-show-hide">
						<p class="colorBlack " data-gjs-custom-name="text_Correct"><strong class="" data-gjs-custom-name="Text">Correct!&nbsp;</strong>Explanation</p>
					</container-show-hide>
				</div>
			</div>
			<style>
			.grid_MultiSelect.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: min-content 1fr min-content;
				grid-column-gap: 2vh;
				grid-row-gap: 3vh;
			}
			
			.item1_MS.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2_MS.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			
			.item3_MS.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 3;
				grid-row-end: 4;
				margin: 0 -3.2vh -3.2vh -3.2vh;
			}
			
			.grid_T10.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr 1fr 1fr 1fr;
				grid-column-gap: 0vh;
				grid-row-gap: 1.5vh;
			}
			
			.item1_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			
			.item3_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 3;
				grid-row-end: 4;
			}
			
			.item4_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 4;
				grid-row-end: 5;
			}
			
			.grid_T14.$pageID$ {
				display: grid;
				grid-template-columns: min-content 1fr;
				grid-template-rows: 1fr;
				grid-column-gap: 1.5vh;
				width: 100%;
			}
			
			.item1_T14.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2_T14_Answer.$pageID$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 2;
				align-items: center;
				display: block;
			}
			
			.SH_Correct_Incorrect.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				border-radius: 0 0 1.3vh 1.3vh;
			}
			
			.Grid_SubmitExplanations.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr;
			}
			
			.buttonSubmit.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				justify-self: start;
				margin: 0 0 3.2vh 3.2vh;
				align-self: start;
			}
			</style>
		`)
	});

	bm.add("ms5_flush-bottom", {
		label:
			"<img src='./img/blocks/blockIcon_MS_Down5_Flush.jpg'></img><br>Multiple Select - 5 Down ↓ - Flush Response Bottom",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
			<div class="grid_MultiSelect textBackgroundBasic textBackground-DarkBlue " data-gjs-custom-name="grid_MultiSelect">
				<p class="item1_MS " data-gjs-custom-name="item1_MS_text_Question">Question Text</p>
				<container-enable-disable :visible="true" :enabled="true" id="itv7" class="item2_MS " data-gjs-custom-name="item2_MS_ED_ButtonsGrp">
					<div class="grid_T10 " data-gjs-custom-name="grid_T10_4ButtonRows">
						<div class="item1_T10 grid_T14 " data-gjs-custom-name="item1_T10_grid_T14_RowA">
							<widget-checkbox :visible="true" :enabled="true" id="ix83" :checked="false" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_A"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerA">Answer 1</p>
						</div>
						<div class="item2_T10 grid_T14 " data-gjs-custom-name="item2_T10_grid_T14_RowB">
							<widget-checkbox :visible="true" :enabled="true" :checked="false" id="iom4" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_B"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerB">Answer 2</p>
						</div>
						<div class="item3_T10 grid_T14 " data-gjs-custom-name="item3_T10_grid_T14_RowC">
							<widget-checkbox :visible="true" :enabled="true" :checked="false" id="iq6q" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_C"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerC">Answer 3</p>
						</div>
						<div class="item4_T10 grid_T14 " data-gjs-custom-name="item4_T10_grid_T14_RowD">
							<widget-checkbox :visible="true" :enabled="true" :checked="false" id="io5b" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_D"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerD">Answer 4</p>
						</div>
						<div class="grid_T14 item5_T10 " data-gjs-custom-name="item5_T10_grid_T14_RowE">
							<widget-checkbox :visible="true" :enabled="true" :checked="false" id="ivly" class="buttonCheck item1_T14 " data-gjs-custom-name="button_RadioCheck_E"></widget-checkbox>
							<p class="item2_T14_Answer colorWhite " data-gjs-custom-name="item2_T14_text_AnswerE">Answer 5</p>
						</div>
					</div>
				</container-enable-disable>
				<div class="Grid_SubmitExplanations item3_MS " data-gjs-custom-name="Grid_SubmitExplanations">
					<widget-button :visible="false" :enabled="true" id="inqe" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ix83',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iom4',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iq6q',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'io5b',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ivly',key:'checked',val:true}}],comparisonsLogic:'or',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'inqe',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'inqe',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]},{comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'inqe',key:'visible',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'imvm',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'inqe',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:null,key:'',val:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ix83',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iom4',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iq6q',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'io5b',key:'checked',val:true}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ivly',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'izcsh',key:'visible',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'itv7',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'unlockNextPage'},fireOnceID:'',delay:2}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'imvm',key:'visible',val:true},fireOnceID:'',delay:0}],responsesPass:[{rubricID:null,responseData:{responseType:'sharedData',sharedDataKey:null,descriptor:'numAttempts',numCorrectTotal:0},fireOnceID:''}],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'nestedComparisons',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ix83',key:'checked',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iom4',key:'checked',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iq6q',key:'checked',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'io5b',key:'checked',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ivly',key:'checked',val:false}}],comparisonsLogic:'or'}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:null,key:'',val:''}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ij4v',key:'visible',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'itv7',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'unlockNextPage'},fireOnceID:'',delay:2},{effectData:{effectType:'updateWidget',widgetID:'imvm',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ix83',key:'correctStyle',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iom4',key:'correctStyle',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iq6q',key:'correctStyle',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'io5b',key:'correctStyle',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ivly',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[{rubricID:null,responseData:{responseType:'widget',format:'html',headerPairs:[]},fireOnceID:''}],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ix83',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ix83',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ix83',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iom4',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iom4',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iom4',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'iq6q',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iq6q',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iq6q',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'io5b',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'io5b',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'io5b',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ivly',key:'checked',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ivly',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ivly',key:'correctStyle',val:true},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue buttonSubmit " data-gjs-custom-name="button_Submit">
						<p class="buttonBlinkBlue " data-gjs-custom-name="text_Submit">Submit</p>
					</widget-button>
					<container-show-hide :visible="false" id="ij4v" class="dropShadow textBackgroundBasic textBackground-Incorrect SH_Correct_Incorrect " data-gjs-custom-name="incorrect-show-hide1">
						<p class="colorBlack " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="Text">Incorrect.&nbsp;</strong>Explanation</p>
					</container-show-hide>
					<container-show-hide :visible="false" id="imvm" class="dropShadow textBackgroundBasic textBackground-Incorrect SH_Correct_Incorrect " data-gjs-custom-name="incorrect-show-hide2">
						<p class="colorBlack " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="Text">Incorrect.</strong> Try again.</p>
					</container-show-hide>
					<container-show-hide :visible="false" id="izcsh" class="dropShadow textBackgroundBasic textBackground-Correct SH_Correct_Incorrect " data-gjs-custom-name="correct-show-hide">
						<p class="colorBlack " data-gjs-custom-name="text_Correct"><strong class="" data-gjs-custom-name="Text">Correct!&nbsp;</strong>Explanation</p>
					</container-show-hide>
				</div>
			</div>
			<style>
			.grid_MultiSelect.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: min-content 1fr min-content;
				grid-column-gap: 2vh;
				grid-row-gap: 3vh;
			}
			
			.item1_MS.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2_MS.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			
			.item3_MS.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 3;
				grid-row-end: 4;
				margin: 0 -3.2vh -3.2vh -3.2vh;
			}
			
			.grid_T10.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
				grid-column-gap: 0vh;
				grid-row-gap: 1.5vh;
			}
			
			.item1_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			
			.item3_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 3;
				grid-row-end: 4;
			}
			
			.item4_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 4;
				grid-row-end: 5;
			}
			
			.item5_T10.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 5;
				grid-row-end: 6;
			}
			
			.grid_T14.$pageID$ {
				display: grid;
				grid-template-columns: min-content 1fr;
				grid-template-rows: 1fr;
				grid-column-gap: 1.5vh;
				width: 100%;
			}
			
			.item1_T14.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2_T14_Answer.$pageID$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 2;
				align-items: center;
				display: block;
			}
			
			.SH_Correct_Incorrect.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				border-radius: 0 0 1.3vh 1.3vh;
			}
			
			.Grid_SubmitExplanations.$pageID$ {
				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr;
			}
			
			.buttonSubmit.$pageID$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
				justify-self: start;
				margin: 0 0 3.2vh 3.2vh;
				align-self: start;
			}
			</style>
		`)
	});

	bm.add("assessment-wr1", {
		label: "<img src='./img/blocks/blockIcon_WR1.jpg'></img><br>WR1",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
		<div class="grid_WR1 " data-gjs-custom-name="grid_WR1">
			<p class=" item1_T24 text_Title" data-gjs-custom-name="item1_WR1_text_Title">Title
			</p>
			<p class=" item2_WR1" data-gjs-custom-name="item2_WR1_text_Question">Question
			</p>
			<widget-textarea :visible="true" :enabled="true" id="i8yh" placeholder="Type your answer here" class=" item3_WR1" data-gjs-custom-name="item3_WR1_text_WritingField">
			</widget-textarea>
			<div class="item4_WR1 " data-gjs-custom-name="item4_WR1_Submit">
				<widget-button :visible="false" :enabled="true" id="i7el" :conditions="{conditionList:[{comparisons:[{comparisonData:{comparisonType:'textLength',textID:'i8yh'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i7el',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'i7el',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i8yh',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i7el',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey  buttonBlinkBlue" data-gjs-custom-name="button_Submit">
					<p class="marginLeft2 marginRight2 buttonBlinkBlue" data-gjs-custom-name="text_Submit">Submit
					</p>
				</widget-button>
			</div>
		</div>
		<style>
		.grid_WR1.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:min-content min-content 3fr 1.5fr;
			grid-column-gap:0vh;
			grid-row-gap:1.5vh;
		}
		.item1_WR1.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_WR1.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_WR1.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		.item4_WR1.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:4;
			grid-row-end:span 1;
			min-height:4.5vh;
			padding-top:0.7vh;
		}

		</style>`)
	});

	bm.add("d-n-d-x3", {
		label: "<img src='./img/blocks/blockIcon_WR1.jpg'></img><br>Drag n Drop x3",
		category: "Cluster: Assessments",
		attributes: {
			class: "imgIcon"
		},
		content: AddPageIDToString(`
		<div class="grid_DD" data-gjs-custom-name="grid_DD">
			<div class="item1_DD" data-gjs-custom-name="item1_DD">
				<p class="" data-gjs-custom-name="text_1">Body text</p>
				<div class=" grid_Drags" data-gjs-custom-name="grid_Drags">
					<div class=" div_Drag1" data-gjs-custom-name="div_Drag1">
						<div class=" div_StartingDropText noSelect" data-gjs-custom-name="div_StartingDropText">
							<p class=" text_DragNumbers" data-gjs-custom-name="text_DragNumbers">1</p>
						</div>
						<widget-drop :visible="true" :enabled="true" :max-children="1" overflow-style="reset-child" id="ikal" class=" startingDrop_Appearance" data-gjs-custom-name="startingDrop_1"></widget-drop>
						<widget-drag :visible="true" :enabled="true" id="ihwg" :child-index="0" drop-id="ikal" class=" drag_Appearance dragButtons_Appearance" data-gjs-custom-name="drag_1">
							<div class=" div_DragFiller" data-gjs-custom-name="div_DragFiller">
								<p class=" text_DragNumbers" data-gjs-custom-name="text_DragNumbers">1</p>
							</div>
						</widget-drag>
					</div>
					<div class=" div_Drag2" data-gjs-custom-name="div_Drag2">
						<div class=" div_StartingDropText noSelect" data-gjs-custom-name="div_DropText">
							<p class=" text_DragNumbers" data-gjs-custom-name="text_DragNumbers">2</p>
						</div>
						<widget-drop :visible="true" :enabled="true" :max-children="1" overflow-style="reset-child" id="ik9n2" class=" startingDrop_Appearance" data-gjs-custom-name="startingDrop_2"></widget-drop>
						<widget-drag :visible="true" :enabled="true" :child-index="0" id="i44wg" drop-id="ik9n2" class=" drag_Appearance dragButtons_Appearance" data-gjs-custom-name="drag_2">
							<div class=" div_DragFiller" data-gjs-custom-name="div_DragFiller">
								<p class=" text_DragNumbers" data-gjs-custom-name="text_DragNumbers">2</p>
							</div>
						</widget-drag>
					</div>
					<div class=" div_Drag3" data-gjs-custom-name="div_Drag3">
						<div class=" div_StartingDropText noSelect" data-gjs-custom-name="div_DropText">
							<p class=" text_DragNumbers" data-gjs-custom-name="text_DragNumbers">3</p>
						</div>
						<widget-drop :visible="true" :enabled="true" :max-children="1" overflow-style="reset-child" id="il06x" class=" startingDrop_Appearance" data-gjs-custom-name="startingDrop_3"></widget-drop>
						<widget-drag :visible="true" :enabled="true" :child-index="0" id="ieker" drop-id="il06x" class=" drag_Appearance dragButtons_Appearance" data-gjs-custom-name="drag_3">
							<div class=" div_DragFiller" data-gjs-custom-name="div_DragFiller">
								<p class=" text_DragNumbers" data-gjs-custom-name="text_DragNumbers">3</p>
							</div>
						</widget-drag>
					</div>
					<container-show-hide :visible="true" :enabled="true" id="ipri" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ihwg',key:'enabled',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i44wg',key:'enabled',val:false}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ieker',key:'enabled',val:false}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ipri',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class=" SH_Submit" data-gjs-custom-name="SH_Submit">
						<widget-button :visible="false" :enabled="true" id="i873" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'dropsHaveDrags',dropIDs:['izy6','i3ngs','iwqau']}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i873',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'i873',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i873',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:null,key:'',val:''},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ihwg',key:'dropId',val:'izy6'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ihwg',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ikal',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'izy6',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'addClasses',widgetID:'ihwg',classes:'dragButtons_Correct'},fireOnceID:'',delay:0},{effectData:{effectType:'incrementSharedData',sharedDataKey:null,incrementValue:1},fireOnceID:'drag1_Correct_Increment_',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'ihwg',key:'dropId',val:'ikal'},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i44wg',key:'dropId',val:'iwqau'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i44wg',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ik9n2',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'iwqau',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'addClasses',widgetID:'i44wg',classes:'dragButtons_Correct'},fireOnceID:'',delay:0},{effectData:{effectType:'incrementSharedData',sharedDataKey:null,incrementValue:1},fireOnceID:'drag2_Correct_Increment_',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'i44wg',key:'dropId',val:'ik9n2'},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ieker',key:'dropId',val:'i3ngs'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ieker',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'il06x',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i3ngs',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'addClasses',widgetID:'ieker',classes:'dragButtons_Correct'},fireOnceID:'',delay:0},{effectData:{effectType:'incrementSharedData',sharedDataKey:null,incrementValue:1},fireOnceID:'drag3_Correct_Increment_',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'ieker',key:'dropId',val:'il06x'},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ihwg',key:'dropId',val:'izy6'}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i44wg',key:'dropId',val:'iwqau'}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ieker',key:'dropId',val:'i3ngs'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iv1f',key:'visible',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'unlockNextPage'},fireOnceID:'',delay:2},{effectData:{effectType:'addClasses',widgetID:'ihwg',classes:'dragButtons_Correct'},fireOnceID:'',delay:0},{effectData:{effectType:'addClasses',widgetID:'i44wg',classes:'dragButtons_Correct'},fireOnceID:'',delay:0},{effectData:{effectType:'addClasses',widgetID:'ieker',classes:'dragButtons_Correct'},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'i8xv',key:'visible',val:true},fireOnceID:'',delay:0}],responsesPass:[{rubricID:null,responseData:{responseType:'widget',format:'html',headerPairs:[]},fireOnceID:''}],responsesFail:[]}]}" class="buttonBasic-Grey buttonBlinkBlue button_Submit" data-gjs-custom-name="button_Submit">
							<p class="" data-gjs-custom-name="text_Submit">Submit</p>
						</widget-button>
						<widget-button :visible="false" :enabled="true" id="if1sp" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'nestedComparisons',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'notEquals',widgetID:'ihwg',key:'dropId',val:'ikal'}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ihwg',key:'enabled',val:true}}],comparisonsLogic:'and'}},{comparisonData:{comparisonType:'nestedComparisons',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'notEquals',widgetID:'i44wg',key:'dropId',val:'ik9n2'}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i44wg',key:'enabled',val:true}}],comparisonsLogic:'and'}},{comparisonData:{comparisonType:'nestedComparisons',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'notEquals',widgetID:'ieker',key:'dropId',val:'il06x'}},{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ieker',key:'enabled',val:true}}],comparisonsLogic:'and'}}],comparisonsLogic:'or',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'if1sp',key:'visible',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i8xv',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'if1sp',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'if1sp',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i873',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i8xv',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ihwg',key:'enabled',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ihwg',key:'dropId',val:'ikal'},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'i44wg',key:'enabled',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'i44wg',key:'dropId',val:'ik9n2'},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]},{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'widgetVal',comparison:'equals',widgetID:'ieker',key:'enabled',val:true}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ieker',key:'dropId',val:'il06x'},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey button_Reset" data-gjs-custom-name="button_Reset">
							<p class="" data-gjs-custom-name="text Reset">Reset</p>
						</widget-button>
					</container-show-hide>
					<container-show-hide :visible="false" id="i8xv" class=" SH_CorrectIncorrect" data-gjs-custom-name="SH_Incorrect">
						<p class="dropShadow textBackgroundBasic colorBlack textBackground-Incorrect" data-gjs-custom-name="text_Correct">
							<widget-shared-data-text :visible="true" id="i4ej" shared-data-read-key="c26_NumberCorrect" text="0" class=" SD_NumberCorrect" data-gjs-custom-name="SD_NumberCorrect"></widget-shared-data-text><b data-gjs-custom-name="text_Correct"> out of 3 correct!</b> Try again.
						</p>
					</container-show-hide>
					<container-show-hide :visible="false" id="iv1f" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'sharedDataVal',sharedDataKey:'c26_NumberCorrect',comparison:'equals',val:3}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'iv1f',key:'visible',val:true},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i8xv',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class=" SH_CorrectIncorrect" data-gjs-custom-name="SH_Correct">
						<p class="dropShadow textBackgroundBasic textBackground-Correct colorBlack" data-gjs-custom-name="text_Correct"><b data-gjs-custom-name="Text">3 out of 3 correct!</b></p>
					</container-show-hide>
				</div>
			</div>
			<div class=" item2_DD" data-gjs-custom-name="item2_DD">
				<widget-drop :visible="true" :enabled="true" :max-children="1" overflow-style="reset-child" id="izy6" class=" drop_Appearance drop_1" data-gjs-custom-name="drop_1">
					<container-show-hide :visible="true" id="il79" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'dropsHaveDrags',dropIDs:['izy6']}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'il79',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'il79',key:'visible',val:true},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}]}" class=" SH_DropHere" data-gjs-custom-name="SH_DropHere1">
						<p class=" textCenter text_DropHere" data-gjs-custom-name="text_DropHere">Drop<br data-gjs-custom-name="Br">​​​​​​​Here<br data-gjs-custom-name="Br"></p>
					</container-show-hide>
				</widget-drop>
				<widget-drop :visible="true" :enabled="true" :max-children="1" overflow-style="reset-child" id="iwqau" class=" drop_Appearance drop_2" data-gjs-custom-name="drop_2">
					<container-show-hide :visible="true" id="ij07p" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'dropsHaveDrags',dropIDs:['iwqau']}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ij07p',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'ij07p',key:'visible',val:true},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}]}" class=" SH_DropHere" data-gjs-custom-name="SH_DropHere3">
						<p class=" textCenter text_DropHere" data-gjs-custom-name="text_DropHere">Drop<br data-gjs-custom-name="Br">​​​​​​​Here<br data-gjs-custom-name="Br"></p>
					</container-show-hide>
				</widget-drop>
				<widget-drop :visible="true" :enabled="true" :max-children="1" overflow-style="reset-child" id="i3ngs" class=" drop_Appearance drop_3" data-gjs-custom-name="drop_3">
					<container-show-hide :visible="true" id="ihnyd" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'dropsHaveDrags',dropIDs:['i3ngs']}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ihnyd',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'ihnyd',key:'visible',val:true},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}]}" class=" SH_DropHere" data-gjs-custom-name="SH_DropHere2">
						<p class=" textCenter text_DropHere" data-gjs-custom-name="text_DropHere">Drop<br data-gjs-custom-name="Br">​​​​​​​Here<br data-gjs-custom-name="Br"></p>
					</container-show-hide>
				</widget-drop>
			</div>
		</div>
		<style>
		.grid_DD.$pageID$ {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: min-content 1fr;
			width: 100%;
			height: 100%;
			padding: 6vh;
		}

		.item1_DD.$pageID$ {
			grid-column-start: 1;
			grid-column-end: span 1;
			grid-row-start: 1;
			grid-row-end: 2;
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: min-content 1fr;
			grid-row-gap: 3vh;
		}

		.item2_DD.$pageID$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 2;
			grid-row-end: 3;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: 1fr;
		}

		.grid_Drags.$pageID$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 2;
			grid-row-end: 3;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: min-content 7vh 10vh;
			grid-column-gap: 3vh;
			grid-row-gap: 3vh;
		}

		.drag_Appearance.$pageID$ {
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

		.startingDrop_Appearance.$pageID$ {
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

		.drop_Appearance.$pageID$ {
			border-radius: 1.3vh;
			border: 0.6vh solid var(--color-grey2);
			background-color: var(--color-white);
			width: 16vh;
			height: 10vh;
			padding: 0 0 0 0;
		}

		.div_Drag1.$pageID$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 2;
			justify-self: center;
			align-self: center;
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;
		}

		.div_Drag2.$pageID$ {
			grid-column-start: 2;
			grid-column-end: 3;
			grid-row-start: 1;
			grid-row-end: 2;
			justify-self: center;
			align-self: center;
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;
		}

		.div_Drag3.$pageID$ {
			grid-column-start: 3;
			grid-column-end: 4;
			grid-row-start: 1;
			grid-row-end: 2;
			justify-self: center;
			align-self: center;
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;
		}

		.div_DragFiller.$pageID$ {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;
			width: 15vh;
			height: 10vh;
			color: black;
		}

		.drop_1.$pageID$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 2;
			justify-self: center;
			align-self: center;
		}

		.drop_2.$pageID$ {
			grid-column-start: 2;
			grid-column-end: 3;
			grid-row-start: 1;
			grid-row-end: 2;
			justify-self: center;
			align-self: center;
		}

		.drop_3.$pageID$ {
			grid-column-start: 3;
			grid-column-end: 4;
			grid-row-start: 1;
			grid-row-end: 2;
			justify-self: center;
			align-self: center;
		}

		.text_DragNumbers.$pageID$ {
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

		.text_DropHere.$pageID$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 2;
			justify-self: center;
			align-self: center;
			color: #999999;
		}

		.SH_DropHere.$pageID$ {
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

		.div_StartingDropText.$pageID$ {
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

		.SH_Submit.$pageID$ {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr;
			grid-column-start: 1;
			grid-column-end: 4;
			grid-row-start: 2;
			grid-row-end: 3;
			grid-column-gap: 4vh;
		}

		.button_Submit.$pageID$ {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 2;
			align-self: center;
			justify-self: end;
		}

		.button_Reset.$pageID$ {
			grid-column-start: 2;
			grid-column-end: 3;
			grid-row-start: 1;
			grid-row-end: 2;
			align-self: center;
			justify-self: start;
		}

		.SH_CorrectIncorrect.$pageID$ {
			grid-column-start: 1;
			grid-column-end: 4;
			grid-row-start: 3;
			grid-row-end: 4;
			align-self: center;
		}

		.SD_NumberCorrect.$pageID$ {
			font-weight: 700;
		}
		</style>`)
	});
};
