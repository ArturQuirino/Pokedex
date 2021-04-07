import axios from 'axios';

export const obterTodosPokemons = async () => {
  const pokemonsResponse = await axios.get(`http://localhost:8080/pokemons`);
  return pokemonsResponse.data;
}

export const obterDadosPokemon = async (id) => {
  const dadosPokemonResponse = await axios.get(`http://localhost:8080/pokemons/${id}`);
  return dadosPokemonResponse.data;
}

export const catchPokemon = async (id, name) => {
  const catchedPokemonResponse = await axios.post(`http://localhost:8080/catchedpokemons/${id}`, {name});
  return catchedPokemonResponse.data;
}

export const getCatchedPokemons = async () => {
  const catchedPokemonResponse = await axios.get(`http://localhost:8080/catchedpokemons/`);
  return catchedPokemonResponse.data;
}

export const soltarPokemon = async (id) => {
  const pokemonDeletado = await axios.get(`http://localhost:8080/soltarpokemon/${id}`)
  return pokemonDeletado;
}


