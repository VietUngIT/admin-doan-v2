
import { fromJS } from 'immutable';
import messageTxReducer from '../reducer';

describe('messageTxReducer', () => {
  it('returns the initial state', () => {
    expect(messageTxReducer(undefined, {})).toEqual(fromJS({}));
  });
});
