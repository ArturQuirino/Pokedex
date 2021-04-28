import axios from 'axios';

export const obterTodosPokemons = async () => {
  const pokemonsResponse = await axios.get(`http://localhost:8080/pokemons`);
  return pokemonsResponse.data;
}

export const obterDadosPokemon = async (id) => {
  const dadosPokemonResponse = await axios.get(`http://localhost:8080/pokemons/${id}`);
  return dadosPokemonResponse.data;
}