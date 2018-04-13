/*
 *
 * DetailMoney actions
 *
 */

import {
  DETAIL_OUTPUT_MONEY,
  DETAIL_OUTPUT_MONEY_SUCCESS,
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
export function detail_ouput_money(date,toDate,un) {
  return {
    type: DETAIL_OUTPUT_MONEY,
    date,
    toDate,
    un
  };
}
export function detail_ouput_money_success(data) {
  return {
    type: DETAIL_OUTPUT_MONEY_SUCCESS,
    data,
  };
}