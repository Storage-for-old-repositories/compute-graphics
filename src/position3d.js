class Position3D {
  #x = 0;
  #y = 0;
  #z = 0;

  constructor(x = 0, y = 0, z = 0) {
    this.#x = x;
    this.#y = y;
    this.#z = z;
  }

  static buildFromScalar(x) {
    return new Position3D(x, x, x);
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

  add(p3d) {
    return new Position3D(this.#x + p3d.x, this.#y + p3d.y, this.#z + p3d.z);
  }

  sub(p3d) {
    return new Position3D(this.#x - p3d.x, this.#y - p3d.y, this.#z - p3d.z);
  }

  addScalar(x) {
    return new Position3D(this.#x + x, this.#y + x, this.#z + x);
  }

  subScalar(x) {
    return new Position3D(this.#x - x, this.#y - x, this.#z - x);
  }

  multScalar(x) {
    return new Position3D(this.#x * x, this.#y * x, this.#z * x);
  }

  length() {
    return Math.sqrt(this.#x ** 2 + this.#y ** 2 + this.#z ** 2);
  }

  normalize() {
    return this.multScalar(this.length());
  }

  scalarProduct(p3d) {
    return this.#x * p3d.x + this.#y * p3d.y + this.#z * p3d.z;
  }

  vectorProduct(p3d) {
    return new Position3D(
      this.#y * p3d.z - this.#z * p3d.z,
      this.#z * p3d.x - this.#x * p3d.z,
      this.#x * p3d.y - this.#y * p3d.x
    );
  }
}

export default Position3D;
