import { createSelector } from 'reselect';

/**
 * Direct selector to the messege state domain
 */
const selectMessegeDomain = () => (state) => state.get('message');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Messege
 */
const selectData = () => createSelector(
  selectMessegeDomain(),
  (substate) => substate.get('data')
);
const selectTitle = () => createSelector(
  selectMessegeDomain(),
  (substate) => substate.get('tt')
);
const selectMess = () => createSelector(
  selectMessegeDomain(),
  (substate) => substate.get('mes')
);
const selectLu = () => createSelector(
  selectMessegeDomain(),
  (substate) => substate.get('lu')
);
const selectIsGetAll= () => createSelector(
  selectMessegeDomain(),
  (substate) => substate.get('isGetAll')
);
const selectIsSendAll = () => createSelector(
  selectMessegeDomain(),
  (substate) => substate.get('isSendAll')
);
const selectIsSendSome = () => createSelector(
  selectMessegeDomain(),
  (substate) => substate.get('isSendSome')
);
const selectId = () => createSelector(
  selectMessegeDomain(),
  (substate) => substate.get('id')
);
const selectCheckDeleteMsg = () => createSelector(
  selectMessegeDomain(),
  (substate) => substate.get('deleteMsgSuccess')
);
const selectKey = () => createSelector(
  selectMessegeDomain(),
  (substate) => substate.get('key')
);
const selectSuggestData = () => createSelector(
  selectMessegeDomain(),
  (substate) => substate.get('suggest_data')
);
export {
  selectMessegeDomain,
  selectData,
  selectTitle,
  selectMess,
  selectLu,
  selectIsGetAll,
  selectIsSendAll,
  selectIsSendSome,
  selectId,
  selectCheckDeleteMsg,
  selectKey,
  selectSuggestData,
};
