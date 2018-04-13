/*
 *
 * SearchGame reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SEARCH_BY_ID,
  SEARCH_BY_ID_SUCCESS,
  SEARCH_BY_USER,
  SEARCH_BY_USER_SUCCESS,
  SEARCH_BY_ID_NAME,
  SEARCH_BY_ID_NAME_SUCCESS,
} from './constants';

const initialState = fromJS({
  id : false,
  gn_id : false,
  un : false,
  gn_un : false,
  data_id : false,
  isLoadId : false,

  id_name :false,
  gn_name :false,
  data_id_name : false,
  
  data_un : false,
  data : false,
  st : false,
  et : false,
  isLoad : false,
});

function searchGameReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_BY_ID:
      return state
      .set("id",action.id)
      .set("gn_id",action.gn)
      .set("isLoadId",true)
    case SEARCH_BY_ID_SUCCESS:
      return state
      .set("data_id",action.data)
      .set("isLoadId",false)
      .set("data",action.data)
    case SEARCH_BY_ID_NAME:
      return state
      .set("id_name",action.id)
      .set("gn_name",action.gn)
    case SEARCH_BY_ID_NAME_SUCCESS:
      return state
      .set("data_id_name",action.data)
    case SEARCH_BY_USER:
      return state
      .set("un",action.un)
      .set("gn_un",action.gn)  
      .set("st",action.st)  
      .set("et",action.et)  
      .set("isLoad",true) 
    case SEARCH_BY_USER_SUCCESS:
      return state
      .set("data_un",action.data)  
      .set("data",action.data)
      .set("isLoad",false) 
      
    default:
      return state;
  }
}

export default searchGameReducer;
