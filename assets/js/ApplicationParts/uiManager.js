export function UIManager(root) {
  this.appRoot = new El(root);
  this.appComponents = {
    unlabelled: [],
    input: [],
    display: [],
  };
}

UIManager.prototype.createElement = function (tag, attrs = {}, label) {
  if (!this.appComponents[label]) {
    throw Error("not a supported element type!");
  }

  this.appComponents[label].push(new El(tag, attrs));
};

const SVGNS = "http://www.w3.org/2000/svg";

function El(tag, attrs = {}) {
  if (this instanceof SVGElement) {
    this.el = document.createElementNS(SVGNS, tag);
  } else {
    this.el = tag instanceof Element ? tag : document.createElement(tag);
  }

  Object.keys(attrs).forEach((att) =>
    att === "text"
      ? this.el.appendChild(document.createTextNode(attrs[att]))
      : att === "parent"
      ? attrs.parent.appendChild(this.el)
      : att === "child"
      ? attrs.child.forEach((tag, i) => {
          if (i % 2 === 0) this.el.mkChild(tag, attrs.child[i + 1] || {});
        })
      : att === "css"
      ? this.el.setStyle(attrs.css)
      : att.match(/^on/)
      ? (this.el[att] = attrs[att])
      : this.el.setAttribute(att, attrs[att])
  );
}

El.prototype.mkChild = function (tag, attrs) {
  const child = new El(tag, attrs);
  this.el.appendChild(child.el);
  return child;
};

El.prototype.setStyle = function (style) {
  Object.entries(style).forEach(([key, val]) => (this.el.style[key] = val));
};
