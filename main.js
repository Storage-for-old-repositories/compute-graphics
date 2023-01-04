import Position2D from "./src/position2d.js";
import Position3D from "./src/position3d.js";
import ColorRGBA from "./src/colorRGBA.js";

//#region Init data
const canvas = document.getElementById("view");
const context = canvas.getContext("2d");

let image = context.createImageData(canvas.width, canvas.height);
let data = image.data;

let __w = canvas.width;
let __h = canvas.height;

//#endregion

//#region Methods for work data

/// Buffers
///

function checkResizeCanvas() {
  if (__w !== canvas.width || __h !== canvas.height) {
    __w = canvas.width;
    __h = canvas.height;

    image = context.createImageData(canvas.width, canvas.height);
    data = image.data;
  }
}

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

function checkPointOutborderView(p2d) {
  const [x, y] = p2d.xy;

  if (x < 0 || y < 0) {
    return true;
  }

  if (x > getViewW() - 1 || y > getViewH() - 1) {
    return true;
  }

  return false;
}

/// Transform coordinates
///

function transPlaneCoordOnView(p2d) {
  return new Position2D(getViewW() / 2 + p2d.x, getViewH() / 2 - p2d.y);
}

/// Raw draw
///

function rawPutPixel(p2d, color) {
  const p2dRound = p2d.map(Math.round);

  if (checkPointOutborderView(p2dRound)) {
    return false;
  }

  const index = 4 * (getViewW() * p2dRound.y + p2dRound.x);

  data[index + 0] = color.r;
  data[index + 1] = color.g;
  data[index + 2] = color.b;
  data[index + 3] = color.a;

  return true;
}

/// Draw
///

function putPixel(p2d, color) {
  return rawPutPixel(transPlaneCoordOnView(p2d), color);
}

/// Other
///

function swapBuffer() {
  context.putImageData(image, 0, 0);
}

/// Transform 3d
///

//#endregion

void (async () => {
  const frameRender = () => {
    checkResizeCanvas();

    render(getViewW(), getViewH());

    swapBuffer();
  };

  frameRender();
})();

/// Render
///

function render(width, height) {
  /**
   * Example
   */

  for (let i = 0; i < 100; ++i) {
    putPixel(new Position2D(i, -i), ColorRGBA.buildFromStc({ r: 255 }));
  }
}
