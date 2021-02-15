import React, { useState, useEffect } from 'react';
import { obterTodosPokemons } from '../repositories/api';

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    listarTodosPokemons();
  }, []);

  const listarTodosPokemons = async () => {
    const pokemons = await obterTodosPokemons();
    setPokemons(pokemons);
  };

  return (
    <main>
      {pokemons.map((pokemon) => (
        <section>{pokemon.name}</section>
      ))}
    </main>
  );
};

export default Pokedex;
