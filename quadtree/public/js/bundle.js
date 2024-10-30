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
    get radius() {
        return this._radius;
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
const FPS = 60;
function update(a) {
    const position = a.position;
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
    const listCircle = new Array();
    for (let i = 0; i < 10; i++) {
        const circle = new circle_1.Circle(ctx);
        circle.setFillColor((0, color_1.getRandomColorHex)());
        const radius = (0, random_1.randomInt)(10, 30);
        const position = new vector_1.Vector((0, random_1.randomInt)(radius, canvas.width - radius), (0, random_1.randomInt)(radius, canvas.height - radius));
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7Ozs7Ozs7Ozs7O0FDaEREO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjOzs7Ozs7Ozs7OztBQ1REO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7Ozs7OztVQ0xBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsaUJBQWlCLG1CQUFPLENBQUMsaURBQWtCO0FBQzNDLGlCQUFpQixtQkFBTyxDQUFDLGlEQUFrQjtBQUMzQyxnQkFBZ0IsbUJBQU8sQ0FBQywyQ0FBZTtBQUN2QyxpQkFBaUIsbUJBQU8sQ0FBQyw2Q0FBZ0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvY2lyY2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL3ZlY3Rvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvY29sb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3JhbmRvbS50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DaXJjbGUgPSB2b2lkIDA7XG5jbGFzcyBDaXJjbGUge1xuICAgIGNvbnN0cnVjdG9yKGN0eCkge1xuICAgICAgICB0aGlzLl9maWxsQ29sb3IgPSBcInJlZFwiO1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICB0aGlzLl9yYWRpdXMgPSAwO1xuICAgICAgICB0aGlzLl92ZWxvY2l0eSA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5fdmVsb2NpdHkgPSB7XG4gICAgICAgICAgICB4OiAodGhpcy5yYW5kKDEsIDI0MykgJSAyID8gLTEgOiAxKSAqIHRoaXMucmFuZCgzMCwgNTApLFxuICAgICAgICAgICAgeTogKHRoaXMucmFuZCgxLCAxMCkgJSAyID8gLTEgOiAxKSAqIHRoaXMucmFuZCgzMCwgNTApLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByYW5kKGwsIHIpIHtcbiAgICAgICAgcmV0dXJuIGwgKyAoTWF0aC5yYW5kb20oKSAlIChyIC0gbCArIDEpKTtcbiAgICB9XG4gICAgc2V0RmlsbENvbG9yKGNvbG9yKSB7XG4gICAgICAgIHRoaXMuX2ZpbGxDb2xvciA9IGNvbG9yO1xuICAgIH1cbiAgICBzZXRQb3NpdGlvbih4LCB5KSB7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0ge1xuICAgICAgICAgICAgeCxcbiAgICAgICAgICAgIHksXG4gICAgICAgIH07XG4gICAgfVxuICAgIHNldFJhZGl1cyhyYWRpdXMpIHtcbiAgICAgICAgdGhpcy5fcmFkaXVzID0gcmFkaXVzO1xuICAgIH1cbiAgICBnZXQgcG9zaXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcbiAgICB9XG4gICAgZ2V0IHZlbG9jaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmVsb2NpdHk7XG4gICAgfVxuICAgIGdldCByYWRpdXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yYWRpdXM7XG4gICAgfVxuICAgIGRyYXcoKSB7XG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC5hcmModGhpcy5fcG9zaXRpb24ueCwgdGhpcy5fcG9zaXRpb24ueSwgdGhpcy5fcmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMuX2ZpbGxDb2xvcjtcbiAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xuICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgfVxufVxuZXhwb3J0cy5DaXJjbGUgPSBDaXJjbGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVmVjdG9yID0gdm9pZCAwO1xuY2xhc3MgVmVjdG9yIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfVxufVxuZXhwb3J0cy5WZWN0b3IgPSBWZWN0b3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0UmFuZG9tQ29sb3JIZXggPSBnZXRSYW5kb21Db2xvckhleDtcbmZ1bmN0aW9uIGdldFJhbmRvbUNvbG9ySGV4KCkge1xuICAgIHJldHVybiBcIiNcIiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2Nzc3MjE1KS50b1N0cmluZygxNik7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmFuZG9tSW50ID0gcmFuZG9tSW50O1xuZnVuY3Rpb24gcmFuZG9tSW50KG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjaXJjbGVfMSA9IHJlcXVpcmUoXCIuL2NsYXNzZXMvY2lyY2xlXCIpO1xuY29uc3QgdmVjdG9yXzEgPSByZXF1aXJlKFwiLi9jbGFzc2VzL3ZlY3RvclwiKTtcbmNvbnN0IGNvbG9yXzEgPSByZXF1aXJlKFwiLi91dGlscy9jb2xvclwiKTtcbmNvbnN0IHJhbmRvbV8xID0gcmVxdWlyZShcIi4vdXRpbHMvcmFuZG9tXCIpO1xuY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhc1wiKTtcbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5jb25zdCBGUFMgPSA2MDtcbmZ1bmN0aW9uIHVwZGF0ZShhKSB7XG4gICAgY29uc3QgcG9zaXRpb24gPSBhLnBvc2l0aW9uO1xuICAgIHBvc2l0aW9uLnggKz0gYS52ZWxvY2l0eS54IC8gRlBTO1xuICAgIHBvc2l0aW9uLnkgKz0gYS52ZWxvY2l0eS55IC8gRlBTO1xuICAgIGlmIChwb3NpdGlvbi54ID4gY3R4LmNhbnZhcy53aWR0aCAtIGEucmFkaXVzKSB7XG4gICAgICAgIGEudmVsb2NpdHkueCAqPSAtMTtcbiAgICAgICAgcG9zaXRpb24ueCA9IGN0eC5jYW52YXMud2lkdGggLSBhLnJhZGl1cztcbiAgICB9XG4gICAgaWYgKHBvc2l0aW9uLnggPCBhLnJhZGl1cykge1xuICAgICAgICBhLnZlbG9jaXR5LnggKj0gLTE7XG4gICAgICAgIHBvc2l0aW9uLnggPSBhLnJhZGl1cztcbiAgICB9XG4gICAgaWYgKHBvc2l0aW9uLnkgPiBjdHguY2FudmFzLmhlaWdodCAtIGEucmFkaXVzKSB7XG4gICAgICAgIGEudmVsb2NpdHkueSAqPSAtMTtcbiAgICAgICAgcG9zaXRpb24ueSA9IGN0eC5jYW52YXMuaGVpZ2h0IC0gYS5yYWRpdXM7XG4gICAgfVxuICAgIGlmIChwb3NpdGlvbi55IDwgYS5yYWRpdXMpIHtcbiAgICAgICAgYS52ZWxvY2l0eS55ICo9IC0xO1xuICAgICAgICBwb3NpdGlvbi55ID0gYS5yYWRpdXM7XG4gICAgfVxufVxuaWYgKGN0eCkge1xuICAgIGNvbnN0IGxpc3RDaXJjbGUgPSBuZXcgQXJyYXkoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgY29uc3QgY2lyY2xlID0gbmV3IGNpcmNsZV8xLkNpcmNsZShjdHgpO1xuICAgICAgICBjaXJjbGUuc2V0RmlsbENvbG9yKCgwLCBjb2xvcl8xLmdldFJhbmRvbUNvbG9ySGV4KSgpKTtcbiAgICAgICAgY29uc3QgcmFkaXVzID0gKDAsIHJhbmRvbV8xLnJhbmRvbUludCkoMTAsIDMwKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBuZXcgdmVjdG9yXzEuVmVjdG9yKCgwLCByYW5kb21fMS5yYW5kb21JbnQpKHJhZGl1cywgY2FudmFzLndpZHRoIC0gcmFkaXVzKSwgKDAsIHJhbmRvbV8xLnJhbmRvbUludCkocmFkaXVzLCBjYW52YXMuaGVpZ2h0IC0gcmFkaXVzKSk7XG4gICAgICAgIGNpcmNsZS5zZXRQb3NpdGlvbihwb3NpdGlvbi54LCBwb3NpdGlvbi55KTtcbiAgICAgICAgY2lyY2xlLnNldFJhZGl1cyhyYWRpdXMpO1xuICAgICAgICBsaXN0Q2lyY2xlLnB1c2goY2lyY2xlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2FtZSgpIHtcbiAgICAgICAgLy8gQ2xlYXIgdGhlIGNhbnZhc1xuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgY2lyY2xlXG4gICAgICAgIGxpc3RDaXJjbGUuZm9yRWFjaCgoY2lyY2xlKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGUoY2lyY2xlKTtcbiAgICAgICAgICAgIGNpcmNsZS5kcmF3KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBUaGlzIGlzIHRoZSBnYW1lIGxvb3BcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShnYW1lKTtcbiAgICB9XG4gICAgZ2FtZSgpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9