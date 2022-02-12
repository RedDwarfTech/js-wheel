/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _net_rest_ResponseHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @net/rest/ResponseHandler */ \"./src/net/rest/ResponseHandler.ts\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n    ResponseHandler: _net_rest_ResponseHandler__WEBPACK_IMPORTED_MODULE_0__.ResponseHandler\n});\n\n\n//# sourceURL=webpack://js-wheel/./index.ts?");

/***/ }),

/***/ "./src/auth/extension/AuthHandler.ts":
/*!*******************************************!*\
  !*** ./src/auth/extension/AuthHandler.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AuthHandler\": () => (/* binding */ AuthHandler),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar AuthHandler = {\n    handleAccessTokenExpire: function (retryTimes, params) {\n        chrome.storage.local.get('refreshToken', function (result) {\n            var refreshToken = result.refreshToken;\n            var urlParams = {\n                deviceId: params.deviceId,\n                app: params.appId,\n                refreshToken: refreshToken,\n            };\n            //refreshAccessToken(urlParams, e, retryTimes, params, callback);\n        });\n    },\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthHandler);\n\n\n//# sourceURL=webpack://js-wheel/./src/auth/extension/AuthHandler.ts?");

/***/ }),

/***/ "./src/net/rest/ResponseCode.ts":
/*!**************************************!*\
  !*** ./src/net/rest/ResponseCode.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ResponseCode\": () => (/* binding */ ResponseCode)\n/* harmony export */ });\nvar ResponseCode = /** @class */ (function () {\n    function ResponseCode() {\n    }\n    ResponseCode.ACCESS_TOKEN_EXPIRED = \"00100100004016\";\n    ResponseCode.REFRESH_TOKEN_EXPIRED = \"00100100004017\";\n    return ResponseCode;\n}());\n\n\n\n//# sourceURL=webpack://js-wheel/./src/net/rest/ResponseCode.ts?");

/***/ }),

/***/ "./src/net/rest/ResponseHandler.ts":
/*!*****************************************!*\
  !*** ./src/net/rest/ResponseHandler.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ResponseHandler\": () => (/* binding */ ResponseHandler),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _net_rest_ResponseCode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @net/rest/ResponseCode */ \"./src/net/rest/ResponseCode.ts\");\n/* harmony import */ var _auth_extension_AuthHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @auth/extension/AuthHandler */ \"./src/auth/extension/AuthHandler.ts\");\n\n\nvar ResponseHandler = {\n    responseSuccess: function (response) {\n        if (response.statusCode === \"200\" && response.resultCode === \"200\") {\n            return true;\n        }\n        return false;\n    },\n    handleCommonFailure: function (response) {\n        if (response.statusCode === _net_rest_ResponseCode__WEBPACK_IMPORTED_MODULE_0__.ResponseCode.ACCESS_TOKEN_EXPIRED) {\n            var params = {};\n            _auth_extension_AuthHandler__WEBPACK_IMPORTED_MODULE_1__.AuthHandler.handleAccessTokenExpire(0, params);\n        }\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ResponseHandler);\n\n\n//# sourceURL=webpack://js-wheel/./src/net/rest/ResponseHandler.ts?");

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
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;