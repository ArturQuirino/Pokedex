import React from 'react';
import Renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';
import CardPokemon from '../../pages/computador/computador';
import PokedexService from '../../pages/repositories/api';
import { shallow } from 'enzyme';
import '../../setupEnzyme';

jest.mock('../../pages/repositories/api', () => {
    return jest.fn().mockImplementation(() => {
      return {obterDadosPokemon: jest.fn(), catchPokemon: jest.fn(), soltarPokemon: jest.fn()};
    });
  });

beforeEach(() => {
});
afterEach(cleanup);

it('Deve renderizar corretamente', ()=> {
    let pokemon = {
        id: "001",
        name: "Bulbasaur",
        catchDate: "27/05/2021",
        idPokemonCapturado: "001"
    };

    const tree = Renderer.create(
        <CardPokemon pokemon={pokemon} tipoCard={1}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

it('Deve obter os dados do pokemon', ()=> {
  let pokemon = {
    id: "001",
    name: "Bulbasaur",
    catchDate: "27/05/2021",
    idPokemonCapturado: "001"
  };

  let dadosPokemon = {
    id: "001",
    name: "Bulbasaur",
    types: ['grass', 'poison'],
    abilities: ['overgrow', 'clorophyl'],
    stat: [{name: 'hp', value: 45}]
  };

  const card = shallow(<CardPokemon pokemon={pokemon} tipoCard={1}/>);
  PokedexService.obterDadosPokemon = jest.fn().mockResolvedValue(dadosPokemon);
  card.find('card-botao').simulate('click');

  expect(PokedexService.obterDadosPokemon).toHaveBeenCalledTimes(1);
})