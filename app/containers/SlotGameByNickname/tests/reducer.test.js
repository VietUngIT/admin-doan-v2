
import { fromJS } from 'immutable';
import slotGameByNicknameReducer from '../reducer';

describe('slotGameByNicknameReducer', () => {
  it('returns the initial state', () => {
    expect(slotGameByNicknameReducer(undefined, {})).toEqual(fromJS({}));
  });
});
