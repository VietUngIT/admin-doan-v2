import { createSelector } from 'reselect';

const selectAgriTechDetailDomain = () => (state) => state.get('agriTechDetail');
const selectidNewsAgriTech = () => createSelector(
  selectAgriTechDetailDomain(),
  (substate) => substate.get('idNews')
);
const selectListNewsAgriTech = () => createSelector(
  selectAgriTechDetailDomain(),
  (substate) => substate.get('listNewsAgriTech')
);
const selectidSubCateNewsAgriTech = () => createSelector(
  selectAgriTechDetailDomain(),
  (substate) => substate.get('idSubCate')
);
const selectPageNewsAgriTech = () => createSelector(
  selectAgriTechDetailDomain(),
  (substate) => substate.get('page')
);
const selectTotalItemNewsAgritech = () => createSelector(
  selectAgriTechDetailDomain(),
  (substate) => substate.get('total')
);
const selectgetListSubCateNewsAgriTech = () => createSelector(
  selectAgriTechDetailDomain(),
  (substate) => substate.get('listSubCate')
);
const selectIdCateGetSubCate = () => createSelector(
  selectAgriTechDetailDomain(),
  (substate) => substate.get('idCate')
);
const selectEditNewsAgriTech = () => createSelector(
  selectAgriTechDetailDomain(),
  (substate) => substate.get('editNews')
);
const selectIdEditNews = () => createSelector(
  selectAgriTechDetailDomain(),
  (substate) => substate.get('idEditNews')
);
const selectTagsEditNews = () => createSelector(
  selectAgriTechDetailDomain(),
  (substate) => substate.get('tags')
);
const selectImageEditNews = () => createSelector(
  selectAgriTechDetailDomain(),
  (substate) => substate.get('image')
);
const selectIdDelNews = () => createSelector(
  selectAgriTechDetailDomain(),
  (substate) => substate.get('idDelNews')
);
const selectIdSubCateNewsEditSubmit = () => createSelector(
  selectAgriTechDetailDomain(),
  (substate) => substate.get("idSubCatEdit")
);
const selectNewsAddAgriTech = () => createSelector(
  selectAgriTechDetailDomain(),
  (substate) => substate.get("addNews")
);
const selectErrorCodeAdAgriTech = () => createSelector(
  selectAgriTechDetailDomain(),
  (substate) => substate.getIn(['addNews','errorCode'])
);
export {
  selectAgriTechDetailDomain,
  selectidNewsAgriTech,
  selectListNewsAgriTech,
  selectidSubCateNewsAgriTech,
  selectPageNewsAgriTech,
  selectTotalItemNewsAgritech,
  selectgetListSubCateNewsAgriTech,
  selectIdCateGetSubCate,
  selectEditNewsAgriTech,
  selectIdEditNews,
  selectTagsEditNews,
  selectImageEditNews,
  selectIdDelNews,
  selectIdSubCateNewsEditSubmit,
  selectNewsAddAgriTech,
  selectErrorCodeAdAgriTech,
};
