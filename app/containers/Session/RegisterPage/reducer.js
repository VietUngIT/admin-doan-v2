/*
 *
 * RegisterPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_FIRST_NAME,
  CHANGE_LAST_NAME,
  CHANGE_NAME,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  REGISTER_EMAIL,
  REGISTER_EMAIL_SUCCESS,
} from './constants';
const initialState = fromJS({
  email : false,
  password : false,
  name : false,
  registerSuccess : false,
  first_name : false,
  last_name : false,
  user_info : [],
});

function registerPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_NAME:
      return state
      .set('name',action.name)
    case CHANGE_FIRST_NAME:
      return state
      .set('first_name',action.first_name)
    case CHANGE_LAST_NAME:
      return state
      .set('last_name',action.last_name)
    case CHANGE_EMAIL:
      return state
      .set('email',action.email)
    case CHANGE_PASSWORD:
      return state
      .set('password',action.password)
    case REGISTER_EMAIL_SUCCESS:
      return state
      .set('registerSuccess',true)
      .update('user_info',user_info => user_info.concat(action.user_info))
    default:
      return state;
  }
}

export default registerPageReducer;
