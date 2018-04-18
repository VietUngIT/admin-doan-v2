
import { fromJS } from 'immutable';
import listAgritechReducer from '../reducer';

describe('listAgritechReducer', () => {
  it('returns the initial state', () => {
    expect(listAgritechReducer(undefined, {})).toEqual(fromJS({}));
  });
});
