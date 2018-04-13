import { createSelector } from 'reselect';

/**
 * Direct selector to the lucKyRotation state domain
 */
const selectLucKyRotationDomain = () => (state) => state.get('lucKyRotation');

const selectIsLoad = () => createSelector(
  selectLucKyRotationDomain(),
  (substate) => substate.get('isLoad')
);
const selectData = () => createSelector(
  selectLucKyRotationDomain(),
  (substate) => substate.get('data')
);
const selectThaydoigiatrivongquay = () => createSelector(
  selectLucKyRotationDomain(),
  (substate) => substate.get('datatyle')
);
const selectSt = () => createSelector(
  selectLucKyRotationDomain(),
  (substate) => substate.get('st')
);
const selectEt = () => createSelector(
  selectLucKyRotationDomain(),
  (substate) => substate.get('et')
);

const selectID = () => createSelector(
  selectLucKyRotationDomain(),
  (substate) => substate.get('id')
);
const selectV = () => createSelector(
  selectLucKyRotationDomain(),
  (substate) => substate.get('v')
);
export {
  selectLucKyRotationDomain,
  selectIsLoad,
  selectData,
  selectSt,
  selectEt,
  selectThaydoigiatrivongquay,
  selectID,
  selectV,
};
