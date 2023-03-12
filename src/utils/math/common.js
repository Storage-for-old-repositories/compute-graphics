
/**
 * 
 * @param {number} value 
 * @param {number} min 
 * @param {number} max 
 */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
