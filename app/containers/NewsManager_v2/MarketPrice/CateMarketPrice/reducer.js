
import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_CATE_ACTION,
  GET_CATE_ACTION_SUCCESS,
  ADD_CATE_ACTION,
  ADD_CATE_ACTION_SUCCESS,
  DELETE_CATE_ACTION,
  DELETE_CATE_ACTION_SUCCESS,
} from './constants';

const initialState = fromJS({
  listCateMP: [],
  nameCateAdd: false,
  image: false,
  idDelCate: false,
});

function cateMarketPriceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATE_ACTION:
      return state
      .set("listCateMP",[])
    case GET_CATE_ACTION_SUCCESS:
      return state
      .update('listCateMP', listCateMP => listCateMP.concat(action.data))
    case DELETE_CATE_ACTION:
      return state
      .set("idDelCate",action.id)
    case DELETE_CATE_ACTION_SUCCESS:
      return state
      .set('listCateMP', state.get('listCateMP').filter((item) => { return item.id !== action.id}))
      .set("idDelCate",false)
    case ADD_CATE_ACTION:
      return state
      .set("nameCateAdd",action.nameCate)
      .set("image",action.image)
    case ADD_CATE_ACTION_SUCCESS:
      return state
      .update('listCateMP', listCateMP => listCateMP.concat(action.cate))
      .set("nameCateAdd",false)
      .set("image",false)
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default cateMarketPriceReducer;
