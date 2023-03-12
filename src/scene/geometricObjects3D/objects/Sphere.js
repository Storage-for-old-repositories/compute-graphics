import { Vector3D } from "../../utils";

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
}
