/*
 *
 * SubCategoryMarKetInfo reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_LIST_SUB_CATE_MK_ACTION,
  GET_LIST_SUB_CATE_MK_ACTION_SUCCESS,
} from './constants';

const initialState = fromJS({
  listSubCateMK: [],
  idCateGetSub: false,
});

function subCategoryMarKetInfoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_LIST_SUB_CATE_MK_ACTION:
      return state
      .set("idCateGetSub",action.id)
      .set("listSubCateMK",[])
    case GET_LIST_SUB_CATE_MK_ACTION_SUCCESS:
      return state
      .update('listSubCateMK', listSubCateMK => listSubCateMK.concat(action.subcate))
      .set("idCateGetSub",false)
    default:
      return state;
  }
}

export default subCategoryMarKetInfoReducer;
