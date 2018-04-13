import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 
  SEARCH_MONEY,
  
 } from './constants';
 import {
  search_money_ht_success,
       } from './actions';
import {
  message,
       } from 'antd';
//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {
  selectDate,
  selectToDate,
      } from './selectors';
import {  
  callAPISearchMoneyHT,
} from 'utils/request';

export function* searchMoney() {
  
  const date =(yield select(selectDate()));
  const todate =(yield select(selectToDate()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPISearchMoneyHT,nn,sessionKey,date,todate);
  try{
     if (response.data.e==0) {
  
        if(response.data.data){
          yield put(search_money_ht_success(response.data.data));
        
        }       
    } else {
      message.error(response.data.e);
    }
  } catch(error){
    yield put(search_money_ht_success(false));
    message.error('Lỗi ! Hãy thử lại !');
  }
  
}
export function* searchMoneyWatcher() {
  
  while (yield take(SEARCH_MONEY)) {
    yield call(searchMoney);
  }
}
export function* defaultSaga() {
  const searchWatcher = yield fork(searchMoneyWatcher);

  if(yield take(LOCATION_CHANGE)){
    yield cancel(searchWatcher);
   
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];