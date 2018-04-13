/*
 *
 * EventGame actions
 *
 */

import {
  GET_EVENT,
  GET_EVENT_SUCCESS,
  EDIT_EVENT,
  EDIT_EVENT_SUCCESS,
  ADD_EVENT,
  ADD_EVENT_SUCCESS,
  DEL_EVENT,
  DEL_EVENT_SUCCESS
} from './constants';

export function get_even() {
  return {
    type: GET_EVENT,
  };
}
export function get_even_success(data) {
  return {
    type: GET_EVENT_SUCCESS,
    data
  };
}
export function add_even(gn,ne,st,en,count) {
  return {
    type: ADD_EVENT,
    gn,
    ne,
    st,
    en,
    count
  };
}
export function add_even_success() {
  return {
    type: ADD_EVENT_SUCCESS,
  };
}
export function edit_even(id,ne,st,en,status) {
  return {
    type: EDIT_EVENT,
    id,
    ne,
    st,
    en,
    status
  };
}
export function edit_even_success() {
  return {
    type: EDIT_EVENT_SUCCESS,
  };
}
export function del_even(id) {
  return {
    type: DEL_EVENT,
    id
  };
}
export function del_even_success(id) {
  return {
    type: DEL_EVENT_SUCCESS,
    id
  };
}