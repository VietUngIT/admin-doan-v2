import { createSelector } from 'reselect';

/**
 * Direct selector to the miniGame state domain
 */
const selectMiniGameDomain = () => (state) => state.get('miniGame');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MiniGame
 */

const selectUser = () => createSelector(
  selectMiniGameDomain(),
  (substate) => substate.get('un')
);
const selectGName = () => createSelector(
  selectMiniGameDomain(),
  (substate) => substate.get('gn')
);
const selectDate = () => createSelector(
  selectMiniGameDomain(),
  (substate) => substate.get('st')
);
const selectToDate = () => createSelector(
  selectMiniGameDomain(),
  (substate) => substate.get('et')
);
const selectData = () => createSelector(
  selectMiniGameDomain(),
  (substate) => substate.get('data')
);
const selectisLoad = () => createSelector(
  selectMiniGameDomain(),
  (substate) => substate.get('isLoad')
);
const selectGId = () => createSelector(
  selectMiniGameDomain(),
  (substate) => substate.get('g_id')
);
const selectId = () => createSelector(
  selectMiniGameDomain(),
  (substate) => substate.get('id')
);
const selectDataId = () => createSelector(
  selectMiniGameDomain(),
  (substate) => substate.get('dataId')
);
const selectisLoadId = () => createSelector(
  selectMiniGameDomain(),
  (substate) => substate.get('idLoad')
);
export {
  selectMiniGameDomain,
  selectUser,
  selectGName,
  selectDate,
  selectToDate,
  selectData,
  selectisLoad,
  selectGId,
  selectId,
  selectDataId,
  selectisLoadId,
};
