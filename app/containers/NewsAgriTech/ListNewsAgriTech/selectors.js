import { createSelector } from 'reselect';

const selectListNewsAgriTechDomain = () => (state) => state.get('listNewsAgriTech');

const selectListNewsAgriTech = () => createSelector(
  selectListNewsAgriTechDomain(),
  (substate) => substate.get('listNewsAgriTech')
);
const selectidSubCate = () => createSelector(
  selectListNewsAgriTechDomain(),
  (substate) => substate.get('idSubCate')
);
const selectPageNewsAgriTech = () => createSelector(
  selectListNewsAgriTechDomain(),
  (substate) => substate.get('page')
);
const selectTotalItemAgriTech = () => createSelector(
  selectListNewsAgriTechDomain(),
  (substate) => substate.get('total')
);

export {
  selectListNewsAgriTechDomain,
  selectListNewsAgriTech,
  selectidSubCate,
  selectPageNewsAgriTech,
  selectTotalItemAgriTech,
};
