import { createSelector } from 'reselect';

/**
 * Direct selector to the accountOnline state domain
 */
const selectAccountOnlineDomain = () => (state) => state.get('accountOnline');


const selectIsLoading = () => createSelector(
  selectAccountOnlineDomain(),
  (substate) => substate.get("isLoading")
);
const selectUName = () => createSelector(
  selectAccountOnlineDomain(),
  (substate) => substate.get("uname")
);
const selectNName = () => createSelector(
  selectAccountOnlineDomain(),
  (substate) => substate.get("nname")
);
const selectGID = () => createSelector(
  selectAccountOnlineDomain(),
  (substate) => substate.get("gid")
);
const selectData = () => createSelector(
  selectAccountOnlineDomain(),
  (substate) => substate.get("data")
);
const selectIsGetting = () => createSelector(
  selectAccountOnlineDomain(),
  (substate) => substate.get("isGetting")
);
const selectDataGet = () => createSelector(
  selectAccountOnlineDomain(),
  (substate) => substate.get("data_get")
);
const selectTotalPage = () => createSelector(
  selectAccountOnlineDomain(),
  (substate) => substate.get("total_page")
);
// const selectPage = () => createSelector(
//   selectAccountOnlineDomain(),
//   (substate) => substate.get("page")
// );
export {
  selectAccountOnlineDomain,
  selectIsLoading,
  selectUName,
  selectNName,
  selectGID,
  selectData,
  selectIsGetting,
  selectDataGet,
  selectTotalPage,
  // selectPage,
};
