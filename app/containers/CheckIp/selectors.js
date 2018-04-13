import { createSelector } from 'reselect';

/**
 * Direct selector to the checkIp state domain
 */
const selectCheckIpDomain = () => (state) => state.get('checkIp');

const selectIsLoading = () => createSelector(
  selectCheckIpDomain(),
  (substate) => substate.get("isLoading")
);
const selectIp = () => createSelector(
  selectCheckIpDomain(),
  (substate) => substate.get("ip")
);
const selectData = () => createSelector(
  selectCheckIpDomain(),
  (substate) => substate.get("data")
);
const selectIsCouting = () => createSelector(
  selectCheckIpDomain(),
  (substate) => substate.get("isCounting")
);
const selectNick = () => createSelector(
  selectCheckIpDomain(),
  (substate) => substate.get("nick")
);
const selectCount = () => createSelector(
  selectCheckIpDomain(),
  (substate) => substate.get("count")
);
export {
  selectCheckIpDomain,
  selectIsLoading,
  selectIp,
  selectData,
  selectIsCouting,
  selectNick,
  selectCount,
};
