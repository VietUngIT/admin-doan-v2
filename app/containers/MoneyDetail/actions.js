/*
 *
 * MoneyDetail actions
 *
 */

import {
  INPUT_MONEY,
  INPUT_MONEY_SUCCESS,
} from './constants';

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
