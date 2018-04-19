import { createSelector } from 'reselect';

const selectCateMarketPriceDomain = () => (state) => state.get('cateMarketPrice');
const selectListCateMP = () => createSelector(
  selectCateMarketPriceDomain(),
  (substate) => substate.get('listCateMP')
);
export {
  selectCateMarketPriceDomain,
  selectListCateMP,
};
