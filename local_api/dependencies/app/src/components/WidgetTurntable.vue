<template>
	<div :id="id" v-show="visibleStore" :scenename="scenename" :simstateid="simStateIDStore" :play-state="playStateStore" :rotate-h="rotateH_store" :rotate-v="rotateV_store">
		<loading-bar v-show="getShowProgressBar" ref="loadingBar" />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { LoadingBar } from "@/helpers/asyncHelpers";
import WidgetSimView from "./WidgetSimView.vue";
import { logMessage } from "@/helpers/debugHelpers";
import { getSimManager } from "@/helpers/simHelpers";

@Component({ components: { LoadingBar } })
export default class WidgetTurntable extends WidgetSimView {
	@Prop({ default: true })
	rotateH: boolean;

	@Prop({ default: true })
	rotateV: boolean;

	get rotateH_store() {
		const rH = this.propStoreOverride("rotateH") as boolean;
		// logMessage("WidgetTurntable rotateH= ", rH);
		//send message to pc to update turntables.
		getSimManager().ApplyChanges(this.scenename, {
			scripts: { turntable: { rotateY: rH } },
		});
		return rH;
	}

	get rotateV_store() {
		const rV = this.propStoreOverride("rotateV") as boolean;
		// logMessage("WidgetTurntable rotatev= ", rV);
		//send message to pc to update turntables.
		getSimManager().ApplyChanges(this.scenename, {
			scripts: { turntable: { rotateX: rV } },
		});
		return rV;
	}

	OnSimStateRequest(sceneName: string, stateID: string) {
		// logMessage("TURNTABLE OnSimStateRequest: ", sceneName);
		getSimManager().ApplyChanges(this.scenename, {
			scripts: {
				turntable: { rotateX: this.rotateV_store, rotateY: this.rotateH_store },
			},
		});
	}
}
</script>