/*
 *
 * Backup actions
 *
 */

import {
  BACK_UP,
  BACK_UP_SUCCESS,
} from './constants';

export function back_up() {
  return {
    type: BACK_UP,
  };
}
export function back_up_success(data) {
  return {
    type: BACK_UP_SUCCESS,
    data
  };
}