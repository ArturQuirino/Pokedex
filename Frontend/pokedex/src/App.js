import './App.css';

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Computador from './pages/computador/computador';
import Pokedex from './pages/pokedex/pokedex';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>POKEDEX</h1>
          <nav>
            <Link to="/">Pokedex</Link>
            <Link to="computador">Computador</Link>
          </nav>
        </header>

        <Switch>
          <Route path="/computador">
            <Computador />
          </Route>
          <Route path="/">
            <Pokedex />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
