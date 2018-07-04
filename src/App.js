import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './App.css';
import Initiative from './Initiative.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Initiative Tracker
            </Typography>
          </Toolbar>
        </AppBar>
        <main className="App-main">
          <Initiative />
        </main>
      </div>
    );
  }
}

export default App;
