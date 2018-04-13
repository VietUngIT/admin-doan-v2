/*
 *
 * ChanIp reducer
 *
 */

import { fromJS } from 'immutable';
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

const initialState = fromJS({
  isLoading : false,
  data : false,

  ip : false,
  reason : false,

  ip_del : false,

});

function chanIpReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_IP:
      return state
      .set("ip",action.ip)
      .set("reason",action.reason)
    case LOAD_IP:
      return state
      .set("isLoading",true)
    case LOAD_IP_SUCCESS:
      return state
      .set("isLoading",false)
      .set("data",action.data)
    case DEL_IP:
      return state
      .set("ip_del",action.ip)
    case DEL_IP_SUCCESS:
      return state
      // .set("ip_del",action.ip)
      .set("data", state.get("data").filter((data) => {
        return action.ip.indexOf(data.ip+"")==-1
      }))
    default:
      return state;
  }
}

export default chanIpReducer;
