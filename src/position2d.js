class Position2D {
  #x = 0;
  #y = 0;

  constructor(x = 0, y = 0) {
    this.#x = x;
    this.#y = y;
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

  map(fmap) {
    return new Position2D(fmap(this.#x), fmap(this.#y));
  }
}

export default Position2D;
