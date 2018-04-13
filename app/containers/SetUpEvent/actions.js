/*
 *
 * SetUpEvent actions
 *
 */

import {
  SET_EVEN_VALUE,
  SET_FUND_VALUE,
  GET_EVEN_VALUE,
  SET_EVEN_VALUE_SUCCESS,
  SET_FUND_VALUE_SUCCESS,
  GET_EVEN_VALUE_SUCCESS
} from './constants';

export function getEvenValue() {
  return {
    type: GET_EVEN_VALUE,
    
  };
}
export function getEvenValueSuccess(data) {
  return {
    type: GET_EVEN_VALUE_SUCCESS,
    data
  };
}

export function setEvenValue(gID,b,v) {
  return {
    type: SET_EVEN_VALUE,
    gID,
    b,
    v
  };
}
export function setEvenValueSuccess(data) {
  return {
    type: SET_EVEN_VALUE_SUCCESS,
    data
  };
}
export function setFundValue(gID,b,v) {
  return {
    type: SET_FUND_VALUE,
    gID,
    b,
    v
  };
}
export function setFundValueSuccess(fund) {
  return {
    type: SET_FUND_VALUE_SUCCESS,
    fund
  };
}
