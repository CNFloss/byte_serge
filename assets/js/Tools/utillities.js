// General
export function test_value(test, value) {
  if (value === undefined) {
    throw new Error(
      "DEVELOPER BUG! ...OR A HACKER! A VALUE THAT SHOULD EXIST DOES NOT!"
    );
  }
  if (test === undefined) {
    return { value, error: true };
  }
  return { value: test, error: false };
}

export function mapElementsToObj(...elements) {
  const ELEMENTS = {};

  if (elements.length) {
    elements.forEach((elem) => {
      let sArray = elem.split("");
      let newS = "";
      sArray.forEach((char, j) => {
        if (elem[j].toUpperCase() === char) {
          newS += "_" + char;
        } else {
          newS += char;
        }
      });
      ELEMENTS[`${newS.toUpperCase()}`] = document.getElementById(`${elem}`);
    });
  }

  return ELEMENTS;
}

// Math
export function clamp(v, min, max) {
  if (min > v) {
    return min;
  } else if (max < v) {
    return max;
  } else {
    return v;
  }
}

export function degreesToRadians(d) {
  return d * (Math.PI / 180);
}

export function radiansToDegrees(r) {
  return r * (180 / Math.PI);
}

export function angleBetweenV2s(x1, y1, x2, y2) {
  const DX = x2 - x1;
  const DY = y2 - y1;

  const RADIANS = Math.atan2(DY, DX);

  const DEGREES = radiansToDegrees(RADIANS);

  return { r: RADIANS, d: DEGREES };
}

export function roundFloat(num, place = 5) {
  if (typeof num !== "number") {
    console.error(`error truncating number: ${num}.`);
    return;
  }
  return Number(num.toFixed(place));
}

export function findV2AtDistanceAndRadians(x, y, d, r) {
  console.log(
    "Finding vertical and horizontal speed from point in direction with intensity: ",
    x,
    y,
    d,
    r
  );
  const _x = x + d * Math.cos(r);
  //
  const _y = y - d * Math.sin(r);
  return { x: _x, y: _y };
}
