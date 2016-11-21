const Circle = require("./circle");

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
    while (this.activeSamplesArr.length !== 0 && this.allSamples.length < 750) {
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
