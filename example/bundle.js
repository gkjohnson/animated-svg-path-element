/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*__wc__loader*/

(function () {
  'use strict';

  const userPolymer = window.Polymer;

  /**
   * @namespace Polymer
   * @summary Polymer is a lightweight library built on top of the web
   *   standards-based Web Components API's, and makes it easy to build your
   *   own custom HTML elements.
   * @param {!PolymerInit} info Prototype for the custom element. It must contain
   *   an `is` property to specify the element name. Other properties populate
   *   the element prototype. The `properties`, `observers`, `hostAttributes`,
   *   and `listeners` properties are processed to create element features.
   * @return {!Object} Returns a custom element class for the given provided
   *   prototype `info` object. The name of the element if given by `info.is`.
   */
  window.Polymer = function (info) {
    return window.Polymer._polymerFn(info);
  };

  // support user settings on the Polymer object
  if (userPolymer) {
    Object.assign(Polymer, userPolymer);
  }

  // To be plugged by legacy implementation if loaded
  /* eslint-disable valid-jsdoc */
  /**
   * @param {!PolymerInit} info Prototype for the custom element. It must contain
   *   an `is` property to specify the element name. Other properties populate
   *   the element prototype. The `properties`, `observers`, `hostAttributes`,
   *   and `listeners` properties are processed to create element features.
   * @return {!Object} Returns a custom element class for the given provided
   *   prototype `info` object. The name of the element if given by `info.is`.
   */
  window.Polymer._polymerFn = function (info) {
    // eslint-disable-line no-unused-vars
    throw new Error('Load polymer.html to use the Polymer() function.');
  };
  /* eslint-enable */

  window.Polymer.version = '2.0.1';

  /* eslint-disable no-unused-vars */
  /*
  When using Closure Compiler, JSCompiler_renameProperty(property, object) is replaced by the munged name for object[property]
  We cannot alias this function, so we have to use a small shim that has the same behavior when not compiling.
  */
  window.JSCompiler_renameProperty = function (prop, obj) {
    return prop;
  };
  /* eslint-enable */
})();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

