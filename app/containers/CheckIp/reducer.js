/*
 *
 * CheckIp reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHECK_IP,
  CHECK_IP_SUCCESS,
  COUNT_IP,
  COUNT_IP_SUCCESS,
} from './constants';

const initialState = fromJS({
  isLoading : false,
  isCounting : false,
  ip : false,
  nick : false,
  data : false,
  count : false,
});

function checkIpReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_IP:
      return state
      .set("isLoading",true)
      .set("nick",action.nick)
    case CHECK_IP_SUCCESS:
      return state
      .set("isLoading",false)
      .set("data",action.data)
    case COUNT_IP:
      return state
      .set("isCounting",true)
      .set("ip",action.ip)
    case COUNT_IP_SUCCESS:
      return state
      .set("isCounting",false)
      .set("count",action.data)
    default:
      return state;
  }
}

export default checkIpReducer;
