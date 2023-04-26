// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"fG26k":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "53dbb6376cf569ee";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"j51ut":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _jsxDevRuntime = require("preact/jsx-dev-runtime");
var _preact = require("preact");
var _form = require("./components/Form");
var _formDefault = parcelHelpers.interopDefault(_form);
(0, _preact.render)(/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _formDefault.default), {}, void 0, false, {
    fileName: "monogram.js",
    lineNumber: 4,
    columnNumber: 8
}, undefined), document.querySelector("#monogram-form"));
class MonogramToggle extends HTMLElement {
    constructor(){
        super();
        this.monogramModal = new theme.Modals("MonogramModal", "monogram-modal");
        this.addToCart = document.querySelector("button.add-to-cart");
        this.checkbox = this.querySelector('input[type="checkbox"]');
        this.buttonWrapper = this.querySelector(".monogram-button-wrapper");
    }
    connectedCallback() {
        this.checkbox.addEventListener("change", this.toggleButtons.bind(this));
    }
    toggleButtons() {
        this.buttonWrapper.classList.toggle("hide");
        this.addToCart.classList.toggle("hide");
    }
}
customElements.define("monogram-toggle", MonogramToggle);
class MonogramCustomizer extends HTMLElement {
    constructor(){
        super();
        this.form = this.querySelector("form");
        this.monogramIdEls = this.querySelectorAll(".js-monogram-id");
        this.parentVariantIdEls = this.querySelectorAll(".js-parent-variant-id");
        this.parentTitleEls = this.querySelectorAll(".js-parent-title");
        this.monogramStyleEls = this.querySelectorAll(".js-monogram-style");
    }
    setElementValues(elements, value) {
        elements.forEach((el)=>{
            el.value = value;
        });
    }
    connectedCallback() {
        this.setElementValues(this.monogramIdEls, crypto.randomUUID());
        if (theme.settings.cartType === "drawer") new theme.AjaxProduct(this.form, ".monogram__add-to-cart");
        document.addEventListener("ajaxProduct:added", ()=>{
            this.setElementValues(this.monogramIdEls, crypto.randomUUID());
        });
        document.addEventListener("variant:change", (e)=>{
            this.setElementValues(this.parentVariantIdEls, e.detail.variant.id);
            this.setElementValues(this.parentTitleEls, e.detail.variant.name);
        });
        this.form.addEventListener("change", (e)=>{
            this.setElementValues(this.monogramStyleEls, e.target.dataset.title);
        });
    }
}
customElements.define("monogram-customizer", MonogramCustomizer);

},{"preact":"26zcy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","preact/jsx-dev-runtime":"3mFUL","./components/Form":"kLvDP"}],"26zcy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Component", ()=>k);
parcelHelpers.export(exports, "Fragment", ()=>_);
parcelHelpers.export(exports, "cloneElement", ()=>E);
parcelHelpers.export(exports, "createContext", ()=>F);
parcelHelpers.export(exports, "createElement", ()=>y);
parcelHelpers.export(exports, "createRef", ()=>d);
parcelHelpers.export(exports, "h", ()=>y);
parcelHelpers.export(exports, "hydrate", ()=>D);
parcelHelpers.export(exports, "isValidElement", ()=>i);
parcelHelpers.export(exports, "options", ()=>l);
parcelHelpers.export(exports, "render", ()=>B);
parcelHelpers.export(exports, "toChildArray", ()=>P);
var n, l, u, i, t, r, o, f, e, c = {}, s = [], a = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function h(n, l) {
    for(var u in l)n[u] = l[u];
    return n;
}
function v(n) {
    var l = n.parentNode;
    l && l.removeChild(n);
}
function y(l, u, i) {
    var t, r, o, f = {};
    for(o in u)"key" == o ? t = u[o] : "ref" == o ? r = u[o] : f[o] = u[o];
    if (arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : i), "function" == typeof l && null != l.defaultProps) for(o in l.defaultProps)void 0 === f[o] && (f[o] = l.defaultProps[o]);
    return p(l, f, t, r, null);
}
function p(n, i, t, r, o) {
    var f = {
        type: n,
        props: i,
        key: t,
        ref: r,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: null == o ? ++u : o
    };
    return null == o && null != l.vnode && l.vnode(f), f;
}
function d() {
    return {
        current: null
    };
}
function _(n) {
    return n.children;
}
function k(n, l) {
    this.props = n, this.context = l;
}
function b(n, l) {
    if (null == l) return n.__ ? b(n.__, n.__.__k.indexOf(n) + 1) : null;
    for(var u; l < n.__k.length; l++)if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
    return "function" == typeof n.type ? b(n) : null;
}
function g(n) {
    var l, u;
    if (null != (n = n.__) && null != n.__c) {
        for(n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++)if (null != (u = n.__k[l]) && null != u.__e) {
            n.__e = n.__c.base = u.__e;
            break;
        }
        return g(n);
    }
}
function m(n) {
    (!n.__d && (n.__d = !0) && t.push(n) && !w.__r++ || r !== l.debounceRendering) && ((r = l.debounceRendering) || o)(w);
}
function w() {
    var n, l, u, i, r, o, e, c;
    for(t.sort(f); n = t.shift();)n.__d && (l = t.length, i = void 0, r = void 0, e = (o = (u = n).__v).__e, (c = u.__P) && (i = [], (r = h({}, o)).__v = o.__v + 1, L(c, o, r, u.__n, void 0 !== c.ownerSVGElement, null != o.__h ? [
        e
    ] : null, i, null == e ? b(o) : e, o.__h), M(i, o), o.__e != e && g(o)), t.length > l && t.sort(f));
    w.__r = 0;
}
function x(n, l, u, i, t, r, o, f, e, a) {
    var h, v, y, d, k, g, m, w = i && i.__k || s, x = w.length;
    for(u.__k = [], h = 0; h < l.length; h++)if (null != (d = u.__k[h] = null == (d = l[h]) || "boolean" == typeof d || "function" == typeof d ? null : "string" == typeof d || "number" == typeof d || "bigint" == typeof d ? p(null, d, null, null, d) : Array.isArray(d) ? p(_, {
        children: d
    }, null, null, null) : d.__b > 0 ? p(d.type, d.props, d.key, d.ref ? d.ref : null, d.__v) : d)) {
        if (d.__ = u, d.__b = u.__b + 1, null === (y = w[h]) || y && d.key == y.key && d.type === y.type) w[h] = void 0;
        else for(v = 0; v < x; v++){
            if ((y = w[v]) && d.key == y.key && d.type === y.type) {
                w[v] = void 0;
                break;
            }
            y = null;
        }
        L(n, d, y = y || c, t, r, o, f, e, a), k = d.__e, (v = d.ref) && y.ref != v && (m || (m = []), y.ref && m.push(y.ref, null, d), m.push(v, d.__c || k, d)), null != k ? (null == g && (g = k), "function" == typeof d.type && d.__k === y.__k ? d.__d = e = A(d, e, n) : e = C(n, d, y, w, k, e), "function" == typeof u.type && (u.__d = e)) : e && y.__e == e && e.parentNode != n && (e = b(y));
    }
    for(u.__e = g, h = x; h--;)null != w[h] && ("function" == typeof u.type && null != w[h].__e && w[h].__e == u.__d && (u.__d = $(i).nextSibling), S(w[h], w[h]));
    if (m) for(h = 0; h < m.length; h++)O(m[h], m[++h], m[++h]);
}
function A(n, l, u) {
    for(var i, t = n.__k, r = 0; t && r < t.length; r++)(i = t[r]) && (i.__ = n, l = "function" == typeof i.type ? A(i, l, u) : C(u, i, i, t, i.__e, l));
    return l;
}
function P(n, l) {
    return l = l || [], null == n || "boolean" == typeof n || (Array.isArray(n) ? n.some(function(n) {
        P(n, l);
    }) : l.push(n)), l;
}
function C(n, l, u, i, t, r) {
    var o, f, e;
    if (void 0 !== l.__d) o = l.__d, l.__d = void 0;
    else if (null == u || t != r || null == t.parentNode) n: if (null == r || r.parentNode !== n) n.appendChild(t), o = null;
    else {
        for(f = r, e = 0; (f = f.nextSibling) && e < i.length; e += 1)if (f == t) break n;
        n.insertBefore(t, r), o = r;
    }
    return void 0 !== o ? o : t.nextSibling;
}
function $(n) {
    var l, u, i;
    if (null == n.type || "string" == typeof n.type) return n.__e;
    if (n.__k) {
        for(l = n.__k.length - 1; l >= 0; l--)if ((u = n.__k[l]) && (i = $(u))) return i;
    }
    return null;
}
function H(n, l, u, i, t) {
    var r;
    for(r in u)"children" === r || "key" === r || r in l || T(n, r, null, u[r], i);
    for(r in l)t && "function" != typeof l[r] || "children" === r || "key" === r || "value" === r || "checked" === r || u[r] === l[r] || T(n, r, l[r], u[r], i);
}
function I(n, l, u) {
    "-" === l[0] ? n.setProperty(l, null == u ? "" : u) : n[l] = null == u ? "" : "number" != typeof u || a.test(l) ? u : u + "px";
}
function T(n, l, u, i, t) {
    var r;
    n: if ("style" === l) {
        if ("string" == typeof u) n.style.cssText = u;
        else {
            if ("string" == typeof i && (n.style.cssText = i = ""), i) for(l in i)u && l in u || I(n.style, l, "");
            if (u) for(l in u)i && u[l] === i[l] || I(n.style, l, u[l]);
        }
    } else if ("o" === l[0] && "n" === l[1]) r = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + r] = u, u ? i || n.addEventListener(l, r ? z : j, r) : n.removeEventListener(l, r ? z : j, r);
    else if ("dangerouslySetInnerHTML" !== l) {
        if (t) l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("width" !== l && "height" !== l && "href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && l in n) try {
            n[l] = null == u ? "" : u;
            break n;
        } catch (n) {}
        "function" == typeof u || (null == u || !1 === u && "-" !== l[4] ? n.removeAttribute(l) : n.setAttribute(l, u));
    }
}
function j(n) {
    return this.l[n.type + !1](l.event ? l.event(n) : n);
}
function z(n) {
    return this.l[n.type + !0](l.event ? l.event(n) : n);
}
function L(n, u, i, t, r, o, f, e, c) {
    var s, a, v, y, p, d, b, g, m, w, A, P, C, $, H, I = u.type;
    if (void 0 !== u.constructor) return null;
    null != i.__h && (c = i.__h, e = u.__e = i.__e, u.__h = null, o = [
        e
    ]), (s = l.__b) && s(u);
    try {
        n: if ("function" == typeof I) {
            if (g = u.props, m = (s = I.contextType) && t[s.__c], w = s ? m ? m.props.value : s.__ : t, i.__c ? b = (a = u.__c = i.__c).__ = a.__E : ("prototype" in I && I.prototype.render ? u.__c = a = new I(g, w) : (u.__c = a = new k(g, w), a.constructor = I, a.render = q), m && m.sub(a), a.props = g, a.state || (a.state = {}), a.context = w, a.__n = t, v = a.__d = !0, a.__h = [], a._sb = []), null == a.__s && (a.__s = a.state), null != I.getDerivedStateFromProps && (a.__s == a.state && (a.__s = h({}, a.__s)), h(a.__s, I.getDerivedStateFromProps(g, a.__s))), y = a.props, p = a.state, a.__v = u, v) null == I.getDerivedStateFromProps && null != a.componentWillMount && a.componentWillMount(), null != a.componentDidMount && a.__h.push(a.componentDidMount);
            else {
                if (null == I.getDerivedStateFromProps && g !== y && null != a.componentWillReceiveProps && a.componentWillReceiveProps(g, w), !a.__e && null != a.shouldComponentUpdate && !1 === a.shouldComponentUpdate(g, a.__s, w) || u.__v === i.__v) {
                    for(u.__v !== i.__v && (a.props = g, a.state = a.__s, a.__d = !1), a.__e = !1, u.__e = i.__e, u.__k = i.__k, u.__k.forEach(function(n) {
                        n && (n.__ = u);
                    }), A = 0; A < a._sb.length; A++)a.__h.push(a._sb[A]);
                    a._sb = [], a.__h.length && f.push(a);
                    break n;
                }
                null != a.componentWillUpdate && a.componentWillUpdate(g, a.__s, w), null != a.componentDidUpdate && a.__h.push(function() {
                    a.componentDidUpdate(y, p, d);
                });
            }
            if (a.context = w, a.props = g, a.__P = n, P = l.__r, C = 0, "prototype" in I && I.prototype.render) {
                for(a.state = a.__s, a.__d = !1, P && P(u), s = a.render(a.props, a.state, a.context), $ = 0; $ < a._sb.length; $++)a.__h.push(a._sb[$]);
                a._sb = [];
            } else do a.__d = !1, P && P(u), s = a.render(a.props, a.state, a.context), a.state = a.__s;
            while (a.__d && ++C < 25);
            a.state = a.__s, null != a.getChildContext && (t = h(h({}, t), a.getChildContext())), v || null == a.getSnapshotBeforeUpdate || (d = a.getSnapshotBeforeUpdate(y, p)), H = null != s && s.type === _ && null == s.key ? s.props.children : s, x(n, Array.isArray(H) ? H : [
                H
            ], u, i, t, r, o, f, e, c), a.base = u.__e, u.__h = null, a.__h.length && f.push(a), b && (a.__E = a.__ = null), a.__e = !1;
        } else null == o && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = N(i.__e, u, i, t, r, o, f, c);
        (s = l.diffed) && s(u);
    } catch (n) {
        u.__v = null, (c || null != o) && (u.__e = e, u.__h = !!c, o[o.indexOf(e)] = null), l.__e(n, u, i);
    }
}
function M(n, u) {
    l.__c && l.__c(u, n), n.some(function(u) {
        try {
            n = u.__h, u.__h = [], n.some(function(n) {
                n.call(u);
            });
        } catch (n) {
            l.__e(n, u.__v);
        }
    });
}
function N(l, u, i, t, r, o, f, e) {
    var s, a, h, y = i.props, p = u.props, d = u.type, _ = 0;
    if ("svg" === d && (r = !0), null != o) {
        for(; _ < o.length; _++)if ((s = o[_]) && "setAttribute" in s == !!d && (d ? s.localName === d : 3 === s.nodeType)) {
            l = s, o[_] = null;
            break;
        }
    }
    if (null == l) {
        if (null === d) return document.createTextNode(p);
        l = r ? document.createElementNS("http://www.w3.org/2000/svg", d) : document.createElement(d, p.is && p), o = null, e = !1;
    }
    if (null === d) y === p || e && l.data === p || (l.data = p);
    else {
        if (o = o && n.call(l.childNodes), a = (y = i.props || c).dangerouslySetInnerHTML, h = p.dangerouslySetInnerHTML, !e) {
            if (null != o) for(y = {}, _ = 0; _ < l.attributes.length; _++)y[l.attributes[_].name] = l.attributes[_].value;
            (h || a) && (h && (a && h.__html == a.__html || h.__html === l.innerHTML) || (l.innerHTML = h && h.__html || ""));
        }
        if (H(l, p, y, r, e), h) u.__k = [];
        else if (_ = u.props.children, x(l, Array.isArray(_) ? _ : [
            _
        ], u, i, t, r && "foreignObject" !== d, o, f, o ? o[0] : i.__k && b(i, 0), e), null != o) for(_ = o.length; _--;)null != o[_] && v(o[_]);
        e || ("value" in p && void 0 !== (_ = p.value) && (_ !== l.value || "progress" === d && !_ || "option" === d && _ !== y.value) && T(l, "value", _, y.value, !1), "checked" in p && void 0 !== (_ = p.checked) && _ !== l.checked && T(l, "checked", _, y.checked, !1));
    }
    return l;
}
function O(n, u, i) {
    try {
        "function" == typeof n ? n(u) : n.current = u;
    } catch (n) {
        l.__e(n, i);
    }
}
function S(n, u, i) {
    var t, r;
    if (l.unmount && l.unmount(n), (t = n.ref) && (t.current && t.current !== n.__e || O(t, null, u)), null != (t = n.__c)) {
        if (t.componentWillUnmount) try {
            t.componentWillUnmount();
        } catch (n) {
            l.__e(n, u);
        }
        t.base = t.__P = null, n.__c = void 0;
    }
    if (t = n.__k) for(r = 0; r < t.length; r++)t[r] && S(t[r], u, i || "function" != typeof n.type);
    i || null == n.__e || v(n.__e), n.__ = n.__e = n.__d = void 0;
}
function q(n, l, u) {
    return this.constructor(n, u);
}
function B(u, i, t) {
    var r, o, f;
    l.__ && l.__(u, i), o = (r = "function" == typeof t) ? null : t && t.__k || i.__k, f = [], L(i, u = (!r && t || i).__k = y(_, null, [
        u
    ]), o || c, c, void 0 !== i.ownerSVGElement, !r && t ? [
        t
    ] : o ? null : i.firstChild ? n.call(i.childNodes) : null, f, !r && t ? t : o ? o.__e : i.firstChild, r), M(f, u);
}
function D(n, l) {
    B(n, l, D);
}
function E(l, u, i) {
    var t, r, o, f = h({}, l.props);
    for(o in u)"key" == o ? t = u[o] : "ref" == o ? r = u[o] : f[o] = u[o];
    return arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : i), p(l.type, f, t || l.key, r || l.ref, null);
}
function F(n, l) {
    var u = {
        __c: l = "__cC" + e++,
        __: n,
        Consumer: function(n, l) {
            return n.children(l);
        },
        Provider: function(n) {
            var u, i;
            return this.getChildContext || (u = [], (i = {})[l] = this, this.getChildContext = function() {
                return i;
            }, this.shouldComponentUpdate = function(n) {
                this.props.value !== n.value && u.some(function(n) {
                    n.__e = !0, m(n);
                });
            }, this.sub = function(n) {
                u.push(n);
                var l = n.componentWillUnmount;
                n.componentWillUnmount = function() {
                    u.splice(u.indexOf(n), 1), l && l.call(n);
                };
            }), n.children;
        }
    };
    return u.Provider.__ = u.Consumer.contextType = u;
}
n = s.slice, l = {
    __e: function(n, l, u, i) {
        for(var t, r, o; l = l.__;)if ((t = l.__c) && !t.__) try {
            if ((r = t.constructor) && null != r.getDerivedStateFromError && (t.setState(r.getDerivedStateFromError(n)), o = t.__d), null != t.componentDidCatch && (t.componentDidCatch(n, i || {}), o = t.__d), o) return t.__E = t;
        } catch (l) {
            n = l;
        }
        throw n;
    }
}, u = 0, i = function(n) {
    return null != n && void 0 === n.constructor;
}, k.prototype.setState = function(n, l) {
    var u;
    u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = h({}, this.state), "function" == typeof n && (n = n(h({}, u), this.props)), n && h(u, n), null != n && this.__v && (l && this._sb.push(l), m(this));
}, k.prototype.forceUpdate = function(n) {
    this.__v && (this.__e = !0, n && this.__h.push(n), m(this));
}, k.prototype.render = _, t = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function(n, l) {
    return n.__v.__b - l.__v.__b;
}, w.__r = 0, e = 0;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"3mFUL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Fragment", ()=>(0, _preact.Fragment));
parcelHelpers.export(exports, "jsx", ()=>o);
parcelHelpers.export(exports, "jsxDEV", ()=>o);
parcelHelpers.export(exports, "jsxs", ()=>o);
var _preact = require("preact");
var _ = 0;
function o(o, e, n, t, f, l) {
    var s, u, a = {};
    for(u in e)"ref" == u ? s = e[u] : a[u] = e[u];
    var i = {
        type: o,
        props: a,
        key: n,
        ref: s,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: --_,
        __source: f,
        __self: l
    };
    if ("function" == typeof o && (s = o.defaultProps)) for(u in s)void 0 === a[u] && (a[u] = s[u]);
    return (0, _preact.options).vnode && (0, _preact.options).vnode(i), i;
}

},{"preact":"26zcy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kLvDP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _jsxDevRuntime = require("preact/jsx-dev-runtime");
const Form = ()=>{
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h1", {
        children: "sdkfjh"
    }, void 0, false, {
        fileName: "components/Form.jsx",
        lineNumber: 2,
        columnNumber: 10
    }, undefined);
};
exports.default = Form;

},{"preact/jsx-dev-runtime":"3mFUL","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["fG26k","j51ut"], "j51ut", "parcelRequire6d00")

//# sourceMappingURL=monogram.js.map
