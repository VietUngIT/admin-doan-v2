import { createSelector } from 'reselect';

const selectCateAgriTechDomain = () => (state) => state.get('cateAgriTech');
const selectListCateAgriTech = () => createSelector(
  selectCateAgriTechDomain(),
  (substate) => substate.get('listCateAgriTech')
);
const selectNameCateAgriTechAdd = () => createSelector(
  selectCateAgriTechDomain(),
  (substate) => substate.get('nameCateAdd')
);
const selectIdDelCate = () => createSelector(
  selectCateAgriTechDomain(),
  (substate) => substate.get('idDelCate')
);
export {
  selectCateAgriTechDomain,
  selectListCateAgriTech,
  selectNameCateAgriTechAdd,
  selectIdDelCate,
};
