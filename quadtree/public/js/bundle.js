/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/classes/circle.ts":
/*!*******************************!*\
  !*** ./src/classes/circle.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Circle = void 0;
const vector_1 = __webpack_require__(/*! ./vector */ "./src/classes/vector.ts");
class Circle {
    constructor(ctx, bounds) {
        this._fillColor = "red";
        this._position = new vector_1.Vector(0, 0);
        this._radius = 0;
        this._velocity = new vector_1.Vector(0, 0);
        this._bounds = undefined;
        this.ctx = ctx;
        this._velocity = new vector_1.Vector((this.rand(1, 243) % 2 ? -1 : 1) * this.rand(30, 50), (this.rand(1, 10) % 2 ? -1 : 1) * this.rand(30, 50));
        this._bounds = bounds;
        this._mass = this._radius ** 3;
    }
    rand(min, max) {
        const value = Math.floor(min + Math.random() * max);
        console.log(value);
        return value;
    }
    setFillColor(color) {
        this._fillColor = color;
    }
    setPosition(v) {
        this._position = v;
    }
    setRadius(radius) {
        this._radius = radius;
        this._mass = this._radius ** 3;
    }
    setVelocity(v) {
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
        this.ctx.arc(this._position.x, this._position.y, this._radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this._fillColor;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
    update(deltaTime) {
        if (this._bounds) {
            const position = this.position;
            position.x += this.velocity.x * deltaTime;
            position.y += this.velocity.y * deltaTime;
            if (position.x + this.radius > this._bounds.right) {
                position.x = this._bounds.right - this.radius;
                this.velocity.x *= -1;
            }
            else if (position.x - this.radius < this._bounds.left) {
                position.x = this._bounds.left + this.radius;
                this.velocity.x *= -1;
            }
            // Top and bottom bounds
            if (position.y + this.radius > this._bounds.bottom) {
                position.y = this._bounds.bottom - this.radius;
                this.velocity.y *= -1;
            }
            else if (position.y - this.radius < this._bounds.top) {
                position.y = this._bounds.top + this.radius;
                this.velocity.y *= -1;
            }
        }
    }
    distance(circle) {
        return Math.sqrt((circle.position.x - this.position.x) *
            (circle.position.x - this.position.x) +
            (circle.position.y - this.position.y) *
                (circle.position.y - this.position.y));
    }
    collison(circle) {
        const distance = this.distance(circle);
        if (distance <= this.radius + circle.radius) {
            const m1 = this.mass;
            const m2 = circle.mass;
            const v1 = this.velocity;
            const v2 = circle.velocity;
            const n = new vector_1.Vector(circle.position.x - this.position.y, circle.position.y - this.position.y);
            const overlap = (this.radius + circle.radius - distance) / -2;
            //TODO: check
            this._position = this.position.add(n.divideScalar(distance).multipleScalar(overlap));
            circle.setPosition(circle.position.subtract(n.divideScalar(distance).multipleScalar(overlap)));
            const un = new vector_1.Vector(n.x / Math.sqrt(n.x ** 2 + n.y ** 2), n.y / Math.sqrt(n.x ** 2 + n.y ** 2));
            const ut = new vector_1.Vector(-un.y, un.x);
            const v1n = un.dot(v1);
            const v1t = ut.dot(v1);
            const v2n = un.dot(v2);
            const v2t = ut.dot(v2);
            const v1nnv = un.multipleScalar((v1n * (m1 - m2) + 2 * m2 * v2n) / (m1 + m2));
            const v2nnv = un.multipleScalar((v2n * (m2 - m1) + 2 * m1 * v1n) / (m1 + m2));
            const v1ttv = ut.multipleScalar(v1t);
            const v2ttv = ut.multipleScalar(v2t);
            this.setVelocity(v1nnv.add(v1ttv));
            circle.setVelocity(v2nnv.add(v2ttv));
        }
    }
}
exports.Circle = Circle;


/***/ }),

