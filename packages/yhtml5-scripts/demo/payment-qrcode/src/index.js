/**
 * Author: yhtml5
 * Description: payment-qrcode
 * Reference: http://www.liantu.com/
 * TODO:
 */

'use strick'

import { load, convertCanvasToImage } from './utils/syntheticPicture';
import { makeCode } from './utils/qrcode';
import { downLoad, setHref, downloadFile } from './utils/utils';
import './utils/console';
import './component/css';

// document.getElementById("text").addEventListener('blur', makeCode, false)
// document.getElementById("text").addEventListener('keydown', keydown, false)

document.getElementById("downloadQrcode").addEventListener('click', function name(params) {
  const imageSrc = document.getElementById('payment-card').getElementsByTagName("img")[0].src
  downloadFile('qrcode', imageSrc)
  // downLoad({
  //   url: imageSrc
  // })
})


// function keydown(e) {
//   console.log('keydown')
//   if (e.keyCode === 13) {
//     makeCode();
//   }
// }

// $("#text").
//   on("blur", function () {
//     makeCode();
//   }).
//   on("keydown", function (e) {
//     if (e.keyCode == 13) {
//       makeCode();
//     }
//   });

makeCode({ text: 'http://yhtml5.com' })

// 需要 是 localhost:访问
const paymentCard = document.getElementById('payment-card');
const paymentCardCanvas = document.getElementById("payment-card-canvas");
const ctx = paymentCardCanvas.getContext('2d');

// 图片地址要同源 ，不然会有跨域问题


// const backgroundImage = '../public/background.jpg'

setTimeout(function () {
  const qrcodeImage = document.getElementById('qrcode').getElementsByTagName("img")[0].src
  const backgroundImage = './background.jpg'
  load(backgroundImage, function (image) {
    ctx.drawImage(image, 0, 0, 300, 300);
    load(qrcodeImage, function (image) {
      ctx.drawImage(image, 60, 60, 160, 160);
      load(backgroundImage, function (image) {
        ctx.drawImage(image, 120, 120, 40, 40);
      })
      paymentCard.appendChild(convertCanvasToImage(paymentCardCanvas))
    })
  })

  // setTimeout(function () {
  //   const imageSrc = document.getElementById('payment-card').getElementsByTagName("img")[0].src
  //   let a = document.getElementById('downloadQrcodeA')

  //   setHref({
  //     id: a,
  //     base64: imageSrc
  //   })
  //   // a.download = 'name'
  // }, 100);

}, 100);

console.log('\nindex.js\n', {
  // qrcodeImage
})








