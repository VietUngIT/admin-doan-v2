import { BACK_UP } from "./constants";
import { callAPiBackUp } from "../../utils/request";
import { back_up_success } from "./actions";
import {
  message,
} from 'antd';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

export function* backUp() {
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  

  const response = yield call(callAPiBackUp,nn,sessionKey);
  try{
     if (response.data.e==0) {
       if(response.data.data){
        yield put(back_up_success(response.data.data));   

       }
              
    } else {
      message.error(response.data.e);
      yield put(back_up_success(false));   
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(back_up_success(false));   
    
  }
}
export function* backWatcher() {  
  while (yield take(BACK_UP)) {
    yield call(backUp);
  }
}
export function* defaultSaga() {
  const back = yield fork(backWatcher);
  
  if(yield take(LOCATION_CHANGE)){    
    yield cancel(back);
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
