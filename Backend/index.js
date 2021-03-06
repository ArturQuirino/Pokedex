process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const express = require('express');
const app = express();
const axios = require('axios');
const { MongoClient } = require('mongodb');
var mongodb = require('mongodb');
var cors = require('cors')
const port = 8080;
app.use(cors());
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());

const uri = process.env['mongoConnectionString'];

app.get('/pokemons/', async (req, res) => {
  try 
  {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
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
    const pokemon = await obterDetalhesPokemon(req.params.id);
    res.send(pokemon);
  }
  catch(e)
  {
    console.error(e);
  }
})


app.post('/catchedpokemons/:id', async (req, res) => {
  try {
    const client = new MongoClient(uri, {useNewUrlParser: true});
    await client.connect();
    const { name } = req.body; 
    const pokemonInserido = await insertPokemon(req.params.id, name, client);
    res.send(pokemonInserido);
  } catch (e) {
    console.error(e);
    res.send(e);
    await client.close();
  }
});

app.get('/catchedpokemons/', async (req, res) => {
  try {
    const client = new MongoClient(uri, {useNewUrlParser: true});
    await client.connect();
    const pokemonsInseridos = await getInsertedPokemons(client);
    await client.close();
    res.send(pokemonsInseridos);
  } catch (e) {
    await client.close();
    res.send(e);
  }
});

app.get('/soltarpokemon/:id', async (req, res) => {
  try {
    const client = new MongoClient(uri, {useNewUrlParser: true});
    await client.connect();
    const pokemonDeletado = await deletePokemon(req.params.id, client);
    await client.close();
    res.send(pokemonDeletado);
  } catch (e) {
    await client.close();
    res.send(e);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

const deletePokemon = async (id, client) => {
  const pokemonDeletado = await client.db("Pokedex").collection('PokemonsCapturados').deleteOne({_id: new mongodb.ObjectID(id)});
  return pokemonDeletado;
}

const insertPokemon = async (id, name, client) => {
  const catchDate = new Date();
  const pokemonInserido = await client.db("Pokedex").collection('PokemonsCapturados').insertOne({idPokemon: id, name: name, catchDate: catchDate});
  return pokemonInserido;
}

const getInsertedPokemons = async (client) => {
  const pokemonsInseridos = await client.db("Pokedex").collection('PokemonsCapturados').find({}, {}).toArray();
  return pokemonsInseridos;
}

async function obterDetalhesPokemon(id) {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = {
    id: response.data.id,
    name: response.data.name,
    types: response.data.types.map(type => type.type.name),
    abilities: response.data.abilities.map(ability => ability.ability.name),
    stat: response.data.stats.map(stat => {
      return { name: stat.stat.name, value: stat.base_stat };
    })
  };
  return pokemon;
}
