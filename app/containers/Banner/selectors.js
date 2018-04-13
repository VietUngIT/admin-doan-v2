import { createSelector } from 'reselect';

/**
 * Direct selector to the banner state domain
 */
const selectBannerDomain = () => (state) => state.get('banner');


const selectIsLoading = () => createSelector(
  selectBannerDomain(),
  (substate) => substate.get("isLoading")
);
const selectData= () => createSelector(
  selectBannerDomain(),
  (substate) => substate.get("data")
);

const selectIsAdd= () => createSelector(
  selectBannerDomain(),
  (substate) => substate.get("isAdd")
);
const selectUrl= () => createSelector(
  selectBannerDomain(),
  (substate) => substate.get("url")
);
const selectFileName= () => createSelector(
  selectBannerDomain(),
  (substate) => substate.get("fileName")
);
const selectFile= () => createSelector(
  selectBannerDomain(),
  (substate) => substate.get("file")
);

const selectIsEdit= () => createSelector(
  selectBannerDomain(),
  (substate) => substate.get("isEdit")
);
const selectIDEdit= () => createSelector(
  selectBannerDomain(),
  (substate) => substate.get("id_edit")
);
const selectStatus= () => createSelector(
  selectBannerDomain(),
  (substate) => substate.get("status")
);
const selectUEdit= () => createSelector(
  selectBannerDomain(),
  (substate) => substate.get("u_edit")
);

const selectIsDel= () => createSelector(
  selectBannerDomain(),
  (substate) => substate.get("isDel")
);
const selectIDDel= () => createSelector(
  selectBannerDomain(),
  (substate) => substate.get("id_del")
);
const selectU= () => createSelector(
  selectBannerDomain(),
  (substate) => substate.get("u")
);
const selectImg= () => createSelector(
  selectBannerDomain(),
  (substate) => substate.get("_img")
);
export {
  selectBannerDomain,
  selectIsLoading,
  selectData,

  selectIsAdd,
  selectUrl,
  selectFileName,
  selectFile,
  selectU,

  selectIsEdit,
  selectIDEdit,
  selectStatus,
  selectUEdit,
  
  selectIsDel,
  selectIDDel,

  selectImg,
};
