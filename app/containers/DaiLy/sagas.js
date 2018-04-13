import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 
   LOAD_DAILY,
   ADD_DAILY,
   UPDATE_DAILY,
   DEL_DAILY,
   LOAD_MANAGER,
 } from './constants';
import {
   load_DL_Success,
   total_DL,
   update_DL_Success,
   add_DL_Success,
   del_DL_Success,
   load_manager_success,
} from './actions';
import {
  message,
} from 'antd';
//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {
  selectNAUpdate,
  selectAUpdate,
  selectFUpdate,
  selectNickUpdate,
  selectNA,
  selectA,
  selectF,
  selectNick,
  selectNNDel,
  selectPhone,
  selectPhoneUpdate,
  selectPage,
  selectMA,
      } from './selectors';
import {  
  callAPILoadDaiLy,
  callAPILoadManager,
  callAPIUpdateDaiLy,
  callAPIAddDaiLy,
  callAPIDelDaiLy,
} from 'utils/request';

export function* loadDL() {
  // const date =(yield select(selectDateDetail()));
  // const todate =(yield select(selectToDateDetail()));
  const page = (yield select(selectPage()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  

  const response = yield call(callAPILoadDaiLy,nn,sessionKey,page);
  try{
     if (response.data.e==0) {
        yield put(total_DL(response.data.total));
        if(response.data.data){
          yield put(load_DL_Success(response.data.data));         
          
        }       
    } else {
      message.error(response.data.e);
      yield put(load_DL_Success(false));
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    yield put(load_DL_Success(false));
    
  }
  
}
export function* loadDLWatcher() {  
  while (yield take(LOAD_DAILY)) {
    yield call(loadDL);
  }
}

export function* updateDL() {
  const na =(yield select(selectNAUpdate()));
  const a =(yield select(selectAUpdate()));
  const f = (yield select(selectFUpdate()));
  const nick = (yield select(selectNickUpdate()));
  const p = (yield select(selectPhoneUpdate()));
  const ma = (yield select(selectMA()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  

  const response = yield call(callAPIUpdateDaiLy,nn,sessionKey,na,p,a,f,nick,ma);
  try{
     if (response.data.e==0) {
        
          yield put(update_DL_Success());
          message.success("Cập nhật thành công !")          
          yield call(loadDL);
          yield call(loadManager);
            
    } else {
      switch(response.data.e){
        case 36 :{
          message.error("Không tồn tại nickname !");
          break;
        }
        case 54 :{
          message.error("Nickname chưa là đại lý !");
          break;
        }
        case 1 :{
          message.error("Lỗi hệ thống !");
          break;
        }
      }
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    
  }
  
}
export function* updateDLWatcher() {  
  while (yield take(UPDATE_DAILY)) {
    yield call(updateDL);
  }
}

export function* addDL() {
  const na =(yield select(selectNA()));
  const a =(yield select(selectA()));
  const f = (yield select(selectF()));
  const nick = (yield select(selectNick()));
  const phone = (yield select(selectPhone()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  

  const response = yield call(callAPIAddDaiLy,nn,sessionKey,na,phone,a,f,nick);
  try{
     if (response.data.e==0) {
        
          yield put(add_DL_Success());
          message.success("Thêm thành công !")
          yield call(loadDL);
            
    } else {
      switch(response.data.e){
        case 36 :{
          message.error("Không tồn tại nickname !");
          break;
        }
        case 53 :{
          message.error("Nickname đã là đại lý !");
          break;
        }
        case 57 :{
          message.error("Nickname là admin !");
          break;
        }
        case 1 :{
          message.error("Lỗi hệ thống !");
          break;
        }
      }
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    
  }
  
}
export function* addDLWatcher() {  
  while (yield take(ADD_DAILY)) {
    yield call(addDL);
  }
}


export function* delDL() {
  const nick_del = (yield select(selectNNDel()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  
  
  const response = yield call(callAPIDelDaiLy,nn,sessionKey,nick_del);
  try{
     if (response.data.e==0) {
        
          yield put(del_DL_Success(nick_del));
          message.success("Xóa thành công !")
          yield call(loadDL);
          yield call(loadManager);
           
    } else {
      message.error(response.data.e);
      yield put(del_DL_Success(false));
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    yield put(del_DL_Success(false));
    
  }
  
}
export function* delDLWatcher() {  
  while (yield take(DEL_DAILY)) {
    yield call(delDL);
  }
}


export function* loadManager() {
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  

  const response = yield call(callAPILoadManager,nn,sessionKey);
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(load_manager_success(response.data.data));         
          
        }       
    } else {
      message.error(response.data.e);
      yield put(load_manager_success(false));
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    yield put(load_manager_success(false));
    
  }
  
}
export function* loadManagerWatcher() {  
  while (yield take(LOAD_MANAGER)) {
    yield call(loadManager);
  }
}

export function* defaultSaga() {
  const loadWatcher = yield fork(loadDLWatcher);
  const loadManaWatcher = yield fork(loadManagerWatcher);
  const updateWatcher = yield fork(updateDLWatcher);
  const addWatcher = yield fork(addDLWatcher);
  const delWatcher = yield fork(delDLWatcher);
  if(yield take(LOCATION_CHANGE)){    
    yield cancel(loadWatcher);
    yield cancel(loadManaWatcher);
    yield cancel(updateWatcher);
    yield cancel(addWatcher);
    yield cancel(delWatcher);
    
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
