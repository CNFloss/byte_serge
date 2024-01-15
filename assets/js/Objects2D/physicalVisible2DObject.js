import { Visible2DObject } from "./visible2DObject.js";
import { Physical2DObject } from "./physical2DObject.js";

export function PhysicalVisible2DObject(x, y, radius, mass) {
  Physical2DObject.call(this, x, y, radius, mass);
  Visible2DObject.call(this, x, y, radius);
}

PhysicalVisible2DObject.prototype = Object.create(Physical2DObject.prototype);
Object.assign(PhysicalVisible2DObject.prototype, Visible2DObject.prototype);

// Ensure the constructor points back to PhysicalVisibleObject
PhysicalVisible2DObject.prototype.constructor = PhysicalVisible2DObject;
