import { mapElementsToObj } from "../Tools/utillities.js";
import {
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  DEFAULT_STROKE_COLOR,
  DEFAULT_FILL_COLOR,
  DEFAULT_LINE_WIDTH,
} from "../Tools/constants.js";

export function BYTE_SERGE(canvas, input, tick_func, settings) {
  this.CANVAS = canvas;
  this.CTX = this.CANVAS.getContext("2d");
  this.CANVAS.width = DEFAULT_WIDTH;
  this.CANVAS.height = DEFAULT_HEIGHT;

  this._scaleCanvasToFitContainer();

  /*
  this.OFFSCREEN_CANVAS = new OffscreenCanvas(
    this.CANVAS.width * 10,
    this.CANVAS.height * 10
  );
  this.OFFSCREEN_CTX = this.OFFSCREEN_CANVAS.getContext("2d", { alpha: false });
  */

  this.CTX.lineWidth = DEFAULT_LINE_WIDTH;
  this.CTX.fillStyle = DEFAULT_FILL_COLOR;
  this.CTX.strokeStyle = DEFAULT_STROKE_COLOR;

  this.TICK_FUNC = tick_func;
  this.PLAYER_INPUT = input;
  this.PLAYER_INPUT_HISTORY = [];
  this.VISIBLE_MOVING_OBJECTS = [];
  this.STAT_DISPLAY = {};
  this.BUTTONS = {};
  this.CUSTOM_SETTINGS = settings;
  this._running = false;
  this._raf = null;
}

BYTE_SERGE.prototype.CREATE_BUTTONS = function (buttons, types, funcs) {
  const handlers = funcs;

  this.BUTTONS = mapElementsToObj(...buttons);

  handlers.forEach((handler, idx) => {
    if (
      this.BUTTONS[
        `${handler}`
          .toUpperCase()
          .slice(9, `${handler}`.toUpperCase().indexOf("("))
      ] !== undefined
    ) {
      if (types[idx] === "click") {
        this.BUTTONS[
          `${handler}`
            .toUpperCase()
            .slice(9, `${handler}`.toUpperCase().indexOf("("))
        ].addEventListener("click", handler.bind(null, this), false);
      }
      if (types[idx] === "press") {
        console.log(
          `${handler}`
            .toUpperCase()
            .slice(9, `${handler}`.toUpperCase().indexOf("(")),
          this.BUTTONS
        );
        console.log(
          this.BUTTONS[
            `${handler}`
              .toUpperCase()
              .slice(9, `${handler}`.toUpperCase().indexOf("("))
          ]
        );
      }
    }
  });
};

BYTE_SERGE.prototype.RENDER = function () {};
BYTE_SERGE.prototype.PROCESS = function (totalTime, deltaTime) {};
BYTE_SERGE.prototype.INPUT_READ = function () {
  return { _direction: 0, _intensity: 0 };
};

BYTE_SERGE.prototype._scaleCanvasToFitContainer = function () {
  const container = this.CANVAS.parentElement;
  console.log(container);
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const aspectRatio = this.CANVAS.width / this.CANVAS.height;

  let displayWidth = containerWidth;
  let displayHeight = displayWidth / aspectRatio;

  if (displayHeight > containerHeight) {
    displayHeight = containerHeight;
    displayWidth = displayHeight * aspectRatio;
  }

  this.CANVAS.style.width = `${displayWidth}px`;
  this.CANVAS.style.height = `${displayHeight}px`;
};
