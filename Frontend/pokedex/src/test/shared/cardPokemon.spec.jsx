import React from 'react';
import Renderer from 'react-test-renderer';
import { act, cleanup } from '@testing-library/react';
import CardPokemon from '../../pages/computador/computador';
import PokedexService from '../../pages/repositories/api';
import { mount } from 'enzyme';
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
    const pokemon = {
        id: "001",
        name: "Bulbasaur",
        catchDate: "27/05/2021",
        idPokemonCapturado: "001"
    };

    const tree = Renderer.create(
        <CardPokemon pokemon={pokemon} tipoCard={1}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});