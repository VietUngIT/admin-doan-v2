import { createSelector } from 'reselect';

/**
 * Direct selector to the moneyTotal state domain
 */
const selectMoneyTotalDomain = () => (state) => state.get('moneyTotal');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MoneyTotal
 */

const makeSelectMoneyTotal = () => createSelector(
  selectMoneyTotalDomain(),
  (substate) => substate.toJS()
);

export default makeSelectMoneyTotal;
export {
  selectMoneyTotalDomain,
};
