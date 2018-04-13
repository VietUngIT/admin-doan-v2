import { COUNT_DAU, COUNT_DAU_NOW } from "./constants";
import { selectSt, selectEt, selectPage, selectPageNow } from "./selectors";
import { callAPiCountDAU, callAPiCountDAUNow } from "../../utils/request";
import { count_dau_success, count_dpu_success, total_dpu ,total_dau, count_dau_now_success, count_dpu_now_success, total_dpu_now, total_dau_now} from "./actions";
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import {
  message,
} from 'antd';

export function* count() {
  const st = (yield select(selectSt()));
  const et = (yield select(selectEt()));
  const page = (yield select(selectPage()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  
  
  const response = yield call(callAPiCountDAU,nn,sessionKey,st,et,page);
  try{
     if (response.data.e==0) {
        
          yield put(count_dau_success(response.data.dau));
          yield put(count_dpu_success(response.data.dpu));
          yield put(total_dpu(response.data.totaldpu));
          yield put(total_dau(response.data.totaldau));
          
               
           
    } else {
      message.error(response.data.e);
      yield put(count_dau_success(false));
      
    }
  } catch(error){

    message.error('Lỗi ! Hãy thử lại !');
    yield put(count_dau_success(false));
    
  }
  
}
export function* countWatcher() {  
  while (yield take(COUNT_DAU)) {
    yield call(count);
  }
}


export function* countNow() {

  const pageNow = (yield select(selectPageNow()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  
  
  const response = yield call(callAPiCountDAUNow,nn,sessionKey,pageNow);
  try{
     if (response.data.e==0) {
        
          yield put(count_dau_now_success(response.data.dau));
          yield put(count_dpu_now_success(response.data.dpu));
          yield put(total_dpu_now(response.data.totaldpu));
          yield put(total_dau_now(response.data.totaldau));
          
               
           
    } else {
      message.error(response.data.e);
      yield put(count_dau_now_success(false));
      yield put(count_dpu_now_success(false));
      
    }
  } catch(error){

    message.error('Lỗi ! Hãy thử lại !');
    yield put(count_dau_now_success(false));
    yield put(count_dpu_now_success(false));
    
  }
}
export function* countNowWatcher() {  
  while (yield take(COUNT_DAU_NOW)) {
    yield call(countNow);
  }
}
export function* defaultSaga() {
  const countHDH = yield fork(countWatcher);
  const countNow = yield fork(countNowWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(countHDH);
    yield cancel(countNow);
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
