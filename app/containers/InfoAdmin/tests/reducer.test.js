
import { fromJS } from 'immutable';
import infoAdminReducer from '../reducer';

describe('infoAdminReducer', () => {
  it('returns the initial state', () => {
    expect(infoAdminReducer(undefined, {})).toEqual(fromJS({}));
  });
});
