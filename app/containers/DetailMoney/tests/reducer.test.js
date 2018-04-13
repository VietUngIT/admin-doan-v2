
import { fromJS } from 'immutable';
import detailMoneyReducer from '../reducer';

describe('detailMoneyReducer', () => {
  it('returns the initial state', () => {
    expect(detailMoneyReducer(undefined, {})).toEqual(fromJS({}));
  });
});