/***/ "./src/classes/vector.ts":
/*!*******************************!*\
  !*** ./src/classes/vector.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Vector = void 0;
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    // Nhân từng thành phần của vector
    multiple(v) {
        return new Vector(this.x * v.x, this.y * v.y);
    }
    // Nhân với một số vô hướng
    multipleScalar(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }
    // Tính tích vô hướng (dot product)
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    // Tích có hướng (cross product) - kết quả là số vô hướng trong 2D
    cross(v) {
        return this.x * v.y - this.y * v.x;
    }
    // Phép chia vector
    divide(v) {
        return new Vector(this.x / v.x, this.y / v.y);
    }
    // Chia số vô hướng
    divideScalar(scalar) {
        return new Vector(this.x / scalar, this.y / scalar);
    }
    // Thêm vector
    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
    // Thêm số vô hướng
    addScalar(scalar) {
        return new Vector(this.x + scalar, this.y + scalar);
    }
    // Trừ vector
    subtract(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }
    // Lấy góc của vector (radians)
    angle() {
        return Math.atan2(this.y, this.x);
    }
}
exports.Vector = Vector;


/***/ }),

/***/ "./src/utils/color.ts":
/*!****************************!*\
  !*** ./src/utils/color.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRandomColorHex = getRandomColorHex;
function getRandomColorHex() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}


/***/ }),

