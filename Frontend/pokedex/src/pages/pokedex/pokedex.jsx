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
      <div className="Pokedex-pagina">
        {pokemons.map((pokemon) => (
          <section>{pokemon.name}</section>
        ))}
      </div>
    </main>
  );
};

export default Pokedex;
