import { Vector3D } from "../../utils";

export class Ray {
  /** @type {Vector3D} */
  #position;

  /** @type {Vector3D} */
  #direction;

  constructor(position, direction) {
    this.#position = position;
    this.#direction = direction;
  }

  /**
   * 
   * @param {Vector3D} position 
   * @param {Vector3D} direction 
   */
  static create(position, direction) {
    return new Ray(position, direction);
  }

  get position() {
    return this.#position;
  }

  get direction() {
    return this.#direction;
  }
}
