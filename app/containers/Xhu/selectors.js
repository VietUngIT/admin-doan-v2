import { createSelector } from 'reselect';

/**
 * Direct selector to the xhu state domain
 */
const selectXhuDomain = () => (state) => state.get('xhu');

const selectIsLoading = () => createSelector(
  selectXhuDomain(),
  (substate) => substate.get("isLoading")
);
const selectSTList = () => createSelector(
  selectXhuDomain(),
  (substate) => substate.get("st_list")
);
const selectData = () => createSelector(
  selectXhuDomain(),
  (substate) => substate.get("data")
);
const selectID = () => createSelector(
  selectXhuDomain(),
  (substate) => substate.get("id")
);

const selectST = () => createSelector(
  selectXhuDomain(),
  (substate) => substate.get("day")
);
const selectActive= () => createSelector(
  selectXhuDomain(),
  (substate) => substate.get("active")
);
const selectCHu100= () => createSelector(
  selectXhuDomain(),
  (substate) => substate.get("hu100")
);
const selectXHu100= () => createSelector(
  selectXhuDomain(),
  (substate) => substate.get("x100")
);

const selectCHu1000= () => createSelector(
  selectXhuDomain(),
  (substate) => substate.get("hu1000")
);
const selectXHu1000= () => createSelector(
  selectXhuDomain(),
  (substate) => substate.get("x1000")
);

const selectCHu10000= () => createSelector(
  selectXhuDomain(),
  (substate) => substate.get("hu10000")
);
const selectXHu10000= () => createSelector(
  selectXhuDomain(),
  (substate) => substate.get("x10000")
);
const selectIsSuccess= () => createSelector(
  selectXhuDomain(),
  (substate) => substate.get("isSuccess")
);
const selectGID= () => createSelector(
  selectXhuDomain(),
  (substate) => substate.get("gn")
);
const selectNE= () => createSelector(
  selectXhuDomain(),
  (substate) => substate.get("ne")
);
export {
  selectXhuDomain,
  selectIsLoading,
  selectData,
  selectID,
  selectSTList,

  selectST,  
  selectCHu100,
  selectXHu100,
  selectCHu1000,
  selectXHu1000,
  selectCHu10000,
  selectXHu10000,
  selectActive,
  selectGID,
  selectNE,
  
  selectIsSuccess,
};
