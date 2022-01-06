<template>
  <div :id="id" v-show="visibleStore" :class="['container', AddRemoveClasses]"><slot/></div>
</template>

<style>
.container {
  width: 100%;
}
</style>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Widget from "./Widget";

@Component
export default class ContainerShowHide extends Widget {}
</script>
