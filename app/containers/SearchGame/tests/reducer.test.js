
import { fromJS } from 'immutable';
import searchGameReducer from '../reducer';

describe('searchGameReducer', () => {
  it('returns the initial state', () => {
    expect(searchGameReducer(undefined, {})).toEqual(fromJS({}));
  });
});
