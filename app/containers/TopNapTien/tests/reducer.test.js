
import { fromJS } from 'immutable';
import topNapTienReducer from '../reducer';

describe('topNapTienReducer', () => {
  it('returns the initial state', () => {
    expect(topNapTienReducer(undefined, {})).toEqual(fromJS({}));
  });
});