(function () {
  'use strict';

  let CSS_URL_RX = /(url\()([^)]*)(\))/g;
  let ABS_URL = /(^\/)|(^#)|(^[\w-\d]*:)/;
  let workingURL;
  let resolveDoc;
  /**
   * Resolves the given URL against the provided `baseUri'.
   *
   * @memberof Polymer.ResolveUrl
   * @param {string} url Input URL to resolve
   * @param {?string=} baseURI Base URI to resolve the URL against
   * @return {string} resolved URL
   */
  function resolveUrl(url, baseURI) {
    if (url && ABS_URL.test(url)) {
      return url;
    }
    // Lazy feature detection.
    if (workingURL === undefined) {
      workingURL = false;
      try {
        const u = new URL('b', 'http://a');
        u.pathname = 'c%20d';
        workingURL = u.href === 'http://a/c%20d';
      } catch (e) {
        // silently fail
      }
    }
    if (!baseURI) {
      baseURI = document.baseURI || window.location.href;
    }
    if (workingURL) {
      return new URL(url, baseURI).href;
    }
    // Fallback to creating an anchor into a disconnected document.
    if (!resolveDoc) {
      resolveDoc = document.implementation.createHTMLDocument('temp');
      resolveDoc.base = resolveDoc.createElement('base');
      resolveDoc.head.appendChild(resolveDoc.base);
      resolveDoc.anchor = resolveDoc.createElement('a');
      resolveDoc.body.appendChild(resolveDoc.anchor);
    }
    resolveDoc.base.href = baseURI;
    resolveDoc.anchor.href = url;
    return resolveDoc.anchor.href || url;
  }

  /**
   * Resolves any relative URL's in the given CSS text against the provided
   * `ownerDocument`'s `baseURI`.
   *
   * @memberof Polymer.ResolveUrl
   * @param {string} cssText CSS text to process
   * @param {string} baseURI Base URI to resolve the URL against
   * @return {string} Processed CSS text with resolved URL's
   */
  function resolveCss(cssText, baseURI) {
    return cssText.replace(CSS_URL_RX, function (m, pre, url, post) {
      return pre + '\'' + resolveUrl(url.replace(/["']/g, ''), baseURI) + '\'' + post;
    });
  }

  /**
   * Returns a path from a given `url`. The path includes the trailing
   * `/` from the url.
   *
   * @memberof Polymer.ResolveUrl
   * @param {string} url Input URL to transform
   * @return {string} resolved path
   */
  function pathFromUrl(url) {
    return url.substring(0, url.lastIndexOf('/') + 1);
  }

  /**
   * Module with utilities for resolving relative URL's.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module with utilities for resolving relative URL's.
   */
  Polymer.ResolveUrl = {
    resolveCss: resolveCss,
    resolveUrl: resolveUrl,
    pathFromUrl: pathFromUrl
  };
})();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

(function () {

  'use strict';

  // unique global id for deduping mixins.

  let dedupeId = 0;

  /**
   * @constructor
   * @extends {Function}
   */
  function MixinFunction() {}
  /** @type {(WeakMap | undefined)} */
  MixinFunction.prototype.__mixinApplications;
  /** @type {(Object | undefined)} */
  MixinFunction.prototype.__mixinSet;

  /* eslint-disable valid-jsdoc */
  /**
   * Wraps an ES6 class expression mixin such that the mixin is only applied
   * if it has not already been applied its base argument.  Also memoizes mixin
   * applications.
   *
   * @memberof Polymer
   * @template T
   * @param {T} mixin ES6 class expression mixin to wrap
   * @suppress {invalidCasts}
   */
  Polymer.dedupingMixin = function (mixin) {
    let mixinApplications = /** @type {!MixinFunction} */mixin.__mixinApplications;
    if (!mixinApplications) {
      mixinApplications = new WeakMap();
      /** @type {!MixinFunction} */mixin.__mixinApplications = mixinApplications;
    }
    // maintain a unique id for each mixin
    let mixinDedupeId = dedupeId++;
    function dedupingMixin(base) {
      let baseSet = /** @type {!MixinFunction} */base.__mixinSet;
      if (baseSet && baseSet[mixinDedupeId]) {
        return base;
      }
      let map = mixinApplications;
      let extended = map.get(base);
      if (!extended) {
        extended = /** @type {!Function} */mixin(base);
        map.set(base, extended);
      }
      // copy inherited mixin set from the extended class, or the base class
      // NOTE: we avoid use of Set here because some browser (IE11)
      // cannot extend a base Set via the constructor.
      let mixinSet = Object.create( /** @type {!MixinFunction} */extended.__mixinSet || baseSet || null);
      mixinSet[mixinDedupeId] = true;
      /** @type {!MixinFunction} */extended.__mixinSet = mixinSet;
      return extended;
    }

    return dedupingMixin;
  };
  /* eslint-enable valid-jsdoc */
})();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

(function () {
  'use strict';

  const caseMap = {};
  const DASH_TO_CAMEL = /-[a-z]/g;
  const CAMEL_TO_DASH = /([A-Z])/g;

  /**
   * Module with utilities for converting between "dash-case" and "camelCase"
   * identifiers.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module that provides utilities for converting between "dash-case"
   *   and "camelCase".
   */
  const CaseMap = {

    /**
     * Converts "dash-case" identifier (e.g. `foo-bar-baz`) to "camelCase"
     * (e.g. `fooBarBaz`).
     *
     * @memberof Polymer.CaseMap
     * @param {string} dash Dash-case identifier
     * @return {string} Camel-case representation of the identifier
     */
    dashToCamelCase(dash) {
      return caseMap[dash] || (caseMap[dash] = dash.indexOf('-') < 0 ? dash : dash.replace(DASH_TO_CAMEL, m => m[1].toUpperCase()));
    },

    /**
     * Converts "camelCase" identifier (e.g. `fooBarBaz`) to "dash-case"
     * (e.g. `foo-bar-baz`).
     *
     * @memberof Polymer.CaseMap
     * @param {string} camel Camel-case identifier
     * @return {string} Dash-case representation of the identifier
     */
    camelToDashCase(camel) {
      return caseMap[camel] || (caseMap[camel] = camel.replace(CAMEL_TO_DASH, '-$1').toLowerCase());
    }

  };

  Polymer.CaseMap = CaseMap;
})();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(5);

__webpack_require__(8);

__webpack_require__(18);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function () {
  /*
  Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  */
  'use strict';
  var nb = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
  (function () {
    function k() {
      var a = this;this.s = {};this.g = document.documentElement;var b = new za();b.rules = [];this.h = y.set(this.g, new y(b));this.i = !1;this.b = this.a = null;ob(function () {
        a.c();
      });
    }function F() {
      this.customStyles = [];this.enqueued = !1;
    }function pb() {}function ha(a) {
      this.cache = {};this.c = void 0 === a ? 100 : a;
    }function p() {}function y(a, b, c, d, e) {
      this.G = a || null;this.b = b || null;this.sa = c || [];this.P = null;this.Y = e || "";this.a = this.B = this.K = null;
    }function r() {}function za() {
      this.end = this.start = 0;this.rules = this.parent = this.previous = null;this.cssText = this.parsedCssText = "";this.atRule = !1;this.type = 0;this.parsedSelector = this.selector = this.keyframesName = "";
    }function $c(a) {
      function b(b, c) {
        Object.defineProperty(b, "innerHTML", { enumerable: c.enumerable, configurable: !0, get: c.get, set: function (b) {
            var d = this,
                e = void 0;n(this) && (e = [], M(this, function (a) {
              a !== d && e.push(a);
            }));c.set.call(this, b);if (e) for (var f = 0; f < e.length; f++) {
              var g = e[f];1 === g.__CE_state && a.disconnectedCallback(g);
            }this.ownerDocument.__CE_hasRegistry ? a.f(this) : a.l(this);
            return b;
          } });
      }function c(b, c) {
        t(b, "insertAdjacentElement", function (b, d) {
          var e = n(d);b = c.call(this, b, d);e && a.a(d);n(b) && a.b(d);return b;
        });
      }qb ? t(Element.prototype, "attachShadow", function (a) {
        return this.__CE_shadowRoot = a = qb.call(this, a);
      }) : console.warn("Custom Elements: `Element#attachShadow` was not patched.");if (Aa && Aa.get) b(Element.prototype, Aa);else if (Ba && Ba.get) b(HTMLElement.prototype, Ba);else {
        var d = Ca.call(document, "div");a.v(function (a) {
          b(a, { enumerable: !0, configurable: !0, get: function () {
              return rb.call(this, !0).innerHTML;
            }, set: function (a) {
              var b = "template" === this.localName ? this.content : this;for (d.innerHTML = a; 0 < b.childNodes.length;) Da.call(b, b.childNodes[0]);for (; 0 < d.childNodes.length;) ja.call(b, d.childNodes[0]);
            } });
        });
      }t(Element.prototype, "setAttribute", function (b, c) {
        if (1 !== this.__CE_state) return sb.call(this, b, c);var d = Ea.call(this, b);sb.call(this, b, c);c = Ea.call(this, b);a.attributeChangedCallback(this, b, d, c, null);
      });t(Element.prototype, "setAttributeNS", function (b, c, d) {
        if (1 !== this.__CE_state) return tb.call(this, b, c, d);var e = ka.call(this, b, c);tb.call(this, b, c, d);d = ka.call(this, b, c);a.attributeChangedCallback(this, c, e, d, b);
      });t(Element.prototype, "removeAttribute", function (b) {
        if (1 !== this.__CE_state) return ub.call(this, b);var c = Ea.call(this, b);ub.call(this, b);null !== c && a.attributeChangedCallback(this, b, c, null, null);
      });t(Element.prototype, "removeAttributeNS", function (b, c) {
        if (1 !== this.__CE_state) return vb.call(this, b, c);var d = ka.call(this, b, c);vb.call(this, b, c);var e = ka.call(this, b, c);d !== e && a.attributeChangedCallback(this, c, d, e, b);
      });wb ? c(HTMLElement.prototype, wb) : xb ? c(Element.prototype, xb) : console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");yb(a, Element.prototype, { La: ad, append: bd });cd(a, { lb: dd, kb: ed, vb: fd, remove: gd });
    }function cd(a, b) {
      var c = Element.prototype;c.before = function (c) {
        for (var d = [], f = 0; f < arguments.length; ++f) d[f - 0] = arguments[f];f = d.filter(function (a) {
          return a instanceof Node && n(a);
        });b.lb.apply(this, d);for (var g = 0; g < f.length; g++) a.a(f[g]);if (n(this)) for (f = 0; f < d.length; f++) g = d[f], g instanceof Element && a.b(g);
      };c.after = function (c) {
        for (var d = [], f = 0; f < arguments.length; ++f) d[f - 0] = arguments[f];f = d.filter(function (a) {
          return a instanceof Node && n(a);
        });b.kb.apply(this, d);for (var g = 0; g < f.length; g++) a.a(f[g]);if (n(this)) for (f = 0; f < d.length; f++) g = d[f], g instanceof Element && a.b(g);
      };c.replaceWith = function (c) {
        for (var d = [], f = 0; f < arguments.length; ++f) d[f - 0] = arguments[f];f = d.filter(function (a) {
          return a instanceof Node && n(a);
        });var g = n(this);b.vb.apply(this, d);for (var h = 0; h < f.length; h++) a.a(f[h]);
        if (g) for (a.a(this), f = 0; f < d.length; f++) g = d[f], g instanceof Element && a.b(g);
      };c.remove = function () {
        var c = n(this);b.remove.call(this);c && a.a(this);
      };
    }function hd(a) {
      function b(b, d) {
        Object.defineProperty(b, "textContent", { enumerable: d.enumerable, configurable: !0, get: d.get, set: function (b) {
            if (this.nodeType === Node.TEXT_NODE) d.set.call(this, b);else {
              var c = void 0;if (this.firstChild) {
                var e = this.childNodes,
                    h = e.length;if (0 < h && n(this)) {
                  c = Array(h);for (var m = 0; m < h; m++) c[m] = e[m];
                }
              }d.set.call(this, b);if (c) for (b = 0; b < c.length; b++) a.a(c[b]);
            }
          } });
      }
      t(Node.prototype, "insertBefore", function (b, d) {
        if (b instanceof DocumentFragment) {
          var c = Array.prototype.slice.apply(b.childNodes);b = zb.call(this, b, d);if (n(this)) for (d = 0; d < c.length; d++) a.b(c[d]);return b;
        }c = n(b);d = zb.call(this, b, d);c && a.a(b);n(this) && a.b(b);return d;
      });t(Node.prototype, "appendChild", function (b) {
        if (b instanceof DocumentFragment) {
          var c = Array.prototype.slice.apply(b.childNodes);b = ja.call(this, b);if (n(this)) for (var e = 0; e < c.length; e++) a.b(c[e]);return b;
        }c = n(b);e = ja.call(this, b);c && a.a(b);n(this) && a.b(b);return e;
      });t(Node.prototype, "cloneNode", function (b) {
        b = rb.call(this, b);this.ownerDocument.__CE_hasRegistry ? a.f(b) : a.l(b);return b;
      });t(Node.prototype, "removeChild", function (b) {
        var c = n(b),
            e = Da.call(this, b);c && a.a(b);return e;
      });t(Node.prototype, "replaceChild", function (b, d) {
        if (b instanceof DocumentFragment) {
          var c = Array.prototype.slice.apply(b.childNodes);b = Ab.call(this, b, d);if (n(this)) for (a.a(d), d = 0; d < c.length; d++) a.b(c[d]);return b;
        }c = n(b);var f = Ab.call(this, b, d),
            g = n(this);g && a.a(d);c && a.a(b);g && a.b(b);return f;
      });Fa && Fa.get ? b(Node.prototype, Fa) : a.v(function (a) {
        b(a, { enumerable: !0, configurable: !0, get: function () {
            for (var a = [], b = 0; b < this.childNodes.length; b++) a.push(this.childNodes[b].textContent);return a.join("");
          }, set: function (a) {
            for (; this.firstChild;) Da.call(this, this.firstChild);ja.call(this, document.createTextNode(a));
          } });
      });
    }function id(a) {
      t(Document.prototype, "createElement", function (b) {
        if (this.__CE_hasRegistry) {
          var c = a.c(b);if (c) return new c.constructor();
        }b = Ca.call(this, b);a.g(b);return b;
      });
      t(Document.prototype, "importNode", function (b, c) {
        b = jd.call(this, b, c);this.__CE_hasRegistry ? a.f(b) : a.l(b);return b;
      });t(Document.prototype, "createElementNS", function (b, c) {
        if (this.__CE_hasRegistry && (null === b || "http://www.w3.org/1999/xhtml" === b)) {
          var d = a.c(c);if (d) return new d.constructor();
        }b = kd.call(this, b, c);a.g(b);return b;
      });yb(a, Document.prototype, { La: ld, append: md });
    }function yb(a, b, c) {
      b.prepend = function (b) {
        for (var d = [], f = 0; f < arguments.length; ++f) d[f - 0] = arguments[f];f = d.filter(function (a) {
          return a instanceof Node && n(a);
        });c.La.apply(this, d);for (var g = 0; g < f.length; g++) a.a(f[g]);if (n(this)) for (f = 0; f < d.length; f++) g = d[f], g instanceof Element && a.b(g);
      };b.append = function (b) {
        for (var d = [], f = 0; f < arguments.length; ++f) d[f - 0] = arguments[f];f = d.filter(function (a) {
          return a instanceof Node && n(a);
        });c.append.apply(this, d);for (var g = 0; g < f.length; g++) a.a(f[g]);if (n(this)) for (f = 0; f < d.length; f++) g = d[f], g instanceof Element && a.b(g);
      };
    }function nd(a) {
      window.HTMLElement = function () {
        function b() {
          var b = this.constructor,
              d = a.C(b);if (!d) throw Error("The custom element being constructed was not registered with `customElements`.");
          var e = d.constructionStack;if (!e.length) return e = Ca.call(document, d.localName), Object.setPrototypeOf(e, b.prototype), e.__CE_state = 1, e.__CE_definition = d, a.g(e), e;d = e.length - 1;var f = e[d];if (f === Bb) throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");e[d] = Bb;Object.setPrototypeOf(f, b.prototype);a.g(f);return f;
        }b.prototype = od.prototype;return b;
      }();
    }function q(a) {
      this.c = !1;this.a = a;this.h = new Map();this.f = function (a) {
        return a();
      };this.b = !1;this.g = [];this.i = new Ga(a, document);
    }function Cb() {
      var a = this;this.b = this.a = void 0;this.c = new Promise(function (b) {
        a.b = b;a.a && b(a.a);
      });
    }function Ga(a, b) {
      this.b = a;this.a = b;this.N = void 0;this.b.f(this.a);"loading" === this.a.readyState && (this.N = new MutationObserver(this.f.bind(this)), this.N.observe(this.a, { childList: !0, subtree: !0 }));
    }function A() {
      this.u = new Map();this.s = new Map();this.j = [];this.h = !1;
    }function l(a, b, c) {
      if (a !== Db) throw new TypeError("Illegal constructor");a = document.createDocumentFragment();a.__proto__ = l.prototype;a.D(b, c);return a;
    }function la(a) {
      if (!a.__shady || void 0 === a.__shady.firstChild) {
        a.__shady = a.__shady || {};a.__shady.firstChild = Ha(a);a.__shady.lastChild = Ia(a);Eb(a);for (var b = a.__shady.childNodes = S(a), c = 0, d; c < b.length && (d = b[c]); c++) d.__shady = d.__shady || {}, d.__shady.parentNode = a, d.__shady.nextSibling = b[c + 1] || null, d.__shady.previousSibling = b[c - 1] || null, Fb(d);
      }
    }function pd(a) {
      var b = a && a.N;b && (b.ba.delete(a.bb), b.ba.size || (a.gb.__shady.W = null));
    }function qd(a, b) {
      a.__shady = a.__shady || {};a.__shady.W || (a.__shady.W = new ma());a.__shady.W.ba.add(b);var c = a.__shady.W;return { bb: b, N: c, gb: a, takeRecords: function () {
          return c.takeRecords();
        } };
    }function ma() {
      this.a = !1;this.addedNodes = [];this.removedNodes = [];this.ba = new Set();
    }function T(a) {
      return a.__shady && void 0 !== a.__shady.firstChild;
    }function B(a) {
      return "ShadyRoot" === a.Xa;
    }function Z(a) {
      a = a.getRootNode();if (B(a)) return a;
    }function Ja(a, b) {
      if (a && b) for (var c = Object.getOwnPropertyNames(b), d = 0, e; d < c.length && (e = c[d]); d++) {
        var f = Object.getOwnPropertyDescriptor(b, e);f && Object.defineProperty(a, e, f);
      }
    }function Ka(a, b) {
      for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];for (d = 0; d < c.length; d++) Ja(a, c[d]);return a;
    }function rd(a, b) {
      for (var c in b) a[c] = b[c];
    }function Gb(a) {
      La.push(a);Ma.textContent = Hb++;
    }function Ib(a) {
      Na || (Na = !0, Gb(na));aa.push(a);
    }function na() {
      Na = !1;for (var a = !!aa.length; aa.length;) aa.shift()();return a;
    }function sd(a, b) {
      var c = b.getRootNode();return a.map(function (a) {
        var b = c === a.target.getRootNode();if (b && a.addedNodes) {
          if (b = Array.from(a.addedNodes).filter(function (a) {
            return c === a.getRootNode();
          }), b.length) return a = Object.create(a), Object.defineProperty(a, "addedNodes", { value: b, configurable: !0 }), a;
        } else if (b) return a;
      }).filter(function (a) {
        return a;
      });
    }function Jb(a) {
      switch (a) {case "&":
          return "&amp;";case "<":
          return "&lt;";case ">":
          return "&gt;";case '"':
          return "&quot;";case "\u00a0":
          return "&nbsp;";}
    }function Kb(a) {
      for (var b = {}, c = 0; c < a.length; c++) b[a[c]] = !0;return b;
    }function Oa(a, b) {
      "template" === a.localName && (a = a.content);for (var c = "", d = b ? b(a) : a.childNodes, e = 0, f = d.length, g; e < f && (g = d[e]); e++) {
        a: {
          var h = g;var m = a;var Q = b;switch (h.nodeType) {case Node.ELEMENT_NODE:
              for (var k = h.localName, ia = "<" + k, l = h.attributes, n = 0; m = l[n]; n++) ia += " " + m.name + '="' + m.value.replace(td, Jb) + '"';ia += ">";h = ud[k] ? ia : ia + Oa(h, Q) + "</" + k + ">";break a;case Node.TEXT_NODE:
              h = h.data;h = m && vd[m.localName] ? h : h.replace(wd, Jb);break a;case Node.COMMENT_NODE:
              h = "\x3c!--" + h.data + "--\x3e";break a;default:
              throw window.console.error(h), Error("not implemented");}
        }c += h;
      }return c;
    }function U(a) {
      v.currentNode = a;return v.parentNode();
    }function Ha(a) {
      v.currentNode = a;return v.firstChild();
    }function Ia(a) {
      v.currentNode = a;return v.lastChild();
    }function Lb(a) {
      v.currentNode = a;return v.previousSibling();
    }function Mb(a) {
      v.currentNode = a;return v.nextSibling();
    }function S(a) {
      var b = [];v.currentNode = a;for (a = v.firstChild(); a;) b.push(a), a = v.nextSibling();return b;
    }function Nb(a) {
      C.currentNode = a;return C.parentNode();
    }function Ob(a) {
      C.currentNode = a;return C.firstChild();
    }function Pb(a) {
      C.currentNode = a;return C.lastChild();
    }function Qb(a) {
      C.currentNode = a;return C.previousSibling();
    }
    function Rb(a) {
      C.currentNode = a;return C.nextSibling();
    }function Sb(a) {
      var b = [];C.currentNode = a;for (a = C.firstChild(); a;) b.push(a), a = C.nextSibling();return b;
    }function Tb(a) {
      return Oa(a, function (a) {
        return S(a);
      });
    }function Ub(a) {
      switch (a.nodeType) {case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:
          a = document.createTreeWalker(a, NodeFilter.SHOW_TEXT, null, !1);for (var b = "", c; c = a.nextNode();) b += c.nodeValue;return b;default:
          return a.nodeValue;}
    }function G(a, b, c) {
      for (var d in b) {
        var e = Object.getOwnPropertyDescriptor(a, d);e && e.configurable || !e && c ? Object.defineProperty(a, d, b[d]) : c && console.warn("Could not define", d, "on", a);
      }
    }function O(a) {
      G(a, Vb);G(a, Pa);G(a, Qa);
    }function Wb(a, b, c) {
      Fb(a);c = c || null;a.__shady = a.__shady || {};b.__shady = b.__shady || {};c && (c.__shady = c.__shady || {});a.__shady.previousSibling = c ? c.__shady.previousSibling : b.lastChild;var d = a.__shady.previousSibling;d && d.__shady && (d.__shady.nextSibling = a);(d = a.__shady.nextSibling = c) && d.__shady && (d.__shady.previousSibling = a);a.__shady.parentNode = b;c ? c === b.__shady.firstChild && (b.__shady.firstChild = a) : (b.__shady.lastChild = a, b.__shady.firstChild || (b.__shady.firstChild = a));b.__shady.childNodes = null;
    }function Ra(a, b, c) {
      if (b === a) throw Error("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");if (c) {
        var d = c.__shady && c.__shady.parentNode;if (void 0 !== d && d !== a || void 0 === d && U(c) !== a) throw Error("Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.");
      }if (c === b) return b;b.parentNode && Sa(b.parentNode, b);d = Z(a);var e;if (e = d) a: {
        if (!b.__noInsertionPoint) {
          var f;"slot" === b.localName ? f = [b] : b.querySelectorAll && (f = b.querySelectorAll("slot"));if (f && f.length) {
            e = f;break a;
          }
        }e = void 0;
      }f = e;d && ("slot" === a.localName || f) && d.M();if (T(a)) {
        e = c;Eb(a);a.__shady = a.__shady || {};void 0 !== a.__shady.firstChild && (a.__shady.childNodes = null);if (b.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
          for (var g = b.childNodes, h = 0; h < g.length; h++) Wb(g[h], a, e);b.__shady = b.__shady || {};e = void 0 !== b.__shady.firstChild ? null : void 0;b.__shady.firstChild = b.__shady.lastChild = e;b.__shady.childNodes = e;
        } else Wb(b, a, e);if (Ta(a)) {
          a.__shady.root.M();var m = !0;
        } else a.__shady.root && (m = !0);
      }m || (m = B(a) ? a.host : a, c ? (c = Xb(c), Ua.call(m, b, c)) : Yb.call(m, b));Zb(a, b);f && d.ab(f);return b;
    }function Sa(a, b) {
      if (b.parentNode !== a) throw Error("The node to be removed is not a child of this node: " + b);var c = Z(b);if (T(a)) {
        b.__shady = b.__shady || {};a.__shady = a.__shady || {};b === a.__shady.firstChild && (a.__shady.firstChild = b.__shady.nextSibling);b === a.__shady.lastChild && (a.__shady.lastChild = b.__shady.previousSibling);var d = b.__shady.previousSibling;var e = b.__shady.nextSibling;d && (d.__shady = d.__shady || {}, d.__shady.nextSibling = e);e && (e.__shady = e.__shady || {}, e.__shady.previousSibling = d);b.__shady.parentNode = b.__shady.previousSibling = b.__shady.nextSibling = void 0;void 0 !== a.__shady.childNodes && (a.__shady.childNodes = null);if (Ta(a)) {
          a.__shady.root.M();var f = !0;
        }
      }$b(b);c && ((e = a && "slot" === a.localName) && (f = !0), ((d = c.hb(b)) || e) && c.M());f || (f = B(a) ? a.host : a, (!a.__shady.root && "slot" !== b.localName || f === U(b)) && ba.call(f, b));Zb(a, null, b);return b;
    }function $b(a) {
      if (a.__shady && void 0 !== a.__shady.ta) for (var b = a.childNodes, c = 0, d = b.length, e; c < d && (e = b[c]); c++) $b(e);a.__shady && (a.__shady.ta = void 0);
    }function Xb(a) {
      var b = a;a && "slot" === a.localName && (b = (b = a.__shady && a.__shady.U) && b.length ? b[0] : Xb(a.nextSibling));return b;
    }function Ta(a) {
      return (a = a && a.__shady && a.__shady.root) && a.Ba();
    }function ac(a, b) {
      "slot" === b ? (a = a.parentNode, Ta(a) && a.__shady.root.M()) : "slot" === a.localName && "name" === b && (b = Z(a)) && (b.jb(a), b.M());
    }function Zb(a, b, c) {
      if (a = a.__shady && a.__shady.W) b && a.addedNodes.push(b), c && a.removedNodes.push(c), a.xb();
    }function bc(a) {
      if (a && a.nodeType) {
        a.__shady = a.__shady || {};var b = a.__shady.ta;void 0 === b && (B(a) ? b = a : b = (b = a.parentNode) ? bc(b) : a, document.documentElement.contains(a) && (a.__shady.ta = b));return b;
      }
    }function oa(a, b, c) {
      var d = [];cc(a.childNodes, b, c, d);return d;
    }function cc(a, b, c, d) {
      for (var e = 0, f = a.length, g; e < f && (g = a[e]); e++) {
        var h;if (h = g.nodeType === Node.ELEMENT_NODE) {
          h = g;var m = b,
              Q = c,
              k = d,
              l = m(h);l && k.push(h);
          Q && Q(l) ? h = l : (cc(h.childNodes, m, Q, k), h = void 0);
        }if (h) break;
      }
    }function dc(a) {
      a = a.getRootNode();B(a) && a.Ea();
    }function ec(a, b, c) {
      pa || (pa = window.ShadyCSS && window.ShadyCSS.ScopingShim);pa && "class" === b ? pa.setElementClass(a, c) : (fc.call(a, b, c), ac(a, b));
    }function gc(a, b) {
      if (a.ownerDocument !== document) return Va.call(document, a, b);var c = Va.call(document, a, !1);if (b) {
        a = a.childNodes;b = 0;for (var d; b < a.length; b++) d = gc(a[b], !0), c.appendChild(d);
      }return c;
    }function Wa(a, b) {
      var c = [],
          d = a;for (a = a === window ? window : a.getRootNode(); d;) c.push(d), d = d.assignedSlot ? d.assignedSlot : d.nodeType === Node.DOCUMENT_FRAGMENT_NODE && d.host && (b || d !== a) ? d.host : d.parentNode;c[c.length - 1] === document && c.push(window);return c;
    }function hc(a, b) {
      if (!B) return a;a = Wa(a, !0);for (var c = 0, d, e, f, g; c < b.length; c++) if (d = b[c], f = d === window ? window : d.getRootNode(), f !== e && (g = a.indexOf(f), e = f), !B(f) || -1 < g) return d;
    }function Xa(a) {
      function b(b, d) {
        b = new a(b, d);b.ja = d && !!d.composed;return b;
      }rd(b, a);b.prototype = a.prototype;return b;
    }function ic(a, b, c) {
      if (c = b.__handlers && b.__handlers[a.type] && b.__handlers[a.type][c]) for (var d = 0, e; (e = c[d]) && a.target !== a.relatedTarget && (e.call(b, a), !a.Va); d++);
    }function xd(a) {
      var b = a.composedPath();Object.defineProperty(a, "currentTarget", { get: function () {
          return d;
        }, configurable: !0 });for (var c = b.length - 1; 0 <= c; c--) {
        var d = b[c];ic(a, d, "capture");if (a.ka) return;
      }Object.defineProperty(a, "eventPhase", { get: function () {
          return Event.AT_TARGET;
        } });var e;for (c = 0; c < b.length; c++) {
        d = b[c];var f = d.__shady && d.__shady.root;if (!c || f && f === e) if (ic(a, d, "bubble"), d !== window && (e = d.getRootNode()), a.ka) break;
      }
    }function jc(a, b, c, d, e, f) {
      for (var g = 0; g < a.length; g++) {
        var h = a[g],
            m = h.type,
            Q = h.capture,
            k = h.once,
            l = h.passive;if (b === h.node && c === m && d === Q && e === k && f === l) return g;
      }return -1;
    }function kc(a, b, c) {
      if (b) {
        if ("object" === typeof c) {
          var d = !!c.capture;var e = !!c.once;var f = !!c.passive;
        } else d = !!c, f = e = !1;var g = c && c.la || this,
            h = b.Z;if (h) {
          if (-1 < jc(h, g, a, d, e, f)) return;
        } else b.Z = [];h = function (d) {
          e && this.removeEventListener(a, b, c);d.__target || lc(d);if (g !== this) {
            var f = Object.getOwnPropertyDescriptor(d, "currentTarget");
            Object.defineProperty(d, "currentTarget", { get: function () {
                return g;
              }, configurable: !0 });
          }if (d.composed || -1 < d.composedPath().indexOf(g)) if (d.target === d.relatedTarget) d.eventPhase === Event.BUBBLING_PHASE && d.stopImmediatePropagation();else if (d.eventPhase === Event.CAPTURING_PHASE || d.bubbles || d.target === g) {
            var h = "object" === typeof b && b.handleEvent ? b.handleEvent(d) : b.call(g, d);g !== this && (f ? (Object.defineProperty(d, "currentTarget", f), f = null) : delete d.currentTarget);return h;
          }
        };b.Z.push({ node: this, type: a, capture: d,
          once: e, passive: f, Bb: h });Ya[a] ? (this.__handlers = this.__handlers || {}, this.__handlers[a] = this.__handlers[a] || { capture: [], bubble: [] }, this.__handlers[a][d ? "capture" : "bubble"].push(h)) : (this instanceof Window ? mc : nc).call(this, a, h, c);
      }
    }function oc(a, b, c) {
      if (b) {
        if ("object" === typeof c) {
          var d = !!c.capture;var e = !!c.once;var f = !!c.passive;
        } else d = !!c, f = e = !1;var g = c && c.la || this,
            h = void 0;var m = null;try {
          m = b.Z;
        } catch (Q) {}m && (e = jc(m, g, a, d, e, f), -1 < e && (h = m.splice(e, 1)[0].Bb, m.length || (b.Z = void 0)));(this instanceof Window ? pc : qc).call(this, a, h || b, c);h && Ya[a] && this.__handlers && this.__handlers[a] && (a = this.__handlers[a][d ? "capture" : "bubble"], h = a.indexOf(h), -1 < h && a.splice(h, 1));
      }
    }function yd() {
      for (var a in Ya) window.addEventListener(a, function (a) {
        a.__target || (lc(a), xd(a));
      }, !0);
    }function lc(a) {
      a.__target = a.target;a.za = a.relatedTarget;if (D.V) {
        var b = rc,
            c = Object.getPrototypeOf(a);if (!c.hasOwnProperty("__patchProto")) {
          var d = Object.create(c);d.Db = c;Ja(d, b);c.__patchProto = d;
        }a.__proto__ = c.__patchProto;
      } else Ja(a, rc);
    }function ca(a, b) {
      return { index: a, X: [], aa: b };
    }function zd(a, b, c, d) {
      var e = 0,
          f = 0,
          g = 0,
          h = 0,
          m = Math.min(b - e, d - f);if (0 == e && 0 == f) a: {
        for (g = 0; g < m; g++) if (a[g] !== c[g]) break a;g = m;
      }if (b == a.length && d == c.length) {
        h = a.length;for (var k = c.length, l = 0; l < m - g && Ad(a[--h], c[--k]);) l++;h = l;
      }e += g;f += g;b -= h;d -= h;if (!(b - e || d - f)) return [];if (e == b) {
        for (b = ca(e, 0); f < d;) b.X.push(c[f++]);return [b];
      }if (f == d) return [ca(e, b - e)];m = e;g = f;d = d - g + 1;h = b - m + 1;b = Array(d);for (k = 0; k < d; k++) b[k] = Array(h), b[k][0] = k;for (k = 0; k < h; k++) b[0][k] = k;for (k = 1; k < d; k++) for (l = 1; l < h; l++) if (a[m + l - 1] === c[g + k - 1]) b[k][l] = b[k - 1][l - 1];else {
        var n = b[k - 1][l] + 1,
            p = b[k][l - 1] + 1;b[k][l] = n < p ? n : p;
      }m = b.length - 1;g = b[0].length - 1;d = b[m][g];for (a = []; 0 < m || 0 < g;) m ? g ? (h = b[m - 1][g - 1], k = b[m - 1][g], l = b[m][g - 1], n = k < l ? k < h ? k : h : l < h ? l : h, n == h ? (h == d ? a.push(0) : (a.push(1), d = h), m--, g--) : n == k ? (a.push(3), m--, d = k) : (a.push(2), g--, d = l)) : (a.push(3), m--) : (a.push(2), g--);a.reverse();b = void 0;m = [];for (g = 0; g < a.length; g++) switch (a[g]) {case 0:
          b && (m.push(b), b = void 0);e++;f++;break;case 1:
          b || (b = ca(e, 0));b.aa++;e++;b.X.push(c[f]);f++;break;
        case 2:
          b || (b = ca(e, 0));b.aa++;e++;break;case 3:
          b || (b = ca(e, 0)), b.X.push(c[f]), f++;}b && m.push(b);return m;
    }function Ad(a, b) {
      return a === b;
    }function sc(a) {
      var b = [];do b.unshift(a); while (a = a.parentNode);return b;
    }function tc(a) {
      dc(a);return a.__shady && a.__shady.assignedSlot || null;
    }function I(a, b) {
      for (var c = Object.getOwnPropertyNames(b), d = 0; d < c.length; d++) {
        var e = c[d],
            f = Object.getOwnPropertyDescriptor(b, e);f.value ? a[e] = f.value : Object.defineProperty(a, e, f);
      }
    }function Bd() {
      var a = window.customElements && window.customElements.nativeHTMLElement || HTMLElement;I(window.Node.prototype, Cd);I(window.Window.prototype, Dd);I(window.Text.prototype, Ed);I(window.DocumentFragment.prototype, Za);I(window.Element.prototype, uc);I(window.Document.prototype, vc);window.HTMLSlotElement && I(window.HTMLSlotElement.prototype, wc);I(a.prototype, Fd);D.V && (O(window.Node.prototype), O(window.Text.prototype), O(window.DocumentFragment.prototype), O(window.Element.prototype), O(a.prototype), O(window.Document.prototype), window.HTMLSlotElement && O(window.HTMLSlotElement.prototype));
    }
    function xc(a) {
      var b = Gd.has(a);a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);return !b && a;
    }function n(a) {
      var b = a.isConnected;if (void 0 !== b) return b;for (; a && !(a.__CE_isImportDocument || a instanceof Document);) a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
    }function $a(a, b) {
      for (; b && b !== a && !b.nextSibling;) b = b.parentNode;return b && b !== a ? b.nextSibling : null;
    }function M(a, b, c) {
      c = c ? c : new Set();for (var d = a; d;) {
        if (d.nodeType === Node.ELEMENT_NODE) {
          var e = d;b(e);var f = e.localName;if ("link" === f && "import" === e.getAttribute("rel")) {
            d = e.import;if (d instanceof Node && !c.has(d)) for (c.add(d), d = d.firstChild; d; d = d.nextSibling) M(d, b, c);d = $a(a, e);continue;
          } else if ("template" === f) {
            d = $a(a, e);continue;
          }if (e = e.__CE_shadowRoot) for (e = e.firstChild; e; e = e.nextSibling) M(e, b, c);
        }d = d.firstChild ? d.firstChild : $a(a, d);
      }
    }function t(a, b, c) {
      a[b] = c;
    }function ab(a) {
      a = a.replace(J.nb, "").replace(J.port, "");var b = yc,
          c = a,
          d = new za();d.start = 0;d.end = c.length;for (var e = d, f = 0, g = c.length; f < g; f++) if ("{" === c[f]) {
        e.rules || (e.rules = []);var h = e,
            m = h.rules[h.rules.length - 1] || null;e = new za();e.start = f + 1;e.parent = h;e.previous = m;h.rules.push(e);
      } else "}" === c[f] && (e.end = f + 1, e = e.parent || d);return b(d, a);
    }function yc(a, b) {
      var c = b.substring(a.start, a.end - 1);a.parsedCssText = a.cssText = c.trim();a.parent && ((c = b.substring(a.previous ? a.previous.end : a.parent.start, a.start - 1), c = Hd(c), c = c.replace(J.Ka, " "), c = c.substring(c.lastIndexOf(";") + 1), c = a.parsedSelector = a.selector = c.trim(), a.atRule = !c.indexOf("@"), a.atRule) ? c.indexOf("@media") ? c.match(J.sb) && (a.type = K.ia, a.keyframesName = a.selector.split(J.Ka).pop()) : a.type = K.MEDIA_RULE : a.type = c.indexOf("--") ? K.STYLE_RULE : K.va);if (c = a.rules) for (var d = 0, e = c.length, f; d < e && (f = c[d]); d++) yc(f, b);return a;
    }function Hd(a) {
      return a.replace(/\\([0-9a-f]{1,6})\s/gi, function (a, c) {
        a = c;for (c = 6 - a.length; c--;) a = "0" + a;return "\\" + a;
      });
    }function zc(a, b, c) {
      c = void 0 === c ? "" : c;var d = "";if (a.cssText || a.rules) {
        var e = a.rules,
            f;if (f = e) f = e[0], f = !(f && f.selector && 0 === f.selector.indexOf("--"));
        if (f) {
          f = 0;for (var g = e.length, h; f < g && (h = e[f]); f++) d = zc(h, b, d);
        } else b ? b = a.cssText : (b = a.cssText, b = b.replace(J.Fa, "").replace(J.Ja, ""), b = b.replace(J.tb, "").replace(J.zb, "")), (d = b.trim()) && (d = "  " + d + "\n");
      }d && (a.selector && (c += a.selector + " {\n"), c += d, a.selector && (c += "}\n\n"));return c;
    }function Ac(a) {
      w = a && a.shimcssproperties ? !1 : u || !(navigator.userAgent.match("AppleWebKit/601") || !window.CSS || !CSS.supports || !CSS.supports("box-shadow", "0 0 0 var(--foo)"));
    }function V(a, b) {
      if (!a) return "";"string" === typeof a && (a = ab(a));b && W(a, b);return zc(a, w);
    }function qa(a) {
      !a.__cssRules && a.textContent && (a.__cssRules = ab(a.textContent));return a.__cssRules || null;
    }function Bc(a) {
      return !!a.parent && a.parent.type === K.ia;
    }function W(a, b, c, d) {
      if (a) {
        var e = !1,
            f = a.type;if (d && f === K.MEDIA_RULE) {
          var g = a.selector.match(Id);g && (window.matchMedia(g[1]).matches || (e = !0));
        }f === K.STYLE_RULE ? b(a) : c && f === K.ia ? c(a) : f === K.va && (e = !0);if ((a = a.rules) && !e) {
          e = 0;f = a.length;for (var h; e < f && (h = a[e]); e++) W(h, b, c, d);
        }
      }
    }function bb(a, b, c, d) {
      var e = document.createElement("style");
      b && e.setAttribute("scope", b);e.textContent = a;Cc(e, c, d);return e;
    }function Cc(a, b, c) {
      b = b || document.head;b.insertBefore(a, c && c.nextSibling || b.firstChild);P ? a.compareDocumentPosition(P) === Node.DOCUMENT_POSITION_PRECEDING && (P = a) : P = a;
    }function Dc(a, b) {
      var c = a.indexOf("var(");if (-1 === c) return b(a, "", "", "");a: {
        var d = 0;var e = c + 3;for (var f = a.length; e < f; e++) if ("(" === a[e]) d++;else if (")" === a[e] && ! --d) break a;e = -1;
      }d = a.substring(c + 4, e);c = a.substring(0, c);a = Dc(a.substring(e + 1), b);e = d.indexOf(",");return -1 === e ? b(c, d.trim(), "", a) : b(c, d.substring(0, e).trim(), d.substring(e + 1).trim(), a);
    }function ra(a, b) {
      u ? a.setAttribute("class", b) : window.ShadyDOM.nativeMethods.setAttribute.call(a, "class", b);
    }function R(a) {
      var b = a.localName,
          c = "";b ? -1 < b.indexOf("-") || (c = b, b = a.getAttribute && a.getAttribute("is") || "") : (b = a.is, c = a.extends);return { is: b, Y: c };
    }function Ec(a) {
      for (var b = 0; b < a.length; b++) {
        var c = a[b];if (c.target !== document.documentElement && c.target !== document.head) for (var d = 0; d < c.addedNodes.length; d++) {
          var e = c.addedNodes[d];
          if (e.nodeType === Node.ELEMENT_NODE) {
            var f = e.getRootNode();var g = e;var h = [];g.classList ? h = Array.from(g.classList) : g instanceof window.SVGElement && g.hasAttribute("class") && (h = g.getAttribute("class").split(/\s+/));g = h;h = g.indexOf(x.c);(g = -1 < h ? g[h + 1] : "") && f === e.ownerDocument ? x.a(e, g, !0) : f.nodeType === Node.DOCUMENT_FRAGMENT_NODE && (f = f.host) && (f = R(f).is, g !== f && (g && x.a(e, g, !0), x.a(e, f)));
          }
        }
      }
    }function Jd(a) {
      if (a = sa[a]) a._applyShimCurrentVersion = a._applyShimCurrentVersion || 0, a._applyShimValidatingVersion = a._applyShimValidatingVersion || 0, a._applyShimNextVersion = (a._applyShimNextVersion || 0) + 1;
    }function Fc(a) {
      return a._applyShimCurrentVersion === a._applyShimNextVersion;
    }function Kd(a) {
      a._applyShimValidatingVersion = a._applyShimNextVersion;a.b || (a.b = !0, Ld.then(function () {
        a._applyShimCurrentVersion = a._applyShimNextVersion;a.b = !1;
      }));
    }function ob(a) {
      requestAnimationFrame(function () {
        Gc ? Gc(a) : (cb || (cb = new Promise(function (a) {
          db = a;
        }), "complete" === document.readyState ? db() : document.addEventListener("readystatechange", function () {
          "complete" === document.readyState && db();
        })), cb.then(function () {
          a && a();
        }));
      });
    }(function () {
      if (!function () {
        var a = document.createEvent("Event");a.initEvent("foo", !0, !0);a.preventDefault();return a.defaultPrevented;
      }()) {
        var a = Event.prototype.preventDefault;Event.prototype.preventDefault = function () {
          this.cancelable && (a.call(this), Object.defineProperty(this, "defaultPrevented", { get: function () {
              return !0;
            }, configurable: !0 }));
        };
      }var b = /Trident/.test(navigator.userAgent);if (!window.CustomEvent || b && "function" !== typeof window.CustomEvent) window.CustomEvent = function (a, b) {
        b = b || {};var c = document.createEvent("CustomEvent");c.initCustomEvent(a, !!b.bubbles, !!b.cancelable, b.detail);return c;
      }, window.CustomEvent.prototype = window.Event.prototype;if (!window.Event || b && "function" !== typeof window.Event) {
        var c = window.Event;window.Event = function (a, b) {
          b = b || {};var c = document.createEvent("Event");c.initEvent(a, !!b.bubbles, !!b.cancelable);return c;
        };if (c) for (var d in c) window.Event[d] = c[d];window.Event.prototype = c.prototype;
      }if (!window.MouseEvent || b && "function" !== typeof window.MouseEvent) {
        b = window.MouseEvent;window.MouseEvent = function (a, b) {
          b = b || {};var c = document.createEvent("MouseEvent");c.initMouseEvent(a, !!b.bubbles, !!b.cancelable, b.view || window, b.detail, b.screenX, b.screenY, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, b.relatedTarget);return c;
        };if (b) for (d in b) window.MouseEvent[d] = b[d];window.MouseEvent.prototype = b.prototype;
      }Array.from || (Array.from = function (a) {
        return [].slice.call(a);
      });Object.assign || (Object.assign = function (a, b) {
        for (var c = [].slice.call(arguments, 1), d = 0, e; d < c.length; d++) if (e = c[d]) for (var f = a, k = e, l = Object.getOwnPropertyNames(k), n = 0; n < l.length; n++) e = l[n], f[e] = k[e];return a;
      });
    })(window.WebComponents);(function () {
      function a() {}var b = "undefined" === typeof HTMLTemplateElement;/Trident/.test(navigator.userAgent) && function () {
        var a = Document.prototype.importNode;Document.prototype.importNode = function () {
          var b = a.apply(this, arguments);if (b.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            var c = this.createDocumentFragment();c.appendChild(b);return c;
          }return b;
        };
      }();
      var c = Node.prototype.cloneNode,
          d = Document.prototype.createElement,
          e = Document.prototype.importNode,
          f = function () {
        if (!b) {
          var a = document.createElement("template"),
              c = document.createElement("template");c.content.appendChild(document.createElement("div"));a.content.appendChild(c);a = a.cloneNode(!0);return 0 === a.content.childNodes.length || 0 === a.content.firstChild.content.childNodes.length || !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment);
        }
      }();if (b) {
        var g = function (a) {
          switch (a) {case "&":
              return "&amp;";
            case "<":
              return "&lt;";case ">":
              return "&gt;";case "\u00a0":
              return "&nbsp;";}
        },
            h = function (b) {
          Object.defineProperty(b, "innerHTML", { get: function () {
              for (var a = "", b = this.content.firstChild; b; b = b.nextSibling) a += b.outerHTML || b.data.replace(r, g);return a;
            }, set: function (b) {
              m.body.innerHTML = b;for (a.b(m); this.content.firstChild;) this.content.removeChild(this.content.firstChild);for (; m.body.firstChild;) this.content.appendChild(m.body.firstChild);
            }, configurable: !0 });
        },
            m = document.implementation.createHTMLDocument("template"),
            k = !0,
            l = document.createElement("style");l.textContent = "template{display:none;}";var n = document.head;n.insertBefore(l, n.firstElementChild);a.prototype = Object.create(HTMLElement.prototype);var p = !document.createElement("div").hasOwnProperty("innerHTML");a.O = function (b) {
          if (!b.content) {
            b.content = m.createDocumentFragment();for (var c; c = b.firstChild;) b.content.appendChild(c);if (p) b.__proto__ = a.prototype;else if (b.cloneNode = function (b) {
              return a.a(this, b);
            }, k) try {
              h(b);
            } catch (z) {
              k = !1;
            }a.b(b.content);
          }
        };h(a.prototype);
        a.b = function (b) {
          b = b.querySelectorAll("template");for (var c = 0, d = b.length, e; c < d && (e = b[c]); c++) a.O(e);
        };document.addEventListener("DOMContentLoaded", function () {
          a.b(document);
        });Document.prototype.createElement = function () {
          var b = d.apply(this, arguments);"template" === b.localName && a.O(b);return b;
        };var r = /[&\u00A0<>]/g;
      }if (b || f) a.a = function (a, b) {
        var d = c.call(a, !1);this.O && this.O(d);b && (d.content.appendChild(c.call(a.content, !0)), this.ra(d.content, a.content));return d;
      }, a.prototype.cloneNode = function (b) {
        return a.a(this, b);
      }, a.ra = function (a, b) {
        if (b.querySelectorAll) {
          b = b.querySelectorAll("template");a = a.querySelectorAll("template");for (var c = 0, d = a.length, e, f; c < d; c++) f = b[c], e = a[c], this.O && this.O(f), e.parentNode.replaceChild(f.cloneNode(!0), e);
        }
      }, Node.prototype.cloneNode = function (b) {
        if (this instanceof DocumentFragment) {
          if (b) var d = this.ownerDocument.importNode(this, !0);else return this.ownerDocument.createDocumentFragment();
        } else d = c.call(this, b);b && a.ra(d, this);return d;
      }, Document.prototype.importNode = function (b, c) {
        if ("template" === b.localName) return a.a(b, c);var d = e.call(this, b, c);c && a.ra(d, b);return d;
      }, f && (window.HTMLTemplateElement.prototype.cloneNode = function (b) {
        return a.a(this, b);
      });b && (window.HTMLTemplateElement = a);
    })();!function (a, b) {
       true ? module.exports = b() : "function" == typeof define && define.Gb ? define(b) : a.ES6Promise = b();
    }(window, function () {
      function a(a, b) {
        B[v] = a;B[v + 1] = b;v += 2;2 === v && (D ? D(g) : N());
      }function b() {
        return function () {
          return process.Jb(g);
        };
      }function c() {
        return "undefined" != typeof C ? function () {
          C(g);
        } : f();
      }function d() {
        var a = 0,
            b = new J(g),
            c = document.createTextNode("");return b.observe(c, { characterData: !0 }), function () {
          c.data = a = ++a % 2;
        };
      }function e() {
        var a = new MessageChannel();return a.port1.onmessage = g, function () {
          return a.port2.postMessage(0);
        };
      }function f() {
        var a = setTimeout;return function () {
          return a(g, 1);
        };
      }function g() {
        for (var a = 0; a < v; a += 2) (0, B[a])(B[a + 1]), B[a] = void 0, B[a + 1] = void 0;v = 0;
      }function h() {
        try {
          var a = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"vertx\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));return C = a.Lb || a.Kb, c();
        } catch (Hc) {
          return f();
        }
      }function m(b, c) {
        var d = arguments,
            e = this,
            f = new this.constructor(l);void 0 === f[K] && Ic(f);var g = e.o;return g ? !function () {
          var b = d[g - 1];a(function () {
            return Jc(g, f, b, e.m);
          });
        }() : w(e, f, b, c), f;
      }function k(a) {
        if (a && "object" == typeof a && a.constructor === this) return a;var b = new this(l);return z(b, a), b;
      }function l() {}function n(a) {
        try {
          return a.then;
        } catch (Hc) {
          return M.error = Hc, M;
        }
      }function p(a, b, c, d) {
        try {
          a.call(b, c, d);
        } catch (Od) {
          return Od;
        }
      }function r(b, c, d) {
        a(function (a) {
          var b = !1,
              e = p(d, c, function (d) {
            b || (b = !0, c !== d ? z(a, d) : q(a, d));
          }, function (c) {
            b || (b = !0, L(a, c));
          });!b && e && (b = !0, L(a, e));
        }, b);
      }function y(a, b) {
        b.o === I ? q(a, b.m) : b.o === H ? L(a, b.m) : w(b, void 0, function (b) {
          return z(a, b);
        }, function (b) {
          return L(a, b);
        });
      }function x(a, b, c) {
        b.constructor === a.constructor && c === m && b.constructor.resolve === k ? y(a, b) : c === M ? (L(a, M.error), M.error = null) : void 0 === c ? q(a, b) : "function" == typeof c ? r(a, b, c) : q(a, b);
      }function z(a, b) {
        if (a === b) L(a, new TypeError("You cannot resolve a promise with itself"));else {
          var c = typeof b;null === b || "object" !== c && "function" !== c ? q(a, b) : x(a, b, n(b));
        }
      }function u(a) {
        a.Ca && a.Ca(a.m);X(a);
      }function q(b, c) {
        b.o === G && (b.m = c, b.o = I, 0 !== b.T.length && a(X, b));
      }function L(b, c) {
        b.o === G && (b.o = H, b.m = c, a(u, b));
      }function w(b, c, d, e) {
        var f = b.T,
            g = f.length;b.Ca = null;f[g] = c;f[g + I] = d;f[g + H] = e;0 === g && b.o && a(X, b);
      }function X(a) {
        var b = a.T,
            c = a.o;if (0 !== b.length) {
          for (var d, e, f = a.m, g = 0; g < b.length; g += 3) d = b[g], e = b[g + c], d ? Jc(c, d, e, f) : e(f);a.T.length = 0;
        }
      }function Kc() {
        this.error = null;
      }function Jc(a, b, c, d) {
        var e = "function" == typeof c,
            f = void 0,
            g = void 0,
            h = void 0,
            X = void 0;
        if (e) {
          try {
            var k = c(d);
          } catch (Pd) {
            k = (O.error = Pd, O);
          }if (f = k, f === O ? (X = !0, g = f.error, f.error = null) : h = !0, b === f) return void L(b, new TypeError("A promises callback cannot return that same promise."));
        } else f = d, h = !0;b.o !== G || (e && h ? z(b, f) : X ? L(b, g) : a === I ? q(b, f) : a === H && L(b, f));
      }function Lc(a, b) {
        try {
          b(function (b) {
            z(a, b);
          }, function (b) {
            L(a, b);
          });
        } catch (Md) {
          L(a, Md);
        }
      }function Ic(a) {
        a[K] = P++;a.o = void 0;a.m = void 0;a.T = [];
      }function da(a, b) {
        this.fb = a;this.J = new a(l);this.J[K] || Ic(this.J);A(b) ? (this.length = b.length, this.$ = b.length, this.m = Array(this.length), 0 === this.length ? q(this.J, this.m) : (this.length = this.length || 0, this.eb(b), 0 === this.$ && q(this.J, this.m))) : L(this.J, Error("Array Methods must be provided an Array"));
      }function E(a) {
        this[K] = P++;this.m = this.o = void 0;this.T = [];if (l !== a) {
          if ("function" != typeof a) throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");if (this instanceof E) Lc(this, a);else throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
        }
      }var t = void 0,
          A = t = Array.isArray ? Array.isArray : function (a) {
        return "[object Array]" === Object.prototype.toString.call(a);
      },
          v = 0,
          C = void 0,
          D = void 0,
          F = (t = "undefined" != typeof window ? window : void 0) || {},
          J = F.MutationObserver || F.WebKitMutationObserver;F = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;var B = Array(1E3),
          N = void 0;N = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process) ? b() : J ? d() : F ? e() : t || "function" != "function" ? f() : h();var K = Math.random().toString(36).substring(16),
          G = void 0,
          I = 1,
          H = 2,
          M = new Kc(),
          O = new Kc(),
          P = 0;return da.prototype.eb = function (a) {
        for (var b = 0; this.o === G && b < a.length; b++) this.cb(a[b], b);
      }, da.prototype.cb = function (a, b) {
        var c = this.fb,
            d = c.resolve;d === k ? (d = n(a), d === m && a.o !== G ? this.oa(a.o, b, a.m) : "function" != typeof d ? (this.$--, this.m[b] = a) : c === E ? (c = new c(l), x(c, a, d), this.pa(c, b)) : this.pa(new c(function (b) {
          return b(a);
        }), b)) : this.pa(d(a), b);
      }, da.prototype.oa = function (a, b, c) {
        var d = this.J;d.o === G && (this.$--, a === H ? L(d, c) : this.m[b] = c);0 === this.$ && q(d, this.m);
      }, da.prototype.pa = function (a, b) {
        var c = this;w(a, void 0, function (a) {
          return c.oa(I, b, a);
        }, function (a) {
          return c.oa(H, b, a);
        });
      }, E.g = function (a) {
        return new da(this, a).J;
      }, E.h = function (a) {
        var b = this;return new b(A(a) ? function (c, d) {
          for (var e = a.length, f = 0; f < e; f++) b.resolve(a[f]).then(c, d);
        } : function (a, b) {
          return b(new TypeError("You must pass an array to race."));
        });
      }, E.resolve = k, E.i = function (a) {
        var b = new this(l);return L(b, a), b;
      }, E.f = function (a) {
        D = a;
      }, E.c = function (b) {
        a = b;
      }, E.b = a, E.prototype = { constructor: E, then: m, "catch": function (a) {
          return this.then(null, a);
        } }, E.a = function () {
        var a = void 0;if ("undefined" != typeof global) a = global;else if ("undefined" != typeof self) a = self;else try {
          a = Function("return this")();
        } catch (Nd) {
          throw Error("polyfill failed because global object is unavailable in this environment");
        }var b = a.Promise;if (b) {
          var c = null;try {
            c = Object.prototype.toString.call(b.resolve());
          } catch (Nd) {}if ("[object Promise]" === c && !b.Hb) return;
        }a.Promise = E;
      }, E.Promise = E, E.a(), E;
    });(function (a) {
      function b(a, b) {
        if ("function" === typeof window.CustomEvent) return new CustomEvent(a, b);var c = document.createEvent("CustomEvent");c.initCustomEvent(a, !!b.bubbles, !!b.cancelable, b.detail);return c;
      }function c(a) {
        if (n) return a.ownerDocument !== document ? a.ownerDocument : null;var b = a.__importDoc;if (!b && a.parentNode) {
          b = a.parentNode;if ("function" === typeof b.closest) b = b.closest("link[rel=import]");else for (; !h(b) && (b = b.parentNode););a.__importDoc = b;
        }return b;
      }function d(a) {
        var b = document.querySelectorAll("link[rel=import]:not(import-dependency)"),
            c = b.length;c ? l(b, function (b) {
          return g(b, function () {
            --c || a();
          });
        }) : a();
      }function e(a) {
        function b() {
          "loading" !== document.readyState && document.body && (document.removeEventListener("readystatechange", b), a());
        }document.addEventListener("readystatechange", b);b();
      }function f(a) {
        e(function () {
          return d(function () {
            return a && a();
          });
        });
      }function g(a, b) {
        if (a.__loaded) b && b();else if ("script" === a.localName && !a.src || "style" === a.localName && !a.firstChild) a.__loaded = !0, b && b();else {
          var c = function (d) {
            a.removeEventListener(d.type, c);a.__loaded = !0;b && b();
          };a.addEventListener("load", c);w && "style" === a.localName || a.addEventListener("error", c);
        }
      }function h(a) {
        return a.nodeType === Node.ELEMENT_NODE && "link" === a.localName && "import" === a.rel;
      }function k() {
        var a = this;this.a = {};this.b = 0;this.f = new MutationObserver(function (b) {
          return a.l(b);
        });this.f.observe(document.head, { childList: !0, subtree: !0 });this.c(document);
      }function l(a, b, c) {
        var d = a ? a.length : 0,
            e = c ? -1 : 1;for (c = c ? d - 1 : 0; c < d && 0 <= c; c += e) b(a[c], c);
      }var n = "import" in document.createElement("link"),
          p = null;!1 === "currentScript" in document && Object.defineProperty(document, "currentScript", { get: function () {
          return p || ("complete" !== document.readyState ? document.scripts[document.scripts.length - 1] : null);
        }, configurable: !0 });var q = /(^\/)|(^#)|(^[\w-\d]*:)/,
          r = /(url\()([^)]*)(\))/g,
          x = /(@import[\s]+(?!url\())([^;]*)(;)/g,
          y = /(<link[^>]*)(rel=['|"]?stylesheet['|"]?[^>]*>)/g,
          z = { ob: function (a, b) {
          a.href && a.setAttribute("href", z.ua(a.getAttribute("href"), b));a.src && a.setAttribute("src", z.ua(a.getAttribute("src"), b));
          if ("style" === a.localName) {
            var c = z.Ma(a.textContent, b, r);a.textContent = z.Ma(c, b, x);
          }
        }, Ma: function (a, b, c) {
          return a.replace(c, function (a, c, d, e) {
            a = d.replace(/["']/g, "");b && (a = z.Na(a, b));return c + "'" + a + "'" + e;
          });
        }, ua: function (a, b) {
          return a && q.test(a) ? a : z.Na(a, b);
        }, Na: function (a, b) {
          if (void 0 === z.ma) {
            z.ma = !1;try {
              var c = new URL("b", "http://a");c.pathname = "c%20d";z.ma = "http://a/c%20d" === c.href;
            } catch (Lc) {}
          }if (z.ma) return new URL(a, b).href;c = z.$a;c || (c = document.implementation.createHTMLDocument("temp"), z.$a = c, c.xa = c.createElement("base"), c.head.appendChild(c.xa), c.wa = c.createElement("a"));c.xa.href = b;c.wa.href = a;return c.wa.href || a;
        } },
          v = { async: !0, load: function (a, b, c) {
          if (a) {
            if (a.match(/^data:/)) {
              a = a.split(",");var d = a[1];d = -1 < a[0].indexOf(";base64") ? atob(d) : decodeURIComponent(d);b(d);
            } else {
              var e = new XMLHttpRequest();e.open("GET", a, v.async);e.onload = function () {
                var a = e.responseURL || e.getResponseHeader("Location");a && !a.indexOf("/") && (a = (location.origin || location.protocol + "//" + location.host) + a);var d = e.response || e.responseText;
                304 === e.status || !e.status || 200 <= e.status && 300 > e.status ? b(d, a) : c(d);
              };e.send();
            }
          } else c("error: href must be specified");
        } },
          w = /Trident/.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent);k.prototype.c = function (a) {
        var b = this;a = a.querySelectorAll("link[rel=import]");l(a, function (a) {
          return b.h(a);
        });
      };k.prototype.h = function (a) {
        var b = this,
            c = a.href;if (void 0 !== this.a[c]) {
          var d = this.a[c];d && d.__loaded && (a.import = d, this.g(a));
        } else this.b++, this.a[c] = "pending", v.load(c, function (a, d) {
          a = b.s(a, d || c);
          b.a[c] = a;b.b--;b.c(a);b.i();
        }, function () {
          b.a[c] = null;b.b--;b.i();
        });
      };k.prototype.s = function (a, b) {
        if (!a) return document.createDocumentFragment();w && (a = a.replace(y, function (a, b, c) {
          return -1 === a.indexOf("type=") ? b + " type=import-disable " + c : a;
        }));var c = document.createElement("template");c.innerHTML = a;if (c.content) a = c.content;else for (a = document.createDocumentFragment(); c.firstChild;) a.appendChild(c.firstChild);if (c = a.querySelector("base")) b = z.ua(c.getAttribute("href"), b), c.removeAttribute("href");c = a.querySelectorAll('link[rel=import], link[rel=stylesheet][href][type=import-disable],\n    style:not([type]), link[rel=stylesheet][href]:not([type]),\n    script:not([type]), script[type="application/javascript"],\n    script[type="text/javascript"]');
        var d = 0;l(c, function (a) {
          g(a);z.ob(a, b);a.setAttribute("import-dependency", "");"script" === a.localName && !a.src && a.textContent && (a.setAttribute("src", "data:text/javascript;charset=utf-8," + encodeURIComponent(a.textContent + ("\n//# sourceURL=" + b + (d ? "-" + d : "") + ".js\n"))), a.textContent = "", d++);
        });return a;
      };k.prototype.i = function () {
        var a = this;if (!this.b) {
          this.f.disconnect();this.flatten(document);var b = !1,
              c = !1,
              d = function () {
            c && b && (a.c(document), a.b || (a.f.observe(document.head, { childList: !0, subtree: !0 }), a.j()));
          };
          this.v(function () {
            c = !0;d();
          });this.u(function () {
            b = !0;d();
          });
        }
      };k.prototype.flatten = function (a) {
        var b = this;a = a.querySelectorAll("link[rel=import]");l(a, function (a) {
          var c = b.a[a.href];(a.import = c) && c.nodeType === Node.DOCUMENT_FRAGMENT_NODE && (b.a[a.href] = a, a.readyState = "loading", a.import = a, b.flatten(c), a.appendChild(c));
        });
      };k.prototype.u = function (a) {
        function b(e) {
          if (e < d) {
            var f = c[e],
                h = document.createElement("script");f.removeAttribute("import-dependency");l(f.attributes, function (a) {
              return h.setAttribute(a.name, a.value);
            });p = h;f.parentNode.replaceChild(h, f);g(h, function () {
              p = null;b(e + 1);
            });
          } else a();
        }var c = document.querySelectorAll("script[import-dependency]"),
            d = c.length;b(0);
      };k.prototype.v = function (a) {
        var b = document.querySelectorAll("style[import-dependency],\n    link[rel=stylesheet][import-dependency]"),
            d = b.length;if (d) {
          var e = w && !!document.querySelector("link[rel=stylesheet][href][type=import-disable]");l(b, function (b) {
            g(b, function () {
              b.removeAttribute("import-dependency");--d || a();
            });if (e && b.parentNode !== document.head) {
              var f = document.createElement(b.localName);f.__appliedElement = b;f.setAttribute("type", "import-placeholder");b.parentNode.insertBefore(f, b.nextSibling);for (f = c(b); f && c(f);) f = c(f);f.parentNode !== document.head && (f = null);document.head.insertBefore(b, f);b.removeAttribute("type");
            }
          });
        } else a();
      };k.prototype.j = function () {
        var a = this,
            b = document.querySelectorAll("link[rel=import]");l(b, function (b) {
          return a.g(b);
        }, !0);
      };k.prototype.g = function (a) {
        a.__loaded || (a.__loaded = !0, a.import && (a.import.readyState = "complete"), a.dispatchEvent(b(a.import ? "load" : "error", { bubbles: !1, cancelable: !1, detail: void 0 })));
      };k.prototype.l = function (a) {
        var b = this;l(a, function (a) {
          return l(a.addedNodes, function (a) {
            a && a.nodeType === Node.ELEMENT_NODE && (h(a) ? b.h(a) : b.c(a));
          });
        });
      };if (n) {
        var u = document.querySelectorAll("link[rel=import]");l(u, function (a) {
          a.import && "loading" === a.import.readyState || (a.__loaded = !0);
        });u = function (a) {
          a = a.target;h(a) && (a.__loaded = !0);
        };document.addEventListener("load", u, !0);document.addEventListener("error", u, !0);
      } else {
        var t = Object.getOwnPropertyDescriptor(Node.prototype, "baseURI");Object.defineProperty((!t || t.configurable ? Node : Element).prototype, "baseURI", { get: function () {
            var a = h(this) ? this : c(this);return a ? a.href : t && t.get ? t.get.call(this) : (document.querySelector("base") || window.location).href;
          }, configurable: !0, enumerable: !0 });e(function () {
          return new k();
        });
      }f(function () {
        return document.dispatchEvent(b("HTMLImportsLoaded", { cancelable: !0, bubbles: !0, detail: void 0 }));
      });a.useNative = n;a.whenReady = f;a.importForElement = c;
    })(window.HTMLImports = window.HTMLImports || {});(function () {
      window.WebComponents = window.WebComponents || { flags: {} };var a = document.querySelector('script[src*="webcomponents-lite.js"]'),
          b = /wc-(.+)/,
          c = {};if (!c.noOpts) {
        location.search.slice(1).split("&").forEach(function (a) {
          a = a.split("=");var d;a[0] && (d = a[0].match(b)) && (c[d[1]] = a[1] || !0);
        });if (a) for (var d = 0, e; e = a.attributes[d]; d++) "src" !== e.name && (c[e.name] = e.value || !0);c.log && c.log.split ? (a = c.log.split(","), c.log = {}, a.forEach(function (a) {
          c.log[a] = !0;
        })) : c.log = {};
      }window.WebComponents.flags = c;if (a = c.shadydom) window.ShadyDOM = window.ShadyDOM || {}, window.ShadyDOM.force = a;(a = c.register || c.ce) && window.customElements && (window.customElements.forcePolyfill = a);
    })();var D = window.ShadyDOM || {};D.pb = !(!Element.prototype.attachShadow || !Node.prototype.getRootNode);var eb = Object.getOwnPropertyDescriptor(Node.prototype, "firstChild");D.V = !!(eb && eb.configurable && eb.get);D.Ia = D.force || !D.pb;var Y = Element.prototype,
        Mc = Y.matches || Y.matchesSelector || Y.mozMatchesSelector || Y.msMatchesSelector || Y.oMatchesSelector || Y.webkitMatchesSelector,
        Ma = document.createTextNode(""),
        Hb = 0,
        La = [];new MutationObserver(function () {
      for (; La.length;) try {
        La.shift()();
      } catch (a) {
        throw Ma.textContent = Hb++, a;
      }
    }).observe(Ma, { characterData: !0 });var aa = [],
        Na;na.list = aa;ma.prototype.xb = function () {
      var a = this;this.a || (this.a = !0, Gb(function () {
        a.b();
      }));
    };ma.prototype.b = function () {
      if (this.a) {
        this.a = !1;var a = this.takeRecords();a.length && this.ba.forEach(function (b) {
          b(a);
        });
      }
    };ma.prototype.takeRecords = function () {
      if (this.addedNodes.length || this.removedNodes.length) {
        var a = [{ addedNodes: this.addedNodes, removedNodes: this.removedNodes }];
        this.addedNodes = [];this.removedNodes = [];return a;
      }return [];
    };var Yb = Element.prototype.appendChild,
        Ua = Element.prototype.insertBefore,
        ba = Element.prototype.removeChild,
        fc = Element.prototype.setAttribute,
        Nc = Element.prototype.removeAttribute,
        fb = Element.prototype.cloneNode,
        Va = Document.prototype.importNode,
        nc = Element.prototype.addEventListener,
        qc = Element.prototype.removeEventListener,
        mc = Window.prototype.addEventListener,
        pc = Window.prototype.removeEventListener,
        gb = Element.prototype.dispatchEvent,
        Qd = Object.freeze({ appendChild: Yb,
      insertBefore: Ua, removeChild: ba, setAttribute: fc, removeAttribute: Nc, cloneNode: fb, importNode: Va, addEventListener: nc, removeEventListener: qc, Mb: mc, Nb: pc, dispatchEvent: gb, querySelector: Element.prototype.querySelector, querySelectorAll: Element.prototype.querySelectorAll }),
        td = /[&\u00A0"]/g,
        wd = /[&\u00A0<>]/g,
        ud = Kb("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),
        vd = Kb("style script xmp iframe noembed noframes plaintext noscript".split(" ")),
        v = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, !1),
        C = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT, null, !1),
        Rd = Object.freeze({ parentNode: U, firstChild: Ha, lastChild: Ia, previousSibling: Lb, nextSibling: Mb, childNodes: S, parentElement: Nb, firstElementChild: Ob, lastElementChild: Pb, previousElementSibling: Qb, nextElementSibling: Rb, children: Sb, innerHTML: Tb, textContent: Ub }),
        hb = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML") || Object.getOwnPropertyDescriptor(HTMLElement.prototype, "innerHTML"),
        ta = document.implementation.createHTMLDocument("inert").createElement("div"),
        ib = Object.getOwnPropertyDescriptor(Document.prototype, "activeElement"),
        Vb = { parentElement: { get: function () {
          var a = this.__shady && this.__shady.parentNode;a && a.nodeType !== Node.ELEMENT_NODE && (a = null);return void 0 !== a ? a : Nb(this);
        }, configurable: !0 }, parentNode: { get: function () {
          var a = this.__shady && this.__shady.parentNode;return void 0 !== a ? a : U(this);
        }, configurable: !0 }, nextSibling: { get: function () {
          var a = this.__shady && this.__shady.nextSibling;return void 0 !== a ? a : Mb(this);
        }, configurable: !0 }, previousSibling: { get: function () {
          var a = this.__shady && this.__shady.previousSibling;return void 0 !== a ? a : Lb(this);
        }, configurable: !0 }, className: { get: function () {
          return this.getAttribute("class") || "";
        }, set: function (a) {
          this.setAttribute("class", a);
        }, configurable: !0 }, nextElementSibling: { get: function () {
          if (this.__shady && void 0 !== this.__shady.nextSibling) {
            for (var a = this.nextSibling; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.nextSibling;return a;
          }return Rb(this);
        }, configurable: !0 }, previousElementSibling: { get: function () {
          if (this.__shady && void 0 !== this.__shady.previousSibling) {
            for (var a = this.previousSibling; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.previousSibling;return a;
          }return Qb(this);
        }, configurable: !0 } },
        Pa = { childNodes: { get: function () {
          if (T(this)) {
            if (!this.__shady.childNodes) {
              this.__shady.childNodes = [];for (var a = this.firstChild; a; a = a.nextSibling) this.__shady.childNodes.push(a);
            }var b = this.__shady.childNodes;
          } else b = S(this);b.item = function (a) {
            return b[a];
          };return b;
        }, configurable: !0 }, childElementCount: { get: function () {
          return this.children.length;
        }, configurable: !0 }, firstChild: { get: function () {
          var a = this.__shady && this.__shady.firstChild;return void 0 !== a ? a : Ha(this);
        }, configurable: !0 }, lastChild: { get: function () {
          var a = this.__shady && this.__shady.lastChild;return void 0 !== a ? a : Ia(this);
        }, configurable: !0 }, textContent: { get: function () {
          if (T(this)) {
            for (var a = [], b = 0, c = this.childNodes, d; d = c[b]; b++) d.nodeType !== Node.COMMENT_NODE && a.push(d.textContent);return a.join("");
          }return Ub(this);
        }, set: function (a) {
          switch (this.nodeType) {case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:
              for (; this.firstChild;) this.removeChild(this.firstChild);
              this.appendChild(document.createTextNode(a));break;default:
              this.nodeValue = a;}
        }, configurable: !0 }, firstElementChild: { get: function () {
          if (this.__shady && void 0 !== this.__shady.firstChild) {
            for (var a = this.firstChild; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.nextSibling;return a;
          }return Ob(this);
        }, configurable: !0 }, lastElementChild: { get: function () {
          if (this.__shady && void 0 !== this.__shady.lastChild) {
            for (var a = this.lastChild; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.previousSibling;return a;
          }return Pb(this);
        }, configurable: !0 },
      children: { get: function () {
          var a;T(this) ? a = Array.prototype.filter.call(this.childNodes, function (a) {
            return a.nodeType === Node.ELEMENT_NODE;
          }) : a = Sb(this);a.item = function (b) {
            return a[b];
          };return a;
        }, configurable: !0 }, innerHTML: { get: function () {
          var a = "template" === this.localName ? this.content : this;return T(this) ? Oa(a) : Tb(a);
        }, set: function (a) {
          for (var b = "template" === this.localName ? this.content : this; b.firstChild;) b.removeChild(b.firstChild);for (hb && hb.set ? hb.set.call(ta, a) : ta.innerHTML = a; ta.firstChild;) b.appendChild(ta.firstChild);
        },
        configurable: !0 } },
        Oc = { shadowRoot: { get: function () {
          return this.__shady && this.__shady.ub || null;
        }, configurable: !0 } },
        Qa = { activeElement: { get: function () {
          var a = ib && ib.get ? ib.get.call(document) : D.V ? void 0 : document.activeElement;if (a && a.nodeType) {
            var b = !!B(this);if (this === document || b && this.host !== a && this.host.contains(a)) {
              for (b = Z(a); b && b !== this;) a = b.host, b = Z(a);a = this === document ? b ? null : a : b === this ? a : null;
            } else a = null;
          } else a = null;return a;
        }, set: function () {}, configurable: !0 } },
        Fb = D.V ? function () {} : function (a) {
      a.__shady && a.__shady.Ya || (a.__shady = a.__shady || {}, a.__shady.Ya = !0, G(a, Vb, !0));
    },
        Eb = D.V ? function () {} : function (a) {
      a.__shady && a.__shady.Wa || (a.__shady = a.__shady || {}, a.__shady.Wa = !0, G(a, Pa, !0), G(a, Oc, !0));
    },
        pa = null,
        Sd = { blur: !0, focus: !0, focusin: !0, focusout: !0, click: !0, dblclick: !0, mousedown: !0, mouseenter: !0, mouseleave: !0, mousemove: !0, mouseout: !0, mouseover: !0, mouseup: !0, wheel: !0, beforeinput: !0, input: !0, keydown: !0, keyup: !0, compositionstart: !0, compositionupdate: !0, compositionend: !0, touchstart: !0, touchend: !0, touchmove: !0,
      touchcancel: !0, pointerover: !0, pointerenter: !0, pointerdown: !0, pointermove: !0, pointerup: !0, pointercancel: !0, pointerout: !0, pointerleave: !0, gotpointercapture: !0, lostpointercapture: !0, dragstart: !0, drag: !0, dragenter: !0, dragleave: !0, dragover: !0, drop: !0, dragend: !0, DOMActivate: !0, DOMFocusIn: !0, DOMFocusOut: !0, keypress: !0 },
        rc = { get composed() {
        !1 !== this.isTrusted && void 0 === this.ja && (this.ja = Sd[this.type]);return this.ja || !1;
      }, composedPath: function () {
        this.ya || (this.ya = Wa(this.__target, this.composed));return this.ya;
      },
      get target() {
        return hc(this.currentTarget, this.composedPath());
      }, get relatedTarget() {
        if (!this.za) return null;this.Aa || (this.Aa = Wa(this.za, !0));return hc(this.currentTarget, this.Aa);
      }, stopPropagation: function () {
        Event.prototype.stopPropagation.call(this);this.ka = !0;
      }, stopImmediatePropagation: function () {
        Event.prototype.stopImmediatePropagation.call(this);this.ka = this.Va = !0;
      } },
        Ya = { focus: !0, blur: !0 },
        Td = Xa(window.Event),
        Ud = Xa(window.CustomEvent),
        Vd = Xa(window.MouseEvent),
        Db = {};l.prototype = Object.create(DocumentFragment.prototype);
    l.prototype.D = function (a, b) {
      this.Xa = "ShadyRoot";la(a);la(this);this.host = a;this.L = b && b.mode;a.__shady = a.__shady || {};a.__shady.root = this;a.__shady.ub = "closed" !== this.L ? this : null;this.S = !1;this.b = [];this.a = null;b = S(a);for (var c = 0, d = b.length; c < d; c++) ba.call(a, b[c]);
    };l.prototype.M = function () {
      var a = this;this.S || (this.S = !0, Ib(function () {
        return a.Ea();
      }));
    };l.prototype.C = function () {
      for (var a = this, b = this; b;) b.S && (a = b), b = b.ib();return a;
    };l.prototype.ib = function () {
      var a = this.host.getRootNode();if (B(a)) for (var b = this.host.childNodes, c = 0, d; c < b.length; c++) if (d = b[c], this.h(d)) return a;
    };l.prototype.Ea = function () {
      this.S && this.C()._renderRoot();
    };l.prototype._renderRoot = function () {
      this.S = !1;this.v();this.s();
    };l.prototype.v = function () {
      for (var a = 0, b; a < this.b.length; a++) b = this.b[a], this.l(b);for (b = this.host.firstChild; b; b = b.nextSibling) this.f(b);for (a = 0; a < this.b.length; a++) {
        b = this.b[a];if (!b.__shady.assignedNodes.length) for (var c = b.firstChild; c; c = c.nextSibling) this.f(c, b);c = b.parentNode;(c = c.__shady && c.__shady.root) && c.Ba() && c._renderRoot();this.c(b.__shady.U, b.__shady.assignedNodes);if (c = b.__shady.Da) {
          for (var d = 0; d < c.length; d++) c[d].__shady.na = null;b.__shady.Da = null;c.length > b.__shady.assignedNodes.length && (b.__shady.qa = !0);
        }b.__shady.qa && (b.__shady.qa = !1, this.g(b));
      }
    };l.prototype.f = function (a, b) {
      a.__shady = a.__shady || {};var c = a.__shady.na;a.__shady.na = null;b || (b = (b = this.a[a.slot || "__catchall"]) && b[0]);b ? (b.__shady.assignedNodes.push(a), a.__shady.assignedSlot = b) : a.__shady.assignedSlot = void 0;c !== a.__shady.assignedSlot && a.__shady.assignedSlot && (a.__shady.assignedSlot.__shady.qa = !0);
    };l.prototype.l = function (a) {
      var b = a.__shady.assignedNodes;a.__shady.assignedNodes = [];a.__shady.U = [];if (a.__shady.Da = b) for (var c = 0; c < b.length; c++) {
        var d = b[c];d.__shady.na = d.__shady.assignedSlot;d.__shady.assignedSlot === a && (d.__shady.assignedSlot = null);
      }
    };l.prototype.c = function (a, b) {
      for (var c = 0, d; c < b.length && (d = b[c]); c++) "slot" == d.localName ? this.c(a, d.__shady.assignedNodes) : a.push(b[c]);
    };l.prototype.g = function (a) {
      gb.call(a, new Event("slotchange"));
      a.__shady.assignedSlot && this.g(a.__shady.assignedSlot);
    };l.prototype.s = function () {
      for (var a = this.b, b = [], c = 0; c < a.length; c++) {
        var d = a[c].parentNode;d.__shady && d.__shady.root || !(0 > b.indexOf(d)) || b.push(d);
      }for (a = 0; a < b.length; a++) c = b[a], this.I(c === this ? this.host : c, this.u(c));
    };l.prototype.u = function (a) {
      var b = [];a = a.childNodes;for (var c = 0; c < a.length; c++) {
        var d = a[c];if (this.h(d)) {
          d = d.__shady.U;for (var e = 0; e < d.length; e++) b.push(d[e]);
        } else b.push(d);
      }return b;
    };l.prototype.h = function (a) {
      return "slot" == a.localName;
    };
    l.prototype.I = function (a, b) {
      for (var c = S(a), d = zd(b, b.length, c, c.length), e = 0, f = 0, g; e < d.length && (g = d[e]); e++) {
        for (var h = 0, k; h < g.X.length && (k = g.X[h]); h++) U(k) === a && ba.call(a, k), c.splice(g.index + f, 1);f -= g.aa;
      }for (e = 0; e < d.length && (g = d[e]); e++) for (f = c[g.index], h = g.index; h < g.index + g.aa; h++) k = b[h], Ua.call(a, k, f), c.splice(h, 0, k);
    };l.prototype.ab = function (a) {
      this.a = this.a || {};this.b = this.b || [];for (var b = 0; b < a.length; b++) {
        var c = a[b];c.__shady = c.__shady || {};la(c);la(c.parentNode);var d = this.i(c);if (this.a[d]) {
          var e = e || {};e[d] = !0;this.a[d].push(c);
        } else this.a[d] = [c];this.b.push(c);
      }if (e) for (var f in e) this.a[f] = this.j(this.a[f]);
    };l.prototype.i = function (a) {
      var b = a.name || a.getAttribute("name") || "__catchall";return a.Za = b;
    };l.prototype.j = function (a) {
      return a.sort(function (a, c) {
        a = sc(a);for (var b = sc(c), e = 0; e < a.length; e++) {
          c = a[e];var f = b[e];if (c !== f) return a = Array.from(c.parentNode.childNodes), a.indexOf(c) - a.indexOf(f);
        }
      });
    };l.prototype.hb = function (a) {
      this.a = this.a || {};this.b = this.b || [];var b = this.a,
          c;for (c in b) for (var d = b[c], e = 0; e < d.length; e++) {
        var f = d[e],
            g;a: {
          for (g = f; g;) {
            if (g == a) {
              g = !0;break a;
            }g = g.parentNode;
          }g = void 0;
        }if (g) {
          d.splice(e, 1);var h = this.b.indexOf(f);0 <= h && this.b.splice(h, 1);e--;this.H(f);h = !0;
        }
      }return h;
    };l.prototype.jb = function (a) {
      var b = a.Za,
          c = this.i(a);if (c !== b) {
        b = this.a[b];var d = b.indexOf(a);0 <= d && b.splice(d, 1);b = this.a[c] || (this.a[c] = []);b.push(a);1 < b.length && (this.a[c] = this.j(b));
      }
    };l.prototype.H = function (a) {
      if (a = a.__shady.U) for (var b = 0; b < a.length; b++) {
        var c = a[b],
            d = U(c);d && ba.call(d, c);
      }
    };l.prototype.Ba = function () {
      return !!this.b.length;
    };l.prototype.addEventListener = function (a, b, c) {
      "object" !== typeof c && (c = { capture: !!c });c.la = this;this.host.addEventListener(a, b, c);
    };l.prototype.removeEventListener = function (a, b, c) {
      "object" !== typeof c && (c = { capture: !!c });c.la = this;this.host.removeEventListener(a, b, c);
    };l.prototype.getElementById = function (a) {
      return oa(this, function (b) {
        return b.id == a;
      }, function (a) {
        return !!a;
      })[0] || null;
    };(function (a) {
      G(a, Pa, !0);G(a, Qa, !0);
    })(l.prototype);var Dd = { addEventListener: kc.bind(window),
      removeEventListener: oc.bind(window) },
        Cd = { addEventListener: kc, removeEventListener: oc, appendChild: function (a) {
        return Ra(this, a);
      }, insertBefore: function (a, b) {
        return Ra(this, a, b);
      }, removeChild: function (a) {
        return Sa(this, a);
      }, replaceChild: function (a, b) {
        Ra(this, a, b);Sa(this, b);return a;
      }, cloneNode: function (a) {
        if ("template" == this.localName) var b = fb.call(this, a);else if (b = fb.call(this, !1), a) {
          a = this.childNodes;for (var c = 0, d; c < a.length; c++) d = a[c].cloneNode(!0), b.appendChild(d);
        }return b;
      }, getRootNode: function () {
        return bc(this);
      },
      get isConnected() {
        var a = this.ownerDocument;if (a && a.contains && a.contains(this) || (a = a.documentElement) && a.contains && a.contains(this)) return !0;for (a = this; a && !(a instanceof Document);) a = a.parentNode || (a instanceof l ? a.host : void 0);return !!(a && a instanceof Document);
      }, dispatchEvent: function (a) {
        na();return gb.call(this, a);
      } },
        Ed = { get assignedSlot() {
        return tc(this);
      } },
        Za = { querySelector: function (a) {
        return oa(this, function (b) {
          return Mc.call(b, a);
        }, function (a) {
          return !!a;
        })[0] || null;
      }, querySelectorAll: function (a) {
        return oa(this, function (b) {
          return Mc.call(b, a);
        });
      } },
        wc = { assignedNodes: function (a) {
        if ("slot" === this.localName) return dc(this), this.__shady ? (a && a.flatten ? this.__shady.U : this.__shady.assignedNodes) || [] : [];
      } },
        uc = Ka({ setAttribute: function (a, b) {
        ec(this, a, b);
      }, removeAttribute: function (a) {
        Nc.call(this, a);ac(this, a);
      }, attachShadow: function (a) {
        if (!this) throw "Must provide a host.";if (!a) throw "Not enough arguments.";return new l(Db, this, a);
      }, get slot() {
        return this.getAttribute("slot");
      }, set slot(a) {
        ec(this, "slot", a);
      }, get assignedSlot() {
        return tc(this);
      } }, Za, wc);Object.defineProperties(uc, Oc);var vc = Ka({ importNode: function (a, b) {
        return gc(a, b);
      }, getElementById: function (a) {
        return oa(this, function (b) {
          return b.id == a;
        }, function (a) {
          return !!a;
        })[0] || null;
      } }, Za);Object.defineProperties(vc, { _activeElement: Qa.activeElement });var Wd = HTMLElement.prototype.blur,
        Fd = Ka({ blur: function () {
        var a = this.__shady && this.__shady.root;(a = a && a.activeElement) ? a.blur() : Wd.call(this);
      } });D.Ia && (window.ShadyDOM = { inUse: D.Ia, patch: function (a) {
        return a;
      }, isShadyRoot: B, enqueue: Ib, flush: na,
      settings: D, filterMutations: sd, observeChildren: qd, unobserveChildren: pd, nativeMethods: Qd, nativeTree: Rd }, window.Event = Td, window.CustomEvent = Ud, window.MouseEvent = Vd, yd(), Bd(), window.ShadowRoot = l);var Gd = new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));A.prototype.D = function (a, b) {
      this.u.set(a, b);this.s.set(b.constructor, b);
    };A.prototype.c = function (a) {
      return this.u.get(a);
    };A.prototype.C = function (a) {
      return this.s.get(a);
    };
    A.prototype.v = function (a) {
      this.h = !0;this.j.push(a);
    };A.prototype.l = function (a) {
      var b = this;this.h && M(a, function (a) {
        return b.g(a);
      });
    };A.prototype.g = function (a) {
      if (this.h && !a.__CE_patched) {
        a.__CE_patched = !0;for (var b = 0; b < this.j.length; b++) this.j[b](a);
      }
    };A.prototype.b = function (a) {
      var b = [];M(a, function (a) {
        return b.push(a);
      });for (a = 0; a < b.length; a++) {
        var c = b[a];1 === c.__CE_state ? this.connectedCallback(c) : this.i(c);
      }
    };A.prototype.a = function (a) {
      var b = [];M(a, function (a) {
        return b.push(a);
      });for (a = 0; a < b.length; a++) {
        var c = b[a];1 === c.__CE_state && this.disconnectedCallback(c);
      }
    };A.prototype.f = function (a, b) {
      var c = this;b = b ? b : {};var d = b.Ab || new Set(),
          e = b.Oa || function (a) {
        return c.i(a);
      },
          f = [];M(a, function (a) {
        if ("link" === a.localName && "import" === a.getAttribute("rel")) {
          var b = a.import;b instanceof Node && "complete" === b.readyState ? (b.__CE_isImportDocument = !0, b.__CE_hasRegistry = !0) : a.addEventListener("load", function () {
            var b = a.import;b.__CE_documentLoadHandled || (b.__CE_documentLoadHandled = !0, b.__CE_isImportDocument = !0, b.__CE_hasRegistry = !0, d.delete(b), c.f(b, { Ab: d, Oa: e }));
          });
        } else f.push(a);
      }, d);if (this.h) for (a = 0; a < f.length; a++) this.g(f[a]);for (a = 0; a < f.length; a++) e(f[a]);
    };A.prototype.i = function (a) {
      if (void 0 === a.__CE_state) {
        var b = this.c(a.localName);if (b) {
          b.constructionStack.push(a);var c = b.constructor;try {
            try {
              if (new c() !== a) throw Error("The custom element constructor did not produce the element being upgraded.");
            } finally {
              b.constructionStack.pop();
            }
          } catch (f) {
            throw a.__CE_state = 2, f;
          }a.__CE_state = 1;a.__CE_definition = b;if (b.attributeChangedCallback) for (b = b.observedAttributes, c = 0; c < b.length; c++) {
            var d = b[c],
                e = a.getAttribute(d);null !== e && this.attributeChangedCallback(a, d, null, e, null);
          }n(a) && this.connectedCallback(a);
        }
      }
    };A.prototype.connectedCallback = function (a) {
      var b = a.__CE_definition;b.connectedCallback && b.connectedCallback.call(a);
    };A.prototype.disconnectedCallback = function (a) {
      var b = a.__CE_definition;b.disconnectedCallback && b.disconnectedCallback.call(a);
    };A.prototype.attributeChangedCallback = function (a, b, c, d, e) {
      var f = a.__CE_definition;f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(b) && f.attributeChangedCallback.call(a, b, c, d, e);
    };Ga.prototype.c = function () {
      this.N && this.N.disconnect();
    };Ga.prototype.f = function (a) {
      var b = this.a.readyState;"interactive" !== b && "complete" !== b || this.c();for (b = 0; b < a.length; b++) for (var c = a[b].addedNodes, d = 0; d < c.length; d++) this.b.f(c[d]);
    };Cb.prototype.resolve = function (a) {
      if (this.a) throw Error("Already resolved.");this.a = a;this.b && this.b(a);
    };q.prototype.define = function (a, b) {
      var c = this;if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");
      if (!xc(a)) throw new SyntaxError("The element name '" + a + "' is not valid.");if (this.a.c(a)) throw Error("A custom element with name '" + a + "' has already been defined.");if (this.c) throw Error("A custom element is already being defined.");this.c = !0;try {
        var d = function (a) {
          var b = e[a];if (void 0 !== b && !(b instanceof Function)) throw Error("The '" + a + "' callback must be a function.");return b;
        },
            e = b.prototype;if (!(e instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");
        var f = d("connectedCallback");var g = d("disconnectedCallback");var h = d("adoptedCallback");var k = d("attributeChangedCallback");var l = b.observedAttributes || [];
      } catch (le) {
        return;
      } finally {
        this.c = !1;
      }b = { localName: a, constructor: b, connectedCallback: f, disconnectedCallback: g, adoptedCallback: h, attributeChangedCallback: k, observedAttributes: l, constructionStack: [] };this.a.D(a, b);this.g.push(b);this.b || (this.b = !0, this.f(function () {
        return c.j();
      }));
    };q.prototype.j = function () {
      var a = this;if (!1 !== this.b) {
        this.b = !1;for (var b = this.g, c = [], d = new Map(), e = 0; e < b.length; e++) d.set(b[e].localName, []);this.a.f(document, { Oa: function (b) {
            if (void 0 === b.__CE_state) {
              var e = b.localName,
                  f = d.get(e);f ? f.push(b) : a.a.c(e) && c.push(b);
            }
          } });for (e = 0; e < c.length; e++) this.a.i(c[e]);for (; 0 < b.length;) {
          var f = b.shift();e = f.localName;f = d.get(f.localName);for (var g = 0; g < f.length; g++) this.a.i(f[g]);(e = this.h.get(e)) && e.resolve(void 0);
        }
      }
    };q.prototype.get = function (a) {
      if (a = this.a.c(a)) return a.constructor;
    };q.prototype.whenDefined = function (a) {
      if (!xc(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));var b = this.h.get(a);if (b) return b.c;b = new Cb();this.h.set(a, b);this.a.c(a) && !this.g.some(function (b) {
        return b.localName === a;
      }) && b.resolve(void 0);return b.c;
    };q.prototype.l = function (a) {
      this.i.c();var b = this.f;this.f = function (c) {
        return a(function () {
          return b(c);
        });
      };
    };window.CustomElementRegistry = q;q.prototype.define = q.prototype.define;q.prototype.get = q.prototype.get;q.prototype.whenDefined = q.prototype.whenDefined;q.prototype.polyfillWrapFlushCallback = q.prototype.l;
    var Ca = window.Document.prototype.createElement,
        kd = window.Document.prototype.createElementNS,
        jd = window.Document.prototype.importNode,
        ld = window.Document.prototype.prepend,
        md = window.Document.prototype.append,
        rb = window.Node.prototype.cloneNode,
        ja = window.Node.prototype.appendChild,
        zb = window.Node.prototype.insertBefore,
        Da = window.Node.prototype.removeChild,
        Ab = window.Node.prototype.replaceChild,
        Fa = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
        qb = window.Element.prototype.attachShadow,
        Aa = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
        Ea = window.Element.prototype.getAttribute,
        sb = window.Element.prototype.setAttribute,
        ub = window.Element.prototype.removeAttribute,
        ka = window.Element.prototype.getAttributeNS,
        tb = window.Element.prototype.setAttributeNS,
        vb = window.Element.prototype.removeAttributeNS,
        xb = window.Element.prototype.insertAdjacentElement,
        ad = window.Element.prototype.prepend,
        bd = window.Element.prototype.append,
        dd = window.Element.prototype.before,
        ed = window.Element.prototype.after,
        fd = window.Element.prototype.replaceWith,
        gd = window.Element.prototype.remove,
        od = window.HTMLElement,
        Ba = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
        wb = window.HTMLElement.prototype.insertAdjacentElement,
        Bb = new function () {}(),
        ua = window.customElements;if (!ua || ua.forcePolyfill || "function" != typeof ua.define || "function" != typeof ua.get) {
      var ea = new A();nd(ea);id(ea);hd(ea);$c(ea);document.__CE_hasRegistry = !0;var Xd = new q(ea);Object.defineProperty(window, "customElements", { configurable: !0,
        enumerable: !0, value: Xd });
    }var K = { STYLE_RULE: 1, ia: 7, MEDIA_RULE: 4, va: 1E3 },
        J = { nb: /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim, port: /@import[^;]*;/gim, Fa: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim, Ja: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim, tb: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim, zb: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim, sb: /^@[^\s]*keyframes/, Ka: /\s+/g },
        u = !(window.ShadyDOM && window.ShadyDOM.inUse);if (window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss) var w = window.ShadyCSS.nativeCss;else window.ShadyCSS ? (Ac(window.ShadyCSS), window.ShadyCSS = void 0) : Ac(window.WebComponents && window.WebComponents.flags);var va = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
        wa = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
        Yd = /(--[\w-]+)\s*([:,;)]|$)/gi,
        Zd = /(animation\s*:)|(animation-name\s*:)/,
        Id = /@media\s(.*)/,
        $d = /\{[^}]*\}/g,
        P = null;r.prototype.a = function (a, b, c) {
      a.__styleScoped ? a.__styleScoped = null : this.i(a, b || "", c);
    };r.prototype.i = function (a, b, c) {
      a.nodeType === Node.ELEMENT_NODE && this.v(a, b, c);if (a = "template" === a.localName ? (a.content || a.Eb).childNodes : a.children || a.childNodes) for (var d = 0; d < a.length; d++) this.i(a[d], b, c);
    };r.prototype.v = function (a, b, c) {
      if (b) if (a.classList) c ? (a.classList.remove("style-scope"), a.classList.remove(b)) : (a.classList.add("style-scope"), a.classList.add(b));else if (a.getAttribute) {
        var d = a.getAttribute(ae);c ? d && (b = d.replace("style-scope", "").replace(b, ""), ra(a, b)) : ra(a, (d ? d + " " : "") + "style-scope " + b);
      }
    };r.prototype.b = function (a, b, c) {
      var d = a.__cssBuild;u || "shady" === d ? b = V(b, c) : (a = R(a), b = this.H(b, a.is, a.Y, c) + "\n\n");return b.trim();
    };r.prototype.H = function (a, b, c, d) {
      var e = this.f(b, c);b = this.h(b);var f = this;return V(a, function (a) {
        a.c || (f.R(a, b, e), a.c = !0);d && d(a, b, e);
      });
    };r.prototype.h = function (a) {
      return a ? be + a : "";
    };r.prototype.f = function (a, b) {
      return b ? "[is=" + a + "]" : a;
    };r.prototype.R = function (a, b, c) {
      this.j(a, this.g, b, c);
    };r.prototype.j = function (a, b, c, d) {
      a.selector = a.A = this.l(a, b, c, d);
    };r.prototype.l = function (a, b, c, d) {
      var e = a.selector.split(Pc);if (!Bc(a)) {
        a = 0;for (var f = e.length, g; a < f && (g = e[a]); a++) e[a] = b.call(this, g, c, d);
      }return e.join(Pc);
    };r.prototype.g = function (a, b, c) {
      var d = this,
          e = !1;a = a.trim();a = a.replace(ce, function (a, b, c) {
        return ":" + b + "(" + c.replace(/\s/g, "") + ")";
      });a = a.replace(de, jb + " $1");return a = a.replace(ee, function (a, g, h) {
        e || (a = d.C(h, g, b, c), e = e || a.stop, g = a.mb, h = a.value);return g + h;
      });
    };r.prototype.C = function (a, b, c, d) {
      var e = a.indexOf(kb);0 <= a.indexOf(jb) ? a = this.L(a, d) : 0 !== e && (a = c ? this.s(a, c) : a);c = !1;0 <= e && (b = "", c = !0);if (c) {
        var f = !0;c && (a = a.replace(fe, function (a, b) {
          return " > " + b;
        }));
      }a = a.replace(ge, function (a, b, c) {
        return '[dir="' + c + '"] ' + b + ", " + b + '[dir="' + c + '"]';
      });return { value: a, mb: b, stop: f };
    };r.prototype.s = function (a, b) {
      a = a.split(Qc);a[0] += b;return a.join(Qc);
    };r.prototype.L = function (a, b) {
      var c = a.match(Rc);return (c = c && c[2].trim() || "") ? c[0].match(Sc) ? a.replace(Rc, function (a, c, f) {
        return b + f;
      }) : c.split(Sc)[0] === b ? c : he : a.replace(jb, b);
    };r.prototype.I = function (a) {
      a.selector = a.parsedSelector;this.u(a);this.j(a, this.D);
    };
    r.prototype.u = function (a) {
      a.selector === ie && (a.selector = "html");
    };r.prototype.D = function (a) {
      return a.match(kb) ? this.g(a, Tc) : this.s(a.trim(), Tc);
    };nb.Object.defineProperties(r.prototype, { c: { configurable: !0, enumerable: !0, get: function () {
          return "style-scope";
        } } });var ce = /:(nth[-\w]+)\(([^)]+)\)/,
        Tc = ":not(.style-scope)",
        Pc = ",",
        ee = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g,
        Sc = /[[.:#*]/,
        jb = ":host",
        ie = ":root",
        kb = "::slotted",
        de = new RegExp("^(" + kb + ")"),
        Rc = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
        fe = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
        ge = /(.*):dir\((?:(ltr|rtl))\)/,
        be = ".",
        Qc = ":",
        ae = "class",
        he = "should_not_match",
        x = new r();y.get = function (a) {
      return a ? a.__styleInfo : null;
    };y.set = function (a, b) {
      return a.__styleInfo = b;
    };y.prototype.c = function () {
      return this.G;
    };y.prototype._getStyleRules = y.prototype.c;var Uc = function (a) {
      return a.matches || a.matchesSelector || a.mozMatchesSelector || a.msMatchesSelector || a.oMatchesSelector || a.webkitMatchesSelector;
    }(window.Element.prototype),
        je = navigator.userAgent.match("Trident");p.prototype.R = function (a) {
      var b = this,
          c = {},
          d = [],
          e = 0;W(a, function (a) {
        b.c(a);a.index = e++;b.I(a.w.cssText, c);
      }, function (a) {
        d.push(a);
      });a.b = d;a = [];for (var f in c) a.push(f);return a;
    };p.prototype.c = function (a) {
      if (!a.w) {
        var b = {},
            c = {};this.b(a, c) && (b.F = c, a.rules = null);b.cssText = this.H(a);a.w = b;
      }
    };p.prototype.b = function (a, b) {
      var c = a.w;if (c) {
        if (c.F) return Object.assign(b, c.F), !0;
      } else {
        c = a.parsedCssText;for (var d; a = va.exec(c);) {
          d = (a[2] || a[3]).trim();if ("inherit" !== d || "unset" !== d) b[a[1].trim()] = d;d = !0;
        }return d;
      }
    };p.prototype.H = function (a) {
      return this.L(a.parsedCssText);
    };
    p.prototype.L = function (a) {
      return a.replace($d, "").replace(va, "");
    };p.prototype.I = function (a, b) {
      for (var c; c = Yd.exec(a);) {
        var d = c[1];":" !== c[2] && (b[d] = !0);
      }
    };p.prototype.fa = function (a) {
      for (var b = Object.getOwnPropertyNames(a), c = 0, d; c < b.length; c++) d = b[c], a[d] = this.a(a[d], a);
    };p.prototype.a = function (a, b) {
      if (a) if (0 <= a.indexOf(";")) a = this.f(a, b);else {
        var c = this;a = Dc(a, function (a, e, f, g) {
          if (!e) return a + g;(e = c.a(b[e], b)) && "initial" !== e ? "apply-shim-inherit" === e && (e = "inherit") : e = c.a(b[f] || f, b) || f;return a + (e || "") + g;
        });
      }return a && a.trim() || "";
    };p.prototype.f = function (a, b) {
      a = a.split(";");for (var c = 0, d, e; c < a.length; c++) if (d = a[c]) {
        wa.lastIndex = 0;if (e = wa.exec(d)) d = this.a(b[e[1]], b);else if (e = d.indexOf(":"), -1 !== e) {
          var f = d.substring(e);f = f.trim();f = this.a(f, b) || f;d = d.substring(0, e) + f;
        }a[c] = d && d.lastIndexOf(";") === d.length - 1 ? d.slice(0, -1) : d || "";
      }return a.join(";");
    };p.prototype.D = function (a, b) {
      var c = "";a.w || this.c(a);a.w.cssText && (c = this.f(a.w.cssText, b));a.cssText = c;
    };p.prototype.C = function (a, b) {
      var c = a.cssText,
          d = a.cssText;
      null == a.Ha && (a.Ha = Zd.test(c));if (a.Ha) if (null == a.ca) {
        a.ca = [];for (var e in b) d = b[e], d = d(c), c !== d && (c = d, a.ca.push(e));
      } else {
        for (e = 0; e < a.ca.length; ++e) d = b[a.ca[e]], c = d(c);d = c;
      }a.cssText = d;
    };p.prototype.ea = function (a, b) {
      var c = {},
          d = this,
          e = [];W(a, function (a) {
        a.w || d.c(a);var f = a.A || a.parsedSelector;b && a.w.F && f && Uc.call(b, f) && (d.b(a, c), a = a.index, f = parseInt(a / 32, 10), e[f] = (e[f] || 0) | 1 << a % 32);
      }, null, !0);return { F: c, key: e };
    };p.prototype.ha = function (a, b, c, d) {
      b.w || this.c(b);if (b.w.F) {
        var e = R(a);a = e.is;e = e.Y;e = a ? x.f(a, e) : "html";var f = b.parsedSelector,
            g = ":host > *" === f || "html" === f,
            h = 0 === f.indexOf(":host") && !g;"shady" === c && (g = f === e + " > *." + e || -1 !== f.indexOf("html"), h = !g && 0 === f.indexOf(e));"shadow" === c && (g = ":host > *" === f || "html" === f, h = h && !g);if (g || h) c = e, h && (u && !b.A && (b.A = x.l(b, x.g, x.h(a), e)), c = b.A || e), d({ yb: c, rb: h, Ib: g });
      }
    };p.prototype.da = function (a, b) {
      var c = {},
          d = {},
          e = this,
          f = b && b.__cssBuild;W(b, function (b) {
        e.ha(a, b, f, function (f) {
          Uc.call(a.Fb || a, f.yb) && (f.rb ? e.b(b, c) : e.b(b, d));
        });
      }, null, !0);return { wb: d, qb: c };
    };p.prototype.ga = function (a, b, c) {
      var d = this,
          e = R(a),
          f = x.f(e.is, e.Y),
          g = new RegExp("(?:^|[^.#[:])" + (a.extends ? "\\" + f.slice(0, -1) + "\\]" : f) + "($|[.:[\\s>+~])");e = y.get(a).G;var h = this.h(e, c);return x.b(a, e, function (a) {
        d.D(a, b);u || Bc(a) || !a.cssText || (d.C(a, h), d.l(a, g, f, c));
      });
    };p.prototype.h = function (a, b) {
      a = a.b;var c = {};if (!u && a) for (var d = 0, e = a[d]; d < a.length; e = a[++d]) this.j(e, b), c[e.keyframesName] = this.i(e);return c;
    };p.prototype.i = function (a) {
      return function (b) {
        return b.replace(a.f, a.a);
      };
    };p.prototype.j = function (a, b) {
      a.f = new RegExp(a.keyframesName, "g");a.a = a.keyframesName + "-" + b;a.A = a.A || a.selector;a.selector = a.A.replace(a.keyframesName, a.a);
    };p.prototype.l = function (a, b, c, d) {
      a.A = a.A || a.selector;d = "." + d;for (var e = a.A.split(","), f = 0, g = e.length, h; f < g && (h = e[f]); f++) e[f] = h.match(b) ? h.replace(c, d) : d + " " + h;a.selector = e.join(",");
    };p.prototype.u = function (a, b, c) {
      var d = a.getAttribute("class") || "",
          e = d;c && (e = d.replace(new RegExp("\\s*x-scope\\s*" + c + "\\s*", "g"), " "));e += (e ? " " : "") + "x-scope " + b;d !== e && ra(a, e);
    };p.prototype.v = function (a, b, c, d) {
      b = d ? d.textContent || "" : this.ga(a, b, c);var e = y.get(a),
          f = e.a;f && !u && f !== d && (f._useCount--, 0 >= f._useCount && f.parentNode && f.parentNode.removeChild(f));u ? e.a ? (e.a.textContent = b, d = e.a) : b && (d = bb(b, c, a.shadowRoot, e.b)) : d ? d.parentNode || (je && -1 < b.indexOf("@media") && (d.textContent = b), Cc(d, null, e.b)) : b && (d = bb(b, c, null, e.b));d && (d._useCount = d._useCount || 0, e.a != d && d._useCount++, e.a = d);return d;
    };p.prototype.s = function (a, b) {
      var c = qa(a),
          d = this;a.textContent = V(c, function (a) {
        var c = a.cssText = a.parsedCssText;a.w && a.w.cssText && (c = c.replace(J.Fa, "").replace(J.Ja, ""), a.cssText = d.f(c, b));
      });
    };nb.Object.defineProperties(p.prototype, { g: { configurable: !0, enumerable: !0, get: function () {
          return "x-scope";
        } } });var H = new p(),
        lb = {},
        xa = window.customElements;if (xa && !u) {
      var ke = xa.define;xa.define = function (a, b, c) {
        var d = document.createComment(" Shady DOM styles for " + a + " "),
            e = document.head;e.insertBefore(d, (P ? P.nextSibling : null) || e.firstChild);P = d;lb[a] = d;return ke.call(xa, a, b, c);
      };
    }ha.prototype.a = function (a, b, c) {
      for (var d = 0; d < c.length; d++) {
        var e = c[d];if (a.F[e] !== b[e]) return !1;
      }return !0;
    };ha.prototype.b = function (a, b, c, d) {
      var e = this.cache[a] || [];e.push({ F: b, styleElement: c, B: d });e.length > this.c && e.shift();this.cache[a] = e;
    };ha.prototype.fetch = function (a, b, c) {
      if (a = this.cache[a]) for (var d = a.length - 1; 0 <= d; d--) {
        var e = a[d];if (this.a(e, b, c)) return e;
      }
    };if (!u) {
      var Vc = new MutationObserver(Ec),
          Wc = function (a) {
        Vc.observe(a, { childList: !0, subtree: !0 });
      };if (window.customElements && !window.customElements.polyfillWrapFlushCallback) Wc(document);else {
        var mb = function () {
          Wc(document.body);
        };
        window.HTMLImports ? window.HTMLImports.whenReady(mb) : requestAnimationFrame(function () {
          if ("loading" === document.readyState) {
            var a = function () {
              mb();document.removeEventListener("readystatechange", a);
            };document.addEventListener("readystatechange", a);
          } else mb();
        });
      }pb = function () {
        Ec(Vc.takeRecords());
      };
    }var sa = {},
        Ld = Promise.resolve(),
        cb = null,
        Gc = window.HTMLImports && window.HTMLImports.whenReady || null,
        db,
        ya = null,
        fa = null;F.prototype.Ga = function () {
      !this.enqueued && fa && (this.enqueued = !0, ob(fa));
    };F.prototype.b = function (a) {
      a.__seenByShadyCSS || (a.__seenByShadyCSS = !0, this.customStyles.push(a), this.Ga());
    };F.prototype.a = function (a) {
      return a.__shadyCSSCachedStyle ? a.__shadyCSSCachedStyle : a.getStyle ? a.getStyle() : a;
    };F.prototype.c = function () {
      for (var a = this.customStyles, b = 0; b < a.length; b++) {
        var c = a[b];if (!c.__shadyCSSCachedStyle) {
          var d = this.a(c);d && (d = d.__appliedElement || d, ya && ya(d), c.__shadyCSSCachedStyle = d);
        }
      }return a;
    };F.prototype.addCustomStyle = F.prototype.b;F.prototype.getStyleForCustomStyle = F.prototype.a;F.prototype.processStyles = F.prototype.c;
    Object.defineProperties(F.prototype, { transformCallback: { get: function () {
          return ya;
        }, set: function (a) {
          ya = a;
        } }, validateCallback: { get: function () {
          return fa;
        }, set: function (a) {
          var b = !1;fa || (b = !0);fa = a;b && this.Ga();
        } } });var Xc = new ha();k.prototype.C = function () {
      pb();
    };k.prototype.da = function (a) {
      var b = this.s[a] = (this.s[a] || 0) + 1;return a + "-" + b;
    };k.prototype.Sa = function (a) {
      return qa(a);
    };k.prototype.Ua = function (a) {
      return V(a);
    };k.prototype.R = function (a) {
      a = a.content.querySelectorAll("style");for (var b = [], c = 0; c < a.length; c++) {
        var d = a[c];b.push(d.textContent);d.parentNode.removeChild(d);
      }return b.join("").trim();
    };k.prototype.fa = function (a) {
      return (a = a.content.querySelector("style")) ? a.getAttribute("css-build") || "" : "";
    };k.prototype.prepareTemplate = function (a, b, c) {
      if (!a.f) {
        a.f = !0;a.name = b;a.extends = c;sa[b] = a;var d = this.fa(a),
            e = this.R(a);c = { is: b, extends: c, Cb: d };u || x.a(a.content, b);this.c();var f = wa.test(e) || va.test(e);wa.lastIndex = 0;va.lastIndex = 0;e = ab(e);f && w && this.a && this.a.transformRules(e, b);a._styleAst = e;a.g = d;d = [];w || (d = H.R(a._styleAst));
        if (!d.length || w) b = this.ea(c, a._styleAst, u ? a.content : null, lb[b]), a.a = b;a.c = d;
      }
    };k.prototype.ea = function (a, b, c, d) {
      b = x.b(a, b);if (b.length) return bb(b, a.is, c, d);
    };k.prototype.ha = function (a) {
      var b = R(a),
          c = b.is;b = b.Y;var d = lb[c];c = sa[c];if (c) {
        var e = c._styleAst;var f = c.c;
      }return y.set(a, new y(e, d, f, 0, b));
    };k.prototype.H = function () {
      !this.a && window.ShadyCSS && window.ShadyCSS.ApplyShim && (this.a = window.ShadyCSS.ApplyShim, this.a.invalidCallback = Jd);
    };k.prototype.I = function () {
      var a = this;!this.b && window.ShadyCSS && window.ShadyCSS.CustomStyleInterface && (this.b = window.ShadyCSS.CustomStyleInterface, this.b.transformCallback = function (b) {
        a.v(b);
      }, this.b.validateCallback = function () {
        requestAnimationFrame(function () {
          (a.b.enqueued || a.i) && a.f();
        });
      });
    };k.prototype.c = function () {
      this.H();this.I();
    };k.prototype.f = function () {
      this.c();if (this.b) {
        var a = this.b.processStyles();this.b.enqueued && (w ? this.Qa(a) : (this.u(this.g, this.h), this.D(a)), this.b.enqueued = !1, this.i && !w && this.styleDocument());
      }
    };k.prototype.styleElement = function (a, b) {
      var c = R(a).is,
          d = y.get(a);d || (d = this.ha(a));
      this.j(a) || (this.i = !0);b && (d.P = d.P || {}, Object.assign(d.P, b));if (w) {
        if (d.P) {
          b = d.P;for (var e in b) null === e ? a.style.removeProperty(e) : a.style.setProperty(e, b[e]);
        }if (((e = sa[c]) || this.j(a)) && e && e.a && !Fc(e)) {
          if (Fc(e) || e._applyShimValidatingVersion !== e._applyShimNextVersion) this.c(), this.a && this.a.transformRules(e._styleAst, c), e.a.textContent = x.b(a, d.G), Kd(e);u && (c = a.shadowRoot) && (c.querySelector("style").textContent = x.b(a, d.G));d.G = e._styleAst;
        }
      } else this.u(a, d), d.sa && d.sa.length && this.L(a, d);
    };k.prototype.l = function (a) {
      return (a = a.getRootNode().host) ? y.get(a) ? a : this.l(a) : this.g;
    };k.prototype.j = function (a) {
      return a === this.g;
    };k.prototype.L = function (a, b) {
      var c = R(a).is,
          d = Xc.fetch(c, b.K, b.sa),
          e = d ? d.styleElement : null,
          f = b.B;b.B = d && d.B || this.da(c);e = H.v(a, b.K, b.B, e);u || H.u(a, b.B, f);d || Xc.b(c, b.K, e, b.B);
    };k.prototype.u = function (a, b) {
      var c = this.l(a),
          d = y.get(c);c = Object.create(d.K || null);var e = H.da(a, b.G);a = H.ea(d.G, a).F;Object.assign(c, e.qb, a, e.wb);this.ga(c, b.P);H.fa(c);b.K = c;
    };k.prototype.ga = function (a, b) {
      for (var c in b) {
        var d = b[c];if (d || 0 === d) a[c] = d;
      }
    };k.prototype.styleDocument = function (a) {
      this.styleSubtree(this.g, a);
    };k.prototype.styleSubtree = function (a, b) {
      var c = a.shadowRoot;(c || this.j(a)) && this.styleElement(a, b);if (b = c && (c.children || c.childNodes)) for (a = 0; a < b.length; a++) this.styleSubtree(b[a]);else if (a = a.children || a.childNodes) for (b = 0; b < a.length; b++) this.styleSubtree(a[b]);
    };k.prototype.Qa = function (a) {
      for (var b = 0; b < a.length; b++) {
        var c = this.b.getStyleForCustomStyle(a[b]);c && this.Pa(c);
      }
    };k.prototype.D = function (a) {
      for (var b = 0; b < a.length; b++) {
        var c = this.b.getStyleForCustomStyle(a[b]);c && H.s(c, this.h.K);
      }
    };k.prototype.v = function (a) {
      var b = this,
          c = qa(a);W(c, function (a) {
        u ? x.u(a) : x.I(a);w && (b.c(), b.a && b.a.transformRule(a));
      });w ? a.textContent = V(c) : this.h.G.rules.push(c);
    };k.prototype.Pa = function (a) {
      if (w && this.a) {
        var b = qa(a);this.c();this.a.transformRules(b);a.textContent = V(b);
      }
    };k.prototype.getComputedStyleValue = function (a, b) {
      var c;w || (c = (y.get(a) || y.get(this.l(a))).K[b]);return (c = c || window.getComputedStyle(a).getPropertyValue(b)) ? c.trim() : "";
    };k.prototype.Ta = function (a, b) {
      var c = a.getRootNode();b = b ? b.split(/\s/) : [];c = c.host && c.host.localName;if (!c) {
        var d = a.getAttribute("class");if (d) {
          d = d.split(/\s/);for (var e = 0; e < d.length; e++) if (d[e] === x.c) {
            c = d[e + 1];break;
          }
        }
      }c && b.push(x.c, c);w || (c = y.get(a)) && c.B && b.push(H.g, c.B);ra(a, b.join(" "));
    };k.prototype.Ra = function (a) {
      return y.get(a);
    };k.prototype.flush = k.prototype.C;k.prototype.prepareTemplate = k.prototype.prepareTemplate;k.prototype.styleElement = k.prototype.styleElement;k.prototype.styleDocument = k.prototype.styleDocument;k.prototype.styleSubtree = k.prototype.styleSubtree;k.prototype.getComputedStyleValue = k.prototype.getComputedStyleValue;k.prototype.setElementClass = k.prototype.Ta;k.prototype._styleInfoForNode = k.prototype.Ra;k.prototype.transformCustomStyleForDocument = k.prototype.v;k.prototype.getStyleAst = k.prototype.Sa;k.prototype.styleAstToString = k.prototype.Ua;k.prototype.flushCustomStyles = k.prototype.f;Object.defineProperties(k.prototype, { nativeShadow: { get: function () {
          return u;
        } }, nativeCss: { get: function () {
          return w;
        } } });
    var N = new k();if (window.ShadyCSS) {
      var Yc = window.ShadyCSS.ApplyShim;var Zc = window.ShadyCSS.CustomStyleInterface;
    }window.ShadyCSS = { ScopingShim: N, prepareTemplate: function (a, b, c) {
        N.f();N.prepareTemplate(a, b, c);
      }, styleSubtree: function (a, b) {
        N.f();N.styleSubtree(a, b);
      }, styleElement: function (a) {
        N.f();N.styleElement(a);
      }, styleDocument: function (a) {
        N.f();N.styleDocument(a);
      }, getComputedStyleValue: function (a, b) {
        return N.getComputedStyleValue(a, b);
      }, nativeCss: w, nativeShadow: u };Yc && (window.ShadyCSS.ApplyShim = Yc);Zc && (window.ShadyCSS.CustomStyleInterface = Zc);(function () {
      var a = window.customElements,
          b = window.HTMLImports;window.WebComponents = window.WebComponents || {};if (a && a.polyfillWrapFlushCallback) {
        var c,
            d = function () {
          if (c) {
            var a = c;c = null;a();return !0;
          }
        },
            e = b.whenReady;a.polyfillWrapFlushCallback(function (a) {
          c = a;e(d);
        });b.whenReady = function (a) {
          e(function () {
            d() ? b.whenReady(a) : a();
          });
        };
      }b.whenReady(function () {
        requestAnimationFrame(function () {
          window.WebComponents.ready = !0;document.dispatchEvent(new CustomEvent("WebComponentsReady", { bubbles: !0 }));
        });
      });
    })();(function () {
      var a = document.createElement("style");a.textContent = "body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n";var b = document.querySelector("head");b.insertBefore(a, b.firstChild);
    })();
  })();
}).call(this);

//# sourceMappingURL=webcomponents-lite.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6), __webpack_require__(7)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(9);

(function () {
  'use strict';

  /**
   * Base class that provides the core API for Polymer's meta-programming
   * features including template stamping, data-binding, attribute deserialization,
   * and property change observation.
   *
   * @customElement
   * @polymer
   * @memberof Polymer
   * @constructor
   * @implements {Polymer_ElementMixin}
   * @extends HTMLElement
   * @appliesMixin Polymer.ElementMixin
   * @summary Custom element base class that provides the core API for Polymer's
   *   key meta-programming features including template stamping, data-binding,
   *   attribute deserialization, and property change observation
   */

  const Element = Polymer.ElementMixin(HTMLElement);
  /**
   * @constructor
   * @implements {Polymer_ElementMixin}
   * @extends {HTMLElement}
   */
  Polymer.Element = Element;
})();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

__webpack_require__(10);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(11);

__webpack_require__(1);

__webpack_require__(12);

__webpack_require__(13);

(function () {
  'use strict';

  /**
   * Element class mixin that provides the core API for Polymer's meta-programming
   * features including template stamping, data-binding, attribute deserialization,
   * and property change observation.
   *
   * Subclassers may provide the following static getters to return metadata
   * used to configure Polymer's features for the class:
   *
   * - `static get is()`: When the template is provided via a `dom-module`,
   *   users should return the `dom-module` id from a static `is` getter.  If
   *   no template is needed or the template is provided directly via the
   *   `template` getter, there is no need to define `is` for the element.
   *
   * - `static get template()`: Users may provide the template directly (as
   *   opposed to via `dom-module`) by implementing a static `template` getter.
   *   The getter may return an `HTMLTemplateElement` or a string, which will
   *   automatically be parsed into a template.
   *
   * - `static get properties()`: Should return an object describing
   *   property-related metadata used by Polymer features (key: property name
   *   value: object containing property metadata). Valid keys in per-property
   *   metadata include:
   *   - `type` (String|Number|Object|Array|...): Used by
   *     `attributeChangedCallback` to determine how string-based attributes
   *     are deserialized to JavaScript property values.
   *   - `notify` (boolean): Causes a change in the property to fire a
   *     non-bubbling event called `<property>-changed`. Elements that have
   *     enabled two-way binding to the property use this event to observe changes.
   *   - `readOnly` (boolean): Creates a getter for the property, but no setter.
   *     To set a read-only property, use the private setter method
   *     `_setProperty(property, value)`.
   *   - `observer` (string): Observer method name that will be called when
   *     the property changes. The arguments of the method are
   *     `(value, previousValue)`.
   *   - `computed` (string): String describing method and dependent properties
   *     for computing the value of this property (e.g. `'computeFoo(bar, zot)'`).
   *     Computed properties are read-only by default and can only be changed
   *     via the return value of the computing method.
   *
   * - `static get observers()`: Array of strings describing multi-property
   *   observer methods and their dependent properties (e.g.
   *   `'observeABC(a, b, c)'`).
   *
   * The base class provides default implementations for the following standard
   * custom element lifecycle callbacks; users may override these, but should
   * call the super method to ensure
   * - `constructor`: Run when the element is created or upgraded
   * - `connectedCallback`: Run each time the element is connected to the
   *   document
   * - `disconnectedCallback`: Run each time the element is disconnected from
   *   the document
   * - `attributeChangedCallback`: Run each time an attribute in
   *   `observedAttributes` is set or removed (note: this element's default
   *   `observedAttributes` implementation will automatically return an array
   *   of dash-cased attributes based on `properties`)
   *
   * @mixinFunction
   * @polymer
   * @appliesMixin Polymer.PropertyEffects
   * @memberof Polymer
   * @property rootPath {string} Set to the value of `Polymer.rootPath`,
   *   which defaults to the main document path
   * @property importPath {string} Set to the value of the class's static
   *   `importPath` property, which defaults to the path of this element's
   *   `dom-module` (when `is` is used), but can be overridden for other
   *   import strategies.
   * @summary Element class mixin that provides the core API for Polymer's
   * meta-programming features.
   */

  Polymer.ElementMixin = Polymer.dedupingMixin(base => {

    /**
     * @constructor
     * @extends {base}
     * @implements {Polymer_PropertyEffects}
     */
    const polymerElementBase = Polymer.PropertyEffects(base);

    let caseMap = Polymer.CaseMap;

    /**
     * Returns the `properties` object specifically on `klass`. Use for:
     * (1) super chain mixes togther to make `propertiesForClass` which is
     * then used to make `observedAttributes`.
     * (2) properties effects and observers are created from it at `finalize` time.
     *
     * @param {HTMLElement} klass Element class
     * @return {Object} Object containing own properties for this class
     * @private
     */
    function ownPropertiesForClass(klass) {
      if (!klass.hasOwnProperty(JSCompiler_renameProperty('__ownProperties', klass))) {
        klass.__ownProperties = klass.hasOwnProperty(JSCompiler_renameProperty('properties', klass)) ?
        /** @type PolymerElementConstructor */klass.properties : {};
      }
      return klass.__ownProperties;
    }

    /**
     * Returns the `observers` array specifically on `klass`. Use for
     * setting up observers.
     *
     * @param {HTMLElement} klass Element class
     * @return {Array} Array containing own observers for this class
     * @private
     */
    function ownObserversForClass(klass) {
      if (!klass.hasOwnProperty(JSCompiler_renameProperty('__ownObservers', klass))) {
        klass.__ownObservers = klass.hasOwnProperty(JSCompiler_renameProperty('observers', klass)) ?
        /** @type PolymerElementConstructor */klass.observers : [];
      }
      return klass.__ownObservers;
    }

    /**
     * Mixes `props` into `flattenedProps` but upgrades shorthand type
     * syntax to { type: Type}.
     *
     * @param {Object} flattenedProps Bag to collect flattened properties into
     * @param {Object} props Bag of properties to add to `flattenedProps`
     * @return {Object} The input `flattenedProps` bag
     * @private
     */
    function flattenProperties(flattenedProps, props) {
      for (let p in props) {
        let o = props[p];
        if (typeof o == 'function') {
          o = { type: o };
        }
        flattenedProps[p] = o;
      }
      return flattenedProps;
    }

    /**
     * Returns a flattened list of properties mixed together from the chain of all
     * constructor's `config.properties`. This list is used to create
     * (1) observedAttributes,
     * (2) class property default values
     *
     * @param {PolymerElementConstructor} klass Element class
     * @return {PolymerElementProperties} Flattened properties for this class
     * @suppress {missingProperties} class.prototype is not a property for some reason?
     * @private
     */
    function propertiesForClass(klass) {
      if (!klass.hasOwnProperty(JSCompiler_renameProperty('__classProperties', klass))) {
        klass.__classProperties = flattenProperties({}, ownPropertiesForClass(klass));
        let superCtor = Object.getPrototypeOf(klass.prototype).constructor;
        if (superCtor.prototype instanceof PolymerElement) {
          klass.__classProperties = Object.assign(Object.create(propertiesForClass( /** @type PolymerElementConstructor */superCtor)), klass.__classProperties);
        }
      }
      return klass.__classProperties;
    }

    /**
     * Returns a list of properties with default values.
     * This list is created as an optimization since it is a subset of
     * the list returned from `propertiesForClass`.
     * This list is used in `_initializeProperties` to set property defaults.
     *
     * @param {PolymerElementConstructor} klass Element class
     * @return {PolymerElementProperties} Flattened properties for this class
     *   that have default values
     * @private
     */
    function propertyDefaultsForClass(klass) {
      if (!klass.hasOwnProperty(JSCompiler_renameProperty('__classPropertyDefaults', klass))) {
        klass.__classPropertyDefaults = null;
        let props = propertiesForClass(klass);
        for (let p in props) {
          let info = props[p];
          if ('value' in info) {
            klass.__classPropertyDefaults = klass.__classPropertyDefaults || {};
            klass.__classPropertyDefaults[p] = info;
          }
        }
      }
      return klass.__classPropertyDefaults;
    }

    /**
     * Returns true if a `klass` has finalized. Called in `ElementClass.finalize()`
     * @param {PolymerElementConstructor} klass Element class
     * @return {boolean} True if all metaprogramming for this class has been
     *   completed
     * @private
     */
    function hasClassFinalized(klass) {
      return klass.hasOwnProperty(JSCompiler_renameProperty('__finalized', klass));
    }

    /**
     * Called by `ElementClass.finalize()`. Ensures this `klass` and
     * *all superclasses* are finalized by traversing the prototype chain
     * and calling `klass.finalize()`.
     *
     * @param {PolymerElementConstructor} klass Element class
     * @private
     */
    function finalizeClassAndSuper(klass) {
      let proto = /** @type PolymerElementConstructor */klass.prototype;
      let superCtor = Object.getPrototypeOf(proto).constructor;
      if (superCtor.prototype instanceof PolymerElement) {
        superCtor.finalize();
      }
      finalizeClass(klass);
    }

    /**
     * Configures a `klass` based on a staic `klass.config` object and
     * a `template`. This includes creating accessors and effects
     * for properties in `config` and the `template` as well as preparing the
     * `template` for stamping.
     *
     * @param {PolymerElementConstructor} klass Element class
     * @private
     */
    function finalizeClass(klass) {
      klass.__finalized = true;
      let proto = /** @type PolymerElementConstructor */klass.prototype;
      if (klass.hasOwnProperty(JSCompiler_renameProperty('is', klass)) && klass.is) {
        Polymer.telemetry.register(proto);
      }
      let props = ownPropertiesForClass(klass);
      if (props) {
        finalizeProperties(proto, props);
      }
      let observers = ownObserversForClass(klass);
      if (observers) {
        finalizeObservers(proto, observers, props);
      }
      // note: create "working" template that is finalized at instance time
      let template = /** @type PolymerElementConstructor */klass.template;
      if (template) {
        if (typeof template === 'string') {
          let t = document.createElement('template');
          t.innerHTML = template;
          template = t;
        } else {
          template = template.cloneNode(true);
        }
        proto._template = template;
      }
    }

    /**
     * Configures a `proto` based on a `properties` object.
     * Leverages `PropertyEffects` to create property accessors and effects
     * supporting, observers, reflecting to attributes, change notification,
     * computed properties, and read only properties.
     * @param {PolymerElement} proto Element class prototype to add accessors
     *    and effects to
     * @param {Object} properties Flattened bag of property descriptors for
     *    this class
     * @private
     */
    function finalizeProperties(proto, properties) {
      for (let p in properties) {
        createPropertyFromConfig(proto, p, properties[p], properties);
      }
    }

    /**
     * Configures a `proto` based on a `observers` array.
     * Leverages `PropertyEffects` to create observers.
     * @param {PolymerElement} proto Element class prototype to add accessors
     *   and effects to
     * @param {Object} observers Flattened array of observer descriptors for
     *   this class
     * @param {Object} dynamicFns Object containing keys for any properties
     *   that are functions and should trigger the effect when the function
     *   reference is changed
     * @private
     */
    function finalizeObservers(proto, observers, dynamicFns) {
      for (let i = 0; i < observers.length; i++) {
        proto._createMethodObserver(observers[i], dynamicFns);
      }
    }

    /**
     * Creates effects for a property.
     *
     * Note, once a property has been set to
     * `readOnly`, `computed`, `reflectToAttribute`, or `notify`
     * these values may not be changed. For example, a subclass cannot
     * alter these settings. However, additional `observers` may be added
     * by subclasses.
     *
     * The info object should may contain property metadata as follows:
     *
     * * `type`: {function} type to which an attribute matching the property
     * is deserialized. Note the property is camel-cased from a dash-cased
     * attribute. For example, 'foo-bar' attribute is dersialized to a
     * property named 'fooBar'.
     *
     * * `readOnly`: {boolean} creates a readOnly property and
     * makes a private setter for the private of the form '_setFoo' for a
     * property 'foo',
     *
     * * `computed`: {string} creates a computed property. A computed property
     * also automatically is set to `readOnly: true`. The value is calculated
     * by running a method and arguments parsed from the given string. For
     * example 'compute(foo)' will compute a given property when the
     * 'foo' property changes by executing the 'compute' method. This method
     * must return the computed value.
     *
     * * `reflectToAttriute`: {boolean} If true, the property value is reflected
     * to an attribute of the same name. Note, the attribute is dash-cased
     * so a property named 'fooBar' is reflected as 'foo-bar'.
     *
     * * `notify`: {boolean} sends a non-bubbling notification event when
     * the property changes. For example, a property named 'foo' sends an
     * event named 'foo-changed' with `event.detail` set to the value of
     * the property.
     *
     * * observer: {string} name of a method that runs when the property
     * changes. The arguments of the method are (value, previousValue).
     *
     * Note: Users may want control over modifying property
     * effects via subclassing. For example, a user might want to make a
     * reflectToAttribute property not do so in a subclass. We've chosen to
     * disable this because it leads to additional complication.
     * For example, a readOnly effect generates a special setter. If a subclass
     * disables the effect, the setter would fail unexpectedly.
     * Based on feedback, we may want to try to make effects more malleable
     * and/or provide an advanced api for manipulating them.
     * Also consider adding warnings when an effect cannot be changed.
     *
     * @param {PolymerElement} proto Element class prototype to add accessors
     *   and effects to
     * @param {string} name Name of the property.
     * @param {Object} info Info object from which to create property effects.
     * Supported keys:
     * @param {Object} allProps Flattened map of all properties defined in this
     *   element (including inherited properties)
     * @private
     */
    function createPropertyFromConfig(proto, name, info, allProps) {
      // computed forces readOnly...
      if (info.computed) {
        info.readOnly = true;
      }
      // Note, since all computed properties are readOnly, this prevents
      // adding additional computed property effects (which leads to a confusing
      // setup where multiple triggers for setting a property)
      // While we do have `hasComputedEffect` this is set on the property's
      // dependencies rather than itself.
      if (info.computed && !proto._hasReadOnlyEffect(name)) {
        proto._createComputedProperty(name, info.computed, allProps);
      }
      if (info.readOnly && !proto._hasReadOnlyEffect(name)) {
        proto._createReadOnlyProperty(name, !info.computed);
      }
      if (info.reflectToAttribute && !proto._hasReflectEffect(name)) {
        proto._createReflectedProperty(name);
      }
      if (info.notify && !proto._hasNotifyEffect(name)) {
        proto._createNotifyingProperty(name);
      }
      // always add observer
      if (info.observer) {
        proto._createPropertyObserver(name, info.observer, allProps[info.observer]);
      }
    }

    /**
     * Configures an element `proto` to function with a given `template`.
     * The element name `is` and extends `ext` must be specified for ShadyCSS
     * style scoping.
     *
     * @param {PolymerElement} proto Element class prototype to add accessors
     *   and effects to
     * @param {!HTMLTemplateElement} template Template to process and bind
     * @param {string} baseURI URL against which to resolve urls in
     *   style element cssText
     * @param {string} is Tag name (or type extension name) for this element
     * @param {string=} ext For type extensions, the tag name that was extended
     * @private
     */
    function finalizeTemplate(proto, template, baseURI, is, ext) {
      // support `include="module-name"`
      let cssText = Polymer.StyleGather.cssFromTemplate(template, baseURI) + Polymer.StyleGather.cssFromModuleImports(is);
      if (cssText) {
        let style = document.createElement('style');
        style.textContent = cssText;
        template.content.insertBefore(style, template.content.firstChild);
      }
      if (window.ShadyCSS) {
        window.ShadyCSS.prepareTemplate(template, is, ext);
      }
      proto._bindTemplate(template);
    }

    /**
     * @polymer
     * @mixinClass
     * @unrestricted
     * @implements {Polymer_ElementMixin}
     */
    class PolymerElement extends polymerElementBase {

      /**
       * Standard Custom Elements V1 API.  The default implementation returns
       * a list of dash-cased attributes based on a flattening of all properties
       * declared in `static get properties()` for this element and any
       * superclasses.
       *
       * @return {Array} Observed attribute list
       */
      static get observedAttributes() {
        if (!this.hasOwnProperty(JSCompiler_renameProperty('__observedAttributes', this))) {
          let list = [];
          let properties = propertiesForClass(this);
          for (let prop in properties) {
            list.push(Polymer.CaseMap.camelToDashCase(prop));
          }
          this.__observedAttributes = list;
        }
        return this.__observedAttributes;
      }

      /**
       * Called automatically when the first element instance is created to
       * ensure that class finalization work has been completed.
       * May be called by users to eagerly perform class finalization work
       * prior to the creation of the first element instance.
       *
       * Class finalization work generally includes meta-programming such as
       * creating property accessors and any property effect metadata needed for
       * the features used.
       *
       * @public
       */
      static finalize() {
        if (!hasClassFinalized(this)) {
          finalizeClassAndSuper(this);
        }
      }

      /**
       * Returns the template that will be stamped into this element's shadow root.
       *
       * If a `static get is()` getter is defined, the default implementation
       * will return the first `<template>` in a `dom-module` whose `id`
       * matches this element's `is`.
       *
       * Users may override this getter to return an arbitrary template
       * (in which case the `is` getter is unnecessary). The template returned
       * may be either an `HTMLTemplateElement` or a string that will be
       * automatically parsed into a template.
       *
       * Note that when subclassing, if the super class overrode the default
       * implementation and the subclass would like to provide an alternate
       * template via a `dom-module`, it should override this getter and
       * return `Polymer.DomModule.import(this.is, 'template')`.
       *
       * If a subclass would like to modify the super class template, it should
       * clone it rather than modify it in place.  If the getter does expensive
       * work such as cloning/modifying a template, it should memoize the
       * template for maximum performance:
       *
       *   let memoizedTemplate;
       *   class MySubClass extends MySuperClass {
       *     static get template() {
       *       if (!memoizedTemplate) {
       *         memoizedTemplate = super.template.cloneNode(true);
       *         let subContent = document.createElement('div');
       *         subContent.textContent = 'This came from MySubClass';
       *         memoizedTemplate.content.appendChild(subContent);
       *       }
       *       return memoizedTemplate;
       *     }
       *   }
       *
       * @return {HTMLTemplateElement|string} Template to be stamped
       */
      static get template() {
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_template', this))) {
          this._template = Polymer.DomModule && Polymer.DomModule.import(
          /** @type PolymerElementConstructor*/this.is, 'template') ||
          // note: implemented so a subclass can retrieve the super
          // template; call the super impl this way so that `this` points
          // to the superclass.
          Object.getPrototypeOf( /** @type PolymerElementConstructor*/this.prototype).constructor.template;
        }
        return this._template;
      }

      /**
       * Path matching the url from which the element was imported.
       * This path is used to resolve url's in template style cssText.
       * The `importPath` property is also set on element instances and can be
       * used to create bindings relative to the import path.
       * Defaults to the path matching the url containing a `dom-module` element
       * matching this element's static `is` property.
       * Note, this path should contain a trailing `/`.
       *
       * @return {string} The import path for this element class
       */
      static get importPath() {
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_importPath', this))) {
          const module = Polymer.DomModule && Polymer.DomModule.import( /** @type PolymerElementConstructor */this.is);
          this._importPath = module ? module.assetpath : '' || Object.getPrototypeOf( /** @type PolymerElementConstructor*/this.prototype).constructor.importPath;
        }
        return this._importPath;
      }

      /**
       * Overrides the default `Polymer.PropertyAccessors` to ensure class
       * metaprogramming related to property accessors and effects has
       * completed (calls `finalize`).
       *
       * It also initializes any property defaults provided via `value` in
       * `properties` metadata.
       *
       * @override
       * @suppress {invalidCasts}
       */
      _initializeProperties() {
        Polymer.telemetry.instanceCount++;
        this.constructor.finalize();
        const importPath = this.constructor.importPath;
        // note: finalize template when we have access to `localName` to
        // avoid dependence on `is` for polyfilling styling.
        if (this._template && !this._template.__polymerFinalized) {
          this._template.__polymerFinalized = true;
          const baseURI = importPath ? Polymer.ResolveUrl.resolveUrl(importPath) : '';
          finalizeTemplate( /** @type {!PolymerElement} */this.__proto__, this._template, baseURI,
          /**@type {!HTMLElement}*/this.localName);
        }
        super._initializeProperties();
        // set path defaults
        this.rootPath = Polymer.rootPath;
        this.importPath = importPath;
        // apply property defaults...
        let p$ = propertyDefaultsForClass(this.constructor);
        if (!p$) {
          return;
        }
        for (let p in p$) {
          let info = p$[p];
          // Don't set default value if there is already an own property, which
          // happens when a `properties` property with default but no effects had
          // a property set (e.g. bound) by its host before upgrade
          if (!this.hasOwnProperty(p)) {
            let value = typeof info.value == 'function' ? info.value.call(this) : info.value;
            // Set via `_setProperty` if there is an accessor, to enable
            // initializing readOnly property defaults
            if (this._hasAccessor(p)) {
              this._setPendingProperty(p, value, true);
            } else {
              this[p] = value;
            }
          }
        }
      }

      /**
       * Provides a default implementation of the standard Custom Elements
       * `connectedCallback`.
       *
       * The default implementation enables the property effects system and
       * flushes any pending properties, and updates shimmed CSS properties
       * when using the ShadyCSS scoping/custom properties polyfill.
       *
       * @suppress {invalidCasts}
       */
      connectedCallback() {
        if (window.ShadyCSS && this._template) {
          window.ShadyCSS.styleElement( /** @type {!HTMLElement} */this);
        }
        this._enableProperties();
      }

      /**
       * Provides a default implementation of the standard Custom Elements
       * `disconnectedCallback`.
       */
      disconnectedCallback() {}

      /**
       * Stamps the element template.
       *
       * @override
       */
      ready() {
        if (this._template) {
          this.root = this._stampTemplate(this._template);
          this.$ = this.root.$;
        }
        super.ready();
      }

      /**
       * Implements `PropertyEffects`'s `_readyClients` call. Attaches
       * element dom by calling `_attachDom` with the dom stamped from the
       * element's template via `_stampTemplate`. Note that this allows
       * client dom to be attached to the element prior to any observers
       * running.
       *
       * @override
       */
      _readyClients() {
        if (this._template) {
          this.root = this._attachDom(this.root);
        }
        // The super._readyClients here sets the clients initialized flag.
        // We must wait to do this until after client dom is created/attached
        // so that this flag can be checked to prevent notifications fired
        // during this process from being handled before clients are ready.
        super._readyClients();
      }

      /**
       * Attaches an element's stamped dom to itself. By default,
       * this method creates a `shadowRoot` and adds the dom to it.
       * However, this method may be overridden to allow an element
       * to put its dom in another location.
       *
       * @throws {Error}
       * @suppress {missingReturn}
       * @param {NodeList} dom to attach to the element.
       * @return {Node} node to which the dom has been attached.
       */
      _attachDom(dom) {
        if (this.attachShadow) {
          if (dom) {
            if (!this.shadowRoot) {
              this.attachShadow({ mode: 'open' });
            }
            this.shadowRoot.appendChild(dom);
            return this.shadowRoot;
          }
          return null;
        } else {
          throw new Error('ShadowDOM not available. ' +
          // TODO(sorvell): move to compile-time conditional when supported
          'Polymer.Element can create dom as children instead of in ' + 'ShadowDOM by setting `this.root = this;\` before \`ready\`.');
        }
      }

      /**
       * Provides a default implementation of the standard Custom Elements
       * `attributeChangedCallback`.
       *
       * By default, attributes declared in `properties` metadata are
       * deserialized using their `type` information to properties of the
       * same name.  "Dash-cased" attributes are deserialzed to "camelCase"
       * properties.
       *
       * @param {string} name Name of attribute.
       * @param {?string} old Old value of attribute.
       * @param {?string} value Current value of attribute.
       * @override
       */
      attributeChangedCallback(name, old, value) {
        if (old !== value) {
          let property = caseMap.dashToCamelCase(name);
          let type = propertiesForClass(this.constructor)[property].type;
          if (!this._hasReadOnlyEffect(property)) {
            this._attributeToProperty(name, value, type);
          }
        }
      }

      /**
       * When using the ShadyCSS scoping and custom property shim, causes all
       * shimmed styles in this element (and its subtree) to be updated
       * based on current custom property values.
       *
       * The optional parameter overrides inline custom property styles with an
       * object of properties where the keys are CSS properties, and the values
       * are strings.
       *
       * Example: `this.updateStyles({'--color': 'blue'})`
       *
       * These properties are retained unless a value of `null` is set.
       *
       * @param {Object=} properties Bag of custom property key/values to
       *   apply to this element.
       * @suppress {invalidCasts}
       */
      updateStyles(properties) {
        if (window.ShadyCSS) {
          window.ShadyCSS.styleSubtree( /** @type {!HTMLElement} */this, properties);
        }
      }

      /**
       * Rewrites a given URL relative to a base URL. The base URL defaults to
       * the original location of the document containing the `dom-module` for
       * this element. This method will return the same URL before and after
       * bundling.
       *
       * @param {string} url URL to resolve.
       * @param {string=} base Optional base URL to resolve against, defaults
       * to the element's `importPath`
       * @return {string} Rewritten URL relative to base
       */
      resolveUrl(url, base) {
        if (!base && this.importPath) {
          base = Polymer.ResolveUrl.resolveUrl(this.importPath);
        }
        return Polymer.ResolveUrl.resolveUrl(url, base);
      }

      /**
       * Overrides `PropertyAccessors` to add map of dynamic functions on
       * template info, for consumption by `PropertyEffects` template binding
       * code. This map determines which method templates should have accessors
       * created for them.
       *
       * @override
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       */
      static _parseTemplateContent(template, templateInfo, nodeInfo) {
        templateInfo.dynamicFns = templateInfo.dynamicFns || propertiesForClass(this);
        return super._parseTemplateContent(template, templateInfo, nodeInfo);
      }

    }

    return PolymerElement;
  });

  /**
   * Provides basic tracking of element definitions (registrations) and
   * instance counts.
   *
   * @namespace
   * @summary Provides basic tracking of element definitions (registrations) and
   * instance counts.
   */
  Polymer.telemetry = {
    /**
     * Total number of Polymer element instances created.
     * @type {number}
     */
    instanceCount: 0,
    /**
     * Array of Polymer element classes that have been finalized.
     * @type {Array<Polymer.Element>}
     */
    registrations: [],
    /**
     * @param {!PolymerElementConstructor} prototype Element prototype to log
     * @this {this}
     * @private
     */
    _regLog: function (prototype) {
      console.log('[' + prototype.is + ']: registered');
    },
    /**
     * Registers a class prototype for telemetry purposes.
     * @param {HTMLElement} prototype Element prototype to register
     * @this {this}
     * @protected
     */
    register: function (prototype) {
      this.registrations.push(prototype);
      Polymer.log && this._regLog(prototype);
    },
    /**
     * Logs all elements registered with an `is` to the console.
     * @public
     * @this {this}
     */
    dumpRegistrations: function () {
      this.registrations.forEach(this._regLog);
    }
  };

  /**
   * When using the ShadyCSS scoping and custom property shim, causes all
   * shimmed `styles` (via `custom-style`) in the document (and its subtree)
   * to be updated based on current custom property values.
   *
   * The optional parameter overrides inline custom property styles with an
   * object of properties where the keys are CSS properties, and the values
   * are strings.
   *
   * Example: `Polymer.updateStyles({'--color': 'blue'})`
   *
   * These properties are retained unless a value of `null` is set.
   *
   * @param {Object=} props Bag of custom property key/values to
   *   apply to the document.
   */
  Polymer.updateStyles = function (props) {
    if (window.ShadyCSS) {
      window.ShadyCSS.styleDocument(props);
    }
  };
})();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

__webpack_require__(1);

/** @suppress {deprecated} */
(function () {
  'use strict';

  /**
   * Legacy settings.
   * @namespace
   * @memberof Polymer
   */

  const settings = Polymer.Settings || {};
  settings.useShadow = !window.ShadyDOM;
  settings.useNativeCSSProperties = Boolean(!window.ShadyCSS || window.ShadyCSS.nativeCss);
  settings.useNativeCustomElements = !window.customElements.polyfillWrapFlushCallback;

  /**
   * Sets the global, legacy settings.
   *
   * @deprecated
   * @memberof Polymer
   */
  Polymer.Settings = settings;

  /**
   * Globally settable property that is automatically assigned to
   * `Polymer.ElementMixin` instances, useful for binding in templates to
   * make URL's relative to an application's root.  Defaults to the main
   * document URL, but can be overridden by users.  It may be useful to set
   * `Polymer.rootPath` to provide a stable application mount path when
   * using client side routing.
   *
   * @memberof Polymer
   */
  let rootPath = Polymer.rootPath || Polymer.ResolveUrl.pathFromUrl(document.baseURI || window.location.href);

  Polymer.rootPath = rootPath;

  /**
   * Sets the global rootPath property used by `Polymer.ElementMixin` and
   * available via `Polymer.rootPath`.
   *
   * @memberof Polymer
   * @param {string} path The new root path
   */
  Polymer.setRootPath = function (path) {
    Polymer.rootPath = path;
  };
})();

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(1);

(function () {
  'use strict';

  const MODULE_STYLE_LINK_SELECTOR = 'link[rel=import][type~=css]';
  const INCLUDE_ATTR = 'include';

  function importModule(moduleId) {
    if (!Polymer.DomModule) {
      return null;
    }
    return Polymer.DomModule.import(moduleId);
  }

  /** @typedef {{assetpath: string}} */
  let templateWithAssetPath; // eslint-disable-line no-unused-vars

  /**
   * Module with utilities for collection CSS text from `<templates>`, external
   * stylesheets, and `dom-module`s.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module with utilities for collection CSS text from various sources.
   */
  const StyleGather = {

    /**
     * Returns CSS text of styles in a space-separated list of `dom-module`s.
     *
     * @memberof Polymer.StyleGather
     * @param {string} moduleIds List of dom-module id's within which to
     * search for css.
     * @return {string} Concatenated CSS content from specified `dom-module`s
     * @this {StyleGather}
     */
    cssFromModules(moduleIds) {
      let modules = moduleIds.trim().split(' ');
      let cssText = '';
      for (let i = 0; i < modules.length; i++) {
        cssText += this.cssFromModule(modules[i]);
      }
      return cssText;
    },

    /**
     * Returns CSS text of styles in a given `dom-module`.  CSS in a `dom-module`
     * can come either from `<style>`s within the first `<template>`, or else
     * from one or more `<link rel="import" type="css">` links outside the
     * template.
     *
     * Any `<styles>` processed are removed from their original location.
     *
     * @memberof Polymer.StyleGather
     * @param {string} moduleId dom-module id to gather styles from
     * @return {string} Concatenated CSS content from specified `dom-module`
     * @this {StyleGather}
     */
    cssFromModule(moduleId) {
      let m = importModule(moduleId);
      if (m && m._cssText === undefined) {
        let cssText = '';
        // include css from the first template in the module
        let t = m.querySelector('template');
        if (t) {
          cssText += this.cssFromTemplate(t, /** @type {templateWithAssetPath }*/m.assetpath);
        }
        // module imports: <link rel="import" type="css">
        cssText += this.cssFromModuleImports(moduleId);
        m._cssText = cssText || null;
      }
      if (!m) {
        console.warn('Could not find style data in module named', moduleId);
      }
      return m && m._cssText || '';
    },

    /**
     * Returns CSS text of `<styles>` within a given template.
     *
     * Any `<styles>` processed are removed from their original location.
     *
     * @memberof Polymer.StyleGather
     * @param {HTMLTemplateElement} template Template to gather styles from
     * @param {string} baseURI Base URI to resolve the URL against
     * @return {string} Concatenated CSS content from specified template
     * @this {StyleGather}
     */
    cssFromTemplate(template, baseURI) {
      let cssText = '';
      // if element is a template, get content from its .content
      let e$ = template.content.querySelectorAll('style');
      for (let i = 0; i < e$.length; i++) {
        let e = e$[i];
        // support style sharing by allowing styles to "include"
        // other dom-modules that contain styling
        let include = e.getAttribute(INCLUDE_ATTR);
        if (include) {
          cssText += this.cssFromModules(include);
        }
        e.parentNode.removeChild(e);
        cssText += baseURI ? Polymer.ResolveUrl.resolveCss(e.textContent, baseURI) : e.textContent;
      }
      return cssText;
    },

    /**
     * Returns CSS text from stylsheets loaded via `<link rel="import" type="css">`
     * links within the specified `dom-module`.
     *
     * @memberof Polymer.StyleGather
     * @param {string} moduleId Id of `dom-module` to gather CSS from
     * @return {string} Concatenated CSS content from links in specified `dom-module`
     * @this {StyleGather}
     */
    cssFromModuleImports(moduleId) {
      let cssText = '';
      let m = importModule(moduleId);
      if (!m) {
        return cssText;
      }
      let p$ = m.querySelectorAll(MODULE_STYLE_LINK_SELECTOR);
      for (let i = 0; i < p$.length; i++) {
        let p = p$[i];
        if (p.import) {
          let importDoc = p.import;
          // NOTE: polyfill affordance.
          // under the HTMLImports polyfill, there will be no 'body',
          // but the import pseudo-doc can be used directly.
          let container = importDoc.body ? importDoc.body : importDoc;
          cssText += Polymer.ResolveUrl.resolveCss(container.textContent, importDoc.baseURI);
        }
      }
      return cssText;
    }
  };

  Polymer.StyleGather = StyleGather;
})();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

__webpack_require__(1);

(function () {
  'use strict';

  let modules = {};
  let lcModules = {};
  function findModule(id) {
    return modules[id] || lcModules[id.toLowerCase()];
  }

  function styleOutsideTemplateCheck(inst) {
    if (inst.querySelector('style')) {
      console.warn('dom-module %s has style outside template', inst.id);
    }
  }

  /**
   * The `dom-module` element registers the dom it contains to the name given
   * by the module's id attribute. It provides a unified database of dom
   * accessible via its static `import` API.
   *
   * A key use case of `dom-module` is for providing custom element `<template>`s
   * via HTML imports that are parsed by the native HTML parser, that can be
   * relocated during a bundling pass and still looked up by `id`.
   *
   * Example:
   *
   *     <dom-module id="foo">
   *       <img src="stuff.png">
   *     </dom-module>
   *
   * Then in code in some other location that cannot access the dom-module above
   *
   *     let img = document.createElement('dom-module').import('foo', 'img');
   *
   * @customElement
   * @extends HTMLElement
   * @memberof Polymer
   * @summary Custom element that provides a registry of relocatable DOM content
   *   by `id` that is agnostic to bundling.
   * @unrestricted
   */
  class DomModule extends HTMLElement {

    static get observedAttributes() {
      return ['id'];
    }

    /**
     * Retrieves the element specified by the css `selector` in the module
     * registered by `id`. For example, this.import('foo', 'img');
     * @param {string} id The id of the dom-module in which to search.
     * @param {string=} selector The css selector by which to find the element.
     * @return {Element} Returns the element which matches `selector` in the
     * module registered at the specified `id`.
     */
    static import(id, selector) {
      if (id) {
        let m = findModule(id);
        if (m && selector) {
          return m.querySelector(selector);
        }
        return m;
      }
      return null;
    }

    attributeChangedCallback(name, old, value) {
      if (old !== value) {
        this.register();
      }
    }

    /**
     * The absolute URL of the original location of this `dom-module`.
     *
     * This value will differ from this element's `ownerDocument` in the
     * following ways:
     * - Takes into account any `assetpath` attribute added during bundling
     *   to indicate the original location relative to the bundled location
     * - Uses the HTMLImports polyfill's `importForElement` API to ensure
     *   the path is relative to the import document's location since
     *   `ownerDocument` is not currently polyfilled
     */
    get assetpath() {
      // Don't override existing assetpath.
      if (!this.__assetpath) {
        // note: assetpath set via an attribute must be relative to this
        // element's location; accomodate polyfilled HTMLImports
        const owner = window.HTMLImports && HTMLImports.importForElement ? HTMLImports.importForElement(this) || document : this.ownerDocument;
        const url = Polymer.ResolveUrl.resolveUrl(this.getAttribute('assetpath') || '', owner.baseURI);
        this.__assetpath = Polymer.ResolveUrl.pathFromUrl(url);
      }
      return this.__assetpath;
    }

    /**
     * Registers the dom-module at a given id. This method should only be called
     * when a dom-module is imperatively created. For
     * example, `document.createElement('dom-module').register('foo')`.
     * @param {string=} id The id at which to register the dom-module.
     */
    register(id) {
      id = id || this.id;
      if (id) {
        this.id = id;
        // store id separate from lowercased id so that
        // in all cases mixedCase id will stored distinctly
        // and lowercase version is a fallback
        modules[id] = this;
        lcModules[id.toLowerCase()] = this;
        styleOutsideTemplateCheck(this);
      }
    }
  }

  DomModule.prototype['modules'] = modules;

  customElements.define('dom-module', DomModule);

  // export
  Polymer.DomModule = DomModule;
})();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

__webpack_require__(2);

__webpack_require__(14);

__webpack_require__(3);

__webpack_require__(15);

__webpack_require__(17);

(function () {

  'use strict';

  /** @const {Object} */

  const CaseMap = Polymer.CaseMap;

  // Monotonically increasing unique ID used for de-duping effects triggered
  // from multiple properties in the same turn
  let dedupeId = 0;

  /**
   * Property effect types; effects are stored on the prototype using these keys
   * @enum {string}
   */
  const TYPES = {
    COMPUTE: '__computeEffects',
    REFLECT: '__reflectEffects',
    NOTIFY: '__notifyEffects',
    PROPAGATE: '__propagateEffects',
    OBSERVE: '__observeEffects',
    READ_ONLY: '__readOnly'

    /**
     * @typedef {{
     * name: (string | undefined),
     * structured: (boolean | undefined),
     * wildcard: (boolean | undefined)
     * }}
     */
  };let DataTrigger; //eslint-disable-line no-unused-vars

  /**
   * @typedef {{
   * info: ?,
   * trigger: (!DataTrigger | undefined),
   * fn: (!Function | undefined)
   * }}
   */
  let DataEffect; //eslint-disable-line no-unused-vars

  let PropertyEffectsType; //eslint-disable-line no-unused-vars

  /**
   * Ensures that the model has an own-property map of effects for the given type.
   * The model may be a prototype or an instance.
   *
   * Property effects are stored as arrays of effects by property in a map,
   * by named type on the model. e.g.
   *
   *   __computeEffects: {
   *     foo: [ ... ],
   *     bar: [ ... ]
   *   }
   *
   * If the model does not yet have an effect map for the type, one is created
   * and returned.  If it does, but it is not an own property (i.e. the
   * prototype had effects), the the map is deeply cloned and the copy is
   * set on the model and returned, ready for new effects to be added.
   *
   * @param {Object} model Prototype or instance
   * @param {string} type Property effect type
   * @return {Object} The own-property map of effects for the given type
   * @private
   */
  function ensureOwnEffectMap(model, type) {
    let effects = model[type];
    if (!effects) {
      effects = model[type] = {};
    } else if (!model.hasOwnProperty(type)) {
      effects = model[type] = Object.create(model[type]);
      for (let p in effects) {
        let protoFx = effects[p];
        let instFx = effects[p] = Array(protoFx.length);
        for (let i = 0; i < protoFx.length; i++) {
          instFx[i] = protoFx[i];
        }
      }
    }
    return effects;
  }

  // -- effects ----------------------------------------------

  /**
   * Runs all effects of a given type for the given set of property changes
   * on an instance.
   *
   * @param {!PropertyEffectsType} inst The instance with effects to run
   * @param {Object} effects Object map of property-to-Array of effects
   * @param {Object} props Bag of current property changes
   * @param {Object=} oldProps Bag of previous values for changed properties
   * @param {boolean=} hasPaths True with `props` contains one or more paths
   * @param {*=} extraArgs Additional metadata to pass to effect function
   * @return {boolean} True if an effect ran for this property
   * @private
   */
  function runEffects(inst, effects, props, oldProps, hasPaths, extraArgs) {
    if (effects) {
      let ran = false;
      let id = dedupeId++;
      for (let prop in props) {
        if (runEffectsForProperty(inst, effects, id, prop, props, oldProps, hasPaths, extraArgs)) {
          ran = true;
        }
      }
      return ran;
    }
    return false;
  }

  /**
   * Runs a list of effects for a given property.
   *
   * @param {!PropertyEffectsType} inst The instance with effects to run
   * @param {Object} effects Object map of property-to-Array of effects
   * @param {number} dedupeId Counter used for de-duping effects
   * @param {string} prop Name of changed property
   * @param {*} props Changed properties
   * @param {*} oldProps Old properties
   * @param {boolean=} hasPaths True with `props` contains one or more paths
   * @param {*=} extraArgs Additional metadata to pass to effect function
   * @return {boolean} True if an effect ran for this property
   * @private
   */
  function runEffectsForProperty(inst, effects, dedupeId, prop, props, oldProps, hasPaths, extraArgs) {
    let ran = false;
    let rootProperty = hasPaths ? Polymer.Path.root(prop) : prop;
    let fxs = effects[rootProperty];
    if (fxs) {
      for (let i = 0, l = fxs.length, fx; i < l && (fx = fxs[i]); i++) {
        if ((!fx.info || fx.info.lastRun !== dedupeId) && (!hasPaths || pathMatchesTrigger(prop, fx.trigger))) {
          if (fx.info) {
            fx.info.lastRun = dedupeId;
          }
          fx.fn(inst, prop, props, oldProps, fx.info, hasPaths, extraArgs);
          ran = true;
        }
      }
    }
    return ran;
  }

  /**
   * Determines whether a property/path that has changed matches the trigger
   * criteria for an effect.  A trigger is a descriptor with the following
   * structure, which matches the descriptors returned from `parseArg`.
   * e.g. for `foo.bar.*`:
   * ```
   * trigger: {
   *   name: 'a.b',
   *   structured: true,
   *   wildcard: true
   * }
   * ```
   * If no trigger is given, the path is deemed to match.
   *
   * @param {string} path Path or property that changed
   * @param {DataTrigger} trigger Descriptor
   * @return {boolean} Whether the path matched the trigger
   */
  function pathMatchesTrigger(path, trigger) {
    if (trigger) {
      let triggerPath = trigger.name;
      return triggerPath == path || trigger.structured && Polymer.Path.isAncestor(triggerPath, path) || trigger.wildcard && Polymer.Path.isDescendant(triggerPath, path);
    } else {
      return true;
    }
  }

  /**
   * Implements the "observer" effect.
   *
   * Calls the method with `info.methodName` on the instance, passing the
   * new and old values.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @private
   */
  function runObserverEffect(inst, property, props, oldProps, info) {
    let fn = inst[info.methodName];
    let changedProp = info.property;
    if (fn) {
      fn.call(inst, inst.__data[changedProp], oldProps[changedProp]);
    } else if (!info.dynamicFn) {
      console.warn('observer method `' + info.methodName + '` not defined');
    }
  }

  /**
   * Runs "notify" effects for a set of changed properties.
   *
   * This method differs from the generic `runEffects` method in that it
   * will dispatch path notification events in the case that the property
   * changed was a path and the root property for that path didn't have a
   * "notify" effect.  This is to maintain 1.0 behavior that did not require
   * `notify: true` to ensure object sub-property notifications were
   * sent.
   *
   * @param {!PropertyEffectsType} inst The instance with effects to run
   * @param {Object} notifyProps Bag of properties to notify
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @private
   */
  function runNotifyEffects(inst, notifyProps, props, oldProps, hasPaths) {
    // Notify
    let fxs = inst[TYPES.NOTIFY];
    let notified;
    let id = dedupeId++;
    // Try normal notify effects; if none, fall back to try path notification
    for (let prop in notifyProps) {
      if (notifyProps[prop]) {
        if (fxs && runEffectsForProperty(inst, fxs, id, prop, props, oldProps, hasPaths)) {
          notified = true;
        } else if (hasPaths && notifyPath(inst, prop, props)) {
          notified = true;
        }
      }
    }
    // Flush host if we actually notified and host was batching
    // And the host has already initialized clients; this prevents
    // an issue with a host observing data changes before clients are ready.
    let host;
    if (notified && (host = inst.__dataHost) && host._invalidateProperties) {
      host._invalidateProperties();
    }
  }

  /**
   * Dispatches {property}-changed events with path information in the detail
   * object to indicate a sub-path of the property was changed.
   *
   * @param {!PropertyEffectsType} inst The element from which to fire the event
   * @param {string} path The path that was changed
   * @param {Object} props Bag of current property changes
   * @return {boolean} Returns true if the path was notified
   * @private
   */
  function notifyPath(inst, path, props) {
    let rootProperty = Polymer.Path.root(path);
    if (rootProperty !== path) {
      let eventName = Polymer.CaseMap.camelToDashCase(rootProperty) + '-changed';
      dispatchNotifyEvent(inst, eventName, props[path], path);
      return true;
    }
    return false;
  }

  /**
   * Dispatches {property}-changed events to indicate a property (or path)
   * changed.
   *
   * @param {!PropertyEffectsType} inst The element from which to fire the event
   * @param {string} eventName The name of the event to send ('{property}-changed')
   * @param {*} value The value of the changed property
   * @param {string | null | undefined} path If a sub-path of this property changed, the path
   *   that changed (optional).
   * @private
   * @suppress {invalidCasts}
   */
  function dispatchNotifyEvent(inst, eventName, value, path) {
    let detail = {
      value: value,
      queueProperty: true
    };
    if (path) {
      detail.path = path;
    }
    /** @type {!HTMLElement} */inst.dispatchEvent(new CustomEvent(eventName, { detail }));
  }

  /**
   * Implements the "notify" effect.
   *
   * Dispatches a non-bubbling event named `info.eventName` on the instance
   * with a detail object containing the new `value`.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @private
   */
  function runNotifyEffect(inst, property, props, oldProps, info, hasPaths) {
    let rootProperty = hasPaths ? Polymer.Path.root(property) : property;
    let path = rootProperty != property ? property : null;
    let value = path ? Polymer.Path.get(inst, path) : inst.__data[property];
    if (path && value === undefined) {
      value = props[property]; // specifically for .splices
    }
    dispatchNotifyEvent(inst, info.eventName, value, path);
  }

  /**
   * Handler function for 2-way notification events. Receives context
   * information captured in the `addNotifyListener` closure from the
   * `__notifyListeners` metadata.
   *
   * Sets the value of the notified property to the host property or path.  If
   * the event contained path information, translate that path to the host
   * scope's name for that path first.
   *
   * @param {CustomEvent} event Notification event (e.g. '<property>-changed')
   * @param {!PropertyEffectsType} inst Host element instance handling the notification event
   * @param {string} fromProp Child element property that was bound
   * @param {string} toPath Host property/path that was bound
   * @param {boolean} negate Whether the binding was negated
   * @private
   */
  function handleNotification(event, inst, fromProp, toPath, negate) {
    let value;
    let detail = /** @type {Object} */event.detail;
    let fromPath = detail && detail.path;
    if (fromPath) {
      toPath = Polymer.Path.translate(fromProp, toPath, fromPath);
      value = detail && detail.value;
    } else {
      value = event.target[fromProp];
    }
    value = negate ? !value : value;
    if (!inst[TYPES.READ_ONLY] || !inst[TYPES.READ_ONLY][toPath]) {
      if (inst._setPendingPropertyOrPath(toPath, value, true, Boolean(fromPath)) && (!detail || !detail.queueProperty)) {
        inst._invalidateProperties();
      }
    }
  }

  /**
   * Implements the "reflect" effect.
   *
   * Sets the attribute named `info.attrName` to the given property value.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @private
   */
  function runReflectEffect(inst, property, props, oldProps, info) {
    let value = inst.__data[property];
    if (Polymer.sanitizeDOMValue) {
      value = Polymer.sanitizeDOMValue(value, info.attrName, 'attribute', /** @type {Node} */inst);
    }
    inst._propertyToAttribute(property, info.attrName, value);
  }

  /**
   * Runs "computed" effects for a set of changed properties.
   *
   * This method differs from the generic `runEffects` method in that it
   * continues to run computed effects based on the output of each pass until
   * there are no more newly computed properties.  This ensures that all
   * properties that will be computed by the initial set of changes are
   * computed before other effects (binding propagation, observers, and notify)
   * run.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {!Object} changedProps Bag of changed properties
   * @param {!Object} oldProps Bag of previous values for changed properties
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @private
   */
  function runComputedEffects(inst, changedProps, oldProps, hasPaths) {
    let computeEffects = inst[TYPES.COMPUTE];
    if (computeEffects) {
      let inputProps = changedProps;
      while (runEffects(inst, computeEffects, inputProps, oldProps, hasPaths)) {
        Object.assign(oldProps, inst.__dataOld);
        Object.assign(changedProps, inst.__dataPending);
        inputProps = inst.__dataPending;
        inst.__dataPending = null;
      }
    }
  }

  /**
   * Implements the "computed property" effect by running the method with the
   * values of the arguments specified in the `info` object and setting the
   * return value to the computed property specified.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @private
   */
  function runComputedEffect(inst, property, props, oldProps, info) {
    let result = runMethodEffect(inst, property, props, oldProps, info);
    let computedProp = info.methodInfo;
    if (inst.__dataHasAccessor && inst.__dataHasAccessor[computedProp]) {
      inst._setPendingProperty(computedProp, result, true);
    } else {
      inst[computedProp] = result;
    }
  }

  /**
   * Computes path changes based on path links set up using the `linkPaths`
   * API.
   *
   * @param {!PropertyEffectsType} inst The instance whose props are changing
   * @param {string | !Array<(string|number)>} path Path that has changed
   * @param {*} value Value of changed path
   * @private
   */
  function computeLinkedPaths(inst, path, value) {
    let links = inst.__dataLinkedPaths;
    if (links) {
      let link;
      for (let a in links) {
        let b = links[a];
        if (Polymer.Path.isDescendant(a, path)) {
          link = Polymer.Path.translate(a, b, path);
          inst._setPendingPropertyOrPath(link, value, true, true);
        } else if (Polymer.Path.isDescendant(b, path)) {
          link = Polymer.Path.translate(b, a, path);
          inst._setPendingPropertyOrPath(link, value, true, true);
        }
      }
    }
  }

  // -- bindings ----------------------------------------------

  /**
   * Adds binding metadata to the current `nodeInfo`, and binding effects
   * for all part dependencies to `templateInfo`.
   *
   * @param {Function} constructor Class that `_parseTemplate` is currently
   *   running on
   * @param {TemplateInfo} templateInfo Template metadata for current template
   * @param {NodeInfo} nodeInfo Node metadata for current template node
   * @param {string} kind Binding kind, either 'property', 'attribute', or 'text'
   * @param {string} target Target property name
   * @param {!Array<!BindingPart>} parts Array of binding part metadata
   * @param {string=} literal Literal text surrounding binding parts (specified
   *   only for 'property' bindings, since these must be initialized as part
   *   of boot-up)
   * @private
   */
  function addBinding(constructor, templateInfo, nodeInfo, kind, target, parts, literal) {
    // Create binding metadata and add to nodeInfo
    nodeInfo.bindings = nodeInfo.bindings || [];
    let /** Binding */binding = { kind, target, parts, literal, isCompound: parts.length !== 1 };
    nodeInfo.bindings.push(binding);
    // Add listener info to binding metadata
    if (shouldAddListener(binding)) {
      let { event, negate } = binding.parts[0];
      binding.listenerEvent = event || CaseMap.camelToDashCase(target) + '-changed';
      binding.listenerNegate = negate;
    }
    // Add "propagate" property effects to templateInfo
    let index = templateInfo.nodeInfoList.length;
    for (let i = 0; i < binding.parts.length; i++) {
      let part = binding.parts[i];
      part.compoundIndex = i;
      addEffectForBindingPart(constructor, templateInfo, binding, part, index);
    }
  }

  /**
   * Adds property effects to the given `templateInfo` for the given binding
   * part.
   *
   * @param {Function} constructor Class that `_parseTemplate` is currently
   *   running on
   * @param {TemplateInfo} templateInfo Template metadata for current template
   * @param {!Binding} binding Binding metadata
   * @param {!BindingPart} part Binding part metadata
   * @param {number} index Index into `nodeInfoList` for this node
   */
  function addEffectForBindingPart(constructor, templateInfo, binding, part, index) {
    if (!part.literal) {
      if (binding.kind === 'attribute' && binding.target[0] === '-') {
        console.warn('Cannot set attribute ' + binding.target + ' because "-" is not a valid attribute starting character');
      } else {
        let dependencies = part.dependencies;
        let info = { index, binding, part, evaluator: constructor };
        for (let j = 0; j < dependencies.length; j++) {
          let trigger = dependencies[j];
          if (typeof trigger == 'string') {
            trigger = parseArg(trigger);
            trigger.wildcard = true;
          }
          constructor._addTemplatePropertyEffect(templateInfo, trigger.rootProperty, {
            fn: runBindingEffect,
            info, trigger
          });
        }
      }
    }
  }

  /**
   * Implements the "binding" (property/path binding) effect.
   *
   * Note that binding syntax is overridable via `_parseBindings` and
   * `_evaluateBinding`.  This method will call `_evaluateBinding` for any
   * non-literal parts returned from `_parseBindings`.  However,
   * there is no support for _path_ bindings via custom binding parts,
   * as this is specific to Polymer's path binding syntax.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} path Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @param {Array} nodeList List of nodes associated with `nodeInfoList` template
   *   metadata
   * @private
   */
  function runBindingEffect(inst, path, props, oldProps, info, hasPaths, nodeList) {
    let node = nodeList[info.index];
    let binding = info.binding;
    let part = info.part;
    // Subpath notification: transform path and set to client
    // e.g.: foo="{{obj.sub}}", path: 'obj.sub.prop', set 'foo.prop'=obj.sub.prop
    if (hasPaths && part.source && path.length > part.source.length && binding.kind == 'property' && !binding.isCompound && node.__dataHasAccessor && node.__dataHasAccessor[binding.target]) {
      let value = props[path];
      path = Polymer.Path.translate(part.source, binding.target, path);
      if (node._setPendingPropertyOrPath(path, value, false, true)) {
        inst._enqueueClient(node);
      }
    } else {
      let value = info.evaluator._evaluateBinding(inst, part, path, props, oldProps, hasPaths);
      // Propagate value to child
      applyBindingValue(inst, node, binding, part, value);
    }
  }

  /**
   * Sets the value for an "binding" (binding) effect to a node,
   * either as a property or attribute.
   *
   * @param {!PropertyEffectsType} inst The instance owning the binding effect
   * @param {Node} node Target node for binding
   * @param {!Binding} binding Binding metadata
   * @param {!BindingPart} part Binding part metadata
   * @param {*} value Value to set
   * @private
   */
  function applyBindingValue(inst, node, binding, part, value) {
    value = computeBindingValue(node, value, binding, part);
    if (Polymer.sanitizeDOMValue) {
      value = Polymer.sanitizeDOMValue(value, binding.target, binding.kind, node);
    }
    if (binding.kind == 'attribute') {
      // Attribute binding
      inst._valueToNodeAttribute( /** @type {Element} */node, value, binding.target);
    } else {
      // Property binding
      let prop = binding.target;
      if (node.__dataHasAccessor && node.__dataHasAccessor[prop]) {
        if (!node[TYPES.READ_ONLY] || !node[TYPES.READ_ONLY][prop]) {
          if (node._setPendingProperty(prop, value)) {
            inst._enqueueClient(node);
          }
        }
      } else {
        inst._setUnmanagedPropertyToNode(node, prop, value);
      }
    }
  }

  /**
   * Transforms an "binding" effect value based on compound & negation
   * effect metadata, as well as handling for special-case properties
   *
   * @param {Node} node Node the value will be set to
   * @param {*} value Value to set
   * @param {!Binding} binding Binding metadata
   * @param {!BindingPart} part Binding part metadata
   * @return {*} Transformed value to set
   * @private
   */
  function computeBindingValue(node, value, binding, part) {
    if (binding.isCompound) {
      let storage = node.__dataCompoundStorage[binding.target];
      storage[part.compoundIndex] = value;
      value = storage.join('');
    }
    if (binding.kind !== 'attribute') {
      // Some browsers serialize `undefined` to `"undefined"`
      if (binding.target === 'textContent' || node.localName == 'input' && binding.target == 'value') {
        value = value == undefined ? '' : value;
      }
    }
    return value;
  }

  /**
   * Returns true if a binding's metadata meets all the requirements to allow
   * 2-way binding, and therefore a `<property>-changed` event listener should be
   * added:
   * - used curly braces
   * - is a property (not attribute) binding
   * - is not a textContent binding
   * - is not compound
   *
   * @param {!Binding} binding Binding metadata
   * @return {boolean} True if 2-way listener should be added
   * @private
   */
  function shouldAddListener(binding) {
    return Boolean(binding.target) && binding.kind != 'attribute' && binding.kind != 'text' && !binding.isCompound && binding.parts[0].mode === '{';
  }

  /**
   * Setup compound binding storage structures, notify listeners, and dataHost
   * references onto the bound nodeList.
   *
   * @param {!PropertyEffectsType} inst Instance that bas been previously bound
   * @param {TemplateInfo} templateInfo Template metadata
   * @private
   */
  function setupBindings(inst, templateInfo) {
    // Setup compound storage, dataHost, and notify listeners
    let { nodeList, nodeInfoList } = templateInfo;
    if (nodeInfoList.length) {
      for (let i = 0; i < nodeInfoList.length; i++) {
        let info = nodeInfoList[i];
        let node = nodeList[i];
        let bindings = info.bindings;
        if (bindings) {
          for (let i = 0; i < bindings.length; i++) {
            let binding = bindings[i];
            setupCompoundStorage(node, binding);
            addNotifyListener(node, inst, binding);
          }
        }
        node.__dataHost = inst;
      }
    }
  }

  /**
   * Initializes `__dataCompoundStorage` local storage on a bound node with
   * initial literal data for compound bindings, and sets the joined
   * literal parts to the bound property.
   *
   * When changes to compound parts occur, they are first set into the compound
   * storage array for that property, and then the array is joined to result in
   * the final value set to the property/attribute.
   *
   * @param {Node} node Bound node to initialize
   * @param {Binding} binding Binding metadata
   * @private
   */
  function setupCompoundStorage(node, binding) {
    if (binding.isCompound) {
      // Create compound storage map
      let storage = node.__dataCompoundStorage || (node.__dataCompoundStorage = {});
      let parts = binding.parts;
      // Copy literals from parts into storage for this binding
      let literals = new Array(parts.length);
      for (let j = 0; j < parts.length; j++) {
        literals[j] = parts[j].literal;
      }
      let target = binding.target;
      storage[target] = literals;
      // Configure properties with their literal parts
      if (binding.literal && binding.kind == 'property') {
        node[target] = binding.literal;
      }
    }
  }

  /**
   * Adds a 2-way binding notification event listener to the node specified
   *
   * @param {Object} node Child element to add listener to
   * @param {!PropertyEffectsType} inst Host element instance to handle notification event
   * @param {Binding} binding Binding metadata
   * @private
   */
  function addNotifyListener(node, inst, binding) {
    if (binding.listenerEvent) {
      let part = binding.parts[0];
      node.addEventListener(binding.listenerEvent, function (e) {
        handleNotification(e, inst, binding.target, part.source, part.negate);
      });
    }
  }

  // -- for method-based effects (complexObserver & computed) --------------

  /**
   * Adds property effects for each argument in the method signature (and
   * optionally, for the method name if `dynamic` is true) that calls the
   * provided effect function.
   *
   * @param {Element | Object} model Prototype or instance
   * @param {!MethodSignature} sig Method signature metadata
   * @param {string} type Type of property effect to add
   * @param {Function} effectFn Function to run when arguments change
   * @param {*=} methodInfo Effect-specific information to be included in
   *   method effect metadata
   * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
   *   method names should be included as a dependency to the effect. Note,
   *   defaults to true if the signature is static (sig.static is true).
   * @private
   */
  function createMethodEffect(model, sig, type, effectFn, methodInfo, dynamicFn) {
    dynamicFn = sig.static || dynamicFn && (typeof dynamicFn !== 'object' || dynamicFn[sig.methodName]);
    let info = {
      methodName: sig.methodName,
      args: sig.args,
      methodInfo,
      dynamicFn
    };
    for (let i = 0, arg; i < sig.args.length && (arg = sig.args[i]); i++) {
      if (!arg.literal) {
        model._addPropertyEffect(arg.rootProperty, type, {
          fn: effectFn, info: info, trigger: arg
        });
      }
    }
    if (dynamicFn) {
      model._addPropertyEffect(sig.methodName, type, {
        fn: effectFn, info: info
      });
    }
  }

  /**
   * Calls a method with arguments marshaled from properties on the instance
   * based on the method signature contained in the effect metadata.
   *
   * Multi-property observers, computed properties, and inline computing
   * functions call this function to invoke the method, then use the return
   * value accordingly.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @return {*} Returns the return value from the method invocation
   * @private
   */
  function runMethodEffect(inst, property, props, oldProps, info) {
    // Instances can optionally have a _methodHost which allows redirecting where
    // to find methods. Currently used by `templatize`.
    let context = inst._methodHost || inst;
    let fn = context[info.methodName];
    if (fn) {
      let args = marshalArgs(inst.__data, info.args, property, props);
      return fn.apply(context, args);
    } else if (!info.dynamicFn) {
      console.warn('method `' + info.methodName + '` not defined');
    }
  }

  const emptyArray = [];

  // Regular expressions used for binding
  const IDENT = '(?:' + '[a-zA-Z_$][\\w.:$\\-*]*' + ')';
  const NUMBER = '(?:' + '[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?' + ')';
  const SQUOTE_STRING = '(?:' + '\'(?:[^\'\\\\]|\\\\.)*\'' + ')';
  const DQUOTE_STRING = '(?:' + '"(?:[^"\\\\]|\\\\.)*"' + ')';
  const STRING = '(?:' + SQUOTE_STRING + '|' + DQUOTE_STRING + ')';
  const ARGUMENT = '(?:(' + IDENT + '|' + NUMBER + '|' + STRING + ')\\s*' + ')';
  const ARGUMENTS = '(?:' + ARGUMENT + '(?:,\\s*' + ARGUMENT + ')*' + ')';
  const ARGUMENT_LIST = '(?:' + '\\(\\s*' + '(?:' + ARGUMENTS + '?' + ')' + '\\)\\s*' + ')';
  const BINDING = '(' + IDENT + '\\s*' + ARGUMENT_LIST + '?' + ')'; // Group 3
  const OPEN_BRACKET = '(\\[\\[|{{)' + '\\s*';
  const CLOSE_BRACKET = '(?:]]|}})';
  const NEGATE = '(?:(!)\\s*)?'; // Group 2
  const EXPRESSION = OPEN_BRACKET + NEGATE + BINDING + CLOSE_BRACKET;
  const bindingRegex = new RegExp(EXPRESSION, "g");

  /**
   * Create a string from binding parts of all the literal parts
   *
   * @param {!Array<BindingPart>} parts All parts to stringify
   * @return {string} String made from the literal parts
   */
  function literalFromParts(parts) {
    let s = '';
    for (let i = 0; i < parts.length; i++) {
      let literal = parts[i].literal;
      s += literal || '';
    }
    return s;
  }

  /**
   * Parses an expression string for a method signature, and returns a metadata
   * describing the method in terms of `methodName`, `static` (whether all the
   * arguments are literals), and an array of `args`
   *
   * @param {string} expression The expression to parse
   * @return {?MethodSignature} The method metadata object if a method expression was
   *   found, otherwise `undefined`
   * @private
   */
  function parseMethod(expression) {
    // tries to match valid javascript property names
    let m = expression.match(/([^\s]+?)\(([\s\S]*)\)/);
    if (m) {
      let methodName = m[1];
      let sig = { methodName, static: true, args: emptyArray };
      if (m[2].trim()) {
        // replace escaped commas with comma entity, split on un-escaped commas
        let args = m[2].replace(/\\,/g, '&comma;').split(',');
        return parseArgs(args, sig);
      } else {
        return sig;
      }
    }
    return null;
  }

  /**
   * Parses an array of arguments and sets the `args` property of the supplied
   * signature metadata object. Sets the `static` property to false if any
   * argument is a non-literal.
   *
   * @param {!Array<string>} argList Array of argument names
   * @param {!MethodSignature} sig Method signature metadata object
   * @return {!MethodSignature} The updated signature metadata object
   * @private
   */
  function parseArgs(argList, sig) {
    sig.args = argList.map(function (rawArg) {
      let arg = parseArg(rawArg);
      if (!arg.literal) {
        sig.static = false;
      }
      return arg;
    }, this);
    return sig;
  }

  /**
   * Parses an individual argument, and returns an argument metadata object
   * with the following fields:
   *
   *   {
   *     value: 'prop',        // property/path or literal value
   *     literal: false,       // whether argument is a literal
   *     structured: false,    // whether the property is a path
   *     rootProperty: 'prop', // the root property of the path
   *     wildcard: false       // whether the argument was a wildcard '.*' path
   *   }
   *
   * @param {string} rawArg The string value of the argument
   * @return {!MethodArg} Argument metadata object
   * @private
   */
  function parseArg(rawArg) {
    // clean up whitespace
    let arg = rawArg.trim()
    // replace comma entity with comma
    .replace(/&comma;/g, ',')
    // repair extra escape sequences; note only commas strictly need
    // escaping, but we allow any other char to be escaped since its
    // likely users will do this
    .replace(/\\(.)/g, '\$1');
    // basic argument descriptor
    let a = {
      name: arg,
      value: '',
      literal: false
    };
    // detect literal value (must be String or Number)
    let fc = arg[0];
    if (fc === '-') {
      fc = arg[1];
    }
    if (fc >= '0' && fc <= '9') {
      fc = '#';
    }
    switch (fc) {
      case "'":
      case '"':
        a.value = arg.slice(1, -1);
        a.literal = true;
        break;
      case '#':
        a.value = Number(arg);
        a.literal = true;
        break;
    }
    // if not literal, look for structured path
    if (!a.literal) {
      a.rootProperty = Polymer.Path.root(arg);
      // detect structured path (has dots)
      a.structured = Polymer.Path.isPath(arg);
      if (a.structured) {
        a.wildcard = arg.slice(-2) == '.*';
        if (a.wildcard) {
          a.name = arg.slice(0, -2);
        }
      }
    }
    return a;
  }

  /**
   * Gather the argument values for a method specified in the provided array
   * of argument metadata.
   *
   * The `path` and `value` arguments are used to fill in wildcard descriptor
   * when the method is being called as a result of a path notification.
   *
   * @param {Object} data Instance data storage object to read properties from
   * @param {!Array<!MethodArg>} args Array of argument metadata
   * @param {string} path Property/path name that triggered the method effect
   * @param {Object} props Bag of current property changes
   * @return {Array<*>} Array of argument values
   * @private
   */
  function marshalArgs(data, args, path, props) {
    let values = [];
    for (let i = 0, l = args.length; i < l; i++) {
      let arg = args[i];
      let name = arg.name;
      let v;
      if (arg.literal) {
        v = arg.value;
      } else {
        if (arg.structured) {
          v = Polymer.Path.get(data, name);
          // when data is not stored e.g. `splices`
          if (v === undefined) {
            v = props[name];
          }
        } else {
          v = data[name];
        }
      }
      if (arg.wildcard) {
        // Only send the actual path changed info if the change that
        // caused the observer to run matched the wildcard
        let baseChanged = name.indexOf(path + '.') === 0;
        let matches = path.indexOf(name) === 0 && !baseChanged;
        values[i] = {
          path: matches ? path : name,
          value: matches ? props[path] : v,
          base: v
        };
      } else {
        values[i] = v;
      }
    }
    return values;
  }

  // data api

  /**
   * Sends array splice notifications (`.splices` and `.length`)
   *
   * Note: this implementation only accepts normalized paths
   *
   * @param {!PropertyEffectsType} inst Instance to send notifications to
   * @param {Array} array The array the mutations occurred on
   * @param {string} path The path to the array that was mutated
   * @param {Array} splices Array of splice records
   * @private
   */
  function notifySplices(inst, array, path, splices) {
    let splicesPath = path + '.splices';
    inst.notifyPath(splicesPath, { indexSplices: splices });
    inst.notifyPath(path + '.length', array.length);
    // Null here to allow potentially large splice records to be GC'ed.
    inst.__data[splicesPath] = { indexSplices: null };
  }

  /**
   * Creates a splice record and sends an array splice notification for
   * the described mutation
   *
   * Note: this implementation only accepts normalized paths
   *
   * @param {!PropertyEffectsType} inst Instance to send notifications to
   * @param {Array} array The array the mutations occurred on
   * @param {string} path The path to the array that was mutated
   * @param {number} index Index at which the array mutation occurred
   * @param {number} addedCount Number of added items
   * @param {Array} removed Array of removed items
   * @private
   */
  function notifySplice(inst, array, path, index, addedCount, removed) {
    notifySplices(inst, array, path, [{
      index: index,
      addedCount: addedCount,
      removed: removed,
      object: array,
      type: 'splice'
    }]);
  }

  /**
   * Returns an upper-cased version of the string.
   *
   * @param {string} name String to uppercase
   * @return {string} Uppercased string
   * @private
   */
  function upper(name) {
    return name[0].toUpperCase() + name.substring(1);
  }

  /**
   * Element class mixin that provides meta-programming for Polymer's template
   * binding and data observation (collectively, "property effects") system.
   *
   * This mixin uses provides the following key static methods for adding
   * property effects to an element class:
   * - `addPropertyEffect`
   * - `createPropertyObserver`
   * - `createMethodObserver`
   * - `createNotifyingProperty`
   * - `createReadOnlyProperty`
   * - `createReflectedProperty`
   * - `createComputedProperty`
   * - `bindTemplate`
   *
   * Each method creates one or more property accessors, along with metadata
   * used by this mixin's implementation of `_propertiesChanged` to perform
   * the property effects.
   *
   * Underscored versions of the above methods also exist on the element
   * prototype for adding property effects on instances at runtime.
   *
   * Note that this mixin overrides several `PropertyAccessors` methods, in
   * many cases to maintain guarantees provided by the Polymer 1.x features;
   * notably it changes property accessors to be synchronous by default
   * whereas the default when using `PropertyAccessors` standalone is to be
   * async by default.
   *
   * @mixinFunction
   * @polymer
   * @appliesMixin Polymer.TemplateStamp
   * @appliesMixin Polymer.PropertyAccessors
   * @memberof Polymer
   * @summary Element class mixin that provides meta-programming for Polymer's
   * template binding and data observation system.
   */
  Polymer.PropertyEffects = Polymer.dedupingMixin(superClass => {

    /**
     * @constructor
     * @extends {superClass}
     * @implements {Polymer_PropertyAccessors}
     * @implements {Polymer_TemplateStamp}
     * @unrestricted
     */
    const propertyEffectsBase = Polymer.TemplateStamp(Polymer.PropertyAccessors(superClass));

    /**
     * @polymer
     * @mixinClass
     * @implements {Polymer_PropertyEffects}
     * @extends {propertyEffectsBase}
     * @unrestricted
     */
    class PropertyEffects extends propertyEffectsBase {

      constructor() {
        super();
        /** @type {boolean} */
        this.__dataClientsReady;
        /** @type {Array} */
        this.__dataPendingClients;
        /** @type {Object} */
        this.__dataToNotify;
        /** @type {Object} */
        this.__dataLinkedPaths;
        /** @type {boolean} */
        this.__dataHasPaths;
        /** @type {Object} */
        this.__dataCompoundStorage;
        /** @type {Polymer_PropertyEffects} */
        this.__dataHost;
        /** @type {!Object} */
        this.__dataTemp;
        /** @type {boolean} */
        this.__dataClientsInitialized;
        /** @type {!Object} */
        this.__data;
        /** @type {!Object} */
        this.__dataPending;
        /** @type {!Object} */
        this.__dataOld;
        /** @type {Object} */
        this.__computeEffects;
        /** @type {Object} */
        this.__reflectEffects;
        /** @type {Object} */
        this.__notifyEffects;
        /** @type {Object} */
        this.__propagateEffects;
        /** @type {Object} */
        this.__observeEffects;
        /** @type {Object} */
        this.__readOnly;
        /** @type {number} */
        this.__dataCounter;
        /** @type {!TemplateInfo} */
        this.__templateInfo;
      }

      get PROPERTY_EFFECT_TYPES() {
        return TYPES;
      }

      _initializeProperties() {
        super._initializeProperties();
        hostStack.registerHost(this);
        this.__dataClientsReady = false;
        this.__dataPendingClients = null;
        this.__dataToNotify = null;
        this.__dataLinkedPaths = null;
        this.__dataHasPaths = false;
        // May be set on instance prior to upgrade
        this.__dataCompoundStorage = this.__dataCompoundStorage || null;
        this.__dataHost = this.__dataHost || null;
        this.__dataTemp = {};
        this.__dataClientsInitialized = false;
      }

      /**
       * Overrides `Polymer.PropertyAccessors` implementation to provide a
       * more efficient implementation of initializing properties from
       * the prototype on the instance.
       *
       * @override
       * @param {Object} props Properties to initialize on the prototype
       */
      _initializeProtoProperties(props) {
        this.__data = Object.create(props);
        this.__dataPending = Object.create(props);
        this.__dataOld = {};
      }

      /**
       * Overrides `Polymer.PropertyAccessors` implementation to avoid setting
       * `_setProperty`'s `shouldNotify: true`.
       *
       * @override
       * @param {Object} props Properties to initialize on the instance
       */
      _initializeInstanceProperties(props) {
        let readOnly = this[TYPES.READ_ONLY];
        for (let prop in props) {
          if (!readOnly || !readOnly[prop]) {
            this.__dataPending = this.__dataPending || {};
            this.__dataOld = this.__dataOld || {};
            this.__data[prop] = this.__dataPending[prop] = props[prop];
          }
        }
      }

      // Prototype setup ----------------------------------------

      /**
       * Equivalent to static `addPropertyEffect` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Property that should trigger the effect
       * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
       * @param {Object=} effect Effect metadata object
       * @protected
       */
      _addPropertyEffect(property, type, effect) {
        this._createPropertyAccessor(property, type == TYPES.READ_ONLY);
        // effects are accumulated into arrays per property based on type
        let effects = ensureOwnEffectMap(this, type)[property];
        if (!effects) {
          effects = this[type][property] = [];
        }
        effects.push(effect);
      }

      /**
       * Removes the given property effect.
       *
       * @param {string} property Property the effect was associated with
       * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
       * @param {Object=} effect Effect metadata object to remove
       */
      _removePropertyEffect(property, type, effect) {
        let effects = ensureOwnEffectMap(this, type)[property];
        let idx = effects.indexOf(effect);
        if (idx >= 0) {
          effects.splice(idx, 1);
        }
      }

      /**
       * Returns whether the current prototype/instance has a property effect
       * of a certain type.
       *
       * @param {string} property Property name
       * @param {string=} type Effect type, from this.PROPERTY_EFFECT_TYPES
       * @return {boolean} True if the prototype/instance has an effect of this type
       * @protected
       */
      _hasPropertyEffect(property, type) {
        let effects = this[type];
        return Boolean(effects && effects[property]);
      }

      /**
       * Returns whether the current prototype/instance has a "read only"
       * accessor for the given property.
       *
       * @param {string} property Property name
       * @return {boolean} True if the prototype/instance has an effect of this type
       * @protected
       */
      _hasReadOnlyEffect(property) {
        return this._hasPropertyEffect(property, TYPES.READ_ONLY);
      }

      /**
       * Returns whether the current prototype/instance has a "notify"
       * property effect for the given property.
       *
       * @param {string} property Property name
       * @return {boolean} True if the prototype/instance has an effect of this type
       * @protected
       */
      _hasNotifyEffect(property) {
        return this._hasPropertyEffect(property, TYPES.NOTIFY);
      }

      /**
       * Returns whether the current prototype/instance has a "reflect to attribute"
       * property effect for the given property.
       *
       * @param {string} property Property name
       * @return {boolean} True if the prototype/instance has an effect of this type
       * @protected
       */
      _hasReflectEffect(property) {
        return this._hasPropertyEffect(property, TYPES.REFLECT);
      }

      /**
       * Returns whether the current prototype/instance has a "computed"
       * property effect for the given property.
       *
       * @param {string} property Property name
       * @return {boolean} True if the prototype/instance has an effect of this type
       * @protected
       */
      _hasComputedEffect(property) {
        return this._hasPropertyEffect(property, TYPES.COMPUTE);
      }

      // Runtime ----------------------------------------

      /**
       * Sets a pending property or path.  If the root property of the path in
       * question had no accessor, the path is set, otherwise it is enqueued
       * via `_setPendingProperty`.
       *
       * This function isolates relatively expensive functionality necessary
       * for the public API (`set`, `setProperties`, `notifyPath`, and property
       * change listeners via {{...}} bindings), such that it is only done
       * when paths enter the system, and not at every propagation step.  It
       * also sets a `__dataHasPaths` flag on the instance which is used to
       * fast-path slower path-matching code in the property effects host paths.
       *
       * `path` can be a path string or array of path parts as accepted by the
       * public API.
       *
       * @param {string | !Array<number|string>} path Path to set
       * @param {*} value Value to set
       * @param {boolean=} shouldNotify Set to true if this change should
       *  cause a property notification event dispatch
       * @param {boolean=} isPathNotification If the path being set is a path
       *   notification of an already changed value, as opposed to a request
       *   to set and notify the change.  In the latter `false` case, a dirty
       *   check is performed and then the value is set to the path before
       *   enqueuing the pending property change.
       * @return {boolean} Returns true if the property/path was enqueued in
       *   the pending changes bag.
       * @protected
       */
      _setPendingPropertyOrPath(path, value, shouldNotify, isPathNotification) {
        if (isPathNotification || Polymer.Path.root(Array.isArray(path) ? path[0] : path) !== path) {
          // Dirty check changes being set to a path against the actual object,
          // since this is the entry point for paths into the system; from here
          // the only dirty checks are against the `__dataTemp` cache to prevent
          // duplicate work in the same turn only. Note, if this was a notification
          // of a change already set to a path (isPathNotification: true),
          // we always let the change through and skip the `set` since it was
          // already dirty checked at the point of entry and the underlying
          // object has already been updated
          if (!isPathNotification) {
            let old = Polymer.Path.get(this, path);
            path = /** @type {string} */Polymer.Path.set(this, path, value);
            // Use property-accessor's simpler dirty check
            if (!path || !super._shouldPropertyChange(path, value, old)) {
              return false;
            }
          }
          this.__dataHasPaths = true;
          if (this._setPendingProperty( /**@type{string}*/path, value, shouldNotify)) {
            computeLinkedPaths(this, path, value);
            return true;
          }
        } else {
          if (this.__dataHasAccessor && this.__dataHasAccessor[path]) {
            return this._setPendingProperty( /**@type{string}*/path, value, shouldNotify);
          } else {
            this[path] = value;
          }
        }
        return false;
      }

      /**
       * Applies a value to a non-Polymer element/node's property.
       *
       * The implementation makes a best-effort at binding interop:
       * Some native element properties have side-effects when
       * re-setting the same value (e.g. setting `<input>.value` resets the
       * cursor position), so we do a dirty-check before setting the value.
       * However, for better interop with non-Polymer custom elements that
       * accept objects, we explicitly re-set object changes coming from the
       * Polymer world (which may include deep object changes without the
       * top reference changing), erring on the side of providing more
       * information.
       *
       * Users may override this method to provide alternate approaches.
       *
       * @param {Node} node The node to set a property on
       * @param {string} prop The property to set
       * @param {*} value The value to set
       * @protected
       */
      _setUnmanagedPropertyToNode(node, prop, value) {
        // It is a judgment call that resetting primitives is
        // "bad" and resettings objects is also "good"; alternatively we could
        // implement a whitelist of tag & property values that should never
        // be reset (e.g. <input>.value && <select>.value)
        if (value !== node[prop] || typeof value == 'object') {
          node[prop] = value;
        }
      }

      /**
       * Overrides the `PropertyAccessors` implementation to introduce special
       * dirty check logic depending on the property & value being set:
       *
       * 1. Any value set to a path (e.g. 'obj.prop': 42 or 'obj.prop': {...})
       *    Stored in `__dataTemp`, dirty checked against `__dataTemp`
       * 2. Object set to simple property (e.g. 'prop': {...})
       *    Stored in `__dataTemp` and `__data`, dirty checked against
       *    `__dataTemp` by default implementation of `_shouldPropertyChange`
       * 3. Primitive value set to simple property (e.g. 'prop': 42)
       *    Stored in `__data`, dirty checked against `__data`
       *
       * The dirty-check is important to prevent cycles due to two-way
       * notification, but paths and objects are only dirty checked against any
       * previous value set during this turn via a "temporary cache" that is
       * cleared when the last `_propertiesChaged` exits. This is so:
       * a. any cached array paths (e.g. 'array.3.prop') may be invalidated
       *    due to array mutations like shift/unshift/splice; this is fine
       *    since path changes are dirty-checked at user entry points like `set`
       * b. dirty-checking for objects only lasts one turn to allow the user
       *    to mutate the object in-place and re-set it with the same identity
       *    and have all sub-properties re-propagated in a subsequent turn.
       *
       * The temp cache is not necessarily sufficient to prevent invalid array
       * paths, since a splice can happen during the same turn (with pathological
       * user code); we could introduce a "fixup" for temporarily cached array
       * paths if needed: https://github.com/Polymer/polymer/issues/4227
       *
       * @param {string} property Name of the property
       * @param {*} value Value to set
       * @param {boolean=} shouldNotify True if property should fire notification
       *   event (applies only for `notify: true` properties)
       * @return {boolean} Returns true if the property changed
       * @override
       */
      _setPendingProperty(property, value, shouldNotify) {
        let isPath = this.__dataHasPaths && Polymer.Path.isPath(property);
        let prevProps = isPath ? this.__dataTemp : this.__data;
        if (this._shouldPropertyChange(property, value, prevProps[property])) {
          if (!this.__dataPending) {
            this.__dataPending = {};
            this.__dataOld = {};
          }
          // Ensure old is captured from the last turn
          if (!(property in this.__dataOld)) {
            this.__dataOld[property] = this.__data[property];
          }
          // Paths are stored in temporary cache (cleared at end of turn),
          // which is used for dirty-checking, all others stored in __data
          if (isPath) {
            this.__dataTemp[property] = value;
          } else {
            this.__data[property] = value;
          }
          // All changes go into pending property bag, passed to _propertiesChanged
          this.__dataPending[property] = value;
          // Track properties that should notify separately
          if (isPath || this[TYPES.NOTIFY] && this[TYPES.NOTIFY][property]) {
            this.__dataToNotify = this.__dataToNotify || {};
            this.__dataToNotify[property] = shouldNotify;
          }
          return true;
        }
        return false;
      }

      /**
       * Overrides base implementation to ensure all accessors set `shouldNotify`
       * to true, for per-property notification tracking.
       *
       * @override
       */
      _setProperty(property, value) {
        if (this._setPendingProperty(property, value, true)) {
          this._invalidateProperties();
        }
      }

      /**
       * Overrides `PropertyAccessor`'s default async queuing of
       * `_propertiesChanged`: if `__dataReady` is false (has not yet been
       * manually flushed), the function no-ops; otherwise flushes
       * `_propertiesChanged` synchronously.
       *
       * @override
       */
      _invalidateProperties() {
        if (this.__dataReady) {
          this._flushProperties();
        }
      }

      /**
       * Enqueues the given client on a list of pending clients, whose
       * pending property changes can later be flushed via a call to
       * `_flushClients`.
       *
       * @param {Object} client PropertyEffects client to enqueue
       * @protected
       */
      _enqueueClient(client) {
        this.__dataPendingClients = this.__dataPendingClients || [];
        if (client !== this) {
          this.__dataPendingClients.push(client);
        }
      }

      /**
       * Flushes any clients previously enqueued via `_enqueueClient`, causing
       * their `_flushProperties` method to run.
       *
       * @protected
       */
      _flushClients() {
        if (!this.__dataClientsReady) {
          this.__dataClientsReady = true;
          this._readyClients();
          // Override point where accessors are turned on; importantly,
          // this is after clients have fully readied, providing a guarantee
          // that any property effects occur only after all clients are ready.
          this.__dataReady = true;
        } else {
          this.__enableOrFlushClients();
        }
      }

      // NOTE: We ensure clients either enable or flush as appropriate. This
      // handles two corner cases:
      // (1) clients flush properly when connected/enabled before the host
      // enables; e.g.
      //   (a) Templatize stamps with no properties and does not flush and
      //   (b) the instance is inserted into dom and
      //   (c) then the instance flushes.
      // (2) clients enable properly when not connected/enabled when the host
      // flushes; e.g.
      //   (a) a template is runtime stamped and not yet connected/enabled
      //   (b) a host sets a property, causing stamped dom to flush
      //   (c) the stamped dom enables.
      __enableOrFlushClients() {
        let clients = this.__dataPendingClients;
        if (clients) {
          this.__dataPendingClients = null;
          for (let i = 0; i < clients.length; i++) {
            let client = clients[i];
            if (!client.__dataEnabled) {
              client._enableProperties();
            } else if (client.__dataPending) {
              client._flushProperties();
            }
          }
        }
      }

      /**
       * Perform any initial setup on client dom. Called before the first
       * `_flushProperties` call on client dom and before any element
       * observers are called.
       *
       * @protected
       */
      _readyClients() {
        this.__enableOrFlushClients();
      }

      /**
       * Sets a bag of property changes to this instance, and
       * synchronously processes all effects of the properties as a batch.
       *
       * Property names must be simple properties, not paths.  Batched
       * path propagation is not supported.
       *
       * @param {Object} props Bag of one or more key-value pairs whose key is
       *   a property and value is the new value to set for that property.
       * @param {boolean=} setReadOnly When true, any private values set in
       *   `props` will be set. By default, `setProperties` will not set
       *   `readOnly: true` root properties.
       * @public
       */
      setProperties(props, setReadOnly) {
        for (let path in props) {
          if (setReadOnly || !this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][path]) {
            //TODO(kschaaf): explicitly disallow paths in setProperty?
            // wildcard observers currently only pass the first changed path
            // in the `info` object, and you could do some odd things batching
            // paths, e.g. {'foo.bar': {...}, 'foo': null}
            this._setPendingPropertyOrPath(path, props[path], true);
          }
        }
        this._invalidateProperties();
      }

      /**
       * Overrides `PropertyAccessors` so that property accessor
       * side effects are not enabled until after client dom is fully ready.
       * Also calls `_flushClients` callback to ensure client dom is enabled
       * that was not enabled as a result of flushing properties.
       *
       * @override
       */
      ready() {
        // It is important that `super.ready()` is not called here as it
        // immediately turns on accessors. Instead, we wait until `readyClients`
        // to enable accessors to provide a guarantee that clients are ready
        // before processing any accessors side effects.
        this._flushProperties();
        // If no data was pending, `_flushProperties` will not `flushClients`
        // so ensure this is done.
        if (!this.__dataClientsReady) {
          this._flushClients();
        }
        // Before ready, client notifications do not trigger _flushProperties.
        // Therefore a flush is necessary here if data has been set.
        if (this.__dataPending) {
          this._flushProperties();
        }
      }

      /**
       * Implements `PropertyAccessors`'s properties changed callback.
       *
       * Runs each class of effects for the batch of changed properties in
       * a specific order (compute, propagate, reflect, observe, notify).
       *
       * @override
       */
      _propertiesChanged(currentProps, changedProps, oldProps) {
        // ----------------------------
        // let c = Object.getOwnPropertyNames(changedProps || {});
        // window.debug && console.group(this.localName + '#' + this.id + ': ' + c);
        // if (window.debug) { debugger; }
        // ----------------------------
        let hasPaths = this.__dataHasPaths;
        this.__dataHasPaths = false;
        // Compute properties
        runComputedEffects(this, changedProps, oldProps, hasPaths);
        // Clear notify properties prior to possible reentry (propagate, observe),
        // but after computing effects have a chance to add to them
        let notifyProps = this.__dataToNotify;
        this.__dataToNotify = null;
        // Propagate properties to clients
        this._propagatePropertyChanges(changedProps, oldProps, hasPaths);
        // Flush clients
        this._flushClients();
        // Reflect properties
        runEffects(this, this[TYPES.REFLECT], changedProps, oldProps, hasPaths);
        // Observe properties
        runEffects(this, this[TYPES.OBSERVE], changedProps, oldProps, hasPaths);
        // Notify properties to host
        if (notifyProps) {
          runNotifyEffects(this, notifyProps, changedProps, oldProps, hasPaths);
        }
        // Clear temporary cache at end of turn
        if (this.__dataCounter == 1) {
          this.__dataTemp = {};
        }
        // ----------------------------
        // window.debug && console.groupEnd(this.localName + '#' + this.id + ': ' + c);
        // ----------------------------
      }

      /**
       * Called to propagate any property changes to stamped template nodes
       * managed by this element.
       *
       * @param {Object} changedProps Bag of changed properties
       * @param {Object} oldProps Bag of previous values for changed properties
       * @param {boolean} hasPaths True with `props` contains one or more paths
       * @protected
       */
      _propagatePropertyChanges(changedProps, oldProps, hasPaths) {
        if (this[TYPES.PROPAGATE]) {
          runEffects(this, this[TYPES.PROPAGATE], changedProps, oldProps, hasPaths);
        }
        let templateInfo = this.__templateInfo;
        while (templateInfo) {
          runEffects(this, templateInfo.propertyEffects, changedProps, oldProps, hasPaths, templateInfo.nodeList);
          templateInfo = templateInfo.nextTemplateInfo;
        }
      }

      /**
       * Aliases one data path as another, such that path notifications from one
       * are routed to the other.
       *
       * @param {string | !Array<string|number>} to Target path to link.
       * @param {string | !Array<string|number>} from Source path to link.
       * @public
       */
      linkPaths(to, from) {
        to = Polymer.Path.normalize(to);
        from = Polymer.Path.normalize(from);
        this.__dataLinkedPaths = this.__dataLinkedPaths || {};
        this.__dataLinkedPaths[to] = from;
      }

      /**
       * Removes a data path alias previously established with `_linkPaths`.
       *
       * Note, the path to unlink should be the target (`to`) used when
       * linking the paths.
       *
       * @param {string | !Array<string|number>} path Target path to unlink.
       * @public
       */
      unlinkPaths(path) {
        path = Polymer.Path.normalize(path);
        if (this.__dataLinkedPaths) {
          delete this.__dataLinkedPaths[path];
        }
      }

      /**
       * Notify that an array has changed.
       *
       * Example:
       *
       *     this.items = [ {name: 'Jim'}, {name: 'Todd'}, {name: 'Bill'} ];
       *     ...
       *     this.items.splice(1, 1, {name: 'Sam'});
       *     this.items.push({name: 'Bob'});
       *     this.notifySplices('items', [
       *       { index: 1, removed: [{name: 'Todd'}], addedCount: 1, obect: this.items, type: 'splice' },
       *       { index: 3, removed: [], addedCount: 1, object: this.items, type: 'splice'}
       *     ]);
       *
       * @param {string} path Path that should be notified.
       * @param {Array} splices Array of splice records indicating ordered
       *   changes that occurred to the array. Each record should have the
       *   following fields:
       *    * index: index at which the change occurred
       *    * removed: array of items that were removed from this index
       *    * addedCount: number of new items added at this index
       *    * object: a reference to the array in question
       *    * type: the string literal 'splice'
       *
       *   Note that splice records _must_ be normalized such that they are
       *   reported in index order (raw results from `Object.observe` are not
       *   ordered and must be normalized/merged before notifying).
       * @public
      */
      notifySplices(path, splices) {
        let info = { path: '' };
        let array = /** @type {Array} */Polymer.Path.get(this, path, info);
        notifySplices(this, array, info.path, splices);
      }

      /**
       * Convenience method for reading a value from a path.
       *
       * Note, if any part in the path is undefined, this method returns
       * `undefined` (this method does not throw when dereferencing undefined
       * paths).
       *
       * @param {(string|!Array<(string|number)>)} path Path to the value
       *   to read.  The path may be specified as a string (e.g. `foo.bar.baz`)
       *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
       *   bracketed expressions are not supported; string-based path parts
       *   *must* be separated by dots.  Note that when dereferencing array
       *   indices, the index may be used as a dotted part directly
       *   (e.g. `users.12.name` or `['users', 12, 'name']`).
       * @param {Object=} root Root object from which the path is evaluated.
       * @return {*} Value at the path, or `undefined` if any part of the path
       *   is undefined.
       * @public
       */
      get(path, root) {
        return Polymer.Path.get(root || this, path);
      }

      /**
       * Convenience method for setting a value to a path and notifying any
       * elements bound to the same path.
       *
       * Note, if any part in the path except for the last is undefined,
       * this method does nothing (this method does not throw when
       * dereferencing undefined paths).
       *
       * @param {(string|!Array<(string|number)>)} path Path to the value
       *   to write.  The path may be specified as a string (e.g. `'foo.bar.baz'`)
       *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
       *   bracketed expressions are not supported; string-based path parts
       *   *must* be separated by dots.  Note that when dereferencing array
       *   indices, the index may be used as a dotted part directly
       *   (e.g. `'users.12.name'` or `['users', 12, 'name']`).
       * @param {*} value Value to set at the specified path.
       * @param {Object=} root Root object from which the path is evaluated.
       *   When specified, no notification will occur.
       * @public
      */
      set(path, value, root) {
        if (root) {
          Polymer.Path.set(root, path, value);
        } else {
          if (!this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][/** @type {string} */path]) {
            if (this._setPendingPropertyOrPath(path, value, true)) {
              this._invalidateProperties();
            }
          }
        }
      }

      /**
       * Adds items onto the end of the array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.push`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param {string} path Path to array.
       * @param {...*} items Items to push onto array
       * @return {number} New length of the array.
       * @public
       */
      push(path, ...items) {
        let info = { path: '' };
        let array = /** @type {Array}*/Polymer.Path.get(this, path, info);
        let len = array.length;
        let ret = array.push(...items);
        if (items.length) {
          notifySplice(this, array, info.path, len, items.length, []);
        }
        return ret;
      }

      /**
       * Removes an item from the end of array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.pop`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param {string} path Path to array.
       * @return {*} Item that was removed.
       * @public
       */
      pop(path) {
        let info = { path: '' };
        let array = /** @type {Array} */Polymer.Path.get(this, path, info);
        let hadLength = Boolean(array.length);
        let ret = array.pop();
        if (hadLength) {
          notifySplice(this, array, info.path, array.length, 0, [ret]);
        }
        return ret;
      }

      /**
       * Starting from the start index specified, removes 0 or more items
       * from the array and inserts 0 or more new items in their place.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.splice`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param {string} path Path to array.
       * @param {number} start Index from which to start removing/inserting.
       * @param {number} deleteCount Number of items to remove.
       * @param {...*} items Items to insert into array.
       * @return {Array} Array of removed items.
       * @public
       */
      splice(path, start, deleteCount, ...items) {
        let info = { path: '' };
        let array = /** @type {Array} */Polymer.Path.get(this, path, info);
        // Normalize fancy native splice handling of crazy start values
        if (start < 0) {
          start = array.length - Math.floor(-start);
        } else {
          start = Math.floor(start);
        }
        if (!start) {
          start = 0;
        }
        let ret = array.splice(start, deleteCount, ...items);
        if (items.length || ret.length) {
          notifySplice(this, array, info.path, start, items.length, ret);
        }
        return ret;
      }

      /**
       * Removes an item from the beginning of array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.pop`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param {string} path Path to array.
       * @return {*} Item that was removed.
       * @public
       */
      shift(path) {
        let info = { path: '' };
        let array = /** @type {Array} */Polymer.Path.get(this, path, info);
        let hadLength = Boolean(array.length);
        let ret = array.shift();
        if (hadLength) {
          notifySplice(this, array, info.path, 0, 0, [ret]);
        }
        return ret;
      }

      /**
       * Adds items onto the beginning of the array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.push`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param {string} path Path to array.
       * @param {...*} items Items to insert info array
       * @return {number} New length of the array.
       * @public
       */
      unshift(path, ...items) {
        let info = { path: '' };
        let array = /** @type {Array} */Polymer.Path.get(this, path, info);
        let ret = array.unshift(...items);
        if (items.length) {
          notifySplice(this, array, info.path, 0, items.length, []);
        }
        return ret;
      }

      /**
       * Notify that a path has changed.
       *
       * Example:
       *
       *     this.item.user.name = 'Bob';
       *     this.notifyPath('item.user.name');
       *
       * @param {string} path Path that should be notified.
       * @param {*=} value Value at the path (optional).
       * @public
      */
      notifyPath(path, value) {
        /** @type {string} */
        let propPath;
        if (arguments.length == 1) {
          // Get value if not supplied
          let info = { path: '' };
          value = Polymer.Path.get(this, path, info);
          propPath = info.path;
        } else if (Array.isArray(path)) {
          // Normalize path if needed
          propPath = Polymer.Path.normalize(path);
        } else {
          propPath = /** @type{string} */path;
        }
        if (this._setPendingPropertyOrPath(propPath, value, true, true)) {
          this._invalidateProperties();
        }
      }

      /**
       * Equivalent to static `createReadOnlyProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Property name
       * @param {boolean=} protectedSetter Creates a custom protected setter
       *   when `true`.
       * @protected
       */
      _createReadOnlyProperty(property, protectedSetter) {
        this._addPropertyEffect(property, TYPES.READ_ONLY);
        if (protectedSetter) {
          this['_set' + upper(property)] = /** @this {PropertyEffects} */function (value) {
            this._setProperty(property, value);
          };
        }
      }

      /**
       * Equivalent to static `createPropertyObserver` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Property name
       * @param {string} methodName Name of observer method to call
       * @param {boolean=} dynamicFn Whether the method name should be included as
       *   a dependency to the effect.
       * @protected
       */
      _createPropertyObserver(property, methodName, dynamicFn) {
        let info = { property, methodName, dynamicFn: Boolean(dynamicFn) };
        this._addPropertyEffect(property, TYPES.OBSERVE, {
          fn: runObserverEffect, info, trigger: { name: property }
        });
        if (dynamicFn) {
          this._addPropertyEffect(methodName, TYPES.OBSERVE, {
            fn: runObserverEffect, info, trigger: { name: methodName }
          });
        }
      }

      /**
       * Equivalent to static `createMethodObserver` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} expression Method expression
       * @param {boolean|Object=} dynamicFn Boolean or object map indicating
       *   whether method names should be included as a dependency to the effect.
       * @protected
       */
      _createMethodObserver(expression, dynamicFn) {
        let sig = parseMethod(expression);
        if (!sig) {
          throw new Error("Malformed observer expression '" + expression + "'");
        }
        createMethodEffect(this, sig, TYPES.OBSERVE, runMethodEffect, null, dynamicFn);
      }

      /**
       * Equivalent to static `createNotifyingProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Property name
       * @protected
       */
      _createNotifyingProperty(property) {
        this._addPropertyEffect(property, TYPES.NOTIFY, {
          fn: runNotifyEffect,
          info: {
            eventName: CaseMap.camelToDashCase(property) + '-changed',
            property: property
          }
        });
      }

      /**
       * Equivalent to static `createReflectedProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Property name
       * @protected
       */
      _createReflectedProperty(property) {
        let attr = CaseMap.camelToDashCase(property);
        if (attr[0] === '-') {
          console.warn('Property ' + property + ' cannot be reflected to attribute ' + attr + ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property thisead.');
        } else {
          this._addPropertyEffect(property, TYPES.REFLECT, {
            fn: runReflectEffect,
            info: {
              attrName: attr
            }
          });
        }
      }

      /**
       * Equivalent to static `createComputedProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Name of computed property to set
       * @param {string} expression Method expression
       * @param {boolean|Object=} dynamicFn Boolean or object map indicating
       *   whether method names should be included as a dependency to the effect.
       * @protected
       */
      _createComputedProperty(property, expression, dynamicFn) {
        let sig = parseMethod(expression);
        if (!sig) {
          throw new Error("Malformed computed expression '" + expression + "'");
        }
        createMethodEffect(this, sig, TYPES.COMPUTE, runComputedEffect, property, dynamicFn);
      }

      // -- static class methods ------------

      /**
       * Ensures an accessor exists for the specified property, and adds
       * to a list of "property effects" that will run when the accessor for
       * the specified property is set.  Effects are grouped by "type", which
       * roughly corresponds to a phase in effect processing.  The effect
       * metadata should be in the following form:
       *
       *   {
       *     fn: effectFunction, // Reference to function to call to perform effect
       *     info: { ... }       // Effect metadata passed to function
       *     trigger: {          // Optional triggering metadata; if not provided
       *       name: string      // the property is treated as a wildcard
       *       structured: boolean
       *       wildcard: boolean
       *     }
       *   }
       *
       * Effects are called from `_propertiesChanged` in the following order by
       * type:
       *
       * 1. COMPUTE
       * 2. PROPAGATE
       * 3. REFLECT
       * 4. OBSERVE
       * 5. NOTIFY
       *
       * Effect functions are called with the following signature:
       *
       *   effectFunction(inst, path, props, oldProps, info, hasPaths)
       *
       * @param {string} property Property that should trigger the effect
       * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
       * @param {Object=} effect Effect metadata object
       * @protected
       */
      static addPropertyEffect(property, type, effect) {
        this.prototype._addPropertyEffect(property, type, effect);
      }

      /**
       * Creates a single-property observer for the given property.
       *
       * @param {string} property Property name
       * @param {string} methodName Name of observer method to call
       * @param {boolean=} dynamicFn Whether the method name should be included as
       *   a dependency to the effect.
       * @protected
       */
      static createPropertyObserver(property, methodName, dynamicFn) {
        this.prototype._createPropertyObserver(property, methodName, dynamicFn);
      }

      /**
       * Creates a multi-property "method observer" based on the provided
       * expression, which should be a string in the form of a normal Javascript
       * function signature: `'methodName(arg1, [..., argn])'`.  Each argument
       * should correspond to a property or path in the context of this
       * prototype (or instance), or may be a literal string or number.
       *
       * @param {string} expression Method expression
       * @param {boolean|Object=} dynamicFn Boolean or object map indicating
       *   whether method names should be included as a dependency to the effect.
       * @protected
       */
      static createMethodObserver(expression, dynamicFn) {
        this.prototype._createMethodObserver(expression, dynamicFn);
      }

      /**
       * Causes the setter for the given property to dispatch `<property>-changed`
       * events to notify of changes to the property.
       *
       * @param {string} property Property name
       * @protected
       */
      static createNotifyingProperty(property) {
        this.prototype._createNotifyingProperty(property);
      }

      /**
       * Creates a read-only accessor for the given property.
       *
       * To set the property, use the protected `_setProperty` API.
       * To create a custom protected setter (e.g. `_setMyProp()` for
       * property `myProp`), pass `true` for `protectedSetter`.
       *
       * Note, if the property will have other property effects, this method
       * should be called first, before adding other effects.
       *
       * @param {string} property Property name
       * @param {boolean=} protectedSetter Creates a custom protected setter
       *   when `true`.
       * @protected
       */
      static createReadOnlyProperty(property, protectedSetter) {
        this.prototype._createReadOnlyProperty(property, protectedSetter);
      }

      /**
       * Causes the setter for the given property to reflect the property value
       * to a (dash-cased) attribute of the same name.
       *
       * @param {string} property Property name
       * @protected
       */
      static createReflectedProperty(property) {
        this.prototype._createReflectedProperty(property);
      }

      /**
       * Creates a computed property whose value is set to the result of the
       * method described by the given `expression` each time one or more
       * arguments to the method changes.  The expression should be a string
       * in the form of a normal Javascript function signature:
       * `'methodName(arg1, [..., argn])'`
       *
       * @param {string} property Name of computed property to set
       * @param {string} expression Method expression
       * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
       *   method names should be included as a dependency to the effect.
       * @protected
       */
      static createComputedProperty(property, expression, dynamicFn) {
        this.prototype._createComputedProperty(property, expression, dynamicFn);
      }

      /**
       * Parses the provided template to ensure binding effects are created
       * for them, and then ensures property accessors are created for any
       * dependent properties in the template.  Binding effects for bound
       * templates are stored in a linked list on the instance so that
       * templates can be efficiently stamped and unstamped.
       *
       * @param {HTMLTemplateElement} template Template containing binding
       *   bindings
       * @return {Object} Template metadata object
       * @protected
       */
      static bindTemplate(template) {
        return this.prototype._bindTemplate(template);
      }

      // -- binding ----------------------------------------------

      /**
       * Equivalent to static `bindTemplate` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * This method may be called on the prototype (for prototypical template
       * binding, to avoid creating accessors every instance) once per prototype,
       * and will be called with `runtimeBinding: true` by `_stampTemplate` to
       * create and link an instance of the template metadata associated with a
       * particular stamping.
       *
       * @param {HTMLTemplateElement} template Template containing binding
       *   bindings
       * @param {boolean=} instanceBinding When false (default), performs
       *   "prototypical" binding of the template and overwrites any previously
       *   bound template for the class. When true (as passed from
       *   `_stampTemplate`), the template info is instanced and linked into
       *   the list of bound templates.
       * @return {!TemplateInfo} Template metadata object; for `runtimeBinding`,
       *   this is an instance of the prototypical template info
       * @protected
       */
      _bindTemplate(template, instanceBinding) {
        let templateInfo = this.constructor._parseTemplate(template);
        let wasPreBound = this.__templateInfo == templateInfo;
        // Optimization: since this is called twice for proto-bound templates,
        // don't attempt to recreate accessors if this template was pre-bound
        if (!wasPreBound) {
          for (let prop in templateInfo.propertyEffects) {
            this._createPropertyAccessor(prop);
          }
        }
        if (instanceBinding) {
          // For instance-time binding, create instance of template metadata
          // and link into list of templates if necessary
          templateInfo = /** @type {!TemplateInfo} */Object.create(templateInfo);
          templateInfo.wasPreBound = wasPreBound;
          if (!wasPreBound && this.__templateInfo) {
            let last = this.__templateInfoLast || this.__templateInfo;
            this.__templateInfoLast = last.nextTemplateInfo = templateInfo;
            templateInfo.previousTemplateInfo = last;
            return templateInfo;
          }
        }
        return this.__templateInfo = templateInfo;
      }

      /**
       * Adds a property effect to the given template metadata, which is run
       * at the "propagate" stage of `_propertiesChanged` when the template
       * has been bound to the element via `_bindTemplate`.
       *
       * The `effect` object should match the format in `_addPropertyEffect`.
       *
       * @param {Object} templateInfo Template metadata to add effect to
       * @param {string} prop Property that should trigger the effect
       * @param {Object=} effect Effect metadata object
       * @protected
       */
      static _addTemplatePropertyEffect(templateInfo, prop, effect) {
        let hostProps = templateInfo.hostProps = templateInfo.hostProps || {};
        hostProps[prop] = true;
        let effects = templateInfo.propertyEffects = templateInfo.propertyEffects || {};
        let propEffects = effects[prop] = effects[prop] || [];
        propEffects.push(effect);
      }

      /**
       * Stamps the provided template and performs instance-time setup for
       * Polymer template features, including data bindings, declarative event
       * listeners, and the `this.$` map of `id`'s to nodes.  A document fragment
       * is returned containing the stamped DOM, ready for insertion into the
       * DOM.
       *
       * This method may be called more than once; however note that due to
       * `shadycss` polyfill limitations, only styles from templates prepared
       * using `ShadyCSS.prepareTemplate` will be correctly polyfilled (scoped
       * to the shadow root and support CSS custom properties), and note that
       * `ShadyCSS.prepareTemplate` may only be called once per element. As such,
       * any styles required by in runtime-stamped templates must be included
       * in the main element template.
       *
       * @param {!HTMLTemplateElement} template Template to stamp
       * @return {!StampedTemplate} Cloned template content
       * @override
       * @protected
       */
      _stampTemplate(template) {
        // Ensures that created dom is `_enqueueClient`'d to this element so
        // that it can be flushed on next call to `_flushProperties`
        hostStack.beginHosting(this);
        let dom = super._stampTemplate(template);
        hostStack.endHosting(this);
        let templateInfo = /** @type {!TemplateInfo} */this._bindTemplate(template, true);
        // Add template-instance-specific data to instanced templateInfo
        templateInfo.nodeList = dom.nodeList;
        // Capture child nodes to allow unstamping of non-prototypical templates
        if (!templateInfo.wasPreBound) {
          let nodes = templateInfo.childNodes = [];
          for (let n = dom.firstChild; n; n = n.nextSibling) {
            nodes.push(n);
          }
        }
        dom.templateInfo = templateInfo;
        // Setup compound storage, 2-way listeners, and dataHost for bindings
        setupBindings(this, templateInfo);
        // Flush properties into template nodes if already booted
        if (this.__dataReady) {
          runEffects(this, templateInfo.propertyEffects, this.__data, null, false, templateInfo.nodeList);
        }
        return dom;
      }

      /**
       * Removes and unbinds the nodes previously contained in the provided
       * DocumentFragment returned from `_stampTemplate`.
       *
       * @param {!StampedTemplate} dom DocumentFragment previously returned
       *   from `_stampTemplate` associated with the nodes to be removed
       * @protected
       */
      _removeBoundDom(dom) {
        // Unlink template info
        let templateInfo = dom.templateInfo;
        if (templateInfo.previousTemplateInfo) {
          templateInfo.previousTemplateInfo.nextTemplateInfo = templateInfo.nextTemplateInfo;
        }
        if (templateInfo.nextTemplateInfo) {
          templateInfo.nextTemplateInfo.previousTemplateInfo = templateInfo.previousTemplateInfo;
        }
        if (this.__templateInfoLast == templateInfo) {
          this.__templateInfoLast = templateInfo.previousTemplateInfo;
        }
        templateInfo.previousTemplateInfo = templateInfo.nextTemplateInfo = null;
        // Remove stamped nodes
        let nodes = templateInfo.childNodes;
        for (let i = 0; i < nodes.length; i++) {
          let node = nodes[i];
          node.parentNode.removeChild(node);
        }
      }

      /**
       * Overrides default `TemplateStamp` implementation to add support for
       * parsing bindings from `TextNode`'s' `textContent`.  A `bindings`
       * array is added to `nodeInfo` and populated with binding metadata
       * with information capturing the binding target, and a `parts` array
       * with one or more metadata objects capturing the source(s) of the
       * binding.
       *
       * @override
       * @param {Node} node Node to parse
       * @param {TemplateInfo} templateInfo Template metadata for current template
       * @param {NodeInfo} nodeInfo Node metadata for current template node
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @protected
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       */
      static _parseTemplateNode(node, templateInfo, nodeInfo) {
        let noted = super._parseTemplateNode(node, templateInfo, nodeInfo);
        if (node.nodeType === Node.TEXT_NODE) {
          let parts = this._parseBindings(node.textContent, templateInfo);
          if (parts) {
            // Initialize the textContent with any literal parts
            // NOTE: default to a space here so the textNode remains; some browsers
            // (IE) evacipate an empty textNode following cloneNode/importNode.
            node.textContent = literalFromParts(parts) || ' ';
            addBinding(this, templateInfo, nodeInfo, 'text', 'textContent', parts);
            noted = true;
          }
        }
        return noted;
      }

      /**
       * Overrides default `TemplateStamp` implementation to add support for
       * parsing bindings from attributes.  A `bindings`
       * array is added to `nodeInfo` and populated with binding metadata
       * with information capturing the binding target, and a `parts` array
       * with one or more metadata objects capturing the source(s) of the
       * binding.
       *
       * @override
       * @param {Element} node Node to parse
       * @param {TemplateInfo} templateInfo Template metadata for current template
       * @param {NodeInfo} nodeInfo Node metadata for current template node
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @protected
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       */
      static _parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value) {
        let parts = this._parseBindings(value, templateInfo);
        if (parts) {
          // Attribute or property
          let origName = name;
          let kind = 'property';
          if (name[name.length - 1] == '$') {
            name = name.slice(0, -1);
            kind = 'attribute';
          }
          // Initialize attribute bindings with any literal parts
          let literal = literalFromParts(parts);
          if (literal && kind == 'attribute') {
            node.setAttribute(name, literal);
          }
          // Clear attribute before removing, since IE won't allow removing
          // `value` attribute if it previously had a value (can't
          // unconditionally set '' before removing since attributes with `$`
          // can't be set using setAttribute)
          if (node.localName === 'input' && origName === 'value') {
            node.setAttribute(origName, '');
          }
          // Remove annotation
          node.removeAttribute(origName);
          // Case hackery: attributes are lower-case, but bind targets
          // (properties) are case sensitive. Gambit is to map dash-case to
          // camel-case: `foo-bar` becomes `fooBar`.
          // Attribute bindings are excepted.
          if (kind === 'property') {
            name = Polymer.CaseMap.dashToCamelCase(name);
          }
          addBinding(this, templateInfo, nodeInfo, kind, name, parts, literal);
          return true;
        } else {
          return super._parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value);
        }
      }

      /**
       * Overrides default `TemplateStamp` implementation to add support for
       * binding the properties that a nested template depends on to the template
       * as `_host_<property>`.
       *
       * @override
       * @param {Node} node Node to parse
       * @param {TemplateInfo} templateInfo Template metadata for current template
       * @param {NodeInfo} nodeInfo Node metadata for current template node
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @protected
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       */
      static _parseTemplateNestedTemplate(node, templateInfo, nodeInfo) {
        let noted = super._parseTemplateNestedTemplate(node, templateInfo, nodeInfo);
        // Merge host props into outer template and add bindings
        let hostProps = nodeInfo.templateInfo.hostProps;
        let mode = '{';
        for (let source in hostProps) {
          let parts = [{ mode, source, dependencies: [source] }];
          addBinding(this, templateInfo, nodeInfo, 'property', '_host_' + source, parts);
        }
        return noted;
      }

      /**
       * Called to parse text in a template (either attribute values or
       * textContent) into binding metadata.
       *
       * Any overrides of this method should return an array of binding part
       * metadata  representing one or more bindings found in the provided text
       * and any "literal" text in between.  Any non-literal parts will be passed
       * to `_evaluateBinding` when any dependencies change.  The only required
       * fields of each "part" in the returned array are as follows:
       *
       * - `dependencies` - Array containing trigger metadata for each property
       *   that should trigger the binding to update
       * - `literal` - String containing text if the part represents a literal;
       *   in this case no `dependencies` are needed
       *
       * Additional metadata for use by `_evaluateBinding` may be provided in
       * each part object as needed.
       *
       * The default implementation handles the following types of bindings
       * (one or more may be intermixed with literal strings):
       * - Property binding: `[[prop]]`
       * - Path binding: `[[object.prop]]`
       * - Negated property or path bindings: `[[!prop]]` or `[[!object.prop]]`
       * - Two-way property or path bindings (supports negation):
       *   `{{prop}}`, `{{object.prop}}`, `{{!prop}}` or `{{!object.prop}}`
       * - Inline computed method (supports negation):
       *   `[[compute(a, 'literal', b)]]`, `[[!compute(a, 'literal', b)]]`
       *
       * @param {string} text Text to parse from attribute or textContent
       * @param {Object} templateInfo Current template metadata
       * @return {Array<!BindingPart>} Array of binding part metadata
       * @protected
       */
      static _parseBindings(text, templateInfo) {
        let parts = [];
        let lastIndex = 0;
        let m;
        // Example: "literal1{{prop}}literal2[[!compute(foo,bar)]]final"
        // Regex matches:
        //        Iteration 1:  Iteration 2:
        // m[1]: '{{'          '[['
        // m[2]: ''            '!'
        // m[3]: 'prop'        'compute(foo,bar)'
        while ((m = bindingRegex.exec(text)) !== null) {
          // Add literal part
          if (m.index > lastIndex) {
            parts.push({ literal: text.slice(lastIndex, m.index) });
          }
          // Add binding part
          let mode = m[1][0];
          let negate = Boolean(m[2]);
          let source = m[3].trim();
          let customEvent = false,
              notifyEvent = '',
              colon = -1;
          if (mode == '{' && (colon = source.indexOf('::')) > 0) {
            notifyEvent = source.substring(colon + 2);
            source = source.substring(0, colon);
            customEvent = true;
          }
          let signature = parseMethod(source);
          let dependencies = [];
          if (signature) {
            // Inline computed function
            let { args, methodName } = signature;
            for (let i = 0; i < args.length; i++) {
              let arg = args[i];
              if (!arg.literal) {
                dependencies.push(arg);
              }
            }
            let dynamicFns = templateInfo.dynamicFns;
            if (dynamicFns && dynamicFns[methodName] || signature.static) {
              dependencies.push(methodName);
              signature.dynamicFn = true;
            }
          } else {
            // Property or path
            dependencies.push(source);
          }
          parts.push({
            source, mode, negate, customEvent, signature, dependencies,
            event: notifyEvent
          });
          lastIndex = bindingRegex.lastIndex;
        }
        // Add a final literal part
        if (lastIndex && lastIndex < text.length) {
          let literal = text.substring(lastIndex);
          if (literal) {
            parts.push({
              literal: literal
            });
          }
        }
        if (parts.length) {
          return parts;
        } else {
          return null;
        }
      }

      /**
       * Called to evaluate a previously parsed binding part based on a set of
       * one or more changed dependencies.
       *
       * @param {this} inst Element that should be used as scope for
       *   binding dependencies
       * @param {BindingPart} part Binding part metadata
       * @param {string} path Property/path that triggered this effect
       * @param {Object} props Bag of current property changes
       * @param {Object} oldProps Bag of previous values for changed properties
       * @param {boolean} hasPaths True with `props` contains one or more paths
       * @return {*} Value the binding part evaluated to
       * @protected
       */
      static _evaluateBinding(inst, part, path, props, oldProps, hasPaths) {
        let value;
        if (part.signature) {
          value = runMethodEffect(inst, path, props, oldProps, part.signature);
        } else if (path != part.source) {
          value = Polymer.Path.get(inst, part.source);
        } else {
          if (hasPaths && Polymer.Path.isPath(path)) {
            value = Polymer.Path.get(inst, path);
          } else {
            value = inst.__data[path];
          }
        }
        if (part.negate) {
          value = !value;
        }
        return value;
      }

    }

    // make a typing for closure :P
    PropertyEffectsType = PropertyEffects;

    return PropertyEffects;
  });

  /**
   * Helper api for enqueing client dom created by a host element.
   *
   * By default elements are flushed via `_flushProperties` when
   * `connectedCallback` is called. Elements attach their client dom to
   * themselves at `ready` time which results from this first flush.
   * This provides an ordering guarantee that the client dom an element
   * creates is flushed before the element itself (i.e. client `ready`
   * fires before host `ready`).
   *
   * However, if `_flushProperties` is called *before* an element is connected,
   * as for example `Templatize` does, this ordering guarantee cannot be
   * satisfied because no elements are connected. (Note: Bound elements that
   * receive data do become enqueued clients and are properly ordered but
   * unbound elements are not.)
   *
   * To maintain the desired "client before host" ordering guarantee for this
   * case we rely on the "host stack. Client nodes registers themselves with
   * the creating host element when created. This ensures that all client dom
   * is readied in the proper order, maintaining the desired guarantee.
   *
   * @private
   */
  let hostStack = {

    stack: [],

    /**
     * @param {*} inst Instance to add to hostStack
     * @this {hostStack}
     */
    registerHost(inst) {
      if (this.stack.length) {
        let host = this.stack[this.stack.length - 1];
        host._enqueueClient(inst);
      }
    },

    /**
     * @param {*} inst Instance to begin hosting
     * @this {hostStack}
     */
    beginHosting(inst) {
      this.stack.push(inst);
    },

    /**
     * @param {*} inst Instance to end hosting
     * @this {hostStack}
     */
    endHosting(inst) {
      let stackLen = this.stack.length;
      if (stackLen && this.stack[stackLen - 1] == inst) {
        this.stack.pop();
      }
    }

  };
})();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

