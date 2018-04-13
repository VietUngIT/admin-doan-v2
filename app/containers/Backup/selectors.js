import { createSelector } from 'reselect';

/**
 * Direct selector to the backup state domain
 */
const selectBackupDomain = () => (state) => state.get('backup');

const selectIsLoading = () => createSelector(
  selectBackupDomain(),
  (substate) => substate.get("isLoading")
);
const selectData = () => createSelector(
  selectBackupDomain(),
  (substate) => substate.get("data")
);
export {
  selectBackupDomain,
  selectIsLoading,
  selectData,
};
