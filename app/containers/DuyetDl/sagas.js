import { LOAD_DUYET_DL, DUYET_DL, LOAD_DUYET_DL_CONFIRM, LOAD_DUYET_DL_NOT_CONFIRM, HUY_DUYET_DL, LOAD_DUYET_DL_CANCEL, DETAIL_DUYET_DL } from "./constants";
import { callAPILoadDuyetDaiLy, callAPIDuyetDaiLy, callAPILoadDuyetDaiLyConfirm, callAPILoadDuyetDaiLyNotConfirm, callAPIHuyDaiLy, callAPILoadDuyetDaiLyCancel, callAPIDetailDuyetDaiLy } from "../../utils/request";
import { selectType, selectPage, selectID, selectIdDetail } from "./selectors";
import { load_duyet_dl_success, total_page, duyet_dl_success, huy_duyet_dl_success, detail_duyet_dl_success } from "./actions";
import {
  message,
} from 'antd';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { count_dl } from "../App/actions";

export function* load() {
  // const date =(yield select(selectDateDetail()));
  const type =(yield select(selectType()));
  const page = (yield select(selectPage()));
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  
  
  const response = yield call(callAPILoadDuyetDaiLy,nn,sessionKey,page);    
  
  try{
     if (response.data.e==0) {
        yield put(total_page(response.data.total));
        if(response.data.data){
          yield put(load_duyet_dl_success(response.data.data));         
          
        }       
    } else {
      message.error(response.data.e);
      yield put(load_duyet_dl_success(false));
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(load_duyet_dl_success(false));
    
  }
  
}
export function* loadDuyetDLWatcher() {  
  while (yield take(LOAD_DUYET_DL)) {
    
    yield call(load);
  }
}

export function* loadConf() {
  // const date =(yield select(selectDateDetail()));
  const page = (yield select(selectPage()));
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  
  
  const response = yield call(callAPILoadDuyetDaiLyConfirm,nn,sessionKey,page);    
  
  try{
     if (response.data.e==0) {
        yield put(total_page(response.data.total));
        if(response.data.data){
          yield put(load_duyet_dl_success(response.data.data));         
          
        }       
    } else {
      message.error(response.data.e);
      yield put(load_duyet_dl_success(false));
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(load_duyet_dl_success(false));
    
  }
}
  
export function* loadDuyetDLCWatcher() {  
  while (yield take(LOAD_DUYET_DL_CONFIRM)) {
    
    yield call(loadConf);
  }
}

export function* loadNotConf() {
  // const date =(yield select(selectDateDetail()));
  const page = (yield select(selectPage()));
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  
  
  const response = yield call(callAPILoadDuyetDaiLyNotConfirm,nn,sessionKey,page);    
  
  try{
     if (response.data.e==0) {
        yield put(total_page(response.data.total));
        if(response.data.data){
          yield put(load_duyet_dl_success(response.data.data));         
          yield put(count_dl(response.data.total));
        }       
    } else {
      message.error(response.data.e);
      yield put(load_duyet_dl_success(false));
      yield put(total_page(0));
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(load_duyet_dl_success(false));
    yield put(total_page(0));
    
  }
}
export function* loadDuyetDLNCWatcher() {  
  while (yield take(LOAD_DUYET_DL_NOT_CONFIRM)) {
    
    yield call(loadNotConf);
  }
}

export function* duyet() {
  // const date =(yield select(selectDateDetail()));
  const id = (yield select(selectID()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  

  const response = yield call(callAPIDuyetDaiLy,nn,sessionKey,id);
  try{
     if (response.data.e==0) {        
        yield put(duyet_dl_success());         
        message.success("Duyệt thành công !")  
        yield call(loadNotConf);
    } else {
      message.error(response.data.e);
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    
  }
  
}
export function* duyetDLWatcher() {  
  while (yield take(DUYET_DL)) {
    yield call(duyet);
  }
}

export function* huyduyet() {
  // const date =(yield select(selectDateDetail()));
  const id = (yield select(selectID()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  

  const response = yield call(callAPIHuyDaiLy,nn,sessionKey,id);
  try{
     if (response.data.e==0) {        
        yield put(huy_duyet_dl_success());         
        message.success("Duyệt thành công !")  
        yield call(loadNotConf);
    } else {
      message.error(response.data.e);
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    
  }
  
}
export function* huyduyetDLWatcher() {  
  while (yield take(HUY_DUYET_DL)) {
    yield call(huyduyet);
  }
}

export function* loadDLCancel() {
  // const date =(yield select(selectDateDetail()));
  const page = (yield select(selectPage()));
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  
  
  const response = yield call(callAPILoadDuyetDaiLyCancel,nn,sessionKey,page);    
  
  try{
     if (response.data.e==0) {
        yield put(total_page(response.data.total));
        if(response.data.data){
          yield put(load_duyet_dl_success(response.data.data));         
          
        }       
    } else {
      message.error(response.data.e);
      yield put(load_duyet_dl_success(false));
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(load_duyet_dl_success(false));
    
  }
}

export function* loadDuyetDLCancelWatcher() {  
  while (yield take(LOAD_DUYET_DL_CANCEL)) {
    yield call(loadDLCancel);
  }
}

export function* detailDuyetDL() {
  // const date =(yield select(selectDateDetail()));
  const id_detail = (yield select(selectIdDetail()));
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  
  
  const response = yield call(callAPIDetailDuyetDaiLy,nn,sessionKey,id_detail);    
  
  try{
     if (response.data.e==0) {
        
        if(response.data.data){
          yield put(detail_duyet_dl_success(response.data.data));         
          
        }       
    } else {
      message.error(response.data.e);
      yield put(detail_duyet_dl_success(false));
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(detail_duyet_dl_success(false));
    
  }
}
export function* detailduyetDLWatcher() {  
  while (yield take(DETAIL_DUYET_DL)) {
    yield call(detailDuyetDL);
  }
}
export function* defaultSaga() {
  const loadWatcher = yield fork(loadDuyetDLWatcher);
  const loadCWatcher = yield fork(loadDuyetDLCWatcher);
  const loadNCWatcher = yield fork(loadDuyetDLNCWatcher);
  const loadCancelWatcher = yield fork(loadDuyetDLCancelWatcher);
  const duyetWatcher = yield fork(duyetDLWatcher);
  const huyduyetWatcher = yield fork(huyduyetDLWatcher);
  const detailduyetWatcher = yield fork(detailduyetDLWatcher);
  
  if(yield take(LOCATION_CHANGE)){    
    yield cancel(loadWatcher);
    yield cancel(duyetWatcher);
    yield cancel(loadCWatcher);
    yield cancel(loadNCWatcher);    
    yield cancel(duyetWatcher);    
    yield cancel(loadCancelWatcher);    
    yield cancel(detailduyetWatcher);    
    
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
