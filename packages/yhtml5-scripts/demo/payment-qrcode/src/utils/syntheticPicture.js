
function load(img, callback) {
  var beauty = new Image();
  console.log(beauty)
  beauty.src = img;
  if (beauty.complete) {
    callback(beauty)
  } else {
    beauty.onload = function () {
      callback(beauty)
    };
    beauty.onerror = function (e) {
      console.log('美女加载失败，请重试');
      console.log(e);
    }
  }
}

function convertCanvasToImage(canvas) {
  var image = new Image();
  image.src = canvas.toDataURL("image/png");
  return image;
}

export {
  load,
  convertCanvasToImage
}
