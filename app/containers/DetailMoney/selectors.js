import { createSelector } from 'reselect';

/**
 * Direct selector to the detailMoney state domain
 */
const selectDetailMoneyDomain = () => (state) => state.get('detailMoney');

const selectKey = () => createSelector(
  selectDetailMoneyDomain(),
  (substate) => substate.get('key')
);
const selectSuggestData = () => createSelector(
  selectDetailMoneyDomain(),
  (substate) => substate.get('suggest_data')
);
const selectDateDetail = () => createSelector(
  selectDetailMoneyDomain(),
  (substate) => substate.get('dateDetail')
);
const selectToDateDetail = () => createSelector(
  selectDetailMoneyDomain(),
  (substate) => substate.get('todateDetail')
);
const selectDataDetail = () => createSelector(
  selectDetailMoneyDomain(),
  (substate) => substate.get('dataDetail')
);
const selectUserDetail = () => createSelector(
  selectDetailMoneyDomain(),
  (substate) => substate.get('un_detail')
);
const selectisLoadDetail = () => createSelector(
  selectDetailMoneyDomain(),
  (substate) => substate.get('isLoadDetail')
);
export {
  selectDetailMoneyDomain,
  selectDateDetail,
  selectToDateDetail,
  selectDataDetail,
  selectUserDetail,
  selectisLoadDetail,
  selectKey,
  selectSuggestData,
};
