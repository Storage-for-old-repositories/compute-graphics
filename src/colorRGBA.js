import { clamp } from "./utils.js";

class ColorRGBA {
  #r = 0;
  #g = 0;
  #b = 0;
  #a = 0;

  constructor(r = 0, g = 0, b = 0, a = 255) {
    this.#r = clamp(r, 0, 255);
    this.#g = clamp(g, 0, 255);
    this.#b = clamp(b, 0, 255);
    this.#a = clamp(a, 0, 255);
  }

  static buildFromArr([r, g, b, a]) {
    return new ColorRGBA(r, g, b, a);
  }

  static buildFromStc({ r, g, b, a }) {
    return new ColorRGBA(r, g, b, a);
  }

  get r() {
    return this.#r;
  }

  get g() {
    return this.#g;
  }

  get b() {
    return this.#b;
  }

  get a() {
    return this.#a;
  }

  get rgba() {
    return [this.r, this.g, this.b, this.a];
  }

  addIntensity(k) {
    return ColorRGBA.buildFromArr(this.rgba.map((c) => c * k));
  }

  addColor(color) {
    const [r, g, b, a] = color.rgba();
    return new ColorRGBA(this.r + r, this.g + g, this.b + b, this.a + a);
  }
}

export default ColorRGBA;
