import { getFlippedVideoCanvas } from "./utils/getFlippedVideoCanvas.js";
import { initControls } from "./controls.js";

// app elements
const closeControlButt = document.querySelector("#closeControlButt");
const controls = document.querySelector("#controls");
const artCanvas = document.querySelector("#artCanvas");
const video = document.querySelector("#videoElement");

// set up controls
const params = initControls(controls);

const webcamRes = { w: 800, h: 600 };

// set up controls, webcam etc
export function setup() {
  // hide controls by default and if app is right clicked
  document.addEventListener("dblclick", (e) => {
    e.preventDefault();
    controls.style.display = "inherit";
  });
  controls.style.display = "none";

  closeControlButt.addEventListener("click", () => {
    controls.style.display = "none";
  });

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: webcamRes.w, height: webcamRes.h },
      })
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (error) {
        console.log("video error: ", error);
      });
  }
}

// draw loop
export function draw() {
  const { flipX, flipY } = params;

  const frameCanvas = getFlippedVideoCanvas(
    video,
    webcamRes,
    flipX.value,
    flipY.value
  );

  artCanvas.width = frameCanvas.width;
  artCanvas.height = frameCanvas.height;

  const ctx = artCanvas.getContext("2d");
  ctx.drawImage(frameCanvas, 0, 0);

  window.requestAnimationFrame(draw);
}
