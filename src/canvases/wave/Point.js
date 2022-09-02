export class Point {
  constructor({ x, y, index }) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = 0.1;
    this.t = index;
    this.max = Math.random() * 100 + 10;
  }

  update() {
    this.t += this.speed;
    this.y = this.fixedY + Math.sin(this.t) * this.max;
  }
}
