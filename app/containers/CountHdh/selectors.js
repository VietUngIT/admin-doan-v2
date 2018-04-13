import { createSelector } from 'reselect';

/**
 * Direct selector to the countHdh state domain
 */
const selectCountHdhDomain = () => (state) => state.get('countHdh');


const selectSt = () => createSelector(
  selectCountHdhDomain(),
  (substate) => substate.get("st")
);
const selectEt = () => createSelector(
  selectCountHdhDomain(),
  (substate) => substate.get("et")
);
const selectIsLoading = () => createSelector(
  selectCountHdhDomain(),
  (substate) => substate.get("isLoading")
);
const selectData = () => createSelector(
  selectCountHdhDomain(),
  (substate) => substate.get("data")
);
const selectT = () => createSelector(
  selectCountHdhDomain(),
  (substate) => substate.get("t")
);
const selectTotalPage = () => createSelector(
  selectCountHdhDomain(),
  (substate) => substate.get("total_page")
);
const selectPage = () => createSelector(
  selectCountHdhDomain(),
  (substate) => substate.get("page")
);
export {
  selectCountHdhDomain,
  selectSt,
  selectEt,
  selectT,
  selectIsLoading,
  selectData,
  selectTotalPage,
  selectPage,
};
