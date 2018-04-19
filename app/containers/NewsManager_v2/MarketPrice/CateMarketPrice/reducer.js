
import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_CATE_ACTION,
  GET_CATE_ACTION_SUCCESS,
} from './constants';

const initialState = fromJS({
  listCateMP: [],
});

function cateMarketPriceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATE_ACTION:
      return state
      .set("listCateMP",[])
    case GET_CATE_ACTION_SUCCESS:
      return state
      .update('listCateMP', listCateMP => listCateMP.concat(action.data))
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default cateMarketPriceReducer;
