/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/classes/circle.ts":
/*!*******************************!*\
  !*** ./src/classes/circle.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Circle = void 0;
class Circle {
    constructor(ctx) {
        this._fillColor = "red";
        this._position = { x: 0, y: 0 };
        this._radius = 0;
        this._velocity = { x: 0, y: 0 };
        this.ctx = ctx;
        this._velocity = {
            x: (this.rand(1, 243) % 2 ? -1 : 1) * this.rand(30, 50),
            y: (this.rand(1, 10) % 2 ? -1 : 1) * this.rand(30, 50),
        };
    }
    rand(l, r) {
        return l + (Math.random() % (r - l + 1));
    }
    setFillColor(color) {
        this._fillColor = color;
    }
    setPosition(x, y) {
        this._position = {
            x,
            y,
        };
    }
    setRadius(radius) {
        this._radius = radius;
    }
    get position() {
        return this._position;
    }
    get velocity() {
        return this._velocity;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this._position.x, this._position.y, this._radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this._fillColor;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
}
exports.Circle = Circle;


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
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const FPS = 60;
function update(a) {
    const position = a.position;
    position.x += a.velocity.x / FPS;
    position.y += a.velocity.y / FPS;
}
if (ctx) {
    const circle = new circle_1.Circle(ctx);
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7Ozs7Ozs7VUM3Q2Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxpQkFBaUIsbUJBQU8sQ0FBQyxpREFBa0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9jaXJjbGUudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ2lyY2xlID0gdm9pZCAwO1xuY2xhc3MgQ2lyY2xlIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgpIHtcbiAgICAgICAgdGhpcy5fZmlsbENvbG9yID0gXCJyZWRcIjtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgdGhpcy5fcmFkaXVzID0gMDtcbiAgICAgICAgdGhpcy5fdmVsb2NpdHkgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuX3ZlbG9jaXR5ID0ge1xuICAgICAgICAgICAgeDogKHRoaXMucmFuZCgxLCAyNDMpICUgMiA/IC0xIDogMSkgKiB0aGlzLnJhbmQoMzAsIDUwKSxcbiAgICAgICAgICAgIHk6ICh0aGlzLnJhbmQoMSwgMTApICUgMiA/IC0xIDogMSkgKiB0aGlzLnJhbmQoMzAsIDUwKSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmFuZChsLCByKSB7XG4gICAgICAgIHJldHVybiBsICsgKE1hdGgucmFuZG9tKCkgJSAociAtIGwgKyAxKSk7XG4gICAgfVxuICAgIHNldEZpbGxDb2xvcihjb2xvcikge1xuICAgICAgICB0aGlzLl9maWxsQ29sb3IgPSBjb2xvcjtcbiAgICB9XG4gICAgc2V0UG9zaXRpb24oeCwgeSkge1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHtcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICB5LFxuICAgICAgICB9O1xuICAgIH1cbiAgICBzZXRSYWRpdXMocmFkaXVzKSB7XG4gICAgICAgIHRoaXMuX3JhZGl1cyA9IHJhZGl1cztcbiAgICB9XG4gICAgZ2V0IHBvc2l0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XG4gICAgfVxuICAgIGdldCB2ZWxvY2l0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlbG9jaXR5O1xuICAgIH1cbiAgICBkcmF3KCkge1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHguYXJjKHRoaXMuX3Bvc2l0aW9uLngsIHRoaXMuX3Bvc2l0aW9uLnksIHRoaXMuX3JhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLl9maWxsQ29sb3I7XG4gICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ2lyY2xlID0gQ2lyY2xlO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2lyY2xlXzEgPSByZXF1aXJlKFwiLi9jbGFzc2VzL2NpcmNsZVwiKTtcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjYW52YXNcIik7XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuY29uc3QgRlBTID0gNjA7XG5mdW5jdGlvbiB1cGRhdGUoYSkge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gYS5wb3NpdGlvbjtcbiAgICBwb3NpdGlvbi54ICs9IGEudmVsb2NpdHkueCAvIEZQUztcbiAgICBwb3NpdGlvbi55ICs9IGEudmVsb2NpdHkueSAvIEZQUztcbn1cbmlmIChjdHgpIHtcbiAgICBjb25zdCBjaXJjbGUgPSBuZXcgY2lyY2xlXzEuQ2lyY2xlKGN0eCk7XG4gICAgY2lyY2xlLnNldEZpbGxDb2xvcihcInJlZFwiKTtcbiAgICBjaXJjbGUuc2V0UG9zaXRpb24oMCwgMCk7XG4gICAgY2lyY2xlLnNldFJhZGl1cygyMCk7XG4gICAgZnVuY3Rpb24gZ2FtZSgpIHtcbiAgICAgICAgLy8gQ2xlYXIgdGhlIGNhbnZhc1xuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIGNpcmNsZS5kcmF3KCk7XG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIGdhbWUgbG9vcFxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWUpO1xuICAgIH1cbiAgICBnYW1lKCk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=