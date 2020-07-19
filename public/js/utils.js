let tracker;

function createOptions() {
  imgsConfig.forEach((i, index) => {
    const element = document.createElement("input");
    element.setAttribute("type", "image");
    element.setAttribute("class", "imgs");
    element.setAttribute("src", `./img/${i.id}.png`);
    element.setAttribute("id", `id-${i.id}`);
    element.setAttribute("onclick", `selectImage(${index})`);

    const foo = document.getElementById("images");
    foo.appendChild(element);
  });
}

function selectImage(index) {
  const config = imgsConfig[index];
  let imgView = new Image();
  imgView.src = `./img/${config.id}.png`;
  trackingImage(imgView, config);
}

function trackingImage(imgView, config) {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  if (!tracker) {
    tracker = new tracking.ObjectTracker("face");
    tracker.setInitialScale(4);
    tracker.setStepSize(1);
    tracker.setEdgesDensity(0.1);
    tracking.track("#video", tracker, { camera: true });
  }

  if (!imgView) {
    selectImage(6);
    return;
  }

  tracker.on("track", function (event) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    event.data.forEach(function (rect) {
      context.drawImage(
        imgView,
        rect.x + config.x,
        rect.y + config.y,
        parseInt(rect.width * config.width),
        parseInt(rect.height * config.height)
      );
    });
  });
}

function initApp() {
  createOptions();
  trackingImage();
}
