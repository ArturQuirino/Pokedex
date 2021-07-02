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
      <div className="app"></div>
      <header className="app-header">
        <img src={Pokédex_logo} className="app-titulo" alt="Logo pokemon"/>
        <nav className="app-navbar">
            <Link to="/" className="app-abas-pokedex">Pokedex</Link>
            <Link to="computador" className="app-abas-computador">Computador</Link>
            <input id="search" placeholder="Pesquisar pokémon..." className="app-busca"></input>
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
    </Router>
  );
}

export default App;
