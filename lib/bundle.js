/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Circle = __webpack_require__(1);
	
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	let radius = 10;
	
	for (let i = 0; i < 100; i++) {
	  let centerX = canvas.width * Math.random();
	  let centerY = canvas.height * Math.random();
	  let c = new Circle(ctx, 'red', centerX, centerY, radius);
	}
	
	// console.log(centerX);
	// console.log(centerY);
	//
	// ctx.beginPath();
	// ctx.arc(centerX, centerY, radius, 0, 2*Math.PI, false);
	// ctx.fillStyle = 'red';
	// ctx.fill();
	// ctx.lineWidth = 5;
	// ctx.stroke();


/***/ },
/* 1 */
/***/ function(module, exports) {

	
	class Circle {
	  constructor(context, color, x, y, radius) {
	    context.beginPath();
	    context.arc(x, y, radius, 0, 2*Math.PI, false);
	    context.fillStyle = color;
	    context.fill();
	  }
	}
	
	module.exports = Circle;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map