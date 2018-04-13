import { createSelector } from 'reselect';

/**
 * Direct selector to the smsactive state domain
 */
const selectSmsactiveDomain = () => (state) => state.get('smsactive');


const selectIsLoading = () => createSelector(
  selectSmsactiveDomain(),
  (substate) => substate.get("isLoading")
);
const selectTime = () => createSelector(
  selectSmsactiveDomain(),
  (substate) => substate.get("time")
);
const selectData = () => createSelector(
  selectSmsactiveDomain(),
  (substate) => substate.get("data")
);
export {
  selectSmsactiveDomain,
  selectIsLoading,
  selectTime,
  selectData,
};
