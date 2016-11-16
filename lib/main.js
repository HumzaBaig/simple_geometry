const Circle = require("./circle");

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
