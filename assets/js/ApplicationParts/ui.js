import { mapElementsToObj } from "../Tools/utillities.js";
import { roundFloat } from "../Tools/Math/math.js";

// Create UI Hydrator
export function updateStat(elem, obj) {
  if (elem.getElementsByTagName("ul").length > 0) {
    let ul = elem.getElementsByTagName("ul")[0];
    let lis = [];
    for (let key in obj) {
      if (obj[key] instanceof Function) continue;
      if (typeof obj[key] === "object") continue;

      let li = document.createElement("li");
      let pKey = document.createElement("p");
      pKey.textContent = `${key}: `;
      let pVal = document.createElement("p");
      let rounded = roundFloat(obj[key]);
      pVal.textContent = `${rounded}`;
      li.appendChild(pKey);
      li.appendChild(pVal);
      lis.push(li);
    }
    ul.childNodes.forEach((child, i) => {
      ul.replaceChild(lis[i], child);
    });
  } else {
    let ul = document.createElement("ul");
    elem.appendChild(ul);

    for (let key in obj) {
      if (obj[key] instanceof Function) continue;
      if (typeof obj[key] === "object") continue;

      let li = document.createElement("li");
      let pKey = document.createElement("p");
      pKey.textContent = `${key}: `;
      let pVal = document.createElement("p");
      let rounded = roundFloat(obj[key]);
      pVal.textContent = `${rounded}`;
      li.appendChild(pKey);
      li.appendChild(pVal);

      ul.appendChild(li);
    }
  }
}

export function registerUIComponents(...components) {
  return mapElementsToObj(...components);
}
