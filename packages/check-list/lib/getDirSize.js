const fs = require('fs')
const path = require('path')

function getDirSize(dir) {
    const fsStat = fs.lstatSync(dir)
    // 可能或遇到link造成循环
    if (fsStat.isDirectory()) {
        let size = 0
        const _dirs = fs.readdirSync(dir)
        _dirs.forEach(_dir => {
            size += getDirSize(path.resolve(dir, _dir))
        })
        return size
    } else if (fsStat.isFile()) {
        if (/\.DS_Store/.test(dir)) {
            return 0
        }
        return fsStat.size
    } else {
        return 0
    }
}

// /**
//  * 获取指定目录内所有文件大小总和  单位为字节
//  * @param dir
//  * @param callback
//  */
// function getdirsizeAsync(dir, callback) {
//     var size = 0
//     fs.stat(dir, function (err, stats) {
//         //如果出错
//         if (err) return callback(err)
//         //如果是文件
//         if (stats.isFile()) return callback(null, stats.size)

//         //如果是目录
//         fs.readdir(dir, function (err, files) {
//             //如果遍历目录出错
//             if (err) return callback(err)
//             //如果目录是空的
//             if (files.length == 0) return callback(null, 0)
//             var count = files.length//哨兵变量
//             for (var i = 0; i < files.length; i++) {
//                 getdirsize(path.join(dir, files[i]), function (err, _size) {
//                     if (err) return callback(err)
//                     size += _size
//                     //如果目录中所有文件(或目录)都遍历完成
//                     if (--count <= 0) {
//                         callback(null, size)
//                     }
//                 })
//             }
//         })
//     })
// }

module.exports = getDirSize
