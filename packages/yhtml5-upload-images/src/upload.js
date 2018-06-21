const fs = require('fs')
const path = require('path')
const request = require('request');
// const async = require('async')

/**
 * 不会按顺序上传
 */
function upload(filesPaths) {
  const promises = filesPaths.map((v, i) => {
    const file = fs.createReadStream(v)
    const formData = {
      projectName: 'FrontEndResource',
      files: [file],
      path: 'frontend',
      usrName: '小二 node',
    };
    return new Promise((resolve, reject) =>
      request.post({
        url: 'http://upload.2dfire-daily.com/upfileandlist',
        formData: formData
      }, function (error, response, body) {
        if (!error) {
          if (response.statusCode == 200) {
            try {
              const obj = JSON.parse(body)
              resolve({ file: v, response: obj })
              // console.log('success');
            } catch (error) {
              console.error(error);
            }
          } else {
            console.error('upload failed:', response.statusCode);
            reject()
          }
        } else {
          console.error('upload failed:', err);
          reject()
        }
      })
    )
  })

  return Promise.all(promises)
    .then((posts) => posts)
    .catch((e) => { console.error(e) });
}

// function upload(filesPaths) {
//   const files = filesPaths.map((v) => fs.createReadStream(v))
//   const formData = {
//     files: files,
//     path: 'frontend',
//     usrName: 'yhtml5-scripts',
//     projectName: 'FrontEndResource',
//   };
//   return new Promise((resolve, reject) =>
//     request.post({
//       url: 'http://upload.2dfire-daily.com/upfileandlist',
//       formData: formData
//     }, function (error, response, body) {
//       if (!error) {
//         if (response.statusCode == 200) {
//           try {
//             const obj = JSON.parse(body)
//             resolve(obj)
//             console.log('success');
//           } catch (error) {
//             console.error(error);
//           }
//         } else {
//           console.error('upload failed:', response.statusCode);
//           reject()
//         }
//       } else {
//         console.error('upload failed:', err);
//         reject()
//       }
//     })
//   )
// }



// function upload(filesPath) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({ a: 1, b: filesPath })
//     }, 1000)
//   })
// }

// /**
//  * 启用 异步多线程 async mapLimit
//  */

// function run() {


//   const out_list = []

//   async.mapLimit(
//     data.files_om,
//     5,   // 5 个线程
//     function (item, callback) {

//       // 补全 目录
//       let file_path = '/Users/qilei/Code/2D/static-om/' + item

//       // 判断 是否存在
//       fs.exists(file_path, function (e) {
//         console.log(file_path);

//         // 压缩 图片
//         // let n = item.replace(/\//g, '_')
//         // let out_path = './out/' + n

//         // let from_callback = function(res) {
//         //     console.log(res);

//         // }

//         // let to_callback = function(res) {
//         //     console.log(res);

//         //     callback(null, {
//         //         image: item,
//         //         // out_path: out_path
//         //     })
//         // }

//         // console.log( out_path );

//         // let source = tinify.fromFile(file_path, from_callback);
//         // source.toFile(file_path, to_callback);

//         // 上传 图片
//         upload(file_path, function (res) {
//           let json = JSON.parse(res)
//           if (json.code == 1) {
//             let img_url = 'https://assets.2dfire.com/' + json.data[0]
//             console.log(img_url);


//             let o = {
//               image: item,
//               release: img_url
//             }

//             out_list.push(o)

//             callback(null, o)
//           }
//         })

//       })
//     },

//     function (err, results) {
//       console.log(results);

//       // const str_data = JSON.stringify(results, null, 2)
//       // fs.writeFile('./out/replace.txt', str_data)
//       console.log(out_list);

//       const str_data_2 = JSON.stringify(out_list, null, 2)
//       fs.writeFile('./out/replace.js', str_data_2)
//     }
//   );
// }

// run()

module.exports = upload



