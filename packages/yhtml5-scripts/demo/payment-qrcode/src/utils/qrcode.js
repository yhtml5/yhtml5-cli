let qrcodeDiv = document.createElement('div')
// a.href = encodeURI(url)
// a.download = name
qrcodeDiv.id = 'qrcode'
qrcodeDiv.style.display = 'none'
// a.click()
document.body.appendChild(qrcodeDiv)
// document.getElementById(name).click()
// document.body.removeChild(document.getElementById(name))
// a = null

var qrcode = new QRCode(document.getElementById("qrcode"), {
  width: 400,
  height: 400,
  colorDark : "#000000",
	colorLight : "#ffffff",
  correctLevel : QRCode.CorrectLevel.H  //H:2 L:1 M:0 Q:3
});

function makeCode({ text = '' }) {
  // var elText = document.getElementById("text");
  // if (!elText.value) {
  //   console.log("Input a text");
  //   // elText.focus();
  //   return;
  // }

  console.log('\nqrcode.js\n',{
    text,
    QRCode,
    qrcode
  })

  qrcode.makeCode(text)
}



export {
  qrcode,
  makeCode
}
