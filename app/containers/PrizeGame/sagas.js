import { GET_PRIZE, ADD_PRIZE, DEL_PRIZE, EDIT_PRIZE } from "./constants";
import { callAPiGetPrizeGame, callAPiAddPrizeGame, callAPiDelPrizeGame, callAPiEditPrizeGame } from "../../utils/request";
import { get_prize_success, add_prize_success, del_prize_success, edit_prize_success } from "./actions";
import { selectIdDel, selectIdEdit,selectIdE, selectPrizeEdit, selectTop, selectPrize } from "./selectors";
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import {
  message,
} from 'antd';

export function* delPrize() {
  
  const id_del =(yield select(selectIdDel()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  const response = yield call(callAPiDelPrizeGame,nn,sessionKey,id_del);
  
  try{
     if (response.data.e==0) {
        // if(response.data.data){
          yield put(del_prize_success(id_del));
          message.success("Xóa thành công !")
          yield call(getPrize);
          
        // }       
    }else{
      if(response.data.e==81){
        message.error("Sự kiện không tồn tại !")
      }
      yield put(del_prize_success(false));
      yield call(getPrize);
      
    } 
    
  } catch(error){
    yield put(del_prize_success(false));
    yield call(getPrize);
    
  }
  
}
export function* delWatcher() {
  
  while (yield take(DEL_PRIZE)) {
    yield call(delPrize);
    
  }
}
export function* addPrize() {
  
  const idE =(yield select(selectIdE()));
  const top =(yield select(selectTop()));
  const prize =(yield select(selectPrize()));
  

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  const response = yield call(callAPiAddPrizeGame,nn,sessionKey,idE,top,prize);
  
  try{
     if (response.data.e==0) {
        // if(response.data.data){
          yield put(add_prize_success());
          message.success("Thêm thành công !")
          yield call(getPrize);
          
        // }       
    }else{
      yield put(add_prize_success());
      yield call(getPrize);
      
    } 
    
  } catch(error){
    yield put(add_prize_success());
    yield call(getPrize);
    
  }
  
}
export function* addWatcher() {
  
  while (yield take(ADD_PRIZE)) {
    yield call(addPrize);
    
  }
}
export function* getPrize() {
  
  const ide =(yield select(selectIdE()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  const response = yield call(callAPiGetPrizeGame,nn,sessionKey,ide);
  
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(get_prize_success(response.data.data));
        }       
    }else{
      yield put(get_prize_success(false));
    } 
    
  } catch(error){
    yield put(get_prize_success(false));
    
  }
  
}
export function* getAllWatcher() {
  
  while (yield take(GET_PRIZE)) {
    yield call(getPrize);
    
  }
}
export function* editPrize() {
  
  const id_edit =(yield select(selectIdEdit()));
  const prize_edit =(yield select(selectPrizeEdit()));
 

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  const response = yield call(callAPiEditPrizeGame,nn,sessionKey,id_edit,prize_edit);
  
  try{
     if (response.data.e==0) {
        // if(response.data.data){
          yield put(edit_prize_success());
          message.success("Sửa thành công !")
          yield call(getPrize);
          
        // }       
    }else{
      if(response.data.e==81){
        message.error("Sự kiện không tồn tại !")
      }
      if(response.data.e==82){
        message.error("Một sự kiện khác đang diễn ra,không thể kích hoạt sự kiện này !")
      }
      yield put(edit_prize_success());
      yield call(getPrize);
      
    } 
    
  } catch(error){
    yield put(edit_prize_success());
    yield call(getPrize);
    
  }
  
}
export function* editWatcher() {
  
  while (yield take(EDIT_PRIZE)) {
    yield call(editPrize);
    
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
