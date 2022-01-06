import grapesjs from "grapesjs";

import { AddPageIDToString } from "../blocks";

export default (bm: grapesjs.BlockManagerInstance, config) => {
  bm.add("button-zoom-anchor", {
    attributes: {
      class: "fa template zoom",
    },
    label: "anchor_Button_Zoom",
    category: "Buttons: Misc",
    content: AddPageIDToString(`
		<widget-anchor :visible="true" id="anchor" class="button-zoom-anchor" data-gjs-custom-name="anchor_Button_Zoom">
			<widget-button class='buttonZoom' data-gjs-custom-name='button_Zoom'></widget-button>
		</widget-anchor>
		<style>
			.button-zoom-anchor.$$pageID$$ {
				z-index:2;
			}
		</style>`),
  });
  bm.add("rect-v-visual-text", {
    label:
      "<img src='./img/blocks/blockIcon_radioVImageText.jpg'></img><br>button_Radio_V_Image+Text",
    attributes: {
      class: "imgIcon",
    },
    category: "Buttons: Radio",
    content: AddPageIDToString(`
		<widget-radio :visible="true" :enabled="true" id="ig4c" class="buttonRadio Variation" data-gjs-custom-name="button_Radio_V_Image+Text">
  			<img src="/img/placeholders/placeholderImg.png" class="rect-v-visual" data-gjs-custom-name="image">
  			<p class="rect-v-visual-text" data-gjs-custom-name="text">Text</p>
		</widget-radio>
		<style>
		.rect-v-visual.$$pageID$$ {
			width:6em;
			height:6em;
			margin:0;
		}
		.rect-v-visual-text.$$pageID$$ {
			line-height:1em;
			padding:0;
			margin:0;
		}
		</style>`),
  });
  bm.add("rect-v-visual-only", {
    label:
      "<img src='./img/blocks/blockIcon_radioVImage.jpg'></img><br>button_Radio_V_Image",
    attributes: {
      class: "imgIcon",
    },
    category: "Buttons: Radio",
    content: AddPageIDToString(`
		<widget-radio :visible="true" :enabled="true" id="iqhgo" class="buttonRadio Variation" data-gjs-custom-name="button_Radio_V_Image">
			<img src="/img/placeholders/placeholderImg.png" class="rect-v-visual-only" data-gjs-custom-name="image">
		</widget-radio>
		<style>
		.rect-v-visual-only.$$pageID$$ {
			width:6em;
			height:8em;
			margin:0;
		}
		</style>`),
  });
  bm.add("rect-h-visual-text", {
    label:
      "<img src='./img/blocks/blockIcon_radioHImageText.jpg'></img><br>button_Radio_H_Image+Text",
    attributes: {
      class: "imgIcon",
    },
    category: "Buttons: Radio",
    content: AddPageIDToString(`
		<widget-radio :visible="true" :enabled="true" id="ibpo1" class="buttonRadio Variation slotHorizontal" data-gjs-custom-name="button_Radio_H_Image+Text">
			<img src="/img/placeholders/placeholderImg.png" class="rect-h-visual" data-gjs-custom-name="image">
			<p data-gjs-custom-name="text">Text</p>
		</widget-radio>
		<style>
		.rect-h-visual.$$pageID$$ {
			width:6em;
			height:4em;
			margin:0;
			display:inline;
			line-height:1em;
		}
		</style>`),
  });
  bm.add("rect-h-visual-only", {
    label:
      "<img src='./img/blocks/blockIcon_radioHImage.jpg'></img><br>button_Radio_H_Image",
    attributes: {
      class: "imgIcon",
    },
    category: "Buttons: Radio",
    content: AddPageIDToString(`
		<widget-radio :visible="true" :enabled="true" id="itiz1" class="buttonRadio Variation" data-gjs-custom-name="button_Radio_H_Image">
			<img src="/img/placeholders/placeholderImg.png" class="rect-h-visual-only" data-gjs-custom-name="image">
		</widget-radio>
		<style>
		.rect-h-visual-only.$$pageID$$ {
			width:8em;
			height:4em;
			margin:0;
		}
		</style>`),
  });
  bm.add("radio-complete-3", {
    label:
      "<img src='./img/blocks/blockIcon_radioComplete3.jpg'></img><br>button_RadioComplete3",
    attributes: {
      class: "imgIcon",
    },
    category: "Buttons: Misc",
    content: AddPageIDToString(`
		<widget-radio id="i2ti" :visible="true" :enabled="true" class="buttonRadio-Complete3 " data-gjs-custom-name="buttonRadio-Complete3">
			<div class="radioInComplete3_Text " data-gjs-custom-name="div_Text">
			<p class="colorWhite textCenter radioInComplete3_buttonText " data-gjs-custom-name="Text">60 : 10</p>
			</div>
			<div class="checkParent" data-gjs-custom-name="Box">
				<span class="radioInComplete3_box_Check  inclBox_1" data-gjs-custom-name="div_Check">
				<span class="stepNumber" data-gjs-custom-name="1">1</span>
				<img src="../../../dependencies/app/dist/assets/iconCheck_Normal.svg" :visible="true" class="radioInComplete3_image_Check radioInComplete3_check " data-gjs-custom-name="image_CheckHoverDepressed"></span>
				<span class="radioInComplete3_box_Check  inclBox_2" data-gjs-custom-name="div_Check"><span class="stepNumber" data-gjs-custom-name="2">2</span>
				<img src="../../../dependencies/app/dist/assets/iconCheck_Normal.svg" :visible="true" class="radioInComplete3_image_Check radioInComplete3_check " data-gjs-custom-name="image_CheckHoverDepressed"></span>
				<span class="radioInComplete3_box_Check  inclBox_3" data-gjs-custom-name="div_Check"><span class="stepNumber" data-gjs-custom-name="3">3</span>
				<img src="../../../dependencies/app/dist/assets/iconCheck_Normal.svg" :visible="true" class="radioInComplete3_image_Check radioInComplete3_check " data-gjs-custom-name="image_CheckHoverDepressed"></span>
			</div>
		</widget-radio>
		<style></style>
		`),
  });

  bm.add("button-basic-inv-sq", {
    label:
      "<img src='./img/blocks/blockIcon_Button_Blink_Square.png'></img><br>button_Basic_Invisible_Square",
    attributes: {
      class: "imgIcon",
    },
    category: "Buttons: Basic",
    content: AddPageIDToString(
      `<widget-button class='buttonBasic_Invisible noPadding buttonBlinkBlue' data-gjs-custom-name='button_Invisible_Square'><div class='buttonFillSq' data-gjs-custom-name='buttonFill'></div></widget-button><style>.buttonFillSq.$$pageID$$ {width:10vh; height:10vh;}</style>`
    ),
  });
  bm.add("button-basic-inv-cir", {
    label:
      "<img src='./img/blocks/blockIcon_Button_Blink_Circle.png'></img><br>button_Basic_Invisible_Circle",
    attributes: {
      class: "imgIcon",
    },
    category: "Buttons: Basic",
    content: AddPageIDToString(
      `<widget-button class='buttonBasic_Invisible circle buttonBlinkBlue' data-gjs-custom-name='button_Invisible_Circle'><div class='buttonFillCir' data-gjs-custom-name='buttonFill'></div></widget-button><style>.buttonFillCir.$$pageID$$ {width:10vh; height:10vh;}</style>`
    ),
  });
  bm.add("button-basic-image", {
    label:
      "<img src='./img/blocks/blockIcon_Button_Blink_Image.png'></img><br>button_Basic_Image_Blink",
    attributes: {
      class: "imgIcon",
    },
    category: "Buttons: Basic",
    content: AddPageIDToString(
      `<widget-button class='buttonBasic_Image' data-gjs-custom-name='buttonBasicImage'><widget-image class='buttonImage' data-gjs-custom-name='button_Image'></widget-image></widget-button><style>.buttonImage.$$pageID$$ {width:10vh; height:10vh;}</style>`
    ),
  });
  bm.add("button-checkbox-image", {
    label:
      "<img src='./img/blocks/blockIcon_buttonRadio.jpg'></img><br>Checkbox + Image",
    attributes: {
      class: "imgIcon",
    },
    category: "Buttons: Checkbox",
    content: AddPageIDToString(
      `<widget-checkbox :visible="true" :enabled="true" id="ieog" :checked="false" class="checkboxEmpty" data-gjs-custom-name="checkbox_wImage"><div class=" div_Checkbox" data-gjs-custom-name="div_CheckboxFiller_Image"></div></widget-checkbox><style>.checkboxEmpty.$$pageID$$ {width:auto;height:auto;}.div_Checkbox.$$pageID$$ {width:20vh;height:20vh;background-image:none;background-repeat:no-repeat;background-attachment:local;background-position:center center;background-size:contain;}</style>`
    ),
  });
};
