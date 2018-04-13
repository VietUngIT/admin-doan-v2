import { createSelector } from 'reselect';

/**
 * Direct selector to the totalMoney state domain
 */
const selectTotalMoneyDomain = () => (state) => state.get('totalMoney');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TotalMoney
 */

const selectKey = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('key')
);
const selectSuggestData = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('suggest_data')
);
const selectDateMoney = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('dateMoney')
);
const selectToDateMoney = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('todateMoney')
); 

const selectDateInput = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('dateInput')
);
const selectToDateInput = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('todateInput')
);

const selectDateOutput = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('dateOutput')
);
const selectToDateOutput = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('todateOutput')
);

const selectDateDetail = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('dateDetail')
);
const selectToDateDetail = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('todateDetail')
);
const selectType = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('typeInput')
);

const selectDataMoney = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('dataMoney')
);
const selectDataInput = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('dataInput')
);
const selectDataOut = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('dataOutput')
);
const selectDataDetail = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('dataDetail')
);
const selectUser = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('un')
);
const selectUserAPI = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('un_api')
);
const selectUserOut = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('un_out')
);
const selectUserDetail = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('un_detail')
);
const selectisLoadDetail = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('isLoadDetail')
);
const selectisLoadMoney = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('isLoadMoney')
);
const selectisLoadInput = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('isLoadInput')
);
const selectisLoadOutput = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('isLoadOutput')
);
const selectisLoadHDH = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('isLoadHDH')
);
const selectDataHDH = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('data_hdh')
);
const selectST = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('st')
);
const selectET = () => createSelector(
  selectTotalMoneyDomain(),
  (substate) => substate.get('et')
);
export {
  selectTotalMoneyDomain,
  selectDateMoney,
  selectToDateMoney,
  selectToDateOutput,
  selectDateInput,
  selectToDateInput,
  selectDateOutput,
  selectDateDetail,
  selectToDateDetail,
  selectType,
  selectDataMoney,
  selectDataInput,
  selectDataOut,
  selectDataDetail,
  selectUser,
  selectUserAPI,
  selectUserOut,
  selectUserDetail,
  selectisLoadDetail,
  selectisLoadMoney,
  selectisLoadInput,
  selectisLoadOutput,

  selectKey,
  selectSuggestData,

  selectDataHDH,
  selectisLoadHDH,

  selectST,
  selectET
};
