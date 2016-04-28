"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var browser_1 = require('angular2/platform/browser');
var router_1 = require('angular2/router');
// #docregion reuseCmp
var MyCmp = (function () {
    function MyCmp(params) {
        this.name = params.get('name') || 'NOBODY';
    }
    MyCmp.prototype.routerCanReuse = function (next, prev) { return true; };
    MyCmp.prototype.routerOnReuse = function (next, prev) {
        this.name = next.params['name'];
    };
    MyCmp = __decorate([
        core_1.Component({
            selector: 'my-cmp',
            template: "\n    <div>hello {{name}}!</div>\n    <div>message: <input id=\"message\"></div>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.RouteParams !== 'undefined' && router_1.RouteParams) === 'function' && _a) || Object])
    ], MyCmp);
    return MyCmp;
    var _a;
}());
// #enddocregion
var AppCmp = (function () {
    function AppCmp() {
    }
    AppCmp = __decorate([
        core_1.Component({
            selector: 'example-app',
            template: "\n    <h1>Say hi to...</h1>\n    <a [routerLink]=\"['/HomeCmp', {name: 'naomi'}]\" id=\"naomi-link\">Naomi</a> |\n    <a [routerLink]=\"['/HomeCmp', {name: 'brad'}]\" id=\"brad-link\">Brad</a>\n    <router-outlet></router-outlet>\n  ",
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([
            { path: '/', component: MyCmp, name: 'HomeCmp' },
            { path: '/:name', component: MyCmp, name: 'HomeCmp' }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppCmp);
    return AppCmp;
}());
function main() {
    return browser_1.bootstrap(AppCmp, [core_1.provide(router_1.APP_BASE_HREF, { useValue: '/angular2/examples/router/ts/reuse' })]);
}
exports.main = main;
//# sourceMappingURL=reuse_example.js.map