import { createSelector } from 'reselect';

/**
 * Direct selector to the topNapTien state domain
 */
const selectTopNapTienDomain = () => (state) => state.get('topNapTien');

const selectIsLoading = () => createSelector(
  selectTopNapTienDomain(),
  (substate) => substate.get("isLoading")
);
const selectSt = () => createSelector(
  selectTopNapTienDomain(),
  (substate) => substate.get("st")
);
const selectEt = () => createSelector(
  selectTopNapTienDomain(),
  (substate) => substate.get("et")
);
const selectData = () => createSelector(
  selectTopNapTienDomain(),
  (substate) => substate.get("data")
);
export {
  selectTopNapTienDomain,
  selectSt,
  selectEt,
  selectData,
  selectIsLoading,
};
