
import { fromJS } from 'immutable';
import agriTechDetailReducer from '../reducer';

describe('agriTechDetailReducer', () => {
  it('returns the initial state', () => {
    expect(agriTechDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
