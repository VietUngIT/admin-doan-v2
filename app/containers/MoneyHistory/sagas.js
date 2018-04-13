import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 
  
  GET_HIS_GAME,
 } from './constants';
 import {
 
  getHisGameSuccess,
       } from './actions';
import {
  message,
       } from 'antd';
//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {
  selectGnGame,
  selectSt,
  selectEt,
  selectUnGame,
      } from './selectors';
import {  

  callAPIGetHisGame,
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

export function* getHisGame() {
  const un =(yield select(selectUnGame()));
  const st =(yield select(selectSt()));
  const et =(yield select(selectEt()));
  const gn = (yield select(selectGnGame()));
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
    
  const response = yield call(callAPIGetHisGame,nn,sessionKey,gn,un,st,et);
    
    try{
       if (response.data.e==0) {
          if(response.data.data){
            yield put(getHisGameSuccess(response.data.data));
          }       
      } 
      if(response.data.e==1){
        message.error("Lỗi hệ thống !");
        yield put(getHisGameSuccess(false));
        
      }
     
    } catch(error){
      message.error('Lỗi ! Hãy thử lại !');
      yield put(getHisGameSuccess(false));
      
    }
    
  }
export function* getHisGameWatcher() {
  
  while (yield take(GET_HIS_GAME)) {
    yield call(getHisGame);
  }
}
export function* defaultSaga() {
  const hisGameWatcher = yield fork(getHisGameWatcher);
  const suggest = yield fork(suggestWatcher);

  if(yield take(LOCATION_CHANGE)){
    
    yield cancel(hisGameWatcher);
    yield cancel(suggest);
    
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
