/*
 *
 * Banner reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_ALL_BANNER,
  LOAD_ALL_BANNER_SUCCESS,
  ADD_BANNER,
  ADD_BANNER_SUCCESS,
  DEL_BANNER,
  EDIT_BANNER,
  DEL_BANNER_SUCCESS,
  EDIT_BANNER_SUCCESS,
  CREATE_CHANGE_IMAGE,
  _IMAGE,
} from './constants';

const initialState = fromJS({
  isLoading : false,
  data : false,

  isAdd : false,
  url : false,
  fileName  : false,
  file : [],
  u : false,

  id_del : false,
  isDel : false,

  status : false,
  id_edit : false,
  isEdit : false,
  u_edit : false,

  _img : false,
});

function bannerReducer(state = initialState, action) {
  switch (action.type) {
    case _IMAGE:
      return state
      .set("_img",action.img)
    case LOAD_ALL_BANNER:
      return state
      .set("isLoading",true)
    case LOAD_ALL_BANNER_SUCCESS:
      return state
      .set("isLoading",false)  
      .set("data",action.data) 
    case CREATE_CHANGE_IMAGE:
      return state  
      .set("url",action.url) 
      .set("fileName",action.fileName) 
      .update("file",file=>file.concat(action.file)) 
    case ADD_BANNER:
      return state
      .set("u",action.u) 
      .set("isAdd",true)           
    case ADD_BANNER_SUCCESS:
      return state
      .set("isAdd",false)   
    case EDIT_BANNER:
      return state
      .set("isEdit",true)    
      .set("id_edit",action.id)    
      .set("status",action.status)    
      .set("u_edit",action.u)    
    case EDIT_BANNER_SUCCESS:
      return state
      .set("isEdit",false)   
    case DEL_BANNER:
      return state
      .set("isDel",true) 
      .set("id_del",action.id) 
    case DEL_BANNER_SUCCESS:
      return state
      .set("isDel",false) 
      .set("data", state.get("data").filter((element) => {
        return action.id.indexOf(element._id)==-1
      }))   
    default:
      return state;
  }
}

export default bannerReducer;
