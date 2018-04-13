import { createSelector } from 'reselect';

/**
 * Direct selector to the moneyContainer state domain
 */
const selectMoneyContainerDomain = () => (state) => state.get('moneyContainer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MoneyContainer
 */

const makeSelectMoneyContainer = () => createSelector(
  selectMoneyContainerDomain(),
  (substate) => substate.toJS()
);

export default makeSelectMoneyContainer;
export {
  selectMoneyContainerDomain,
};
