import Vector3D from "./Vector3D";

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
   * @param { { radius: number; position: Vector3D } } componentsSphere 
   * @returns 
   */
  static createSphere({ radius, position }) {
    return new Sphere(radius, position);
  }

  get position() {
    return this.#position;
  }

  get radius() {
    return this.#radius;
  }

  intersectRay(origin, direction) {
    const oc = origin.sub(this.#position);

    const k1 = direction.dotProduct(direction);
    const k2 = 2 * oc.dotProduct(direction);
    const k3 = oc.dotProduct(oc) - this.#r ** 2;

    const discriminant = k2 ** 2 - 4 * k1 * k3;

    if (discriminant < 0) {
      return [Infinity, Infinity];
    }

    const t1 = (-k2 + Math.sqrt(discriminant)) / (2 * k1);
    const t2 = (-k2 - Math.sqrt(discriminant)) / (2 * k1);

    return [t1, t2];
  }
}
