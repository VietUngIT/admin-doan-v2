
import { fromJS } from 'immutable';
import countHdhReducer from '../reducer';

describe('countHdhReducer', () => {
  it('returns the initial state', () => {
    expect(countHdhReducer(undefined, {})).toEqual(fromJS({}));
  });
});
