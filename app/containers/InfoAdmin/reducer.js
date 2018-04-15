
import { fromJS } from 'immutable';
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

const initialState = fromJS({
  name: false,
  newPhone: false,
  address: false,
  avatar: false,
  oldPass: false,
  newPass: false,
  user: false,
});

function infoAdminReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_INFO_ADMIN_ACTION:
      return state;
    case GET_INFO_ADMIN_ACTION_SUCCESS:
      return state
      .set('user',action.user)
    case CHANGE_NAME_ACTION:
      return state
      .set('name',action.name)
    case CHANGE_NAME_ACTION_SUCCESS:
      return state
      .set('user',action.user)
    case CHANGE_PHONE_ACTION:
      return state
      .set('newPhone',action.newPhone)
    case CHANGE_PHONE_ACTION_SUCCESS:
      return state
      .set('user',action.user)
    case CHANGE_ADDRESS_ACTION:
      return state
      .set('address',action.address)
    case CHANGE_ADDRESS_ACTION_SUCCESS:
      return state
      .set('user',action.user)
    case CHANGE_AVATAR_ACTION:
      return state
      .set('avatar',action.avatar)
    case SUBMIT_CHANGE_AVATAR_ACTION:
      return state;
    case CHANGE_AVATAR_ACTION_SUCCESS:
      return state
      .set('user',action.user)
    case CHANGE_PASS_ACTION:
      return state
      .set('oldPass',action.oldPass)
      .set('newPass',action.newPass)
    case CHANGE_PASS_ACTION_SUCCESS:
      return state
      .set('user',action.user)
    default:
      return state;
  }
}

export default infoAdminReducer;
