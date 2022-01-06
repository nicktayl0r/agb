import { t, Selector } from "testcafe";

export async function runPlayEffects() {
	await t
		.expect(Selector("#videoTest").visible)
		.eql(false)
		.expect(Selector("#onVidPlay").visible)
		.eql(false)
		.expect(Selector("#onVidEnd").visible)
		.eql(false)
		.expect(Selector("#onVidPause").visible)
		.eql(false)
		.expect(Selector("#onVidStop").visible)
		.eql(false)
		.expect(Selector("#onVidLoop").visible)
		.eql(false)
		.click("#vidVisible")
		.expect(Selector("#videoTest").visible)
		.eql(true)
		.click("#playvideo")
		.expect(Selector("#onVidPlay").visible)
		.eql(true)
		.expect(Selector("#onVidEnd").visible)
		.eql(false)
		.expect(Selector("#onVidPause").visible)
		.eql(false)
		.expect(Selector("#onVidStop").visible)
		.eql(false)
		.expect(Selector("#playCount").innerText)
		.eql("1");
}

export async function runPauseEffects(delay: number) {
	await t
		.expect(Selector("#videoTest").visible)
		.eql(false)
		.expect(Selector("#onVidPlay").visible)
		.eql(false)
		.expect(Selector("#onVidEnd").visible)
		.eql(false)
		.expect(Selector("#onVidPause").visible)
		.eql(false)
		.expect(Selector("#onVidStop").visible)
		.eql(false)
		.expect(Selector("#onVidLoop").visible)
		.eql(false)
		.click("#vidVisible")
		.expect(Selector("#videoTest").visible)
		.eql(true)
		.click("#playvideo")
		.expect(Selector("#onVidPlay").visible)
		.eql(true)
		.wait(delay) // give the video a second to actually start playing
		.click("#pausevideo")
		.expect(Selector("#onVidPause").visible)
		.eql(true)
		.expect(Selector("#onVidEnd").visible)
		.eql(false)
		.expect(Selector("#onVidPlay").visible)
		.eql(false)
		.expect(Selector("#onVidStop").visible)
		.eql(false)
		.expect(Selector("#onVidLoop").visible)
		.eql(false)
		.expect(Selector("#pauseCount").innerText)
		.eql("1");
}

export async function runStopEffects(delay: number) {
	await t
		.expect(Selector("#videoTest").visible)
		.eql(false)
		.expect(Selector("#onVidPlay").visible)
		.eql(false)
		.expect(Selector("#onVidEnd").visible)
		.eql(false)
		.expect(Selector("#onVidPause").visible)
		.eql(false)
		.expect(Selector("#onVidStop").visible)
		.eql(false)
		.expect(Selector("#onVidLoop").visible)
		.eql(false)
		.click("#vidVisible")
		.expect(Selector("#videoTest").visible)
		.eql(true)
		.click("#playvideo")
		.expect(Selector("#onVidPlay").visible)
		.eql(true)
		.wait(delay) // give the video a second to actually start playing
		.click("#stopvideo")
		.expect(Selector("#onVidStop").visible)
		.eql(true)
		.expect(Selector("#onVidEnd").visible)
		.eql(false)
		.expect(Selector("#onVidPlay").visible)
		.eql(false)
		.expect(Selector("#onVidPause").visible)
		.eql(false)
		.expect(Selector("#onVidLoop").visible)
		.eql(false)
		.expect(Selector("#stopCount").innerText)
		.eql("1");
}

export async function runLoopEffects(delay: number) {
	await t
		.expect(Selector("#videoTest").visible)
		.eql(false)
		.expect(Selector("#onVidPlay").visible)
		.eql(false)
		.expect(Selector("#onVidEnd").visible)
		.eql(false)
		.expect(Selector("#onVidPause").visible)
		.eql(false)
		.expect(Selector("#onVidStop").visible)
		.eql(false)
		.expect(Selector("#onVidLoop").visible)
		.eql(false)
		.click("#vidVisible")
		.expect(Selector("#videoTest").visible)
		.eql(true)
		.click("#playvideo")
		.wait(delay) // 10s video
		.expect(Selector("#onVidLoop").visible)
		.eql(true)
		.expect(Selector("#loopCount").innerText)
		.eql("1");
}

export async function runEndEffects(delay: number) {
	await t
		.expect(Selector("#videoTest").visible)
		.eql(false)
		.expect(Selector("#onVidPlay").visible)
		.eql(false)
		.expect(Selector("#onVidEnd").visible)
		.eql(false)
		.expect(Selector("#onVidPause").visible)
		.eql(false)
		.expect(Selector("#onVidStop").visible)
		.eql(false)
		.expect(Selector("#onVidLoop").visible)
		.eql(false)
		.click("#vidVisible")
		.expect(Selector("#videoTest").visible)
		.eql(true)
		.click("#playvideo")
		.wait(delay) // give the video a second to actually start playing
		.expect(Selector("#onVidEnd").visible)
		.eql(true)
		.expect(Selector("#endCount").innerText)
		.eql("1");
}

export async function playStatePlayAutoPlays(delay: number) {
	await t
		.expect(Selector("#onVidLoop").visible)
		.eql(false)
		.expect(Selector("#onVidPlay").visible)
		.eql(true)
		.wait(delay) // wait for video to loop
		.expect(Selector("#onVidLoop").visible)
		.eql(true);
}
