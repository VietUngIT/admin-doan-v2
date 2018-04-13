
import { fromJS } from 'immutable';
import accountOnlineReducer from '../reducer';

describe('accountOnlineReducer', () => {
  it('returns the initial state', () => {
    expect(accountOnlineReducer(undefined, {})).toEqual(fromJS({}));
  });
});
