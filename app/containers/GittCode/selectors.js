import { createSelector } from 'reselect';

/**
 * Direct selector to the gittCode state domain
 */
const selectGittCodeDomain = () => (state) => state.get('gittCode');

/**
 * Other specific selectors
 */


/**
 * Default selector used by GittCode
 */

const selectIsLoad = () => createSelector(
  selectGittCodeDomain(),
  (substate) => substate.get('isLoad')
);
const selectData = () => createSelector(
  selectGittCodeDomain(),
  (substate) => substate.get('data')
);
const selectA = () => createSelector(
  selectGittCodeDomain(),
  (substate) => substate.get('a')
);
const selectT = () => createSelector(
  selectGittCodeDomain(),
  (substate) => substate.get('t')
);
const selectSt = () => createSelector(
  selectGittCodeDomain(),
  (substate) => substate.get('st')
);
const selectEt = () => createSelector(
  selectGittCodeDomain(),
  (substate) => substate.get('et')
);
const selectC = () => createSelector(
  selectGittCodeDomain(),
  (substate) => substate.get('c')
);
const selectV = () => createSelector(
  selectGittCodeDomain(),
  (substate) => substate.get('v')
);
const selectDataGTT = () => createSelector(
  selectGittCodeDomain(),
  (substate) => substate.get('data_gtt')
);
const selectDataGCD = () => createSelector(
  selectGittCodeDomain(),
  (substate) => substate.get('data_gcd')
);
const selectDataGHV = () => createSelector(
  selectGittCodeDomain(),
  (substate) => substate.get('data_ghv')
);
const selectUn = () => createSelector(
  selectGittCodeDomain(),
  (substate) => substate.get('nn')
);
const selectNN = () => createSelector(
  selectGittCodeDomain(),
  (substate) => substate.get('nn')
);
const selectTS = () => createSelector(
  selectGittCodeDomain(),
  (substate) => substate.get('tS')
);
const selectCS = () => createSelector(
  selectGittCodeDomain(),
  (substate) => substate.get('cS')
);
const selectDate = () => createSelector(
  selectGittCodeDomain(),
  (substate) => substate.get('date')
);
const selectVS = () => createSelector(
  selectGittCodeDomain(),
  (substate) => substate.get('vS')
);
const selectAd = () => createSelector(
  selectGittCodeDomain(),
  (substate) => substate.get('ad')
);
const selectId = () => createSelector(
  selectGittCodeDomain(),
  (substate) => substate.get('id')
);
const selectCheckDelete = () => createSelector(
  selectGittCodeDomain(),
  (substate) => substate.get('deleteSuccess')
);
const selectCode = () => createSelector(
  selectGittCodeDomain(),
  (substate) => substate.get('code')
);
export {
  selectGittCodeDomain,
  selectIsLoad,
  selectData,
  selectA,
  selectT,
  selectSt,
  selectEt,
  selectC,
  selectV,
  selectDataGTT,
  selectDataGCD,
  selectDataGHV,
  selectUn,

  selectTS,
  selectCS,
  selectNN,
  selectDate,
  selectVS,
  selectAd,

  selectId,
  selectCheckDelete,

  selectCode,
};
