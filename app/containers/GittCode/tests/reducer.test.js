
import { fromJS } from 'immutable';
import gittCodeReducer from '../reducer';

describe('gittCodeReducer', () => {
  it('returns the initial state', () => {
    expect(gittCodeReducer(undefined, {})).toEqual(fromJS({}));
  });
});
