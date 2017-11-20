import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const loadPrint = () => import(/* webpackChunkName: "print" */ './features/lazyload.js')
  .then((result) => result.default)
  .catch(error => `An error occurred while loading the component.\n${error}`);

const loadPrint2 = () => import(/* webpackChunkName: "print2" */ './features/lazyload2.js')
  .then((result) => result.default)
  .catch(error => `An error occurred while loading the component.\n${error}`);

const timer = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

class App extends Component {
  constructor(props) {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    // const print1 = await loadPrint()
    // await timer(1000)
    // print1(1)
    // const print2 = await loadPrint2()
    // print2(2)

    const [print3, print4] = await Promise.all([loadPrint(), loadPrint2()]);
    await timer(1000)
    print3(1)
    print4(2)

    console.log('\nApp.js\n', {})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" onClick={this.handleClick}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
