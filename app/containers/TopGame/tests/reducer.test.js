
import { fromJS } from 'immutable';
import topGameReducer from '../reducer';

describe('topGameReducer', () => {
  it('returns the initial state', () => {
    expect(topGameReducer(undefined, {})).toEqual(fromJS({}));
  });
});
