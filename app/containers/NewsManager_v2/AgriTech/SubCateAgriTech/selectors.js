import { createSelector } from 'reselect';

const selectSubCateAgriTechDomain = () => (state) => state.get('subCateAgriTech');

const selectListSubCate = () => createSelector(
  selectSubCateAgriTechDomain(),
  (substate) => substate.get('listSubCate')
);
const selectIdCateGetSubCate = () => createSelector(
  selectSubCateAgriTechDomain(),
  (substate) => substate.get('idCate')
);
const selectIdCateAddSubCate = () => createSelector(
  selectSubCateAgriTechDomain(),
  (substate) => substate.get('idCateAdd')
);
const selectNameAddSubCate = () => createSelector(
  selectSubCateAgriTechDomain(),
  (substate) => substate.get('nameSubCateAdd')
);
const selectidSubCateDel = () => createSelector(
  selectSubCateAgriTechDomain(),
  (substate) => substate.get('idSubCateDel')
);
export {
  selectSubCateAgriTechDomain,
  selectListSubCate,
  selectIdCateGetSubCate,
  selectIdCateAddSubCate,
  selectNameAddSubCate,
  selectidSubCateDel,
};
