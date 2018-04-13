import { SEARCH_USER_ONLINE, GET_USER_ONLINE } from "./constants";

import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import {
  message,
} from 'antd';
import { selectUName, selectNName, selectGID, selectPage } from "./selectors";
import { callAPiGetAccountOnline, callAPiGetAccountOnlineByNick } from "../../utils/request";
import { search_user_online_success, get_user_online_success, get_total_page } from "./actions";

export function* searchUser() {
  const uname = (yield select(selectUName()));
  const nname = (yield select(selectNName()));
  const gid = (yield select(selectGID()));
  // const page = (yield select(selectPage()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  
 
  var response = yield call(callAPiGetAccountOnlineByNick,nn,sessionKey,gid);

  try{
     if (response.data.e==0) {
        // yield put(get_total_page(response.data.total));
        if(response.data.Data){
          yield put(search_user_online_success(response.data.Data));
          
        }else{
          yield put(search_user_online_success(false));
          // yield put(get_total_page(0));
          
        }         
           
    } else {
      message.error(response.data.e);
      yield put(search_user_online_success(false));
      // yield put(get_total_page(0));
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    yield put(search_user_online_success(false));
    yield put(get_total_page(0));
    
  }
  
}

export function* searchWatcher() {  
  while (yield take(SEARCH_USER_ONLINE)) {
    yield call(searchUser);
  }
}

export function* getUser() {

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  
  
  var response = yield call(callAPiGetAccountOnline,nn,sessionKey);

  try{
     if (response.data.e==0) {
        if(response.data.Data){
          yield put(get_user_online_success(response.data.Data));
          
        }         
           
    } else {
      message.error(response.data.e);
      yield put(get_user_online_success(false));
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    yield put(get_user_online_success(false));
    
  }
  
}
export function* getWatcher() {  
  while (yield take(GET_USER_ONLINE)) {
    yield call(getUser);
  }
}
export function* defaultSaga() {
  const search = yield fork(searchWatcher);
  const get = yield fork(getWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(search);
    yield cancel(get);
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
