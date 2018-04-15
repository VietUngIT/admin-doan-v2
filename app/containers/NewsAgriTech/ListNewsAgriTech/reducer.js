/*
 *
 * ListNewsAgriTech reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_LIST_NEWS_AGRI_TECH_ACTION,
  GET_LIST_NEWS_AGRI_TECH_ACTION_SUCCESS,
} from './constants';

const initialState = fromJS({
  listNewsAgriTech:[],
  idSubCate: false,
  page: 0,
  total: 0,
});

function listNewsAgriTechReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_LIST_NEWS_AGRI_TECH_ACTION:
      return state
      .set("listNewsAgriTech",[])
      .set("idSubCate",action.id)
      .set("page",action.page)
    case GET_LIST_NEWS_AGRI_TECH_ACTION_SUCCESS:
      return state
      .update('listNewsAgriTech', listNewsAgriTech => listNewsAgriTech.concat(action.listNews))
      .set("total",action.total)
    default:
      return state;
  }
}

export default listNewsAgriTechReducer;
