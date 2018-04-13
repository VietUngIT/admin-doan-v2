
import { fromJS } from 'immutable';
import lucKyRotationReducer from '../reducer';

describe('lucKyRotationReducer', () => {
  it('returns the initial state', () => {
    expect(lucKyRotationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
