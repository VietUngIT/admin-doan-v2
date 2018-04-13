import { createSelector } from 'reselect';

/**
 * Direct selector to the duyetDl state domain
 */
const selectDuyetDlDomain = () => (state) => state.get('duyetDl');

const selectIsLoading = () => createSelector(
  selectDuyetDlDomain(),
  (substate) => substate.get("isLoading")
);
const selectData = () => createSelector(
  selectDuyetDlDomain(),
  (substate) => substate.get("data")
);
const selectPage = () => createSelector(
  selectDuyetDlDomain(),
  (substate) => substate.get("page")
);
const selectType = () => createSelector(
  selectDuyetDlDomain(),
  (substate) => substate.get("type")
);
const selectTotalPage = () => createSelector(
  selectDuyetDlDomain(),
  (substate) => substate.get("total_page")
);
const selectID = () => createSelector(
  selectDuyetDlDomain(),
  (substate) => substate.get("id")
);
const selectIsDuyet = () => createSelector(
  selectDuyetDlDomain(),
  (substate) => substate.get("isDuyet")
);
const selectIsHuy = () => createSelector(
  selectDuyetDlDomain(),
  (substate) => substate.get("isHuy")
);
const selectIdDetail = () => createSelector(
  selectDuyetDlDomain(),
  (substate) => substate.get("id_detail")
);
const selectDataDetail = () => createSelector(
  selectDuyetDlDomain(),
  (substate) => substate.get("data_detail")
);
export {
  selectDuyetDlDomain,
  selectIsLoading,
  selectTotalPage,
  selectIsDuyet,
  selectData,
  selectPage,
  selectType,
  selectID,
  selectIsHuy,
  selectIdDetail,
  selectDataDetail
};
