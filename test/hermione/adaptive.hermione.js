const { assert } = require('chai');
let bug_id = '';

if (process.env.BUG_ID !== undefined) {
    bug_id = process.env.BUG_ID
}

describe('Адаптив', () => {
    it("Адаптив 1400", async ({browser}) => {
        await browser.url('/hw/store' + `?bug_id=${bug_id}`);
        await browser.setWindowSize(1399, 700);
        await browser.$(".Application").waitForExist();
        await browser.assertView("plain", ".Application", {
            compositeImage: false,
        });
        await browser.url('/hw/store' + `?bug_id=${bug_id}`);
        await browser.setWindowSize(1399, 700);
        await browser.$(".Application").waitForExist();
        await browser.assertView("plain2", ".Application", {
            compositeImage: false,
        });
    });
});