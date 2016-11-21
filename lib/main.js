const BridsonsAlgorithm = require("./sampling_algorithms");
const ImageStuff = require("./image");

const resetButton = document.getElementById('reset');
const nextButton = document.getElementById('next-pic');
const previousButton = document.getElementById('previous-pic');
const aboutButton = document.getElementById('about');
const playButton = document.getElementById('playMusic');
const pauseButton = document.getElementById('pauseMusic');

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
let alreadyClicked = false;

function getRandomPoint() {
  let x = (Math.random() * (canvas.width + 1));
  let y = (Math.random() * (canvas.height + 1));
  return [x, y];
}

// function handleClick() {
//   if (!alreadyClicked) {
//     for (let i = 0; i < 7; i++) {
//       paintingLoop();
//     }
//     alreadyClicked = true;
//   }
// }
//
// function paintingLoop() {
//   let circles = new BridsonsAlgorithm(getRandomPoint(), radius);
//   let interval = setInterval(() => {
//     draw(circles.shift());
//     if(circles.length === 0) {
//       clearInterval(interval);
//       if (radius > 10)
//         radius -= 2;
//       paintingLoop();
//     }
//   }, 1);
// }

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
  if (e.target == modal) {
    aboutModal.style.display = "none";
  }
}

canvas.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetClick);
nextButton.addEventListener('click', nextPicClick);
previousButton.addEventListener('click', previousPicClick);
aboutButton.addEventListener('click', openAboutModal);
xOut.addEventListener('click', closeAboutModal);
playButton.addEventListener('click', playMusic);
pauseButton.addEventListener('click', pauseMusic);
