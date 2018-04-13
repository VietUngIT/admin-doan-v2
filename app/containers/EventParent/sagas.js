import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import {
  message,
} from 'antd';
import { callAPiGetEventGame } from '../../utils/request';
import { GET_EVENT_PARENT } from './constants';
import {get_even_success_parent } from './actions';


export function* getEvent() {
  
  // const key =(yield select(selectKey()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  const response = yield call(callAPiGetEventGame,nn,sessionKey);
  
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(get_even_success_parent(response.data.data));
        }       
    }else{
      yield put(get_even_success_parent(false));
    } 
    
  } catch(error){
    yield put(get_even_success_parent(false));
    
  }
  
}
export function* getAllWatcher() {
  
  while (yield take(GET_EVENT_PARENT)) {
    yield call(getEvent);
    
  }
}
export function* defaultSaga() {
  const get = yield fork(getAllWatcher);

  if(yield take(LOCATION_CHANGE)){
    yield cancel(get);
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
