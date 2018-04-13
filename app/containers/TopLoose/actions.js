/*
 *
 * TopLoose actions
 *
 */

import {
  TOP_LOOSE,
  
  TOP_LOOSE_SUCCESS,
} from './constants';

export function top_loose(gn,st,et) {
  return {
    type: TOP_LOOSE,
    
    gn,
    st,
    et,
  };
}
export function top_loose_success(data1,data2) {
  return {
    type: TOP_LOOSE_SUCCESS,
    data1,
    data2,
  };
}
