/*
 *
 * Revenue actions
 *
 */

import {
  GET_REVENUE,
  GET_REVENUE_SUCCESS,
  GET_REVENUE_BY_USER,
  GET_REVENUE_BY_USER_SUCCESS,
  SUGGEST_USER_BY_NN,
  SUGGEST_USER_BY_NN_SUCCESS,
} from './constants';

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

export function get_revenue(date,toDate) {
  return {
    type: GET_REVENUE,
    date,
    toDate,
  };
}
export function get_revenue_success(data) {
  return {
    type: GET_REVENUE_SUCCESS,
    data,
  };
}
export function get_revenue_by_user(nick,st,et) {
  return {
    type: GET_REVENUE_BY_USER,
    nick,
    st,
    et
  };
}
export function get_revenue_by_user_success(data) {
  return {
    type: GET_REVENUE_BY_USER_SUCCESS,
    data
  };
}