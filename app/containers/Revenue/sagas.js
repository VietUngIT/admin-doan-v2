import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 
  GET_REVENUE,
  SUGGEST_USER_BY_NN,
  GET_REVENUE_BY_USER,
 } from './constants';
 import {
  get_revenue_success,
  suggest_user_by_nickname_success,
  get_revenue_by_user_success,
} from './actions';
import {
        message,
} from 'antd';
//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {
  selectDate,
  selectToDate,
  selectKey,
  selectNick,
} from './selectors';
import {  
  callAPIGetRevenue,
  callAPiSuggestUserByNN,
} from 'utils/request';
import { callAPIGetRevenueByUser } from '../../utils/request';

export function* getRevenue() {
  const date =(yield select(selectDate()));
  const todate =(yield select(selectToDate()));
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPIGetRevenue,nn,sessionKey,date,todate);
  // console.log("response:\n",response)
  try{
     if (response.data.e==0) {
       
        if(response.data.Data){
          yield put(get_revenue_success(response.data.Data));
        
        }       
    } else {
      message.error(response.data.e);
      yield put(get_revenue_success(false));
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    yield put(get_revenue_success(false));
    
  }
  
}
export function* revenueWatcher() {
  
  while (yield take(GET_REVENUE)) {
    yield call(getRevenue);
  }
}
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


export function* getByUser() {
  const date =(yield select(selectDate()));
  const todate =(yield select(selectToDate()));
  const nick =(yield select(selectNick()));
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPIGetRevenueByUser,nn,sessionKey,nick,date,todate);
  // console.log("response:\n",response)
  try{
     if (response.data.e==0) {
       console.log("response.revenue",response.data.data)
        if(response.data.data){
          yield put(get_revenue_by_user_success(response.data.data));
        
        }      
    } else {
      message.error("Lỗi!",response.data.e);
      yield put(get_revenue_by_user_success(false));
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    yield put(get_revenue_by_user_success(false));
    
  }
  
}
export function* searchWatcher() {
  
  while (yield take(GET_REVENUE_BY_USER)) {
    yield call(getByUser);
    
  }
}
export function* defaultSaga() {
  const reWatcher = yield fork(revenueWatcher);
  const suggest = yield fork(suggestWatcher);
  const search = yield fork(searchWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(reWatcher);
    yield cancel(suggest);
    yield cancel(search);
    
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
