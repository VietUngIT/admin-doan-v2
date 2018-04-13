/*
 *
 * Smsactive reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_SMS_ACTIVE,
  GET_SMS_ACTIVE_SUCCESS,
} from './constants';

const initialState = fromJS({
  isLoading : false,
  time : false,
  data : false,
});

function smsactiveReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SMS_ACTIVE:
      return state
      .set("isLoading",true)
      .set("time",action.time)
    case GET_SMS_ACTIVE_SUCCESS:
      return state
      .set("isLoading",false)
      .set("data",action.data)
    default:
      return state;
  }
}

export default smsactiveReducer;
