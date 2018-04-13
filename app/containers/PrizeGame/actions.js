/*
 *
 * EventGame actions
 *
 */

import {
  GET_PRIZE,
  GET_PRIZE_SUCCESS,
  EDIT_PRIZE,
  EDIT_PRIZE_SUCCESS,
  ADD_PRIZE,
  ADD_PRIZE_SUCCESS,
  DEL_PRIZE,
  DEL_PRIZE_SUCCESS
} from './constants';

export function get_prize(id) {
  return {
    type: GET_PRIZE,
    id
  };
}
export function get_prize_success(data) {
  return {
    type: GET_PRIZE_SUCCESS,
    data
  };
}
export function add_prize(id,top,prize) {
  return {
    type: ADD_PRIZE,
    id,
    top,
    prize
  };
}
export function add_prize_success() {
  return {
    type: ADD_PRIZE_SUCCESS,
  };
}
export function edit_prize(id,prize) {
  return {
    type: EDIT_PRIZE,
    id,
    prize
  };
}
export function edit_prize_success() {
  return {
    type: EDIT_PRIZE_SUCCESS,
  };
}
export function del_prize(id) {
  return {
    type: DEL_PRIZE,
    id
  };
}
export function del_prize_success(id) {
  return {
    type: DEL_PRIZE_SUCCESS,
    id
  };
}