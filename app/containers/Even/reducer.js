/*
 *
 * Even reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_EVEN,
  ADD_EVEN,
  DEL_EVEN,
  ACTIVE_EVEN,
  GET_EVEN_SUCCESS,
  ADD_EVEN_SUCCESS,
  DEL_EVEN_SUCCESS,
  ACTIVE_EVEN_SUCCESS,
  GET_ACTIVE,
 
} from './constants';

const initialState = fromJS({
  isGet : false,
  data :false,
  
  gid : false,
  un: false,
  b : false,

  t :false,
  id:false,

  active : false,

  
});

function evenReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EVEN:
      return state
      .set("isGet",true)
    case GET_EVEN_SUCCESS:
      return state
      .set("isGet",false)
      .set("data",action.data)
    case ADD_EVEN:
      return state
      .set("isGet",false)
      .set("gid",action.gid)
      .set("un",action.un)
      .set("b",action.b)
    case ADD_EVEN_SUCCESS:
      return state
      .set("data",action.data)
    case DEL_EVEN:
      return state
      .set("id",action.id) 
    case DEL_EVEN_SUCCESS:
      return state
      .set("data",action.data)    
    case ACTIVE_EVEN:
      return state
      .set("t",action.t) 
    case ACTIVE_EVEN_SUCCESS:
      return state
      .set("data",action.data)   
    case GET_ACTIVE:
      return state
      .set("active",action.ac)    

     

    default:
      return state;
  }
}

export default evenReducer;
