import { createSelector } from 'reselect';

/**
 * Direct selector to the setUpEvent state domain
 */
const selectSetUpEventDomain = () => (state) => state.get('setUpEvent');

const selectIsLoadEven = () => createSelector(
  selectSetUpEventDomain(),
  (substate) => substate.get('isLoadEven')
);
const selectGIdEven = () => createSelector(
  selectSetUpEventDomain(),
  (substate) => substate.get('gid_even')
);
const selectBEven = () => createSelector(
  selectSetUpEventDomain(),
  (substate) => substate.get('b_even')
);
const selectVEven = () => createSelector(
  selectSetUpEventDomain(),
  (substate) => substate.get('v_even')
);
const selectDataEven = () => createSelector(
  selectSetUpEventDomain(),
  (substate) => substate.get('data_even')
);
const selectXuLyEven = () => createSelector(
  selectSetUpEventDomain(),
  (substate) => substate.get('xulyEven')
);
const selectXuLyFund = () => createSelector(
  selectSetUpEventDomain(),
  (substate) => substate.get('xulyFund')
);
export {
  selectIsLoadEven,
  selectDataEven,
  selectGIdEven,
  selectBEven,
  selectVEven,
  selectXuLyEven,
  selectXuLyFund,
};
