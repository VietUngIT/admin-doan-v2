/*
 *
 * Revenue reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_REVENUE,
  GET_REVENUE_SUCCESS,
  GET_REVENUE_BY_USER,
  GET_REVENUE_BY_USER_SUCCESS,
  SUGGEST_USER_BY_NN,
  SUGGEST_USER_BY_NN_SUCCESS,
} from './constants';

const initialState = fromJS({
  date : false,
  toDate : false,
  data : false,
  isLoad : false,

  nick : false,

  key : false,
  suggest_data : false,

});

function revenueReducer(state = initialState, action) {
  switch (action.type) {
    case SUGGEST_USER_BY_NN:
      return state
      .set("key",action.key) 
    case SUGGEST_USER_BY_NN_SUCCESS:
      return state
      .set("suggest_data",action.data)   
    case GET_REVENUE:
      return state
      .set("date",action.date)
      .set("toDate",action.toDate)
      .set("isLoad",true)
    case GET_REVENUE_SUCCESS:
      return state
      .set("data",action.data)  
      .set("isLoad",false)
    case GET_REVENUE_BY_USER:
      return state
      .set("date",action.st)
      .set("toDate",action.et)
      .set("nick",action.nick)
      .set("isLoad",true)  
    case GET_REVENUE_BY_USER_SUCCESS:
      return state
      .set("data",action.data)    
      .set("isLoad",false)    
    default:
      return state;
  }
}

export default revenueReducer;
