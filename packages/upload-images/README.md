## yhtml5-update-images

An automated tool for compressing and optimizing JPEG or PNG images,
and then upload to cdn return urls.

1. Compress picture
2. Upload images to cdn
3. Return url

## start

### Create .config.js under the picture folder
Read the config in the root directory by default

```js
const path = require('path')
const entry1 = path.resolve(__dirname, './images/*.{jpg,png}')

const config = {
  upload: {
    entries: [entry1],
  }
}

module.exports = config
```

### use in the global
> npm i @yhtml5/upload-images -g
> upload /path/to/config.js


## old workflow
* open https://tinypng.com/
* upload images
* download images
* open upload images tool
* upload images
* copy image link

## new workflow
* npm run upload
* return url

## notice
* Uploading one file at a time can reduce server load in several ways

## other
[imagemin](https://github.com/imagemin/imagemin)
