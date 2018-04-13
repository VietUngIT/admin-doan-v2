import { createSelector } from 'reselect';

/**
 * Direct selector to the setAdmin state domain
 */
const selectSetAdminDomain = () => (state) => state.get('setAdmin');

const selectPass = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('pass')
);
const selectUser = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('un')
);
const selectUserName = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('unn')
);
const selectRole = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('r')
);
const selectSDT = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('sdt')
);
const selectCMT = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('cmt')
);
const selectM = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('m')
);
const selectA = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('a')
);
const selectEM = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('em')
);
const selectSM = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('sm')
);
const selectLock = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('l')
);
const selectData = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('data')
);
const selectInfo = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('info')
);
const selectP = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('p')
);
const selectIsLoading = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('isLoading')
);
const selectIsLoadingHis = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('isLoading_his')
);
const selectHisAdmin = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('his_admin')
);
const selectKey = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('key')
);
const selectSuggestData = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('suggest_data')
);

const selectPhone = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('phone')
);
const selectCMTND = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('cmtnd')
);
const selectEmail = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('email')
);
const selectTotal = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('total')
);
const selectKet = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('ket')
);
const selectActive = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('active')
);
const selectLockEdit = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('lock')
);
const selectRoleEdit = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('role')
);
const selectNotePhone = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('note_phone')
);
const selectNoteCMT = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('note_cmtnd')
);
const selectNoteEmail = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('note_email')
);
const selectNoteActive = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('note_active')
);
const selectNoteLock = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('note_lock')
);
const selectNoteTotal = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('note_total')
);
const selectNoteKet = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('note_ket')
);
const selectNoteRole = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('note_role')
);

const selectSt = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('st')
);
const selectEt = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('et')
);
const selectStart = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('start')
);
const selectEnd = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('end')
);
const selectNick = () => createSelector(
  selectSetAdminDomain(),
  (substate) => substate.get('nick')
);
export {
  selectSetAdminDomain,
  selectStart,
  selectEnd,
  selectNick,
  
  selectPhone,
  selectCMTND,
  selectEmail,
  selectTotal,
  selectKet,
  selectActive,
  selectLockEdit,
  selectRoleEdit,
  selectSt,
  selectEt,

  selectNotePhone,
  selectNoteCMT,
  selectNoteEmail,
  selectNoteActive,
  selectNoteLock,
  selectNoteTotal,
  selectNoteKet,
  selectNoteRole,

  selectUser,
  selectRole,
  selectSDT,
  selectCMT,
  selectM,
  selectA,
  selectEM,
  selectSM,
  selectLock,
  selectData,
  selectInfo,
  selectIsLoading,
  selectIsLoadingHis,
  selectHisAdmin,
  selectP,
  selectKey,
  selectSuggestData,
  selectUserName,

  selectPass,
};
