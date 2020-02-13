import React from 'react';
import './App.css';
import Nav from './Components/Nav';
import routes from './routes';
import { HashRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './dux/store';

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div className="App">
          <Nav />
          {routes}
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App;
