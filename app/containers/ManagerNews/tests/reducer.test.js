
import { fromJS } from 'immutable';
import managerNewsReducer from '../reducer';

describe('managerNewsReducer', () => {
  it('returns the initial state', () => {
    expect(managerNewsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
