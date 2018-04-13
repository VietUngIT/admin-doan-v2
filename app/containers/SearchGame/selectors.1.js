import { createSelector } from 'reselect';

/**
 * Direct selector to the revenue state domain
 */
const selectRevenueDomain = () => (state) => state.get('revenue');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Revenue
 */

const selectDate = () => createSelector(
  selectRevenueDomain(),
  (substate) => substate.get('date')
);
const selectToDate = () => createSelector(
  selectRevenueDomain(),
  (substate) => substate.get('toDate')
);
const selectData = () => createSelector(
  selectRevenueDomain(),
  (substate) => substate.get('data')
);
export {
  selectRevenueDomain,
  selectDate,
  selectToDate,
  selectData,
};
