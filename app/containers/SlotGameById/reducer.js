/*
 *
 * SlotGameById reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SLOT_BY_ID,
  SLOT_BY_ID_SUCCESS,
} from './constants';

const initialState = fromJS({
  st : false,
  et :false,
  id : false,
  data : false,
});

function slotGameByIdReducer(state = initialState, action) {
  switch (action.type) {
    case SLOT_BY_ID:
      return state
      .set("st",action.st)
      .set("et",action.et)
      .set("id",action.id)
    case SLOT_BY_ID_SUCCESS:
      return state
      .set("data",action.data)
        
    default:
      return state;
  }
}

export default slotGameByIdReducer;
