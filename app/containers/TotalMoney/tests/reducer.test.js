
import { fromJS } from 'immutable';
import totalMoneyReducer from '../reducer';

describe('totalMoneyReducer', () => {
  it('returns the initial state', () => {
    expect(totalMoneyReducer(undefined, {})).toEqual(fromJS({}));
  });
});
