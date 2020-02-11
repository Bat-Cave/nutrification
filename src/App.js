import React from 'react';
import './App.css';
import Nav from './Components/Nav';
import routes from './routes';
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Nav />
        {routes}
      </div>
    </HashRouter>
  );
}

export default App;
