import { COUNT_HDH } from "./constants";
import { selectSt, selectEt, selectT, selectPage } from "./selectors";
import { callAPiCountHDH } from "../../utils/request";
import { count_hdh_success, total_page } from "./actions";
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import {
  message,
} from 'antd';

export function* count() {
  const st = (yield select(selectSt()));
  const et = (yield select(selectEt()));
  const t = (yield select(selectT()));
  const page = (yield select(selectPage()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  
  const response = yield call(callAPiCountHDH,nn,sessionKey,t,st,et,page);

  try{
     if (response.data.e==0) {
        // yield put(total_page(response.data.total));
       
        if(response.data.data){
          yield put(count_hdh_success(response.data.data));
          
        }         
           
    } else {
      message.error(response.data.e);
      yield put(count_hdh_success(false));
      // yield put(total_page(0));
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    yield put(count_hdh_success(false));
    // yield put(total_page(0));
    
  }
  
}
export function* countWatcher() {  
  while (yield take(COUNT_HDH)) {
    yield call(count);
  }
}
export function* defaultSaga() {
  const countHDH = yield fork(countWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(countHDH);
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
