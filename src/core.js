/**
 * Linear interpolation between two scalar values without clamping the
 * interpolation parameter to the [0, 1] range.
 *
 * Formula: result = a + t * (b - a)
 *
 * When t = 0 the result is a. When t = 1 the result is b. For t outside
 * [0, 1] the result extrapolates beyond the [a, b] interval — this is the
 * entire reason the function exists.
 *
 * The parameter is NOT clamped. If you need clamped behaviour, clamp t
 * yourself before calling, or use a clamped variant. Mixing the two would
 * hide bugs where the caller intended extrapolation but got saturation.
 *
 * NaN or Infinity in a, b, or t will propagate through the arithmetic in
 * the usual IEEE-754 way. This is deliberate: silently turning NaN into a
 * zero would hide the real problem upstream.
 *
 * @param {number} a - Start value (returned when t is 0).
 * @param {number} b - End value (returned when t is 1).
 * @param {number} t - Interpolation parameter. Not clamped.
 * @returns {number} The interpolated (or extrapolated) value.
 */
export function lerpUnclampedScalar(a, b, t) {
  return a + t * (b - a);
}
