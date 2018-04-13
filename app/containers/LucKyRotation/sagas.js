import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 
  LOAD_LUCKY_ROLATION,
  LOAD_TYLE_LUCKY_ROLATION,
  UPDATE,  
} from './constants';
import {
  loadLuckyRolationSuccess,
  loadTyLeLuckyRolationSuccess,
  updateSuccess,
} from './actions';
import {message,} from 'antd';
import {
  selectSt,
  selectEt,
  selectID,
  selectV,
} from './selectors';
import {  
  callAPiLuckyrolation,
  callAPigetListTyleLuckyrolation,
  callAPiUpdateLucky,
} from 'utils/request';

export function* loadLuckyRolation() {
  
    
    let sessionKey = localStorage.getItem('sessionkey');
    let userInfo = localStorage.getItem('userInfo');
    let length = localStorage.getItem('userInfo').length;
    let nn = userInfo.substr(1,length-2)
    const st =(yield select(selectSt()));
    const et =(yield select(selectEt()));
  
    const response = yield call(callAPiLuckyrolation,nn,sessionKey,st,et);
    try{
       if (response.data.e==0) {
          if(response.data.data){
            yield put(loadLuckyRolationSuccess(response.data.data));          
          }else{
            yield put(loadLuckyRolationSuccess([]));
          }       
      } else {
        yield put(loadLuckyRolationSuccess([]));
      }
    } catch(error){
      yield put(loadLuckyRolationSuccess([]));
      message.error('Lỗi ! Hãy thử lại !');
    }
  }
  
  export function* loadLuckyRolationWatcher() {
    
    while (yield take(LOAD_LUCKY_ROLATION)) {
      yield call(loadLuckyRolation);
    }
  }
  export function* getListTyLeLuckyRolation() {
      
      let sessionKey = localStorage.getItem('sessionkey');
      let userInfo = localStorage.getItem('userInfo');
      let length = localStorage.getItem('userInfo').length;
      let nn = userInfo.substr(1,length-2)
    
      const response = yield call(callAPigetListTyleLuckyrolation,nn,sessionKey);
      try{
         if (response.data.e==0) {
            if(response.data.data){
              yield put(loadTyLeLuckyRolationSuccess(response.data.data));          
            }else{
              yield put(loadTyLeLuckyRolationSuccess([]));
            }       
        } else {
          yield put(loadTyLeLuckyRolationSuccess([]));
        }
      } catch(error){
        yield put(loadTyLeLuckyRolationSuccess([]));
        message.error('Lỗi ! Hãy thử lại !');
      }
    }
    
    export function* getListTyLeLuckyRolationWatcher() {
      
      while (yield take(LOAD_TYLE_LUCKY_ROLATION)) {
        yield call(getListTyLeLuckyRolation);
      }
    }

    export function* updateLucky() {
      const id = (yield select(selectID()));
      const v = (yield select(selectV()));

      let sessionKey = localStorage.getItem('sessionkey');
      let userInfo = localStorage.getItem('userInfo');
      let length = localStorage.getItem('userInfo').length;
      let nn = userInfo.substr(1,length-2)
    
      const response = yield call(callAPiUpdateLucky,nn,sessionKey,id,v);
      try{
         if (response.data.e==0) {
            if(response.data.data){
              yield put(updateSuccess(response.data.data));     
              message.success('Update thành công !');
        
            }else{
              message.error('Update thất bại!');
        
            }       
        } else {
          //yield put(updateSuccess([]));
        }
      } catch(error){
        //yield put(updateSuccess([]));
        message.error('Lỗi ! Hãy thử lại !');
      }
    }
    export function* updateWatcher() {
      
      while (yield take(UPDATE)) {
        yield call(updateLucky);
      }
    }

  export function* defaultSaga() {
    const WatcherLoadLuckyLocation = yield fork(loadLuckyRolationWatcher);
    const WatchergetListTyLeLuckyRolation = yield fork(getListTyLeLuckyRolationWatcher);
    const update = yield fork(updateWatcher);
    if(yield take(LOCATION_CHANGE)){
      yield cancel(WatcherLoadLuckyLocation);
      yield cancel(WatchergetListTyLeLuckyRolation);
      yield cancel(update);
    }
  }

// All sagas to be loaded
export default [
  defaultSaga,
];
