import { createSelector } from 'reselect';

/**
 * Direct selector to the daiLy state domain
 */
const selectDaiLyDomain = () => (state) => state.get('daiLy');

/**
 * Other specific selectors
 */


/**
 * Default selector used by DaiLy
 */

const selectIsLoading = () => createSelector(
  selectDaiLyDomain(),
  (substate) => substate.get('isLoading')
);
const selectPage = () => createSelector(
  selectDaiLyDomain(),
  (substate) => substate.get('page')
);
const selectTotalPage = () => createSelector(
  selectDaiLyDomain(),
  (substate) => substate.get('total')
);
const selectData = () => createSelector(
  selectDaiLyDomain(),
  (substate) => substate.get('data')
);
const selectNAUpdate = () => createSelector(
  selectDaiLyDomain(),
  (substate) => substate.get('na_u')
);
const selectPhoneUpdate = () => createSelector(
  selectDaiLyDomain(),
  (substate) => substate.get('p_u')
);
const selectAUpdate = () => createSelector(
  selectDaiLyDomain(),
  (substate) => substate.get('a_u')
);
const selectFUpdate = () => createSelector(
  selectDaiLyDomain(),
  (substate) => substate.get('f_u')
);
const selectNickUpdate = () => createSelector(
  selectDaiLyDomain(),
  (substate) => substate.get('nick_u')
);
const selectIsUpdate = () => createSelector(
  selectDaiLyDomain(),
  (substate) => substate.get('isUpdate')
);
const selectNA = () => createSelector(
  selectDaiLyDomain(),
  (substate) => substate.get('na')
);
const selectPhone = () => createSelector(
  selectDaiLyDomain(),
  (substate) => substate.get('p')
);
const selectA = () => createSelector(
  selectDaiLyDomain(),
  (substate) => substate.get('a')
);
const selectF = () => createSelector(
  selectDaiLyDomain(),
  (substate) => substate.get('f')
);
const selectNick = () => createSelector(
  selectDaiLyDomain(),
  (substate) => substate.get('nick')
);
const selectIsAdd = () => createSelector(
  selectDaiLyDomain(),
  (substate) => substate.get('isAdd')
);

const selectNNDel = () => createSelector(
  selectDaiLyDomain(),
  (substate) => substate.get('nick_del')
);
const selectManager = () => createSelector(
  selectDaiLyDomain(),
  (substate) => substate.get('manager')
);
const selectMA = () => createSelector(
  selectDaiLyDomain(),
  (substate) => substate.get('ma')
);
export {
  selectDaiLyDomain,
  selectIsLoading,
  selectIsUpdate,
  selectIsAdd,
  selectData,
  selectPage,
  selectTotalPage,
  selectMA,
  selectManager,

  selectNAUpdate,
  selectAUpdate,
  selectFUpdate,
  selectNickUpdate,
  selectPhoneUpdate,

  selectNA,
  selectA,
  selectF,
  selectNick,
  selectPhone,

  selectNNDel,
};
