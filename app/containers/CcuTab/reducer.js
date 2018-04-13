/*
 *
 * CcuTab reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SEARCH_HISTORY,
  SEARCH_CURRENT,
  SEARCH_CURRENT_SUCCESS,
  SEARCH_HISTORY_SUCCESS,
  ONCHANGE_ETIME,
  ONCHANGE_STIME,
 
} from './constants';

const initialState = fromJS({
  start_time: false,
  end_time : false,
  ccuLog : false,
  ccuHis : false,
  
});

function ccuTabReducer(state = initialState, action) {
  switch (action.type) {
    case ONCHANGE_STIME:
      return state
      .set("start_time",action.sTime)
    case ONCHANGE_ETIME:
      return state
      .set("end_time",action.eTime)
    case SEARCH_CURRENT_SUCCESS:
      return state
      .set("ccuLog",action.ccLog)
    case SEARCH_HISTORY_SUCCESS:
      return state
      .set("ccuHis",action.ccLog)
        
    default:
      return state;
  }
}

export default ccuTabReducer;
