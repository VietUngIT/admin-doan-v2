import { createSelector } from 'reselect';

/**
 * Direct selector to the listMarketPrice state domain
 */
const selectListMarketPriceDomain = () => (state) => state.get('listMarketPrice');

const selectGetListMP = () => createSelector(
  selectListMarketPriceDomain(),
  (substate) => substate.get('listMP')
);
const selectIdCateGetListMP = () => createSelector(
  selectListMarketPriceDomain(),
  (substate) => substate.get('idCate')
);
const selectPageGetListMP = () => createSelector(
  selectListMarketPriceDomain(),
  (substate) => substate.get('page')
);
const selectTotalItemListMP = () => createSelector(
  selectListMarketPriceDomain(),
  (substate) => substate.get('total')
);
const selectIdNewsMPDel = () => createSelector(
  selectListMarketPriceDomain(),
  (substate) => substate.get('idDelNews')
);
const selectStateDelMP = () => createSelector(
  selectListMarketPriceDomain(),
  (substate) => substate.get('delNewsSuccess')
);
export {
  selectListMarketPriceDomain,
  selectGetListMP,
  selectIdCateGetListMP,
  selectPageGetListMP,
  selectTotalItemListMP,
  selectIdNewsMPDel,
  selectStateDelMP,
};
