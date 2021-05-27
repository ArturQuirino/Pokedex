import React from 'react';
import Renderer from 'react-test-renderer';
import { act, cleanup } from '@testing-library/react';
import Computador from '../../pages/shared/cardPokemon';
import PokedexService from '../../pages/repositories/api';
import { mount } from 'enzyme';
import '../../setupEnzyme';

jest.mock('../../pages/repositories/api', () => {
    return jest.fn().mockImplementation(() => {
      return {getCatchedPokemons: jest.fn()};
    });
  });

beforeEach(() => {
});
afterEach(cleanup);

it('Deve renderizar corretamente', ()=> {
    const tree = Renderer.create(
        <Computador />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
