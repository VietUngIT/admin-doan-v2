import {
  message,
} from 'antd';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { GET_SMS_ACTIVE } from './constants';
import { selectTime } from './selectors';
import { 
  callAPiGetSMSActive ,
  callAPiSuggestUserByNN,
} from 'utils/request';
import { 
  SUGGEST_USER_BY_NN
}from '../App/constants';
import { selectKey } from '../App/selectors';
import { suggest_user_by_nickname_success } from '../App/actions';
import { get_sms_active_success } from './actions';

export function* suggestUser() {
  
  const key =(yield select(selectKey()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  const response = yield call(callAPiSuggestUserByNN,nn,sessionKey,key);
  
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(suggest_user_by_nickname_success(response.data.data));
        }       
    }else{
      yield put(suggest_user_by_nickname_success(false));
    } 
    
  } catch(error){
    yield put(suggest_user_by_nickname_success(false));
    
  }
  
}
export function* suggestWatcher() {
  
  while (yield take(SUGGEST_USER_BY_NN)) {
    yield call(suggestUser);
    
  }
}
export function* getSMS() {
  // const date =(yield select(selectDateDetail()));
  const time = (yield select(selectTime()));
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  
  
  const response = yield call(callAPiGetSMSActive,nn,sessionKey,time);    
  
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(get_sms_active_success(response.data.data));         

        }
             
    } else {
      message.error(response.data.e);
      yield put(get_sms_active_success(false));         
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(get_sms_active_success(false));         
    
  }
}
export function* getWatcher() {  
  while (yield take(GET_SMS_ACTIVE)) {
    yield call(getSMS);
  }
}
export function* defaultSaga() {
  const get = yield fork(getWatcher);
  const suggest = yield fork(suggestWatcher);

  if(yield take(LOCATION_CHANGE)){    
    yield cancel(get);
    yield cancel(suggest);
   
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
