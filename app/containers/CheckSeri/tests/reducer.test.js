
import { fromJS } from 'immutable';
import checkSeriReducer from '../reducer';

describe('checkSeriReducer', () => {
  it('returns the initial state', () => {
    expect(checkSeriReducer(undefined, {})).toEqual(fromJS({}));
  });
});
