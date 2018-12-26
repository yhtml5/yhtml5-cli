// import resolvePlugin from 'rollup-plugin-node-resolve';
import jsonPlugin from 'rollup-plugin-json';
// import commonjsPlugin from 'rollup-plugin-commonjs';
import babelPlugin from 'rollup-plugin-babel';
import uglifyPlugin from 'rollup-plugin-uglify';
const replace = require('rollup-plugin-replace')
// import buble from 'rollup-plugin-buble';
const fs = require('fs')
const path = require('path')
const packageJson = require('./package.json')
const src = path.resolve(__dirname, './src')
const directories = fs.readdirSync(src)
const banner = `/**
* Copyright (c) 2015-present, yhtml5.com, Inc.
* All rights reserved.
*/`
const getEntries = () => {
  let dirs = {};
  directories.forEach((file) => {
    if (/\.js/g.test(file)) {
      const key = file.split('.js')
      dirs[key[0]] = path.resolve(__dirname, 'src', file)
    }
  })
  return dirs
}

const Entry = getEntries() || {}
const input = Object.entries(Entry) || []
const config = input.map((value, index) => {
  const name = value[0]
  const path = value[1]
  return {
    input: path,
    plugins: [
      jsonPlugin(),
      // babelPlugin({
      //   exclude: 'node_modules/**', // only transpile our source code
      // }),
    ],
    // external: ['lodash'],
    output: [{
      // file: `dist/es6/${name}.js`,
      // format: 'es'
    // }, {
    //   banner: banner,
    //   file: `dist/amd/${name}.js`,
    //   format: 'amd'
    // }, {
      banner: banner,
      file: `dist/cmd/${name}.js`,
      format: 'cjs',
      sourcemap: name === 'index',
    }, {
      file: `dist/umd/${name}.js`,
      format: 'umd',
      name: name,
      sourcemap: name === 'index',
    // }, {
    //   banner: banner,
    //   file: `dist/iife/${name}.js`,
    //   format: 'iife',
    //   name: name
    }]
  }
})
const minConfig = input.map((value, index) => {
  const name = value[0]
  const path = value[1]
  return {
    input: path,
    plugins: [
      jsonPlugin(),
      babelPlugin({
        exclude: 'node_modules/**',
      }),
      uglifyPlugin(),
      replace({
        'process.env.NODE_ENV': JSON.stringify( 'production' )
      })
    ],
    output: [{
      banner: banner,
      file: `dist/cmd/${name}.min.js`,
      format: 'cjs'
    }, {
      file: `dist/umd/${name}.min.js`,
      format: 'umd',
      name: name
    }],
  }
})

const rollupConfig = config.concat(minConfig)

export default rollupConfig



