import { createSelector } from 'reselect';

/**
 * Direct selector to the topLoose state domain
 */
const selectTopLooseDomain = () => (state) => state.get('topLoose');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TopLoose
 */
const selectFromDate = () => createSelector(
  selectTopLooseDomain(),
  (substate) => substate.get('st')
);
const selectToDate = () => createSelector(
  selectTopLooseDomain(),
  (substate) => substate.get('et')
);
const selectGameName = () => createSelector(
  selectTopLooseDomain(),
  (substate) => substate.get('gn')
);
const selectUser = () => createSelector(
  selectTopLooseDomain(),
  (substate) => substate.get('un')
);
const selectisLoadLoose = () => createSelector(
  selectTopLooseDomain(),
  (substate) => substate.get('isLoadLoose')
);
const selectDataLooseUser = () => createSelector(
  selectTopLooseDomain(),
  (substate) => substate.get('data_loose_user')
);
const selectDataLooseBot = () => createSelector(
  selectTopLooseDomain(),
  (substate) => substate.get('data_loose_bot')
);
export {
  selectTopLooseDomain,
  selectisLoadLoose,
  selectDataLooseUser,
  selectDataLooseBot,
  selectFromDate,
  selectToDate,
  selectGameName,
  selectUser,  
};
