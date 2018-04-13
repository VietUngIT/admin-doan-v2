/*
 *
 * TopLoose reducer
 *
 */

import { fromJS } from 'immutable';
import {
  TOP_LOOSE,
  TOP_LOOSE_SUCCESS,
} from './constants';

const initialState = fromJS({
  un : false,
  gn : false,
  st : false,
  et : false,
  isLoadLoose : false,
  data_loose_user : false,
  data_loose_bot : false,
});

function topLooseReducer(state = initialState, action) {
  switch (action.type) {        
  case TOP_LOOSE:
    return state
    .set("gn",action.gn)
    .set("et",action.et)
    .set("isLoadLoose",true)
    .set("st",action.st)
  case TOP_LOOSE_SUCCESS:
    return state
    .set("data_loose_user",action.data1)
    .set("data_loose_bot",action.data2)    
    .set("un",false)
    .set("gn",false)      
    .set("et",false)
    .set("st",false)  
    .set("isLoadLoose",false)
    default:
      return state;
  }
}

export default topLooseReducer;
