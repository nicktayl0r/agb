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

fixture`video - inbounds offset`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/video-offset`.beforeEach(
	async t => startCase(t)
);

test("runs playeffects - inbounds offset", async t => {
	await runPlayEffects();
});

test("runs pauseeffects  - inbounds offset", async t => {
	await runPauseEffects(500);
});

test("runs stopeffects - inbounds offset", async t => {
	await runStopEffects(500);
});

fixture`video-loop - inbounds offset`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/video-offset-loop`.beforeEach(
	async t => startCase(t)
);

test("runs loopeffects - inbounds offset", async t => {
	await runLoopEffects(500);
});

fixture`video-end - inbounds offset`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/video-offset-end`.beforeEach(
	async t => startCase(t)
);

test("runs endeffects - inbounds offset", async t => {
	await runEndEffects(500);
});

fixture`autoplay - inbounds offset`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/video-offset-autoplay`.beforeEach(
	async t => startCase(t)
);

test("playstate play autoplays - inbounds offset", async t => {
	await playStatePlayAutoPlays(500);
});
