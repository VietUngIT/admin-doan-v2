import { createSelector } from 'reselect';

/**
 * Direct selector to the duyetCard state domain
 */
const selectDuyetCardDomain = () => (state) => state.get('duyetCard');

const selectT = () => createSelector(
  selectDuyetCardDomain(),
  (substate) => substate.get("t")
);
const selectIsLoading = () => createSelector(
  selectDuyetCardDomain(),
  (substate) => substate.get("isLoading")
);
const selectIsHuy = () => createSelector(
  selectDuyetCardDomain(),
  (substate) => substate.get("isHuy")
);
const selectIsDuyet = () => createSelector(
  selectDuyetCardDomain(),
  (substate) => substate.get("isDuyet")
);
const selectData = () => createSelector(
  selectDuyetCardDomain(),
  (substate) => substate.get("data")
);
const selectID= () => createSelector(
  selectDuyetCardDomain(),
  (substate) => substate.get("id")
);
const selectIDHuy = () => createSelector(
  selectDuyetCardDomain(),
  (substate) => substate.get("idHuy")
);
const selectIsGetListNCC = () => createSelector(
  selectDuyetCardDomain(),
  (substate) => substate.get("isGetNCC")
);
const selectIsChangeNCCSuccess = () => createSelector(
  selectDuyetCardDomain(),
  (substate) => substate.get("isChangeNCCSuccess")
);
const selectDataNCC = () => createSelector(
  selectDuyetCardDomain(),
  (substate) => substate.get("data_ncc")
);
const selectPc = () => createSelector(
  selectDuyetCardDomain(),
  (substate) => substate.get("pc")
);
export {
  selectDuyetCardDomain,
  selectIsGetListNCC,
  selectIsChangeNCCSuccess,
  selectDataNCC,
  selectPc,
  
  selectIsLoading,
  selectData,
  selectID,
  selectT,
  selectIDHuy,
  selectIsHuy,
  selectIsDuyet,
};
