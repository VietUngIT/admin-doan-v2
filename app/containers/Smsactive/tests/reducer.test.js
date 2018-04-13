
import { fromJS } from 'immutable';
import smsactiveReducer from '../reducer';

describe('smsactiveReducer', () => {
  it('returns the initial state', () => {
    expect(smsactiveReducer(undefined, {})).toEqual(fromJS({}));
  });
});
