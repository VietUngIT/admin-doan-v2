import { CHECK_SERI } from "./constants";
import { selectKey ,selectType} from "./selectors";
import { callAPiCheckSeri, callAPiCheckCard } from "../../utils/request";
import { check_seri_success } from "./actions";
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import {
  message,
} from 'antd';

export function* check() {
  const key = (yield select(selectKey()));
  const t = (yield select(selectType()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  ;
  let response; 

  if(t =="s"){
     response  = yield call(callAPiCheckSeri,nn,sessionKey,key);
  }else{
     response  = yield call(callAPiCheckCard,nn,sessionKey,key);
    
  }
  //  console.log(response.data.data)
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(check_seri_success(response.data.data));

        }
         
    } else {
      message.error(response.data.e);
      yield put(check_seri_success(false));
      
    }
  } catch(error){

    message.error('Lỗi ! Hãy thử lại !');
    yield put(check_seri_success(false));
    
  }
  
}
export function* checkWatcher() {  
  while (yield take(CHECK_SERI)) {
    yield call(check);
  }
}
export function* defaultSaga() {
  const check = yield fork(checkWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(check);
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
