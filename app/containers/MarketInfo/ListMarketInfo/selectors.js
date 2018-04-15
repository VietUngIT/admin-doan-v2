import { createSelector } from 'reselect';

const selectListMarketInfoDomain = () => (state) => state.get('listMarketInfo');

const selectListNewsMK = () => createSelector(
  selectListMarketInfoDomain(),
  (substate) => substate.get('listNewsMKByCate')
);
const selectidCateNewsMK = () => createSelector(
  selectListMarketInfoDomain(),
  (substate) => substate.get('idCate')
);
const selectPageNewsMK = () => createSelector(
  selectListMarketInfoDomain(),
  (substate) => substate.get('page')
);
const selectTotalItemNewsMK = () => createSelector(
  selectListMarketInfoDomain(),
  (substate) => substate.get('total')
);

export {
  selectListMarketInfoDomain,
  selectListNewsMK,
  selectidCateNewsMK,
  selectPageNewsMK,
  selectTotalItemNewsMK,
};
