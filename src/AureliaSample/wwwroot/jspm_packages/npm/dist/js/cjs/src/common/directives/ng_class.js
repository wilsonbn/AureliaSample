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
var lang_1 = require('angular2/src/facade/lang');
var core_1 = require('angular2/core');
var collection_1 = require('angular2/src/facade/collection');
/**
 * The `NgClass` directive conditionally adds and removes CSS classes on an HTML element based on
 * an expression's evaluation result.
 *
 * The result of an expression evaluation is interpreted differently depending on type of
 * the expression evaluation result:
 * - `string` - all the CSS classes listed in a string (space delimited) are added
 * - `Array` - all the CSS classes (Array elements) are added
 * - `Object` - each key corresponds to a CSS class name while values are interpreted as expressions
 * evaluating to `Boolean`. If a given expression evaluates to `true` a corresponding CSS class
 * is added - otherwise it is removed.
 *
 * While the `NgClass` directive can interpret expressions evaluating to `string`, `Array`
 * or `Object`, the `Object`-based version is the most often used and has an advantage of keeping
 * all the CSS class names in a template.
 *
 * ### Example ([live demo](http://plnkr.co/edit/a4YdtmWywhJ33uqfpPPn?p=preview)):
 *
 * ```
 * import {Component} from 'angular2/core';
 * import {NgClass} from 'angular2/common';
 *
 * @Component({
 *   selector: 'toggle-button',
 *   inputs: ['isDisabled'],
 *   template: `
 *      <div class="button" [ngClass]="{active: isOn, disabled: isDisabled}"
 *          (click)="toggle(!isOn)">
 *          Click me!
 *      </div>`,
 *   styles: [`
 *     .button {
 *       width: 120px;
 *       border: medium solid black;
 *     }
 *
 *     .active {
 *       background-color: red;
 *    }
 *
 *     .disabled {
 *       color: gray;
 *       border: medium solid gray;
 *     }
 *   `]
 *   directives: [NgClass]
 * })
 * class ToggleButton {
 *   isOn = false;
 *   isDisabled = false;
 *
 *   toggle(newState) {
 *     if (!this.isDisabled) {
 *       this.isOn = newState;
 *     }
 *   }
 * }
 * ```
 */
var NgClass = (function () {
    function NgClass(_iterableDiffers, _keyValueDiffers, _ngEl, _renderer) {
        this._iterableDiffers = _iterableDiffers;
        this._keyValueDiffers = _keyValueDiffers;
        this._ngEl = _ngEl;
        this._renderer = _renderer;
        this._initialClasses = [];
    }
    Object.defineProperty(NgClass.prototype, "initialClasses", {
        set: function (v) {
            this._applyInitialClasses(true);
            this._initialClasses = lang_1.isPresent(v) && lang_1.isString(v) ? v.split(' ') : [];
            this._applyInitialClasses(false);
            this._applyClasses(this._rawClass, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgClass.prototype, "rawClass", {
        set: function (v) {
            this._cleanupClasses(this._rawClass);
            if (lang_1.isString(v)) {
                v = v.split(' ');
            }
            this._rawClass = v;
            this._iterableDiffer = null;
            this._keyValueDiffer = null;
            if (lang_1.isPresent(v)) {
                if (collection_1.isListLikeIterable(v)) {
                    this._iterableDiffer = this._iterableDiffers.find(v).create(null);
                }
                else {
                    this._keyValueDiffer = this._keyValueDiffers.find(v).create(null);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    NgClass.prototype.ngDoCheck = function () {
        if (lang_1.isPresent(this._iterableDiffer)) {
            var changes = this._iterableDiffer.diff(this._rawClass);
            if (lang_1.isPresent(changes)) {
                this._applyIterableChanges(changes);
            }
        }
        if (lang_1.isPresent(this._keyValueDiffer)) {
            var changes = this._keyValueDiffer.diff(this._rawClass);
            if (lang_1.isPresent(changes)) {
                this._applyKeyValueChanges(changes);
            }
        }
    };
    NgClass.prototype.ngOnDestroy = function () { this._cleanupClasses(this._rawClass); };
    NgClass.prototype._cleanupClasses = function (rawClassVal) {
        this._applyClasses(rawClassVal, true);
        this._applyInitialClasses(false);
    };
    NgClass.prototype._applyKeyValueChanges = function (changes) {
        var _this = this;
        changes.forEachAddedItem(function (record) { _this._toggleClass(record.key, record.currentValue); });
        changes.forEachChangedItem(function (record) { _this._toggleClass(record.key, record.currentValue); });
        changes.forEachRemovedItem(function (record) {
            if (record.previousValue) {
                _this._toggleClass(record.key, false);
            }
        });
    };
    NgClass.prototype._applyIterableChanges = function (changes) {
        var _this = this;
        changes.forEachAddedItem(function (record) { _this._toggleClass(record.item, true); });
        changes.forEachRemovedItem(function (record) { _this._toggleClass(record.item, false); });
    };
    NgClass.prototype._applyInitialClasses = function (isCleanup) {
        var _this = this;
        this._initialClasses.forEach(function (className) { return _this._toggleClass(className, !isCleanup); });
    };
    NgClass.prototype._applyClasses = function (rawClassVal, isCleanup) {
        var _this = this;
        if (lang_1.isPresent(rawClassVal)) {
            if (lang_1.isArray(rawClassVal)) {
                rawClassVal.forEach(function (className) { return _this._toggleClass(className, !isCleanup); });
            }
            else if (rawClassVal instanceof Set) {
                rawClassVal.forEach(function (className) { return _this._toggleClass(className, !isCleanup); });
            }
            else {
                collection_1.StringMapWrapper.forEach(rawClassVal, function (expVal, className) {
                    if (lang_1.isPresent(expVal))
                        _this._toggleClass(className, !isCleanup);
                });
            }
        }
    };
    NgClass.prototype._toggleClass = function (className, enabled) {
        className = className.trim();
        if (className.length > 0) {
            if (className.indexOf(' ') > -1) {
                var classes = className.split(/\s+/g);
                for (var i = 0, len = classes.length; i < len; i++) {
                    this._renderer.setElementClass(this._ngEl.nativeElement, classes[i], enabled);
                }
            }
            else {
                this._renderer.setElementClass(this._ngEl.nativeElement, className, enabled);
            }
        }
    };
    NgClass = __decorate([
        core_1.Directive({ selector: '[ngClass]', inputs: ['rawClass: ngClass', 'initialClasses: class'] }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.IterableDiffers !== 'undefined' && core_1.IterableDiffers) === 'function' && _a) || Object, (typeof (_b = typeof core_1.KeyValueDiffers !== 'undefined' && core_1.KeyValueDiffers) === 'function' && _b) || Object, (typeof (_c = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _c) || Object, (typeof (_d = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _d) || Object])
    ], NgClass);
    return NgClass;
    var _a, _b, _c, _d;
}());
exports.NgClass = NgClass;
//# sourceMappingURL=ng_class.js.map