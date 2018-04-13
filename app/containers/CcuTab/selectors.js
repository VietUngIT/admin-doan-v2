import { createSelector } from 'reselect';

/**
 * Direct selector to the ccuTab state domain
 */
const selectCcuTabDomain = () => (state) => state.get('ccuTab');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CcuTab
 */
const selectSTime = () => createSelector(
  selectCcuTabDomain(),
  (substate) => substate.get('sTime')
);

const selectETime = () => createSelector(
  selectCcuTabDomain(),
  (substate) => substate.get('eTime')
);

const selectCcuLog = () => createSelector(
  selectCcuTabDomain(),
  (substate) => substate.get('ccuLog')
);
const selectCcuHis = () => createSelector(
  selectCcuTabDomain(),
  (substate) => substate.get('ccuHis')
);

export {
  selectCcuTabDomain,
  selectSTime,
  selectETime,
  selectCcuLog,
  selectCcuHis,
  
};
