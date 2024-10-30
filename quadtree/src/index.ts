import { Circle } from "./classes/circle";
import { Vector } from "./classes/vector";
import { getRandomColorHex } from "./utils/color";
import { randomInt } from "./utils/random";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const FPS = 60;

function update(a: Circle) {
  const position: Vector = a.position;
  position.x += a.velocity.x / FPS;
  position.y += a.velocity.y / FPS;

  if (position.x > ctx.canvas.width - a.radius) {
    a.velocity.x *= -1;
    position.x = ctx.canvas.width - a.radius;
  }
  if (position.x < a.radius) {
    a.velocity.x *= -1;
    position.x = a.radius;
  }
  if (position.y > ctx.canvas.height - a.radius) {
    a.velocity.y *= -1;
    position.y = ctx.canvas.height - a.radius;
  }
  if (position.y < a.radius) {
    a.velocity.y *= -1;
    position.y = a.radius;
  }
}

if (ctx) {
  const listCircle = new Array<Circle>();

  for (let i = 0; i < 10; i++) {
    const circle = new Circle(ctx);
    circle.setFillColor(getRandomColorHex());
    const radius = randomInt(10, 30);
    const position = new Vector(
      randomInt(radius, canvas.width - radius),
      randomInt(radius, canvas.height - radius)
    );
    circle.setPosition(position.x, position.y);
    circle.setRadius(radius);
    listCircle.push(circle);
  }

  function game() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update the circle
    listCircle.forEach((circle) => {
      update(circle);
      circle.draw();
    });

    // This is the game loop
    window.requestAnimationFrame(game);
  }

  game();
}