(function () {
  'use strict';

  /**
   * Module with utilities for manipulating structured data path strings.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module with utilities for manipulating structured data path strings.
   */

  const Path = {

    /**
     * Returns true if the given string is a structured data path (has dots).
     *
     * Example:
     *
     * ```
     * Polymer.Path.isPath('foo.bar.baz') // true
     * Polymer.Path.isPath('foo')         // false
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} path Path string
     * @return {boolean} True if the string contained one or more dots
     */
    isPath: function (path) {
      return path.indexOf('.') >= 0;
    },

    /**
     * Returns the root property name for the given path.
     *
     * Example:
     *
     * ```
     * Polymer.Path.root('foo.bar.baz') // 'foo'
     * Polymer.Path.root('foo')         // 'foo'
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} path Path string
     * @return {string} Root property name
     */
    root: function (path) {
      let dotIndex = path.indexOf('.');
      if (dotIndex === -1) {
        return path;
      }
      return path.slice(0, dotIndex);
    },

    /**
     * Given `base` is `foo.bar`, `foo` is an ancestor, `foo.bar` is not
     * Returns true if the given path is an ancestor of the base path.
     *
     * Example:
     *
     * ```
     * Polymer.Path.isAncestor('foo.bar', 'foo')         // true
     * Polymer.Path.isAncestor('foo.bar', 'foo.bar')     // false
     * Polymer.Path.isAncestor('foo.bar', 'foo.bar.baz') // false
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} base Path string to test against.
     * @param {string} path Path string to test.
     * @return {boolean} True if `path` is an ancestor of `base`.
     */
    isAncestor: function (base, path) {
      //     base.startsWith(path + '.');
      return base.indexOf(path + '.') === 0;
    },

    /**
     * Given `base` is `foo.bar`, `foo.bar.baz` is an descendant
     *
     * Example:
     *
     * ```
     * Polymer.Path.isDescendant('foo.bar', 'foo.bar.baz') // true
     * Polymer.Path.isDescendant('foo.bar', 'foo.bar')     // false
     * Polymer.Path.isDescendant('foo.bar', 'foo')         // false
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} base Path string to test against.
     * @param {string} path Path string to test.
     * @return {boolean} True if `path` is a descendant of `base`.
     */
    isDescendant: function (base, path) {
      //     path.startsWith(base + '.');
      return path.indexOf(base + '.') === 0;
    },

    /**
     * Replaces a previous base path with a new base path, preserving the
     * remainder of the path.
     *
     * User must ensure `path` has a prefix of `base`.
     *
     * Example:
     *
     * ```
     * Polymer.Path.translate('foo.bar', 'zot' 'foo.bar.baz') // 'zot.baz'
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} base Current base string to remove
     * @param {string} newBase New base string to replace with
     * @param {string} path Path to translate
     * @return {string} Translated string
     */
    translate: function (base, newBase, path) {
      return newBase + path.slice(base.length);
    },

    /**
     * @param {string} base Path string to test against
     * @param {string} path Path string to test
     * @return {boolean} True if `path` is equal to `base`
     * @this {Path}
     */
    matches: function (base, path) {
      return base === path || this.isAncestor(base, path) || this.isDescendant(base, path);
    },

    /**
     * Converts array-based paths to flattened path.  String-based paths
     * are returned as-is.
     *
     * Example:
     *
     * ```
     * Polymer.Path.normalize(['foo.bar', 0, 'baz'])  // 'foo.bar.0.baz'
     * Polymer.Path.normalize('foo.bar.0.baz')        // 'foo.bar.0.baz'
     * ```
     *
     * @memberof Polymer.Path
     * @param {string | !Array<string|number>} path Input path
     * @return {string} Flattened path
     */
    normalize: function (path) {
      if (Array.isArray(path)) {
        let parts = [];
        for (let i = 0; i < path.length; i++) {
          let args = path[i].toString().split('.');
          for (let j = 0; j < args.length; j++) {
            parts.push(args[j]);
          }
        }
        return parts.join('.');
      } else {
        return path;
      }
    },

    /**
     * Splits a path into an array of property names. Accepts either arrays
     * of path parts or strings.
     *
     * Example:
     *
     * ```
     * Polymer.Path.split(['foo.bar', 0, 'baz'])  // ['foo', 'bar', '0', 'baz']
     * Polymer.Path.split('foo.bar.0.baz')        // ['foo', 'bar', '0', 'baz']
     * ```
     *
     * @memberof Polymer.Path
     * @param {string | !Array<string|number>} path Input path
     * @return {!Array<string>} Array of path parts
     * @this {Path}
     * @suppress {checkTypes}
     */
    split: function (path) {
      if (Array.isArray(path)) {
        return this.normalize(path).split('.');
      }
      return path.toString().split('.');
    },

    /**
     * Reads a value from a path.  If any sub-property in the path is `undefined`,
     * this method returns `undefined` (will never throw.
     *
     * @memberof Polymer.Path
     * @param {Object} root Object from which to dereference path from
     * @param {string | !Array<string|number>} path Path to read
     * @param {Object=} info If an object is provided to `info`, the normalized
     *  (flattened) path will be set to `info.path`.
     * @return {*} Value at path, or `undefined` if the path could not be
     *  fully dereferenced.
     * @this {Path}
     */
    get: function (root, path, info) {
      let prop = root;
      let parts = this.split(path);
      // Loop over path parts[0..n-1] and dereference
      for (let i = 0; i < parts.length; i++) {
        if (!prop) {
          return;
        }
        let part = parts[i];
        prop = prop[part];
      }
      if (info) {
        info.path = parts.join('.');
      }
      return prop;
    },

    /**
     * Sets a value to a path.  If any sub-property in the path is `undefined`,
     * this method will no-op.
     *
     * @memberof Polymer.Path
     * @param {Object} root Object from which to dereference path from
     * @param {string | !Array<string|number>} path Path to set
     * @param {*} value Value to set to path
     * @return {string | undefined} The normalized version of the input path
     * @this {Path}
     */
    set: function (root, path, value) {
      let prop = root;
      let parts = this.split(path);
      let last = parts[parts.length - 1];
      if (parts.length > 1) {
        // Loop over path parts[0..n-2] and dereference
        for (let i = 0; i < parts.length - 1; i++) {
          let part = parts[i];
          prop = prop[part];
          if (!prop) {
            return;
          }
        }
        // Set value to object at end of path
        prop[last] = value;
      } else {
        // Simple property set
        prop[path] = value;
      }
      return parts.join('.');
    }

  };

  /**
   * Returns true if the given string is a structured data path (has dots).
   *
   * This function is deprecated.  Use `Polymer.Path.isPath` instead.
   *
   * Example:
   *
   * ```
   * Polymer.Path.isDeep('foo.bar.baz') // true
   * Polymer.Path.isDeep('foo')         // false
   * ```
   *
   * @deprecated
   * @memberof Polymer.Path
   * @param {string} path Path string
   * @return {boolean} True if the string contained one or more dots
   */
  Path.isDeep = Path.isPath;

  Polymer.Path = Path;
})();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(16);

