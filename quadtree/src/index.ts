import { Circle } from "./classes/circle";
import { Vector } from "./classes/vector";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const FPS = 60;

function update(a: Circle) {
  const position: Vector = a.position;
  position.x += a.velocity.x / FPS;
  position.y += a.velocity.y / FPS;
}

if (ctx) {
  const circle = new Circle(ctx);
  circle.setFillColor("red");
  circle.setPosition(0, 0);
  circle.setRadius(20);

  function game() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circle.draw();

    // This is the game loop
    window.requestAnimationFrame(game);
  }

  game();
}
