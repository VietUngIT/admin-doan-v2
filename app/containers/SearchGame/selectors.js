import { createSelector } from 'reselect';

/**
 * Direct selector to the searchGame state domain
 */
const selectSearchGameDomain = () => (state) => state.get('searchGame');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SearchGame
 */

const selectId = () => createSelector(
  selectSearchGameDomain(),
  (substate) => substate.get('id')
);
const selectIdName = () => createSelector(
  selectSearchGameDomain(),
  (substate) => substate.get('id_name')
);
const selectGnId = () => createSelector(
  selectSearchGameDomain(),
  (substate) => substate.get('gn_id')
);
const selectUser = () => createSelector(
  selectSearchGameDomain(),
  (substate) => substate.get('un')
);
const selectGnUn = () => createSelector(
  selectSearchGameDomain(),
  (substate) => substate.get('gn_un')
);
const selectGnName = () => createSelector(
  selectSearchGameDomain(),
  (substate) => substate.get('gn_name')
);
const selectDataId = () => createSelector(
  selectSearchGameDomain(),
  (substate) => substate.get('data_id')
);
const selectDataIdName = () => createSelector(
  selectSearchGameDomain(),
  (substate) => substate.get('data_id_name')
);
const selectDataUn = () => createSelector(
  selectSearchGameDomain(),
  (substate) => substate.get('data_un')
);
const selectData = () => createSelector(
  selectSearchGameDomain(),
  (substate) => substate.get('data')
);
const selectDate = () => createSelector(
  selectSearchGameDomain(),
  (substate) => substate.get('st')
);
const selectToDate = () => createSelector(
  selectSearchGameDomain(),
  (substate) => substate.get('et')
);
const selectisLoad = () => createSelector(
  selectSearchGameDomain(),
  (substate) => substate.get('isLoad')
);
const selectisLoadID = () => createSelector(
  selectSearchGameDomain(),
  (substate) => substate.get('isLoadId')
);
export {
  selectSearchGameDomain,
  selectId,
  selectGnId,
  selectUser,
  selectGnUn,
  selectDataId,
  selectDataUn,
  selectData,
  selectDate,
  selectToDate,
  selectisLoad,
  selectDataIdName,
  selectGnName,
  selectIdName,
  selectisLoadID,
};
