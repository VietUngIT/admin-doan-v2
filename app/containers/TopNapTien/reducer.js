/*
 *
 * TopNapTien reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_TOP_MONEY_SUCCESS,
  GET_TOP_MONEY,
} from './constants';

const initialState = fromJS({
  isLoading : false,
  data : false,
});

function topNapTienReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TOP_MONEY:
      return state
      .set("isLoading",true)
      .set("st",action.st)
      .set("et",action.et)
    case GET_TOP_MONEY_SUCCESS:
      return state
      .set("isLoading",false)
      .set("data",action.data)
    default:
      return state;
  }
}

export default topNapTienReducer;
