
import { fromJS } from 'immutable';
import listNewsAgriTechReducer from '../reducer';

describe('listNewsAgriTechReducer', () => {
  it('returns the initial state', () => {
    expect(listNewsAgriTechReducer(undefined, {})).toEqual(fromJS({}));
  });
});
