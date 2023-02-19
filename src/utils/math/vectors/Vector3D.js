export class Vector3D {
  #x = 0;
  #y = 0;
  #z = 0;

  constructor(x, y, z) {
    this.#x = x;
    this.#y = y;
    this.#z = z;
  }

  /**
   *
   * @param {number} scalar
   */
  static createFromScalar(scalar) {
    return Vector3D._createVector3D(scalar, scalar, scalar);
  }

  /**
   *
   * @param { [number, number, number] } xyTuple
   */
  static createFromXYZTuple([x, y, z]) {
    return Vector3D._createVector3D(x, y, z);
  }

  /**
   *
   * @param { { x: number; y: number; z: number } } xyzComponents
   */
  static createFromXYComponents({ x, y, z }) {
    return Vector3D._createVector3D(x, y, z);
  }

  static _createVector3D(x, y, z) {
    return new Vector3D(x, y, z);
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get z() {
    return this.#z;
  }

  get xyzTuple() {
    return [this.#x, this.#y, this.#z];
  }

  get xyzComponents() {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
    };
  }

  /**
   *
   * @param {Vector3D} vector3D
   */
  addVector3D(vector3D) {
    return Vector3D._createVector3D(
      this.#x + vector3D.x,
      this.#y + vector3D.y,
      this.#z + vector3D.z
    );
  }

  /**
   *
   * @param {Vector3D} vector3D
   */
  subVector3D(vector3D) {
    return Vector3D._createVector3D(
      this.#x - vector3D.x,
      this.#y - vector3D.y,
      this.#z - vector3D.z
    );
  }

  /**
   *
   * @param {number} scalar
   */
  addScalar(scalar) {
    return Vector3D._createVector3D(
      this.#x + scalar,
      this.#y + scalar,
      this.#z + scalar
    );
  }

  /**
   *
   * @param {number} scalar
   */
  subScalar(scalar) {
    return Vector3D._createVector3D(
      this.#x - scalar,
      this.#y - scalar,
      this.#z + scalar
    );
  }

  /**
   *
   * @param {number} scalar
   */
  multiplicateScalar(scalar) {
    return Vector3D._createVector3D(
      this.#x * scalar,
      this.#y * scalar,
      this.#z * scalar
    );
  }

  /**
   *
   * @param {(component: number) => number} mapper
   */
  mapComponents(mapper) {
    return Vector3D._createVector3D(
      mapper(this.#x),
      mapper(this.#y),
      mapper(this.#z)
    );
  }

  length() {
    return Math.sqrt(this.#x ** 2 + this.#y ** 2 + this.#z ** 2);
  }

  normalize() {
    return this.multiplicateScalar(this.length());
  }

  /**
   *
   * @param {Vector3D} vector3D
   */
  dotProduct(vector3D) {
    return this.#x * vector3D.x + this.#y * vector3D.y + this.#z * vector3D.z;
  }
}
