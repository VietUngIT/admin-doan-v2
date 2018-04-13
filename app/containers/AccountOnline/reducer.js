/*
 *
 * AccountOnline reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SEARCH_USER_ONLINE,
  SEARCH_USER_ONLINE_SUCCESS,
  GET_USER_ONLINE,
  GET_USER_ONLINE_SUCCESS,
  TOTAL_PAGE,
} from './constants';

const initialState = fromJS({
  isLoading : false,
  uname : false,
  nname : false,
  gid : false,
  data : false,
  page : false,
  total_page : false,
  isGetting : false,
  data_get : false,
});

function accountOnlineReducer(state = initialState, action) {
  switch (action.type) {
    case TOTAL_PAGE:
      return state
      .set("total_page",action.total)
    case SEARCH_USER_ONLINE:
      return state
      .set("isLoading",true)
      .set("uname",action.uname)
      .set("nname",action.nname)
      .set("gid",action.gid)
    case SEARCH_USER_ONLINE_SUCCESS:
      return state
      .set("isLoading",false)
      .set("data",action.data)
    case GET_USER_ONLINE:
      return state
      .set("isGetting",true)
    case GET_USER_ONLINE_SUCCESS:
      return state
      .set("isGetting",false)  
      .set("data_get",action.data)
       
    default:
      return state;
  }
}

export default accountOnlineReducer;
