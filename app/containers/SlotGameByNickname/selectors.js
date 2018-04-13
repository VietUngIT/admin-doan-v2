import { createSelector } from 'reselect';

/**
 * Direct selector to the slotGameByNickname state domain
 */
const selectSlotGameByNicknameDomain = () => (state) => state.get('slotGameByNickname');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SlotGameByNickname
 */

const selectDate = () => createSelector(
  selectSlotGameByNicknameDomain(),
  (substate) => substate.get('st')
);
const selectToDate = () => createSelector(
  selectSlotGameByNicknameDomain(),
  (substate) => substate.get('et')
);
const selectUser = () => createSelector(
  selectSlotGameByNicknameDomain(),
  (substate) => substate.get('un')
);
const selectData = () => createSelector(
  selectSlotGameByNicknameDomain(),
  (substate) => substate.get('data')
);
const selectGID = () => createSelector(
  selectSlotGameByNicknameDomain(),
  (substate) => substate.get('gid')
);
const selectisLoad = () => createSelector(
  selectSlotGameByNicknameDomain(),
  (substate) => substate.get('isLoad')
);
export {
  selectSlotGameByNicknameDomain,
  selectDate,
  selectToDate,
  selectGID,
  selectData,
  selectUser,
  selectisLoad,
};
