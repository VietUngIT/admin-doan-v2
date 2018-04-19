
import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_LIST_MP_ACTION,
  GET_LIST_MP_ACTION_SUCCESS,
  DEL_LIST_MP_ACTION,
  DEL_LIST_MP_ACTION_SUCCESS,
} from './constants';

const initialState = fromJS({
  idCate: false,
  listMP: [],
  page: false,
  total: false,
  idDelNews: false,
  delNewsSuccess: false,
});

function listMarketPriceReducer(state = initialState, action) {
  switch (action.type) {
    case DEL_LIST_MP_ACTION:
      return state
      .set("idDelNews",action.id)
      .set("delNewsSuccess",false)
    case DEL_LIST_MP_ACTION_SUCCESS:
      return state
      .set('listMP', state.get('listMP').filter((item) => { return item.id !== action.id}))
      .set("delNewsSuccess",true)
    case GET_LIST_MP_ACTION:
      return state
      .set("listMP",[])
      .set("idCate",action.id)
      .set("page",action.page)
    case GET_LIST_MP_ACTION_SUCCESS:
      return state
      .update('listMP', listMP => listMP.concat(action.listNews))
      .set("total",action.total)
      .set("idCate",false)
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default listMarketPriceReducer;
