/*
 *
 * SlotGameByNickname reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SLOT_BY_NN,
  SLOT_BY_NN_SUCCESS,
} from './constants';

const initialState = fromJS({
  st : false,
  et : false,
  un : false,
  gid : false,
  data : false,
  isLoad : false,
});

function slotGameByNicknameReducer(state = initialState, action) {
  switch (action.type) {
    case SLOT_BY_NN:
      return state
      .set("st",action.st)
      .set("et",action.et)
      .set("un",action.un)
      .set("gid",action.gid)
      .set("isLoad",true)
    case SLOT_BY_NN_SUCCESS:
      return state
      .set("data",action.data)
      .set("isLoad",false)
      
    default:
      return state;
  }
}

export default slotGameByNicknameReducer;
