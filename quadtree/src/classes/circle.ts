import { BoundIF } from "../types";
import { Vector } from "./vector";

export class Circle {
  private ctx: CanvasRenderingContext2D;
  private _fillColor: string = "red";
  private _position: Vector = new Vector(0, 0);
  private _radius: number = 0;
  private _velocity: Vector = new Vector(0, 0);
  private _bounds: BoundIF | undefined = undefined;
  private _mass: number;
  constructor(ctx: CanvasRenderingContext2D, bounds: BoundIF) {
    this.ctx = ctx;
    this._velocity = new Vector(
      (this.rand(1, 243) % 2 ? -1 : 1) * this.rand(30, 50),
      (this.rand(1, 10) % 2 ? -1 : 1) * this.rand(30, 50)
    );
    this._bounds = bounds;
    this._mass = this._radius ** 3;
  }

  private rand(min: number, max: number) {
    const value = Math.floor(min + Math.random() * max);
    console.log(value);
    return value;
  }

  public setFillColor(color: string) {
    this._fillColor = color;
  }
  public setPosition(v: Vector) {
    this._position = v;
  }
  public setRadius(radius: number) {
    this._radius = radius;
    this._mass = this._radius ** 3;
  }

  public setVelocity(v: Vector) {
    this._velocity = v;
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

  get mass() {
    return this._mass;
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

  update(deltaTime: number) {
    if (this._bounds) {
      const position: Vector = this.position;
      position.x += this.velocity.x * deltaTime;
      position.y += this.velocity.y * deltaTime;

      if (position.x + this.radius > this._bounds.right) {
        position.x = this._bounds.right - this.radius;
        this.velocity.x *= -1;
      } else if (position.x - this.radius < this._bounds.left) {
        position.x = this._bounds.left + this.radius;
        this.velocity.x *= -1;
      }

      // Top and bottom bounds
      if (position.y + this.radius > this._bounds.bottom) {
        position.y = this._bounds.bottom - this.radius;
        this.velocity.y *= -1;
      } else if (position.y - this.radius < this._bounds.top) {
        position.y = this._bounds.top + this.radius;
        this.velocity.y *= -1;
      }
    }
  }

  distance(circle: Circle) {
    return Math.sqrt(
      (circle.position.x - this.position.x) *
        (circle.position.x - this.position.x) +
        (circle.position.y - this.position.y) *
          (circle.position.y - this.position.y)
    );
  }

  collison(circle: Circle) {
    const distance = this.distance(circle);

    if (distance <= this.radius + circle.radius) {
      const m1 = this.mass;
      const m2 = circle.mass;

      const v1: Vector = this.velocity;
      const v2: Vector = circle.velocity;
      const n: Vector = new Vector(
        circle.position.x - this.position.y,
        circle.position.y - this.position.y
      );

      const overlap = (this.radius + circle.radius - distance) / -2;

      //TODO: check
      this._position = this.position.add(
        n.divideScalar(distance).multipleScalar(overlap)
      );
      circle.setPosition(
        circle.position.subtract(
          n.divideScalar(distance).multipleScalar(overlap)
        )
      );

      const un: Vector = new Vector(
        n.x / Math.sqrt(n.x ** 2 + n.y ** 2),
        n.y / Math.sqrt(n.x ** 2 + n.y ** 2)
      );

      const ut: Vector = new Vector(-un.y, un.x);
      const v1n = un.dot(v1);
      const v1t = ut.dot(v1);
      const v2n = un.dot(v2);
      const v2t = ut.dot(v2);

      const v1nnv: Vector = un.multipleScalar(
        (v1n * (m1 - m2) + 2 * m2 * v2n) / (m1 + m2)
      );
      const v2nnv: Vector = un.multipleScalar(
        (v2n * (m2 - m1) + 2 * m1 * v1n) / (m1 + m2)
      );
      const v1ttv: Vector = ut.multipleScalar(v1t);
      const v2ttv: Vector = ut.multipleScalar(v2t);

      this.setVelocity(v1nnv.add(v1ttv));
      circle.setVelocity(v2nnv.add(v2ttv));
    }
  }
}
