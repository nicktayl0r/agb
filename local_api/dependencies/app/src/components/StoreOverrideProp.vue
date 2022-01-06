<template>
  <div>{{ textStoreOverrideProp }}</div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Widget from "./Widget";
import { logMessage } from "@/helpers/debugHelpers";

@Component
export default class StoreOverrideProp extends Widget {
  @Prop() text: string;

  @Prop() readFromID: string;

  get textStoreOverrideProp() {
    let readFrom = this.readFromID;
    if (readFrom === undefined) readFrom = this.id;

    //logMessage(readFrom);

    const val = this.propStoreOverrideID(readFrom, "text");

    if (val === this.text) return val;

    return `this text is from the store ${val}`;
  }
}
</script>