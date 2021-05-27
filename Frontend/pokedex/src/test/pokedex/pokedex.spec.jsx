import React from 'react';
import Renderer from 'react-test-renderer';
import { act, cleanup } from '@testing-library/react';
import Pokedex from '../../pages/pokedex/pokedex';
import PokedexService from '../../pages/repositories/api';
import { mount } from 'enzyme';
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
        <Pokedex />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});