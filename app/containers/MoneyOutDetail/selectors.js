import { createSelector } from 'reselect';

/**
 * Direct selector to the moneyOutDetail state domain
 */
const selectMoneyOutDetailDomain = () => (state) => state.get('moneyOutDetail');

const selectDateDetail = () => createSelector(
  selectMoneyOutDetailDomain(),
  (substate) => substate.get('dateDetail')
);
const selectToDateDetail = () => createSelector(
  selectMoneyOutDetailDomain(),
  (substate) => substate.get('todateDetail')
);
const selectDataDetail = () => createSelector(
  selectMoneyOutDetailDomain(),
  (substate) => substate.get('dataDetail')
);
const selectUserDetail = () => createSelector(
  selectMoneyOutDetailDomain(),
  (substate) => substate.get('un_detail')
);
const selectisLoadDetail = () => createSelector(
  selectMoneyOutDetailDomain(),
  (substate) => substate.get('isLoadDetail')
);
export {
  selectMoneyOutDetailDomain,
  selectDateDetail,
  selectToDateDetail,
  selectDataDetail,
  selectUserDetail,
  selectisLoadDetail
};
