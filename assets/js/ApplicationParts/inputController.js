import { test_value } from "../Tools/utillities.js";
import { DIRECTION_MAP } from "../Tools/constants.js";
import { radiansToDegrees } from "../Tools/Math/math.js";

export function InputController(intensity, direction) {
  this._direction = direction || DIRECTION_MAP["EAST"];
  this._intensity = intensity || 0;
}

InputController.prototype.setDirection = function (direction) {
  let { dir, error } = test_value(direction, DIRECTION_MAP["EAST"]);
  if (error) {
    console.error(
      `An input direction was called without a value. A default value of (${
        DIRECTION_MAP["EAST"]
      } radians / ${radiansToDegrees(DIRECTION_MAP["EAST"])} degrees) was used.`
    );
  }
  this._direction = dir;
};

InputController.prototype.setIntensity = function (intensity) {
  let { value, error } = test_value(intensity, 0.0);
  if (error) {
    console.error(
      `An input intensity was called without a value. A default value of ${0.0} was used.`
    );
  }
  this._intensity = value;
};

InputController.prototype.getSnapShot = function () {
  const clone = { ...this };
  return Object.freeze(clone);
};