/***/ "./src/utils/random.ts":
/*!*****************************!*\
  !*** ./src/utils/random.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.randomInt = randomInt;
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const circle_1 = __webpack_require__(/*! ./classes/circle */ "./src/classes/circle.ts");
const vector_1 = __webpack_require__(/*! ./classes/vector */ "./src/classes/vector.ts");
const color_1 = __webpack_require__(/*! ./utils/color */ "./src/utils/color.ts");
const random_1 = __webpack_require__(/*! ./utils/random */ "./src/utils/random.ts");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
window.devicePixelRatio = 2;
let deltaTime = 0;
function setupCanvas(canvas, ctx) {
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
    const listCircle = new Array();
    let lastTime = 0;
    for (let i = 0; i < 10; i++) {
        const circle = new circle_1.Circle(ctx, bounds);
        circle.setFillColor((0, color_1.getRandomColorHex)());
        const radius = (0, random_1.randomInt)(50, 200);
        const position = new vector_1.Vector((0, random_1.randomInt)(radius, canvas.width - radius), (0, random_1.randomInt)(radius, canvas.height - radius));
        circle.setPosition(new vector_1.Vector(position.x, position.y));
        circle.setRadius(radius);
        listCircle.push(circle);
    }
    function game(currentTime) {
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cmMvY2xhc3Nlcy9jaXJjbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvdmVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9jb2xvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcmFuZG9tLnRzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNpcmNsZSA9IHZvaWQgMDtcbmNvbnN0IHZlY3Rvcl8xID0gcmVxdWlyZShcIi4vdmVjdG9yXCIpO1xuY2xhc3MgQ2lyY2xlIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIGJvdW5kcykge1xuICAgICAgICB0aGlzLl9maWxsQ29sb3IgPSBcInJlZFwiO1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IG5ldyB2ZWN0b3JfMS5WZWN0b3IoMCwgMCk7XG4gICAgICAgIHRoaXMuX3JhZGl1cyA9IDA7XG4gICAgICAgIHRoaXMuX3ZlbG9jaXR5ID0gbmV3IHZlY3Rvcl8xLlZlY3RvcigwLCAwKTtcbiAgICAgICAgdGhpcy5fYm91bmRzID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5fdmVsb2NpdHkgPSBuZXcgdmVjdG9yXzEuVmVjdG9yKCh0aGlzLnJhbmQoMSwgMjQzKSAlIDIgPyAtMSA6IDEpICogdGhpcy5yYW5kKDMwLCA1MCksICh0aGlzLnJhbmQoMSwgMTApICUgMiA/IC0xIDogMSkgKiB0aGlzLnJhbmQoMzAsIDUwKSk7XG4gICAgICAgIHRoaXMuX2JvdW5kcyA9IGJvdW5kcztcbiAgICAgICAgdGhpcy5fbWFzcyA9IHRoaXMuX3JhZGl1cyAqKiAzO1xuICAgIH1cbiAgICByYW5kKG1pbiwgbWF4KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gTWF0aC5mbG9vcihtaW4gKyBNYXRoLnJhbmRvbSgpICogbWF4KTtcbiAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHNldEZpbGxDb2xvcihjb2xvcikge1xuICAgICAgICB0aGlzLl9maWxsQ29sb3IgPSBjb2xvcjtcbiAgICB9XG4gICAgc2V0UG9zaXRpb24odikge1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHY7XG4gICAgfVxuICAgIHNldFJhZGl1cyhyYWRpdXMpIHtcbiAgICAgICAgdGhpcy5fcmFkaXVzID0gcmFkaXVzO1xuICAgICAgICB0aGlzLl9tYXNzID0gdGhpcy5fcmFkaXVzICoqIDM7XG4gICAgfVxuICAgIHNldFZlbG9jaXR5KHYpIHtcbiAgICAgICAgdGhpcy5fdmVsb2NpdHkgPSB2O1xuICAgIH1cbiAgICBnZXQgcG9zaXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcbiAgICB9XG4gICAgZ2V0IHZlbG9jaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmVsb2NpdHk7XG4gICAgfVxuICAgIGdldCByYWRpdXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yYWRpdXM7XG4gICAgfVxuICAgIGdldCBtYXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFzcztcbiAgICB9XG4gICAgZHJhdygpIHtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmFyYyh0aGlzLl9wb3NpdGlvbi54LCB0aGlzLl9wb3NpdGlvbi55LCB0aGlzLl9yYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5fZmlsbENvbG9yO1xuICAgICAgICB0aGlzLmN0eC5maWxsKCk7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG4gICAgdXBkYXRlKGRlbHRhVGltZSkge1xuICAgICAgICBpZiAodGhpcy5fYm91bmRzKSB7XG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb247XG4gICAgICAgICAgICBwb3NpdGlvbi54ICs9IHRoaXMudmVsb2NpdHkueCAqIGRlbHRhVGltZTtcbiAgICAgICAgICAgIHBvc2l0aW9uLnkgKz0gdGhpcy52ZWxvY2l0eS55ICogZGVsdGFUaW1lO1xuICAgICAgICAgICAgaWYgKHBvc2l0aW9uLnggKyB0aGlzLnJhZGl1cyA+IHRoaXMuX2JvdW5kcy5yaWdodCkge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uLnggPSB0aGlzLl9ib3VuZHMucmlnaHQgLSB0aGlzLnJhZGl1cztcbiAgICAgICAgICAgICAgICB0aGlzLnZlbG9jaXR5LnggKj0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwb3NpdGlvbi54IC0gdGhpcy5yYWRpdXMgPCB0aGlzLl9ib3VuZHMubGVmdCkge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uLnggPSB0aGlzLl9ib3VuZHMubGVmdCArIHRoaXMucmFkaXVzO1xuICAgICAgICAgICAgICAgIHRoaXMudmVsb2NpdHkueCAqPSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRvcCBhbmQgYm90dG9tIGJvdW5kc1xuICAgICAgICAgICAgaWYgKHBvc2l0aW9uLnkgKyB0aGlzLnJhZGl1cyA+IHRoaXMuX2JvdW5kcy5ib3R0b20pIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbi55ID0gdGhpcy5fYm91bmRzLmJvdHRvbSAtIHRoaXMucmFkaXVzO1xuICAgICAgICAgICAgICAgIHRoaXMudmVsb2NpdHkueSAqPSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHBvc2l0aW9uLnkgLSB0aGlzLnJhZGl1cyA8IHRoaXMuX2JvdW5kcy50b3ApIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbi55ID0gdGhpcy5fYm91bmRzLnRvcCArIHRoaXMucmFkaXVzO1xuICAgICAgICAgICAgICAgIHRoaXMudmVsb2NpdHkueSAqPSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBkaXN0YW5jZShjaXJjbGUpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCgoY2lyY2xlLnBvc2l0aW9uLnggLSB0aGlzLnBvc2l0aW9uLngpICpcbiAgICAgICAgICAgIChjaXJjbGUucG9zaXRpb24ueCAtIHRoaXMucG9zaXRpb24ueCkgK1xuICAgICAgICAgICAgKGNpcmNsZS5wb3NpdGlvbi55IC0gdGhpcy5wb3NpdGlvbi55KSAqXG4gICAgICAgICAgICAgICAgKGNpcmNsZS5wb3NpdGlvbi55IC0gdGhpcy5wb3NpdGlvbi55KSk7XG4gICAgfVxuICAgIGNvbGxpc29uKGNpcmNsZSkge1xuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IHRoaXMuZGlzdGFuY2UoY2lyY2xlKTtcbiAgICAgICAgaWYgKGRpc3RhbmNlIDw9IHRoaXMucmFkaXVzICsgY2lyY2xlLnJhZGl1cykge1xuICAgICAgICAgICAgY29uc3QgbTEgPSB0aGlzLm1hc3M7XG4gICAgICAgICAgICBjb25zdCBtMiA9IGNpcmNsZS5tYXNzO1xuICAgICAgICAgICAgY29uc3QgdjEgPSB0aGlzLnZlbG9jaXR5O1xuICAgICAgICAgICAgY29uc3QgdjIgPSBjaXJjbGUudmVsb2NpdHk7XG4gICAgICAgICAgICBjb25zdCBuID0gbmV3IHZlY3Rvcl8xLlZlY3RvcihjaXJjbGUucG9zaXRpb24ueCAtIHRoaXMucG9zaXRpb24ueSwgY2lyY2xlLnBvc2l0aW9uLnkgLSB0aGlzLnBvc2l0aW9uLnkpO1xuICAgICAgICAgICAgY29uc3Qgb3ZlcmxhcCA9ICh0aGlzLnJhZGl1cyArIGNpcmNsZS5yYWRpdXMgLSBkaXN0YW5jZSkgLyAtMjtcbiAgICAgICAgICAgIC8vVE9ETzogY2hlY2tcbiAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gdGhpcy5wb3NpdGlvbi5hZGQobi5kaXZpZGVTY2FsYXIoZGlzdGFuY2UpLm11bHRpcGxlU2NhbGFyKG92ZXJsYXApKTtcbiAgICAgICAgICAgIGNpcmNsZS5zZXRQb3NpdGlvbihjaXJjbGUucG9zaXRpb24uc3VidHJhY3Qobi5kaXZpZGVTY2FsYXIoZGlzdGFuY2UpLm11bHRpcGxlU2NhbGFyKG92ZXJsYXApKSk7XG4gICAgICAgICAgICBjb25zdCB1biA9IG5ldyB2ZWN0b3JfMS5WZWN0b3Iobi54IC8gTWF0aC5zcXJ0KG4ueCAqKiAyICsgbi55ICoqIDIpLCBuLnkgLyBNYXRoLnNxcnQobi54ICoqIDIgKyBuLnkgKiogMikpO1xuICAgICAgICAgICAgY29uc3QgdXQgPSBuZXcgdmVjdG9yXzEuVmVjdG9yKC11bi55LCB1bi54KTtcbiAgICAgICAgICAgIGNvbnN0IHYxbiA9IHVuLmRvdCh2MSk7XG4gICAgICAgICAgICBjb25zdCB2MXQgPSB1dC5kb3QodjEpO1xuICAgICAgICAgICAgY29uc3QgdjJuID0gdW4uZG90KHYyKTtcbiAgICAgICAgICAgIGNvbnN0IHYydCA9IHV0LmRvdCh2Mik7XG4gICAgICAgICAgICBjb25zdCB2MW5udiA9IHVuLm11bHRpcGxlU2NhbGFyKCh2MW4gKiAobTEgLSBtMikgKyAyICogbTIgKiB2Mm4pIC8gKG0xICsgbTIpKTtcbiAgICAgICAgICAgIGNvbnN0IHYybm52ID0gdW4ubXVsdGlwbGVTY2FsYXIoKHYybiAqIChtMiAtIG0xKSArIDIgKiBtMSAqIHYxbikgLyAobTEgKyBtMikpO1xuICAgICAgICAgICAgY29uc3QgdjF0dHYgPSB1dC5tdWx0aXBsZVNjYWxhcih2MXQpO1xuICAgICAgICAgICAgY29uc3QgdjJ0dHYgPSB1dC5tdWx0aXBsZVNjYWxhcih2MnQpO1xuICAgICAgICAgICAgdGhpcy5zZXRWZWxvY2l0eSh2MW5udi5hZGQodjF0dHYpKTtcbiAgICAgICAgICAgIGNpcmNsZS5zZXRWZWxvY2l0eSh2Mm5udi5hZGQodjJ0dHYpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuQ2lyY2xlID0gQ2lyY2xlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlZlY3RvciA9IHZvaWQgMDtcbmNsYXNzIFZlY3RvciB7XG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgIH1cbiAgICAvLyBOaMOibiB04burbmcgdGjDoG5oIHBo4bqnbiBj4bunYSB2ZWN0b3JcbiAgICBtdWx0aXBsZSh2KSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCAqIHYueCwgdGhpcy55ICogdi55KTtcbiAgICB9XG4gICAgLy8gTmjDom4gduG7m2kgbeG7mXQgc+G7kSB2w7QgaMaw4bubbmdcbiAgICBtdWx0aXBsZVNjYWxhcihzY2FsYXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54ICogc2NhbGFyLCB0aGlzLnkgKiBzY2FsYXIpO1xuICAgIH1cbiAgICAvLyBUw61uaCB0w61jaCB2w7QgaMaw4bubbmcgKGRvdCBwcm9kdWN0KVxuICAgIGRvdCh2KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2Lnk7XG4gICAgfVxuICAgIC8vIFTDrWNoIGPDsyBoxrDhu5tuZyAoY3Jvc3MgcHJvZHVjdCkgLSBr4bq/dCBxdeG6oyBsw6Agc+G7kSB2w7QgaMaw4bubbmcgdHJvbmcgMkRcbiAgICBjcm9zcyh2KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnggKiB2LnkgLSB0aGlzLnkgKiB2Lng7XG4gICAgfVxuICAgIC8vIFBow6lwIGNoaWEgdmVjdG9yXG4gICAgZGl2aWRlKHYpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54IC8gdi54LCB0aGlzLnkgLyB2LnkpO1xuICAgIH1cbiAgICAvLyBDaGlhIHPhu5EgdsO0IGjGsOG7m25nXG4gICAgZGl2aWRlU2NhbGFyKHNjYWxhcikge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLnggLyBzY2FsYXIsIHRoaXMueSAvIHNjYWxhcik7XG4gICAgfVxuICAgIC8vIFRow6ptIHZlY3RvclxuICAgIGFkZCh2KSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCArIHYueCwgdGhpcy55ICsgdi55KTtcbiAgICB9XG4gICAgLy8gVGjDqm0gc+G7kSB2w7QgaMaw4bubbmdcbiAgICBhZGRTY2FsYXIoc2NhbGFyKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCArIHNjYWxhciwgdGhpcy55ICsgc2NhbGFyKTtcbiAgICB9XG4gICAgLy8gVHLhu6sgdmVjdG9yXG4gICAgc3VidHJhY3Qodikge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLnggLSB2LngsIHRoaXMueSAtIHYueSk7XG4gICAgfVxuICAgIC8vIEzhuqV5IGfDs2MgY+G7p2EgdmVjdG9yIChyYWRpYW5zKVxuICAgIGFuZ2xlKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5hdGFuMih0aGlzLnksIHRoaXMueCk7XG4gICAgfVxufVxuZXhwb3J0cy5WZWN0b3IgPSBWZWN0b3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0UmFuZG9tQ29sb3JIZXggPSBnZXRSYW5kb21Db2xvckhleDtcbmZ1bmN0aW9uIGdldFJhbmRvbUNvbG9ySGV4KCkge1xuICAgIHJldHVybiBcIiNcIiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2Nzc3MjE1KS50b1N0cmluZygxNik7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmFuZG9tSW50ID0gcmFuZG9tSW50O1xuZnVuY3Rpb24gcmFuZG9tSW50KG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjaXJjbGVfMSA9IHJlcXVpcmUoXCIuL2NsYXNzZXMvY2lyY2xlXCIpO1xuY29uc3QgdmVjdG9yXzEgPSByZXF1aXJlKFwiLi9jbGFzc2VzL3ZlY3RvclwiKTtcbmNvbnN0IGNvbG9yXzEgPSByZXF1aXJlKFwiLi91dGlscy9jb2xvclwiKTtcbmNvbnN0IHJhbmRvbV8xID0gcmVxdWlyZShcIi4vdXRpbHMvcmFuZG9tXCIpO1xuY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhc1wiKTtcbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG53aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA9IDI7XG5sZXQgZGVsdGFUaW1lID0gMDtcbmZ1bmN0aW9uIHNldHVwQ2FudmFzKGNhbnZhcywgY3R4KSB7XG4gICAgY29uc3QgZHByID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbiAgICBjb25zdCBkaXNwbGF5V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjb25zdCBkaXNwbGF5SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIC8vIFNldCB2aXN1YWwgc2l6ZVxuICAgIGNhbnZhcy5zdHlsZS53aWR0aCA9IFwiMTAwdndcIjtcbiAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gXCIxMDB2aFwiO1xuICAgIC8vIFNldCBhY3R1YWwgcmVzb2x1dGlvblxuICAgIGNhbnZhcy53aWR0aCA9IGRpc3BsYXlXaWR0aCAqIGRwcjtcbiAgICBjYW52YXMuaGVpZ2h0ID0gZGlzcGxheUhlaWdodCAqIGRwcjtcbiAgICBjdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdHJ1ZTsgLy8gRW5hYmxlIGFudGktYWxpYXNpbmdcbiAgICBjdHguaW1hZ2VTbW9vdGhpbmdRdWFsaXR5ID0gXCJoaWdoXCI7XG4gICAgY3R4LnNjYWxlKGRwciwgZHByKTtcbiAgICAvLyBJbXBvcnRhbnQ6IFNldCB0aGVzZSBhcyB5b3VyIGNvbGxpc2lvbiBib3VuZGFyaWVzXG4gICAgY29uc3QgYm91bmRzID0ge1xuICAgICAgICB3aWR0aDogZGlzcGxheVdpZHRoLCAvLyBVc2UgZGlzcGxheSB3aWR0aCwgbm90IGNhbnZhcy53aWR0aFxuICAgICAgICBoZWlnaHQ6IGRpc3BsYXlIZWlnaHQsIC8vIFVzZSBkaXNwbGF5IGhlaWdodCwgbm90IGNhbnZhcy5oZWlnaHRcbiAgICAgICAgcmlnaHQ6IGRpc3BsYXlXaWR0aCxcbiAgICAgICAgYm90dG9tOiBkaXNwbGF5SGVpZ2h0LFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICB0b3A6IDAsXG4gICAgfTtcbiAgICByZXR1cm4gYm91bmRzO1xufVxuaWYgKGN0eCkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHNldHVwQ2FudmFzKGNhbnZhcywgY3R4KTtcbiAgICBjb25zdCBsaXN0Q2lyY2xlID0gbmV3IEFycmF5KCk7XG4gICAgbGV0IGxhc3RUaW1lID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgY29uc3QgY2lyY2xlID0gbmV3IGNpcmNsZV8xLkNpcmNsZShjdHgsIGJvdW5kcyk7XG4gICAgICAgIGNpcmNsZS5zZXRGaWxsQ29sb3IoKDAsIGNvbG9yXzEuZ2V0UmFuZG9tQ29sb3JIZXgpKCkpO1xuICAgICAgICBjb25zdCByYWRpdXMgPSAoMCwgcmFuZG9tXzEucmFuZG9tSW50KSg1MCwgMjAwKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBuZXcgdmVjdG9yXzEuVmVjdG9yKCgwLCByYW5kb21fMS5yYW5kb21JbnQpKHJhZGl1cywgY2FudmFzLndpZHRoIC0gcmFkaXVzKSwgKDAsIHJhbmRvbV8xLnJhbmRvbUludCkocmFkaXVzLCBjYW52YXMuaGVpZ2h0IC0gcmFkaXVzKSk7XG4gICAgICAgIGNpcmNsZS5zZXRQb3NpdGlvbihuZXcgdmVjdG9yXzEuVmVjdG9yKHBvc2l0aW9uLngsIHBvc2l0aW9uLnkpKTtcbiAgICAgICAgY2lyY2xlLnNldFJhZGl1cyhyYWRpdXMpO1xuICAgICAgICBsaXN0Q2lyY2xlLnB1c2goY2lyY2xlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2FtZShjdXJyZW50VGltZSkge1xuICAgICAgICBkZWx0YVRpbWUgPSAoY3VycmVudFRpbWUgLSBsYXN0VGltZSkgLyAxMDA7IC8vIENvbnZlcnQgdG8gc2Vjb25kc1xuICAgICAgICBsYXN0VGltZSA9IGN1cnJlbnRUaW1lO1xuICAgICAgICAvLyBDbGVhciB0aGUgY2FudmFzXG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBjaXJjbGVcbiAgICAgICAgbGlzdENpcmNsZS5mb3JFYWNoKChjaXJjbGUpID0+IHtcbiAgICAgICAgICAgIGNpcmNsZS51cGRhdGUoZGVsdGFUaW1lKTtcbiAgICAgICAgICAgIGNpcmNsZS5kcmF3KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RDaXJjbGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGlzdENpcmNsZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChpICE9PSBqKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNpcmNsZUEgPSBsaXN0Q2lyY2xlW2ldO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaXJjbGVCID0gbGlzdENpcmNsZVtqXTtcbiAgICAgICAgICAgICAgICAgICAgY2lyY2xlQS5jb2xsaXNvbihjaXJjbGVCKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgZ2FtZSBsb29wXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZSk7XG4gICAgfVxuICAgIGdhbWUoMCk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=