import { createSelector } from 'reselect';

/**
 * Direct selector to the prizeGame state domain
 */
const selectPrizeGameDomain = () => (state) => state.get('prizeGame');

const selectIsLoading = () => createSelector(
  selectPrizeGameDomain(),
  (substate) => substate.get("isLoading")
);
const selectData = () => createSelector(
  selectPrizeGameDomain(),
  (substate) => substate.get("data")
);
const selectIdE = () => createSelector(
  selectPrizeGameDomain(),
  (substate) => substate.get("id_e")
);
const selectTop = () => createSelector(
  selectPrizeGameDomain(),
  (substate) => substate.get("top")
);
const selectPrize = () => createSelector(
  selectPrizeGameDomain(),
  (substate) => substate.get("prize")
);
const selectPrizeEdit = () => createSelector(
  selectPrizeGameDomain(),
  (substate) => substate.get("prize_edit")
);
const selectIdEdit = () => createSelector(
  selectPrizeGameDomain(),
  (substate) => substate.get("id_edit")
);
const selectIdDel = () => createSelector(
  selectPrizeGameDomain(),
  (substate) => substate.get("id_del")
);
export {
  selectPrizeGameDomain,
  selectIsLoading,
  selectData,
  selectIdE,
  selectTop,
  selectIdDel,
  selectIdEdit,
  selectPrizeEdit,
  selectPrize,
};
