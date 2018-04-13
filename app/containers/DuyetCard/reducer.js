/*
 *
 * DuyetCard reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_CARD_LIST,
  GET_CARD_LIST_SUCCESS,
  DUYET_CARD,
  DUYET_CARD_SUCCESS,
  HUY_DUYET_CARD,
  HUY_DUYET_CARD_SUCCESS,
  CHANGE_NCC_CARD_SUCCESS,
  CHANGE_NCC_CARD,
  GET_LIST_NCC_CARD,
  GET_LIST_NCC_CARD_SUCCESS,
} from './constants';

const initialState = fromJS({
  isLoading : false,
  data : false,
  t : false,

  id:false,
  isDuyet : false,

  idHuy : false,
  isHuy : false,

  isGetNCC : false,
  isChangeNCCSuccess : false,
  data_ncc : false,
  pc : false,
  
});

function duyetCardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_NCC_CARD:
      return state
      .set("isGetNCC",true)
    case GET_LIST_NCC_CARD_SUCCESS:
      return state
      .set("isGetNCC",false)
      .set("data_ncc",action.data)
    case CHANGE_NCC_CARD:
      return state
      .set("isChangeNCCSuccess",false)
      .set("pc",action.pc)
    case CHANGE_NCC_CARD_SUCCESS:
      return state
      .set("isChangeNCCSuccess",true)
    case GET_CARD_LIST:
      return state
      .set("isLoading",true)
      .set("t",action.t)
    case GET_CARD_LIST_SUCCESS:
      return state
      .set("isLoading",false)
      .set("data",action.data)
    case DUYET_CARD:
      return state
      .set("id",action.id)
      .set("isDuyet",true)
    case DUYET_CARD_SUCCESS:
      return state
      .set("isDuyet",false)
    case HUY_DUYET_CARD:
      return state
      .set("idHuy",action.id)  
      .set("isHuy",true)      
    case HUY_DUYET_CARD_SUCCESS:
      return state
      .set("isHuy",false)
    default:
      return state;
  }
}

export default duyetCardReducer;
