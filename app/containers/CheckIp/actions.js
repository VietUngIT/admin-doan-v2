/*
 *
 * CheckIp actions
 *
 */

import {
  CHECK_IP,
  CHECK_IP_SUCCESS,
  COUNT_IP,
  COUNT_IP_SUCCESS,
} from './constants';

export function check_ip(nick) {
  return {
    type: CHECK_IP,
    nick,
  };
}
export function check_ip_success(data) {
  return {
    type: CHECK_IP_SUCCESS,
    data,
  };
}
export function count_ip(ip) {
  return {
    type: COUNT_IP,
    ip,
  };
}
export function count_ip_success(data) {
  return {
    type: COUNT_IP_SUCCESS,
    data,
  };
}