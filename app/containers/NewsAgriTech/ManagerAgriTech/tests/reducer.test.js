
import { fromJS } from 'immutable';
import managerAgriTechReducer from '../reducer';

describe('managerAgriTechReducer', () => {
  it('returns the initial state', () => {
    expect(managerAgriTechReducer(undefined, {})).toEqual(fromJS({}));
  });
});
