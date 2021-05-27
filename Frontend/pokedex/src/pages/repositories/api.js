import axios from 'axios';

const PokedexService = {

  async obterTodosPokemons() {
    const pokemonsResponse = await axios.get(`http://localhost:8080/pokemons`);
    return pokemonsResponse.data;
  },

  async obterDadosPokemon(id) {
    const dadosPokemonResponse = await axios.get(`http://localhost:8080/pokemons/${id}`);
    return dadosPokemonResponse.data;
  },

  async catchPokemon(id, name) {
    const catchedPokemonResponse = await axios.post(`http://localhost:8080/catchedpokemons/${id}`, {name});
    return catchedPokemonResponse.data;
  },

  async getCatchedPokemons() {
    const catchedPokemonResponse = await axios.get(`http://localhost:8080/catchedpokemons/`);
    return catchedPokemonResponse.data;
  },

  async soltarPokemon(id) {
    const pokemonDeletado = await axios.get(`http://localhost:8080/soltarpokemon/${id}`)
    return pokemonDeletado;
  }
}

export default PokedexService;


