import { createSelector } from 'reselect';

/**
 * Direct selector to the eventGame state domain
 */
const selectEventGameDomain = () => (state) => state.get('eventGame');

const selectIsLoading = () => createSelector(
  selectEventGameDomain(),
  (substate) => substate.get("isLoading")
);
const selectData = () => createSelector(
  selectEventGameDomain(),
  (substate) => substate.get("data")
);

const selectST = () => createSelector(
  selectEventGameDomain(),
  (substate) => substate.get("st")
);
const selectEN = () => createSelector(
  selectEventGameDomain(),
  (substate) => substate.get("en")
);
const selectGN = () => createSelector(
  selectEventGameDomain(),
  (substate) => substate.get("gn")
);
const selectNE = () => createSelector(
  selectEventGameDomain(),
  (substate) => substate.get("ne")
);
const selectCount = () => createSelector(
  selectEventGameDomain(),
  (substate) => substate.get("count")
);

const selectStEdit = () => createSelector(
  selectEventGameDomain(),
  (substate) => substate.get("st_edit")
);
const selectEnEdit = () => createSelector(
  selectEventGameDomain(),
  (substate) => substate.get("en_edit")
);
const selectIdEdit = () => createSelector(
  selectEventGameDomain(),
  (substate) => substate.get("id_edit")
);
const selectStatusEdit = () => createSelector(
  selectEventGameDomain(),
  (substate) => substate.get("status")
);
const selectNeEdit = () => createSelector(
  selectEventGameDomain(),
  (substate) => substate.get("ne_edit")
);

const selectIdDel = () => createSelector(
  selectEventGameDomain(),
  (substate) => substate.get("id_del")
);

export {
  selectEventGameDomain,
  selectIdDel,
  selectNeEdit,
  selectStatusEdit,
  selectIdEdit,
  selectEnEdit,
  selectStEdit,
  selectCount,
  selectNE,
  selectGN,
  selectEN,
  selectST,
  selectData,
  selectIsLoading,
};
