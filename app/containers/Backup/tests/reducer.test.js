
import { fromJS } from 'immutable';
import backupReducer from '../reducer';

describe('backupReducer', () => {
  it('returns the initial state', () => {
    expect(backupReducer(undefined, {})).toEqual(fromJS({}));
  });
});
