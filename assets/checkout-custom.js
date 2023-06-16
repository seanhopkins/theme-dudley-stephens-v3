/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@discolabs/custard-js/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@discolabs/custard-js/index.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Custard: function() { return /* reexport safe */ _src_custard__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; },\n/* harmony export */   CustardModule: function() { return /* reexport safe */ _src_custard_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; },\n/* harmony export */   STEPS_ALL: function() { return /* reexport safe */ _src_constants__WEBPACK_IMPORTED_MODULE_2__.STEPS_ALL; },\n/* harmony export */   STEP_CONTACT_INFORMATION: function() { return /* reexport safe */ _src_constants__WEBPACK_IMPORTED_MODULE_2__.STEP_CONTACT_INFORMATION; },\n/* harmony export */   STEP_ORDER_STATUS: function() { return /* reexport safe */ _src_constants__WEBPACK_IMPORTED_MODULE_2__.STEP_ORDER_STATUS; },\n/* harmony export */   STEP_PAYMENT_METHOD: function() { return /* reexport safe */ _src_constants__WEBPACK_IMPORTED_MODULE_2__.STEP_PAYMENT_METHOD; },\n/* harmony export */   STEP_REVIEW: function() { return /* reexport safe */ _src_constants__WEBPACK_IMPORTED_MODULE_2__.STEP_REVIEW; },\n/* harmony export */   STEP_SHIPPING_METHOD: function() { return /* reexport safe */ _src_constants__WEBPACK_IMPORTED_MODULE_2__.STEP_SHIPPING_METHOD; },\n/* harmony export */   STEP_THANK_YOU: function() { return /* reexport safe */ _src_constants__WEBPACK_IMPORTED_MODULE_2__.STEP_THANK_YOU; }\n/* harmony export */ });\n/* harmony import */ var _src_custard_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/custard_module */ \"./node_modules/@discolabs/custard-js/src/custard_module.js\");\n/* harmony import */ var _src_custard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/custard */ \"./node_modules/@discolabs/custard-js/src/custard.js\");\n/* harmony import */ var _src_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/constants */ \"./node_modules/@discolabs/custard-js/src/constants.js\");\n\n\n\n\n\n\n\n//# sourceURL=webpack://my-library/./node_modules/@discolabs/custard-js/index.js?");

/***/ }),

/***/ "./node_modules/@discolabs/custard-js/src/constants.js":
/*!*************************************************************!*\
  !*** ./node_modules/@discolabs/custard-js/src/constants.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   STEPS_ALL: function() { return /* binding */ STEPS_ALL; },\n/* harmony export */   STEP_CONTACT_INFORMATION: function() { return /* binding */ STEP_CONTACT_INFORMATION; },\n/* harmony export */   STEP_ORDER_STATUS: function() { return /* binding */ STEP_ORDER_STATUS; },\n/* harmony export */   STEP_PAYMENT_METHOD: function() { return /* binding */ STEP_PAYMENT_METHOD; },\n/* harmony export */   STEP_REVIEW: function() { return /* binding */ STEP_REVIEW; },\n/* harmony export */   STEP_SHIPPING_METHOD: function() { return /* binding */ STEP_SHIPPING_METHOD; },\n/* harmony export */   STEP_THANK_YOU: function() { return /* binding */ STEP_THANK_YOU; }\n/* harmony export */ });\nconst STEP_CONTACT_INFORMATION = 'contact_information';\nconst STEP_SHIPPING_METHOD = 'shipping_method';\nconst STEP_PAYMENT_METHOD = 'payment_method';\nconst STEP_REVIEW = 'review';\nconst STEP_THANK_YOU = 'thank_you';\nconst STEP_ORDER_STATUS = 'order_status';\nconst STEPS_ALL = [\n  STEP_CONTACT_INFORMATION,\n  STEP_SHIPPING_METHOD,\n  STEP_PAYMENT_METHOD,\n  STEP_REVIEW,\n  STEP_THANK_YOU,\n  STEP_ORDER_STATUS\n];\n\n\n//# sourceURL=webpack://my-library/./node_modules/@discolabs/custard-js/src/constants.js?");

/***/ }),

