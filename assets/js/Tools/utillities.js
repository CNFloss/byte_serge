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
