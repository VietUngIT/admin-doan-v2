/*
 *
 * EventGame reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_EVENT,
  GET_EVENT_SUCCESS,
  EDIT_EVENT,
  EDIT_EVENT_SUCCESS,
  ADD_EVENT,
  ADD_EVENT_SUCCESS,
  DEL_EVENT,
  DEL_EVENT_SUCCESS
} from './constants';

const initialState = fromJS({
  isLoading : false,
  data : false,

  st : false,
  en : false,
  gn : false,
  ne : false,
  count : false,

  st_edit : false,
  en_edit : false,
  ne_edit : false,
  status : false,
  id_edit : false,

  id_del : false,
});

function eventGameReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EVENT:
      return state
      .set("isLoading",true)
    case GET_EVENT_SUCCESS:
      return state
      .set("isLoading",false)
      .set("data",action.data)
    case ADD_EVENT:
      return state
      .set("st",action.st)
      .set("en",action.en)
      .set("gn",action.gn)
      .set("ne",action.ne)
      .set("count",action.count)
    case EDIT_EVENT:
      return state
      .set("st_edit",action.st)
      .set("en_edit",action.en)
      .set("id_edit",action.id)
      .set("ne_edit",action.ne)
      .set("status",action.status)
    case DEL_EVENT:
      return state
      .set("id_del",action.id)
    case DEL_EVENT_SUCCESS:
      return state
      .set("id_del",false)
      .set("data", state.get("data").filter((data) => {
        return action.id.indexOf(data.id+"")==-1
      }))
    default:
      return state;
  }
}

export default eventGameReducer;
