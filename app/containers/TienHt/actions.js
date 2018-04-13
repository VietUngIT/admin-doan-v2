/*
 *
 * TienHt actions
 *
 */

import {
  SEARCH_MONEY,
  SEARCH_MONEY_SUCCESS,
} from './constants';

export function search_money_ht(st,et) {
  return {
    type: SEARCH_MONEY,
    st,
    et,
  };
}
export function search_money_ht_success(data) {
  return {
    type: SEARCH_MONEY_SUCCESS,
    data
  };
}
