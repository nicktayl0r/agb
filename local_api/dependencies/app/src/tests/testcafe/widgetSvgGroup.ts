import { Selector } from "testcafe";
import { startCase } from "./testcafeHelpers";

fixture`widgetSvgGroup`
	.page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/widgetSvgGroup`.beforeEach(
	async t => startCase(t)
);

test("runs clickeffects", async t => {
	await t
		.expect(Selector("#svgTest2").classNames)
		.eql(["svgParent"])
		.expect(Selector("#svgTest2").getAttribute("disabled"))
		.eql("disabled")
		.click("#svgTest", {
			offsetY: 7, // * 0.1,
			offsetX: 68 // * 0.9
		})
		.expect(Selector("#svgTest2").classNames)
		.eql(["svgParent", "svgAddClassTest"])
		.expect(Selector("#svgTest2").hasAttribute("disabled"))
		.eql(false)
		.expect(Selector("#svgTest3").visible)
		.eql(true)
		.click("#svgTest2", {
			offsetY: 72,
			offsetX: 72
		})
		.expect(Selector("#svgTest3").visible)
		.eql(false);
});
//don't execute clickEffects on svgTest2 b/c it is disabled.
test("disabled prevents clickEffects", async t => {
	await t
		.expect(Selector("#svgTest2").hasAttribute("disabled"))
		.eql(true)
		.click("#svgTest2", {
			offsetY: 72,
			offsetX: 72
		})
		.expect(Selector("#svgTest3").visible)
		.eql(true);
});
