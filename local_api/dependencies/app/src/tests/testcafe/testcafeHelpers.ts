import 'testcafe';

export async function startCase(t: TestController) {
    await t
        .setNativeDialogHandler((type, text, url) => true) // in case the beforeunload dialog from the previous page is still around
        .click("#startButton")
        .wait(100); // give the page just a little time to load up
}