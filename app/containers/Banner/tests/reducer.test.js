
import { fromJS } from 'immutable';
import bannerReducer from '../reducer';

describe('bannerReducer', () => {
  it('returns the initial state', () => {
    expect(bannerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
