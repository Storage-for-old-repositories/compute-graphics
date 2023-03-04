/**
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @returns
 */
export const quadraticEquationSolve = (a, b, c) => {
  const discriminant = _calculateDiscriminant(a, b, c);
  const countRoots = _calculateCountRoots(discriminant);
  if (countRoots == 0) {
    return null;
  }

  const isOnlyOneSolution = countRoots == 1;
  const distance = Math.sqrt(discriminant);
  const x1 = _calculateRoot(a, b, distance);
  let x2 = 0;
  if (isOnlyOneSolution) {
    x2 = x1;
  } else {
    x2 = _calculateRoot(a, b, -distance);
  }
  return { x1, x2, isOnlyOneSolution };
};

/**
 *
 * @param {number} a
 * @param {number} b
 * @param {number} distance
 */
const _calculateDiscriminant = (a, b, c) => {
  return b ** 2 - 4 * a * c;
};

/**
 *
 * @param {number} discriminant
 * @returns {0 | 1 | 2}
 */
const _calculateCountRoots = (discriminant) => {
  return Math.sign(discriminant) + 1;
};

/**
 *
 * @param {number} a
 * @param {number} b
 * @param {number} distance
 */
const _calculateRoot = (a, b, distance) => {
  return (-b + distance) / (2 * a);
};
