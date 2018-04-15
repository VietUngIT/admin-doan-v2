
import { fromJS } from 'immutable';
import listNewsReducer from '../reducer';

describe('listNewsReducer', () => {
  it('returns the initial state', () => {
    expect(listNewsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
