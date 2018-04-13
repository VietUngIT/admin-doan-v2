
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 

  SET_EVEN_VALUE,
  SET_FUND_VALUE,
  GET_EVEN_VALUE,
 } from './constants';
 import {
 
  getEvenValueSuccess,
  setEvenValueSuccess,
  setFundValueSuccess
       } from './actions';
import {message,
       } from 'antd';
//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {

  selectGIdEven,
  selectBEven,
  selectVEven,
      } from './selectors';
import {  

  callAPiSetEvenValue,
  callAPiSetFundValue,
  callAPiGetEvenValue,
} from 'utils/request';


export function* getEvenValue() {
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)

  const response = yield call(callAPiGetEvenValue,nn,sessionKey);
  try{
     if (response.data.e==0) {          
         
        if(response.data.data){
          yield put(getEvenValueSuccess(response.data.data));            
          // console.log("d_even:",response.data.data)  
        }       
    } else {
      message.error("Có lỗi trong quá trình xử lý !")
      yield put(getEvenValueSuccess(false));            
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(getEvenValueSuccess(false));            
    
  }
  
}
export function* getEvenValueWatcher() {
  
  while (yield take(GET_EVEN_VALUE)) {
    yield call(getEvenValue);
  }
}

export function* setEvenValue() {
  const gid =(yield select(selectGIdEven()));
  const b =(yield select(selectBEven()));
  const v =(yield select(selectVEven()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)

  const response = yield call(callAPiSetEvenValue,nn,sessionKey,gid,b,v);
  try{
     if (response.data.e==0) {          
      //  console.log("res",response.data.data)   
      if(response.data.data){
        yield put(setEvenValueSuccess(response.data.data));            
        message.success("Cập nhật thành công !")
        // yield call(getEvenValue);
      }  
    } else {
      message.error("Cập nhật không thành công !")
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
  }
  
}
export function* setEvenValueWatcher() {
  
  while (yield take(SET_EVEN_VALUE)) {
    yield call(setEvenValue);
  }
}

export function* setFundValue() {
  const gid =(yield select(selectGIdEven()));
  const b =(yield select(selectBEven()));
  const v =(yield select(selectVEven()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)

  const response = yield call(callAPiSetFundValue,nn,sessionKey,gid,b,v);
  try{
     if (response.data.e==0) {          
          
      if(response.data.data){
        yield put(setFundValueSuccess(response.data.data)); 
        // console.log("r.data:",response.data.data)
        
        message.success("Cập nhật thành công !")
        // yield call(getEvenValue);
      }  
    } else {
      message.error("Cập nhật không thành công !")
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
  }
  
}
export function* setFundValueWatcher() {
  
  while (yield take(SET_FUND_VALUE)) {
    yield call(setFundValue);
  }
}
export function* defaultSaga() {

  const getValueWatcher = yield fork(getEvenValueWatcher);
  const setEvenWatcher = yield fork(setEvenValueWatcher);
  const setFundWatcher = yield fork(setFundValueWatcher);
  
  if(yield take(LOCATION_CHANGE)){
  
    yield cancel(getValueWatcher);
    yield cancel(setEvenWatcher);
    yield cancel(setFundWatcher);
    
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
