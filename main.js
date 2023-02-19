import { Vector2D, Vector3D, RGBA, Sphere } from "./src";

//#region Init data

const canvas = document.getElementById("view");
const context = canvas.getContext("2d");

canvas.width = 780;
canvas.height = 780;

let image = context.createImageData(canvas.width, canvas.height);
let data = image.data;

let __w = canvas.width;
let __h = canvas.height;

const camera = {
  position: new Position3D(),
  orientation: new Position3D(0, 0, 1),
  frameSize: new Position2D(1, 1),
  distance: 1,
};

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

function getViewFrameW() {
  const w = getViewW();
  return [-w / 2, w / 2];
}

function getViewFrameH() {
  const h = getViewH();
  return [-h / 2, h / 2];
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
    console.log("[render frame]: start");

    checkResizeCanvas();

    render(getViewW(), getViewH());

    swapBuffer();

    console.log("[render frame]: end");
  };

  frameRender();

  // setInterval(() => {
  //   camera.distance += 0.1;
  //   frameRender();
  // }, 1000 / 24);
})();

/// Render
///

function render(width, height) {
  /**
   * Example
   */

  const coordViewToSpace = (p2d) => {
    return new Position3D(
      (p2d.x * camera.frameSize.x) / getViewW(),
      (p2d.y * camera.frameSize.y) / getViewH(),
      camera.distance
    );
  };

  const [wb, we] = getViewFrameW();
  const [hb, he] = getViewFrameH();

  const spheres = [
    [
      new Sphere(new Position3D(0, -1, 3), 1),
      ColorRGBA.buildFromStc({ r: 255 }),
    ],
    [
      new Sphere(new Position3D(2, 0, 4), 1),
      ColorRGBA.buildFromStc({ b: 255 }),
    ],
    [
      new Sphere(new Position3D(-2, 0, 4), 1),
      ColorRGBA.buildFromStc({ g: 255 }),
    ],
  ];

  const lights = [
    { type: "ambient", intensity: 0.2 },
    { type: "point", intensity: 0.6, position: new Position3D(2, 1, 0) },
    { type: "direction", intensity: 0.2, direction: new Position3D(1, 4, 4) },
  ];

  const minT = 1;
  const maxT = Infinity;

  // Я написал алгоритм провервки пересечения окружности и луча в Godot - ray_collision_circle

  for (let i = wb; i <= we; ++i) {
    for (let j = hb; j <= he; ++j) {
      const direction = coordViewToSpace(new Position2D(i, j));

      let closestT = Infinity;
      let closestSphere = null;

      for (const [sphere, color] of spheres) {
        const [ix, iy] = sphere.intersectRay(camera.position, direction);

        if (ix < closestT && minT < ix && ix < maxT) {
          closestT = ix;
          closestSphere = [sphere, color];
        }

        if (iy < closestT && minT < iy && iy < maxT) {
          closestT = iy;
          closestSphere = [sphere, color];
        }
      }

      if (closestSphere === null) {
        putPixel(new Position2D(i, j), new ColorRGBA(255, 255, 255));
        continue;
      }

      putPixel(new Position2D(i, j), closestSphere[1]);
    }
  }
}
