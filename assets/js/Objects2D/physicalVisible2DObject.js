import { Physical2DObject } from "./physical2DObject.js";
import { Visible2DObject } from "./visible2DObject.js";

export function PhysicalVisible2DObject(x, y, radius, mass) {
  Physical2DObject.call(this, x, y, radius, mass);
}

PhysicalVisible2DObject.prototype = Object.create(Physical2DObject.prototype);
Object.assign(PhysicalVisible2DObject.prototype, Visible2DObject.prototype);
PhysicalVisible2DObject.prototype.constructor = PhysicalVisible2DObject;
