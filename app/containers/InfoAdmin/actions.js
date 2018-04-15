/*
 *
 * InfoAdmin actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_INFO_ADMIN_ACTION,
  GET_INFO_ADMIN_ACTION_SUCCESS,
  CHANGE_NAME_ACTION,
  CHANGE_NAME_ACTION_SUCCESS,
  CHANGE_PHONE_ACTION,
  CHANGE_PHONE_ACTION_SUCCESS,
  CHANGE_ADDRESS_ACTION,
  CHANGE_ADDRESS_ACTION_SUCCESS,
  CHANGE_AVATAR_ACTION,
  SUBMIT_CHANGE_AVATAR_ACTION,
  CHANGE_AVATAR_ACTION_SUCCESS,
  CHANGE_PASS_ACTION,
  CHANGE_PASS_ACTION_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changePassAdmin(oldPass,newPass) {
  return {
    type: CHANGE_PASS_ACTION,
    oldPass,
    newPass,
  };
}
export function changePassAdminSuccess(user) {
  return {
    type: CHANGE_PASS_ACTION_SUCCESS,
    user,
  };
}

export function submitChangeAvatarAdmin() {
  return {
    type: SUBMIT_CHANGE_AVATAR_ACTION,
    
  };
}
export function changeAvatarAdmin(avatar) {
  return {
    type: CHANGE_AVATAR_ACTION,
    avatar,
  };
}
export function changeAvatarAdminSuccess(user) {
  return {
    type: CHANGE_AVATAR_ACTION_SUCCESS,
    user,
  };
}

export function changeAddressAdmin(address) {
  return {
    type: CHANGE_ADDRESS_ACTION,
    address,
  };
}
export function changeAddressAdminSuccess(user) {
  return {
    type: CHANGE_ADDRESS_ACTION_SUCCESS,
    user,
  };
}

export function getinfoAdmin() {
  return {
    type: GET_INFO_ADMIN_ACTION,
  };
}
export function getinfoAdminSuccess(user) {
  return {
    type: GET_INFO_ADMIN_ACTION_SUCCESS,
    user,
  };
}
export function changeNameAdmin(name) {
  return {
    type: CHANGE_NAME_ACTION,
    name,
  };
}
export function changeNameAdminSuccess(user) {
  return {
    type: CHANGE_NAME_ACTION_SUCCESS,
    user,
  };
}
export function changePhoneAdmin(newPhone) {
  return {
    type: CHANGE_PHONE_ACTION,
    newPhone,
  };
}
export function changePhoneAdminSuccess(user) {
  return {
    type: CHANGE_PHONE_ACTION_SUCCESS,
    user,
  };
}
