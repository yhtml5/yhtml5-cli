## yhtml5-update-images

An automated tool for compressing and optimizing JPEG or PNG images, 
and then upload to cdn return urls. 

> 压缩图片 => 上传到cdn => 返回url 

### old workflow
* 打开 https://tinypng.com/
* 上传图片
* 下载到文件夹
* 打开 上传图片 cdn 地址
* 上传图片
* 复制链接

### new workflow
* npm run uploadimg
* return url

### start
#### create .config.js in the project root directory
```.config.js
const path = require('path')
const entry1 = path.resolve(__dirname, './images/*.{jpg,png}')

const config = {
  upload: {
    entries: [entry1],
  }
}

module.exports = config
```

> npm i yhtml5-upload-images -g

在 package.json 增加 script
> upload: uploadimg

执行
> npm run upload 
or 
> uploadimg 



### notice 
* 每次只上传一个文件 减轻弱不禁风的 node cdn服务器压力

### other
[imagemin](https://github.com/imagemin/imagemin)





