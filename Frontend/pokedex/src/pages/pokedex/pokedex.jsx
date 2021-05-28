import React, { useState, useEffect } from 'react';
import PokedexService from '../repositories/api'
import CardPokemon from '../shared/cardPokemon';
import './pokedex.css';

const Pokedex = () => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        listarTodosPokemons()
    }, [])

    const listarTodosPokemons = async () => {
        const pokemons = await PokedexService.obterTodosPokemons();
        setPokemons(pokemons);
    }

    return ( 
        <main className="pokedex-pagina">
            {pokemons.map((pokemon) => (
                <CardPokemon pokemon={pokemon} tipoCard={1}/>
            ))}
        </main> 
    );
};

export default Pokedex;