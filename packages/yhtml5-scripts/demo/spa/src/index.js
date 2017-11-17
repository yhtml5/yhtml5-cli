import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { cube } from './treeShake';
import { square } from './treeShake';

cube(5)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


console.log('\nindex.js\n',{
  process: process,
  'process.env': process.env,
})
