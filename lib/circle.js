
class Circle {
  constructor(context, color, x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2*Math.PI, false);
    context.fillStyle = color;
    context.fill();
  }
}

module.exports = Circle;
