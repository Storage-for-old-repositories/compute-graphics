class Position3D {
  #x = 0;
  #y = 0;
  #z = 0;

  constructor(x = 0, y = 0, z = 0) {
    this.#x = x;
    this.#y = y;
    this.#z = z;
  }

  static buildFromArr([x, y, z]) {
    return new Position3D(x, y, z);
  }

  static buildFromStc({ x, y, z }) {
    return new Position3D(x, y, z);
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

  get xyz() {
    return [this.#x, this.#y, this.#z];
  }

  map(fmap) {
    return new Position3D(fmap(this.#x), fmap(this.#y), fmap(this.#z));
  }
}

export default Position3D;
