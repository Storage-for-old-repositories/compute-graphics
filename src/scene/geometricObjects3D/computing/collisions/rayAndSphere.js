import { Ray, Sphere } from "../../objects";
import { quadraticEquationSolve } from "../../../../utils";

/**
 *
 * @param {Ray} ray
 * @param {Sphere} sphere
 */
export const collisionRayAndSphereQuadraticEquation = (ray, sphere) => {
  const distance = ray.position.subVector3D(sphere.position);
  const a = ray.direction.dotProduct(ray.direction);
  const b = 2 * ray.direction.dotProduct(distance);
  const c = distance.dotProduct(distance) - sphere.radius ** 2;
  return quadraticEquationSolve(a, b, c);
};

/**
 *
 * @param {Ray} ray
 * @param {Sphere} sphere
 */
export const collisionRayAndSphere = (ray, sphere) => {
  const solution = collisionRayAndSphereQuadraticEquation(ray, sphere);
  if (!solution) {
    return null;
  }

  const { isOnlyOneSolution: isOnlyTouch, x1, x2 } = solution;
  let near = calculatePointAlongRay(ray, x1);
  let far = near;
  if (!isOnlyTouch) {
    far = calculatePointAlongRay(ray, x2);
    if (Math.abs(x1) > Math.abs(x2)) {
      [near, far] = [far, near];
    }
  }
  return { near, far, isOnlyTouch };
};

/**
 *
 * @param {Ray} ray
 * @param {number} offset
 */
const calculatePointAlongRay = (ray, offset) => {
  return ray.positionAlongDirection(offset);
};
