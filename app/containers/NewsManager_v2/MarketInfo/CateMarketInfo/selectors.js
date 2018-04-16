import { createSelector } from 'reselect';

/**
 * Direct selector to the cateMarketInfo state domain
 */
const selectCateMarketInfoDomain = () => (state) => state.get('marketinfo');
const selectListCateMK = () => createSelector(
  selectCateMarketInfoDomain(),
  (substate) => substate.get('listCateMK')
);
const selectNameCategoryAdd = () => createSelector(
  selectCateMarketInfoDomain(),
  (substate) => substate.get('nameCateAdd')
);
const selectIdCategoryDel = () => createSelector(
  selectCateMarketInfoDomain(),
  (substate) => substate.get('idCateDel')
);
export {
  selectCateMarketInfoDomain,
  selectListCateMK,
  selectNameCategoryAdd,
  selectIdCategoryDel,
};
