
import { fromJS } from 'immutable';
import chanIpReducer from '../reducer';

describe('chanIpReducer', () => {
  it('returns the initial state', () => {
    expect(chanIpReducer(undefined, {})).toEqual(fromJS({}));
  });
});
