import React, { useState, useEffect } from 'react';
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
    listarPokemonsCapturados();
    setPokemonsCapturadosFiltrados(pokemonsCapturados)

    if (filtro !== '') {
      const pokemonsCapturadosFiltrados = pokemonsCapturados.filter(pok => pok.name.includes(filtro));
      setPokemonsCapturadosFiltrados(pokemonsCapturadosFiltrados);
    }
  }, [filtro, pokemonsCapturados]);

  const listarPokemonsCapturados = async () => {
    const pokemonsCapturadosRetorno  = await PokedexService.getCatchedPokemons();
    const pokemons = pokemonsCapturadosRetorno.map(pok => {
      return {
        id: pok.idPokemon,
        name: pok.name,
        catchDate: pok.catchDate,
        idPokemonCapturado: pok._id
      }
    });
    setPokemonsCapturados(pokemons);
  };

  const fecharModal = () => {
    setModalAberto(false);
    document.getElementById("card-computador-root").style.filter = 'none';
  };

  const abrirModal = () => {
    setModalAberto(true);
    document.getElementById("card-computador-root").style.filter = 'blur(5px)';
  };

  return (
    <main className="computador-pagina">
      <div id="card-computador-root" className="card-computador-pagina">
        {pokemonsCapturadosFiltrados.map((pok) => (
          <CardPokemon pokemon={pok} tipoCard={2} idBanco={pok.idPokemonCapturado}  modalAberto={modalAberto} callBackParent={(modalAberto) => abrirModal()}/>
        ))}
        </div>

      {modalAberto && (<ModalMensagem id="modal-computador-root" mensagem={ "Pokemon solto com sucesso!"} modalAberto={modalAberto} callBackParent={(modalAberto) => fecharModal()}></ModalMensagem>)}
    </main>
  );
};

export default Computador;
