// import { take, call, put, select } from 'redux-saga/effects';

import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 
  GET_CASH,
  SET_CASH,
 } from './constants';
 import {
  getCashSuccess,
  setCashSuccess,

       } from './actions';
import {message,
       } from 'antd';
//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {
  selectM,
  selectMt,
      } from './selectors';
import {  
  callAPiGetMaxCashout,
  callAPiSetMaxCashout,
} from 'utils/request';


export function* getCash() {

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)

  const response = yield call(callAPiGetMaxCashout,nn,sessionKey);
  // console.log("response-getcassh:\n",response)
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(getCashSuccess(response.data.data));
        
        }       
    } else {
      message.error(response.data.e);
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
  }
  
}
export function* getCashWatcher() {
  
  while (yield take(GET_CASH)) {
    yield call(getCash);
  }
}

export function* setCash() {
  const m =(yield select(selectM()));
  const mt =(yield select(selectMt()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)

  const response = yield call(callAPiSetMaxCashout,nn,sessionKey,m,mt);
  // console.log("response-setcassh:\n",response)
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(setCashSuccess(response.data.data));
          message.success("Cập nhật thành công !")
        }       
    } else {
      if(response.data.e ==8){
        message.error("Không đủ quyền cập nhật !");
        
      }else{
        message.error(response.data.e);    
      }
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
  }
  
}
export function* setCashWatcher() {
  
  while (yield take(SET_CASH)) {
    yield call(setCash);
  }
}
// Individual exports for testing
export function* defaultSaga() {
  const getWatcher = yield fork(getCashWatcher);
  const setWatcher = yield fork(setCashWatcher);

  if(yield take(LOCATION_CHANGE)){
    yield cancel(getWatcher);
    yield cancel(setWatcher);

  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
