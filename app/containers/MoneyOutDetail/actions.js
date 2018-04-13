/*
 *
 * MoneyOutDetail actions
 *
 */

import {
  DETAIL_OUTPUT_MONEY,
  DETAIL_OUTPUT_MONEY_SUCCESS,
} from './constants';

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
