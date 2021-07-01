import React, { useState, useEffect } from 'react';
import PokedexService from '../repositories/api';
import CardPokemon from '../shared/cardPokemon'
import ModalMensagem from '../shared/modalMensagem';
import './pokedex.css';

const Pokedex = (props) => {
  const [modalAberto, setModalAberto] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsFiltrados, setPokemonsFiltrados] = useState([]);
  const { filtro } = props;
 
  useEffect(() => {
    listarTodosPokemons();
    setPokemonsFiltrados(pokemons);

    if (filtro !== '') {
      const pokemonsFiltrados = pokemons.filter(pok => pok.name.includes(filtro))
      setPokemonsFiltrados(pokemonsFiltrados)
    }

  }, [filtro, pokemons]);

  const listarTodosPokemons = async () => {
    const pokemons = await PokedexService.obterTodosPokemons();
    setPokemons(pokemons);
  };

  const fecharModal = () => {
    setModalAberto(false);
    document.getElementById("card-pokedex-root").style.filter = 'none';
  };

  const abrirModal = () => {
    setModalAberto(true);
    document.getElementById("card-pokedex-root").style.filter = 'blur(5px)';
  };

  return (
    <main className="pokedex-pagina">
      <div className="card-pokedex-pagina" id="card-pokedex-root">
        {pokemonsFiltrados.map((pokemon) => (
          <CardPokemon pokemon={pokemon} tipoCard={1} modalAberto={modalAberto} callBackParent={(modalAberto) => abrirModal()}/>
        ))}
      </div>

      {modalAberto && (<ModalMensagem id="modal-pokedex-root" mensagem={ "Pokemon capturado com sucesso!"} modalAberto={modalAberto} callBackParent={(modalAberto) => fecharModal()}></ModalMensagem>)}
    </main>
  );
};

export default Pokedex;
