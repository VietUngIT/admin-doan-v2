/*
 *
 * EventParent actions
 *
 */

import {
  GET_EVENT_NAME,
  GET_EVENT_PARENT,
  GET_EVENT_PARENT_SUCCESS
} from './constants';

export function get_event_name(name) {
  return {
    type: GET_EVENT_NAME,
    name
  };
}
export function get_even_parent() {
  return {
    type: GET_EVENT_PARENT,
  };
}
export function get_even_success_parent(data) {
  return {
    type: GET_EVENT_PARENT_SUCCESS,
    data
  };
}