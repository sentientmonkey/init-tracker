import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
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
        <Hidden mdUp>
          <main className="App-main-small">
            <Initiative />
          </main>
        </Hidden>
        <Hidden smDown>
          <main className="App-main-large">
            <Initiative />
          </main>
        </Hidden>
        <footer className="App-footer">
          <p>
          by <a href="http://www.scottwindsor.com">Scott Windsor</a>
           &nbsp; &ndash; &nbsp;
          <a href="http://github.com/sentientmonkey/init-tracker">code</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
