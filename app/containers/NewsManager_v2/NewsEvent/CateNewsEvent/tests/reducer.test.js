
import { fromJS } from 'immutable';
import cateNewsEventReducer from '../reducer';

describe('cateNewsEventReducer', () => {
  it('returns the initial state', () => {
    expect(cateNewsEventReducer(undefined, {})).toEqual(fromJS({}));
  });
});
