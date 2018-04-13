import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 
  SLOT_BY_NN,
  
 } from './constants';
 import {
  search_slot_game_by_nn_success
       } from './actions';
import {
  message,
       } from 'antd';
//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {
  selectDate,
  selectToDate,
  selectGID,  
  selectUser,
  
      } from './selectors';
import {  
  callAPIDetailSlotByNickname,
  callAPiSuggestUserByNN,
} from 'utils/request';
import { 
  SUGGEST_USER_BY_NN
}from '../App/constants';
import { selectKey } from '../App/selectors';
import { suggest_user_by_nickname_success } from '../App/actions';

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
export function* detailSlotByNN() {
  
  const date =(yield select(selectDate()));
  const todate =(yield select(selectToDate()));
  const gid = (yield select(selectGID()));
  const un = (yield select(selectUser()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPIDetailSlotByNickname,nn,sessionKey,date,todate,un,gid);
  // console.log("response-s-nn:\n",response)
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(search_slot_game_by_nn_success(response.data.data));
        
        }       
    } else {
      message.error(response.data.e);
    }
  } catch(error){
    yield put(search_slot_game_by_nn_success(false));
    message.error('Lỗi ! Hãy thử lại !');
  }
  
}
export function* slotByNNWatcher() {
  
  while (yield take(SLOT_BY_NN)) {
    yield call(detailSlotByNN);
  }
}
export function* defaultSaga() {
  const slotWatcher = yield fork(slotByNNWatcher);
  const suggest = yield fork(suggestWatcher);

  if(yield take(LOCATION_CHANGE)){
    yield cancel(slotWatcher);
    yield cancel(suggest);
   
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];