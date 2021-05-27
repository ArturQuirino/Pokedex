import React, { useState, useEffect } from 'react';
import PokedexService from '../repositories/api';
import CardPokemon from '../shared/cardPokemon';
import './computador.css';

const Computador = () => {
  const [pokemonsCapturados, setPokemonsCapturados] = useState([]);

  useEffect(() => {
    listarPokemonsCapturados();
  }, []);

  const listarPokemonsCapturados = async () => {
    const pokemonsCapturadosRetorno  = await PokedexService.getCatchedPokemons();
    const pokemons = pokemonsCapturadosRetorno.map(pok => {
      return {
        id: pok.idPokemon,
        name: pok.name,
        catchDate: pok.catchDate,
        idPokemonCapturado: pok._id
      }
    });
    setPokemonsCapturados(pokemons);
  };

  return (
    <main className="computador-pagina">
      {pokemonsCapturados.map((pok) => (
        <CardPokemon pokemon={pok} tipoCard={2} idBanco={pok.idPokemonCapturado}/>
      ))}
    </main>
  );
};

export default Computador;
