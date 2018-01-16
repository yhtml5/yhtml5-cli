import React from 'react';
import ReactDOM from 'react-dom';
import './global.css'
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import './test/yhtml5Utils';
import mock from './features/mock';
import axios from "axios";
import { square, cube } from './features/treeShake';
// can't treeShake
// const { square, cube } = require('./features/treeShake');
// import treeShake from './features/treeShake';
// treeShake.cube(6)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

cube(5)

axios({
  method: 'get',
  url: 'https://bird.ioliu.cn/joke/rand',
  params: {
    ID: 12345
  },
  data: {
    firstName: 'Fred'
  }
})
  .then(function (response) {
    console.log('\najax success', response)
  });

console.log('\nindex.js\n', {
  process: process,
  'process.env': process.env,
})
