import { Selector } from "testcafe";
import { startCase } from "./testcafeHelpers";
import {
	runPlayEffects,
	runPauseEffects,
	runStopEffects,
	runLoopEffects,
	runEndEffects,
	playStatePlayAutoPlays
} from "./helpers/video-helpers";

fixture`video - offset noEnd`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/video-offset-noEnd`.beforeEach(
	async t => startCase(t)
);

test("runs playeffects - offset noEnd", async t => {
	await runPlayEffects();
});

test("runs pauseeffects  - offset noEnd", async t => {
	await runPauseEffects(1000);
});

test("runs stopeffects - offset noEnd", async t => {
	await runStopEffects(1000);
});

fixture`video-loop - offset noEnd`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/video-offset-noEnd-loop`.beforeEach(
	async t => startCase(t)
);

test("runs loopeffects - offset noEnd", async t => {
	await runLoopEffects(500);
});

fixture`video-end - offset noEnd`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/video-offset-noEnd-end`.beforeEach(
	async t => startCase(t)
);

test("runs endeffects - offset noEnd", async t => {
	await runEndEffects(1000);
});

fixture`autoplay - offset noEnd`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/video-offset-noEnd-autoplay`.beforeEach(
	async t => startCase(t)
);

test("playstate play autoplays - offset noEnd", async t => {
	await playStatePlayAutoPlays(1000);
});
