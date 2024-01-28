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

export async function fetchFile(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  } catch (error) {
    console.error("Error fetching file:", error);
  }
}
