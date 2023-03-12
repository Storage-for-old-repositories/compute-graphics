import { clamp } from "../utils/math/common";

const CHANNEL_LIMIT_LOWER = 0;
const CHANNEL_LIMIT_UPPER = 255;

export class RGBA {
  #r = 0;
  #g = 0;
  #b = 0;
  #a = 0;

  constructor(r, g, b, a) {
    this.#r = r;
    this.#g = g;
    this.#b = b;
    this.#a = a;
  }

  static create(r, g, b, a) {
    return new RGBA(
      RGBA.#channelWrapOrLower(r),
      RGBA.#channelWrapOrLower(g),
      RGBA.#channelWrapOrLower(b),
      RGBA.#channelWrapOrUpper(a)
    );
  }

  /**
   *
   * @param { { r: number | void, g: number | void, b: number | void, a: number | void } } rgbaChannels
   */
  static createFromRGBAChannels({ r, g, b, a }) {
    return RGBA._createRGBA(r, g, b, a);
  }

  static #channelWrapOrLower(channel = CHANNEL_LIMIT_LOWER) {
    return RGBA.#channelWrap(channel);
  }

  static #channelWrapOrUpper(channel = CHANNEL_LIMIT_UPPER) {
    return RGBA.#channelWrap(channel);
  }

  static #channelWrap(channel) {
    return clamp(channel, CHANNEL_LIMIT_LOWER, CHANNEL_LIMIT_UPPER);
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

  /**
   *
   * @param {(component: number) => number} mapper
   */
  map(mapper) {
    return RGBA.create(
      mapper(this.#a),
      mapper(this.#b),
      mapper(this.#g),
      mapper(this.#a)
    );
  }

  /**
   *
   * @param {number} coefficient
   */
  multiplicateIntensity(coefficient) {
    return this.map((component) => component * coefficient);
  }

  /**
   *
   * @param {RGBA} color
   */
  addColor(color) {
    const { r, g, b, a } = color;
    return RGBA.create(this.r + r, this.g + g, this.b + b, this.a + a);
  }
}
