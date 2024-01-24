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

export function mergeImages(images, cellWidth, cellHeight) {
  const gridSize = Math.ceil(Math.sqrt(images.length));
  const canvas = document.createElement("canvas");
  canvas.width = gridSize * cellWidth;
  canvas.height = gridSize * cellHeight;
  const ctx = canvas.getContext("2d");

  images.forEach((image, index) => {
    const x = (index % gridSize) * cellWidth;
    const y = Math.floor(index / gridSize) * cellHeight;
    // @ts-ignore
    ctx.drawImage(image, x, y, cellWidth, cellHeight);
  });

  return canvas;
}

export function resizeImages(images, width, height) {
  return images.map((image) => {
    console.log(image.width, width, image.height, height);
    if (image.width === width && image.height === height) {
      return image;
    }
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    // @ts-ignore
    ctx.drawImage(image, 0, 0, width, height);
    return canvas;
  });
}
