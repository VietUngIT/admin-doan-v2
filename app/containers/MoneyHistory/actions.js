/*
 *
 * MoneyHistory actions
 *
 */

import {
  GET_HIS_GAME,
  GET_HIS_GAME_SUCCESS,
} from './constants';

export function getHisGame(gn,un,st,et) {
  return {
    type: GET_HIS_GAME,
    st,
    et,
    un,
    gn
  };
}
export function getHisGameSuccess(data) {
  return {
    type: GET_HIS_GAME_SUCCESS,
    data,
  };
}