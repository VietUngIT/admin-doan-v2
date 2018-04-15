import { createSelector } from 'reselect';

const selectNewsDetailDomain = () => (state) => state.get('newsdetail');

const selectListNewsNews = () => createSelector(
  selectNewsDetailDomain(),
  (substate) => substate.get('listNewsByCate')
);
const selectidNewsNews = () => createSelector(
  selectNewsDetailDomain(),
  (substate) => substate.get('idnews')
);
const selectidCateNewsNews = () => createSelector(
  selectNewsDetailDomain(),
  (substate) => substate.get('idCate')
);
const selectPageNewsNews = () => createSelector(
  selectNewsDetailDomain(),
  (substate) => substate.get('page')
);
const selectTotalItemNewsNews = () => createSelector(
  selectNewsDetailDomain(),
  (substate) => substate.get('total')
);
const selectListCategoryNews = () => createSelector(
  selectNewsDetailDomain(),
  (substate) => substate.get('listcategorynews')
);
const selectTagsNews = () => createSelector(
  selectNewsDetailDomain(),
  (substate) => substate.get('tags')
);
const selectIdEditNews = () => createSelector(
  selectNewsDetailDomain(),
  (substate) => substate.get('idEdit')
);
const selectImageEditNews = () => createSelector(
  selectNewsDetailDomain(),
  (substate) => substate.get('image')
);
const selectEditNews = () => createSelector(
  selectNewsDetailDomain(),
  (substate) => substate.get('editNews')
);
const selectTitleEditNews = () => createSelector(
  selectNewsDetailDomain(),
  (substate) => substate.getIn(['editNews','title'])
);
const selectIdDeleteNews = () => createSelector(
  selectNewsDetailDomain(),
  (substate) => substate.get("idNewsDel")
);
const selectIdEditNewsSubmit = () => createSelector(
  selectNewsDetailDomain(),
  (substate) => substate.get("idNewsEdit")
);
const selectIdCateNewsSubmit = () => createSelector(
  selectNewsDetailDomain(),
  (substate) => substate.get("idcateedit")
);
const selectNewsAdd = () => createSelector(
  selectNewsDetailDomain(),
  (substate) => substate.get("addNews")
);
const selectErrorCode = () => createSelector(
  selectNewsDetailDomain(),
  (substate) => substate.getIn(['addNews','errorCode'])
);
export {
  selectNewsDetailDomain,
  selectidCateNewsNews,
  selectListNewsNews,
  selectPageNewsNews,
  selectTotalItemNewsNews,
  selectListCategoryNews,
  selectTagsNews,
  selectIdEditNews,
  selectImageEditNews,
  selectEditNews,
  selectTitleEditNews,
  selectidNewsNews,
  selectIdDeleteNews,
  selectIdEditNewsSubmit,
  selectIdCateNewsSubmit,
  selectNewsAdd,
  selectErrorCode,
};
