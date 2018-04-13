
import { fromJS } from 'immutable';
import xhuReducer from '../reducer';

describe('xhuReducer', () => {
  it('returns the initial state', () => {
    expect(xhuReducer(undefined, {})).toEqual(fromJS({}));
  });
});
