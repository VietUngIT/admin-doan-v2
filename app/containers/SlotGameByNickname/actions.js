/*
 *
 * SlotGameByNickname actions
 *
 */

import {
  SLOT_BY_NN,
  SLOT_BY_NN_SUCCESS,
} from './constants';

export function search_slot_game_by_nn(st,et,un,gid) {
  return {
    type: SLOT_BY_NN,
    st,
    et,
    un,
    gid
  };
}
export function search_slot_game_by_nn_success(data) {
  return {
    type: SLOT_BY_NN_SUCCESS,
    data,
  };
}