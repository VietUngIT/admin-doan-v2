
import { fromJS } from 'immutable';
import eventParentReducer from '../reducer';

describe('eventParentReducer', () => {
  it('returns the initial state', () => {
    expect(eventParentReducer(undefined, {})).toEqual(fromJS({}));
  });
});
