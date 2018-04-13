/*
 *
 * MoneyOutDetail reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DETAIL_OUTPUT_MONEY,
  DETAIL_OUTPUT_MONEY_SUCCESS,
} from './constants';

const initialState = fromJS({
  dateDetail : false,
  todateDetail : false,
  dataDetail : false,
  un_detail:false,
  isLoadDetail:false,
});


function moneyOutDetailReducer(state = initialState, action) {
  switch (action.type) {
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

export default moneyOutDetailReducer;
