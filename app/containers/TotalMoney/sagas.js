import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 
  TOTAL_MONEY,
  INPUT_MONEY,
  OUTPUT_MONEY,
  SUGGEST_USER_BY_NN,
  GET_MONEY_BY_HDH,

 } from './constants';
 import {
   total_money_success,
   input_money_success,
   output_money_success,
   suggest_user_by_nickname_success,
   get_money_by_hdh_success,

       } from './actions';
import {message,
       } from 'antd';
//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {
  selectDateMoney,
  selectToDateMoney,
  selectToDateOutput,
  selectDateInput,
  selectToDateInput,
  selectDateOutput,
  selectType,
  selectUser,
  selectUserAPI,
  selectUserOut,
  selectKey,
  selectST,
  selectET,

      } from './selectors';
import {  
  callAPIGetTotalMoney,
  callAPIGetInputMoney,
  callAPIGetOuputMoney,
  callAPiSuggestUserByNN,
} from 'utils/request';
import { callAPiMoneyInHDH } from '../../utils/request';

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


export function* getTotalMoney() {
  const date =(yield select(selectDateMoney()));
  const todate =(yield select(selectToDateMoney()));
  const un = (yield select(selectUser()));
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPIGetTotalMoney,nn,sessionKey,date,todate,un);
  // console.log(response)
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(total_money_success(response.data.data));
        
        }       
    } else {
      message.error(response.data.e);
      yield put(total_money_success(false));
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    yield put(total_money_success(false));
    
  }
  
}
export function* totalWatcher() {
  while (yield take(TOTAL_MONEY)) {
    
    yield call(getTotalMoney);
  }
}


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

export function* outputMoney() {
  const date =(yield select(selectDateOutput()));
  const todate =(yield select(selectToDateOutput()));
  const un = (yield select(selectUserOut()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPIGetOuputMoney,nn,sessionKey,date,todate,un);
  // console.log("response-out:\n",response)
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(output_money_success(response.data.data));
        
        }       
    } else {
      message.error(response.data.e);
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
  }
  
}
export function* outputWatcher() {
  
  while (yield take(OUTPUT_MONEY)) {
    yield call(outputMoney);
  }
}

export function* getMoneyHDH() {
  
  const st = (yield select(selectST()));
  const et = (yield select(selectET()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPiMoneyInHDH,nn,sessionKey,st,et);
  // console.log("response-out:\n",response)
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(get_money_by_hdh_success(response.data.data));
        
        }       
    } else {
      message.error(response.data.e);
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
  }
  
}
export function* get_by_hdhWatcher() {
  
  while (yield take(GET_MONEY_BY_HDH)) {
    yield call(getMoneyHDH);
  }
}

export function* defaultSaga() {
  const totalMoneyWatcher = yield fork(totalWatcher);
  const inputMoneyWatcher = yield fork(inputWatcher);
  const outputMoneyWatcher = yield fork(outputWatcher);
  const suggest = yield fork(suggestWatcher);
  const get_by_hdh = yield fork(get_by_hdhWatcher);

  if(yield take(LOCATION_CHANGE)){
    yield cancel(totalMoneyWatcher);
    yield cancel(inputMoneyWatcher);
    yield cancel(outputMoneyWatcher);
    yield cancel(suggest);
    yield cancel(get_by_hdh);

  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
