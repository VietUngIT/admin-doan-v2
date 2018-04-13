/*
 *
 * Xhu reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_LIST,
  LOAD_LIST_SUCCESS,
  ADD_XHU,
  ADD_XHU_SUCCESS,
  DEL_XHU,
  DEL_XHU_SUCCESS,
} from './constants';

const initialState = fromJS({
  isLoading : false,
  data : false,
  st_list : false,

  id : false,

  isSuccess : false,

  ne: false,
  gn: false,
  day: false,
  hu100: false,
  hu1000: false,
  hu10000: false,
  x100: false,
  x1000: false,
  x10000: false,
  active: false,
});

function xhuReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_LIST:
      return state
      .set("isLoading",true)
      // .set("st_list",action.st)
      
    case LOAD_LIST_SUCCESS:
      return state
      .set("isLoading",false)
      .set("data",action.data)
    case ADD_XHU:
      return state
      .set("ne",action.ne)
      .set("gn",action.gn)
      .set("day",action.day)
      .set("hu100",action.hu100)
      .set("hu1000",action.hu1000)
      .set("hu10000",action.hu10000)
      .set("x100",action.x100)
      .set("x1000",action.x1000)
      .set("x10000",action.x10000)
      .set("active",action.active)
      .set("isSuccess",false)

    case ADD_XHU_SUCCESS:
      return state
      .set("isSuccess",true)
      case DEL_XHU:
      return state
      .set("id",action.id)
    case DEL_XHU_SUCCESS:
      return state
      .set("id",false)
      .set("data", state.get("data").filter((data) => {
        return action.id.indexOf(data.id+"")==-1
      }))
    
    default:
      return state;
  }
}

export default xhuReducer;
