/*
 *
 * MessageTx reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_MESSAGE,
  ADD_MESSAGE_SUCCESS,
  SET_BET_SUM,
  SET_BET_SUM_SUCCESS,
  EDIT_MESSAGE,
  EDIT_MESSAGE_SUCCESS,
  DEL_MESSAGE,
  DEL_MESSAGE_SUCCESS,
  GET_MESSAGE,
  GET_MESSAGE_SUCCESS,
} from './constants';

const initialState = fromJS({
  mgs : false,  
  bet : false,
  type : false,
  isAdd : false,
  isAddMes : false,
  isSuccessBet : false,
  isSuccessMes : false,
  
  data : false,
  isLoading : false,
  type_get : false,

  mgs_edit : false,
  id_edit : false,

  id_del : false,
});

function messageTxReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGE:
      return state
      .set("isLoading",true)
      .set("type_get",action.t)
    case GET_MESSAGE_SUCCESS:
      return state
      .set("isLoading",false)
      .set("data",action.data)
    case EDIT_MESSAGE:
      return state
      .set("id_edit",action.id)
      .set("mgs_edit",action.mgs)
    case DEL_MESSAGE:
      return state
      .set("id_del",action.id)
    case DEL_MESSAGE_SUCCESS:
      return state
      .set("id_del",false)
      // .set("data", state.get("data").filter((data) => {
      //   return action.id.indexOf(data.id+"")==-1
      // }))
    case ADD_MESSAGE:
      return state
      .set("mgs",action.mgs)
      .set("isAdd",true)
      .set("isSuccessMes",false)
      .set("type",action.t)
    case ADD_MESSAGE_SUCCESS:
      return state
      .set("isAdd",false)
      .set("isSuccessMes",true)      
    case SET_BET_SUM:
      return state
      .set("bet",action.bet)
      .set("isAddMes",true)
      .set("isSuccessBet",false)  
    case SET_BET_SUM_SUCCESS:
      return state  
      .set("isAddMes",false)
      .set("isSuccessBet",true)  
    default:
      return state;
  }
}

export default messageTxReducer;
