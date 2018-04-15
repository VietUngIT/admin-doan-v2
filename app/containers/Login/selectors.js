import { createSelector } from 'reselect';

const selectLoginDomain = () => (state) => state.get('login');

const selectPassword = () => createSelector(
  selectLoginDomain(),
  (substate) => substate.get('password')
);
const selectLoginSuccess = () => createSelector(
  selectLoginDomain(),
  (substate) => substate.get('loginSuccess')
);
const selectUser = () => createSelector(
  selectLoginDomain(),
(substate) => substate.get('user')
);
const selectError = () => createSelector(
  selectLoginDomain(),
(substate) => substate.get('err')
);

const selectPhone = () => createSelector(
  selectLoginDomain(),
(substate) => substate.get('phone')
);
const selectIsLogedin = () => createSelector(
  selectLoginDomain(),
(substate) => substate.get('isLogedin')
);
const selectIsRemember = () => createSelector(
  selectLoginDomain(),
(substate) => substate.get('isRemember')
);

export {
  selectLoginDomain,
  selectPhone,
  selectPassword,
  selectLoginSuccess,
  selectIsLogedin,
  selectError,
  selectUser,
  selectIsRemember,
};
