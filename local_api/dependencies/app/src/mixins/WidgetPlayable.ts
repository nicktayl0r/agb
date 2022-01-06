import { Component, Prop } from "vue-property-decorator";

import Widget from "@/components/Widget";
import { ConditionsList } from "@/data models/conditionModels";
import { logMessage } from "@/helpers/debugHelpers";
import { runWidgetEventConditions } from "@/helpers/widgetHelpers";

export type state = "default" | "play" | "pause" | "stop";

@Component
export default class WidgetPlayable extends Widget {
  @Prop({
    default: "default"
  })
  playState: state;

  @Prop()
  playEffects: ConditionsList;

  @Prop()
  pauseEffects: ConditionsList;

  @Prop()
  stopEffects: ConditionsList;

  @Prop()
  endEffects: ConditionsList;

  @Prop()
  loopEffects: ConditionsList;

  //the value that the playState
  get playStateStore() {
    return this.ApplyPlayState(true);
  }

  currentPlayState: string;

  ApplyPlayState(evaluateEventConditional: boolean, forceApply = false) {
    const pState = this.propStoreOverride("playState") as string;
    // prevent infinite effect loops:
    if ((!forceApply && pState === this.currentPlayState) || !this.loadedAndReady()) return pState;

    // do this after playStateStore has been set:
    this.$nextTick(() => {
      logMessage("WidgetPlayable.ApplyPlayState", pState, this.id);
      switch (pState) {
        case "play":
          this.DoPlayState(pState);
          if (evaluateEventConditional) {
            runWidgetEventConditions(
              this,
              this.$props.playEffects,
              this.$props.id
            );
          }
          break;
        case "stop":
          this.DoStopState(pState);
          if (evaluateEventConditional) {
            runWidgetEventConditions(
              this,
              this.$props.stopEffects,
              this.$props.id
            );
          }
          break;
        case "pause":
          this.DoPauseState(pState);
          if (evaluateEventConditional) {
            runWidgetEventConditions(
              this,
              this.$props.pauseEffects,
              this.$props.id
            );
          }
          break;
      }
    });

    this.currentPlayState = pState;
    return pState;
  }

  loadedAndReady() {
    //override if playable needs to be ready before playing
    return true;
  }

  //override in your component and trigger a play action.
  DoPlayState(s: state) {
    logMessage("DoPlayState() override me");
  }

  //override in your component and trigger a stop action.
  DoStopState(s: state) {
    logMessage("DoStopState() override me");
  }

  //override in your component and trigger a pause action.
  DoPauseState(s: state) {
    logMessage("DoPauseState() override me");
  }
}
