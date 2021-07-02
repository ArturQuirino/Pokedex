import axios from 'axios';

const baseApiUrl = 'https://pokedex-artur-quirino.herokuapp.com/';

const PokedexService = {
  async obterTodosPokemons() {
    const pokemonsResponse = await axios.get(`${baseApiUrl}pokemons`);
    return pokemonsResponse.data;
  },

  async obterDadosPokemon(id) {
    const dadosPokemonResponse = await axios.get(`${baseApiUrl}pokemons/${id}`);
    return dadosPokemonResponse.data;
  },

  async capturarPokemon(id, name) {
    const pokemonsCapturados = await axios.post(`${baseApiUrl}pokemonscapturados/${id}`, {name});
    return pokemonsCapturados.data;
  },

  async getPokemonsCapturados() {
    const pokemonsCapturados = await axios.get(`${baseApiUrl}pokemonscapturados/`);
    return pokemonsCapturados.data;
  },

  async soltarPokemon(id) {
    const pokemonSolto = await axios.delete(`${baseApiUrl}pokemonscapturados/${id}`);
    return pokemonSolto.data;
  }
}

export default PokedexService;
