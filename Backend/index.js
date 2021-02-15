const express = require('express');
const app = express();
const axios = require('axios');
const port = 3000;

app.get('/pokemons/', async (req, res) => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
  res.send(response.data);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})