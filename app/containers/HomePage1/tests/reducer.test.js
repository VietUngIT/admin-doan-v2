
import { fromJS } from 'immutable';
import homePage1Reducer from '../reducer';

describe('homePage1Reducer', () => {
  it('returns the initial state', () => {
    expect(homePage1Reducer(undefined, {})).toEqual(fromJS({}));
  });
});
