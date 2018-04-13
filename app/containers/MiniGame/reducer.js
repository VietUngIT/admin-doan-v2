/*
 *
 * MiniGame reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SEARCH_MINI_GAME,
  SEARCH_MINI_GAME_SUCCESS,
  SEARCH_MINI_ID,
  SEARCH_MINI_ID_SUCCESS,
} from './constants';

const initialState = fromJS({
  un : false,
  gn : false,
  st : false,
  et :false,
  data : false,
  isLoad : false,

  id:false,
  g_id : false,
  idLoad : false,
  dataId : false,
});

function miniGameReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_MINI_GAME:
      return state
      .set("un",action.un)
      .set("gn",action.gname)
      .set("st",action.st)
      .set("et",action.et)
      .set("isLoad",true)
    case SEARCH_MINI_GAME_SUCCESS:
      return state
      .set("data",action.data)
      .set("isLoad",false)
    case SEARCH_MINI_ID:
      return state
      .set("id",action.id)
      .set("g_id",action.gname)
      // .set("st",action.st)
      // .set("et",action.et)
      .set("idLoad",true)
    case SEARCH_MINI_ID_SUCCESS:
      return state
      .set("dataId",action.data)
      .set("idLoad",false)  
    default:
      return state;
  }
}

export default miniGameReducer;
