/*
 *
 * CountHdh reducer
 *
 */

import { fromJS } from 'immutable';
import {
  COUNT_HDH,
  COUNT_HDH_SUCCESS,
  SORT,
  TOTAL_PAGE,

} from './constants';

const initialState = fromJS({
  st : false,
  et : false,
  isLoading : false,
  data: false,
  t : false,
  total_page : false,
  page : false,
});

function countHdhReducer(state = initialState, action) {
  switch (action.type) {
    case TOTAL_PAGE:
      return state
      .set("total_page",action.total)
    case COUNT_HDH:
      return state
      .set("t",action.t)
      .set("st",action.st)
      .set("et",action.et)
      // .set("page",action.page)
      .set("isLoading",true)
    case COUNT_HDH_SUCCESS:
      return state
      .set("st",false)
      .set("et",false)
      .set("isLoading",false)  
      .set("data",action.data)  
    default:
      return state;
  }
}

export default countHdhReducer;
