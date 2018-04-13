
import { fromJS } from 'immutable';
import botReducer from '../reducer';

describe('botReducer', () => {
  it('returns the initial state', () => {
    expect(botReducer(undefined, {})).toEqual(fromJS({}));
  });
});
