/*
 *
 * SumTx reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_BET_SUM,
  SET_BET_SUM_SUCCESS,
} from './constants';

const initialState = fromJS({
  bet : false,
});

function sumTxReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BET_SUM:
      return state
      .set("bet",action.bet)
    case SET_BET_SUM_SUCCESS:
      return state
    default:
      return state;
  }
}

export default sumTxReducer;
