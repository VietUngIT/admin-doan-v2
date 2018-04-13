
import { fromJS } from 'immutable';
import sumTxReducer from '../reducer';

describe('sumTxReducer', () => {
  it('returns the initial state', () => {
    expect(sumTxReducer(undefined, {})).toEqual(fromJS({}));
  });
});
