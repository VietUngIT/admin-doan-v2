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
const selectisLoad = () => createSelector(
  selectRevenueDomain(),
  (substate) => substate.get('isLoad')
);
const selectKey = () => createSelector(
  selectRevenueDomain(),
  (substate) => substate.get('key')
);
const selectSuggestData = () => createSelector(
  selectRevenueDomain(),
  (substate) => substate.get('suggest_data')
);
const selectNick = () => createSelector(
  selectRevenueDomain(),
  (substate) => substate.get('nick')
);
export {
  selectRevenueDomain,
  selectDate,
  selectToDate,
  selectData,
  selectisLoad,
  selectKey,
  selectSuggestData,
  selectNick,
};
