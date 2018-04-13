/*
 *
 * GittCode reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_GITT,
  GEN_GITT,
  LOAD_GITT_SUCCESS,
  GEN_GITT_SUCCESS,
  COUNT_GITT_GTT,
  COUNT_GITT_GCD,
  COUNT_GITT_GHV,
  COUNT_GITT_GTT_SUCCESS,
  COUNT_GITT_GCD_SUCCESS,
  COUNT_GITT_GHV_SUCCESS,
  SEARCH_NN,
  SEARCH_NN_SUCCESS,
  SEARCH,
  SEARCH_SUCCESS,
  DEL,
  DEL_SUCCESS,
  SEARCH_CODE,
  SEARCH_CODE_SUCCESS,
} from './constants';

const initialState = fromJS({
  isLoad : false,
  data : false,
  t : false,
  a : false,
  st : false,
  et : false ,
  c: false,
  v :false,
  
  data_gtt : false,
  data_gcd : false,
  data_ghv : false,

  nn: false,
  tS : false,
  cS : false,
  date : false,
  vS: false,
  ad : false,

  id : false,
  deleteSuccess : false,

  code : false,
});

function gittCodeReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_GITT:
      return state
      .set("isLoad",true)
    case SEARCH_CODE:
      return state
      .set("isLoad",true)
      .set("code",action.code)  
    case SEARCH_CODE_SUCCESS:
      return state
      .set("isLoad",false)
      .set("data",action.data)       
    case SEARCH:
      return state
      .set("isLoad",true)
      .set("tS",action.t)
      .set("cS",action.c)      
      .set("date",action.date)      
      .set("vS",action.v)      
      .set("nn",action.nn)      
      .set("ad",action.ad)      
    case SEARCH_SUCCESS:
      return state
      .set("isLoad",false)
      .set("data",action.data)      
    case LOAD_GITT_SUCCESS:
      return state
      .set("isLoad",false)
      .set("data",action.data)
    case GEN_GITT:
      return state
      .set("t",action.t)
      .set("a",action.a)
      .set("st",action.st)
      .set("et",action.et)
      .set("c",action.c)
      .set("v",action.v)      
    case GEN_GITT_SUCCESS:
      return state
      .set("data",action.data)
    case COUNT_GITT_GTT_SUCCESS:
      return state
      .set("data_gtt",action.data)  
    case COUNT_GITT_GCD_SUCCESS:
      return state
      .set("data_gcd",action.data)
    case COUNT_GITT_GHV_SUCCESS:
      return state
      .set("data_ghv",action.data)        
    case SEARCH_NN:
      return state
      // .set("isLoad",true)
      // .set("un",action.un) 
    case SEARCH_NN_SUCCESS:
      return state
      // .set("isLoad",false)
      .set("data",action.data)
    case DEL:
      return state
      .set("id",(action.id))  
      .set("deleteSuccess", false)
    case DEL_SUCCESS:
      return state
      .set("id",[]) 
      .set("data", state.get("data").filter((element) => {
        return action.id.indexOf(element.gift_code+"")==-1
      }))
      .set("deleteSuccess", true)  
    default:
      return state;
  }
}

export default gittCodeReducer;
