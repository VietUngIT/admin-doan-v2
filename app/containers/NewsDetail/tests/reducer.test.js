
import { fromJS } from 'immutable';
import newsDetailReducer from '../reducer';

describe('newsDetailReducer', () => {
  it('returns the initial state', () => {
    expect(newsDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
