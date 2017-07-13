const BridsonsAlgorithm = require("./sampling_algorithms");
const ImageStuff = require("./image");

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
  } else {
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
