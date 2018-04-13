
import { fromJS } from 'immutable';
import tienHtReducer from '../reducer';

describe('tienHtReducer', () => {
  it('returns the initial state', () => {
    expect(tienHtReducer(undefined, {})).toEqual(fromJS({}));
  });
});
