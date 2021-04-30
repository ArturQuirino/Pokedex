process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const express = require('express');
const app = express();
const axios = require('axios');
var cors = require('cors');
const { MongoClient } = require('mongodb');
var mongodb = require('mongodb');
const port = 8080;
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.json());


const uri = process.env['mongoConnectionString'];

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
    const pokemon = await obterDetalhesPokemon(req.params.id);
    res.send(pokemon);
  }
  catch(e)
  {
    console.error(e);
  }
})


app.post('/pokemonscapturados/:id', async (req, res) => {
  try{
    console.log(uri);
    const client = new MongoClient(uri, {useNewUrlParser: true});
    await client.connect();
    const { name } = req.body;
    const dataDeCaptura = new Date();
    const pokemonInserido = await client.db('Pokedex-Teste').collection('Computador').insertOne({idPokemon: req.params.id, name: name, dataDeCaptura: dataDeCaptura})
    res.send(pokemonInserido);
  }
  catch (e) {
    console.error(e);
    res.send(e)
  }
  finally {
    await client.close();
  }
});

app.get('/pokemonscapturados/', async (req, res) => {
  try{
    const client = new MongoClient(uri, {useNewUrlParser: true});
    await client.connect();
    const pokemonsCapturados = await client.db('Pokedex-Teste').collection('Computador').find({}, {}).toArray();
  
    res.send(pokemonsCapturados);
  }
  catch (e){
    console.error(e);
  }
  finally {
    await client.close();
  }

});

app.delete('/pokemonscapturados/:id', async (req, res) => {
  try{
    const client = new MongoClient(uri, {useNewUrlParser: true});
    await client.connect();
    const pokemonLiberado = await client.db('Pokedex-Teste').collection('Computador').deleteOne({_id: mongodb.ObjectID(req.params.id)})
    res.send(pokemonLiberado);
  }
  catch (e){
    console.error(e);
  }
  finally {
    await client.close();
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

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