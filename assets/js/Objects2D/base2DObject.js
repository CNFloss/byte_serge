export function Base2DObject(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Base2DObject.prototype.setPosition = function (x, y) {
  this.x = x;
  this.y = y;
};
