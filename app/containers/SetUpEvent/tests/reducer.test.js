
import { fromJS } from 'immutable';
import setUpEventReducer from '../reducer';

describe('setUpEventReducer', () => {
  it('returns the initial state', () => {
    expect(setUpEventReducer(undefined, {})).toEqual(fromJS({}));
  });
});
