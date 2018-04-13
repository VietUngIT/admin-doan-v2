/*
 *
 * DetailMoney reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DETAIL_OUTPUT_MONEY,
  DETAIL_OUTPUT_MONEY_SUCCESS,
  SUGGEST_USER_BY_NN,
  SUGGEST_USER_BY_NN_SUCCESS,
} from './constants';

const initialState = fromJS({
  dateDetail : false,
  todateDetail : false,
  dataDetail : false,
  un_detail:false,
  isLoadDetail:false,
  key : false,
  suggest_data : false,
});

function detailMoneyReducer(state = initialState, action) {
  switch (action.type) {
  case SUGGEST_USER_BY_NN:
    return state
    .set("key",action.key) 
  case SUGGEST_USER_BY_NN_SUCCESS:
    return state
    .set("suggest_data",action.data)  
  case DETAIL_OUTPUT_MONEY:
    return state
    .set("todateDetail",action.toDate)  
    .set("un_detail",action.un)  
    .set("dateDetail",action.date)
    .set("isLoadDetail",true)  
    
  case DETAIL_OUTPUT_MONEY_SUCCESS:
    return state
    .set("dataDetail",action.data)
    .set("isLoadDetail",false)  
    default:
      return state;
  }
}

export default detailMoneyReducer;
