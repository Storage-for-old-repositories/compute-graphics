export class Vector2D {
  #x = 0;
  #y = 0;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  /**
   *
   * @param {number} scalar
   */
  static createFromScalar(scalar) {
    return Vector2D._createVector2D(scalar, scalar);
  }

  /**
   *
   * @param { [number, number] } xyTuple
   */
  static createFromXYTuple([x, y]) {
    return Vector2D._createVector2D(x, y);
  }

  /**
   *
   * @param { { x: number; y: number; } } xyComponents
   */
  static createFromXYComponents({ x, y }) {
    return Vector2D._createVector2D(x, y);
  }

  static _createVector2D(x, y) {
    return new Vector2D(x, y);
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get xyTuple() {
    return [this.#x, this.#y];
  }

  get xyComponents() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  /**
   *
   * @param {Vector2D} vector2D
   */
  addVector2D(vector2D) {
    return Vector2D._createVector2D(this.#x + vector2D.x, this.#y + vector2D.y);
  }

  /**
   *
   * @param {Vector2D} vector2D
   */
  subVector2D(vector2D) {
    return Vector2D._createVector2D(this.#x - vector2D.x, this.#y - vector2D.y);
  }

  /**
   *
   * @param {number} scalar
   */
  addScalar(scalar) {
    return Vector2D._createVector2D(this.#x + scalar, this.#y + scalar);
  }

  /**
   *
   * @param {number} scalar
   */
  subScalar(scalar) {
    return Vector2D._createVector2D(this.#x - scalar, this.#y - scalar);
  }

  /**
   *
   * @param {number} scalar
   */
  multiplicateScalar(scalar) {
    return Vector2D._createVector2D(this.#x * scalar, this.#y * scalar);
  }

  /**
   *
   * @param {(component: number) => number} mapper
   */
  mapComponents(mapper) {
    return Vector2D._createVector2D(mapper(this.#x), mapper(this.#y));
  }

  length() {
    return Math.sqrt(this.#x ** 2 + this.#y ** 2);
  }

  normalize() {
    return this.multiplicateScalar(this.length());
  }

  /**
   * 
   * @param {Vector2D} vector2D 
   */
  dotProduct(vector2D) {
    return this.#x * vector2D.x + this.#y * vector2D.y;
  }
}
