/*
 *
 * DaiLy reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_DAILY,
  TOTAL_DAILY,
  LOAD_DAILY_SUCCESS,
  ADD_DAILY,
  ADD_DAILY_SUCCESS,
  UPDATE_DAILY,
  UPDATE_DAILY_SUCCESS,
  DEL_DAILY,
  DEL_DAILY_SUCCESS,
  LOAD_MANAGER_SUCCESS,
} from './constants';

const initialState = fromJS({
  isLoading : false,
  data : false,
  page : false,
  total : false,

  manager : false,

  na_u : false,
  p_u : false,
  a_u : false,
  f_u : false,
  nick_u : false,
  ma :  false,
  isUpdate : false,

  na : false,
  p : false,
  a : false,
  f : false,
  nick : false,
  isAdd : false,

  nick_del : false,

});

function daiLyReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DAILY:
      return state
      .set("isLoading",true)
      .set("page",action.page)
    case LOAD_MANAGER_SUCCESS:
      return state
      .set("manager",action.manager)
    case TOTAL_DAILY:
      return state
      .set("total",action.total)
    case LOAD_DAILY_SUCCESS:
      return state
      .set("isLoading",false)  
      .set("data",action.data)  
    case UPDATE_DAILY:
      return state
      .set("isUpdate",true)  
      .set("na_u",action.na)  
      .set("p_u",action.p)  
      .set("f_u",action.f)  
      .set("a_u",action.a)  
      .set("nick_u",action.nn)  
      .set("ma",action.ma)  
    case UPDATE_DAILY_SUCCESS:
      return state
      .set("isUpdate",false)  
      // .set("data",action.data)    
    case ADD_DAILY:
      return state
      .set("isAdd",true)  
      .set("na",action.na)  
      .set("p",action.p)  
      .set("f",action.f)  
      .set("a",action.a)  
      .set("nick",action.nn)  
    case ADD_DAILY_SUCCESS:
      return state
      .set("isAdd",false)  
      // .set("data",action.data)  
    case DEL_DAILY:
      return state
      .set("nick_del",action.nn) 
    case DEL_DAILY_SUCCESS:
      return state
      .set("data", state.get("data").filter((element) => {
        return action.nn.indexOf(element.nickname+"")==-1
      }))   
    default:
      return state;
  }
}

export default daiLyReducer;
