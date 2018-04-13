
import { fromJS } from 'immutable';
import moneyTotalReducer from '../reducer';

describe('moneyTotalReducer', () => {
  it('returns the initial state', () => {
    expect(moneyTotalReducer(undefined, {})).toEqual(fromJS({}));
  });
});
