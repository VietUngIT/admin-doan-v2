/*
 *
 * CheckSeri reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHECK_SERI_SUCCESS,
  CHECK_SERI,
} from './constants';

const initialState = fromJS({
  isLoading : false,
  key : false,
  data : false,
  type : false,
});

function checkSeriReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_SERI:
      return state
      .set("isLoading",true)
      .set("key",action.key)
      .set("type",action.t)
    case CHECK_SERI_SUCCESS:
      return state
      .set("isLoading",false)
      .set("data",action.data)
    default:
      return state;
  }
}

export default checkSeriReducer;
