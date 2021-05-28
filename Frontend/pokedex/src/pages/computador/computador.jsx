import React, { useEffect, useState } from 'react';
import PokedexService from '../repositories/api';
import CardPokemon from '../shared/cardPokemon';
import './computador.css';

const Computador = () => {
  const [pokemonsCapturados, setPokemonsCapturados] = useState([]);

  useEffect(() => {
    listarTodosPokemonsCapturados();
  }, []);

  const listarTodosPokemonsCapturados = async () => {
    const todosPokemonsCapturados = await PokedexService.getPokemonsCapturados();
    const pokemons = todosPokemonsCapturados.map((pokemon) => {
      return {
        id: pokemon.idPokemon,
        name: pokemon.name,
        catchDate: pokemon.catchDate,
        idPokemonCapturado: pokemon._id
      }
    });

    setPokemonsCapturados(pokemons);
  }

  return( 
    <main className="computador-pagina">
      {pokemonsCapturados.map((pokemon) => ( 
        <CardPokemon pokemon={pokemon} tipoCard={2}/>
      ))}
    </main> 
  );
}
 
export default Computador;