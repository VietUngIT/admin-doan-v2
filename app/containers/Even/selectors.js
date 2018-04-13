import { createSelector } from 'reselect';

/**
 * Direct selector to the even state domain
 */
const selectEvenDomain = () => (state) => state.get('even');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Even
 */

const selectisGet = () => createSelector(
  selectEvenDomain(),
  (substate) => substate.get('isGet')
);
const selectData = () => createSelector(
  selectEvenDomain(),
  (substate) => substate.get('data')
);
const selectGId = () => createSelector(
  selectEvenDomain(),
  (substate) => substate.get('gid')
);
const selectUn = () => createSelector(
  selectEvenDomain(),
  (substate) => substate.get('un')
);
const selectBet = () => createSelector(
  selectEvenDomain(),
  (substate) => substate.get('b')
);
const selectT = () => createSelector(
  selectEvenDomain(),
  (substate) => substate.get('t')
);
const selectID = () => createSelector(
  selectEvenDomain(),
  (substate) => substate.get('id')
);
const selectActive = () => createSelector(
  selectEvenDomain(),
  (substate) => substate.get('active')
);


export {
  selectEvenDomain,
  selectisGet,
  selectData,
  selectGId,
  selectUn,
  selectBet,
  selectT,
  selectID,
  selectActive,
 
};
