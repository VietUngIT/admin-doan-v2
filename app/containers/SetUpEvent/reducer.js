/*
 *
 * SetUpEvent reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_EVEN_VALUE,
  SET_FUND_VALUE,
  GET_EVEN_VALUE,
  SET_EVEN_VALUE_SUCCESS,
  SET_FUND_VALUE_SUCCESS,
  GET_EVEN_VALUE_SUCCESS
} from './constants';

const initialState = fromJS({
  gid_even : false,
  b_even : false,
  v_even : false,
  data_even : false,
  isLoadEven : false,
  xulyEven : false,
  xulyFund : false,
});

function setUpEventReducer(state = initialState, action) {
  switch (action.type) {
  case GET_EVEN_VALUE:
    return state
    .set("isLoadEven",true)       
  case GET_EVEN_VALUE_SUCCESS:
    return state
    .set("isLoadEven",false)       
    .set("data_even",action.data)   

  case SET_EVEN_VALUE:
    return state
    .set("gid_even",action.gID)      
    .set("b_even",action.b)      
    .set("v_even",action.v)     
    .set("xulyEven",true)     
  case SET_EVEN_VALUE_SUCCESS:
    return state
    .set("data_even",action.data)     
    .set("xulyEven",false)   
  case SET_FUND_VALUE:
    return state
    .set("gid_even",action.gID)      
    .set("b_even",action.b)      
    .set("v_even",action.v) 
    .set("xulyFund",true)     
    
  case SET_FUND_VALUE_SUCCESS:
    return state
    .set("data_even",action.fund)  
    .set("xulyFund",false)   
    
    default:
      return state;
  }
}

export default setUpEventReducer;
