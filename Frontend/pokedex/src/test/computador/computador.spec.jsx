import React from 'react';
import Renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';
import Computador from '../../pages/computador/computador';
import PokedexService from '../../pages/repositories/api';
import { shallow } from 'enzyme';
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
      <Computador filtro={''}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});