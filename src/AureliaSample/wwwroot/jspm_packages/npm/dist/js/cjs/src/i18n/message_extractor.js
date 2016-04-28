"use strict";
var html_ast_1 = require('angular2/src/compiler/html_ast');
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var message_1 = require('./message');
var shared_1 = require('./shared');
/**
 * All messages extracted from a template.
 */
var ExtractionResult = (function () {
    function ExtractionResult(messages, errors) {
        this.messages = messages;
        this.errors = errors;
    }
    return ExtractionResult;
}());
exports.ExtractionResult = ExtractionResult;
/**
 * Removes duplicate messages.
 *
 * E.g.
 *
 * ```
 *  var m = [new Message("message", "meaning", "desc1"), new Message("message", "meaning",
 * "desc2")];
 *  expect(removeDuplicates(m)).toEqual([new Message("message", "meaning", "desc1")]);
 * ```
 */
function removeDuplicates(messages) {
    var uniq = {};
    messages.forEach(function (m) {
        if (!collection_1.StringMapWrapper.contains(uniq, message_1.id(m))) {
            uniq[message_1.id(m)] = m;
        }
    });
    return collection_1.StringMapWrapper.values(uniq);
}
exports.removeDuplicates = removeDuplicates;
/**
 * Extracts all messages from a template.
 *
 * Algorithm:
 *
 * To understand the algorithm, you need to know how partitioning works.
 * Partitioning is required as we can use two i18n comments to group node siblings together.
 * That is why we cannot just use nodes.
 *
 * Partitioning transforms an array of HtmlAst into an array of Part.
 * A part can optionally contain a root element or a root text node. And it can also contain
 * children.
 * A part can contain i18n property, in which case it needs to be extracted.
 *
 * Example:
 *
 * The following array of nodes will be split into four parts:
 *
 * ```
 * <a>A</a>
 * <b i18n>B</b>
 * <!-- i18n -->
 * <c>C</c>
 * D
 * <!-- /i18n -->
 * E
 * ```
 *
 * Part 1 containing the a tag. It should not be translated.
 * Part 2 containing the b tag. It should be translated.
 * Part 3 containing the c tag and the D text node. It should be translated.
 * Part 4 containing the E text node. It should not be translated..
 *
 * It is also important to understand how we stringify nodes to create a message.
 *
 * We walk the tree and replace every element node with a placeholder. We also replace
 * all expressions in interpolation with placeholders. We also insert a placeholder element
 * to wrap a text node containing interpolation.
 *
 * Example:
 *
 * The following tree:
 *
 * ```
 * <a>A{{I}}</a><b>B</b>
 * ```
 *
 * will be stringified into:
 * ```
 * <ph name="e0"><ph name="t1">A<ph name="0"/></ph></ph><ph name="e2">B</ph>
 * ```
 *
 * This is what the algorithm does:
 *
 * 1. Use the provided html parser to get the html AST of the template.
 * 2. Partition the root nodes, and process each part separately.
 * 3. If a part does not have the i18n attribute, recurse to process children and attributes.
 * 4. If a part has the i18n attribute, stringify the nodes to create a Message.
 */
var MessageExtractor = (function () {
    function MessageExtractor(_htmlParser, _parser) {
        this._htmlParser = _htmlParser;
        this._parser = _parser;
    }
    MessageExtractor.prototype.extract = function (template, sourceUrl) {
        this.messages = [];
        this.errors = [];
        var res = this._htmlParser.parse(template, sourceUrl);
        if (res.errors.length > 0) {
            return new ExtractionResult([], res.errors);
        }
        else {
            this._recurse(res.rootNodes);
            return new ExtractionResult(this.messages, this.errors);
        }
    };
    MessageExtractor.prototype._extractMessagesFromPart = function (p) {
        if (p.hasI18n) {
            this.messages.push(p.createMessage(this._parser));
            this._recurseToExtractMessagesFromAttributes(p.children);
        }
        else {
            this._recurse(p.children);
        }
        if (lang_1.isPresent(p.rootElement)) {
            this._extractMessagesFromAttributes(p.rootElement);
        }
    };
    MessageExtractor.prototype._recurse = function (nodes) {
        var _this = this;
        if (lang_1.isPresent(nodes)) {
            var ps = shared_1.partition(nodes, this.errors);
            ps.forEach(function (p) { return _this._extractMessagesFromPart(p); });
        }
    };
    MessageExtractor.prototype._recurseToExtractMessagesFromAttributes = function (nodes) {
        var _this = this;
        nodes.forEach(function (n) {
            if (n instanceof html_ast_1.HtmlElementAst) {
                _this._extractMessagesFromAttributes(n);
                _this._recurseToExtractMessagesFromAttributes(n.children);
            }
        });
    };
    MessageExtractor.prototype._extractMessagesFromAttributes = function (p) {
        var _this = this;
        p.attrs.forEach(function (attr) {
            if (attr.name.startsWith(shared_1.I18N_ATTR_PREFIX)) {
                try {
                    _this.messages.push(shared_1.messageFromAttribute(_this._parser, p, attr));
                }
                catch (e) {
                    if (e instanceof shared_1.I18nError) {
                        _this.errors.push(e);
                    }
                    else {
                        throw e;
                    }
                }
            }
        });
    };
    return MessageExtractor;
}());
exports.MessageExtractor = MessageExtractor;
//# sourceMappingURL=message_extractor.js.map