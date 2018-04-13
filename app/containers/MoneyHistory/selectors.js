import { createSelector } from 'reselect';

/**
 * Direct selector to the moneyHistory state domain
 */
const selectMoneyHistoryDomain = () => (state) => state.get('moneyHistory');

const selectSt = () => createSelector(
  selectMoneyHistoryDomain(),
  (substate) => substate.get('st')
);
const selectEt = () => createSelector(
  selectMoneyHistoryDomain(),
  (substate) => substate.get('et')
);
const selectUnGame = () => createSelector(
  selectMoneyHistoryDomain(),
  (substate) => substate.get('un_game')
);
const selectGnGame = () => createSelector(
  selectMoneyHistoryDomain(),
  (substate) => substate.get('gn_game')
);
const selectDataGame = () => createSelector(
  selectMoneyHistoryDomain(),
  (substate) => substate.get('data_game')
);
const selectIsLoadingGame = () => createSelector(
  selectMoneyHistoryDomain(),
  (substate) => substate.get('isLoading_game')
);
export {
  selectMoneyHistoryDomain,
  selectSt,
  selectEt,
  selectUnGame,
  selectGnGame,
  selectDataGame,
  selectIsLoadingGame,
};
