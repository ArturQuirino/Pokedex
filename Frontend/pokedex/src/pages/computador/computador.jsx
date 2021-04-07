import React, { useState, useEffect } from 'react';
import './computador.css';
import { getCatchedPokemons } from '../repositories/api';
import CardPokemon from '../shared/cardPokemon';

const Computador = () => {
  const [pokemonsCapturados, setPokemonsCapturados] = useState([]);

  useEffect(() => {
    listarPokemonsCapturados();
  }, []);

  const listarPokemonsCapturados = async () => {
    const pokemonsCapturadosRetorno  = await getCatchedPokemons();
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
