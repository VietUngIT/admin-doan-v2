import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 
  SLOT_BY_ID,
  
 } from './constants';
 import {
  search_slot_game_by_id_success
       } from './actions';
import {
  message,
       } from 'antd';
//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {
  selectDate,
  selectToDate,
  selectID,
      } from './selectors';
import {  
  callAPIDetailSlotByID,
} from 'utils/request';

export function* detailSlotByID() {
  const date =(yield select(selectDate()));
  const todate =(yield select(selectToDate()));
  const id = (yield select(selectID()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = sessionStorage.getItem('userInfo');
  let length = sessionStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)

  const response = yield call(callAPIDetailSlotByID,nn,sessionKey,id);
  console.log("response-s-id:\n",response)
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(search_slot_game_by_id_success(response.data.data));
        
        }       
    } else {
      message.error(response.data.e);
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi !');
  }
  
}
export function* slotByIdWatcher() {
  
  while (yield take(SLOT_BY_ID)) {
    yield call(detailSlotByID);
  }
}
export function* defaultSaga() {
  const slotWatcher = yield fork(slotByIdWatcher);

  if(yield take(LOCATION_CHANGE)){
    yield cancel(slotWatcher);
   
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
