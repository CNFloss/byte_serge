export function Base2DObject(x, y, radius) {
  this.x = x || 0;
  this.y = y || 0;
  this.radius = radius || 10;
}

Base2DObject.prototype.setPosition = function (x, y) {
  this.x = x;
  this.y = y;
};
