/*
 *
 * SetAdmin actions
 *
 */

import {
  SET_ADMIN,
  SET_ADMIN_SUCCESS,
  GET_ADMIN,
  GET_ADMIN_SUCCESS,
  GET_HIS_ADMIN,
  GET_HIS_ADMIN_SUCCESS,
  GET_ADMIN_BY_PHONE,
  GET_ADMIN_BY_PHONE_SUCCESS,
  
  SUGGEST_USER_BY_NN,
  SUGGEST_USER_BY_NN_SUCCESS,

  EDIT_PHONE,
  EDIT_EMAIL,
  EDIT_CMT,
  EDIT_ROLE,
  EDIT_TOTAL,
  EDIT_ACTIVE,
  EDIT_LOCK,
  EDIT_KET,
  EDIT_PHONE_SUCCESS,
  EDIT_EMAIL_SUCCESS,
  EDIT_CMT_SUCCESS,
  EDIT_ROLE_SUCCESS,
  EDIT_TOTAL_SUCCESS,
  EDIT_ACTIVE_SUCCESS,
  EDIT_LOCK_SUCCESS,
  EDIT_KET_SUCCESS,
  SEARCH_BY_TIME_SUCCESS,
  SEARCH_BY_TIME,
  RESET_PASS,
  RESET_PASS_SUCCESS,
} from './constants';

export function reset_pass(nick) {
  return {
    type: RESET_PASS,
    nick,
  };
}
export function reset_pass_success(pass) {
  return {
    type: RESET_PASS_SUCCESS,
    pass,
  };
}
export function edit_phone(un,p,note) {
  return {
    type: EDIT_PHONE,
    un,
    p,
    note,
  };
}
export function search_by_time(nick,st,et) {
  return {
    type: SEARCH_BY_TIME,
    st,
    et,
    nick,
  };
}
export function search_by_time_success(data) {
  return {
    type: SEARCH_BY_TIME_SUCCESS,
    data,
  };
}
export function edit_email(un,e,note) {
  return {
    type: EDIT_EMAIL,
    un,
    e,
    note,
  };
}
export function edit_cmt(un,cmt,note) {
  return {
    type: EDIT_CMT,
    un,
    cmt,
    note,
  };
}
export function edit_role(un,role,note) {
  return {
    type: EDIT_ROLE,
    un,
    role,
    note,
  };
}
export function edit_active(un,ac,note) {
  return {
    type: EDIT_ACTIVE,
    un,
    ac,
    note,
  };
}
export function edit_total(un,total,note) {
  return {
    type: EDIT_TOTAL,
    un,
    total,
    note,
  };
}
export function edit_ket(un,money,note) {
  return {
    type: EDIT_KET,
    un,
    money,
    note,
  };
}
export function edit_lock(un,lock,note) {
  return {
    type: EDIT_LOCK,
    un,
    lock,
    note,
    
  };
}
export function edit_phone_success() {
  return {
    type: EDIT_PHONE_SUCCESS,
   
  };
}
export function edit_cmt_success() {
  return {
    type: EDIT_CMT_SUCCESS,
   
  };
}
export function edit_email_success() {
  return {
    type: EDIT_EMAIL_SUCCESS,
   
  };
}
export function edit_total_success() {
  return {
    type: EDIT_TOTAL_SUCCESS,
   
  };
}
export function edit_ket_success() {
  return {
    type: EDIT_KET_SUCCESS,
   
  };
}
export function edit_active_success() {
  return {
    type: EDIT_ACTIVE_SUCCESS,
   
  };
}
export function edit_role_success() {
  return {
    type: EDIT_ROLE_SUCCESS,
   
  };
}
export function edit_lock_success() {
  return {
    type: EDIT_LOCK_SUCCESS,
   
  };
}
export function setAdmin(un,r,sdt,cmt,m,a,em,sm,l) {
  return {
    type: SET_ADMIN,
    un,
    r,
    sdt,
    cmt,
    m,
    a,
    em,
    sm,
    l,
  };
}
export function setAdminSuccess(data) {
  return {
    type: SET_ADMIN_SUCCESS,
    data,
  };
}
export function getAdmin(un,p,unn) {
  return {
    type: GET_ADMIN,
    un,
    p,
    unn,
  };
}
export function getAdminSuccess(data) {
  return {
    type: GET_ADMIN_SUCCESS,
    data,
  };
}
export function getHisAdmin() {
  return {
    type: GET_HIS_ADMIN,
  };
}
export function getHisAdminSuccess(data) {
  return {
    type: GET_HIS_ADMIN_SUCCESS,
    data,
  };
}
export function get_admin_by_phone(p) {
  return {
    type: GET_ADMIN_BY_PHONE,
    p,
  };
}
export function get_admin_by_phone_succe(data) {
  return {
    type: GET_ADMIN_BY_PHONE_SUCCESS,
    data,
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