/*
 *
 * TopNapTien actions
 *
 */

import {
  GET_TOP_MONEY_SUCCESS,
  GET_TOP_MONEY,
} from './constants';

export function get_top_money(st,et) {
  return {
    type: GET_TOP_MONEY,
    st,
    et,
  };
}
export function get_top_money_success(data) {
  return {
    type: GET_TOP_MONEY_SUCCESS,
    data
  };
}