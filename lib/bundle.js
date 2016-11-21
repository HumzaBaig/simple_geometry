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

	"use strict";
	
	var BridsonsAlgorithm = __webpack_require__(1);
	var ImageStuff = __webpack_require__(3);
	
	var resetButton = document.getElementById('reset');
	var nextButton = document.getElementById('next-pic');
	var previousButton = document.getElementById('previous-pic');
	var aboutButton = document.getElementById('about');
	var playButton = document.getElementById('playMusic');
	var pauseButton = document.getElementById('pauseMusic');
	
	var aboutModal = document.getElementById('myModal');
	var xOut = document.getElementsByClassName('close')[0];
	
	var music = document.getElementById('music');
	
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	var idx = 0;
	var img = new ImageStuff(idx);
	var radius = 50;
	
	function getRandomPoint() {
	  var x = Math.random() * (canvas.width + 1);
	  var y = Math.random() * (canvas.height + 1);
	  return [x, y];
	}
	
	function handleClick() {
	  var circles = new BridsonsAlgorithm(getRandomPoint(), radius);
	  var interval = setInterval(function () {
	    draw(circles.pop());
	    if (circles.length === 0) {
	      clearInterval(interval);
	      if (radius > 10) radius -= 2;
	      handleClick();
	    }
	  }, 1);
	}
	
	function playMusic() {
	  music.play();
	}
	
	function pauseMusic() {
	  music.pause();
	}
	
	function nextPicClick() {
	  radius = 40;
	  idx++;
	  img = new ImageStuff(idx);
	  handleClick();
	}
	
	function previousPicClick() {
	  radius = 40;
	  if (idx === 0) {
	    idx = 6;
	  } else {
	    idx--;
	  }
	  img = new ImageStuff(idx);
	  handleClick();
	}
	
	function resetClick() {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	
	function draw(circle) {
	  var rgba = img.getData(circle[0], circle[1]);
	  ctx.beginPath();
	  ctx.arc(circle[0], circle[1], circle[2], 0, 2 * Math.PI, false);
	  ctx.fillStyle = "rgba(" + rgba.data[0] + ", " + rgba.data[1] + ", " + rgba.data[2] + ", 0.7)";
	  ctx.fill();
	}
	
	function openAboutModal() {
	  aboutModal.style.display = "block";
	}
	
	function closeAboutModal() {
	  aboutModal.style.display = "none";
	}
	
	window.onclick = function (e) {
	  if (e.target == modal) {
	    aboutModal.style.display = "none";
	  }
	};
	
	canvas.addEventListener('click', handleClick);
	resetButton.addEventListener('click', resetClick);
	nextButton.addEventListener('click', nextPicClick);
	previousButton.addEventListener('click', previousPicClick);
	aboutButton.addEventListener('click', openAboutModal);
	xOut.addEventListener('click', closeAboutModal);
	playButton.addEventListener('click', playMusic);
	pauseButton.addEventListener('click', pauseMusic);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Circle = __webpack_require__(2);
	
	var BridsonsAlgorithm = function () {
	  function BridsonsAlgorithm(firstSample, radius) {
	    _classCallCheck(this, BridsonsAlgorithm);
	
	    this.activeSamplesHash = { firstSample: 0 };
	    this.activeSamplesArr = [firstSample];
	    this.allSamples = [firstSample.concat([radius])];
	    this.radius = radius;
	    this.innerRadius = this.radius;
	    this.outerRadius = this.radius * 2;
	    this.run = this.run.bind(this);
	    this.insert = this.insert.bind(this);
	    this.remove = this.remove.bind(this);
	    this.createNewSample = this.createNewSample.bind(this);
	    this.checkSampleAcceptability = this.checkSampleAcceptability.bind(this);
	    this.calculateDistance = this.calculateDistance.bind(this);
	    this.chooseCenterSample = this.chooseCenterSample.bind(this);
	    this.getRandomInteger = this.getRandomInteger.bind(this);
	    while (this.activeSamplesArr.length !== 0 && this.allSamples.length < 750) {
	      this.run();
	    }
	    this.setRadii();
	    return this.allSamples;
	  }
	
	  _createClass(BridsonsAlgorithm, [{
	    key: "run",
	    value: function run() {
	      var currentSample = this.chooseCenterSample();
	      for (var i = 0; i < 30; i++) {
	        var tempSample = this.createNewSample(currentSample);
	        if (this.checkSampleAcceptability(tempSample)) {
	          this.insert(tempSample);
	          this.allSamples.push(tempSample);
	          break;
	        } else if (i === 29) {
	          this.remove(currentSample);
	        }
	      }
	    }
	  }, {
	    key: "setRadii",
	    value: function setRadii() {
	      for (var i = 0; i < this.allSamples.length; i++) {
	        if (i >= 0 && i < 100) {
	          this.allSamples[i] = this.allSamples[i].concat([this.radius - 8]);
	        } else if (i >= 100 && i < 200) {
	          this.allSamples[i] = this.allSamples[i].concat([this.radius - 7]);
	        } else if (i >= 200 && i < 300) {
	          this.allSamples[i] = this.allSamples[i].concat([this.radius - 6]);
	        } else if (i >= 300 && i < 400) {
	          this.allSamples[i] = this.allSamples[i].concat([this.radius - 5]);
	        } else if (i >= 400 && i < 475) {
	          this.allSamples[i] = this.allSamples[i].concat([this.radius - 4]);
	        } else if (i >= 475 && i < 525) {
	          this.allSamples[i] = this.allSamples[i].concat([this.radius - 3]);
	        } else if (i >= 525 && i < 600) {
	          this.allSamples[i] = this.allSamples[i].concat([this.radius - 2]);
	        } else if (i >= 600 && i < 700) {
	          this.allSamples[i] = this.allSamples[i].concat([this.radius - 1]);
	        } else if (i >= 700 && i <= 750) {
	          this.allSamples[i] = this.allSamples[i].concat([this.radius]);
	        }
	      }
	    }
	  }, {
	    key: "insert",
	    value: function insert(data) {
	      this.activeSamplesArr.push(data);
	      this.activeSamplesHash[data] = this.activeSamplesArr.indexOf(data);
	    }
	  }, {
	    key: "remove",
	    value: function remove(data) {
	      var hash = this.activeSamplesHash;
	      var arr = this.activeSamplesArr;
	      hash[arr[arr.length - 1]] = hash[data];
	      arr[arr.indexOf(data)] = arr[arr.length - 1];
	      arr.pop();
	      delete hash[data];
	      this.activeSamplesHash = hash;
	      this.activeSamplesArr = arr;
	    }
	  }, {
	    key: "createNewSample",
	    value: function createNewSample(centerSample) {
	      var completionSignal = false;
	      var possibleSample = void 0;
	      var leftMostX = Math.abs(centerSample[0] - this.outerRadius);
	      var rightMostX = Math.abs(centerSample[0] + this.outerRadius);
	      var leftMostY = Math.abs(centerSample[1] - this.outerRadius);
	      var rightMostY = Math.abs(centerSample[1] + this.outerRadius);
	      do {
	        var xVal = this.getRandomInteger(leftMostX, rightMostX);
	        var yVal = this.getRandomInteger(leftMostY, rightMostY);
	        possibleSample = [xVal, yVal];
	        if (this.calculateDistance(possibleSample, centerSample) > this.innerRadius) {
	          completionSignal = true;
	        }
	      } while (!completionSignal);
	
	      return possibleSample;
	    }
	  }, {
	    key: "checkSampleAcceptability",
	    value: function checkSampleAcceptability(sample) {
	      for (var i = 0; i < this.allSamples.length; i++) {
	        if (this.calculateDistance(sample, this.allSamples[i]) < this.innerRadius) {
	          return false;
	        }
	      }
	      return true;
	    }
	  }, {
	    key: "calculateDistance",
	    value: function calculateDistance(firstPoint, secondPoint) {
	      var diffOfX = Math.abs(firstPoint[0] - secondPoint[0]);
	      var diffOfY = Math.abs(firstPoint[1] - secondPoint[1]);
	      return Math.sqrt(Math.pow(diffOfX, 2) + Math.pow(diffOfY, 2));
	    }
	  }, {
	    key: "chooseCenterSample",
	    value: function chooseCenterSample() {
	      var randomIndex = this.getRandomInteger(0, this.activeSamplesArr.length);
	      return this.activeSamplesArr[randomIndex];
	    }
	  }, {
	    key: "getRandomInteger",
	    value: function getRandomInteger(min, max) {
	      min = Math.ceil(min);
	      max = Math.floor(max);
	      return Math.floor(Math.random() * (max - min)) + min;
	    }
	  }]);
	
	  return BridsonsAlgorithm;
	}();
	
	module.exports = BridsonsAlgorithm;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Circle = function Circle(context, color, x, y, radius) {
	  _classCallCheck(this, Circle);
	
	  context.beginPath();
	  context.arc(x, y, radius, 0, 2 * Math.PI, false);
	  context.fillStyle = color;
	  context.fill();
	};
	
	module.exports = Circle;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ImageStuff = function () {
	  function ImageStuff(picIndex) {
	    var _this = this;
	
	    _classCallCheck(this, ImageStuff);
	
	    this.imgCanvas = document.getElementById("painting");
	    this.imgCanvas.width = window.innerWidth;
	    this.imgCanvas.height = window.innerHeight;
	    this.context = this.imgCanvas.getContext('2d');
	    this.images = ["http://res.cloudinary.com/dzixj0ktk/image/upload/v1479496760/starry-night_zhsyre.jpg", "http://res.cloudinary.com/dzixj0ktk/image/upload/v1479533005/cherry-blossom_oylyfw.jpg", "http://res.cloudinary.com/dzixj0ktk/image/upload/v1479533009/girl-with-sun_fgdqge.jpg", "http://res.cloudinary.com/dzixj0ktk/image/upload/v1479533009/lion_gxzji3.jpg", "http://res.cloudinary.com/dzixj0ktk/image/upload/v1479533035/peacock_iciygt.jpg", "http://res.cloudinary.com/dzixj0ktk/image/upload/v1479533020/random-famous-painting_iwmqeq.jpg", "http://res.cloudinary.com/dzixj0ktk/image/upload/v1479533051/Les-cypres-a-Cagnes_rglsrl.jpg"];
	    this.img = new Image();
	    this.img.src = this.images[picIndex];
	    this.img.crossOrigin = "Anonymous";
	    this.img.onload = function () {
	      _this.context.drawImage(_this.img, 0, 0, _this.imgCanvas.width, _this.imgCanvas.height);
	    };
	  }
	
	  _createClass(ImageStuff, [{
	    key: "getData",
	    value: function getData(x, y) {
	      return this.context.getImageData(x, y, 1, 1);
	    }
	  }]);
	
	  return ImageStuff;
	}();
	
	module.exports = ImageStuff;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map