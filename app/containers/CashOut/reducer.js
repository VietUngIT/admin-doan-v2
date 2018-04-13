/*
 *
 * CashOut reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_CASH,
  GET_CASH_SUCCESS,
  SET_CASH,
  SET_CASH_SUCCESS
} from './constants';

const initialState = fromJS({
  m : false,
  mt : false,
  max_cash : false,
  data_success : false,
  isLoad : false,
});

function cashOutReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CASH:
      return state
      .set("isLoad",true)
    case GET_CASH_SUCCESS:
      return state
      .set("isLoad",false)
      .set("max_cash",action.data)
    case SET_CASH:
      return state
      .set("m",action.m)
      .set("isLoad",false)
      .set("mt",action.mt)
    case SET_CASH_SUCCESS:
      return state
      .set("isLoad",false)
      .set("max_cash",action.data)  
    default:
      return state;
  }
}

export default cashOutReducer;
