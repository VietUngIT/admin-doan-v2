/*
 *
 * CheckSeri actions
 *
 */

import {
  CHECK_SERI_SUCCESS,
  CHECK_SERI
} from './constants';

export function check_seri(key,t) {
  return {
    type: CHECK_SERI,
    key,
    t
  };
}
export function check_seri_success(data) {
  return {
    type: CHECK_SERI_SUCCESS,
    data
  };
}