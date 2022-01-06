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

fixture`video - no offset`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/video`.beforeEach(
	async t => startCase(t)
);

test("runs playeffects - no offset", async t => {
	await runPlayEffects();
});

test("runs pauseeffects  - no offset", async t => {
	await runPauseEffects(1000);
});

test("runs stopeffects - no offset", async t => {
	await runStopEffects(1000);
});

fixture`video-loop - no offset`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/video-loop`.beforeEach(
	async t => startCase(t)
);

test("runs loopeffects - no offset", async t => {
	await runLoopEffects(9000);
});

fixture`video-end - no offset`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/video-end`.beforeEach(
	async t => startCase(t)
);

test("runs endeffects - no offset", async t => {
	await runEndEffects(9000);
});

fixture`autoplay - no offset`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/video-autoplay`.beforeEach(
	async t => startCase(t)
);

test("playstate play autoplays - no offset", async t => {
	await playStatePlayAutoPlays(9000);
});
