class BridsonsAlgorithm {
  constructor(firstSample, radius) {
    this.activeSamples = [firstSample];
    this.radius = radius;
    let innerRadius = this.radius;
    let outerRadius = this.radius * 2;
    let currentSample = chooseCenterSample();
    createNewSample(currentSample);
  }

  createNewSample(centerSample) {
    // Does something...
  }

  checkSampleAcceptability(sample) {
    for (let i = 0; i < 30; i++) {
      if (calculateDistance(sample, this.activeSamples[i]) < this.radius) {
        this.activeSamples.push(sample);
        // create circle on screen
        break;
      } else {
        if (i === 29) {
          // MUST CHANGE TO HASHLIST... HALTED PROGRESS FOR NOW
        }
      }
    }
  }

  calculateDistance(firstPoint, secondPoint) {
    let diffOfX = Math.abs(firstPoint[0] - secondPoint[0]);
    let diffOfY = Math.abs(firstPoint[1] - secondPoint[1]);
    return Math.sqrt(Math.pow(diffOfX, 2) + Math.pow(diffOfY, 2);
  }

  chooseCenterSample() {
    let randomIndex = getRandomInteger(0, this.activeSamples.length);
    return this.activeSamples[randomIndex];
  }

  getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
