
import { fromJS } from 'immutable';
import subCategoryMarKetInfoReducer from '../reducer';

describe('subCategoryMarKetInfoReducer', () => {
  it('returns the initial state', () => {
    expect(subCategoryMarKetInfoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
