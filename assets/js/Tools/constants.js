import { degreesToRadians } from "./utillities.js";

export const R_DEGEE_15 = degreesToRadians(15);
export const R_DEGEE_45 = degreesToRadians(45);
export const R_DEGEE_90 = degreesToRadians(90);
export const R_DEGEE_135 = degreesToRadians(135);
export const R_DEGEE_180 = degreesToRadians(180);
export const R_DEGEE_225 = degreesToRadians(225);
export const R_DEGEE_270 = degreesToRadians(270);
export const R_DEGEE_315 = degreesToRadians(315);

export const DEFAULT_WIDTH = 2048;
export const DEFAULT_HEIGHT = 1152;

export const DEFAULT_STROKE_COLOR = "black";
export const DEFAULT_FILL_COLOR = "black";

export const DEFAULT_LINE_WIDTH = 10;

export const DIRECTION_MAP = (() => {
  let map = {};
  map["EAST"] = 0;
  map["NORTH EAST"] = R_DEGEE_45;
  map["NORTH"] = R_DEGEE_90;
  map["NORTH_WEST"] = R_DEGEE_135;
  map["WEST"] = R_DEGEE_180;
  map["SOUTH_WEST"] = R_DEGEE_225;
  map["SOUTH"] = R_DEGEE_270;
  map["SOUTH_EAST"] = R_DEGEE_315;
  Object.freeze(map);
  return map;
})();
