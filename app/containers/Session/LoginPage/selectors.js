import { createSelector } from 'reselect';

/**
 * Direct selector to the loginPage state domain
 */
const selectLoginPageDomain = () => (state) => state.get('login');


 // const selectEmail = () => createSelector(
 //    selectLoginPageDomain(),
 //    (substate) => substate.get('email')
 //  );

  const selectPassword = () => createSelector(
    selectLoginPageDomain(),
    (substate) => substate.get('password')
  );
  const selectOtp = () => createSelector(
    selectLoginPageDomain(),
    (substate) => substate.get('otp')
  );
  const selectLoginSuccess = () => createSelector(
    selectLoginPageDomain(),
    (substate) => substate.get('loginSuccess')
  );
  const selectLoading = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.get('loading')
);


const selectUser = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.get('user')
);
const selectError = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.get('err')
);

const selectEmail = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.get('email')
);
const selectIsLogedin = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.get('isLogedin')
);
const selectIsRemember = () => createSelector(
  selectLoginPageDomain(),
  (substate) => substate.get('isRemember')
);

export {
  selectLoginPageDomain,
  selectEmail,
  selectPassword,
  selectLoginSuccess,
  selectLoading,
  selectIsLogedin,
  selectIsRemember,
  selectError,
  selectUser,
  selectOtp,
};