(function () {

  'use strict';

  let caseMap = Polymer.CaseMap;

  let microtask = Polymer.Async.microTask;

  // Save map of native properties; this forms a blacklist or properties
  // that won't have their values "saved" by `saveAccessorValue`, since
  // reading from an HTMLElement accessor from the context of a prototype throws
  const nativeProperties = {};
  let proto = HTMLElement.prototype;
  while (proto) {
    let props = Object.getOwnPropertyNames(proto);
    for (let i = 0; i < props.length; i++) {
      nativeProperties[props[i]] = true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  /**
   * Used to save the value of a property that will be overridden with
   * an accessor. If the `model` is a prototype, the values will be saved
   * in `__dataProto`, and it's up to the user (or downstream mixin) to
   * decide how/when to set these values back into the accessors.
   * If `model` is already an instance (it has a `__data` property), then
   * the value will be set as a pending property, meaning the user should
   * call `_invalidateProperties` or `_flushProperties` to take effect
   *
   * @param {Object} model Prototype or instance
   * @param {string} property Name of property
   * @private
   */
  function saveAccessorValue(model, property) {
    // Don't read/store value for any native properties since they could throw
    if (!nativeProperties[property]) {
      let value = model[property];
      if (value !== undefined) {
        if (model.__data) {
          // Adding accessor to instance; update the property
          // It is the user's responsibility to call _flushProperties
          model._setPendingProperty(property, value);
        } else {
          // Adding accessor to proto; save proto's value for instance-time use
          if (!model.__dataProto) {
            model.__dataProto = {};
          } else if (!model.hasOwnProperty(JSCompiler_renameProperty('__dataProto', model))) {
            model.__dataProto = Object.create(model.__dataProto);
          }
          model.__dataProto[property] = value;
        }
      }
    }
  }

  /**
   * Element class mixin that provides basic meta-programming for creating one
   * or more property accessors (getter/setter pair) that enqueue an async
   * (batched) `_propertiesChanged` callback.
   *
   * For basic usage of this mixin, simply declare attributes to observe via
   * the standard `static get observedAttributes()`, implement `_propertiesChanged`
   * on the class, and then call `MyClass.createPropertiesForAttributes()` once
   * on the class to generate property accessors for each observed attribute
   * prior to instancing.  Last, call `this._flushProperties()` once to enable
   * the accessors.
   *
   * Any `observedAttributes` will automatically be
   * deserialized via `attributeChangedCallback` and set to the associated
   * property using `dash-case`-to-`camelCase` convention.
   *
   * @mixinFunction
   * @polymer
   * @memberof Polymer
   * @summary Element class mixin for reacting to property changes from
   *   generated property accessors.
   */
  Polymer.PropertyAccessors = Polymer.dedupingMixin(superClass => {

    /**
     * @polymer
     * @mixinClass
     * @implements {Polymer_PropertyAccessors}
     * @extends HTMLElement
     * @unrestricted
     */
    class PropertyAccessors extends superClass {

      /**
       * Generates property accessors for all attributes in the standard
       * static `observedAttributes` array.
       *
       * Attribute names are mapped to property names using the `dash-case` to
       * `camelCase` convention
       *
       */
      static createPropertiesForAttributes() {
        let a$ = this.observedAttributes;
        for (let i = 0; i < a$.length; i++) {
          this.prototype._createPropertyAccessor(caseMap.dashToCamelCase(a$[i]));
        }
      }

      constructor() {
        super();
        /** @type {boolean} */
        this.__serializing;
        /** @type {number} */
        this.__dataCounter;
        /** @type {boolean} */
        this.__dataEnabled;
        /** @type {boolean} */
        this.__dataReady;
        /** @type {boolean} */
        this.__dataInvalid;
        /** @type {!Object} */
        this.__data;
        /** @type {Object} */
        this.__dataPending;
        /** @type {Object} */
        this.__dataOld;
        /** @type {Object} */
        this.__dataProto;
        /** @type {Object} */
        this.__dataHasAccessor;
        /** @type {Object} */
        this.__dataInstanceProps;
        this._initializeProperties();
      }

      /**
       * Implements native Custom Elements `attributeChangedCallback` to
       * set an attribute value to a property via `_attributeToProperty`.
       *
       * @param {string} name Name of attribute that changed
       * @param {?string} old Old attribute value
       * @param {?string} value New attribute value
       */
      attributeChangedCallback(name, old, value) {
        if (old !== value) {
          this._attributeToProperty(name, value);
        }
      }

      /**
       * Initializes the local storage for property accessors.
       *
       * Provided as an override point for performing any setup work prior
       * to initializing the property accessor system.
       *
       * @protected
       */
      _initializeProperties() {
        this.__serializing = false;
        this.__dataCounter = 0;
        this.__dataEnabled = false;
        this.__dataReady = false;
        this.__dataInvalid = false;
        this.__data = {};
        this.__dataPending = null;
        this.__dataOld = null;
        if (this.__dataProto) {
          this._initializeProtoProperties(this.__dataProto);
          this.__dataProto = null;
        }
        // Capture instance properties; these will be set into accessors
        // during first flush. Don't set them here, since we want
        // these to overwrite defaults/constructor assignments
        for (let p in this.__dataHasAccessor) {
          if (this.hasOwnProperty(p)) {
            this.__dataInstanceProps = this.__dataInstanceProps || {};
            this.__dataInstanceProps[p] = this[p];
            delete this[p];
          }
        }
      }

      /**
       * Called at instance time with bag of properties that were overwritten
       * by accessors on the prototype when accessors were created.
       *
       * The default implementation sets these properties back into the
       * setter at instance time.  This method is provided as an override
       * point for customizing or providing more efficient initialization.
       *
       * @param {Object} props Bag of property values that were overwritten
       *   when creating property accessors.
       * @protected
       */
      _initializeProtoProperties(props) {
        for (let p in props) {
          this._setProperty(p, props[p]);
        }
      }

      /**
       * Called at ready time with bag of instance properties that overwrote
       * accessors when the element upgraded.
       *
       * The default implementation sets these properties back into the
       * setter at ready time.  This method is provided as an override
       * point for customizing or providing more efficient initialization.
       *
       * @param {Object} props Bag of property values that were overwritten
       *   when creating property accessors.
       * @protected
       */
      _initializeInstanceProperties(props) {
        Object.assign(this, props);
      }

      /**
       * Ensures the element has the given attribute. If it does not,
       * assigns the given value to the attribute.
       *
       *
       * @param {string} attribute Name of attribute to ensure is set.
       * @param {string} value of the attribute.
       */
      _ensureAttribute(attribute, value) {
        if (!this.hasAttribute(attribute)) {
          this._valueToNodeAttribute(this, value, attribute);
        }
      }

      /**
       * Deserializes an attribute to its associated property.
       *
       * This method calls the `_deserializeValue` method to convert the string to
       * a typed value.
       *
       * @param {string} attribute Name of attribute to deserialize.
       * @param {?string} value of the attribute.
       * @param {*=} type type to deserialize to.
       */
      _attributeToProperty(attribute, value, type) {
        // Don't deserialize back to property if currently reflecting
        if (!this.__serializing) {
          let property = caseMap.dashToCamelCase(attribute);
          this[property] = this._deserializeValue(value, type);
        }
      }

      /**
       * Serializes a property to its associated attribute.
       *
       * @param {string} property Property name to reflect.
       * @param {string=} attribute Attribute name to reflect.
       * @param {*=} value Property value to refect.
       */
      _propertyToAttribute(property, attribute, value) {
        this.__serializing = true;
        value = arguments.length < 3 ? this[property] : value;
        this._valueToNodeAttribute(this, value, attribute || caseMap.camelToDashCase(property));
        this.__serializing = false;
      }

      /**
       * Sets a typed value to an HTML attribute on a node.
       *
       * This method calls the `_serializeValue` method to convert the typed
       * value to a string.  If the `_serializeValue` method returns `undefined`,
       * the attribute will be removed (this is the default for boolean
       * type `false`).
       *
       * @param {Element} node Element to set attribute to.
       * @param {*} value Value to serialize.
       * @param {string} attribute Attribute name to serialize to.
       */
      _valueToNodeAttribute(node, value, attribute) {
        let str = this._serializeValue(value);
        if (str === undefined) {
          node.removeAttribute(attribute);
        } else {
          node.setAttribute(attribute, str);
        }
      }

      /**
       * Converts a typed JavaScript value to a string.
       *
       * This method is called by Polymer when setting JS property values to
       * HTML attributes.  Users may override this method on Polymer element
       * prototypes to provide serialization for custom types.
       *
       * @param {*} value Property value to serialize.
       * @return {string | undefined} String serialized from the provided property value.
       */
      _serializeValue(value) {
        /* eslint-disable no-fallthrough */
        switch (typeof value) {
          case 'boolean':
            return value ? '' : undefined;

          case 'object':
            if (value instanceof Date) {
              return value.toString();
            } else if (value) {
              try {
                return JSON.stringify(value);
              } catch (x) {
                return '';
              }
            }

          default:
            return value != null ? value.toString() : undefined;
        }
      }

      /**
       * Converts a string to a typed JavaScript value.
       *
       * This method is called by Polymer when reading HTML attribute values to
       * JS properties.  Users may override this method on Polymer element
       * prototypes to provide deserialization for custom `type`s.  Note,
       * the `type` argument is the value of the `type` field provided in the
       * `properties` configuration object for a given property, and is
       * by convention the constructor for the type to deserialize.
       *
       * Note: The return value of `undefined` is used as a sentinel value to
       * indicate the attribute should be removed.
       *
       * @param {?string} value Attribute value to deserialize.
       * @param {*=} type Type to deserialize the string to.
       * @return {*} Typed value deserialized from the provided string.
       */
      _deserializeValue(value, type) {
        /**
         * @type {*}
         */
        let outValue;
        switch (type) {
          case Number:
            outValue = Number(value);
            break;

          case Boolean:
            outValue = value !== null;
            break;

          case Object:
            try {
              outValue = JSON.parse( /** @type string */value);
            } catch (x) {
              // allow non-JSON literals like Strings and Numbers
            }
            break;

          case Array:
            try {
              outValue = JSON.parse( /** @type string */value);
            } catch (x) {
              outValue = null;
              console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${value}`);
            }
            break;

          case Date:
            outValue = new Date(value);
            break;

          case String:
          default:
            outValue = value;
            break;
        }

        return outValue;
      }
      /* eslint-enable no-fallthrough */

      /**
       * Creates a setter/getter pair for the named property with its own
       * local storage.  The getter returns the value in the local storage,
       * and the setter calls `_setProperty`, which updates the local storage
       * for the property and enqueues a `_propertiesChanged` callback.
       *
       * This method may be called on a prototype or an instance.  Calling
       * this method may overwrite a property value that already exists on
       * the prototype/instance by creating the accessor.  When calling on
       * a prototype, any overwritten values are saved in `__dataProto`,
       * and it is up to the subclasser to decide how/when to set those
       * properties back into the accessor.  When calling on an instance,
       * the overwritten value is set via `_setPendingProperty`, and the
       * user should call `_invalidateProperties` or `_flushProperties`
       * for the values to take effect.
       *
       * @param {string} property Name of the property
       * @param {boolean=} readOnly When true, no setter is created; the
       *   protected `_setProperty` function must be used to set the property
       * @protected
       */
      _createPropertyAccessor(property, readOnly) {
        if (!this.hasOwnProperty('__dataHasAccessor')) {
          this.__dataHasAccessor = Object.assign({}, this.__dataHasAccessor);
        }
        if (!this.__dataHasAccessor[property]) {
          this.__dataHasAccessor[property] = true;
          saveAccessorValue(this, property);
          Object.defineProperty(this, property, {
            /* eslint-disable valid-jsdoc */
            /** @this {PropertyAccessors} */
            get: function () {
              return this.__data[property];
            },
            /** @this {PropertyAccessors} */
            set: readOnly ? function () {} : function (value) {
              this._setProperty(property, value);
            }
            /* eslint-enable */
          });
        }
      }

      /**
       * Returns true if this library created an accessor for the given property.
       *
       * @param {string} property Property name
       * @return {boolean} True if an accessor was created
       */
      _hasAccessor(property) {
        return this.__dataHasAccessor && this.__dataHasAccessor[property];
      }

      /**
       * Updates the local storage for a property (via `_setPendingProperty`)
       * and enqueues a `_proeprtiesChanged` callback.
       *
       * @param {string} property Name of the property
       * @param {*} value Value to set
       * @protected
       */
      _setProperty(property, value) {
        if (this._setPendingProperty(property, value)) {
          this._invalidateProperties();
        }
      }

      /**
       * Updates the local storage for a property, records the previous value,
       * and adds it to the set of "pending changes" that will be passed to the
       * `_propertiesChanged` callback.  This method does not enqueue the
       * `_propertiesChanged` callback.
       *
       * @param {string} property Name of the property
       * @param {*} value Value to set
       * @return {boolean} Returns true if the property changed
       * @protected
       */
      _setPendingProperty(property, value) {
        let old = this.__data[property];
        let changed = this._shouldPropertyChange(property, value, old);
        if (changed) {
          if (!this.__dataPending) {
            this.__dataPending = {};
            this.__dataOld = {};
          }
          // Ensure old is captured from the last turn
          if (this.__dataOld && !(property in this.__dataOld)) {
            this.__dataOld[property] = old;
          }
          this.__data[property] = value;
          this.__dataPending[property] = value;
        }
        return changed;
      }

      /**
       * Returns true if the specified property has a pending change.
       *
       * @param {string} prop Property name
       * @return {boolean} True if property has a pending change
       * @protected
       */
      _isPropertyPending(prop) {
        return Boolean(this.__dataPending && prop in this.__dataPending);
      }

      /**
       * Marks the properties as invalid, and enqueues an async
       * `_propertiesChanged` callback.
       *
       * @protected
       */
      _invalidateProperties() {
        if (!this.__dataInvalid && this.__dataReady) {
          this.__dataInvalid = true;
          microtask.run(() => {
            if (this.__dataInvalid) {
              this.__dataInvalid = false;
              this._flushProperties();
            }
          });
        }
      }

      /**
       * Call to enable property accessor processing. Before this method is
       * called accessor values will be set but side effects are
       * queued. When called, any pending side effects occur immediately.
       * For elements, generally `connectedCallback` is a normal spot to do so.
       * It is safe to call this method multiple times as it only turns on
       * property accessors once.
       */
      _enableProperties() {
        if (!this.__dataEnabled) {
          this.__dataEnabled = true;
          if (this.__dataInstanceProps) {
            this._initializeInstanceProperties(this.__dataInstanceProps);
            this.__dataInstanceProps = null;
          }
          this.ready();
        }
      }

      /**
       * Calls the `_propertiesChanged` callback with the current set of
       * pending changes (and old values recorded when pending changes were
       * set), and resets the pending set of changes. Generally, this method
       * should not be called in user code.
       *
       *
       * @protected
       */
      _flushProperties() {
        if (this.__dataPending && this.__dataOld) {
          let changedProps = this.__dataPending;
          this.__dataPending = null;
          this.__dataCounter++;
          this._propertiesChanged(this.__data, changedProps, this.__dataOld);
          this.__dataCounter--;
        }
      }

      /**
       * Lifecycle callback called the first time properties are being flushed.
       * Prior to `ready`, all property sets through accessors are queued and
       * their effects are flushed after this method returns.
       *
       * Users may override this function to implement behavior that is
       * dependent on the element having its properties initialized, e.g.
       * from defaults (initialized from `constructor`, `_initializeProperties`),
       * `attributeChangedCallback`, or values propagated from host e.g. via
       * bindings.  `super.ready()` must be called to ensure the data system
       * becomes enabled.
       *
       * @public
       */
      ready() {
        this.__dataReady = true;
        // Run normal flush
        this._flushProperties();
      }

      /**
       * Callback called when any properties with accessors created via
       * `_createPropertyAccessor` have been set.
       *
       * @param {!Object} currentProps Bag of all current accessor values
       * @param {!Object} changedProps Bag of properties changed since the last
       *   call to `_propertiesChanged`
       * @param {!Object} oldProps Bag of previous values for each property
       *   in `changedProps`
       * @protected
       */
      _propertiesChanged(currentProps, changedProps, oldProps) {} // eslint-disable-line no-unused-vars


      /**
       * Method called to determine whether a property value should be
       * considered as a change and cause the `_propertiesChanged` callback
       * to be enqueued.
       *
       * The default implementation returns `true` for primitive types if a
       * strict equality check fails, and returns `true` for all Object/Arrays.
       * The method always returns false for `NaN`.
       *
       * Override this method to e.g. provide stricter checking for
       * Objects/Arrays when using immutable patterns.
       *
       * @param {string} property Property name
       * @param {*} value New property value
       * @param {*} old Previous property value
       * @return {boolean} Whether the property should be considered a change
       *   and enqueue a `_proeprtiesChanged` callback
       * @protected
       */
      _shouldPropertyChange(property, value, old) {
        return (
          // Strict equality check
          old !== value && (
          // This ensures (old==NaN, value==NaN) always returns false
          old === old || value === value)
        );
      }

    }

    return PropertyAccessors;
  });
})();

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

(function () {

  'use strict';

  /** @typedef {{run: function(function(), number=):number, cancel: function(number)}} */

  let AsyncInterface; // eslint-disable-line no-unused-vars

  // Microtask implemented using Mutation Observer
  let microtaskCurrHandle = 0;
  let microtaskLastHandle = 0;
  let microtaskCallbacks = [];
  let microtaskNodeContent = 0;
  let microtaskNode = document.createTextNode('');
  new window.MutationObserver(microtaskFlush).observe(microtaskNode, { characterData: true });

  function microtaskFlush() {
    const len = microtaskCallbacks.length;
    for (let i = 0; i < len; i++) {
      let cb = microtaskCallbacks[i];
      if (cb) {
        try {
          cb();
        } catch (e) {
          setTimeout(() => {
            throw e;
          });
        }
      }
    }
    microtaskCallbacks.splice(0, len);
    microtaskLastHandle += len;
  }

  /**
   * Module that provides a number of strategies for enqueuing asynchronous
   * tasks.  Each sub-module provides a standard `run(fn)` interface that returns a
   * handle, and a `cancel(handle)` interface for canceling async tasks before
   * they run.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module that provides a number of strategies for enqueuing asynchronous
   * tasks.
   */
  Polymer.Async = {

    /**
     * Async interface wrapper around `setTimeout`.
     *
     * @namespace
     * @memberof Polymer.Async
     * @summary Async interface wrapper around `setTimeout`.
     */
    timeOut: {
      /**
       * Returns a sub-module with the async interface providing the provided
       * delay.
       *
       * @memberof Polymer.Async.timeOut
       * @param {number} delay Time to wait before calling callbacks in ms
       * @return {AsyncInterface} An async timeout interface
       */
      after(delay) {
        return {
          run(fn) {
            return setTimeout(fn, delay);
          },
          cancel: window.clearTimeout.bind(window)
        };
      },
      /**
       * Enqueues a function called in the next task.
       *
       * @memberof Polymer.Async.timeOut
       * @param {Function} fn Callback to run
       * @return {number} Handle used for canceling task
       */
      run: window.setTimeout.bind(window),
      /**
       * Cancels a previously enqueued `timeOut` callback.
       *
       * @memberof Polymer.Async.timeOut
       * @param {number} handle Handle returned from `run` of callback to cancel
       */
      cancel: window.clearTimeout.bind(window)
    },

    /**
     * Async interface wrapper around `requestAnimationFrame`.
     *
     * @namespace
     * @memberof Polymer.Async
     * @summary Async interface wrapper around `requestAnimationFrame`.
     */
    animationFrame: {
      /**
       * Enqueues a function called at `requestAnimationFrame` timing.
       *
       * @memberof Polymer.Async.animationFrame
       * @param {Function} fn Callback to run
       * @return {number} Handle used for canceling task
       */
      run: window.requestAnimationFrame.bind(window),
      /**
       * Cancels a previously enqueued `animationFrame` callback.
       *
       * @memberof Polymer.Async.timeOut
       * @param {number} handle Handle returned from `run` of callback to cancel
       */
      cancel: window.cancelAnimationFrame.bind(window)
    },

    /**
     * Async interface wrapper around `requestIdleCallback`.  Falls back to
     * `setTimeout` on browsers that do not support `requestIdleCallback`.
     *
     * @namespace
     * @memberof Polymer.Async
     * @summary Async interface wrapper around `requestIdleCallback`.
     */
    idlePeriod: {
      /**
       * Enqueues a function called at `requestIdleCallback` timing.
       *
       * @memberof Polymer.Async.idlePeriod
       * @param {function(IdleDeadline)} fn Callback to run
       * @return {number} Handle used for canceling task
       */
      run(fn) {
        return window.requestIdleCallback ? window.requestIdleCallback(fn) : window.setTimeout(fn, 16);
      },
      /**
       * Cancels a previously enqueued `idlePeriod` callback.
       *
       * @memberof Polymer.Async.idlePeriod
       * @param {number} handle Handle returned from `run` of callback to cancel
       */
      cancel(handle) {
        window.cancelIdleCallback ? window.cancelIdleCallback(handle) : window.clearTimeout(handle);
      }
    },

    /**
     * Async interface for enqueueing callbacks that run at microtask timing.
     *
     * Note that microtask timing is achieved via a single `MutationObserver`,
     * and thus callbacks enqueued with this API will all run in a single
     * batch, and not interleaved with other microtasks such as promises.
     * Promises are avoided as an implementation choice for the time being
     * due to Safari bugs that cause Promises to lack microtask guarantees.
     *
     * @namespace
     * @memberof Polymer.Async
     * @summary Async interface for enqueueing callbacks that run at microtask
     *   timing.
     */
    microTask: {

      /**
       * Enqueues a function called at microtask timing.
       *
       * @memberof Polymer.Async.microTask
       * @param {Function} callback Callback to run
       * @return {number} Handle used for canceling task
       */
      run(callback) {
        microtaskNode.textContent = microtaskNodeContent++;
        microtaskCallbacks.push(callback);
        return microtaskCurrHandle++;
      },

      /**
       * Cancels a previously enqueued `microTask` callback.
       *
       * @memberof Polymer.Async.microTask
       * @param {number} handle Handle returned from `run` of callback to cancel
       */
      cancel(handle) {
        const idx = handle - microtaskLastHandle;
        if (idx >= 0) {
          if (!microtaskCallbacks[idx]) {
            throw new Error('invalid async handle: ' + handle);
          }
          microtaskCallbacks[idx] = null;
        }
      }

    }
  };
})();

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

__webpack_require__(2);

(function () {

  'use strict';

  // 1.x backwards-compatible auto-wrapper for template type extensions
  // This is a clear layering violation and gives favored-nation status to
  // dom-if and dom-repeat templates.  This is a conceit we're choosing to keep
  // a.) to ease 1.x backwards-compatibility due to loss of `is`, and
  // b.) to maintain if/repeat capability in parser-constrained elements
  //     (e.g. table, select) in lieu of native CE type extensions without
  //     massive new invention in this space (e.g. directive system)

  const templateExtensions = {
    'dom-if': true,
    'dom-repeat': true
  };
  function wrapTemplateExtension(node) {
    let is = node.getAttribute('is');
    if (is && templateExtensions[is]) {
      let t = node;
      t.removeAttribute('is');
      node = t.ownerDocument.createElement(is);
      t.parentNode.replaceChild(node, t);
      node.appendChild(t);
      while (t.attributes.length) {
        node.setAttribute(t.attributes[0].name, t.attributes[0].value);
        t.removeAttribute(t.attributes[0].name);
      }
    }
    return node;
  }

  function findTemplateNode(root, nodeInfo) {
    // recursively ascend tree until we hit root
    let parent = nodeInfo.parentInfo && findTemplateNode(root, nodeInfo.parentInfo);
    // unwind the stack, returning the indexed node at each level
    if (parent) {
      // note: marginally faster than indexing via childNodes
      // (http://jsperf.com/childnodes-lookup)
      for (let n = parent.firstChild, i = 0; n; n = n.nextSibling) {
        if (nodeInfo.parentIndex === i++) {
          return n;
        }
      }
    } else {
      return root;
    }
  }

  // construct `$` map (from id annotations)
  function applyIdToMap(inst, map, node, nodeInfo) {
    if (nodeInfo.id) {
      map[nodeInfo.id] = node;
    }
  }

  // install event listeners (from event annotations)
  function applyEventListener(inst, node, nodeInfo) {
    if (nodeInfo.events && nodeInfo.events.length) {
      for (let j = 0, e$ = nodeInfo.events, e; j < e$.length && (e = e$[j]); j++) {
        inst._addMethodEventListenerToNode(node, e.name, e.value, inst);
      }
    }
  }

  // push configuration references at configure time
  function applyTemplateContent(inst, node, nodeInfo) {
    if (nodeInfo.templateInfo) {
      node._templateInfo = nodeInfo.templateInfo;
    }
  }

  function createNodeEventHandler(context, eventName, methodName) {
    // Instances can optionally have a _methodHost which allows redirecting where
    // to find methods. Currently used by `templatize`.
    context = context._methodHost || context;
    let handler = function (e) {
      if (context[methodName]) {
        context[methodName](e, e.detail);
      } else {
        console.warn('listener method `' + methodName + '` not defined');
      }
    };
    return handler;
  }

  /**
   * Element mixin that provides basic template parsing and stamping, including
   * the following template-related features for stamped templates:
   *
   * - Declarative event listeners (`on-eventname="listener"`)
   * - Map of node id's to stamped node instances (`this.$.id`)
   * - Nested template content caching/removal and re-installation (performance
   *   optimization)
   *
   * @mixinFunction
   * @polymer
   * @memberof Polymer
   * @summary Element class mixin that provides basic template parsing and stamping
   */
  Polymer.TemplateStamp = Polymer.dedupingMixin(superClass => {

    /**
     * @polymer
     * @mixinClass
     * @implements {Polymer_TemplateStamp}
     */
    class TemplateStamp extends superClass {

      /**
       * Scans a template to produce template metadata.
       *
       * Template-specific metadata are stored in the object returned, and node-
       * specific metadata are stored in objects in its flattened `nodeInfoList`
       * array.  Only nodes in the template that were parsed as nodes of
       * interest contain an object in `nodeInfoList`.  Each `nodeInfo` object
       * contains an `index` (`childNodes` index in parent) and optionally
       * `parent`, which points to node info of its parent (including its index).
       *
       * The template metadata object returned from this method has the following
       * structure (many fields optional):
       *
       * ```js
       *   {
       *     // Flattened list of node metadata (for nodes that generated metadata)
       *     nodeInfoList: [
       *       {
       *         // `id` attribute for any nodes with id's for generating `$` map
       *         id: {string},
       *         // `on-event="handler"` metadata
       *         events: [
       *           {
       *             name: {string},   // event name
       *             value: {string},  // handler method name
       *           }, ...
       *         ],
       *         // Notes when the template contained a `<slot>` for shady DOM
       *         // optimization purposes
       *         hasInsertionPoint: {boolean},
       *         // For nested `<template>`` nodes, nested template metadata
       *         templateInfo: {object}, // nested template metadata
       *         // Metadata to allow efficient retrieval of instanced node
       *         // corresponding to this metadata
       *         parentInfo: {number},   // reference to parent nodeInfo>
       *         parentIndex: {number},  // index in parent's `childNodes` collection
       *         infoIndex: {number},    // index of this `nodeInfo` in `templateInfo.nodeInfoList`
       *       },
       *       ...
       *     ],
       *     // When true, the template had the `strip-whitespace` attribute
       *     // or was nested in a template with that setting
       *     stripWhitespace: {boolean},
       *     // For nested templates, nested template content is moved into
       *     // a document fragment stored here; this is an optimization to
       *     // avoid the cost of nested template cloning
       *     content: {DocumentFragment}
       *   }
       * ```
       *
       * This method kicks off a recursive treewalk as follows:
       *
       * ```
       *    _parseTemplate <---------------------+
       *      _parseTemplateContent              |
       *        _parseTemplateNode  <------------|--+
       *          _parseTemplateNestedTemplate --+  |
       *          _parseTemplateChildNodes ---------+
       *          _parseTemplateNodeAttributes
       *            _parseTemplateNodeAttribute
       *
       * ```
       *
       * These methods may be overridden to add custom metadata about templates
       * to either `templateInfo` or `nodeInfo`.
       *
       * Note that this method may be destructive to the template, in that
       * e.g. event annotations may be removed after being noted in the
       * template metadata.
       *
       * @param {!HTMLTemplateElement} template Template to parse
       * @param {TemplateInfo=} outerTemplateInfo Template metadata from the outer
       *   template, for parsing nested templates
       * @return {!TemplateInfo} Parsed template metadata
       */
      static _parseTemplate(template, outerTemplateInfo) {
        // since a template may be re-used, memo-ize metadata
        if (!template._templateInfo) {
          let templateInfo = template._templateInfo = {};
          templateInfo.nodeInfoList = [];
          templateInfo.stripWhiteSpace = outerTemplateInfo && outerTemplateInfo.stripWhiteSpace || template.hasAttribute('strip-whitespace');
          this._parseTemplateContent(template, templateInfo, { parent: null });
        }
        return template._templateInfo;
      }

      static _parseTemplateContent(template, templateInfo, nodeInfo) {
        return this._parseTemplateNode(template.content, templateInfo, nodeInfo);
      }

      /**
       * Parses template node and adds template and node metadata based on
       * the current node, and its `childNodes` and `attributes`.
       *
       * This method may be overridden to add custom node or template specific
       * metadata based on this node.
       *
       * @param {Node} node Node to parse
       * @param {!TemplateInfo} templateInfo Template metadata for current template
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       */
      static _parseTemplateNode(node, templateInfo, nodeInfo) {
        let noted;
        let element = /** @type Element */node;
        if (element.localName == 'template' && !element.hasAttribute('preserve-content')) {
          noted = this._parseTemplateNestedTemplate(element, templateInfo, nodeInfo) || noted;
        } else if (element.localName === 'slot') {
          // For ShadyDom optimization, indicating there is an insertion point
          templateInfo.hasInsertionPoint = true;
        }
        if (element.firstChild) {
          noted = this._parseTemplateChildNodes(element, templateInfo, nodeInfo) || noted;
        }
        if (element.hasAttributes && element.hasAttributes()) {
          noted = this._parseTemplateNodeAttributes(element, templateInfo, nodeInfo) || noted;
        }
        return noted;
      }

      /**
       * Parses template child nodes for the given root node.
       *
       * This method also wraps whitelisted legacy template extensions
       * (`is="dom-if"` and `is="dom-repeat"`) with their equivalent element
       * wrappers, collapses text nodes, and strips whitespace from the template
       * if the `templateInfo.stripWhitespace` setting was provided.
       *
       * @param {Node} root Root node whose `childNodes` will be parsed
       * @param {!TemplateInfo} templateInfo Template metadata for current template
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       */
      static _parseTemplateChildNodes(root, templateInfo, nodeInfo) {
        for (let node = root.firstChild, parentIndex = 0, next; node; node = next) {
          // Wrap templates
          if (node.localName == 'template') {
            node = wrapTemplateExtension(node);
          }
          // collapse adjacent textNodes: fixes an IE issue that can cause
          // text nodes to be inexplicably split =(
          // note that root.normalize() should work but does not so we do this
          // manually.
          next = node.nextSibling;
          if (node.nodeType === Node.TEXT_NODE) {
            let /** Node */n = next;
            while (n && n.nodeType === Node.TEXT_NODE) {
              node.textContent += n.textContent;
              next = n.nextSibling;
              root.removeChild(n);
              n = next;
            }
            // optionally strip whitespace
            if (templateInfo.stripWhiteSpace && !node.textContent.trim()) {
              root.removeChild(node);
              continue;
            }
          }
          let childInfo = { parentIndex, parentInfo: nodeInfo };
          if (this._parseTemplateNode(node, templateInfo, childInfo)) {
            childInfo.infoIndex = templateInfo.nodeInfoList.push( /** @type {!NodeInfo} */childInfo) - 1;
          }
          // Increment if not removed
          if (node.parentNode) {
            parentIndex++;
          }
        }
      }

      /**
       * Parses template content for the given nested `<template>`.
       *
       * Nested template info is stored as `templateInfo` in the current node's
       * `nodeInfo`. `template.content` is removed and stored in `templateInfo`.
       * It will then be the responsibility of the host to set it back to the
       * template and for users stamping nested templates to use the
       * `_contentForTemplate` method to retrieve the content for this template
       * (an optimization to avoid the cost of cloning nested template content).
       *
       * @param {HTMLTemplateElement} node Node to parse (a <template>)
       * @param {TemplateInfo} outerTemplateInfo Template metadata for current template
       *   that includes the template `node`
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       */
      static _parseTemplateNestedTemplate(node, outerTemplateInfo, nodeInfo) {
        let templateInfo = this._parseTemplate(node, outerTemplateInfo);
        let content = templateInfo.content = node.content.ownerDocument.createDocumentFragment();
        content.appendChild(node.content);
        nodeInfo.templateInfo = templateInfo;
        return true;
      }

      /**
       * Parses template node attributes and adds node metadata to `nodeInfo`
       * for nodes of interest.
       *
       * @param {Element} node Node to parse
       * @param {TemplateInfo} templateInfo Template metadata for current template
       * @param {NodeInfo} nodeInfo Node metadata for current template.
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       */
      static _parseTemplateNodeAttributes(node, templateInfo, nodeInfo) {
        // Make copy of original attribute list, since the order may change
        // as attributes are added and removed
        let noted = false;
        let attrs = Array.from(node.attributes);
        for (let i = attrs.length - 1, a; a = attrs[i]; i--) {
          noted = this._parseTemplateNodeAttribute(node, templateInfo, nodeInfo, a.name, a.value) || noted;
        }
        return noted;
      }

      /**
       * Parses a single template node attribute and adds node metadata to
       * `nodeInfo` for attributes of interest.
       *
       * This implementation adds metadata for `on-event="handler"` attributes
       * and `id` attributes.
       *
       * @param {Element} node Node to parse
       * @param {!TemplateInfo} templateInfo Template metadata for current template
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @param {string} name Attribute name
       * @param {string} value Attribute value
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       */
      static _parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value) {
        // events (on-*)
        if (name.slice(0, 3) === 'on-') {
          node.removeAttribute(name);
          nodeInfo.events = nodeInfo.events || [];
          nodeInfo.events.push({
            name: name.slice(3),
            value
          });
          return true;
        }
        // static id
        else if (name === 'id') {
            nodeInfo.id = value;
            return true;
          }
        return false;
      }

      /**
       * Returns the `content` document fragment for a given template.
       *
       * For nested templates, Polymer performs an optimization to cache nested
       * template content to avoid the cost of cloning deeply nested templates.
       * This method retrieves the cached content for a given template.
       *
       * @param {HTMLTemplateElement} template Template to retrieve `content` for
       * @return {DocumentFragment} Content fragment
       */
      static _contentForTemplate(template) {
        let templateInfo = /** @type {HTMLTemplateElementWithInfo} */template._templateInfo;
        return templateInfo && templateInfo.content || template.content;
      }

      /**
       * Clones the provided template content and returns a document fragment
       * containing the cloned dom.
       *
       * The template is parsed (once and memoized) using this library's
       * template parsing features, and provides the following value-added
       * features:
       * * Adds declarative event listeners for `on-event="handler"` attributes
       * * Generates an "id map" for all nodes with id's under `$` on returned
       *   document fragment
       * * Passes template info including `content` back to templates as
       *   `_templateInfo` (a performance optimization to avoid deep template
       *   cloning)
       *
       * Note that the memoized template parsing process is destructive to the
       * template: attributes for bindings and declarative event listeners are
       * removed after being noted in notes, and any nested `<template>.content`
       * is removed and stored in notes as well.
       *
       * @param {!HTMLTemplateElement} template Template to stamp
       * @return {!StampedTemplate} Cloned template content
       */
      _stampTemplate(template) {
        // Polyfill support: bootstrap the template if it has not already been
        if (template && !template.content && window.HTMLTemplateElement && HTMLTemplateElement.decorate) {
          HTMLTemplateElement.decorate(template);
        }
        let templateInfo = this.constructor._parseTemplate(template);
        let nodeInfo = templateInfo.nodeInfoList;
        let content = templateInfo.content || template.content;
        let dom = /** @type DocumentFragment */document.importNode(content, true);
        // NOTE: ShadyDom optimization indicating there is an insertion point
        dom.__noInsertionPoint = !templateInfo.hasInsertionPoint;
        let nodes = dom.nodeList = new Array(nodeInfo.length);
        dom.$ = {};
        for (let i = 0, l = nodeInfo.length, info; i < l && (info = nodeInfo[i]); i++) {
          let node = nodes[i] = findTemplateNode(dom, info);
          applyIdToMap(this, dom.$, node, info);
          applyTemplateContent(this, node, info);
          applyEventListener(this, node, info);
        }
        return (/** @type {!StampedTemplate} */dom
        );
      }

      /**
       * Adds an event listener by method name for the event provided.
       *
       * This method generates a handler function that looks up the method
       * name at handling time.
       *
       * @param {Node} node Node to add listener on
       * @param {string} eventName Name of event
       * @param {string} methodName Name of method
       * @param {*=} context Context the method will be called on (defaults
       *   to `node`)
       * @return {Function} Generated handler function
       */
      _addMethodEventListenerToNode(node, eventName, methodName, context) {
        context = context || node;
        let handler = createNodeEventHandler(context, eventName, methodName);
        this._addEventListenerToNode(node, eventName, handler);
        return handler;
      }

      /**
       * Override point for adding custom or simulated event handling.
       *
       * @param {Node} node Node to add event listener to
       * @param {string} eventName Name of event
       * @param {Function} handler Listener function to add
       */
      _addEventListenerToNode(node, eventName, handler) {
        node.addEventListener(eventName, handler);
      }

      /**
       * Override point for adding custom or simulated event handling.
       *
       * @param {Node} node Node to remove event listener from
       * @param {string} eventName Name of event
       * @param {Function} handler Listener function to remove
       */
      _removeEventListenerFromNode(node, eventName, handler) {
        node.removeEventListener(eventName, handler);
      }

    }

    return TemplateStamp;
  });
})();

/***/ }),
/* 18 */
/***/ (function(module, exports) {

/*__wc__loader*/!function (a) {
    var b = "<dom-module id=\"animated-svg-path\">\n    <template>\n        <style type=\"text/css\">[[_toSelector(_elements)]]{/* Set the empty space to a very high number to guarantee (more or less) that that number is hidden to start */ stroke-dasharray:0 100000;}[[_toSelector(_elements,'.active')]]{transition:stroke-dasharray [[_animationSpeed]]ms [[animationCurve]];}[[_toSelector(_elements,'.animate')]]{/* percent values in stroke-dasharray don't seem to relate to the overall length of the path so we have to set it to the explict path length to animate to */ stroke-dasharray:[[_dashLength]] 100000;display:inherit;}[[_toSelector(_elements,'.completed')]]{display:inherit;stroke-dasharray:1 0;transition:none;}</style>\n    </template>\n</dom-module>\n";if (a.body) {
        var c = a.body,
            d = a.createElement("div");for (d.innerHTML = b; d.children.length > 0;) c.appendChild(d.children[0]);
    } else a.write(b);
}(document);

// animated-svg-path element
// An element that houses any collection of paths as children and animates drawing them
// The order the paths are drawn is is determined by the "order" attribute

/*
Example:
<animated-svg-path>
    <svg>
        <path order="0" ... />
        <path order="1" ... />
    </svg>
</animated-svg-path>
*/

(function () {
    // Mapping a nodelist isn't available so we create our
    // own version
    // TODO: This isn't great... this shouldn't have to modify
    // global prototypes
    NodeList.prototype.map = Array.prototype.map;
    class AnimatedSVGPath extends Polymer.Element {
        static get is() {
            return 'animated-svg-path';
        }

        static get properties() {
            return {
                // Whether or not to animage the
                // SVG drawing immediately or not 
                autoPlay: {
                    type: Boolean,
                    value: false,
                    reflectToAttribute: true
                },

                // How long to take to draw each path
                // If constant-draw-time isn't enabled
                // then this is the time it takes to draw
                // the longest path
                durationPerPath: {
                    type: Number,
                    value: 200
                },

                // If enabled then each paths takes a the same
                // amount of time to draw. So short paths will
                // take a long time to drwa while long paths
                // will draw fast
                constantDrawTime: {
                    type: Boolean,
                    value: false,
                    reflectToAttribute: true
                },

                // The animation curve type to use for the css
                // transition
                animationCurve: {
                    type: String,
                    value: 'ease-in-out',
                    reflectToAttribute: true
                },

                // Boolean indicating whether or not the
                // element is playing or not
                playing: {
                    type: Boolean,
                    value: false,
                    reflectToAttribute: true,
                    notify: true
                },

                // The current index of paths to draw
                _currentOrderIndex: {
                    type: Number,
                    value: 0
                },

                // The current speed to animate at
                // Bound in the above style tag
                _animationSpeed: {
                    type: Number,
                    value: 0
                },

                // The length of the dash to currently animate to
                _dashLength: {
                    type: Number,
                    value: 0
                },

                // Key used to check if an async animation loop
                // has been invalidated
                _playKey: {
                    type: Number,
                    value: 0
                },

                // The list of elements this can apply to
                // All references to path should draw from this
                _elements: {
                    type: Array,
                    value: () => ['path', 'line']
                }
            };
        }

        /* Overrides */
        _attachDom(dom) {
            this.appendChild(dom);
        }

        /* Lifecycle Functions */
        connectedCallback() {
            super.connectedCallback();
            this.reset();
        }

        /* Public API */
        play() {
            this._clear();

            // If the playkey has changed, then that means this
            // animation is invalidated
            this._playKey++;
            const key = this._playKey;

            // Clear will remove the 'active' class
            // to stop all css animations. We wait a frame
            // here to make sure the css changes have
            // flushed, stopping the last plays animations
            // before starting agian
            requestAnimationFrame(() => {
                // find the logest path for the case of
                // non-constant animations
                this._animationSpeed = this.durationPerPath;
                const paths = this._getPaths();
                paths.forEach(p => p.classList.add('active'));

                const maxPathLength = paths.map(p => this._getLength(p)).reduce((val, next) => next > val ? next : val);

                // perform the animation
                const _do = () => {
                    this.playing = true;

                    const coi = this._currentOrderIndex;
                    const paths = this._getPaths(coi);

                    // if there are no paths, that means it time to stop!
                    if (!paths || !paths.length) {
                        this.playing = false;
                        return;
                    }

                    const len = paths.map(p => this._getLength(p)).reduce((val, next, i) => val += next / (i + 1), 0);
                    let speed = this.durationPerPath;

                    if (!this.constantDrawTime) speed = this.durationPerPath * len / maxPathLength;

                    // set the css styles to interpolate to
                    this._animationSpeed = speed;
                    this._dashLength = len;

                    paths.forEach(p => p.classList.add('animate'));
                    setTimeout(() => {
                        paths.forEach(p => {
                            if (this._playKey !== key) return;

                            p.classList.remove('animate');
                            p.classList.add('completed');
                            this._currentOrderIndex++;
                            _do();
                        });
                    }, speed);
                };
                _do();
            });
        }

        reset() {
            this._clear();
            if (this.autoPlay) this.play();
        }

        /* Utilities */
        _toSelector(arr, suf = '') {
            return arr.map(el => `${el}${suf}`).join(',');
        }

        _getLength(el) {
            const tagName = el.tagName.toLowerCase();
            if (tagName === 'path' || el.getTotalLength) {
                return el.getTotalLength();
            } else if (tagName === 'line') {
                const xd = parseFloat(el.getAttribute('x2')) - parseFloat(el.getAttribute('x1'));
                const yd = parseFloat(el.getAttribute('y2')) - parseFloat(el.getAttribute('y1'));
                return Math.sqrt(xd * xd + yd * yd);
            } else {
                console.error('Length function not defined for ', el);
            }
        }

        /* Private Functions */
        // clear the current state
        _clear() {
            this._getPaths().forEach(p => {
                p.classList.remove('active');
                p.classList.remove('animate');
                p.classList.remove('completed');
            });
            this._currentOrderIndex = 0;
            this.playing = false;
        }

        // returns all the paths to animate
        _getPaths(order) {
            const selector = this._toSelector(this._elements, order == null ? '' : `[order="${order}"]`);
            return this.querySelectorAll(selector);
        }
    }

    customElements.define(AnimatedSVGPath.is, AnimatedSVGPath);
})();

/***/ })
/******/ ]);