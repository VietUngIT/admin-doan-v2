/*
 *
 * MoneyDetail reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INPUT_MONEY,
  INPUT_MONEY_SUCCESS,
} from './constants';

const initialState = fromJS({
  dateInput : false,
  todateInput : false,  
  typeInput : false,
  dataInput : false,
  un_api:false,
  isLoadInput:false,
});

function moneyDetailReducer(state = initialState, action) {
  switch (action.type) {
  case INPUT_MONEY:
    return state
    .set("todateInput",action.toDate)  
    .set("dateInput",action.date)
    .set("un_api",action.un)  
    .set("typeInput",action.typeInput)  
    .set("isLoadInput",true)  
    
  case INPUT_MONEY_SUCCESS:
    return state
    .set("dataInput",action.data)
    .set("isLoadInput",false)  
    default:
      return state;
  }
}

export default moneyDetailReducer;
