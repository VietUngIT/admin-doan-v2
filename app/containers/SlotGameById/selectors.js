import { createSelector } from 'reselect';

/**
 * Direct selector to the slotGameById state domain
 */
const selectSlotGameByIdDomain = () => (state) => state.get('slotGameById');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SlotGameById
 */

const selectDate = () => createSelector(
  selectSlotGameByIdDomain(),
  (substate) => substate.get('st')
);
const selectToDate = () => createSelector(
  selectSlotGameByIdDomain(),
  (substate) => substate.get('et')
);
const selectData = () => createSelector(
  selectSlotGameByIdDomain(),
  (substate) => substate.get('data')
);
const selectID = () => createSelector(
  selectSlotGameByIdDomain(),
  (substate) => substate.get('id')
);


export {
  selectSlotGameByIdDomain,
  selectDate,
  selectToDate,
  selectID,
  selectData,
};
