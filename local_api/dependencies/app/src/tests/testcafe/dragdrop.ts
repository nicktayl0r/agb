import { Selector } from "testcafe";
import { startCase } from "./testcafeHelpers";

fixture`dragdrop`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/dragdrop`.beforeEach(
	async t => startCase(t)
);

test("drag the drops", async t => {
	await t
		.dragToElement("#drag1", "#drop3")
		.click("#popper3")
		.dragToElement("#drag3", "#drop1")
		.click("#popper2")
		.dragToElement("#drag2", "#drop2")
		// .takeScreenshot()
		.expect(Selector("#nextPageButton").visible)
		.eql(true);
});

fixture`dropMaxChildren`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/drop_maxChildren`.beforeEach(
	async t => startCase(t)
);

test("test drop maxChildren", async t => {
	await t
		.dragToElement("#drag1", "#drop3")
		.dragToElement("#drag2", "#drop3")
		.dragToElement("#drag3", "#drop3")
		.dragToElement("#drag4", "#drop3")
		.expect(Selector("#drop3").child(".dragSlot").childElementCount)
		.eql(3);
});

test("test drop maxChildren swap last", async t => {
	await t
		.dragToElement("#drag1", "#drop3")
		.dragToElement("#drag2", "#drop3")
		.dragToElement("#drag3", "#drop3")
		.dragToElement("#drag4", "#drop3")
		.expect(
			Selector("#drop3")
				.child(".dragSlot")
				.child("#drag4").exists
		)
		.eql(true)
		.expect(
			Selector("#drag4Start")
				.child(".dragSlot")
				.child("#drag3").exists
		)
		.eql(true);
});

test("test drop maxChildren change", async t => {
	await t
		.dragToElement("#drag1", "#drop3")
		.dragToElement("#drag2", "#drop3")
		.dragToElement("#drag3", "#drop3")
		.click("#changeMax")
		.expect(Selector("#drop3").child(".dragSlot").childElementCount)
		.eql(1);
});

test("drag child index in vertical flex drop", async t => {
	await t
		.dragToElement("#drag2", "#drop3")
		.dragToElement("#drag3", "#drop3")
		.dragToElement("#drag1", "#drop3");

	let drag1 = await Selector("#drag1").boundingClientRect;
	let drag2 = await Selector("#drag2").boundingClientRect;
	let drag3 = await Selector("#drag3").boundingClientRect;
	// console.log("d1", drag1.top);
	// console.log("d2", drag2.top);
	await t
		.expect(drag1.top)
		.lt(drag2.top)
		.expect(drag2.top)
		.lt(drag3.top);
});
test("drag child index in horizontal flex drop", async t => {
	await t
		.dragToElement("#drag2", "#drop4")
		.dragToElement("#drag3", "#drop4")
		.dragToElement("#drag1", "#drop4");

	let drag1 = await Selector("#drag1").boundingClientRect;
	let drag2 = await Selector("#drag2").boundingClientRect;
	let drag3 = await Selector("#drag3").boundingClientRect;
	// console.log("d1", drag1.left);
	// console.log("d2", drag2.left);
	await t
		.expect(drag1.left)
		.lt(drag2.left)
		.expect(drag2.left)
		.lt(drag3.left);
});

fixture`dropMaxChildren`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/drop_overflowReset`.beforeEach(
	async t => startCase(t)
);

test("test drop maxChildren reset child", async t => {
	await t
		.dragToElement("#drag1", "#drop3")
		.dragToElement("#drag2", "#drop3")
		.dragToElement("#drag3", "#drop3")
		.dragToElement("#drag4", "#drop3")
		.expect(
			Selector("#drop3")
				.child(".dragSlot")
				.child("#drag4").exists
		)
		.eql(true)
		.expect(
			Selector("#drag3Start")
				.child(".dragSlot")
				.child("#drag3").exists
		)
		.eql(true);
});
