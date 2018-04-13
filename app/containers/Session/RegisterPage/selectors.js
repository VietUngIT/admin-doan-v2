import { createSelector } from 'reselect';

/**
 * Direct selector to the registerPage state domain
 */
const selectRegisterPageDomain = () => (state) => state.get('register');

const selectName = () => createSelector(
   selectRegisterPageDomain(),
   (substate) => substate.get('name')
 );
const selectFirstName = () => createSelector(
   selectRegisterPageDomain(),
   (substate) => substate.get('first_name')
 );
const selectLastName = () => createSelector(
   selectRegisterPageDomain(),
   (substate) => substate.get('last_name')
 );
const selectEmail = () => createSelector(
   selectRegisterPageDomain(),
   (substate) => substate.get('email')
 );

 const selectPassword = () => createSelector(
   selectRegisterPageDomain(),
   (substate) => substate.get('password')
 );

 const selectRegisterSuccess = () => createSelector(
   selectRegisterPageDomain(),
   (substate) => substate.get('registerSuccess')
 );
 const selectUserInfo = () => createSelector(
   selectRegisterPageDomain(),
   (substate) => substate.get('user_info')
 );



export {
  selectRegisterPageDomain,
  selectName,
  selectFirstName,
  selectLastName,
  selectEmail,
  selectPassword,
  selectRegisterSuccess,
  selectUserInfo,
};
