import grapesjs from "grapesjs";

import { AddPageIDToString } from "../blocks";

import {container_enable_disable, container_show_hide, image_widget, svg_widget} from "./widgets";

export default (bm: grapesjs.BlockManagerInstance, config) => {

	bm.add("container-show-hide-basic", {
		label: "container show/hide",
		category: "Basic",
		attributes: { class: "fa fa-eye" },
		content: container_show_hide
	});

	bm.add("container-enable-disable-basic", {
		label: "container enable/disable",
		category: "Basic",
		attributes: { class: "fa fa-ban" },
		content: container_enable_disable
	});

	bm.add("glossary-link", {
		label: "Glossary Link",
		category: "Basic",
		content: `<widget-link data-gjs-custom-name="link" :options="{type:'internal', module:'glossary', pageId:''}" text="link_text"></widget-link>`,
		attributes: {
			class: "fa fa-link fa-link-gl"
		}
	});

	bm.add("external-link", {
		label: "External Link",
		category: "Basic",
		content: `<widget-link data-gjs-custom-name="external-link" :options="{type:'external',href:'http://explorelearning.com',target:'_blank'}" text="link_text"></widget-link>`,
		attributes: {
			class: "fa fa-link fa-link-ex"
		}
	});

	bm.add("image-basic", {
		label: "Image",
		category: "Basic",
		attributes: { class: "fa fa-picture-o" },
		content: image_widget
	});

	bm.add("svg-basic", {
		label: "SVG Widget",
		category: "Basic",
		attributes: { class: "fa fa-picture-o" },
		content: svg_widget
	});
};
