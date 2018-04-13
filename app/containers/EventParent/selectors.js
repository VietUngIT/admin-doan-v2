import { createSelector } from 'reselect';

/**
 * Direct selector to the eventParent state domain
 */
const selectEventParentDomain = () => (state) => state.get('eventParent');

const selectEventName = () => createSelector(
  selectEventParentDomain(),
  (substate) => substate.get("event_name")
);
const selectIsLoadingParent = () => createSelector(
  selectEventParentDomain(),
  (substate) => substate.get("isLoading")
);
const selectDataParent = () => createSelector(
  selectEventParentDomain(),
  (substate) => substate.get("data")
);
export {
  selectEventParentDomain,
  selectEventName,
  selectIsLoadingParent,
  selectDataParent
};
