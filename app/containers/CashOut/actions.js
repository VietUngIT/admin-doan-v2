/*
 *
 * CashOut actions
 *
 */

import {
  GET_CASH,
  GET_CASH_SUCCESS,
  SET_CASH,
  SET_CASH_SUCCESS
} from './constants';

export function getCash() {
  return {
    type: GET_CASH,
  };
}
export function getCashSuccess(data) {
  return {
    type: GET_CASH_SUCCESS,
    data
  };
}
export function setCash(m,mt) {
  return {
    type: SET_CASH,
    m,
    mt,
  };
}
export function setCashSuccess(data) {
  return {
    type: SET_CASH_SUCCESS,
    data
  };
}
