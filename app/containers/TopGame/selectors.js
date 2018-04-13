import { createSelector } from 'reselect';

/**
 * Direct selector to the topGame state domain
 */
const selectTopGameDomain = () => (state) => state.get('topGame');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TopGame
 */
const selectFromDate = () => createSelector(
  selectTopGameDomain(),
  (substate) => substate.get('st')
);
const selectToDate = () => createSelector(
  selectTopGameDomain(),
  (substate) => substate.get('et')
);
const selectGameName = () => createSelector(
  selectTopGameDomain(),
  (substate) => substate.get('gn')
);
const selectUser = () => createSelector(
  selectTopGameDomain(),
  (substate) => substate.get('un')
);
const selectDataWinUser = () => createSelector(
  selectTopGameDomain(),
  (substate) => substate.get('data_win_user')
);
const selectDataWinBot = () => createSelector(
  selectTopGameDomain(),
  (substate) => substate.get('data_win_bot')
);
const selectisLoadWin = () => createSelector(
  selectTopGameDomain(),
  (substate) => substate.get('isLoadWin')
);

export {
  selectTopGameDomain,
  selectFromDate,
  selectToDate,
  selectGameName,
  selectUser,
  selectDataWinUser,
  selectDataWinBot,
  selectisLoadWin,
};
