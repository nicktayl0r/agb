import grapesjs from "grapesjs";

import { AddPageIDToString } from "../blocks";

export {container_enable_disable, container_show_hide, image_widget, svg_widget};

let container_enable_disable = "<container-enable-disable/>";
let container_show_hide ="<container-show-hide/>";
let arrow_widget = "<widget-arrow/>";
let link_widget ="<widget-link/>"
let anchor_widget ="<widget-anchor/>"
let image_widget = "<widget-image data-gjs-custom-name=\"image\" src=\"/img/placeholders/placeholderImg.png\"></widget-image>"
let svg_widget ="<widget-svg/>"
let svg_group_widget ="<widget-svg-group/>"


export default (bm: grapesjs.BlockManagerInstance, config) => {
	bm.add("container-show-hide", {
		label: "container show/hide",
		category: "Widget",
		attributes: { class: "fa fa-eye" },
		content: container_show_hide
	});

	bm.add("container-enable-disable", {
		label: "container enable/disable",
		category: "Widget",
		attributes: { class: "fa fa-ban" },
		content: container_enable_disable
	});

	bm.add("button", {
		label: "button",
		category: "Widget",
		attributes: { class: "fa fa-square" },
		content: "<widget-button><span>click here</span></widget-button>"
	});

	bm.add("image", {
		label: "image",
		category: "Widget",
		attributes: { class: "fa fa-picture-o" },
		content: image_widget
	});

	bm.add("svg", {
		label: "svg",
		category: "Widget",
		attributes: { class: "fa fa-picture-o" },
		content: svg_widget
	});

	bm.add("svg-group", {
		label: "svg group",
		category: "Widget",
		attributes: { class: "fa fa-picture-o" },
		content: svg_group_widget
	});

	bm.add("textbox", {
		label: "widget_TextInput_SingleLine",
		category: "Widget",
		attributes: { class: "fa fa-square-o" },
		content:
			"<widget-textbox data-gjs-custom-name='widget_TextInput_SingleLine'/>"
	});

	bm.add("textarea", {
		label: "widget_TextInput_MultiLine",
		category: "Widget",
		attributes: { class: "fa fa-plus-square-o" },
		content:
			"<widget-textarea data-gjs-custom-name='widget_TextInput_MultiLine'/>"
	});

	bm.add("checkbox", {
		label: "checkbox",
		category: "Widget",
		attributes: { class: "fa fa-check-square-o" },
		content: "<widget-checkbox/>"
	});

	bm.add("radio", {
		label: "radio",
		category: "Widget",
		attributes: { class: "fa fa-dot-circle-o" },
		content: "<widget-radio/>"
	});

	bm.add("drag", {
		label: "drag",
		category: "Widget",
		attributes: { class: "fa fa-arrows-alt" },
		content: "<widget-drag></widget-drag>"
	});

	bm.add("drop", {
		label: "drop",
		category: "Widget",
		attributes: { class: "fa fa-caret-square-o-down" },
		content: AddPageIDToString(`
		<widget-drop class="drop_ButtonBasic-Grey_Light"></widget-drop>
		`)
	});

	bm.add("arrow", {
		label: "arrow",
		category: "Widget",
		attributes: { class: "fa fa-long-arrow-down" },
		content: arrow_widget
	});

	bm.add("link", {
		label: "link",
		category: "Widget",
		attributes: { class: "fa fa-link" },
		content: link_widget
	});

	bm.add("anchor", {
		label: "anchor",
		category: "Widget",
		attributes: { class: "fa fa-anchor" },
		content: anchor_widget
	});

	bm.add("slider", {
		label: "widget_Slider",
		category: "Widget",
		attributes: { class: "fa fa-sliders" },
		content: "<widget-slider/ data-gjs-custom-name='widget_Slider'>"
	});

	bm.add("animated svg", {
		label: "animated svg",
		category: "Widget",
		attributes: { class: "fa fa-play" },
		content:
			"<widget-animated-svg src='/img/placeholders/placeholderAnimatedSVG.json'></widget-animated-svg>"
	});

	bm.add("simWidget", {
		label: "simWidget",
		category: "Widget",
		attributes: { class: "fa fa-globe" },
		content: `
			<widget-sim-view id="s082b" scenename="setScene" simstateid="setID" :visible="true" :enabled="true" class="simPreview" data-gjs-custom-name="Widget-sim-view">
		  `
	});

	bm.add("turntable", {
		label: "turntable",
		category: "Widget",
		attributes: { class: "fa fa-arrows-h" },
		content: `
		<widget-turntable :visible="true" id="turntable" scenename="turntable" simstateid="1234" :rotate-h="true" :rotate-v="true"></widget-turntable>
		  `
	});

	bm.add("videoWidget", {
		label: "videoWidget",
		category: "Widget",
		attributes: { class: "fa fa-video-camera" },
		content: `
		<widget-video-player id="videoWidget" class="videoFill"></widget-video-player>
		  `
	});

	bm.add("transparentVideoWidget", {
		label: "transparentVideoWidget",
		category: "Widget",
		attributes: { class: "fa fa-video-camera" },
		content: `
		<widget-transparent-video id="transparentVideoWidget"
		class="videoFill" ></widget-transparent-video>
		  `
	});

	bm.add("stopwatchWidget", {
		label: "stopwatchWidget",
		category: "Widget",
		attributes: { class: "fa fa-clock-o" },
		content: `
		<widget-stopwatch id="stopwatch" />
		  `
	});

	bm.add("codonWheelWidget", {
		label: "codonWheelWidget",
		category: "Widget",
		attributes: { class: "fa fa-circle" },
		content: AddPageIDToString(`
		<widget-codon-wheel id="codon" codon-code="" class="codonWheel" />
		<style>
		  .codonWheel.$$pageID$$ {
			height: 50vh;
			width: 50vh;
		  }
		</style>
		  `)
	});
};
