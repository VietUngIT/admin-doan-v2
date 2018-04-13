/*
 *
 * Bot reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_BOT,
  ADD_BOT_MONEY,
  ADD_BOT_SUCCESS,
  ADD_BOT_MONEY_SUCCESS
} from './constants';

const initialState = fromJS({
  m_bot : false,
  bn_bot : false,
  bu_bot : false,
  data_bot : false,
  m_money : false,
  bn_money : false,
  data_money : false,
  isAddBot : false,
  isAddMoney : false,
});

function botReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BOT:
      return state
      .set("m_bot",action.m)
      .set("bn_bot",action.bn)
      .set("bu_bot",action.bu)
      .set("isAddBot",true)
    case ADD_BOT_SUCCESS:
      return state
      .set("m_bot",false)
      .set("bn_bot",false)
      .set("bu_bot",false)  
      .set("data_bot",action.data)  
      .set("isAddBot",false)      
    case ADD_BOT_MONEY:
      return state
      .set("m_money",action.m)
      .set("isAddMoney",true)
      .set("bn_money",action.bn)
    case ADD_BOT_MONEY_SUCCESS:
      return state
      .set("data_money",action.data)
      .set("isAddMoney",false)      
    default:
      return state;
  }
}

export default botReducer;
