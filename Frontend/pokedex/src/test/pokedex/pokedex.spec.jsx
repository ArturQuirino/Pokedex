import React from 'react';
import Renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';
import Pokedex from '../../pages/pokedex/pokedex';
import PokedexService from '../../pages/repositories/api';
import { shallow } from 'enzyme';
import '../../setupEnzyme';

jest.mock('../../pages/repositories/api', () => {
    return jest.fn().mockImplementation(() => {
      return {obterTodosPokemons: jest.fn()};
    });
  });

beforeEach(() => {
});
afterEach(cleanup);

it('Deve renderizar corretamente', ()=> {
    const tree = Renderer.create(
      <Pokedex filtro={''}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Deve obter os pokemons', ()=> {
  const pokemon = {
    id: "001",
    name: "Bulbasaur",
    catchDate: "27/05/2021",
    idPokemonCapturado: "001"
  };

  const pokedex = shallow(<Pokedex filtro={''} />);
  PokedexService.obterTodosPokemons = jest.fn().mockResolvedValue([pokemon]);

  expect(PokedexService.obterTodosPokemons).toHaveBeenCalledTimes(1);
})