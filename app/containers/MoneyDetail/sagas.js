import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 
  INPUT_MONEY,
 } from './constants';
 import {
   input_money_success,
       } from './actions';
import {message,
       } from 'antd';
//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {
  selectDateInput,
  selectToDateInput,
  selectType,
  selectUserAPI,
      } from './selectors';
import {  
  callAPIGetInputMoney,
} from 'utils/request';

export function* inputMoney() {
  const date =(yield select(selectDateInput()));
  const todate =(yield select(selectToDateInput()));
  const un = (yield select(selectUserAPI()));
  
  const type =(yield select(selectType()));
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPIGetInputMoney,nn,sessionKey,date,todate,type,un);
  // console.log("MONEY:",response)
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(input_money_success(response.data.data));
        
        }       
    } else {
      message.error(response.data.e);
      yield put(input_money_success(false));
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    yield put(input_money_success(false));
    
  }
  
}
export function* inputWatcher() {
  
  while (yield take(INPUT_MONEY)) {
    yield call(inputMoney);
  }
}

export function* defaultSaga() {
  const inputMoneyWatcher = yield fork(inputWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(inputMoneyWatcher);
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