/***/ "./node_modules/@discolabs/custard-js/src/custard.js":
/*!***********************************************************!*\
  !*** ./node_modules/@discolabs/custard-js/src/custard.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Custard; }\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./node_modules/@discolabs/custard-js/src/constants.js\");\n\n\nclass Custard {\n  constructor(modules) {\n    this.modules = modules;\n  }\n\n  init($, step, options = {}) {\n    this.$ = $;\n    this.step = step;\n    this.options = options;\n\n    this.initializeModules();\n    this.callBeforeInit();\n    this.registerEventListeners();\n  }\n\n  initializeModules() {\n    this.modules = this.modules\n      .map(module => {\n        if (typeof module.id === 'undefined') {\n          const Module = module;\n          module = new Module(this.options);\n        }\n\n        module.$ = this.$;\n        module.step = this.step;\n        module.options = Object.assign(this.options, module.options);\n        return module;\n      })\n      .filter(module => module !== null);\n  }\n\n  callBeforeInit() {\n    this.modules.forEach(module => {\n      if (module.steps().includes(this.step)) {\n        if (typeof module.beforeInit === 'function') {\n          module.beforeInit();\n        }\n      }\n    });\n  }\n\n  registerEventListeners() {\n    this.$(document).on(\n      'page:load page:change',\n      this.pageChangeHandler.bind(this)\n    );\n  }\n\n  pageChangeHandler() {\n    this.modules.forEach(module => {\n      if (module.steps().includes(this.step)) {\n        if (\n          this.step === _constants__WEBPACK_IMPORTED_MODULE_0__.STEP_SHIPPING_METHOD &&\n          this.isPollRefreshElementPresent()\n        ) {\n          return;\n        }\n\n        module.init();\n      }\n    });\n  }\n\n  isPollRefreshElementPresent() {\n    return this.$('[data-poll-refresh]').length;\n  }\n}\n\n\n//# sourceURL=webpack://my-library/./node_modules/@discolabs/custard-js/src/custard.js?");

/***/ }),

/***/ "./node_modules/@discolabs/custard-js/src/custard_module.js":
/*!******************************************************************!*\
  !*** ./node_modules/@discolabs/custard-js/src/custard_module.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ CustardModule; }\n/* harmony export */ });\nclass CustardModule {\n  constructor(options) {\n    this.options = options;\n\n    this.$element = null;\n  }\n\n  id() {\n    throw new Error('Not implemented');\n  }\n\n  steps() {\n    return [];\n  }\n\n  selector() {\n    return 'document';\n  }\n\n  beforeInit() {}\n\n  init() {\n    this.$element = this.$(this.selector());\n\n    // Bail if already initialised.\n    if (this.$element.hasClass(this.id())) {\n      return;\n    }\n\n    // Setup\n    this.$element.addClass(this.id());\n    this.setup();\n  }\n\n  setup() {}\n}\n\n\n//# sourceURL=webpack://my-library/./node_modules/@discolabs/custard-js/src/custard_module.js?");

/***/ }),

/***/ "./src/checkout-custom/final-sale/index.js":
/*!*************************************************!*\
  !*** ./src/checkout-custom/final-sale/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FinalSale: function() { return /* binding */ FinalSale; }\n/* harmony export */ });\n/* harmony import */ var _discolabs_custard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @discolabs/custard-js */ \"./node_modules/@discolabs/custard-js/index.js\");\n\n\nclass FinalSale extends _discolabs_custard_js__WEBPACK_IMPORTED_MODULE_0__.CustardModule {\n  constructor() {\n    super();\n\n    this.disclaimer = document.createElement('span');\n  }\n\n  id() {\n    return 'final-sale';\n  }\n\n  steps() {\n    return _discolabs_custard_js__WEBPACK_IMPORTED_MODULE_0__.STEPS_ALL;\n  }\n\n  selector() {\n    return '.order-summary__section--product-list [data-order-summary-section]';\n  }\n\n  buildDisclaimer() {\n    this.disclaimer.classList.add(\n      'product__description__final-sale',\n      'order-summary__small-text'\n    );\n\n    this.disclaimer.innerText = 'FINAL SALE';\n  }\n\n  addDisclaimers() {\n    const productRows = this.$element[0].rows;\n    const cartItems = this.options.cartItems;\n\n    cartItems.forEach((item, i) => {\n      const lowercaseTags = item.tags.map((tag) => tag.toLowerCase());\n      if (lowercaseTags.includes('final-sale')) {\n        const productRow = productRows.item(i);\n        const productDescription = productRow.querySelector(\n          '.product__description'\n        );\n\n        productDescription.prepend(this.disclaimer.cloneNode(true));\n      }\n    });\n  }\n\n  setup() {\n    this.buildDisclaimer();\n    this.addDisclaimers();\n  }\n}\n\n\n//# sourceURL=webpack://my-library/./src/checkout-custom/final-sale/index.js?");

/***/ }),

/***/ "./src/checkout-custom/index.js":
/*!**************************************!*\
  !*** ./src/checkout-custom/index.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _discolabs_custard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @discolabs/custard-js */ \"./node_modules/@discolabs/custard-js/index.js\");\n/* harmony import */ var _final_sale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./final-sale */ \"./src/checkout-custom/final-sale/index.js\");\n\n\n\nwindow.custard = new _discolabs_custard_js__WEBPACK_IMPORTED_MODULE_0__.Custard([_final_sale__WEBPACK_IMPORTED_MODULE_1__.FinalSale]);\n\n\n//# sourceURL=webpack://my-library/./src/checkout-custom/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/checkout-custom/index.js");
/******/ 	
/******/ })()
;