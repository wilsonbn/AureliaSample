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
// #docregion routerOnActivate
var ChildCmp = (function () {
    function ChildCmp() {
    }
    ChildCmp = __decorate([
        core_1.Component({ template: "Child" }), 
        __metadata('design:paramtypes', [])
    ], ChildCmp);
    return ChildCmp;
}());
var ParentCmp = (function () {
    function ParentCmp() {
        this.log = '';
    }
    ParentCmp.prototype.routerOnActivate = function (next, prev) {
        this.log = "Finished navigating from \"" + (prev ? prev.urlPath : 'null') + "\" to \"" + next.urlPath + "\"";
        return new Promise(function (resolve) {
            // The ChildCmp gets instantiated only when the Promise is resolved
            setTimeout(function () { return resolve(null); }, 1000);
        });
    };
    ParentCmp = __decorate([
        core_1.Component({
            template: "\n    <h2>Parent</h2> (<router-outlet></router-outlet>) \n    <p>{{log}}</p>",
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([{ path: '/child', name: 'Child', component: ChildCmp }]), 
        __metadata('design:paramtypes', [])
    ], ParentCmp);
    return ParentCmp;
}());
// #enddocregion
var AppCmp = (function () {
    function AppCmp() {
    }
    AppCmp = __decorate([
        core_1.Component({
            selector: 'example-app',
            template: "\n    <h1>My app</h1>\n    \n    <nav>\n      <a [routerLink]=\"['Parent', 'Child']\">Child</a>\n    </nav>\n    <router-outlet></router-outlet>\n  ",
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([{ path: '/parent/...', name: 'Parent', component: ParentCmp }]), 
        __metadata('design:paramtypes', [])
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
function main() {
    return browser_1.bootstrap(AppCmp, [core_1.provide(router_1.APP_BASE_HREF, { useValue: '/angular2/examples/router/ts/on_activate' })]);
}
exports.main = main;
//# sourceMappingURL=on_activate_example.js.map