import './App.css';
import Pokédex_logo from './assets/images/Pokédex_logo.webp';

import React, { useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Computador from './pages/computador/computador';
import Pokedex from './pages/pokedex/pokedex';

function App() {

  const [filtro, setFiltro] = useState('');

  const pesquisarPokemon = (event) => {
    setFiltro(event.target.value)
  }

   return (
    <Router>
      <div className="App">

        <header className="App-header">
          <img src={Pokédex_logo} className="App-titulo" alt="Logo Pokemon"/>
          <nav className="App-navbar">
            <Link to="/" className="App-abas-pokedex">Pokedex</Link>
            <Link to="computador" className="App-abas-computador">Computador</Link>
            <input id="search" placeholder="Pesquisar pokémon..." className="App-busca" value={filtro} onChange={pesquisarPokemon}></input>
          </nav>
        </header>

        <Switch>
          <Route path="/computador">
            <Computador filtro={filtro}/>
          </Route>
          <Route path="/">
            <Pokedex filtro={filtro}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
