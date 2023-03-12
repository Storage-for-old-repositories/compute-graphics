export class Vector2D {
  #x = 0;
  #y = 0;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   */
  static create(x, y) {
    return new Vector2D(x, y);
  }

  /**
   *
   * @param {number} scalar
   */
  static createFromScalar(scalar) {
    return new Vector2D(scalar, scalar);
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  /**
   *
   * @param {Vector2D} vector2D
   */
  addVector2D(vector2D) {
    return new Vector2D(this.#x + vector2D.x, this.#y + vector2D.y);
  }

  /**
   *
   * @param {Vector2D} vector2D
   */
  subVector2D(vector2D) {
    return new Vector2D(this.#x - vector2D.x, this.#y - vector2D.y);
  }

  /**
   *
   * @param {number} scalar
   */
  addScalar(scalar) {
    return new Vector2D(this.#x + scalar, this.#y + scalar);
  }

  /**
   *
   * @param {number} scalar
   */
  subScalar(scalar) {
    return new Vector2D(this.#x - scalar, this.#y - scalar);
  }

  /**
   *
   * @param {number} scalar
   */
  multiplicateScalar(scalar) {
    return new Vector2D(this.#x * scalar, this.#y * scalar);
  }

  /**
   *
   * @param {number} scalar
   */
  divideScalar(scalar) {
    return new Vector2D(this.#x / scalar, this.#y / scalar);
  }

  /**
   *
   * @param {(component: number) => number} mapper
   */
  map(mapper) {
    return new Vector2D(mapper(this.#x), mapper(this.#y));
  }

  /**
   *
   * @param {Vector2D} vector2D
   */
  dotProduct(vector2D) {
    return this.#x * vector2D.x + this.#y * vector2D.y;
  }

  length() {
    return Math.sqrt(this.dotProduct(this));
  }

  normalize() {
    return this.divideScalar(this.length());
  }
}
