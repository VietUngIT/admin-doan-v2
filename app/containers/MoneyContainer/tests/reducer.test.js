
import { fromJS } from 'immutable';
import moneyContainerReducer from '../reducer';

describe('moneyContainerReducer', () => {
  it('returns the initial state', () => {
    expect(moneyContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
