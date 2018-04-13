
import { fromJS } from 'immutable';
import moneyHistoryReducer from '../reducer';

describe('moneyHistoryReducer', () => {
  it('returns the initial state', () => {
    expect(moneyHistoryReducer(undefined, {})).toEqual(fromJS({}));
  });
});
