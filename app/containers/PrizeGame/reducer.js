/*
 *
 * PrizeGame reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_PRIZE,
  GET_PRIZE_SUCCESS,
  EDIT_PRIZE,
  EDIT_PRIZE_SUCCESS,
  ADD_PRIZE,
  ADD_PRIZE_SUCCESS,
  DEL_PRIZE,
  DEL_PRIZE_SUCCESS
} from './constants';

const initialState = fromJS({
  isLoading : false,
  id_e : false,
  data : false,

  top : false,
  prize : false,

  prize_edit : false,
  id_edit: false,

  id_del : false,

}
);

function prizeGameReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRIZE:
      return state
      .set("isLoading",true)
      .set("id_e",action.id)
      
    case GET_PRIZE_SUCCESS:
      return state
      .set("isLoading",false)
      .set("data",action.data)
    case ADD_PRIZE:
      return state
      .set("top",action.top)
      .set("id_e",action.id)
      .set("prize",action.prize)
    case EDIT_PRIZE:
      return state
      .set("id_edit",action.id)
      .set("prize_edit",action.prize)  
    case DEL_PRIZE:
      return state
      .set("id_del",action.id)
    case DEL_PRIZE_SUCCESS:
      return state
      .set("id_del",false)
      .set("data", state.get("data").filter((data) => {
        return action.id.indexOf(data.id+"")==-1
      }))
    default:
      return state;
  }
}

export default prizeGameReducer;
