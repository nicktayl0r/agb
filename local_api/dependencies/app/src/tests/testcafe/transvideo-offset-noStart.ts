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

fixture`transvideo - offset noStart`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/transvideo-offset-noStart`.beforeEach(
	async t => startCase(t)
);

test("runs playeffects - offset noStart", async t => {
	await runPlayEffects();
});

test("runs pauseeffects  - offset noStart", async t => {
	await runPauseEffects(1000);
});

test("runs stopeffects - offset noStart", async t => {
	await runStopEffects(1000);
});

fixture`transvideo-loop - offset noStart`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/transvideo-offset-noStart-loop`.beforeEach(
	async t => startCase(t)
);

test("runs loopeffects - offset noStart", async t => {
	await runLoopEffects(500);
});

fixture`transvideo-end - offset noStart`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/transvideo-offset-noStart-end`.beforeEach(
	async t => startCase(t)
);

test("runs endeffects - offset noStart", async t => {
	await runEndEffects(1000);
});

fixture`transvideo-autoplay - offset noStart`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/transvideo-offset-noStart-autoplay`.beforeEach(
	async t => startCase(t)
);

test("playstate play autoplays - offset noStart", async t => {
	await playStatePlayAutoPlays(1000);
});
