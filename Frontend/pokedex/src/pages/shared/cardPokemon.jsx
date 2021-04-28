import React, { useState } from 'react';
import { obterDadosPokemon } from '../repositories/api'
import './cardPokemon.css';

const CardPokemon = (props) => {

  const [cardAberto, setCardAberto] = useState(false);
  const [types, setTypes] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [stat, setStat] = useState([]);
  const { pokemon } = props;
  const { name, id } = pokemon;
  const urlImagem = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

  const abrirDropdown = async () => {
    const detalhesPokemon = await obterDadosPokemon(id);
    const { types, abilities, stat } = detalhesPokemon;
    setTypes(types);
    setAbilities(abilities);
    setStat(stat); 
    setCardAberto(!cardAberto);
  }

  return ( 
    <div className="card-externo">
      <img src={urlImagem} className="card-imagem"/>
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
            
            <button className="card-botao-catch">Capturar</button>
          </div>
        )}
      </div>
    </div>
  );
}
 
export default CardPokemon;