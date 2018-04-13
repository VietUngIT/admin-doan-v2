/*
 *
 * DuyetCard actions
 *
 */

import {
  GET_CARD_LIST,
  GET_CARD_LIST_SUCCESS,
  DUYET_CARD,
  DUYET_CARD_SUCCESS,
  HUY_DUYET_CARD,
  HUY_DUYET_CARD_SUCCESS,
  CHANGE_NCC_CARD_SUCCESS,
  CHANGE_NCC_CARD,
  GET_LIST_NCC_CARD,
  GET_LIST_NCC_CARD_SUCCESS,
} from './constants';
export function get_list_ncc_card() {
  return {
    type: GET_LIST_NCC_CARD,
  };
}
export function get_list_ncc_card_success(data) {
  return {
    type: GET_LIST_NCC_CARD_SUCCESS,
    data,
  };
}
export function change_ncc_card(pc) {
  return {
    type: CHANGE_NCC_CARD,
    pc
  };
}
export function change_ncc_card_success() {
  return {
    type: CHANGE_NCC_CARD_SUCCESS,
  };
}
export function get_card_list(t) {
  return {
    type: GET_CARD_LIST,
    t
  };
}
export function get_card_list_success(data) {
  return {
    type: GET_CARD_LIST_SUCCESS,
    data,
  };
}
export function duyet_card(id) {
  return {
    type: DUYET_CARD,
    id,
  };
}
export function duyet_card_success() {
  return {
    type: DUYET_CARD_SUCCESS,
  };
}
export function huy_duyet_card(id) {
  return {
    type: HUY_DUYET_CARD,
    id,
  };
}
export function huy_duyet_card_success() {
  return {
    type: HUY_DUYET_CARD_SUCCESS,
  };
}