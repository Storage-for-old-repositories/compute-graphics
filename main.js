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

function rawPutPixelArr(x, y, [r, g, b, a]) {
  const roundedX = Math.round(x);
  const roundedY = Math.round(y);

  if (checkPixelOutborder(roundedX, roundedY)) {
    return false;
  }

  const index = 4 * (canvas.width * roundedY + roundedX);

  data[index + 0] = r;
  data[index + 1] = g;
  data[index + 2] = b;
  data[index + 3] = a;

  return true;
}

function rawPutPixelStc(x, y, { r = 0, g = 0, b = 0, a = 255 }) {
  return putPixelArr(x, y, [r, g, b, a]);
}

/// Draw
///

function putPixelArr(x, y, color) {
  return rawPutPixelArr(
    transPlaneCoordOnViewX(x),
    transPlaneCoordOnViewY(y),
    color
  );
}

function putPixelStc(x, y, { r = 0, g = 0, b = 0, a = 255 }) {
  return putPixelArr(x, y, [r, g, b, a]);
}

/// Other
///

function swapBuffer() {
  context.putImageData(image, 0, 0);
}

//#endregion

void (async () => {
  /**
   *
   */

  // Example

  for (let i = 0; i < 100; ++i) {
    putPixelStc(i, -i, { r: 255 });
  }

  swapBuffer();
})();
