import React, { useEffect, useState } from 'react';
import PokedexService from '../repositories/api';
import CardPokemon from '../shared/cardPokemon';
import ModalMensagem from '../shared/modalMensagem';
import './computador.css';

const Computador = (props) => {
  const [modalAberto, setModalAberto] = useState(false);
  const [pokemonsCapturados, setPokemonsCapturados] = useState([]);
  const [pokemonsCapturadosFiltrados, setPokemonsCapturadosFiltrados] = useState([]);
  const { filtro } = props;

  useEffect(() => {
    listarTodosPokemonsCapturados();
    setPokemonsCapturadosFiltrados(pokemonsCapturados);

    if (filtro !== '') {
      const pokemonsCapturadosFiltrados = pokemonsCapturados.filter((pok) => pok.name.includes(filtro));
      setPokemonsCapturadosFiltrados(pokemonsCapturadosFiltrados);
    }

  }, [filtro, pokemonsCapturados]);

  const listarTodosPokemonsCapturados = async () => {
    const todosPokemonsCapturados = await PokedexService.getPokemonsCapturados();
    const pokemons = todosPokemonsCapturados.map((pokemon) => {
      return {
        id: pokemon.idPokemon,
        name: pokemon.name,
        catchDate: pokemon.catchDate,
        idPokemonCapturado: pokemon._id
      }
    });

    setPokemonsCapturados(pokemons);
  }

  const fecharModal = () => {
    setModalAberto(false);
    document.getElementById("card-computador-root").style.filter = 'none';

  };

  const abrirModal = () => {
    setModalAberto(true);
    document.getElementById("card-computador-root").style.filter = 'blur(5px)';

  };

  return( 
    <main className="computador-pagina">

      <div className="card-computador-pagina" id="card-computador-root">
        {pokemonsCapturadosFiltrados.map((pokemon) => ( 
          <CardPokemon pokemon={pokemon} modalAberto={modalAberto} callBackParent={(modalAberto) => abrirModal()} tipoCard={2}/>
        ))}
      </div>

      {modalAberto && (<ModalMensagem mensagem={"Pokemon foi solto com sucesso!"} modalAberto={modalAberto} callBackParent={() => fecharModal()}></ModalMensagem>)}
    </main> 
  );
}
 
export default Computador;