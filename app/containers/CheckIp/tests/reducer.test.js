
import { fromJS } from 'immutable';
import checkIpReducer from '../reducer';

describe('checkIpReducer', () => {
  it('returns the initial state', () => {
    expect(checkIpReducer(undefined, {})).toEqual(fromJS({}));
  });
});
