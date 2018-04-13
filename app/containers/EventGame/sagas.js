import { GET_EVENT, ADD_EVENT, DEL_EVENT, EDIT_EVENT } from "./constants";
import { callAPiGetEventGame, callAPiAddEventGame, callAPiDelEventGame, callAPiEditEventGame } from "../../utils/request";
import { get_even_success, add_even_success, del_even_success, edit_even_success } from "./actions";
import { selectGN, selectST, selectCount, selectNE, selectEN, selectIdDel, selectIdEdit, selectStEdit, selectEnEdit, selectNeEdit, selectStatusEdit } from "./selectors";
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import {
  message,
} from 'antd';

export function* delEvent() {
  
  const id_del =(yield select(selectIdDel()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  const response = yield call(callAPiDelEventGame,nn,sessionKey,id_del);
  
  try{
     if (response.data.e==0) {
        // if(response.data.data){
          yield put(del_even_success(id_del));
          message.success("Xóa thành công !")
          yield call(getEvent);
          
        // }       
    }else{
      if(response.data.e==81){
        message.error("Sự kiện không tồn tại !")
      }
      yield put(del_even_success(false));
    } 
    
  } catch(error){
    yield put(del_even_success(false));
    
  }
  
}
export function* delWatcher() {
  
  while (yield take(DEL_EVENT)) {
    yield call(delEvent);
    
  }
}
export function* addEvent() {
  
  const gn =(yield select(selectGN()));
  const st =(yield select(selectST()));
  const en =(yield select(selectEN()));
  const ne =(yield select(selectNE()));
  const count =(yield select(selectCount()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  const response = yield call(callAPiAddEventGame,nn,sessionKey,gn,ne,st,en,count);
  
  try{
     if (response.data.e==0) {
        // if(response.data.data){
          yield put(add_even_success());
          message.success("Thêm thành công !")
          yield call(getEvent);
          
        // }       
    }else{
      yield put(add_even_success());
      message.error(response.data.e)
      
    } 
    
  } catch(error){
    yield put(add_even_success());
    message.error(error)
    
  }
  
}
export function* addWatcher() {
  
  while (yield take(ADD_EVENT)) {
    yield call(addEvent);
    
  }
}
export function* getEvent() {
  
  // const key =(yield select(selectKey()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  const response = yield call(callAPiGetEventGame,nn,sessionKey);
  
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(get_even_success(response.data.data));
        }       
    }else{
      yield put(get_even_success(false));
      message.error(response.data.e)
      
    } 
    
  } catch(error){
    yield put(get_even_success(false));
    
  }
  
}
export function* getAllWatcher() {
  
  while (yield take(GET_EVENT)) {
    yield call(getEvent);
    
  }
}
export function* editEvent() {
  
  const id_edit =(yield select(selectIdEdit()));
  const st_edit =(yield select(selectStEdit()));
  const en_edit =(yield select(selectEnEdit()));
  const ne_edit =(yield select(selectNeEdit()));
  const status =(yield select(selectStatusEdit()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  const response = yield call(callAPiEditEventGame,nn,sessionKey,id_edit,ne_edit,st_edit,en_edit,status);
  
  try{
     if (response.data.e==0) {
        // if(response.data.data){
          yield put(edit_even_success());
          message.success("Sửa thành công !")
          yield call(getEvent);
          
        // }       
    }else{
      if(response.data.e==81){
        message.error("Sự kiện không tồn tại !")
      }
      if(response.data.e==82){
        message.error("Một sự kiện khác đang diễn ra,không thể kích hoạt sự kiện này !")
      }else{
        message.error(response.data.e)
        
      }
      yield put(edit_even_success());
    } 
    
  } catch(error){
    yield put(edit_even_success());
    
  }
  
}
export function* editWatcher() {
  
  while (yield take(EDIT_EVENT)) {
    yield call(editEvent);
    
  }
}
export function* defaultSaga() {
  const get = yield fork(getAllWatcher);
  const add = yield fork(addWatcher);
  const del = yield fork(delWatcher);
  const edit = yield fork(editWatcher);

  if(yield take(LOCATION_CHANGE)){
    yield cancel(get);
    yield cancel(add);
    yield cancel(del);
    yield cancel(edit);
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
