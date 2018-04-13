import { LOCATION_CHANGE, push } from 'react-router-redux';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import {
  message,
} from 'antd';
import { CHECK_IP, COUNT_IP } from './constants';
import { selectIp, selectNick } from './selectors';
import { check_ip_success, count_ip_success } from './actions';
import { callAPiCheckIp, callAPiCountIp,callAPiSuggestUserByNN } from '../../utils/request';
import { suggest_user_by_nickname_success } from '../App/actions';
import { selectKey } from '../App/selectors';
import { SUGGEST_USER_BY_NN } from '../App/constants';

export function* check() {
  const nick = (yield select(selectNick()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  ;
  let response = yield call(callAPiCheckIp,nn,sessionKey,nick);; 

  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(check_ip_success(response.data.data));

        }
         
    } else {
      message.error(response.data.e);
      yield put(check_ip_success(false));
      
    }
  } catch(error){

    message.error('Lỗi ! Hãy thử lại !');
    yield put(check_ip_success(false));
    
  }
  
}
export function* checkWatcher() {  
  while (yield take(CHECK_IP)) {
    yield call(check);
  }
}
export function* count() {
  const ip = (yield select(selectIp()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  ;
  let response = yield call(callAPiCountIp,nn,sessionKey,ip);; 

  try{
     if (response.data.e==0) {
      //  console.log(response.data.count)
        if(response.data.data){
          yield put(count_ip_success(response.data.data));

        }
         
    } else {
      message.error(response.data.e);
      yield put(count_ip_success(false));
      
    }
  } catch(error){

    message.error('Lỗi ! Hãy thử lại !');
    yield put(count_ip_success(false));
    
  }
  
}
export function* countWatcher() {  
  while (yield take(COUNT_IP)) {
    yield call(count);
  }
}
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

export function* defaultSaga() {
  const check = yield fork(checkWatcher);
  const count = yield fork(countWatcher);
  const suggest = yield fork(suggestWatcher);

  if(yield take(LOCATION_CHANGE)){
    yield cancel(check);
    yield cancel(count);
    yield cancel(suggest);
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
