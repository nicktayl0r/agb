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

fixture`transvideo - no offset`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/transvideo`.beforeEach(
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

fixture`transvideo-loop - no offset`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/transvideo-loop`.beforeEach(
	async t => startCase(t)
);

test("runs loopeffects - no offset", async t => {
	await runLoopEffects(9000);
});

fixture`transvideo-end - no offset`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/transvideo-end`.beforeEach(
	async t => startCase(t)
);

test("runs endeffects - no offset", async t => {
	await runEndEffects(9000);
});

fixture`transvideo-autoplay - no offset`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/transvideo-autoplay`.beforeEach(
	async t => startCase(t)
);

test("playstate play autoplays - no offset", async t => {
	await playStatePlayAutoPlays(9000);
});
