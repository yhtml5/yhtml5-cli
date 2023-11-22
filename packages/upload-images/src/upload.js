const fs = require('fs')
// const path = require('path')
const request = require('request');
// const async = require('async')

function upload(filesPaths) {
  const promises = filesPaths.map((v, i) => {
    const file = fs.createReadStream(v)
    const formData = {
      projectName: env('UPLOAD_PROJECT_NAME'),
      files: [file],
      path: env('UPLOAD_PATH'),
      usrName: env('UPLOAD_NAME'),
    };
    return new Promise((resolve, reject) =>
      request.post({
        url: env('UPLOAD_URL'),
        formData,
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

module.exports = upload



