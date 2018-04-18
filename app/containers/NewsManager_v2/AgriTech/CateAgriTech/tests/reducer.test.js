
import { fromJS } from 'immutable';
import cateAgriTechReducer from '../reducer';

describe('cateAgriTechReducer', () => {
  it('returns the initial state', () => {
    expect(cateAgriTechReducer(undefined, {})).toEqual(fromJS({}));
  });
});
