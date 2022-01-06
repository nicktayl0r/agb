<template>
	<span v-if="!notGrapes" :id="id" :class="AddRemoveClasses" v-show="visibleStore" @click.native="clicked" :href='href' :title='tooltip'>
		<span :class="isExternalLink ? 'grapesExternalLinkRender' : 'internalLink'">
			<span>
				<slot />
			</span>
			<span class="grapesLinkTextRender noSelect">
				<span v-if="text" v-html="text"></span>
			</span>
		</span>
	</span>
	<a v-else-if="isExternalLink" :id="id" :class="AddRemoveClasses" v-show="visibleStore" @click="clicked" :href='href' :target='target' :title='tooltip'>
		<slot /><span v-if="text" v-html="text"></span>
	</a>
	<router-link v-else class="internalLink" :id="id" :class="AddRemoveClasses" v-show="visibleStore" @click.native="clicked" :to='to' :title='tooltip'>
		<slot /><span v-if="text" v-html="text"></span>
	</router-link>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";

import Widget from "@/components/Widget";
import { modules } from "@/data models/projectModels";
import { logMessage } from "@/helpers/debugHelpers";
import {
  glossaryShowHide,
  runWidgetEventConditions
} from "@/helpers/widgetHelpers";
import WidgetClickable from "@/mixins/WidgetClickable";
import { commitSetModuleCurrentPage } from "@/store/modules/userData";

export interface ExternalLinkOptions {
	type: "external";
	href: string;
	target: string;
}

export interface InternalLinkOptions {
	type: "internal";
	module: modules;
	pageId: string;
}

@Component({ mixins: [WidgetClickable] })
export default class WidgetLink extends Widget {
	@Prop()
	text: string;

	@Prop()
	tooltip: string;

	@Prop()
	options: ExternalLinkOptions | InternalLinkOptions; //we can pass in more JSON options

	get href() {
	  if (this.options && this.options.type === "external" && this.options.href) return this.options.href;
	  return "";
	}

	get target() {
	  if (this.options && this.options.type === "external" && this.options.target) return this.options.target;
	  return "_blank";
	}

	get to() {
	  if (
	    this.options
			&& this.options.type === "internal"
			&& this.options.module !== "glossary"
	  ) {
	    return `/pages/${this.options.pageId}`;
	  }
	  return "";
	}

	get isExternalLink() {
	  return this.options && this.options.type === "external";
	}

	clicked() {
	  if (!this.$store || !this.notGrapes) return;

	  logMessage(this.$props.id, "clicked");

	  runWidgetEventConditions(this, this.$props.clickEffects, this.$props.id);

	  if (
	    this.options
			&& this.options.type === "internal"
			&& this.options.module === "glossary"
	  ) {
	    commitSetModuleCurrentPage(this.$store, {
	      moduleName: "glossary",
	      pageID: this.options.pageId
	    });
	    glossaryShowHide(true);
	  }
	}
}
</script>

<style>
.internalLink {
	color: var(--color-orange5);
	font-weight: bold;
	text-decoration: none;
}
.internalLink:visited {
	color: var(--color-orange5);
}
.internalLink:hover {
	color: var(--color-orange5);
}
.internalLink-underlined {
	text-decoration: underline;
}

/* Regular <a> tag links  */
a,
.grapesExternalLinkRender {
	color: var(--color-blue5);
	text-decoration: underline;
	z-index: 2;
}
a:hover,
.grapesExternalLinkRender:hover {
	color: var(--color-blue3);
}
a:visited {
	color: var(--color-purple4);
}

.grapesLinkTextRender {
	pointer-events: none !important;
}
</style>