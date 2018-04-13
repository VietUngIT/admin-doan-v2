
import { fromJS } from 'immutable';
import duyetDlReducer from '../reducer';

describe('duyetDlReducer', () => {
  it('returns the initial state', () => {
    expect(duyetDlReducer(undefined, {})).toEqual(fromJS({}));
  });
});
