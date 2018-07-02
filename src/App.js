import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Initiative from './Initiative.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Initative Tracker</h1>
        </header>
        <main className="App-main">
          <Initiative />
        </main>
      </div>
    );
  }
}

export default App;
