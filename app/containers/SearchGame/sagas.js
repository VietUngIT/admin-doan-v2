import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 
  SEARCH_BY_ID,
  SEARCH_BY_USER,
  SEARCH_BY_ID_NAME,
 } from './constants';
 
 import {
  search_by_id_success,
  search_by_user_success,
  search_by_id_name_success,
       } from './actions';
import {message,
       } from 'antd';
//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {
  selectId,
  selectGnId,
  selectGnName,
  selectIdName,
  selectUser,
  selectGnUn,
  selectDate,
  selectToDate,
      } from './selectors';
import {  
  callAPISearchGameById,
  callAPISearchGameByUser,
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
export function* searchById() {
  const id =(yield select(selectId()));
  const gn =(yield select(selectGnId()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPISearchGameById,nn,sessionKey,id,gn);
  // console.log("r-id",response)
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(search_by_id_success(response.data.data));
        
        }       
    } else {
      message.error(response.data.e);
      yield put(search_by_id_success(false));
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    yield put(search_by_id_success(false));
    
  }
  
}
export function* searchIdWatcher() {
  
  while (yield take(SEARCH_BY_ID)) {
    yield call(searchById);
  }
}
export function* searchByIdName() {
  const id =(yield select(selectIdName()));
  const gn =(yield select(selectGnName()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPISearchGameById,nn,sessionKey,id,gn);
  // console.log("r-id",response)
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(search_by_id_name_success(response.data.data));
        
        }       
    } else {
      message.error(response.data.e);
      yield put(search_by_id_name_success(false));
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    yield put(search_by_id_name_success(false));
    
  }
  
}
export function* searchIdNameWatcher() {
  
  while (yield take(SEARCH_BY_ID_NAME)) {
    yield call(searchByIdName);
  }
}
export function* searchByUser() {
  const un =(yield select(selectUser()));
  const gn =(yield select(selectGnUn()));
  const date =(yield select(selectDate()));
  const todate =(yield select(selectToDate()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPISearchGameByUser,nn,sessionKey,un,gn,date,todate);
  // console.log("r-un",response)
  
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(search_by_user_success(response.data.data));
        
        }       
    } else {
      message.error(response.data.e);
      yield put(search_by_user_success(false));
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    yield put(search_by_user_success(false));
    
  }
  
}
export function* searchUnWatcher() {
  
  while (yield take(SEARCH_BY_USER)) {
    yield call(searchByUser);
  }
}
export function* defaultSaga() {
  const idWatcher = yield fork(searchIdWatcher);
  const idNameWatcher = yield fork(searchIdNameWatcher);
  const unWatcher = yield fork(searchUnWatcher);
  const suggest = yield fork(suggestWatcher);

  if(yield take(LOCATION_CHANGE)){
    yield cancel(unWatcher);
    yield cancel(idNameWatcher);
    yield cancel(unWatcher);
    yield cancel(suggest);
    
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
