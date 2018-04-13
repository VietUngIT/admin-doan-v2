import { createSelector } from 'reselect';

/**
 * Direct selector to the sumTx state domain
 */
const selectSumTxDomain = () => (state) => state.get('sumTx');

const selectBet = () => createSelector(
  selectSumTxDomain(),
  (substate) => substate.get("bet")
);

export {
  selectSumTxDomain,
  selectBet,
};
