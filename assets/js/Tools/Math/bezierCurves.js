/**
 * Linearly interpolates between two points.
 * @param {number} p0 - The starting point or value.
 * @param {number} p1 - The ending point or value.
 * @param {number} t - The interpolation factor between 0 and 1.
 * @returns {number} The interpolated value.
 */
export function lerp(p0, p1, t) {
  return (1 - t) * p0 + t * p1;
}

/**
 * Calculates a point on a cubic Bezier curve using De Casteljau's algorithm.
 * @param {number} p0 - The first control point of the cubic Bezier curve.
 * @param {number} p1 - The second control point of the cubic Bezier curve.
 * @param {number} p2 - The third control point of the cubic Bezier curve.
 * @param {number} p3 - The fourth control point of the cubic Bezier curve.
 * @param {number} t - The parameter t, which ranges from 0 to 1.
 * @returns {number} The point on the Bezier curve for the given t.
 */
export function cubicBezier(p0, p1, p2, p3, t) {
  // First level of linear interpolations
  let q0 = lerp(p0, p1, t);
  let q1 = lerp(p1, p2, t);
  let q2 = lerp(p2, p3, t);

  // Second level of linear interpolations
  let r0 = lerp(q0, q1, t);
  let r1 = lerp(q1, q2, t);

  // Final level of linear interpolation
  return lerp(r0, r1, t);
}
