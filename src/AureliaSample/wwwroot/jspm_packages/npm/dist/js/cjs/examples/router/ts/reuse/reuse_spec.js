"use strict";
var e2e_util_1 = require('angular2/src/testing/e2e_util');
var testing_1 = require('angular2/testing');
function waitForElement(selector) {
    var EC = protractor.ExpectedConditions;
    // Waits for the element with id 'abc' to be present on the dom.
    e2e_util_1.browser.wait(EC.presenceOf($(selector)), 20000);
}
describe('reuse example app', function () {
    afterEach(e2e_util_1.verifyNoBrowserErrors);
    var URL = 'angular2/examples/router/ts/reuse/';
    it('should build a link which points to the detail page', function () {
        e2e_util_1.browser.get(URL);
        waitForElement('my-cmp');
        element(by.css('#naomi-link')).click();
        waitForElement('my-cmp');
        testing_1.expect(e2e_util_1.browser.getCurrentUrl()).toMatch(/\/naomi$/);
        // type something into input
        element(by.css('#message')).sendKeys('long time no see!');
        // navigate to Brad
        element(by.css('#brad-link')).click();
        waitForElement('my-cmp');
        testing_1.expect(e2e_util_1.browser.getCurrentUrl()).toMatch(/\/brad$/);
        // check that typed input is the same
        testing_1.expect(element(by.css('#message')).getAttribute('value')).toEqual('long time no see!');
    });
});
//# sourceMappingURL=reuse_spec.js.map