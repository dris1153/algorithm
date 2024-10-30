import { Vector } from "./vector";

export class Circle {
  private ctx: CanvasRenderingContext2D;
  private _fillColor: string = "red";
  private _position: Vector = { x: 0, y: 0 };
  private _radius: number = 0;
  private _velocity: Vector = { x: 0, y: 0 };
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this._velocity = {
      x: (this.rand(1, 243) % 2 ? -1 : 1) * this.rand(30, 50),
      y: (this.rand(1, 10) % 2 ? -1 : 1) * this.rand(30, 50),
    };
  }

  private rand(l: number, r: number) {
    return l + (Math.random() % (r - l + 1));
  }

  public setFillColor(color: string) {
    this._fillColor = color;
  }
  public setPosition(x: number, y: number) {
    this._position = {
      x,
      y,
    };
  }
  public setRadius(radius: number) {
    this._radius = radius;
  }

  get position() {
    return this._position;
  }

  get velocity() {
    return this._velocity;
  }

  get radius() {
    return this._radius;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(
      this._position.x,
      this._position.y,
      this._radius,
      0,
      Math.PI * 2
    );
    this.ctx.fillStyle = this._fillColor;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
