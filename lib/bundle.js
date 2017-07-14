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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const BridsonsAlgorithm = __webpack_require__(1);
const ImageStuff = __webpack_require__(3);

const resetButton = document.getElementById('reset');
const nextButton = document.getElementById('next-pic');
const previousButton = document.getElementById('previous-pic');
const aboutButton = document.getElementById('about');
const muteButton = document.getElementById('muteMusic');
const fastestButton = document.getElementById('fastest');
const fasterButton = document.getElementById('faster');

const aboutModal = document.getElementById('myModal');
const xOut = document.getElementsByClassName('close')[0];

const music = document.getElementById('music');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let idx = 0;
let img = new ImageStuff(idx);
let radius = 50;
let initialClick = true;

function getRandomPoint() {
  let x = (Math.random() * (canvas.width + 1));
  let y = (Math.random() * (canvas.height + 1));
  return [x, y];
}

function fastest() {
  handleClick();
  setTimeout(handleClick, 100);
  setTimeout(handleClick, 200);
  setTimeout(handleClick, 300);
  setTimeout(handleClick, 400);
}

function faster() {
  setTimeout(handleClick, 10);
  setTimeout(handleClick, 30);
}

function handleClick() {
  let circles = new BridsonsAlgorithm(getRandomPoint(), radius);
    let interval = setInterval(() => {
      draw(circles.shift());
      if(circles.length === 0) {
        clearInterval(interval);
        if (radius > 10)
          radius -= 2;
        handleClick();
      }
    }, 1);

    if(initialClick) {
      music.play();
      initialClick = true;
    }
}

function muteMusic() {
  if (music.muted) {
    music.muted = false;
    music.innerHtml = "Unmute"
  } else {
    music.muted = true;
    music.innerHtml = "Mute"
  }
}

function nextPicClick() {
  radius = 40;

  if (idx === 6) {
    idx = 0;
  } else {
    idx++;
  }
  img = new ImageStuff(idx);
}

function previousPicClick() {
  radius = 40;
  if (idx === 0) {
    idx = 6;
  } else {
    idx--;
  }
  img = new ImageStuff(idx);
}

function resetClick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw(circle) {
  let rgba = img.getData(circle[0], circle[1]);
  ctx.beginPath();
  ctx.arc(circle[0], circle[1], circle[2], 0, 2*Math.PI, false);
  ctx.fillStyle = `rgba(${rgba.data[0]}, ${rgba.data[1]}, ${rgba.data[2]}, 0.7)`;
  ctx.fill();
}

function openAboutModal() {
  aboutModal.style.display = "block";
}

function closeAboutModal() {
  aboutModal.style.display = "none";
}

