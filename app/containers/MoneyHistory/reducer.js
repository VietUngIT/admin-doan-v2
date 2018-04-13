/*
 *
 * MoneyHistory reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_HIS_GAME,
  GET_HIS_GAME_SUCCESS,
} from './constants';

const initialState = fromJS({
  st : false,
  et : false,
  un_game : false,
  data_game :false,
  isLoading_game : false,
  gn_game: false,
});

function moneyHistoryReducer(state = initialState, action) {
  switch (action.type) {
  case GET_HIS_GAME:
    return state
    .set("st",action.st) 
    .set("et",action.et) 
    .set("un_game",action.un) 
    .set("gn_game",action.gn) 
    .set("isLoading_game",true)    
  case GET_HIS_GAME_SUCCESS:
    return state
    .set("data_game",action.data) 
    .set("isLoading_game",false)  
    default:
      return state;
  }
}

export default moneyHistoryReducer;
