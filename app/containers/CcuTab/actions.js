/*
 *
 * CcuTab actions
 *
 */

import {
  SEARCH_HISTORY,
  SEARCH_CURRENT,
  SEARCH_CURRENT_SUCCESS,
  SEARCH_HISTORY_SUCCESS,
  ONCHANGE_ETIME,
  ONCHANGE_STIME,
  TOTAL_MONEY,
} from './constants';

export function search_current() {
  return {
    type: SEARCH_CURRENT,
  };
}
export function search_current_success(ccLog) {
  return {
    type: SEARCH_CURRENT_SUCCESS,
    ccLog,
  };
}
export function search_history() {
  return {
    type: SEARCH_HISTORY,
    
  };
}
export function search_history_success(ccLog) {
  return {
    type: SEARCH_HISTORY_SUCCESS,
    ccLog,
  };
}
export function onchange_stime(sTime) {
  return {
    type: ONCHANGE_STIME,
    sTime,
  };
}

export function onchange_etime(eTime) {
  return {
    type: ONCHANGE_ETIME,
    eTime,
  };
}

