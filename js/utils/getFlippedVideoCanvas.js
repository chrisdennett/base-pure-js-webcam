export function getFlippedVideoCanvas(video, webcamRes, flipX, flipY) {
  const frameCanvas = document.createElement("canvas");
  frameCanvas.width = webcamRes.w;
  frameCanvas.height = webcamRes.h;
  const frameCtx = frameCanvas.getContext("2d");

  const scaleX = flipX ? -1 : 1;
  const scaleY = flipY ? -1 : 1;
  const translateX = flipX ? frameCanvas.width : 0;
  const translateY = flipY ? frameCanvas.height : 0;

  frameCtx.translate(translateX, translateY);
  frameCtx.scale(scaleX, scaleY);

  frameCtx.drawImage(video, 0, 0);

  return frameCanvas;
}
