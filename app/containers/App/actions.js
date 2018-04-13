import {
  GET_DOMAINS,
  GET_DOMAINS_SUCCESS,
  IS_MOBILE,
  IS_SUPER_ADMIN,
  SUGGEST_USER_BY_NN,
  SUGGEST_USER_BY_NN_SUCCESS,
  LOAD_DUYET_DL_CONFIRM,
  LOAD_DUYET_DL_SUCCESS,
  IS_DUYET_DL_TAB,
  LOAD_DUYET_CARD,
  LOAD_DUYET_CARD_SUCCESS,
  COUNT_CARD,
  COUNT_DL,

} from './constants';
export function duyetDLTab(value) {
  return {
    type: IS_DUYET_DL_TAB,
    value
  };
}
export function count_card(count) {
  return {
    type: COUNT_CARD,
    count
  };
}
export function count_dl(count) {
  return {
    type: COUNT_DL,
    count
  };
}
export function getDomains() {
  return {
    type: GET_DOMAINS,
  };
}
export function getDomainsSuccess(listdomain) {
  return {
    type: GET_DOMAINS_SUCCESS,
    listdomain,
  };
}
export function saveMobile(isMobile) {
  return {
    type: IS_MOBILE,
    isMobile,
  };
}
export function checkSuperAdmin(isSuperAdmin) {
  return {
    type: IS_SUPER_ADMIN,
    isSuperAdmin,
  };
}
export function suggest_user_by_nickname(key) {
  return {
    type: SUGGEST_USER_BY_NN,
    key,
  };
}
export function suggest_user_by_nickname_success(data) {
  return {
    type: SUGGEST_USER_BY_NN_SUCCESS,
    data,
  };
}
export function load_duyet_dl_confirm(page) {
  return {
    type: LOAD_DUYET_DL_CONFIRM,
    page,
    
  };
}
export function load_duyet_dl_success(data) {
  return {
    type: LOAD_DUYET_DL_SUCCESS,
    data
  };
}
export function load_duyet_card(t) {
  return {
    type: LOAD_DUYET_CARD,
    t
  };
}
export function load_duyet_card_success(data) {
  return {
    type: LOAD_DUYET_CARD_SUCCESS,
    data,
  };
}