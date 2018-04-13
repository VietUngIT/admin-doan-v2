/*
 *
 * CountDau reducer
 *
 */

import { fromJS } from 'immutable';
import {
  COUNT_DAU,
  COUNT_DAU_SUCCESS,
  TOTAL_DPU,
  TOTAL_DAU,
  COUNT_DPU_SUCCESS,
  
  COUNT_DAU_NOW,
  COUNT_DAU_NOW_SUCCESS,
  TOTAL_DAU_NOW,
  TOTAL_DPU_NOW,
  COUNT_DPU_NOW_SUCCESS,
  IS_LOAD_DAU,
} from './constants';

const initialState = fromJS({
  st : false,
  et : false,

  isLoading : false,
  data: false,
  dpu: false,
  total_dpu : false,
  total_dau : false,
  page : false,
  isLoadDAU : false,

  isLoadingNow : false,
  page_now : false,
  dpu_now: false,
  data_now : false,
  total_dpu_now : false,
  total_dau_now : false,
});

function countDauReducer(state = initialState, action) {
  switch (action.type) {
    case IS_LOAD_DAU:
      return state
      .set("isLoadDAU",action.value)
    case TOTAL_DAU_NOW:
      return state
      .set("total_dau_now",action.total)
    case TOTAL_DPU_NOW:
      return state
      .set("total_dpu_now",action.total)      
    case COUNT_DAU_NOW:
      return state
      .set("isLoadingNow",true)
      .set("page_now",action.page)
    case COUNT_DPU_NOW_SUCCESS:
      return state      
      .set("isLoadingNow",false)  
      .set("dpu_now",action.data)   
    case COUNT_DAU_NOW_SUCCESS:
      return state
      .set("isLoadingNow",false)  
      .set("data_now",action.data) 

    case TOTAL_DAU:
      return state
      .set("total_dau",action.total)
    case TOTAL_DPU:
      return state
      .set("total_dpu",action.total)      
    case COUNT_DAU:
      return state
      .set("st",action.st)
      .set("et",action.et)
      .set("isLoading",true)
      .set("page",action.page)
      .set("isLoadDAU",true)
      
    case COUNT_DPU_SUCCESS:
      return state      
      .set("isLoading",false)  
      .set("dpu",action.data)   
    case COUNT_DAU_SUCCESS:
      return state
      .set("st",false)
      .set("et",false)
      .set("isLoading",false)  
      .set("data",action.data)  
      .set("isLoadDAU",false)
        
    default:
      return state;
  }
}

export default countDauReducer;
