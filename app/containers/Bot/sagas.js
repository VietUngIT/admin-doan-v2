import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 
  ADD_BOT,
  ADD_BOT_MONEY,
 } from './constants';
 import {
  addBotSuccess,
  addBotMoneySuccess,

       } from './actions';
import {message,
       } from 'antd';
//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {
  selectBnBot,
  selectBuBot,
  selectMBot,
  selectBnMoney,
  selectMMoney,
      } from './selectors';
import {  
  callAPiAddBot,
  callAPiAddBotMoney,
} from 'utils/request';

export function* addBot() {
  const bu =(yield select(selectBnBot()));
  const bn =(yield select(selectBuBot()));
  const m =(yield select(selectMBot()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)

  const response = yield call(callAPiAddBot,nn,sessionKey,bu,bn,m);
  // console.log("response-setcassh:\n",response)
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(addBotSuccess(response.data.data));
          message.success("Cập nhật thành công !")
        }       
    } else {
      switch(response.data.e){
        case 1 :{
          message.error("Lỗi hệ thống !")
          yield put(addBotSuccess(false));
          
          break;
        }
        case 7 :{
          yield put(addBotSuccess(false));          
          message.error("Username đã tồn tại !")
          break;
        }
        case 3 :{
          yield put(addBotSuccess(false));          
          message.error("Nickname đã tồn tại !")
          break;
        }
        case 4 :{
          yield put(addBotSuccess(false));          
          message.error("Username không tồn tại !")
          break;
        }
      }
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
  }
  
}
export function* BotWatcher() {
  
  while (yield take(ADD_BOT)) {
    yield call(addBot);
  }
}

export function* addBotMoney() {
  const bn_m =(yield select(selectBnMoney()));
  const m_m =(yield select(selectMMoney()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)

  const response = yield call(callAPiAddBotMoney,nn,sessionKey,bn_m,m_m);
  // console.log("response-setcassh:\n",response)
  try{
     if (response.data.e==0) {
        if(response.data.data && response.data.data.length >0){
          yield put(addBotMoneySuccess(response.data.data));
          message.success("Cập nhật thành công !")
        }
    } else {
        if(response.data.e==38){
          message.error("Nickname không tồn tại !")
          yield put(addBotMoneySuccess(false));
          
        }else{
          message.error("Lỗi !");    
          yield put(addBotMoneySuccess(false));
          
        }
      
    }
  } catch(error){
    yield put(addBotMoneySuccess(false));
    message.error('Lỗi ! Hãy thử lại !');
  }
  
}
export function* botMoneyWatcher() {
  
  while (yield take(ADD_BOT_MONEY)) {
    yield call(addBotMoney);
  }
}
export function* defaultSaga() {
  const botwatcherCurent = yield fork(BotWatcher);
  const moneyCurent = yield fork(botMoneyWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(botwatcherCurent);
    yield cancel(moneyCurent);
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
