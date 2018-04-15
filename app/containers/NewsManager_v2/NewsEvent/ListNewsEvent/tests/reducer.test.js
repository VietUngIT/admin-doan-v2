
import { fromJS } from 'immutable';
import listNewsEventReducer from '../reducer';

describe('listNewsEventReducer', () => {
  it('returns the initial state', () => {
    expect(listNewsEventReducer(undefined, {})).toEqual(fromJS({}));
  });
});
