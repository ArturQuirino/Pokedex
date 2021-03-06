import React, { useState } from 'react';
import './cardPokemon.css';
import PokedexService from '../repositories/api';

function CardPokemon(props) {
  const [modalAberto, setModalAberto] = useState(props.modalAberto);
  const [cardAberto, setCardAberto] = useState(false);
  const [types, setTypes] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [stat, setStat] = useState([]);
  const [tipoCard] = useState(props.tipoCard);
  const [idBanco] = useState(props.idBanco);
  const { pokemon } = props;
  const { name, id } = pokemon;
  const urlImagem = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

  const abrirDetalhesPokemon = async () => {
    const dadosPokemon = await PokedexService.obterDadosPokemon(id);
    const { types, abilities, stat } = dadosPokemon;
    setTypes(types);
    setAbilities(abilities);
    setStat(stat);
    setCardAberto(!cardAberto);
  };

  const handleCatchPokemon = async () => {
    await PokedexService.catchPokemon(id, name);
    setModalAberto(true);
    setCardAberto(false);
    props.callBackParent(modalAberto);
  };

  const handleSoltarPokemon = async () => {
    await PokedexService.soltarPokemon(idBanco);
    setModalAberto(true);
    setCardAberto(false);
    props.callBackParent(modalAberto);
  };

  return ( 
    <div className="card-externo">
        <img src={urlImagem} className="card-imagem" alt={name}/>
        <div className="card-nome">#{id} - {name} </div>
        <div className="card-dropdown">
            <button className="card-botao" onClick={abrirDetalhesPokemon}> + </button>
            {cardAberto && (
              <div className="card-dropdown-aberto">
                  <div>
                    Type: {types.join(' / ')}
                  </div>
                  <div>
                    Abilities: {abilities.join(' / ')}
                  </div>
                  <div>
                    HP: {stat.find(s => s.name === 'hp').value}
                  </div>
                  <div>
                    Attack: {stat.find(s => s.name === 'attack').value}
                  </div>
                  <div>
                    Defense: {stat.find(s => s.name === 'defense').value}
                  </div>
                  <div>
                    S.Attack: {stat.find(s => s.name === 'special-attack').value}
                  </div>
                  <div>
                    S.Defense: {stat.find(s => s.name === 'special-defense').value}
                  </div>
                  <div>
                    Speed: {stat.find(s => s.name === 'speed').value}
                  </div>

                  {tipoCard === 1 && (<button className="card-botao-catch" onClick={handleCatchPokemon}>Capturar</button>)}
                  {tipoCard === 2 && (<button className="card-botao-catch" onClick={handleSoltarPokemon}>Soltar</button>)}
              </div>
            )}    
        </div>
    </div>
  );
}
 
export default CardPokemon;