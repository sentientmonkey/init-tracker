import React from 'react';
import './App.css';
import Initiative from './Initiative';
import PrimaryNav from './PrimaryNav';
import Main from './Main';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <PrimaryNav />
      <Main>
        <Initiative />
      </Main>
      <Footer />
    </div>
  );
}

export default App;
