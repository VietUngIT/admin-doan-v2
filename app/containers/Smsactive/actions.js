/*
 *
 * Smsactive actions
 *
 */

import {
  GET_SMS_ACTIVE,
  GET_SMS_ACTIVE_SUCCESS,
} from './constants';

export function get_sms_active(time) {
  return {
    type: GET_SMS_ACTIVE,
    time
  };
}
export function get_sms_active_success(data) {
  return {
    type: GET_SMS_ACTIVE_SUCCESS,
    data
  };
}
