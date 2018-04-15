import { createSelector } from 'reselect';

const selectListNewsDomain = () => (state) => state.get('listnews');

const selectListNews = () => createSelector(
  selectListNewsDomain(),
  (substate) => substate.get('listNewsByCate')
);
const selectidCateNews = () => createSelector(
  selectListNewsDomain(),
  (substate) => substate.get('idCate')
);
const selectPageNews = () => createSelector(
  selectListNewsDomain(),
  (substate) => substate.get('page')
);
const selectTotalItemNews = () => createSelector(
  selectListNewsDomain(),
  (substate) => substate.get('total')
);

export {
  selectidCateNews,
  selectListNewsDomain,
  selectListNews,
  selectPageNews,
  selectTotalItemNews,
};
