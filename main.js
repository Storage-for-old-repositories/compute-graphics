//#region Init data
const canvas = document.getElementById("view");
const context = canvas.getContext("2d");

const image = context.createImageData(canvas.width, canvas.height);
const data = image.data;

const coordinateTransformationData = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

//#endregion

//#region Methods for work data

/// Getters
///

function getViewW() {
  return canvas.width;
}

function getViewH() {
  return canvas.height;
}

/// Checks
///

function checkPixelOutborder(x, y) {
  if (x < 0 || y < 0) {
    return true;
  }

  if (x > canvas.width - 1 || y > canvas.height - 1) {
    return true;
  }

  return false;
}

/// Transform coordinates
///

function transPlaneCoordOnViewX(x) {
  return coordinateTransformationData.x + x;
}

function transPlaneCoordOnViewY(y) {
  return coordinateTransformationData.y - y;
}

/// Raw draw
///

function rawPutPixel(x, y, color) {
  const roundedX = Math.round(x);
  const roundedY = Math.round(y);

  if (checkPixelOutborder(roundedX, roundedY)) {
    return false;
  }

  const index = 4 * (canvas.width * roundedY + roundedX);

  data[index + 0] = color.r;
  data[index + 1] = color.g;
  data[index + 2] = color.b;
  data[index + 3] = color.a;

  return true;
}

/// Draw
///

function putPixel(x, y, color) {
  return rawPutPixel(
    transPlaneCoordOnViewX(x),
    transPlaneCoordOnViewY(y),
    color
  );
}

/// Color
///

class ColorRGBA {
  constructor(r = 0, g = 0, b = 0, a = 255) {
    this["#r"] = clamp(r, 0, 255);
    this["#g"] = clamp(g, 0, 255);
    this["#b"] = clamp(b, 0, 255);
    this["#a"] = clamp(a, 0, 255);
  }

  static buildFromArr([r, g, b, a]) {
    return new ColorRGBA(r, g, b, a);
  }

  static buildFromStc({ r, g, b, a }) {
    return new ColorRGBA(r, g, b, a);
  }

  get r() {
    return this["#r"];
  }

  get g() {
    return this["#g"];
  }

  get b() {
    return this["#b"];
  }

  get a() {
    return this["#a"];
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

/// Other
///

function swapBuffer() {
  context.putImageData(image, 0, 0);
}

function clamp(x, min, max) {
  return Math.max(min, Math.min(max, x));
}

//#endregion

void (async () => {
  /**
   *
   */

  // Example

  for (let i = 0; i < 100; ++i) {
    putPixel(i, -i, ColorRGBA.buildFromStc({ r: 255 }));
  }

  swapBuffer();
})();
