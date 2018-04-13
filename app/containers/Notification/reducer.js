/*
 *
 * Notification reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_ALL_NOTI,
  GET_ALL_NOTI_SUCCESS,
  ADD_NOTI,
  ADD_NOTI_SUCCESS,
  DEL_ALL_NOTI,
  DEL_ALL_NOTI_SUCCESS,
  EDIT_NOTI,
  EDIT_NOTI_SUCCESS,
  DEL_NOTI,
  DEL_NOTI_SUCCESS,
} from './constants';

const initialState = fromJS({
  data : false,
  isGetAll : false,
  b : false,
  et : false,
  id_edit : false,
  b_edit : false,
  id_del : [],
  isDeleteSuccess : false,
});

function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_NOTI:
      return state
      .set("isGetAll",true)
    case GET_ALL_NOTI_SUCCESS:
      return state
      .set("data",action.data)
      .set("isGetAll",false)      
    case ADD_NOTI:
      return state
      .set("b",action.b)  
      .set("et",action.et)  
      .set("isGetAll",false)      
    case EDIT_NOTI:
      return state
      .set("b_edit",action.b)  
      .set("id_edit",action.id)  
      .set("isGetAll",false)    
    case EDIT_NOTI_SUCCESS:
      return state
      .set("b_edit",false)  
      .set("id_edit",false)  
      .set("isGetAll",false) 
      .set("data",action.data)
    case DEL_NOTI:
      return state
      .set("id_del",action.id)  
      .set("isDeleteSuccess",false)  
    case DEL_NOTI_SUCCESS:
      return state
      .set("id_del",[]) 
      .set("data", state.get("data").filter((data) => {
        return action.id.indexOf(data.id+"")==-1
      }))
      .set("isDeleteSuccess",true)  
      
    default:
      return state;
  }
}

export default notificationReducer;