window.onclick = function(e) {
  if (e.target == aboutModal) {
    aboutModal.style.display = "none";
  } else if (e.target == canvas) {
    handleClick();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  resetButton.addEventListener('click', resetClick);
  nextButton.addEventListener('click', nextPicClick);
  previousButton.addEventListener('click', previousPicClick);
  aboutButton.addEventListener('click', openAboutModal);
  xOut.addEventListener('click', closeAboutModal);
  muteButton.addEventListener('click', muteMusic);
  fastestButton.addEventListener('click', fastest);
  fasterButton.addEventListener('click', faster);
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Circle = __webpack_require__(2);

class BridsonsAlgorithm {
  constructor(firstSample, radius) {
    this.activeSamplesHash = {firstSample: 0};
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

    while (this.activeSamplesArr.length !== 0 && this.allSamples.length < 950) {
      this.run();
    }
    this.setRadii();
    return this.allSamples;
  }

  run() {
    let currentSample = this.chooseCenterSample();
    for (var i = 0; i < 30; i++) {
      let tempSample = this.createNewSample(currentSample);
      if (this.checkSampleAcceptability(tempSample)) {
        this.insert(tempSample);
        this.allSamples.push(tempSample);
        break;
      } else if (i === 29) {
        this.remove(currentSample);
      }
    }
  }

  setRadii() {
    for (let i = 0; i < this.allSamples.length; i++) {
      if (i >= 0 && i < 250) {
        this.allSamples[i] = this.allSamples[i].concat([this.radius]);
      } else if (i >= 250 && i < 500) {
        this.allSamples[i] = this.allSamples[i].concat([this.radius - 3]);
      } else if (i >= 500 && i < 750) {
        this.allSamples[i] = this.allSamples[i].concat([this.radius - 6]);
      } else {
        this.allSamples[i] = this.allSamples[i].concat([this.radius - 9])
      }
    }
  }

  insert(data) {
    this.activeSamplesArr.push(data);
    this.activeSamplesHash[data] = this.activeSamplesArr.indexOf(data);
  }

  remove(data) {
    let hash = this.activeSamplesHash;
    let arr = this.activeSamplesArr;
    hash[arr[arr.length - 1]] = hash[data];
    arr[arr.indexOf(data)] = arr[arr.length - 1];
    arr.pop();
    delete hash[data];
    this.activeSamplesHash = hash;
    this.activeSamplesArr = arr;
  }

  createNewSample(centerSample) {
    let completionSignal = false;
    let possibleSample;
    let leftMostX = Math.abs(centerSample[0] - this.outerRadius);
    let rightMostX = Math.abs(centerSample[0] + this.outerRadius);
    let leftMostY = Math.abs(centerSample[1] - this.outerRadius);
    let rightMostY = Math.abs(centerSample[1] + this.outerRadius);
    do {
      let xVal = this.getRandomInteger(leftMostX, rightMostX);
      let yVal = this.getRandomInteger(leftMostY, rightMostY);
      possibleSample = [xVal, yVal];
      if (this.calculateDistance(possibleSample, centerSample) > this.innerRadius) {
        completionSignal = true;
      }
    } while (!completionSignal)

    return possibleSample;
  }

  checkSampleAcceptability(sample) {
    for (let i = 0; i < this.allSamples.length; i++) {
      if (this.calculateDistance(sample, this.allSamples[i]) < this.innerRadius) {
        return false;
      }
    }
    return true;
  }

  calculateDistance(firstPoint, secondPoint) {
    let diffOfX = Math.abs(firstPoint[0] - secondPoint[0]);
    let diffOfY = Math.abs(firstPoint[1] - secondPoint[1]);
    return Math.sqrt(Math.pow(diffOfX, 2) + Math.pow(diffOfY, 2));
  }

  chooseCenterSample() {
    let randomIndex = this.getRandomInteger(0, this.activeSamplesArr.length);
    return this.activeSamplesArr[randomIndex];
  }

  getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

module.exports = BridsonsAlgorithm;


/***/ }),
/* 2 */
/***/ (function(module, exports) {


class Circle {
  constructor(context, color, x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2*Math.PI, false);
    context.fillStyle = color;
    context.fill();
  }
}

module.exports = Circle;


/***/ }),
/* 3 */
/***/ (function(module, exports) {


class ImageStuff {
  constructor(picIndex) {
    this.imgCanvas = document.getElementById("painting");
    this.imgCanvas.width = window.innerWidth;
    this.imgCanvas.height = window.innerHeight;
    this.context = this.imgCanvas.getContext('2d');
    this.images = [
                   "https://crossorigin.me/http://res.cloudinary.com/dzixj0ktk/image/upload/v1479496760/starry-night_zhsyre.jpg",
                   "https://crossorigin.me/http://res.cloudinary.com/dzixj0ktk/image/upload/v1479533005/cherry-blossom_oylyfw.jpg",
                   "https://crossorigin.me/http://res.cloudinary.com/dzixj0ktk/image/upload/v1479533009/girl-with-sun_fgdqge.jpg",
                   "https://crossorigin.me/http://res.cloudinary.com/dzixj0ktk/image/upload/v1479533009/lion_gxzji3.jpg",
                   "https://crossorigin.me/http://res.cloudinary.com/dzixj0ktk/image/upload/v1479533035/peacock_iciygt.jpg",
                   "https://crossorigin.me/http://res.cloudinary.com/dzixj0ktk/image/upload/v1479533020/random-famous-painting_iwmqeq.jpg",
                   "https://crossorigin.me/http://res.cloudinary.com/dzixj0ktk/image/upload/v1499822319/Henri-Edmond-Cross-XX-A-Pine-Tree-1905_il4wen.jpg"
                  ];
    this.img = new Image();
    this.img.crossOrigin = "Anonymous";
    this.img.src = this.images[picIndex];
    this.img.onload = () => {
      this.context.drawImage(this.img, 0, 0, this.imgCanvas.width, this.imgCanvas.height);
    };
  }

  getData(x, y) {
    return this.context.getImageData(x, y, 1, 1);
  }
}

module.exports = ImageStuff;


/***/ })
/******/ ]);