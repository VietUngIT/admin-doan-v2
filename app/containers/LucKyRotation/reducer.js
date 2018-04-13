/*
 *
 * LucKyRotation reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_LUCKY_ROLATION,
  LOAD_LUCKY_ROLATION_SUCCESS,
  LOAD_TYLE_LUCKY_ROLATION,
  LOAD_TYLE_LUCKY_ROLATION_SUCCESS,
  UPDATE_SUCCESS,
  UPDATE,
} from './constants';

const initialState = fromJS({
  isLoad : false,
  data : [],
  datatyle: [],
  st : false,
  et : false ,

  id :false,
  v: false,
});

function lucKyRotationReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_LUCKY_ROLATION:
      return state
      .set("isLoad",true)
      .set("st",action.st)
      .set("et",action.et);
    case LOAD_LUCKY_ROLATION_SUCCESS:
      return state
      .set("isLoad",false)
      .set('data',action.data);
    case LOAD_TYLE_LUCKY_ROLATION:
      return state;
    case LOAD_TYLE_LUCKY_ROLATION_SUCCESS:
      return state
      .set("datatyle",action.data);
    case UPDATE:
      return state
      .set("id",action.id)  
      .set("v",action.v);  
    case UPDATE_SUCCESS:
      return state
      .set("data",action.datatyle)  
    default:
      return state;
  }
}

export default lucKyRotationReducer;
