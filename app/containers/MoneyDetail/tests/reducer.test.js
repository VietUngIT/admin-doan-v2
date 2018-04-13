
import { fromJS } from 'immutable';
import moneyDetailReducer from '../reducer';

describe('moneyDetailReducer', () => {
  it('returns the initial state', () => {
    expect(moneyDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
