import { createSelector } from 'reselect';

/**
 * Direct selector to the checkSeri state domain
 */
const selectCheckSeriDomain = () => (state) => state.get('checkSeri');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CheckSeri
 */

const selectIsLoading = () => createSelector(
  selectCheckSeriDomain(),
  (substate) => substate.get("isLoading")
);
const selectKey = () => createSelector(
  selectCheckSeriDomain(),
  (substate) => substate.get("key")
);
const selectData = () => createSelector(
  selectCheckSeriDomain(),
  (substate) => substate.get("data")
);
const selectType = () => createSelector(
  selectCheckSeriDomain(),
  (substate) => substate.get("type")
);
export {
  selectCheckSeriDomain,
  selectIsLoading,
  selectKey,
  selectData,
  selectType,
};
