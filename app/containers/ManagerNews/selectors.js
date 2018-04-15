import { createSelector } from 'reselect';

const selectManagerNewsDomain = () => (state) => state.get('news');

const selectCategoryNewsName = () => createSelector(
  selectManagerNewsDomain(),
  (substate) => substate.get('categoryNews')
);
const selectCategoryNewsList = () => createSelector(
  selectManagerNewsDomain(),
  (substate) => substate.get('listcategorynews')
);
const selectIdCategoryNewsDel = () => createSelector(
  selectManagerNewsDomain(),
  (substate) => substate.get('idCateDel')
);
const selectIdCategoryNewsEdit = () => createSelector(
  selectManagerNewsDomain(),
  (substate) => substate.get('idCateEdit')
);
const selectNameCategoryNewsEdit = () => createSelector(
  selectManagerNewsDomain(),
  (substate) => substate.get('nameCate')
);
const selectNameCategoryGetListNews = () => createSelector(
  selectManagerNewsDomain(),
  (substate) => substate.get('showNameCate')
);

export {
  selectManagerNewsDomain,
  selectCategoryNewsName,
  selectCategoryNewsList,
  selectIdCategoryNewsDel,
  selectIdCategoryNewsEdit,
  selectNameCategoryNewsEdit,
  selectNameCategoryGetListNews,
};
