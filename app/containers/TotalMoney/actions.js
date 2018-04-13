/*
 *
 * TotalMoney actions
 *
 */

import {
  TOTAL_MONEY,
  TOTAL_MONEY_SUCCESS,
  INPUT_MONEY,
  INPUT_MONEY_SUCCESS,
  OUTPUT_MONEY,
  OUTPUT_MONEY_SUCCESS,
  DETAIL_OUTPUT_MONEY,
  DETAIL_OUTPUT_MONEY_SUCCESS,
    
  SUGGEST_USER_BY_NN,
  SUGGEST_USER_BY_NN_SUCCESS,

  GET_MONEY_BY_HDH,
  GET_MONEY_BY_HDH_SUCCESS,
} from './constants';

export function get_money_by_hdh(st,et) {
  return {
    type: GET_MONEY_BY_HDH,
    st,
    et
  };
}
export function get_money_by_hdh_success(data) {
  return {
    type: GET_MONEY_BY_HDH_SUCCESS,
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
export function total_money(date,toDate,un) {
  return {
    type: TOTAL_MONEY,
    date,
    toDate,
    un,
  };
}

export function total_money_success(data) {
  return {
    type: TOTAL_MONEY_SUCCESS,
    data,
  };
}

export function input_money(date,toDate,typeInput,un) {
  return {
    type: INPUT_MONEY,
    date,
    toDate,
    typeInput,
    un,
  };
}
export function input_money_success(data) {
  return {
    type: INPUT_MONEY_SUCCESS,
    data,
  };
}
export function ouput_money(date,toDate,un) {
  return {
    type: OUTPUT_MONEY,
    date,
    toDate,
    un
  };
}
export function output_money_success(data) {
  return {
    type: OUTPUT_MONEY_SUCCESS,
    data,
  };
}
