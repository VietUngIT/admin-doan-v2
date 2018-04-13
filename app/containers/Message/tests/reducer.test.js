
import { fromJS } from 'immutable';
import messegeReducer from '../reducer';

describe('messegeReducer', () => {
  it('returns the initial state', () => {
    expect(messegeReducer(undefined, {})).toEqual(fromJS({}));
  });
});
