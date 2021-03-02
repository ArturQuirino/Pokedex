import React from 'react';
import './cardPokemon.css';

function CardPokemon(props) {
  const { pokemon } = props
  const { name, id } = pokemon;
  const urlImagem = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

  return ( 
    <div className="card-externo">
        <img src={urlImagem} className="card-imagem" alt={name}/>
        <div className="card-nome"> {name} </div>
        <div className="card-dropdown">
            <div className="card-botao"> + </div>
            <div className="card-dropdown-aberto">
                Teste
            </div>
        </div>    
    </div> 
  );
}
 
export default CardPokemon;