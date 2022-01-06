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

fixture`transvideo - out of bounds end`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/transvideo-offset-endPostBound`.beforeEach(
	async t => startCase(t)
);

test("runs playeffects - out of bounds end", async t => {
	await runPlayEffects();
});

test("runs pauseeffects  - out of bounds end", async t => {
	await runPauseEffects(500);
});

test("runs stopeffects - out of bounds end", async t => {
	await runStopEffects(500);
});

fixture`transvideo-loop - out of bounds end`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/transvideo-offset-endPostBound-loop`.beforeEach(
	async t => startCase(t)
);

test("runs loopeffects - out of bounds end", async t => {
	await runLoopEffects(500);
});

fixture`transvideo-end - out of bounds end`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/transvideo-offset-endPostBound-end`.beforeEach(
	async t => startCase(t)
);

test("runs endeffects - out of bounds end", async t => {
	await runEndEffects(500);
});

fixture`transvideo-autoplay - out of bounds end`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/transvideo-offset-endPostBound-autoplay`.beforeEach(
	async t => startCase(t)
);

test("playstate play autoplays - out of bounds end", async t => {
	await playStatePlayAutoPlays(500);
});
