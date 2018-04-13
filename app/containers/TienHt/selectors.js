import { createSelector } from 'reselect';

/**
 * Direct selector to the tienHt state domain
 */
const selectTienHtDomain = () => (state) => state.get('tienHt');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TienHt
 */

const selectDate = () => createSelector(
  selectTienHtDomain(),
  (substate) => substate.get("st")
);
const selectToDate = () => createSelector(
  selectTienHtDomain(),
  (substate) => substate.get("et")
);
const selectData = () => createSelector(
  selectTienHtDomain(),
  (substate) => substate.get("data")
);
const selectIsLoading = () => createSelector(
  selectTienHtDomain(),
  (substate) => substate.get("isLoading")
);
export {
  selectTienHtDomain,
  selectDate,
  selectToDate,
  selectData,
  selectIsLoading,
};
