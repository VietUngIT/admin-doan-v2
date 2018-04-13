
import { fromJS } from 'immutable';
import topLooseReducer from '../reducer';

describe('topLooseReducer', () => {
  it('returns the initial state', () => {
    expect(topLooseReducer(undefined, {})).toEqual(fromJS({}));
  });
});
