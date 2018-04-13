/*
 *
 * SlotGameById actions
 *
 */

import {
  SLOT_BY_ID,
  SLOT_BY_ID_SUCCESS,
} from './constants';

export function search_slot_game_by_id(st,et,id) {
  return {
    type: SLOT_BY_ID,
    st,
    et,
    id
  };
}
export function search_slot_game_by_id_success(data) {
  return {
    type: SLOT_BY_ID_SUCCESS,
    data,
  };
}