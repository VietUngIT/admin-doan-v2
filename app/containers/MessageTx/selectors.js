import { createSelector } from 'reselect';

/**
 * Direct selector to the messageTx state domain
 */
const selectMessageTxDomain = () => (state) => state.get('messageTx');


const selectMgs = () => createSelector(
  selectMessageTxDomain(),
  (substate) => substate.get("mgs")
);
const selectBet = () => createSelector(
  selectMessageTxDomain(),
  (substate) => substate.get("bet")
);
const selectType = () => createSelector(
  selectMessageTxDomain(),
  (substate) => substate.get("type")
);
const selectIsSuccessMes = () => createSelector(
  selectMessageTxDomain(),
  (substate) => substate.get("isSuccessMes")
);
const selectIsSuccessBet = () => createSelector(
  selectMessageTxDomain(),
  (substate) => substate.get("isSuccessBet")
);

const selectTypeGet = () => createSelector(
  selectMessageTxDomain(),
  (substate) => substate.get("type_get")
);
const selectIsLoading = () => createSelector(
  selectMessageTxDomain(),
  (substate) => substate.get("isLoading")
);
const selectData = () => createSelector(
  selectMessageTxDomain(),
  (substate) => substate.get("data")
);
const selectMgsEdit = () => createSelector(
  selectMessageTxDomain(),
  (substate) => substate.get("mgs_edit")
);
const selectIDEdit = () => createSelector(
  selectMessageTxDomain(),
  (substate) => substate.get("id_edit")
);
const selectIDDel = () => createSelector(
  selectMessageTxDomain(),
  (substate) => substate.get("id_del")
);
export {
  selectMessageTxDomain,
  selectMgs,
  selectBet,
  selectType,
  selectIsSuccessMes,
  selectIsSuccessBet,
  selectTypeGet,
  selectIsLoading,
  selectData,
  selectMgsEdit,
  selectIDEdit,
  selectIDDel,
};
