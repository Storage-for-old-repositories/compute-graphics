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

  static _createRGBA(r, g, b, a) {
    return new RGBA(
      RGBA._channelWrapOrLower(r),
      RGBA._channelWrapOrLower(g),
      RGBA._channelWrapOrLower(b),
      RGBA._channelWrapOrUpper(a)
    );
  }

  static _channelWrap(channel) {
    return clamp(channel, CHANNEL_LIMIT_LOWER, CHANNEL_LIMIT_UPPER);
  }

  static _channelWrapOrLower(channel = CHANNEL_LIMIT_LOWER) {
    return RGBA._channelWrap(channel);
  }

  static _channelWrapOrUpper(channel = CHANNEL_LIMIT_UPPER) {
    return RGBA._channelWrap(channel);
  }

  /**
   *
   * @param { [number | void, number | void, number | void, number | void] } rgbaTuple
   * @returns
   */
  static createFromRGBATuple([r, g, b, a]) {
    return RGBA._createRGBA(r, g, b, a);
  }

  /**
   *
   * @param { { r: number | void, g: number | void, b: number | void, a: number | void } } rgbaChannels
   * @returns
   */
  static createFromRGBAChannels({ r, g, b, a }) {
    return RGBA._createRGBA(r, g, b, a);
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
   * @returns { [number, number, number, number] }
   */
  get rgbaTuple() {
    return [this.r, this.g, this.b, this.a];
  }

  get rgbaChannels() {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a,
    };
  }

  /**
   *
   * @param {number} coefficient
   * @returns
   */
  multiplicateIntensity(coefficient) {
    return RGBA.createFromRGBATuple(
      this.rgbaTuple.map((channel) => channel * coefficient)
    );
  }

  /**
   *
   * @param {RGBA} color
   * @returns
   */
  addColor(color) {
    const [r, g, b, a] = color.rgbaTuple;
    return RGBA._createRGBA(this.r + r, this.g + g, this.b + b, this.a + a);
  }
}
