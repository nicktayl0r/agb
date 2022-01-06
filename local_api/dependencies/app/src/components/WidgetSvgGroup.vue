<template>
	<g :id="id" v-show="visibleStore" :disabled="disabled" class="svgParent" :class="AddRemoveClasses" @click="clicked">
		<slot />
	</g>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Widget from "./Widget";
import WidgetEnabled from "../mixins/WidgetEnabled";
import WidgetClickable from "../mixins/WidgetClickable";

@Component({ mixins: [WidgetEnabled, WidgetClickable] })
export default class WidgetSvgGroup extends Widget {}
</script>

<style>
.svgParent {
	cursor: pointer;
}
.svgParent[disabled="disabled"] {
	cursor: not-allowed;
}
</style>