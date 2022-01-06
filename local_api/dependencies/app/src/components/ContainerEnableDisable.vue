<template>
  <fieldset :id="id" v-show="visibleStore" :disabled="disabled" :class="[ 'no-border', AddRemoveClasses]" ><slot/></fieldset>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Widget from "./Widget";
import WidgetEnabled from "../mixins/WidgetEnabled";

@Component({ mixins: [WidgetEnabled] })
export default class ContainerEnableDisable extends Widget {}
</script>
