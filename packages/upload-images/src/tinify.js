const path = require('path')
const fs = require('fs')
const shell = require('shelljs')
const tinify = require("tinify");

const appDirectory = fs.realpathSync(process.cwd());
const imagedDirectory = path.resolve(appDirectory, 'imaged');

tinify.key = "nWb9GUZpm4uEwIc2WjJtg8tBFf18reh5";
// tinify.proxy = "http://user:pass@192.168.0.1:8080";

console.log('\nimagedDirectory\n', {
  imagedDirectory
})

shell.rm('-rf', imagedDirectory)
shell.mkdir('-p', imagedDirectory)

const source = tinify.fromFile("./images/1522658202.png");
source.toFile("./imaged/1522658202.jpg");


