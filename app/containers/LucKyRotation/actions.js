/*
 *
 * LucKyRotation actions
 *
 */

import {
  LOAD_LUCKY_ROLATION,
  LOAD_LUCKY_ROLATION_SUCCESS,
  LOAD_TYLE_LUCKY_ROLATION,
  LOAD_TYLE_LUCKY_ROLATION_SUCCESS,
  UPDATE_SUCCESS,
  UPDATE,
} from './constants';

export function loadLuckyRolation(st,et) {
  return {
    type: LOAD_LUCKY_ROLATION,
    st,
    et,
  };
}

export function loadLuckyRolationSuccess(data) {
  return {
    type: LOAD_LUCKY_ROLATION_SUCCESS,
    data
  };
}

export function loadTyLeLuckyRolation() {
  return {
    type: LOAD_TYLE_LUCKY_ROLATION,
  };
}

export function loadTyLeLuckyRolationSuccess(data) {
  return {
    type: LOAD_TYLE_LUCKY_ROLATION_SUCCESS,
    data
  };
}
export function update(id,v) {
  return {
    type: UPDATE,
    id,
    v
  };
}
export function updateSuccess(data) {
  return {
    type: UPDATE_SUCCESS,
    data
  };
}