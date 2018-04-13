import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { SET_BET_SUM } from "./constants";
import { selectBet } from "./selectors";
import { callAPiSetSumTX } from "../../utils/request";
import { set_bet_sum_success } from "./actions";
import {
  message,
       } from 'antd';
// import { take, call, put, select } from 'redux-saga/effects';
export function* setBetSum() {
  
  const bet =(yield select(selectBet()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPiSetSumTX,nn,sessionKey,bet);
  try{
     if (response.data.e==0) {
  
      yield put(set_bet_sum_success());
      message.success("Cập nhật thành công !")
               
    } else {
      message.error(response.data.e);
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
  }
  
}
export function* setSumWatcher() {
  
  while (yield take(SET_BET_SUM)) {
    yield call(setBetSum);
  }
}
export function* defaultSaga() {
  const setSum = yield fork(setSumWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(setSum);
   
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
