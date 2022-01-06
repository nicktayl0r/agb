import { Selector } from "testcafe";
import { startCase } from "./testcafeHelpers";

fixture`popper-clickToDismiss`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/popper-clickToDismiss`.beforeEach(
	async t => startCase(t)
);

test("hides on click", async t => {
	await t
		.expect(Selector("#popper1").visible)
		.eql(true)
		.click("#popper1")
		.expect(Selector("#popper1").visible)
		.eql(false);
});

fixture`popper-clickToDismiss`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/popper-clickToDismiss-false`.beforeEach(
	async t => startCase(t)
);

test("doesnt hide on click", async t => {
	await t
		.expect(Selector("#popper1").visible)
		.eql(true)
		.click("#popper1")
		.expect(Selector("#popper1").visible)
		.eql(true);
});

fixture`popper-delay`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/popper-delay`.beforeEach(
	async t => startCase(t)
);

test("delays showing", async t => {
	await t
		.expect(Selector("#popper1").visible)
		.eql(false)
		.wait(5000) // not sure why but sometimes this fails when running across all browsers with a shorter wait
		.expect(Selector("#popper1").visible)
		.eql(true);
});

fixture`popper-switchAnchor`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/popper-anchorSwitch`.beforeEach(
	async t => startCase(t)
);

test("switches anchor", async t => {
	// t.debug();
	let arrowRect = await Selector(".popperArrow").boundingClientRect;
	let buttonRect = await Selector("#button1").boundingClientRect;
	await t
		.expect(arrowRect.left)
		.within(buttonRect.left, buttonRect.left + buttonRect.width)
		.click("#button2")
		.expect(Selector("#popper1").getAttribute("data-anchorid"))
		.eql("button2");

	arrowRect = await Selector(".popperArrow").boundingClientRect;
	buttonRect = await Selector("#button2").boundingClientRect;
	await t
		.expect(arrowRect.left)
		.within(buttonRect.left, buttonRect.left + buttonRect.width);
	// console.log("arrow left:", arrowRect.left);
	// console.log(
	// 	"button left:",
	// 	buttonRect.left,
	// 	"button right:",
	// 	buttonRect.left + buttonRect.width
	// );
});
