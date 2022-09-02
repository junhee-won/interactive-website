import { Point } from "./Point";

export class Wave {
  constructor({ beginX, endX, y, color, index }) {
    this.beginX = beginX;
    this.endX = endX;
    this.y = y;
    this.color = color;
    this.index = index;
    this.pointsNum = 5;
    this.centerXArr = [];
    for (let i = 0; i < this.pointsNum; i++) {
      this.centerXArr.push(
        ((i * 2 + 1) * (endX - beginX)) / (this.pointsNum * 2) + beginX
      );
    }
    this.init();
  }
  init() {
    this.points = [];
    for (let i = 0; i < this.pointsNum; i++) {
      this.points.push(
        new Point({ x: this.centerXArr[i], y: this.y, index: i + this.index })
      );
    }
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.moveTo(this.beginX, this.y);
    for (let i = 0; i < this.pointsNum - 1; i++) {
      this.curX = (this.points[i].x + this.points[i + 1].x) / 2;
      this.curY = (this.points[i].y + this.points[i + 1].y) / 2;
      // ctx.arc(this.curX, this.curY, 30, 0, 2 * Math.PI);
      ctx.quadraticCurveTo(
        this.points[i].x,
        this.points[i].y,
        this.curX,
        this.curY
      );
      this.points[i].update();
    }
    ctx.quadraticCurveTo(
      this.points[this.pointsNum - 1].x,
      this.points[this.pointsNum - 1].y,
      this.endX,
      this.y
    );
    this.points[this.pointsNum - 1].update();

    ctx.lineTo(this.endX, 500);
    ctx.lineTo(this.beginX, 500);
    ctx.lineTo(this.beginX, this.y);
    ctx.fill();
  }
}
