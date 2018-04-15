import { createSelector } from 'reselect';

/**
 * Direct selector to the cateNewsEvent state domain
 */
const selectCateNewsEventDomain = () => (state) => state.get('news');

const selectCategoryNewsName = () => createSelector(
  selectCateNewsEventDomain(),
  (substate) => substate.get('categoryNews')
);
const selectListCategoryNews = () => createSelector(
  selectCateNewsEventDomain(),
  (substate) => substate.get('listcategorynews')
);
const selectIdCategoryNewsDel = () => createSelector(
  selectCateNewsEventDomain(),
  (substate) => substate.get('idCateDel')
);

export {
  selectCateNewsEventDomain,
  selectCategoryNewsName,
  selectListCategoryNews,
  selectIdCategoryNewsDel,
};
