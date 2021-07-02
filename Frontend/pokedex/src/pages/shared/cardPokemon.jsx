import React, { useState } from 'react';
import PokedexService from '../repositories/api'
import ModalMensagem from './modalMensagem';
import './cardPokemon.css';

const CardPokemon = (props) => {

  const [modalAberto, setModalAberto] = useState(props.modalAberto);
  const [cardAberto, setCardAberto] = useState(false);
  const [types, setTypes] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [stat, setStat] = useState([]);
  const [ tipoCard ] = useState(props.tipoCard);
  const { pokemon } = props;
  const { name, id, idPokemonCapturado} = pokemon;
  const urlImagem = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

  const abrirDropdown = async () => {
    const detalhesPokemon = await PokedexService.obterDadosPokemon(id);
    const { types, abilities, stat } = detalhesPokemon;
    setTypes(types);
    setAbilities(abilities);
    setStat(stat); 
    setCardAberto(!cardAberto);
  }

  const handleCapturarPokemon = async () => {
    await PokedexService.capturarPokemon(id, name);
    setModalAberto(true);
    setCardAberto(false);
    props.callBackParent(modalAberto);
  }

  const handleSoltarPokemon = async () => {
    await PokedexService.soltarPokemon(idPokemonCapturado);
    setModalAberto(true);
    setCardAberto(false);
    props.callBackParent(modalAberto);
  }

  const fecharModal = () => {
    setModalAberto(false);
  } 

  return ( 
    <div className="card-externo">
      <img src={urlImagem} className="card-imagem" alt="Imagem pokemon"/>
      <h1 className="card-nome">#{id} - {name}</h1>
      <div className="card-dropdown">
        <button className="card-botao" onClick={abrirDropdown}> + </button>
        { cardAberto && (
          <div className="card-dropdown-aberto">
            <div>
              Type: {types.join(" / ")}
            </div>
            <div>
              Abilities: {abilities.join(" / ")}
            </div>
            <div>
              HP: {stat.find(p => p.name === 'hp').value}
            </div>
            <div>
              Attack: {stat.find(p => p.name === 'attack').value}
            </div>
            <div>
              Defense: {stat.find(p => p.name === 'defense').value}
            </div>
            <div>
              Sp.Atk: {stat.find(p => p.name === 'special-attack').value}
            </div>
            <div>
              Sp.Def: {stat.find(p => p.name === 'special-defense').value}
            </div>
            
            {tipoCard===1 && (<button className="card-botao-catch" onClick={handleCapturarPokemon}>Capturar</button>)}
            {tipoCard===2 && (<button className="card-botao-catch" onClick={handleSoltarPokemon}>Soltar</button>)}
          </div>
        )}
      </div>
    </div>
  );
}
 
export default CardPokemon;