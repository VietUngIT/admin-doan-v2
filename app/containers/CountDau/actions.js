/*
 *
 * CountDau actions
 *
 */

import {
  COUNT_DAU,
  COUNT_DAU_SUCCESS,
  COUNT_DPU_SUCCESS,
  TOTAL_DPU,
  TOTAL_DAU,
  COUNT_DAU_NOW,
  COUNT_DAU_NOW_SUCCESS,
  TOTAL_DAU_NOW,
  TOTAL_DPU_NOW,
  COUNT_DPU_NOW_SUCCESS,
  IS_LOAD_DAU,
} from './constants';

export function is_load_dau(value) {
  return {
    type: IS_LOAD_DAU,
    value
  };
}
export function count_dau_now(page) {
  return {
    type: COUNT_DAU_NOW,
    page
  };
}
export function count_dau_now_success(data) {
  return {
    type: COUNT_DAU_NOW_SUCCESS,
    data,
  };
}
export function count_dau(st,et,page) {
  return {
    type: COUNT_DAU,
    st,
    et,
    page
  };
}
export function count_dau_success(data) {
  return {
    type: COUNT_DAU_SUCCESS,
    data,
  };
}
export function count_dpu_success(data) {
  return {
    type: COUNT_DPU_SUCCESS,
    data,
  };
}
export function count_dpu_now_success(data) {
  return {
    type: COUNT_DPU_NOW_SUCCESS,
    data,
  };
}
export function total_dpu(total) {
  return {
    type: TOTAL_DPU,
    total,
  };
}
export function total_dau(total) {
  return {
    type: TOTAL_DAU,
    total,
  };
}
export function total_dpu_now(total) {
  return {
    type: TOTAL_DPU_NOW,
    total,
  };
}
export function total_dau_now(total) {
  return {
    type: TOTAL_DAU_NOW,
    total,
  };
}