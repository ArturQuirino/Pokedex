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

  async capturarPokemon(id, name) {
    const pokemonsCapturados = await axios.post(`http://localhost:8080/pokemonscapturados/${id}`, {name});
    return pokemonsCapturados.data;
  },

  async getPokemonsCapturados() {
    const pokemonsCapturados = await axios.get(`http://localhost:8080/pokemonscapturados/`);
    return pokemonsCapturados.data;
  },

  async soltarPokemon(id) {
    const pokemonSolto = await axios.delete(`http://localhost:8080/pokemonscapturados/${id}`);
    return pokemonSolto.data;
  }
}

export default PokedexService;
