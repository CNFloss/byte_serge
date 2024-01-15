import { Base2DObject } from "./base2DObject.js";

export function Physical2DObject(x, y, radius, mass) {
  Base2DObject.call(this, x, y, radius);
  this.mass = mass;
  this.forceX = 0;
  this.forceY = 0;
  this.velocityX = 0;
  this.velocityY = 0;
  this.accelerateX = 0;
  this.accelerateY = 0;
  this.previousX = x;
  this.previousY = y;
}

Physical2DObject.prototype = Object.create(Base2DObject.prototype);
Physical2DObject.prototype.constructor = Physical2DObject;

Physical2DObject.prototype.applyForces = function (forceX, forceY) {
  this.forceX = forceX;
  this.forceY = forceY;
};

Physical2DObject.prototype.integrate = function (t, dt) {
  this.accelerateX = this.forceX;
  this.accelerateY = this.forceY;

  this.velocityX += this.accelerateX * dt;
  this.velocityY += this.accelerateY * dt;

  // @ts-ignore
  this.x += this.velocityX * dt;
  // @ts-ignore
  this.y += this.velocityY * dt;
};

Physical2DObject.prototype.saveState = function () {
  // @ts-ignore
  this.previousX = this.x;
  // @ts-ignore
  this.previousY = this.y;
};
