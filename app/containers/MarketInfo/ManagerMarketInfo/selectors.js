import { createSelector } from 'reselect';

const selectManagerMarketInfoDomain = () => (state) => state.get('marketinfo');
const selectNameCategoryNews = () => createSelector(
  selectManagerMarketInfoDomain(),
  (substate) => substate.get('nameCate')
);
const selectCategoryNewsMKList = () => createSelector(
  selectManagerMarketInfoDomain(),
  (substate) => substate.get('listCategoryNewsMK')
);
const selectNameCategoryAdd = () => createSelector(
  selectManagerMarketInfoDomain(),
  (substate) => substate.get('nameCateAdd')
);
const selectIdCategoryDel = () => createSelector(
  selectManagerMarketInfoDomain(),
  (substate) => substate.get('idCateDel')
);
const selectIdCategoryEdit = () => createSelector(
  selectManagerMarketInfoDomain(),
  (substate) => substate.get('idCateEdit')
);
const selectNameCategoryEdit = () => createSelector(
  selectManagerMarketInfoDomain(),
  (substate) => substate.get('nameCateEdit')
);
export {
  selectManagerMarketInfoDomain,
  selectCategoryNewsMKList,
  selectNameCategoryNews,
  selectNameCategoryAdd,
  selectIdCategoryDel,
  selectIdCategoryEdit,
  selectNameCategoryEdit,
};
