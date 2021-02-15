import axios from 'axios';

export const obterTodosPokemons = async () => {
  const pokemonsResponse = await axios.get(`http://localhost:8080/pokemons`);
  return pokemonsResponse.data;
}