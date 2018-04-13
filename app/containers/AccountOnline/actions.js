/*
 *
 * AccountOnline actions
 *
 */

import {
  SEARCH_USER_ONLINE,
  SEARCH_USER_ONLINE_SUCCESS,
  GET_USER_ONLINE,
  GET_USER_ONLINE_SUCCESS,
  TOTAL_PAGE,
} from './constants';

export function search_user_online(uname,nname,gid) {
  return {
    type: SEARCH_USER_ONLINE,
    uname,
    nname,
    gid,
    // page
  };
}
export function search_user_online_success(data) {
  return {
    type: SEARCH_USER_ONLINE_SUCCESS,
    data
  };
}
export function get_user_online() {
  return {
    type: GET_USER_ONLINE,
    
  };
}
export function get_user_online_success(data) {
  return {
    type: GET_USER_ONLINE_SUCCESS,
    data
  };
}
export function get_total_page(total) {
  return {
    type: TOTAL_PAGE,
    total,
  };
}