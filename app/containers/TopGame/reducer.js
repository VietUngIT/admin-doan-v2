/*
 *
 * TopGame reducer
 *
 */

import { fromJS } from 'immutable';
import {
  TOP_WIN,
  TOP_WIN_SUCCESS,

} from './constants';

const initialState = fromJS({
  un : false,
  gn : false,
  st : false,
  et : false,
  isLoadWin : false,
  data_win_user : false,
  data_win_bot : false,
});

function topGameReducer(state = initialState, action) {
  switch (action.type) {
    case TOP_WIN:
      return state
      .set("un",action.un)
      .set("gn",action.gn)
      .set("et",action.et)
      .set("st",action.st)
      .set("isLoadWin",true)
    case TOP_WIN_SUCCESS:
      return state
      .set("data_win_user",action.data1)
      .set("data_win_bot",action.data2)
      .set("un",false)
      .set("gn",false)      
      .set("et",false)
      .set("st",false)  
      .set("isLoadWin",false)
  
      
    default:
      return state;
  }
}

export default topGameReducer;
