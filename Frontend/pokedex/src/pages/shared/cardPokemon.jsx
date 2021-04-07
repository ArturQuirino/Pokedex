import React, { useState } from 'react';
import './cardPokemon.css';
import { obterDadosPokemon,  catchPokemon, soltarPokemon} from '../repositories/api';
import ModalMensagem from '../shared/modalMensagem';

function CardPokemon(props) {
  const [modalAberto, setModalAberto] = useState(false);
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
    const dadosPokemon = await obterDadosPokemon(id);
    const { types, abilities, stat } = dadosPokemon;
    setTypes(types);
    setAbilities(abilities);
    setStat(stat);
    setCardAberto(!cardAberto);
  }

  const handleCatchPokemon = async () => {
    await catchPokemon(id, name);
    setModalAberto(true);
    setCardAberto(false)
  }

  const handleSoltarPokemon = async () => {
    await soltarPokemon(idBanco);
    setModalAberto(true);
    setCardAberto(false);
  }

  const fecharModal = async () => {
    setModalAberto(false);
  }

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
                    S.Atack: {stat.find(s => s.name === 'special-attack').value}
                  </div>
                  <div>
                    S.Defence: {stat.find(s => s.name === 'special-defense').value}
                  </div>
                  <div>
                    Speed: {stat.find(s => s.name === 'speed').value}
                  </div>

                  {tipoCard === 1 && (<button className="card-botao-catch" onClick={handleCatchPokemon}>Capturar</button>)}
                  {tipoCard === 2 && (<button className="card-botao-catch" onClick={handleSoltarPokemon}>Soltar</button>)}
              </div>
            )}    
        </div>
        {tipoCard === 1 && modalAberto && (<ModalMensagem mensagem={ "Pokemon capturado com sucesso!"} modalAberto={modalAberto} callBackParent={(modalAberto) => fecharModal()}></ModalMensagem>)}
        {tipoCard === 2 && modalAberto && (<ModalMensagem mensagem={ "Pokemon solto com sucesso!"} modalAberto={modalAberto} callBackParent={(modalAberto) => fecharModal()}></ModalMensagem>)}
    </div>
  );
}
 
export default CardPokemon;