/*
 *
 * DuyetDl reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_DUYET_DL,
  TOTAL_PAGE,
  DUYET_DL,
  LOAD_DUYET_DL_SUCCESS,
  DUYET_DL_SUCCESS,
  LOAD_DUYET_DL_CONFIRM,
  LOAD_DUYET_DL_NOT_CONFIRM,
  HUY_DUYET_DL_SUCCESS,
  HUY_DUYET_DL,
  DETAIL_DUYET_DL,
  DETAIL_DUYET_DL_SUCCESS,
} from './constants';

const initialState = fromJS({
  isLoading : false,
  data : false,
  total_page : false,
  page : false,
  type : false,

  id_detail : false,
  data_detail : false,

  isDuyet : false,
  isHuy : false,
  id : false,
});

function duyetDlReducer(state = initialState, action) {
  switch (action.type) {
    case DETAIL_DUYET_DL:
      return state
      .set("id_detail",action.id)
    case DETAIL_DUYET_DL_SUCCESS:
      return state
      .set("data_detail",action.data)
    case LOAD_DUYET_DL:
      return state
      .set("isLoading",true)
      .set("page",action.page)
    case LOAD_DUYET_DL_CONFIRM:
      return state
      .set("isLoading",true)
      .set("page",action.page)
    case LOAD_DUYET_DL_NOT_CONFIRM:
      return state
      .set("isLoading",true)
      .set("page",action.page)  
    case LOAD_DUYET_DL_SUCCESS:
      return state
      .set("isLoading",false)
      .set("data",action.data)  
    case TOTAL_PAGE:
      return state
      .set("total_page",action.total)
    case DUYET_DL:
      return state
      .set("isDuyet",false)
      .set("id",action.id)
    case DUYET_DL_SUCCESS:
      return state
      .set("isDuyet",true) 
      .set("id",false)
    case HUY_DUYET_DL:
      return state
      .set("isHuy",false)
      .set("id",action.id)
    case HUY_DUYET_DL_SUCCESS:
      return state
      .set("isHuy",true)
      .set("id",false)
      
    default:
      return state;
  }
}

export default duyetDlReducer;
