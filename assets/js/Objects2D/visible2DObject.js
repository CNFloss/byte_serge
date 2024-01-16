import { DIRECTION_MAP } from "../Tools/constants.js";
import { radiansToDegrees } from "../Tools/Math/math.js";
import { Base2DObject } from "./base2DObject.js";

export function Visible2DObject(x, y, radius) {
  Base2DObject.call(this, x, y, radius);
  this.rotationR = DIRECTION_MAP.NORTH;
  this.rotationD = 90;
  this.oldPositions = [];
  this.renderState = {
    x: x,
    y: y,
  };
}

Visible2DObject.prototype = Object.create(Base2DObject.prototype);
Visible2DObject.prototype.constructor = Visible2DObject;

Visible2DObject.prototype.rotate = function (rotation) {
  this.rotationR += rotation;
  this.rotationD = radiansToDegrees(this.rotationR);
};

Visible2DObject.prototype.debugDraw = function (CTX) {
  this.oldPositions.push({
    x: this.renderState.x,
    y: this.renderState.y,
    r: this.rotationR,
  });
  CTX.save();
  CTX.translate(this.renderState.x, this.renderState.y);
  CTX.rotate(-this.rotationR);
  CTX.beginPath();
  CTX.moveTo(0, 0);
  // @ts-ignore
  CTX.arc(0, 0, this.radius, 0, 2 * Math.PI);
  CTX.stroke();

  CTX.lineWidth = 20;
  CTX.strokeStyle = "blue";
  CTX.beginPath();
  CTX.moveTo(0, 0);
  // @ts-ignore
  CTX.lineTo(this.radius, 0);
  CTX.stroke();

  CTX.restore();
  CTX.strokeStyle = "black";
};

Visible2DObject.prototype.setRenderState = function (x, y) {
  this.renderState = { x: x, y: y };
};

Visible2DObject.prototype.trajectoryDebugDraw = function (CTX, delta) {
  for (let i = 0; i < this.oldPositions.length; i++) {
    let { x, y } = this.oldPositions[i];
    CTX.beginPath();
    CTX.moveTo(x, y);
    CTX.arc(x, y, 5, 0, 2 * Math.PI);
    CTX.fill();
  }

  for (let i = 1; i < 51; i++) {
    CTX.save();
    CTX.beginPath();
    CTX.fillStyle = "red";
    CTX.moveTo(
      this.renderState.x + delta.x * (i - 1),
      this.renderState.y + delta.y * (i - 1)
    );
    CTX.arc(
      this.renderState.x + delta.x * i,
      this.renderState.y + delta.y * i,
      5,
      0,
      2 * Math.PI
    );
    CTX.fill();
    CTX.restore();
  }
};
