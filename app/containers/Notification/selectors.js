import { createSelector } from 'reselect';

/**
 * Direct selector to the notification state domain
 */
const selectNotificationDomain = () => (state) => state.get('notification');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Notification
 */
const selectIsGetAll = () => createSelector(
  selectNotificationDomain(),
  (substate) => substate.get('isGetAll')
);
const selectData = () => createSelector(
  selectNotificationDomain(),
  (substate) => substate.get('data')
);
const selectB = () => createSelector(
  selectNotificationDomain(),
  (substate) => substate.get('b')
);
const selectEt = () => createSelector(
  selectNotificationDomain(),
  (substate) => substate.get('et')
);
const selectIDEdit = () => createSelector(
  selectNotificationDomain(),
  (substate) => substate.get('id_edit')
);
const selectBEdit = () => createSelector(
  selectNotificationDomain(),
  (substate) => substate.get('b_edit')
);
const selectIDDel = () => createSelector(
  selectNotificationDomain(),
  (substate) => substate.get('id_del')
);
const selectIsDelSuccess = () => createSelector(
  selectNotificationDomain(),
  (substate) => substate.get('isDeleteSuccess')
);

export {
  selectNotificationDomain,
  selectIsGetAll,
  selectData,
  selectB,
  selectEt,
  selectIDEdit,
  selectBEdit,
  selectIDDel,
  selectIsDelSuccess,
};
