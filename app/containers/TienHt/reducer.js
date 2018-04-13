/*
 *
 * TienHt reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SEARCH_MONEY,
  SEARCH_MONEY_SUCCESS,
} from './constants';

const initialState = fromJS({
  st : false,
  et : false,
  data : false,
  isLoading : false,
});

function tienHtReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_MONEY:
      return state
      .set("st",action.st)
      .set("et",action.et)
      .set("isLoading",true)
    case SEARCH_MONEY_SUCCESS:
      return state
      .set("data",action.data)
      .set("isLoading",false)  
    default:
      return state;
  }
}

export default tienHtReducer;
