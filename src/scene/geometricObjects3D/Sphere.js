import { Vector3D, quadraticEquationSolve } from "../../utils";
import { Ray } from "./Ray";

export class Sphere {
  /** @type {Vector3D} */
  #position;
  #radius = 0;

  constructor(radius, vector3D) {
    this.#radius = radius;
    this.#position = vector3D;
  }

  /**
   *
   * @param {number} radius
   * @param {Vector3D} position
   * @returns
   */
  static create(radius, position) {
    return new Sphere(radius, position);
  }

  get position() {
    return this.#position;
  }

  get radius() {
    return this.#radius;
  }

  // TODO: move method to class collisions
  
  /**
   *
   * @param {Ray} ray
   */
  intersectRay(ray) {
    const distance = ray.position.subVector3D(this.#position);
    const a = ray.direction.dotProduct(ray.direction);
    const b = 2 * ray.direction.dotProduct(distance);
    const c = distance.dotProduct(distance) - this.#radius ** 2;
    return quadraticEquationSolve(a, b, c);
  }
}
