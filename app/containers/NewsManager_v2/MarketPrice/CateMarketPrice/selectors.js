import { createSelector } from 'reselect';

const selectCateMarketPriceDomain = () => (state) => state.get('cateMarketPrice');
const selectListCateMP = () => createSelector(
  selectCateMarketPriceDomain(),
  (substate) => substate.get('listCateMP')
);
const selectNameCateAdd = () => createSelector(
  selectCateMarketPriceDomain(),
  (substate) => substate.get('nameCateAdd')
);
const selectImageCateAdd = () => createSelector(
  selectCateMarketPriceDomain(),
  (substate) => substate.get('image')
);
const selectIdDelCate = () => createSelector(
  selectCateMarketPriceDomain(),
  (substate) => substate.get('idDelCate')
);
export {
  selectCateMarketPriceDomain,
  selectListCateMP,
  selectNameCateAdd,
  selectImageCateAdd,
  selectIdDelCate,
};
