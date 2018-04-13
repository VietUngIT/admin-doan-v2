
import { fromJS } from 'immutable';
import miniGameReducer from '../reducer';

describe('miniGameReducer', () => {
  it('returns the initial state', () => {
    expect(miniGameReducer(undefined, {})).toEqual(fromJS({}));
  });
});
