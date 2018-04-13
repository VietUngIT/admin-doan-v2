
import { fromJS } from 'immutable';
import prizeGameReducer from '../reducer';

describe('prizeGameReducer', () => {
  it('returns the initial state', () => {
    expect(prizeGameReducer(undefined, {})).toEqual(fromJS({}));
  });
});
