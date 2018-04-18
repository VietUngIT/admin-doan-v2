import { createSelector } from 'reselect';

const selectListAgritechDomain = () => (state) => state.get('listAgritech');

const selectListNewsAgriTech = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get('listNewsAgriTech')
);
const selectidSubCateNewsAgriTech = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get('idSubCate')
);
const selectPageNewsAgriTech = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get('page')
);
const selectTotalItemNewsAgritech = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get('total')
);
const selectgetListSubCateNewsAgriTech = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get('listSubCate')
);
const selectIdCateGetSubCate = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get('idCate')
);
const selectListCateAgriTech = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get('listCateAgriTech')
);
const selectIdNewsATDel = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get('idDelNews')
);
const selectStateDelAT = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get('delNewsSuccess')
);
const selectNewsAddAgriTech = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.get("addNews")
);
const selectErrorCodeAdAgriTech = () => createSelector(
  selectListAgritechDomain(),
  (substate) => substate.getIn(['addNews','errorCode'])
);
export {
  selectListAgritechDomain,
  selectListNewsAgriTech,
  selectidSubCateNewsAgriTech,
  selectPageNewsAgriTech,
  selectTotalItemNewsAgritech,
  selectgetListSubCateNewsAgriTech,
  selectIdCateGetSubCate,
  selectListCateAgriTech,
  selectNewsAddAgriTech,
  selectStateDelAT,
  selectErrorCodeAdAgriTech,
  selectIdNewsATDel
};
