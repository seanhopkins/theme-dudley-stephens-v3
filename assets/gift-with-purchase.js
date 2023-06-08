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
})({"9PVCP":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "1a9f372bf8479201";
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

},{}],"fmKzW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _jsxDevRuntime = require("preact/jsx-dev-runtime");
var _debug = require("preact/debug");
var _preact = require("preact");
var _test = require("./components/Test");
var _testDefault = parcelHelpers.interopDefault(_test);
const gwp = document.querySelector("#GiftWithPurchase");
console.log(gwp);
(0, _preact.render)(/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h1", {
    children: "test"
}, void 0, false, {
    fileName: "src/preact/gift-with-purchase/gift-with-purchase.js",
    lineNumber: 9,
    columnNumber: 8
}, undefined), gwp);

},{"preact/jsx-dev-runtime":"3mFUL","preact/debug":"bCMOY","preact":"26zcy","./components/Test":"dG2TM","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3mFUL":[function(require,module,exports) {
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

},{"preact":"26zcy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"26zcy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Component", ()=>b);
parcelHelpers.export(exports, "Fragment", ()=>k);
parcelHelpers.export(exports, "cloneElement", ()=>F);
parcelHelpers.export(exports, "createContext", ()=>G);
parcelHelpers.export(exports, "createElement", ()=>y);
parcelHelpers.export(exports, "createRef", ()=>_);
parcelHelpers.export(exports, "h", ()=>y);
parcelHelpers.export(exports, "hydrate", ()=>E);
parcelHelpers.export(exports, "isValidElement", ()=>i);
parcelHelpers.export(exports, "options", ()=>l);
parcelHelpers.export(exports, "render", ()=>D);
parcelHelpers.export(exports, "toChildArray", ()=>S);
var n, l, u, i, t, o, r, f, e, c = {}, s = [], a = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, v = Array.isArray;
function h(n, l) {
    for(var u in l)n[u] = l[u];
    return n;
}
function p(n) {
    var l = n.parentNode;
    l && l.removeChild(n);
}
function y(l, u, i) {
    var t, o, r, f = {};
    for(r in u)"key" == r ? t = u[r] : "ref" == r ? o = u[r] : f[r] = u[r];
    if (arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : i), "function" == typeof l && null != l.defaultProps) for(r in l.defaultProps)void 0 === f[r] && (f[r] = l.defaultProps[r]);
    return d(l, f, t, o, null);
}
function d(n, i, t, o, r) {
    var f = {
        type: n,
        props: i,
        key: t,
        ref: o,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: null == r ? ++u : r
    };
    return null == r && null != l.vnode && l.vnode(f), f;
}
function _() {
    return {
        current: null
    };
}
function k(n) {
    return n.children;
}
function b(n, l) {
    this.props = n, this.context = l;
}
function g(n, l) {
    if (null == l) return n.__ ? g(n.__, n.__.__k.indexOf(n) + 1) : null;
    for(var u; l < n.__k.length; l++)if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
    return "function" == typeof n.type ? g(n) : null;
}
function m(n) {
    var l, u;
    if (null != (n = n.__) && null != n.__c) {
        for(n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++)if (null != (u = n.__k[l]) && null != u.__e) {
            n.__e = n.__c.base = u.__e;
            break;
        }
        return m(n);
    }
}
function w(n) {
    (!n.__d && (n.__d = !0) && t.push(n) && !x.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || r)(x);
}
function x() {
    var n, l, u, i, o, r, e, c;
    for(t.sort(f); n = t.shift();)n.__d && (l = t.length, i = void 0, o = void 0, e = (r = (u = n).__v).__e, (c = u.__P) && (i = [], (o = h({}, r)).__v = r.__v + 1, L(c, r, o, u.__n, void 0 !== c.ownerSVGElement, null != r.__h ? [
        e
    ] : null, i, null == e ? g(r) : e, r.__h), M(i, r), r.__e != e && m(r)), t.length > l && t.sort(f));
    x.__r = 0;
}
function P(n, l, u, i, t, o, r, f, e, a) {
    var h, p, y, _, b, m, w, x = i && i.__k || s, P = x.length;
    for(u.__k = [], h = 0; h < l.length; h++)if (null != (_ = u.__k[h] = null == (_ = l[h]) || "boolean" == typeof _ || "function" == typeof _ ? null : "string" == typeof _ || "number" == typeof _ || "bigint" == typeof _ ? d(null, _, null, null, _) : v(_) ? d(k, {
        children: _
    }, null, null, null) : _.__b > 0 ? d(_.type, _.props, _.key, _.ref ? _.ref : null, _.__v) : _)) {
        if (_.__ = u, _.__b = u.__b + 1, null === (y = x[h]) || y && _.key == y.key && _.type === y.type) x[h] = void 0;
        else for(p = 0; p < P; p++){
            if ((y = x[p]) && _.key == y.key && _.type === y.type) {
                x[p] = void 0;
                break;
            }
            y = null;
        }
        L(n, _, y = y || c, t, o, r, f, e, a), b = _.__e, (p = _.ref) && y.ref != p && (w || (w = []), y.ref && w.push(y.ref, null, _), w.push(p, _.__c || b, _)), null != b ? (null == m && (m = b), "function" == typeof _.type && _.__k === y.__k ? _.__d = e = C(_, e, n) : e = $(n, _, y, x, b, e), "function" == typeof u.type && (u.__d = e)) : e && y.__e == e && e.parentNode != n && (e = g(y));
    }
    for(u.__e = m, h = P; h--;)null != x[h] && ("function" == typeof u.type && null != x[h].__e && x[h].__e == u.__d && (u.__d = A(i).nextSibling), q(x[h], x[h]));
    if (w) for(h = 0; h < w.length; h++)O(w[h], w[++h], w[++h]);
}
function C(n, l, u) {
    for(var i, t = n.__k, o = 0; t && o < t.length; o++)(i = t[o]) && (i.__ = n, l = "function" == typeof i.type ? C(i, l, u) : $(u, i, i, t, i.__e, l));
    return l;
}
function S(n, l) {
    return l = l || [], null == n || "boolean" == typeof n || (v(n) ? n.some(function(n) {
        S(n, l);
    }) : l.push(n)), l;
}
function $(n, l, u, i, t, o) {
    var r, f, e;
    if (void 0 !== l.__d) r = l.__d, l.__d = void 0;
    else if (null == u || t != o || null == t.parentNode) n: if (null == o || o.parentNode !== n) n.appendChild(t), r = null;
    else {
        for(f = o, e = 0; (f = f.nextSibling) && e < i.length; e += 1)if (f == t) break n;
        n.insertBefore(t, o), r = o;
    }
    return void 0 !== r ? r : t.nextSibling;
}
function A(n) {
    var l, u, i;
    if (null == n.type || "string" == typeof n.type) return n.__e;
    if (n.__k) {
        for(l = n.__k.length - 1; l >= 0; l--)if ((u = n.__k[l]) && (i = A(u))) return i;
    }
    return null;
}
function H(n, l, u, i, t) {
    var o;
    for(o in u)"children" === o || "key" === o || o in l || T(n, o, null, u[o], i);
    for(o in l)t && "function" != typeof l[o] || "children" === o || "key" === o || "value" === o || "checked" === o || u[o] === l[o] || T(n, o, l[o], u[o], i);
}
function I(n, l, u) {
    "-" === l[0] ? n.setProperty(l, null == u ? "" : u) : n[l] = null == u ? "" : "number" != typeof u || a.test(l) ? u : u + "px";
}
function T(n, l, u, i, t) {
    var o;
    n: if ("style" === l) {
        if ("string" == typeof u) n.style.cssText = u;
        else {
            if ("string" == typeof i && (n.style.cssText = i = ""), i) for(l in i)u && l in u || I(n.style, l, "");
            if (u) for(l in u)i && u[l] === i[l] || I(n.style, l, u[l]);
        }
    } else if ("o" === l[0] && "n" === l[1]) o = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + o] = u, u ? i || n.addEventListener(l, o ? z : j, o) : n.removeEventListener(l, o ? z : j, o);
    else if ("dangerouslySetInnerHTML" !== l) {
        if (t) l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("width" !== l && "height" !== l && "href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && "rowSpan" !== l && "colSpan" !== l && l in n) try {
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
function L(n, u, i, t, o, r, f, e, c) {
    var s, a, p, y, d, _, g, m, w, x, C, S, $, A, H, I = u.type;
    if (void 0 !== u.constructor) return null;
    null != i.__h && (c = i.__h, e = u.__e = i.__e, u.__h = null, r = [
        e
    ]), (s = l.__b) && s(u);
    try {
        n: if ("function" == typeof I) {
            if (m = u.props, w = (s = I.contextType) && t[s.__c], x = s ? w ? w.props.value : s.__ : t, i.__c ? g = (a = u.__c = i.__c).__ = a.__E : ("prototype" in I && I.prototype.render ? u.__c = a = new I(m, x) : (u.__c = a = new b(m, x), a.constructor = I, a.render = B), w && w.sub(a), a.props = m, a.state || (a.state = {}), a.context = x, a.__n = t, p = a.__d = !0, a.__h = [], a._sb = []), null == a.__s && (a.__s = a.state), null != I.getDerivedStateFromProps && (a.__s == a.state && (a.__s = h({}, a.__s)), h(a.__s, I.getDerivedStateFromProps(m, a.__s))), y = a.props, d = a.state, a.__v = u, p) null == I.getDerivedStateFromProps && null != a.componentWillMount && a.componentWillMount(), null != a.componentDidMount && a.__h.push(a.componentDidMount);
            else {
                if (null == I.getDerivedStateFromProps && m !== y && null != a.componentWillReceiveProps && a.componentWillReceiveProps(m, x), !a.__e && null != a.shouldComponentUpdate && !1 === a.shouldComponentUpdate(m, a.__s, x) || u.__v === i.__v) {
                    for(u.__v !== i.__v && (a.props = m, a.state = a.__s, a.__d = !1), a.__e = !1, u.__e = i.__e, u.__k = i.__k, u.__k.forEach(function(n) {
                        n && (n.__ = u);
                    }), C = 0; C < a._sb.length; C++)a.__h.push(a._sb[C]);
                    a._sb = [], a.__h.length && f.push(a);
                    break n;
                }
                null != a.componentWillUpdate && a.componentWillUpdate(m, a.__s, x), null != a.componentDidUpdate && a.__h.push(function() {
                    a.componentDidUpdate(y, d, _);
                });
            }
            if (a.context = x, a.props = m, a.__P = n, S = l.__r, $ = 0, "prototype" in I && I.prototype.render) {
                for(a.state = a.__s, a.__d = !1, S && S(u), s = a.render(a.props, a.state, a.context), A = 0; A < a._sb.length; A++)a.__h.push(a._sb[A]);
                a._sb = [];
            } else do a.__d = !1, S && S(u), s = a.render(a.props, a.state, a.context), a.state = a.__s;
            while (a.__d && ++$ < 25);
            a.state = a.__s, null != a.getChildContext && (t = h(h({}, t), a.getChildContext())), p || null == a.getSnapshotBeforeUpdate || (_ = a.getSnapshotBeforeUpdate(y, d)), P(n, v(H = null != s && s.type === k && null == s.key ? s.props.children : s) ? H : [
                H
            ], u, i, t, o, r, f, e, c), a.base = u.__e, u.__h = null, a.__h.length && f.push(a), g && (a.__E = a.__ = null), a.__e = !1;
        } else null == r && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = N(i.__e, u, i, t, o, r, f, c);
        (s = l.diffed) && s(u);
    } catch (n) {
        u.__v = null, (c || null != r) && (u.__e = e, u.__h = !!c, r[r.indexOf(e)] = null), l.__e(n, u, i);
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
function N(l, u, i, t, o, r, f, e) {
    var s, a, h, y = i.props, d = u.props, _ = u.type, k = 0;
    if ("svg" === _ && (o = !0), null != r) {
        for(; k < r.length; k++)if ((s = r[k]) && "setAttribute" in s == !!_ && (_ ? s.localName === _ : 3 === s.nodeType)) {
            l = s, r[k] = null;
            break;
        }
    }
    if (null == l) {
        if (null === _) return document.createTextNode(d);
        l = o ? document.createElementNS("http://www.w3.org/2000/svg", _) : document.createElement(_, d.is && d), r = null, e = !1;
    }
    if (null === _) y === d || e && l.data === d || (l.data = d);
    else {
        if (r = r && n.call(l.childNodes), a = (y = i.props || c).dangerouslySetInnerHTML, h = d.dangerouslySetInnerHTML, !e) {
            if (null != r) for(y = {}, k = 0; k < l.attributes.length; k++)y[l.attributes[k].name] = l.attributes[k].value;
            (h || a) && (h && (a && h.__html == a.__html || h.__html === l.innerHTML) || (l.innerHTML = h && h.__html || ""));
        }
        if (H(l, d, y, o, e), h) u.__k = [];
        else if (P(l, v(k = u.props.children) ? k : [
            k
        ], u, i, t, o && "foreignObject" !== _, r, f, r ? r[0] : i.__k && g(i, 0), e), null != r) for(k = r.length; k--;)null != r[k] && p(r[k]);
        e || ("value" in d && void 0 !== (k = d.value) && (k !== l.value || "progress" === _ && !k || "option" === _ && k !== y.value) && T(l, "value", k, y.value, !1), "checked" in d && void 0 !== (k = d.checked) && k !== l.checked && T(l, "checked", k, y.checked, !1));
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
function q(n, u, i) {
    var t, o;
    if (l.unmount && l.unmount(n), (t = n.ref) && (t.current && t.current !== n.__e || O(t, null, u)), null != (t = n.__c)) {
        if (t.componentWillUnmount) try {
            t.componentWillUnmount();
        } catch (n) {
            l.__e(n, u);
        }
        t.base = t.__P = null, n.__c = void 0;
    }
    if (t = n.__k) for(o = 0; o < t.length; o++)t[o] && q(t[o], u, i || "function" != typeof n.type);
    i || null == n.__e || p(n.__e), n.__ = n.__e = n.__d = void 0;
}
function B(n, l, u) {
    return this.constructor(n, u);
}
function D(u, i, t) {
    var o, r, f;
    l.__ && l.__(u, i), r = (o = "function" == typeof t) ? null : t && t.__k || i.__k, f = [], L(i, u = (!o && t || i).__k = y(k, null, [
        u
    ]), r || c, c, void 0 !== i.ownerSVGElement, !o && t ? [
        t
    ] : r ? null : i.firstChild ? n.call(i.childNodes) : null, f, !o && t ? t : r ? r.__e : i.firstChild, o), M(f, u);
}
function E(n, l) {
    D(n, l, E);
}
function F(l, u, i) {
    var t, o, r, f, e = h({}, l.props);
    for(r in l.type && l.type.defaultProps && (f = l.type.defaultProps), u)"key" == r ? t = u[r] : "ref" == r ? o = u[r] : e[r] = void 0 === u[r] && void 0 !== f ? f[r] : u[r];
    return arguments.length > 2 && (e.children = arguments.length > 3 ? n.call(arguments, 2) : i), d(l.type, e, t || l.key, o || l.ref, null);
}
function G(n, l) {
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
                    n.__e = !0, w(n);
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
        for(var t, o, r; l = l.__;)if ((t = l.__c) && !t.__) try {
            if ((o = t.constructor) && null != o.getDerivedStateFromError && (t.setState(o.getDerivedStateFromError(n)), r = t.__d), null != t.componentDidCatch && (t.componentDidCatch(n, i || {}), r = t.__d), r) return t.__E = t;
        } catch (l) {
            n = l;
        }
        throw n;
    }
}, u = 0, i = function(n) {
    return null != n && void 0 === n.constructor;
}, b.prototype.setState = function(n, l) {
    var u;
    u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = h({}, this.state), "function" == typeof n && (n = n(h({}, u), this.props)), n && h(u, n), null != n && this.__v && (l && this._sb.push(l), w(this));
}, b.prototype.forceUpdate = function(n) {
    this.__v && (this.__e = !0, n && this.__h.push(n), w(this));
}, b.prototype.render = k, t = [], r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function(n, l) {
    return n.__v.__b - l.__v.__b;
}, x.__r = 0, e = 0;

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

},{}],"bCMOY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "resetPropWarnings", ()=>i);
var _preact = require("preact");
var _devtools = require("preact/devtools");
function o(n, e) {
    (null == e || e > n.length) && (e = n.length);
    for(var t = 0, o = new Array(e); t < e; t++)o[t] = n[t];
    return o;
}
function r(n, e) {
    var t = "undefined" != typeof Symbol && n[Symbol.iterator] || n["@@iterator"];
    if (t) return (t = t.call(n)).next.bind(t);
    if (Array.isArray(n) || (t = function(n, e) {
        if (n) {
            if ("string" == typeof n) return o(n, e);
            var t = Object.prototype.toString.call(n).slice(8, -1);
            return "Object" === t && n.constructor && (t = n.constructor.name), "Map" === t || "Set" === t ? Array.from(n) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? o(n, e) : void 0;
        }
    }(n)) || e && n && "number" == typeof n.length) {
        t && (n = t);
        var r = 0;
        return function() {
            return r >= n.length ? {
                done: !0
            } : {
                done: !1,
                value: n[r++]
            };
        };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var a = {};
function i() {
    a = {};
}
function c(e) {
    return e.type === (0, _preact.Fragment) ? "Fragment" : "function" == typeof e.type ? e.type.displayName || e.type.name : "string" == typeof e.type ? e.type : "#text";
}
var s = [], u = [];
function l() {
    return s.length > 0 ? s[s.length - 1] : null;
}
var f = !1;
function p(e) {
    return "function" == typeof e.type && e.type != (0, _preact.Fragment);
}
function d(n) {
    for(var e = [
        n
    ], t = n; null != t.__o;)e.push(t.__o), t = t.__o;
    return e.reduce(function(n, e) {
        n += "  in " + c(e);
        var t = e.__source;
        return t ? n += " (at " + t.fileName + ":" + t.lineNumber + ")" : f || (f = !0, console.warn("Add @babel/plugin-transform-react-jsx-source to get a more detailed component stack. Note that you should not add it to production builds of your App for bundle size reasons.")), n + "\n";
    }, "");
}
var h = "function" == typeof WeakMap;
function v(n) {
    return n ? "function" == typeof n.type ? v(n.__) : n : {};
}
var y = (0, _preact.Component).prototype.setState;
(0, _preact.Component).prototype.setState = function(n, e) {
    return null == this.__v && null == this.state && console.warn('Calling "this.setState" inside the constructor of a component is a no-op and might be a bug in your application. Instead, set "this.state = {}" directly.\n\n' + d(l())), y.call(this, n, e);
};
var m = (0, _preact.Component).prototype.forceUpdate;
function b(n) {
    var e = n.props, t = c(n), o = "";
    for(var r in e)if (e.hasOwnProperty(r) && "children" !== r) {
        var a = e[r];
        "function" == typeof a && (a = "function " + (a.displayName || a.name) + "() {}"), a = Object(a) !== a || a.toString ? a + "" : Object.prototype.toString.call(a), o += " " + r + "=" + JSON.stringify(a);
    }
    var i = e.children;
    return "<" + t + o + (i && i.length ? ">..</" + t + ">" : " />");
}
(0, _preact.Component).prototype.forceUpdate = function(n) {
    return null == this.__v ? console.warn('Calling "this.forceUpdate" inside the constructor of a component is a no-op and might be a bug in your application.\n\n' + d(l())) : null == this.__P && console.warn('Can\'t call "this.forceUpdate" on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.\n\n' + d(this.__v)), m.call(this, n);
}, function() {
    !function() {
        var n = (0, _preact.options).__b, t = (0, _preact.options).diffed, o = (0, _preact.options).__, r = (0, _preact.options).vnode, a = (0, _preact.options).__r;
        (0, _preact.options).diffed = function(n) {
            p(n) && u.pop(), s.pop(), t && t(n);
        }, (0, _preact.options).__b = function(e) {
            p(e) && s.push(e), n && n(e);
        }, (0, _preact.options).__ = function(n, e) {
            u = [], o && o(n, e);
        }, (0, _preact.options).vnode = function(n) {
            n.__o = u.length > 0 ? u[u.length - 1] : null, r && r(n);
        }, (0, _preact.options).__r = function(n) {
            p(n) && u.push(n), a && a(n);
        };
    }();
    var n = !1, t = (0, _preact.options).__b, o = (0, _preact.options).diffed, i = (0, _preact.options).vnode, l = (0, _preact.options).__r, f = (0, _preact.options).__e, y = (0, _preact.options).__, m = (0, _preact.options).__h, w = h ? {
        useEffect: new WeakMap,
        useLayoutEffect: new WeakMap,
        lazyPropTypes: new WeakMap
    } : null, g = [];
    (0, _preact.options).__e = function(n, e, t, o) {
        if (e && e.__c && "function" == typeof n.then) {
            var r = n;
            n = new Error("Missing Suspense. The throwing component was: " + c(e));
            for(var a = e; a; a = a.__)if (a.__c && a.__c.__c) {
                n = r;
                break;
            }
            if (n instanceof Error) throw n;
        }
        try {
            (o = o || {}).componentStack = d(e), f(n, e, t, o), "function" != typeof n.then && setTimeout(function() {
                throw n;
            });
        } catch (n) {
            throw n;
        }
    }, (0, _preact.options).__ = function(n, e) {
        if (!e) throw new Error("Undefined parent passed to render(), this is the second argument.\nCheck if the element is available in the DOM/has the correct id.");
        var t;
        switch(e.nodeType){
            case 1:
            case 11:
            case 9:
                t = !0;
                break;
            default:
                t = !1;
        }
        if (!t) {
            var o = c(n);
            throw new Error("Expected a valid HTML node as a second argument to render.	Received " + e + " instead: render(<" + o + " />, " + e + ");");
        }
        y && y(n, e);
    }, (0, _preact.options).__b = function(e) {
        var o = e.type, r = v(e.__);
        if (n = !0, void 0 === o) throw new Error("Undefined component passed to createElement()\n\nYou likely forgot to export your component or might have mixed up default and named imports" + b(e) + "\n\n" + d(e));
        if (null != o && "object" == typeof o) {
            if (void 0 !== o.__k && void 0 !== o.__e) throw new Error("Invalid type passed to createElement(): " + o + "\n\nDid you accidentally pass a JSX literal as JSX twice?\n\n  let My" + c(e) + " = " + b(o) + ";\n  let vnode = <My" + c(e) + " />;\n\nThis usually happens when you export a JSX literal and not the component.\n\n" + d(e));
            throw new Error("Invalid type passed to createElement(): " + (Array.isArray(o) ? "array" : o));
        }
        if ("thead" !== o && "tfoot" !== o && "tbody" !== o || "table" === r.type ? "tr" === o && "thead" !== r.type && "tfoot" !== r.type && "tbody" !== r.type && "table" !== r.type ? console.error("Improper nesting of table. Your <tr> should have a <thead/tbody/tfoot/table> parent." + b(e) + "\n\n" + d(e)) : "td" === o && "tr" !== r.type ? console.error("Improper nesting of table. Your <td> should have a <tr> parent." + b(e) + "\n\n" + d(e)) : "th" === o && "tr" !== r.type && console.error("Improper nesting of table. Your <th> should have a <tr>." + b(e) + "\n\n" + d(e)) : console.error("Improper nesting of table. Your <thead/tbody/tfoot> should have a <table> parent." + b(e) + "\n\n" + d(e)), void 0 !== e.ref && "function" != typeof e.ref && "object" != typeof e.ref && !("$$typeof" in e)) throw new Error('Component\'s "ref" property should be a function, or an object created by createRef(), but got [' + typeof e.ref + "] instead\n" + b(e) + "\n\n" + d(e));
        if ("string" == typeof e.type) {
            for(var i in e.props)if ("o" === i[0] && "n" === i[1] && "function" != typeof e.props[i] && null != e.props[i]) throw new Error("Component's \"" + i + '" property should be a function, but got [' + typeof e.props[i] + "] instead\n" + b(e) + "\n\n" + d(e));
        }
        if ("function" == typeof e.type && e.type.propTypes) {
            if ("Lazy" === e.type.displayName && w && !w.lazyPropTypes.has(e.type)) {
                var s = "PropTypes are not supported on lazy(). Use propTypes on the wrapped component itself. ";
                try {
                    var u = e.type();
                    w.lazyPropTypes.set(e.type, !0), console.warn(s + "Component wrapped in lazy() is " + c(u));
                } catch (n) {
                    console.warn(s + "We will log the wrapped component's name once it is loaded.");
                }
            }
            var l = e.props;
            e.type.__f && delete (l = function(n, e) {
                for(var t in e)n[t] = e[t];
                return n;
            }({}, l)).ref, function(n, e, t, o, r) {
                Object.keys(n).forEach(function(t) {
                    var i;
                    try {
                        i = n[t](e, t, o, "prop", null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                    } catch (n) {
                        i = n;
                    }
                    i && !(i.message in a) && (a[i.message] = !0, console.error("Failed prop type: " + i.message + (r && "\n" + r() || "")));
                });
            }(e.type.propTypes, l, 0, c(e), function() {
                return d(e);
            });
        }
        t && t(e);
    }, (0, _preact.options).__r = function(e) {
        l && l(e), n = !0;
    }, (0, _preact.options).__h = function(e, t, o) {
        if (!e || !n) throw new Error("Hook can only be invoked from render methods.");
        m && m(e, t, o);
    };
    var E = function(n, e) {
        return {
            get: function() {
                var t = "get" + n + e;
                g && g.indexOf(t) < 0 && (g.push(t), console.warn("getting vnode." + n + " is deprecated, " + e));
            },
            set: function() {
                var t = "set" + n + e;
                g && g.indexOf(t) < 0 && (g.push(t), console.warn("setting vnode." + n + " is not allowed, " + e));
            }
        };
    }, k = {
        nodeName: E("nodeName", "use vnode.type"),
        attributes: E("attributes", "use vnode.props"),
        children: E("children", "use vnode.props.children")
    }, _ = Object.create({}, k);
    (0, _preact.options).vnode = function(n) {
        var e = n.props;
        if (null !== n.type && null != e && ("__source" in e || "__self" in e)) {
            var t = n.props = {};
            for(var o in e){
                var r = e[o];
                "__source" === o ? n.__source = r : "__self" === o ? n.__self = r : t[o] = r;
            }
        }
        n.__proto__ = _, i && i(n);
    }, (0, _preact.options).diffed = function(e) {
        if (e.__k && e.__k.forEach(function(n) {
            if ("object" == typeof n && n && void 0 === n.type) {
                var t = Object.keys(n).join(",");
                throw new Error("Objects are not valid as a child. Encountered an object with the keys {" + t + "}.\n\n" + d(e));
            }
        }), n = !1, o && o(e), null != e.__k) for(var t = [], a = 0; a < e.__k.length; a++){
            var i = e.__k[a];
            if (i && null != i.key) {
                var s = i.key;
                if (-1 !== t.indexOf(s)) {
                    console.error('Following component has two or more children with the same key attribute: "' + s + '". This may cause glitches and misbehavior in rendering process. Component: \n\n' + b(e) + "\n\n" + d(e));
                    break;
                }
                t.push(s);
            }
        }
        if (null != e.__c && null != e.__c.__H) {
            var u = e.__c.__H.__;
            if (u) for(var l = 0; l < u.length; l += 1){
                var f = u[l];
                if (f.__H) {
                    for(var p, h = r(f.__H); !(p = h()).done;)if ((y = p.value) != y) {
                        var v = c(e);
                        throw new Error("Invalid argument passed to hook. Hooks should not be called with NaN in the dependency array. Hook index " + l + " in component " + v + " was called with NaN.");
                    }
                }
            }
        }
        var y;
    };
}();

},{"preact":"26zcy","preact/devtools":"filjq","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"filjq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addHookName", ()=>t);
var _preact = require("preact");
function t(o, e) {
    return (0, _preact.options).__a && (0, _preact.options).__a(e), o;
}
"undefined" != typeof window && window.__PREACT_DEVTOOLS__ && window.__PREACT_DEVTOOLS__.attachPreact("10.15.1", (0, _preact.options), {
    Fragment: (0, _preact.Fragment),
    Component: (0, _preact.Component)
});

},{"preact":"26zcy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dG2TM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _jsxDevRuntime = require("preact/jsx-dev-runtime");
const Test = ()=>{
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h1", {
        children: "TEST"
    }, void 0, false, {
        fileName: "src/preact/gift-with-purchase/components/Test.jsx",
        lineNumber: 2,
        columnNumber: 10
    }, undefined);
};
exports.default = Test;

},{"preact/jsx-dev-runtime":"3mFUL","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["9PVCP","fmKzW"], "fmKzW", "parcelRequire6d00")

//# sourceMappingURL=gift-with-purchase.js.map
