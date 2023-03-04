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
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns
   */
  static create(x, y, z) {
    return new Vector3D(x, y, z);
  }

  /**
   *
   * @param {number} scalar
   */
  static createFromScalar(scalar) {
    return new Vector3D(scalar, scalar, scalar);
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

  /**
   *
   * @param {Vector3D} vector3D
   */
  addVector3D(vector3D) {
    return Vector3D.create(
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
    return Vector3D.create(
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
    return Vector3D.create(
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
    return Vector3D.create(
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
    return Vector3D.create(
      this.#x * scalar,
      this.#y * scalar,
      this.#z * scalar
    );
  }

  /**
   *
   * @param {number} scalar
   */
  divideScalar(scalar) {
    return Vector3D.create(
      this.#x / scalar,
      this.#y / scalar,
      this.#z / scalar
    );
  }

  /**
   *
   * @param {(component: number) => number} mapper
   */
  mapComponents(mapper) {
    return Vector3D.create(mapper(this.#x), mapper(this.#y), mapper(this.#z));
  }

    /**
   *
   * @param {Vector3D} vector3D
   */
    dotProduct(vector3D) {
      return this.#x * vector3D.x + this.#y * vector3D.y + this.#z * vector3D.z;
    }

  length() {
    return Math.sqrt(this.dotProduct(this));
  }

  normalize() {
    return this.divideScalar(this.length());
  }
}
