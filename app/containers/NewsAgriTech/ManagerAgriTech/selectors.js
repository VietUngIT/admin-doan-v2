import { createSelector } from 'reselect';

const selectManagerAgriTechDomain = () => (state) => state.get('managerAgriTech');

const selectListCateAgriTech = () => createSelector(
  selectManagerAgriTechDomain(),
  (substate) => substate.get('listCateAgriTech')
);
const selectNameCateAgriTechAdd = () => createSelector(
  selectManagerAgriTechDomain(),
  (substate) => substate.get('nameCateAdd')
);
const selectIdDelCate = () => createSelector(
  selectManagerAgriTechDomain(),
  (substate) => substate.get('idDelCate')
);
const selectIdEditCate = () => createSelector(
  selectManagerAgriTechDomain(),
  (substate) => substate.get('idEditCate')
);
const selectNameEditCate = () => createSelector(
  selectManagerAgriTechDomain(),
  (substate) => substate.get('nameCateEdit')
);
const selectNameGetSubCate = () => createSelector(
  selectManagerAgriTechDomain(),
  (substate) => substate.get('nameGetSubCate')
);
export {
  selectManagerAgriTechDomain,
  selectListCateAgriTech,
  selectNameCateAgriTechAdd,
  selectIdDelCate,
  selectIdEditCate,
  selectNameEditCate,
  selectNameGetSubCate,
};
