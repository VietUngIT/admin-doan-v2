
import { fromJS } from 'immutable';
import subCateAgriTechReducer from '../reducer';

describe('subCateAgriTechReducer', () => {
  it('returns the initial state', () => {
    expect(subCateAgriTechReducer(undefined, {})).toEqual(fromJS({}));
  });
});
