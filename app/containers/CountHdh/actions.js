/*
 *
 * CountHdh actions
 *
 */

import {
  COUNT_HDH,
  COUNT_HDH_SUCCESS,
  SORT,
  TOTAL_PAGE,
} from './constants';

export function total_page(total) {
  return {
    type: TOTAL_PAGE,
    total
  };
}
export function count_hdh(t,st,et) {
  return {
    type: COUNT_HDH,
    t,
    st,
    et,
    // page
  };
}

export function count_hdh_success(data) {
  return {
    type: COUNT_HDH_SUCCESS,
    data
  };
}
export function sort_data(data) {
  return {
    type: SORT,
    data
  };
}