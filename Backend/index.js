const express = require('express');
const app = express();
const axios = require('axios');
const port = 3000;

app.get('/pokemons/', async (req, res) => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
  res.send(response.data.results.map(pokemon => {
    return {name: pokemon.name, id: pokemon.url.slice(34).replace('/','')}
  }));
})

app.get('/pokemons/:id', async (req, res) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`);
  const pokemon = {
    id: response.data.id,
    name: response.data.name,
    types: response.data.types.map(type => type.type.name),
    abilities: response.data.abilities.map(ability => ability.ability.name),
    stat: response.data.stats.map(stat => {
      return {name: stat.stat.name, value: stat.base_stat}
    })
  }
  res.send(pokemon);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})