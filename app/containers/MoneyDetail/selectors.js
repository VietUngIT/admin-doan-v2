import { createSelector } from 'reselect';

/**
 * Direct selector to the moneyDetail state domain
 */
const selectMoneyDetailDomain = () => (state) => state.get('moneyDetail');

const selectDateInput = () => createSelector(
  selectMoneyDetailDomain(),
  (substate) => substate.get('dateInput')
);
const selectToDateInput = () => createSelector(
  selectMoneyDetailDomain(),
  (substate) => substate.get('todateInput')
);
const selectType = () => createSelector(
  selectMoneyDetailDomain(),
  (substate) => substate.get('typeInput')
);
const selectDataInput = () => createSelector(
  selectMoneyDetailDomain(),
  (substate) => substate.get('dataInput')
);
const selectUserAPI = () => createSelector(
  selectMoneyDetailDomain(),
  (substate) => substate.get('un_api')
);
const selectisLoadInput = () => createSelector(
  selectMoneyDetailDomain(),
  (substate) => substate.get('isLoadInput')
);
export {
  selectMoneyDetailDomain,
  selectDateInput,
  selectToDateInput,
  selectType,
  selectDataInput,
  selectUserAPI,
  selectisLoadInput,
};
