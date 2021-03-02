import React, { useState } from 'react';
import './cardPokemon.css';
import { obterDadosPokemon } from '../repositories/api';

function CardPokemon(props) {
  const [modalAberto, setModalAberto] = useState(false);
  const [types, setTypes] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [stat, setStat] = useState([]);
  const { pokemon } = props
  const { name, id } = pokemon;
  const urlImagem = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

  const abrirDetalhesPokemon = async () => {
    const dadosPokemon = await obterDadosPokemon(id);
    const { types, abilities, stat } = dadosPokemon;
    setTypes(types);
    setAbilities(abilities);
    setStat(stat);
    console.log(stat);
    setModalAberto(!modalAberto);
  }

  return ( 
    <div className="card-externo">
        <img src={urlImagem} className="card-imagem" alt={name}/>
        <div className="card-nome">#{id} - {name} </div>
        <div className="card-dropdown">
            <button className="card-botao" onClick={abrirDetalhesPokemon}> + </button>
            {modalAberto && (
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
              </div>
            )}

            
        </div>
    </div> 
  );
}
 
export default CardPokemon;