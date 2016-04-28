"use strict";
var browser_static_1 = require('angular2/platform/testing/browser_static');
var browser_1 = require('angular2/platform/browser');
var lang_1 = require('angular2/src/facade/lang');
/**
 * Providers for using template cache to avoid actual XHR.
 * Re-exported here so that tests import from a single place.
 */
/**
 * Default patform providers for testing.
 */
exports.TEST_BROWSER_PLATFORM_PROVIDERS = lang_1.CONST_EXPR([browser_static_1.TEST_BROWSER_STATIC_PLATFORM_PROVIDERS]);
/**
 * Default application providers for testing.
 */
exports.TEST_BROWSER_APPLICATION_PROVIDERS = lang_1.CONST_EXPR([browser_1.BROWSER_APP_PROVIDERS, browser_static_1.ADDITIONAL_TEST_BROWSER_PROVIDERS]);
//# sourceMappingURL=browser.js.map