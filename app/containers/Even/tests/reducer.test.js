
import { fromJS } from 'immutable';
import evenReducer from '../reducer';

describe('evenReducer', () => {
  it('returns the initial state', () => {
    expect(evenReducer(undefined, {})).toEqual(fromJS({}));
  });
});
