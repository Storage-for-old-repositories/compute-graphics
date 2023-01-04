import Position3D from "./position3d.js";

class Sphere {
  #position;
  #r = 0;

  constructor(p3d, r) {
    this.#position = p3d;
    this.#r = Math.max(0, r);
  }

  get position() {
    return this.#position;
  }

  get r() {
    return this.#r;
  }

  intersectRay(origin, direction) {
    const oc = origin.sub(this.#position);

    const k1 = direction.scalarProduct(direction);
    const k2 = 2 * oc.scalarProduct(direction);
    const k3 = oc.scalarProduct(oc) - this.#r ** 2;

    const discriminant = k2 ** 2 - 4 * k1 * k3;

    if (discriminant < 0) {
      return [Infinity, Infinity];
    }

    const t1 = (-k2 + Math.sqrt(discriminant)) / (2 * k1);
    const t2 = (-k2 - Math.sqrt(discriminant)) / (2 * k1);

    return [t1, t2];
  }
}

export default Sphere;
