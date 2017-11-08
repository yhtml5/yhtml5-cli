function base64Img2Blob(code) {
  var parts = code.split(';base64,');
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
}

// function downloadFile(fileName, content) {

//   var aLink = document.createElement('a');
//   var blob = base64Img2Blob(content); //new Blob([content]);

//   var evt = document.createEvent("HTMLEvents");
//   evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错
//   aLink.download = fileName;
//   aLink.href = URL.createObjectURL(blob);
//   aLink.dispatchEvent(evt);

// }

function downloadFile(fileName, content){
  var aLink = document.createElement('a');
  var blob = new Blob([content]);
  var evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.dispatchEvent(evt);
  console.log('imageSrc', aLink)
}


// const setHref = ({
//   id = '',
//   base64 = ''
// }) => {
//   const blob = base64Img2Blob(base64);
//   const blobUrl = window.URL.createObjectURL(blob);
//   id.href = blobUrl
// }


// const downLoad = ({
//   name = 'download',
//   url = '',
//   base64 = false,
// }) => {
//   if (process.env.NODE_ENV !== 'production') {
//     if (Object.prototype.toString.call(url) !== '[object String]' && !url) {
//       console.error('The function downLoad url should be a not empty string')
//       return
//     }
//   }

//   const blob = base64Img2Blob(url);
//   const blobUrl = window.URL.createObjectURL(blob);
//   // odownLoad.href = url;
//   // odownLoad.download = "";

//   console.log('\nutils\n', {
//     url,
//     blob,
//     blobUrl
//   })

//   window.open(blobUrl)

//   // let a = document.createElement('a')
//   // a.href = encodeURI(blobUrl)
//   // a.download = name
//   // a.id = name
//   // a.style.display = 'none'
//   // // a.click()
//   // document.body.appendChild(a)
//   // document.getElementById(name).click()
//   // document.body.removeChild(document.getElementById(name))
//   // a = null
// }

export {
  downLoad,
  setHref,
  downloadFile
}
