import './App.css';
import Pokédex_logo from './assets/images/Pokédex_logo.webp';

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
          <img src={Pokédex_logo} className="App-titulo"/>
          <nav className="App-navbar">
            <Link to="/" className="App-abas-pokedex">Pokedex</Link>
            <Link to="computador" className="App-abas-computador">Computador</Link>
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
