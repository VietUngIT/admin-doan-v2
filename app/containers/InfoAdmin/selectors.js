import { createSelector } from 'reselect';

const selectInfoAdminDomain = () => (state) => state.get('infoAdmin');

const selectUser = () => createSelector(
  selectInfoAdminDomain(),
  (substate) => substate.get('user')
);
const selectName = () => createSelector(
  selectInfoAdminDomain(),
  (substate) => substate.get('name')
);
const selectNewPhone = () => createSelector(
  selectInfoAdminDomain(),
  (substate) => substate.get('newPhone')
);
const selectAddress = () => createSelector(
  selectInfoAdminDomain(),
  (substate) => substate.get('address')
);
const selectAvatar = () => createSelector(
  selectInfoAdminDomain(),
  (substate) => substate.get('avatar')
);
const selectOldPass = () => createSelector(
  selectInfoAdminDomain(),
  (substate) => substate.get('oldPass')
);
const selectNewPass = () => createSelector(
  selectInfoAdminDomain(),
  (substate) => substate.get('newPass')
);
export {
  selectInfoAdminDomain,
  selectUser,
  selectName,
  selectNewPhone,
  selectAddress,
  selectAvatar,
  selectOldPass,
  selectNewPass,
};
