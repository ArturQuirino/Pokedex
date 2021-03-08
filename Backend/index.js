process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const express = require('express');
const app = express();
const axios = require('axios');
const { MongoClient } = require('mongodb');
var cors = require('cors')
const port = 8080;
app.use(cors());
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env['mongoConnectionString'];
const client = new MongoClient(uri);

app.get('/pokemons/', async (req, res) => {
  try 
  {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
    console.log(response);
    res.send(response.data.results.map(pokemon => {
      return {name: pokemon.name, id: pokemon.url.slice(34).replace('/','')}
    }));
  }
  catch(e) 
  {
    console.error(e);
  }
})

app.get('/pokemons/:id', async (req, res) => {
  try
  {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`);
    console.log(response);
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
  }
  catch(e)
  {
    console.error(e);
  }
})


app.post('/catchedpokemons/:id', async (req, res) => {
  try {
    await client.connect();
    const insertedPokemon = await insertPokemon(req.params.id);
    res.send(insertedPokemon);
  } catch (e) {
    console.error(e);
    res.send(e);
  } finally {
    await client.close();
  }
});

app.get('/catchedpokemons/', async (req, res) => {
  try {
    await client.connect();
    const insertedPokemons = await getInsertedPokemons();
    res.send(insertedPokemons);
  } catch (e) {
    res.send(e);
  } finally {
    await client.close();
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})


const insertPokemon = async (id) => {
  const insertedPokemon = await client.db("Pokedex").collection('PokemonsCapturados').insertOne({idPokemon: id});
  return insertedPokemon;
}

const getInsertedPokemons = async () => {
  const insertedPokemons = await client.db("Pokedex").collection('PokemonsCapturados').find({}, {}).toArray();
  return insertedPokemons;
}