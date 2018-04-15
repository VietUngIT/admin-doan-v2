import { createSelector } from 'reselect';

const selectSubCategoryMarKetInfoDomain = () => (state) => state.get('subcatenews');
const selectListSubCate = () => createSelector(
  selectSubCategoryMarKetInfoDomain(),
  (substate) => substate.get('listSubCateMK')
);
const selectIdCateGetSubCate = () => createSelector(
  selectSubCategoryMarKetInfoDomain(),
  (substate) => substate.get('idCateGetSub')
);

export {
  selectSubCategoryMarKetInfoDomain,
  selectListSubCate,
  selectIdCateGetSubCate,
};
