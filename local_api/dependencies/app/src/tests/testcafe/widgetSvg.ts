import { Selector } from "testcafe";
import { startCase } from "./testcafeHelpers";

fixture`widgetSvg`
  .page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/widgetsvg`.beforeEach(
    async t => startCase(t)
  );

test("runs clickeffects", async t => {
  await t
    .expect(Selector("#widgetSvgTest2").classNames)
    .eql(["widgetSVG"])
    .click("#widgetSvgTest")
    .expect(Selector("#widgetSvgTest2").classNames)
    .eql(["widgetSVG", "imageOutline"])
    .expect(
      Selector("#widgetSvgTest3")
        .child("object")
        .getAttribute("data")
    )
    .eql("../assets/svg/bush_Red.svg")
    .expect(
      Selector("#widgetSvgTest3")
        .child("object")
        .getAttribute("data-datastore")
    )
    .eql("../assets/svg/bush_Red.svg")
    .click("#widgetSvgTest2")
    .expect(
      Selector("#widgetSvgTest3")
        .child("object")
        .getAttribute("data")
    )
    .eql("../assets/svg/dnaSpinner.svg")
    .expect(
      Selector("#widgetSvgTest3")
        .child("object")
        .getAttribute("data-datastore")
    )
    .eql("../assets/svg/dnaSpinner.svg");
});
