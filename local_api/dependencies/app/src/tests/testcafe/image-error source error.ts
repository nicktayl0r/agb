import { Selector,t } from "testcafe";
import { startCase } from "./testcafeHelpers";


export default async function () {
    const { error } = await t.getBrowserConsoleMessages();

    await t.expect(error[0]).ok()
            .expect(error[0]).contains('Failed to load resource', 'Expected GET Error Occurred')
            .expect(error[2]).ok()
            .expect(error[2]).contains('Error on WidgetImage.loadImage', 'Expected WidgetImage.loadImage Error Occurred');
}


fixture `image-error`
    .page `http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/pages/image-error`.beforeEach(
	async t => startCase(t)
);

test('source error', async t => {
    await t        
        .expect(Selector('#inc7').getAttribute('src')).eql("../../assets/jpg/checkerTest.jpeg")
        .expect(Selector('#inc7').getAttribute('data-srcstore')).eql("../../assets/Thumbnails/STEM Case/CaseThumbnail.png");
});