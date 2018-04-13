import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 
  GET_ALL_NOTI,
  ADD_NOTI,
  DEL_ALL_NOTI,
  EDIT_NOTI,
  DEL_NOTI,
 } from './constants';
 import {
  get_all_noti_success,
  add_noti_success,
  del_all_noti_success,
  del_noti_success,
  edit_noti_success,
} from './actions';
import {
        message,
} from 'antd';
//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {
  selectB,
  selectEt,
  selectIDEdit,
  selectBEdit,
  selectIDDel,
} from './selectors';
import {  
  callAPIGetAllNoti,
  callAPIAddNoti,
  callAPIDelAllNoti,
  callAPIEditNoti,
  callAPIDelNoti,
} from 'utils/request';


export function* getAllNoti() {
 
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPIGetAllNoti,nn,sessionKey);
  // console.log("response:\n",response)
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(get_all_noti_success(response.data.data));
        
        }       
    } else {
      message.error(response.data.e);
      yield put(get_all_noti_success(false));
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(get_all_noti_success(false));
    
  }
  
}
export function* getAllNotiWatcher() {
  
  while (yield take(GET_ALL_NOTI)) {
    yield call(getAllNoti);
  }
}

export function* addNoti() {
   const b =(yield select(selectB())); 
   const et =(yield select(selectEt()));
   let sessionKey = localStorage.getItem('sessionkey');
   let userInfo = localStorage.getItem('userInfo');
   let length = localStorage.getItem('userInfo').length;
   let nn = userInfo.substr(1,length-2)
   
   const response = yield call(callAPIAddNoti,nn,sessionKey,b,et);
  //  console.log("response-add:\n",response)
   try{
      if (response.data.e==0) {
         if(response.data.data){
           yield put(add_noti_success());
           yield call(getAllNoti);
         
         }       
     } else {
       message.error(response.data.e);
     }
   } catch(error){
     //yield put(showNotify(503,'error','error'));
     message.error('Lỗi ! Hãy thử lại !');
   }
   
 }
export function* addNotiWatcher() {
  
  while (yield take(ADD_NOTI)) {
    yield call(addNoti);
  }
}

export function* delAllNoti() {
  
   let sessionKey = localStorage.getItem('sessionkey');
   let userInfo = localStorage.getItem('userInfo');
   let length = localStorage.getItem('userInfo').length;
   let nn = userInfo.substr(1,length-2)
   
   const response = yield call(callAPIDelAllNoti,nn,sessionKey);
  //  console.log("response-dell:\n",response)
   try{
      if (response.data.e==0) {
         if(response.data.data){
           yield put(del_all_noti_success(response.data.data));
            yield call(getAllNoti);
         }       
     } else {
       message.error(response.data.e);
     }
   } catch(error){
     //yield put(showNotify(503,'error','error'));
     message.error('Lỗi ! Hãy thử lại !');
   }
   
 }
export function* delNotiWatcher() {
  
  while (yield take(DEL_ALL_NOTI)) {
    yield call(delAllNoti);
  }
}

export function* editNoti() {
  const b =(yield select(selectBEdit())); 
  const id =(yield select(selectIDEdit()));
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPIEditNoti,nn,sessionKey,id,b);
 //  console.log("response-add:\n",response)
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(edit_noti_success(response.data.data));
          message.success('Sửa thành công !');
          yield call(getAllNoti);
    
        }       
    } else {
      message.error(response.data.e);
      yield put(edit_noti_success(false));
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    yield put(edit_noti_success(false));
    
  }
  
}
export function* editNotiWatcher() {
  
  while (yield take(EDIT_NOTI)) {
    yield call(editNoti);
  }
}

export function* delNoti() {
  const id =(yield select(selectIDDel()));
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPIDelNoti,nn,sessionKey,id);
 //  console.log("response-add:\n",response)
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(del_noti_success(id));
          message.success('Xóa thành công !');
          yield call(getAllNoti);
    
        }       
    } else {
      message.error(response.data.e);
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
  }
  
}
export function* delSomeNotiWatcher() {
  
  while (yield take(DEL_NOTI)) {
    yield call(delNoti);
  }
}
export function* defaultSaga() {
  const allNotiWatcher = yield fork(getAllNotiWatcher);
  const addWatcher = yield fork(addNotiWatcher);
  const delWatcher = yield fork(delNotiWatcher);
  const editWatcher = yield fork(editNotiWatcher);
  const delSomeWatcher = yield fork(delSomeNotiWatcher);
  
  if(yield take(LOCATION_CHANGE)){
    yield cancel(allNotiWatcher);
    yield cancel(addWatcher);
    yield cancel(delWatcher);
    yield cancel(editWatcher);
    yield cancel(delSomeWatcher);
    
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
