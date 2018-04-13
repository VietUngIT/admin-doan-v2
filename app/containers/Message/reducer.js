/*
 *
 * Messege reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_ALL_MESS,
  GET_ALL_MESS_SUCCESS,
  SEND_ALL_MESS,
  SEND_ALL_MESS_SUCCESS,
  DEL_MESS,
  DEL_MESS_SUCCESS,
  SEND_SOME_MESS,
  SEND_SOME_MESS_SUCCESS,
  SUGGEST_USER_BY_NN,
  SUGGEST_USER_BY_NN_SUCCESS,
} from './constants';

const initialState = fromJS({
  mes : false,
  tt : false,
  data : [],
  isGetAll : false,
  isSendAll : false,
  isSendSome : false,
  deleteMsgSuccess: false,
  id :[],
  lu : false,

  key : false,
  suggest_data : false,
});

function messegeReducer(state = initialState, action) {
  switch (action.type) {
    case SUGGEST_USER_BY_NN:
      return state
      .set("key",action.key) 
    case SUGGEST_USER_BY_NN_SUCCESS:
      return state
      .set("suggest_data",action.data)   
    case GET_ALL_MESS:
      return state
      .set("isGetAll",true)
    case GET_ALL_MESS_SUCCESS:
      return state
      .set("data",action.data)  
      .set("isGetAll",false)
    case SEND_ALL_MESS:
      return state
      .set("tt",action.tt)  
      .set("mes",action.mes)  
      .set("isGetAll",false)  
      .set("isSendSome",false)  
      .set("isSendAll",true)  
    case SEND_ALL_MESS_SUCCESS:
      return state
      .set("tt",false)  
      .set("mes",false)  
      .set("isGetAll",false)  
      .set("isSendSome",false)  
      .set("isSendAll",false)   
      .set("data",state.get("data").concat(action.data)) 
    case DEL_MESS:
      return state
      .set("id",(action.id))  
      .set("deleteMsgSuccess", true)
    case DEL_MESS_SUCCESS:
      return state
      .set("id",[]) 
      .set("data", state.get("data").filter((data) => {
        return action.id.indexOf(data.id+"")==-1
      }))
      .set("deleteMsgSuccess", false)
    case SEND_SOME_MESS:
      return state
      .set("tt",action.tt)  
      .set("mes",action.mgs)  
      .set("lu",action.lu)  
      .set("isSendSome",true)  
      .set("isGetAll",false)  
      .set("isSendAll",false)  
    case SEND_SOME_MESS_SUCCESS:
      return state
      .set("tt",false)  
      .set("lu",false)  
      .set("mes",false)  
      .set("isSendSome",false)  
      .set("isGetAll",false)  
      .set("isSendAll",false)   
      .set("data",state.get("data").concat(action.data))   
    default:
      return state;
  }
}

export default messegeReducer;
