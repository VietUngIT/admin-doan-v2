import { createSelector } from 'reselect';

/**
 * Direct selector to the chanIp state domain
 */
const selectChanIpDomain = () => (state) => state.get('chanIp');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ChanIp
 */

const selectIsLoading = () => createSelector(
  selectChanIpDomain(),
  (substate) => substate.get("isLoading")
);
const selectData = () => createSelector(
  selectChanIpDomain(),
  (substate) => substate.get("data")
);
const selectIP = () => createSelector(
  selectChanIpDomain(),
  (substate) => substate.get("ip")
);
const selectReason = () => createSelector(
  selectChanIpDomain(),
  (substate) => substate.get("reason")
);
const selectIPDel = () => createSelector(
  selectChanIpDomain(),
  (substate) => substate.get("ip_del")
);
export {
  selectChanIpDomain,
  selectIsLoading,
  selectData,
  selectIP,
  selectReason,
  selectIPDel,
};
