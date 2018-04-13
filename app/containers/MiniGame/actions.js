/*
 *
 * MiniGame actions
 *
 */

import {
  SEARCH_MINI_GAME,
  SEARCH_MINI_GAME_SUCCESS,
  SEARCH_MINI_ID,
  SEARCH_MINI_ID_SUCCESS,
} from './constants';

export function search_mini_game(un,gname,st,et) {
  return {
    type: SEARCH_MINI_GAME,
    un,
    gname,
    st,
    et,
  };
}
export function search_mini_game_success(data) {
  return {
    type: SEARCH_MINI_GAME_SUCCESS,
    data
  };
}
export function search_mini_id(id,gname) {
  return {
    type: SEARCH_MINI_ID,
    id,
    gname,
    // st,
    // et,
  };
}
export function search_mini_id_success(data) {
  return {
    type: SEARCH_MINI_ID_SUCCESS,
    data
  };
}