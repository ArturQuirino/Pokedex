import React from 'react';
import './cardPokemon.css';

function CardPokemon(props) {
  const {name, url} = props

  return ( 
    <div className="Card-externo">
        <img src={url} className=""/>
        <div className="Card-nome"> {name} </div>
        <div className="Card-dropdown">
            <div className="Card-botao"> + </div>
            <div className="Card-dropdown-aberto">
                Teste
            </div>
        </div>    
    </div> 
  );
}
 
export default CardPokemon;