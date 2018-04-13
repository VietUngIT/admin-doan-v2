/*
 *
 * Backup reducer
 *
 */

import { fromJS } from 'immutable';
import {
  BACK_UP,
  BACK_UP_SUCCESS,
} from './constants';

const initialState = fromJS({
  isLoading : false,
  data : false,
});

function backupReducer(state = initialState, action) {
  switch (action.type) {
    case BACK_UP:
      return state
      .set("isLoading",true)
    case BACK_UP_SUCCESS:
      return state
      .set("isLoading",false)
      .set("data",action.data)
    default:
      return state;
  }
}

export default backupReducer;
