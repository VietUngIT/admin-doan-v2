
import { fromJS } from 'immutable';
import slotGameByIdReducer from '../reducer';

describe('slotGameByIdReducer', () => {
  it('returns the initial state', () => {
    expect(slotGameByIdReducer(undefined, {})).toEqual(fromJS({}));
  });
});
