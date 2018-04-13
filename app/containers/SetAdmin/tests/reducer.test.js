
import { fromJS } from 'immutable';
import setAdminReducer from '../reducer';

describe('setAdminReducer', () => {
  it('returns the initial state', () => {
    expect(setAdminReducer(undefined, {})).toEqual(fromJS({}));
  });
});
