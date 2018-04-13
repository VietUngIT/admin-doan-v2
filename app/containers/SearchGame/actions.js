/*
 *
 * SearchGame actions
 *
 */

import {
  SEARCH_BY_ID,
  SEARCH_BY_ID_SUCCESS,
  SEARCH_BY_USER,
  SEARCH_BY_USER_SUCCESS,
  SEARCH_BY_ID_NAME,
  SEARCH_BY_ID_NAME_SUCCESS,
} from './constants';

export function search_by_id(id,gn) {
  return {
    type: SEARCH_BY_ID,
    id,
    gn,
  };
}
export function search_by_id_success(data) {
  return {
    type: SEARCH_BY_ID_SUCCESS,
    data
  };
}
export function search_by_id_name(id,gn) {
  return {
    type: SEARCH_BY_ID_NAME,
    id,
    gn,
  };
}
export function search_by_id_name_success(data) {
  return {
    type: SEARCH_BY_ID_NAME_SUCCESS,
    data
  };
}
export function search_by_user(un,gn,st,et) {
  return {
    type: SEARCH_BY_USER,
    un,
    gn,
    st,
    et,
  };
}
export function search_by_user_success(data) {
  return {
    type: SEARCH_BY_USER_SUCCESS,
    data
  };
}