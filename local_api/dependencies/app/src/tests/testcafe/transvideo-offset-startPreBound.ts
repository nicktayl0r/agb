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

fixture`transvideo - out of bounds start`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/transvideo-offset-startPreBound`.beforeEach(
	async t => startCase(t)
);

test("runs playeffects - out of bounds start", async t => {
	await runPlayEffects();
});

test("runs pauseeffects  - out of bounds start", async t => {
	await runPauseEffects(500);
});

test("runs stopeffects - out of bounds start", async t => {
	await runStopEffects(500);
});

fixture`transvideo-loop - out of bounds start`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/transvideo-offset-startPreBound-loop`.beforeEach(
	async t => startCase(t)
);

test("runs loopeffects - out of bounds start", async t => {
	await runLoopEffects(500);
});

fixture`transvideo-end - out of bounds start`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/transvideo-offset-startPreBound-end`.beforeEach(
	async t => startCase(t)
);

test("runs endeffects - out of bounds start", async t => {
	await runEndEffects(500);
});

fixture`transvideo-autoplay - out of bounds start`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/transvideo-offset-startPreBound-autoplay`.beforeEach(
	async t => startCase(t)
);

test("playstate play autoplays - out of bounds start", async t => {
	await playStatePlayAutoPlays(500);
});
