/*
 *
 * MessageTx actions
 *
 */

import {
  ADD_MESSAGE,
  ADD_MESSAGE_SUCCESS,
  SET_BET_SUM,
  SET_BET_SUM_SUCCESS,
  EDIT_MESSAGE,
  EDIT_MESSAGE_SUCCESS,
  DEL_MESSAGE,
  DEL_MESSAGE_SUCCESS,
  GET_MESSAGE,
  GET_MESSAGE_SUCCESS,
} from './constants';

export function get_message(t) {
  return {
    type: GET_MESSAGE,
    t
  };
}
export function get_message_success(data) {
  return {
    type: GET_MESSAGE_SUCCESS,
    data,
  };
}
export function edit_message(mgs,id) {
  return {
    type: EDIT_MESSAGE,
    mgs,
    id,
  };
}
export function del_message(id) {
  return {
    type: DEL_MESSAGE,
   
    id,
  };
}
export function edit_message_success(id) {
  return {
    type: EDIT_MESSAGE,
  
    id,
  };
}
export function add_message(mgs,t) {
  return {
    type: ADD_MESSAGE,
    mgs,
    t,
  };
}
export function add_message_success() {
  return {
    type: ADD_MESSAGE_SUCCESS,
    
  };
}
export function set_bet_sum(bet) {
  return {
    type: SET_BET_SUM,
    bet
  };
}
export function set_bet_sum_success() {
  return {
    type: SET_BET_SUM_SUCCESS,
    
  };
}