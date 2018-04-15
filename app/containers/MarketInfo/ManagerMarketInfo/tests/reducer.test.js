
import { fromJS } from 'immutable';
import managerMarketInfoReducer from '../reducer';

describe('managerMarketInfoReducer', () => {
  it('returns the initial state', () => {
    expect(managerMarketInfoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
