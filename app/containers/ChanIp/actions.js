/*
 *
 * ChanIp actions
 *
 */

import {
  ADD_IP,
  ADD_IP_SUCCESS,
  LOAD_IP,
  LOAD_IP_SUCCESS,
  EDIT_IP,
  EDIT_IP_SUCCESS,
  DEL_IP,
  DEL_IP_SUCCESS,
} from './constants';

export function add_ip(ip,reason) {
  return {
    type: ADD_IP,
    ip,
    reason,
  };
}
export function add_ip_success() {
  return {
    type: ADD_IP_SUCCESS,
    
  };
}
export function load_ip() {
  return {
    type: LOAD_IP,
    
  };
}
export function load_ip_success(data) {
  return {
    type: LOAD_IP_SUCCESS,
    data
  };
}

export function edit_ip(id,ip) {
  return {
    type: EDIT_IP,
    ip,
    id,
  };
}
export function edit_ip_success() {
  return {
    type: EDIT_IP_SUCCESS,
    ip
  };
}
export function del_ip(ip) {
  return {
    type: DEL_IP,
    ip
  };
}
export function del_ip_success(ip) {
  return {
    type: DEL_IP_SUCCESS,
    ip
  };
}
