/*
 *
 * SumTx actions
 *
 */

import {
  SET_BET_SUM,
  SET_BET_SUM_SUCCESS,
} from './constants';

export function set_bet_sum(bet) {
  return {
    type: SET_BET_SUM,
    bet
  };
}
export function set_bet_sum_success() {
  return {
    type: SET_BET_SUM_SUCCESS,
    
  };
}