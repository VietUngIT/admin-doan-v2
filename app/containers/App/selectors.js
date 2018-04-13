import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectTCard = () => createSelector(
  selectGlobal(),
  (substate) => substate.get("t")
);
const selectCountCard = () => createSelector(
  selectGlobal(),
  (substate) => substate.get('count')
);
const selectCountDL = () => createSelector(
  selectGlobal(),
  (substate) => substate.get('countDL')
);
const selectDataCard = () => createSelector(
  selectGlobal(),
  (substate) => substate.get("data_card")
);
const selectDataDL = () => createSelector(
  selectGlobal(),
  (substate) => substate.get("data")
);
const selectIsDuyetDLTab = () => createSelector(
  selectGlobal(),
  (substate) => substate.get("isDuyetDLTab")
);
const selectKey = () => createSelector(
  selectGlobal(),
  (substate) => substate.get('key')
);
const selectSuggestData = () => createSelector(
  selectGlobal(),
  (substate) => substate.get('suggest_data')
);
const selectIsMobile = () => createSelector(
  selectGlobal(),
  (substate) => substate.get('isMobile')
);
const selectIsSuperAdmin = () => createSelector(
  selectGlobal(),
  (substate) => substate.get('isSuperAdmin')
);
const selectGetListDomains = () => createSelector(
  selectGlobal(),
  (substate) => substate.get('domains')
);

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectRepos = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  selectGetListDomains,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocationState,
  selectIsMobile,
  selectIsSuperAdmin,
  selectKey,
  selectSuggestData,
  selectDataDL,
  selectIsDuyetDLTab,
  selectTCard,
  selectDataCard,
  selectCountCard,
  selectCountDL,
};
