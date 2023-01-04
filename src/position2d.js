class Position2D {
  #x = 0;
  #y = 0;

  constructor(x = 0, y = 0) {
    this.#x = x;
    this.#y = y;
  }

  static buildFromScalar(x) {
    return new Position2D(x);
  }

  static buildFromArr([x, y]) {
    return new Position2D(x, y);
  }

  static buildFromStc({ x, y }) {
    return new Position2D(x, y);
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get xy() {
    return [this.#x, this.#y];
  }

  add(p2d) {
    return new Position2D(this.#x + p2d.x, this.#y + p2d.y);
  }

  sub(p2d) {
    return new Position2D(this.#x - p2d.x, this.#y - p2d.y);
  }

  addScalar(x) {
    return new Position2D(this.#x + x, this.#y + x);
  }

  subScalar(x) {
    return new Position2D(this.#x - x, this.#y - x);
  }

  multScalar(x) {
    return new Position2D(this.#x * x, this.#y * x);
  }

  map(fmap) {
    return new Position2D(fmap(this.#x), fmap(this.#y));
  }

  length() {
    return Math.sqrt(this.#x ** 2 + this.#y ** 2);
  }

  normalize() {
    return this.multScalar(this.length());
  }
}

export default Position2D;
