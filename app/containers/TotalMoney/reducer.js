/*
 *
 * TotalMoney reducer
 *
 */

import { fromJS } from 'immutable';
import {
  TOTAL_MONEY,
  TOTAL_MONEY_SUCCESS,
  INPUT_MONEY,
  INPUT_MONEY_SUCCESS,
  OUTPUT_MONEY,
  OUTPUT_MONEY_SUCCESS,
  SUGGEST_USER_BY_NN,
  SUGGEST_USER_BY_NN_SUCCESS,
  GET_MONEY_BY_HDH,
  GET_MONEY_BY_HDH_SUCCESS,
} from './constants';

const initialState = fromJS({
  dataMoney: false,
  dateMoney : false,
  todateMoney : false,
  un:false,
  isLoadMoney:false,

  key : false,
  suggest_data : false,

  dateInput : false,
  todateInput : false,  
  typeInput : false,
  dataInput : false,
  un_api:false,
  isLoadInput:false,
  
  
  dateOutput : false,
  todateOutput : false,
  dataOutput : false,
  un_out:false,
  isLoadOutput:false,

  data_hdh : false,
  isLoadHDH : false,
  st : false,
  et : false,

});

function totalMoneyReducer(state = initialState, action) {
  switch (action.type) {
  case GET_MONEY_BY_HDH:
    return state
    .set("st",action.st) 
    .set("et",action.et) 
    .set("isLoadHDH",true) 
  case GET_MONEY_BY_HDH_SUCCESS:
    return state
    .set("isLoadHDH",false) 
    .set("data_hdh",action.data) 
  case SUGGEST_USER_BY_NN:
    return state
    .set("key",action.key) 
  case SUGGEST_USER_BY_NN_SUCCESS:
    return state
    .set("suggest_data",action.data)  
  case TOTAL_MONEY:
    return state
    .set("dateMoney",action.date)  
    .set("todateMoney",action.toDate)  
    .set("un",action.un)  
    .set("isLoadMoney",true)  
  case TOTAL_MONEY_SUCCESS:
    return state
    .set("dataMoney",action.data)
    .set("isLoadMoney",false)  
    
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
    
  case OUTPUT_MONEY:
    return state
    .set("todateOutput",action.toDate)  
    .set("un_out",action.un)  
    .set("dateOutput",action.date)  
    .set("isLoadOutput",true)  
    
  case OUTPUT_MONEY_SUCCESS:
    return state
    .set("dataOutput",action.data)
    .set("isLoadOutput",false)  

    default:
      return state;
  }
}

export default totalMoneyReducer;
