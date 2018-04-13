/*
 *
 * EventParent reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_EVENT_NAME,
  GET_EVENT_PARENT,
  GET_EVENT_PARENT_SUCCESS
} from './constants';

const initialState = fromJS({
  event_name : false,
  isLoading : false,
  data : false,
});

function eventParentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EVENT_PARENT:
      return state
      .set("isLoading",true)
    case GET_EVENT_PARENT_SUCCESS:
      return state
      .set("isLoading",false)
      .set("data",action.data)
    case GET_EVENT_NAME:
      return state
      .set("event_name",action.name)
    default:
      return state;
  }
}

export default eventParentReducer;
