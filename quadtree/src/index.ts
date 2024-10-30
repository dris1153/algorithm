import { Circle } from "./classes/circle";
import { Vector } from "./classes/vector";
import { getRandomColorHex } from "./utils/color";
import { randomInt } from "./utils/random";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
window.devicePixelRatio = 2;

let deltaTime = 0;

function setupCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const dpr = window.devicePixelRatio || 1;
  const displayWidth = window.innerWidth;
  const displayHeight = window.innerHeight;

  // Set visual size
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";

  // Set actual resolution
  canvas.width = displayWidth * dpr;
  canvas.height = displayHeight * dpr;

  ctx.imageSmoothingEnabled = true; // Enable anti-aliasing
  ctx.imageSmoothingQuality = "high";

  ctx.scale(dpr, dpr);

  // Important: Set these as your collision boundaries
  const bounds = {
    width: displayWidth, // Use display width, not canvas.width
    height: displayHeight, // Use display height, not canvas.height
    right: displayWidth,
    bottom: displayHeight,
    left: 0,
    top: 0,
  };

  return bounds;
}

if (ctx) {
  const bounds = setupCanvas(canvas, ctx);

  const listCircle = new Array<Circle>();
  let lastTime = 0;

  for (let i = 0; i < 10; i++) {
    const circle = new Circle(ctx, bounds);
    circle.setFillColor(getRandomColorHex());
    const radius = randomInt(50, 200);
    const position = new Vector(
      randomInt(radius, canvas.width - radius),
      randomInt(radius, canvas.height - radius)
    );
    circle.setPosition(new Vector(position.x, position.y));
    circle.setRadius(radius);
    listCircle.push(circle);
  }

  function game(currentTime: number) {
    deltaTime = (currentTime - lastTime) / 100; // Convert to seconds
    lastTime = currentTime;
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update the circle
    listCircle.forEach((circle) => {
      circle.update(deltaTime);
      circle.draw();
    });

    for (let i = 0; i < listCircle.length; i++) {
      for (let j = 0; j < listCircle.length; j++) {
        if (i !== j) {
          const circleA = listCircle[i];
          const circleB = listCircle[j];
          circleA.collison(circleB);
        }
      }
    }

    // This is the game loop
    window.requestAnimationFrame(game);
  }

  game(0);
}
