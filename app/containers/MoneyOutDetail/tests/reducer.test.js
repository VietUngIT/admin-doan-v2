
import { fromJS } from 'immutable';
import moneyOutDetailReducer from '../reducer';

describe('moneyOutDetailReducer', () => {
  it('returns the initial state', () => {
    expect(moneyOutDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
