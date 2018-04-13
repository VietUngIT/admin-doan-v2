import { createSelector } from 'reselect';

/**
 * Direct selector to the countDau state domain
 */
const selectCountDauDomain = () => (state) => state.get('countDau');

const selectSt = () => createSelector(
  selectCountDauDomain(),
  (substate) => substate.get("st")
);
const selectEt = () => createSelector(
  selectCountDauDomain(),
  (substate) => substate.get("et")
);

const selectIsLoadDAU = () => createSelector(
  selectCountDauDomain(),
  (substate) => substate.get("isLoadDAU")
);
const selectIsLoading = () => createSelector(
  selectCountDauDomain(),
  (substate) => substate.get("isLoading")
);
const selectData = () => createSelector(
  selectCountDauDomain(),
  (substate) => substate.get("data")
);
const selectDPU = () => createSelector(
  selectCountDauDomain(),
  (substate) => substate.get("dpu")
);
const selectTotalPageDPU = () => createSelector(
  selectCountDauDomain(),
  (substate) => substate.get("total_dpu")
);
const selectTotalPageDAU = () => createSelector(
  selectCountDauDomain(),
  (substate) => substate.get("total_dau")
);
const selectPage = () => createSelector(
  selectCountDauDomain(),
  (substate) => substate.get("page")
);


const selectIsLoadingNow = () => createSelector(
  selectCountDauDomain(),
  (substate) => substate.get("isLoadingNow")
);
const selectDataNow = () => createSelector(
  selectCountDauDomain(),
  (substate) => substate.get("data_now")
);
const selectDPUNow = () => createSelector(
  selectCountDauDomain(),
  (substate) => substate.get("dpu_now")
);
const selectTotalPageDPUNow = () => createSelector(
  selectCountDauDomain(),
  (substate) => substate.get("total_dpu_now")
);
const selectTotalPageDAUNow = () => createSelector(
  selectCountDauDomain(),
  (substate) => substate.get("total_dau_now")
);
const selectPageNow = () => createSelector(
  selectCountDauDomain(),
  (substate) => substate.get("page_now")
);
export {
  selectCountDauDomain,
  selectSt,
  selectEt,

  selectIsLoading,
  selectData,
  selectDPU,
  selectTotalPageDPU,
  selectTotalPageDAU,
  selectPage,

  selectIsLoadingNow,
  selectDataNow,
  selectDPUNow,
  selectTotalPageDPUNow,
  selectTotalPageDAUNow,
  selectPageNow,

  selectIsLoadDAU,
};
