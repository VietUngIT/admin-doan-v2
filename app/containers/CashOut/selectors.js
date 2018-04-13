import { createSelector } from 'reselect';

/**
 * Direct selector to the cashOut state domain
 */
const selectCashOutDomain = () => (state) => state.get('cashOut');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CashOut
 */

const selectisLoad = () => createSelector(
  selectCashOutDomain(),
  (substate) => substate.get('isLoad')
);
const selectM = () => createSelector(
  selectCashOutDomain(),
  (substate) => substate.get('m')
);
const selectMt = () => createSelector(
  selectCashOutDomain(),
  (substate) => substate.get('mt')
);
const selectMaxCash = () => createSelector(
  selectCashOutDomain(),
  (substate) => substate.get('max_cash')
);
const selectDataSuccess = () => createSelector(
  selectCashOutDomain(),
  (substate) => substate.get('data_success')
);
export {
  selectCashOutDomain,
  selectisLoad,
  selectM,
  selectMt,
  selectMaxCash,
  selectDataSuccess,
};
