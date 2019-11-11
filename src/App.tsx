import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Initiative from './Initiative';
import PrimaryNav from './PrimaryNav';
import Main from './Main';
import Encounter from './Encounter';
import Footer from './Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <PrimaryNav />
          <Main>
          <Switch>
            <Route path="/encounter">
              <Encounter />
            </Route>
            <Route path="/">
              <Initiative />
            </Route>
          </Switch>
          </Main>
        <Footer />
      </div>
   </Router>
  );
}

export default App;
