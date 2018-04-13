
import { fromJS } from 'immutable';
import daiLyReducer from '../reducer';

describe('daiLyReducer', () => {
  it('returns the initial state', () => {
    expect(daiLyReducer(undefined, {})).toEqual(fromJS({}));
  });
});
