export class Vector {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  // Nhân từng thành phần của vector
  public multiple(v: Vector): Vector {
    return new Vector(this.x * v.x, this.y * v.y);
  }

  // Nhân với một số vô hướng
  public multipleScalar(scalar: number): Vector {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  // Tính tích vô hướng (dot product)
  public dot(v: Vector): number {
    return this.x * v.x + this.y * v.y;
  }

  // Tích có hướng (cross product) - kết quả là số vô hướng trong 2D
  public cross(v: Vector): number {
    return this.x * v.y - this.y * v.x;
  }

  // Phép chia vector
  public divide(v: Vector): Vector {
    return new Vector(this.x / v.x, this.y / v.y);
  }

  // Chia số vô hướng
  public divideScalar(scalar: number): Vector {
    return new Vector(this.x / scalar, this.y / scalar);
  }

  // Thêm vector
  public add(v: Vector): Vector {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  // Thêm số vô hướng
  public addScalar(scalar: number): Vector {
    return new Vector(this.x + scalar, this.y + scalar);
  }

  // Trừ vector
  public subtract(v: Vector): Vector {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  // Lấy góc của vector (radians)
  public angle(): number {
    return Math.atan2(this.y, this.x);
  }
}
