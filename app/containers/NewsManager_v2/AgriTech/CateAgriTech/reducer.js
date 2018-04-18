/*
 *
 * CateAgriTech reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_LIST_CATE_AGRI_TECH_ACTION,
  GET_LIST_CATE_AGRI_TECH_ACTION_SUCCESS,
  ADD_CATE_AGRI_TECH_ACTION,
  ADD_CATE_AGRI_TECH_ACTION_SUCCESS,
  DEL_CATE_AGRI_TECH_ACTION,
  DEL_CATE_AGRI_TECH_ACTION_SUCCESS,
} from './constants';

const initialState = fromJS({
  listCateAgriTech: [],
  nameCateAdd: false,
  idDelCate: false,
});

function cateAgriTechReducer(state = initialState, action) {
  switch (action.type) {
    case DEL_CATE_AGRI_TECH_ACTION:
      return state
      .set("idDelCate",action.id)
    case DEL_CATE_AGRI_TECH_ACTION_SUCCESS:
      return state
      .set('listCateAgriTech', state.get('listCateAgriTech').filter((item) => { return item.id !== action.id}))
      .set("idDelCate",false)
    case ADD_CATE_AGRI_TECH_ACTION:
      return state
      .set("nameCateAdd",action.nameCate)
    case ADD_CATE_AGRI_TECH_ACTION_SUCCESS:
      return state
      .update('listCateAgriTech', listCateAgriTech => listCateAgriTech.concat(action.cate))
      .set("nameCateAdd",false)
    case GET_LIST_CATE_AGRI_TECH_ACTION:
      return state
      .set("listCateAgriTech",[])
    case GET_LIST_CATE_AGRI_TECH_ACTION_SUCCESS:
      return state
      .update('listCateAgriTech', listCateAgriTech => listCateAgriTech.concat(action.data))
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default cateAgriTechReducer;
