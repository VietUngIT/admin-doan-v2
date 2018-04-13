/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import {
  GET_DOMAINS,
  GET_DOMAINS_SUCCESS,
  IS_MOBILE,
  IS_SUPER_ADMIN,
  SUGGEST_USER_BY_NN,
  SUGGEST_USER_BY_NN_SUCCESS,
  LOAD_DUYET_DL_SUCCESS,
  LOAD_DUYET_DL_CONFIRM,
  IS_DUYET_DL_TAB,
  LOAD_DUYET_CARD,
  LOAD_DUYET_CARD_SUCCESS,
  COUNT_CARD,
  COUNT_DL,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  domains: [],
  mobile : false,
  isSuperAdmin : false,
  key : false,
  suggest_data : false,

  isLoading : false,
  data : false,
  page : false,
  countDL : false,

  data_card : false,
  t : false,
  count : false,

  isDuyetDLTab : false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case IS_DUYET_DL_TAB:
      return state
      .set("isDuyetDLTab",action.value)
    case COUNT_DL:
      return state
      .set("countDL",action.count)
    case COUNT_CARD:
      return state
      .set("count",action.count)
    case LOAD_DUYET_CARD:
      return state
      .set("t",action.t)
    case LOAD_DUYET_CARD_SUCCESS:
      return state
      .set("data_card",action.data)
    case LOAD_DUYET_DL_CONFIRM:
      return state
      .set("isLoading",true)
      .set("page",action.page)
    case LOAD_DUYET_DL_SUCCESS:
      return state
      .set("isLoading",false)
      .set("data",action.data)  
    case SUGGEST_USER_BY_NN:
      return state
      .set("key",action.key) 
    case SUGGEST_USER_BY_NN_SUCCESS:
      return state
      .set("suggest_data",action.data)  
    case GET_DOMAINS:
      return state
      .set('loading', true)
    case IS_MOBILE:
      return state
      .set('mobile', action.isMobile)
    case IS_SUPER_ADMIN:
      return state
      .set('isSuperAdmin', action.isSuperAdmin)  
    case GET_DOMAINS_SUCCESS:
      return state
      .update('domains', domains => domains.concat(action.listdomain))
      .set('loading', false)
    default:
      return state;
  }
}

export default appReducer;
