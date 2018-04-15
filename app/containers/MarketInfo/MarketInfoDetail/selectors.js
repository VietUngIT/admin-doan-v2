import { createSelector } from 'reselect';

const selectMarketInfoDetailDomain = () => (state) => state.get('marketInfoDetail');
const selectListNewsMK = () => createSelector(
  selectMarketInfoDetailDomain(),
  (substate) => substate.get('listNewsMK')
);
const selectidCateNewsMK = () => createSelector(
  selectMarketInfoDetailDomain(),
  (substate) => substate.get('idCate')
);
const selectPageNews = () => createSelector(
  selectMarketInfoDetailDomain(),
  (substate) => substate.get('page')
);
const selectTotalItemNews = () => createSelector(
  selectMarketInfoDetailDomain(),
  (substate) => substate.get('total')
);
const selectidNewsMK = () => createSelector(
  selectMarketInfoDetailDomain(),
  (substate) => substate.get('idnewsMK')
);
const selectgetListCateNewsMK = () => createSelector(
  selectMarketInfoDetailDomain(),
  (substate) => substate.get('listcatenewsMK')
);
const selectIdNewsMKDel = () => createSelector(
  selectMarketInfoDetailDomain(),
  (substate) => substate.get('idDelMK')
);
const selectEditNewsMK = () => createSelector(
  selectMarketInfoDetailDomain(),
  (substate) => substate.get('editNews')
);
const selectIdEditNewsMK = () => createSelector(
  selectMarketInfoDetailDomain(),
  (substate) => substate.get('idEditMK')
);
const selectImageEditNewsMK = () => createSelector(
  selectMarketInfoDetailDomain(),
  (substate) => substate.get('image')
);
const selectTagsEditNewsMK = () => createSelector(
  selectMarketInfoDetailDomain(),
  (substate) => substate.get('tags')
);
const selectIdCateNewsMKEditSubmit = () => createSelector(
  selectMarketInfoDetailDomain(),
  (substate) => substate.get("idcateedit")
);
const selectNewsAddMK = () => createSelector(
  selectMarketInfoDetailDomain(),
  (substate) => substate.get("addNews")
);
const selectErrorCodeMK = () => createSelector(
  selectMarketInfoDetailDomain(),
  (substate) => substate.getIn(['addNews','errorCode'])
);
export {
  selectMarketInfoDetailDomain,
  selectListNewsMK,
  selectidCateNewsMK,
  selectPageNews,
  selectTotalItemNews,
  selectidNewsMK,
  selectgetListCateNewsMK,
  selectIdNewsMKDel,
  selectEditNewsMK,
  selectIdEditNewsMK,
  selectImageEditNewsMK,
  selectTagsEditNewsMK,
  selectIdCateNewsMKEditSubmit,
  selectNewsAddMK,
  selectErrorCodeMK,
};
