/*
 *
 * TopGame actions
 *
 */

import {
  TOP_WIN,
  TOP_WIN_SUCCESS,
  
} from './constants';

export function top_win(un,gn,st,et) {
  return {
    type: TOP_WIN,
    un,
    gn,
    st,
    et,
  };
}
export function top_win_success(data1,data2) {
  return {
    type: TOP_WIN_SUCCESS,
    data1,
    data2,
  };
}
