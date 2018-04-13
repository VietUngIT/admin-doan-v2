/*
 *
 * SetAdmin reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_ADMIN,
  SET_ADMIN_SUCCESS,
  GET_ADMIN,
  GET_ADMIN_SUCCESS,
  GET_HIS_ADMIN,
  GET_HIS_ADMIN_SUCCESS,
  GET_ADMIN_BY_PHONE,
  GET_ADMIN_BY_PHONE_SUCCESS,
  SUGGEST_USER_BY_NN,
  SUGGEST_USER_BY_NN_SUCCESS,

  EDIT_PHONE,
  EDIT_EMAIL,
  EDIT_CMT,
  EDIT_ROLE,
  EDIT_TOTAL,
  EDIT_ACTIVE,
  EDIT_LOCK,
  EDIT_KET,
  EDIT_PHONE_SUCCESS,
  EDIT_EMAIL_SUCCESS,
  EDIT_CMT_SUCCESS,
  EDIT_ROLE_SUCCESS,
  EDIT_TOTAL_SUCCESS,
  EDIT_ACTIVE_SUCCESS,
  EDIT_LOCK_SUCCESS,
  EDIT_KET_SUCCESS,
  SEARCH_BY_TIME_SUCCESS,
  SEARCH_BY_TIME,
  RESET_PASS,
  RESET_PASS_SUCCESS,
} from './constants';

const initialState = fromJS({
  un : false,
  unn : false,
  r : false,
  sdt : false,
  cmt : false,
  m : false,
  a : false,
  em : false,
  sm :false,
  l :false,
  
  p:false,

  data : false,
  info : false,
  isLoading : false,
  isLoading_his : false,  
  his_admin : false,

  key : false,
  suggest_data : false,

  phone : false,
  note_phone : false,

  email : false,
  note_email : false,

  cmtnd : false,
  note_cmtnd : false,

  role : false,
  note_role : false,

  lock : false,
  note_lock : false,
  st : false,
  et : false,

  active : false,
  note_active : false,

  total : false,
  note_total : false,

  ket : false,
  note_ket : false,

  start: false,
  end : false,
  nick : false,

  pass : false,
});

function setAdminReducer(state = initialState, action) {
  switch (action.type) {
    
    case SEARCH_BY_TIME:
      return state
      .set("start",action.st)
      .set("end",action.et)
      .set("nick",action.nick)
      .set("isLoading_his",true)
    case SEARCH_BY_TIME_SUCCESS:
      return state
      .set("his_admin",action.data)
      .set("isLoading_his",false)
    case RESET_PASS:
      return state
      .set("un",action.nick)
    case RESET_PASS_SUCCESS:
      return state
      .set("pass",action.pass)
    case EDIT_PHONE:
      return state
      .set("un",action.un)
      .set("phone",action.p)
      .set("note_phone",action.note)
    case EDIT_EMAIL:
      return state
      .set("un",action.un)
      .set("email",action.e)
      .set("note_email",action.note)
    case EDIT_CMT:
      return state
      .set("un",action.un)
      .set("cmtnd",action.cmt)
      .set("note_cmtnd",action.note)
    case EDIT_TOTAL:
      return state
      .set("un",action.un)
      .set("total",action.total)
      .set("note_total",action.note)
    case EDIT_ACTIVE:
      return state
      .set("un",action.un)
      .set("active",action.ac)
      .set("note_active",action.note)
    case EDIT_KET:
      return state
      .set("un",action.un)
      .set("ket",action.money)
      .set("note_ket",action.note)
    case EDIT_LOCK:
      return state
      .set("un",action.un)
      .set("lock",action.lock)
      .set("note_lock",action.note)
      
    case EDIT_ROLE:
      return state
      .set("un",action.un)
      
      .set("role",action.role)
      .set("note_role",action.note)  

    case SET_ADMIN:
      return state
      .set("un",action.un)
      .set("r",action.r)
      .set("sdt",action.sdt)
      .set("cmt",action.cmt)
      .set("m",action.m)
      .set("a",action.a)
      .set("em",action.em)
      .set("sm",action.sm)
      .set("l",action.l)
    case SET_ADMIN_SUCCESS:
      return state
      .set("info",action.data)
    case GET_ADMIN:
      return state
      .set("un",action.un)  
      .set("unn",action.unn)  
      .set("p",action.p)  
      .set("isLoading",true)
      .set("pass",false)
      
    case GET_ADMIN_SUCCESS:
      return state
      .set("info",action.data) 
      .set("isLoading",false)
    case GET_HIS_ADMIN:
      return state
      .set("isLoading_his",false)   
    case GET_HIS_ADMIN_SUCCESS:
      return state
      .set("his_admin",action.data) 
      .set("isLoading_his",false)  
    case GET_ADMIN_BY_PHONE:
      return state
      .set("isLoading",true)   
      .set("p",action.p)   
    case GET_ADMIN_BY_PHONE_SUCCESS:
      return state
      .set("info",action.data) 
      .set("isLoading",false)  
    case SUGGEST_USER_BY_NN:
      return state
      .set("key",action.key) 
    case SUGGEST_USER_BY_NN_SUCCESS:
      return state
      .set("suggest_data",action.data)   
    default:
      return state;
  }
}

export default setAdminReducer;
