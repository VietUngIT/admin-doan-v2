
import { fromJS } from 'immutable';
import duyetCardReducer from '../reducer';

describe('duyetCardReducer', () => {
  it('returns the initial state', () => {
    expect(duyetCardReducer(undefined, {})).toEqual(fromJS({}));
  });
});
