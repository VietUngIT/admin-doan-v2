
import { fromJS } from 'immutable';
import eventGameReducer from '../reducer';

describe('eventGameReducer', () => {
  it('returns the initial state', () => {
    expect(eventGameReducer(undefined, {})).toEqual(fromJS({}));
  });
});
