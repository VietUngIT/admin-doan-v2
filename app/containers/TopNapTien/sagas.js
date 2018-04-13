import { GET_TOP_MONEY } from "./constants";
import { selectSt, selectEt } from "./selectors";
import { callAPiGetTopMoney } from "../../utils/request";
import { get_top_money_success } from "./actions";
import {
  message,
} from 'antd';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

export function* loadTop() {
  // const date =(yield select(selectDateDetail()));
  const st = (yield select(selectSt()));
  const et = (yield select(selectEt()));
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  
  
  const response = yield call(callAPiGetTopMoney,nn,sessionKey,st,et);    
  
  try{
     if (response.data.e==0) {
        if(response.data.User){
          yield put(get_top_money_success(response.data.User));         

        }
             
    } else {
      message.error(response.data.e);
      yield put(get_top_money_success(false));         
      
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(get_top_money_success(false));         
    
  }
}
export function* loadTopWatcher() {  
  while (yield take(GET_TOP_MONEY)) {
    yield call(loadTop);
  }
}
export function* defaultSaga() {
  const loadWatcher = yield fork(loadTopWatcher);

  if(yield take(LOCATION_CHANGE)){    
    yield cancel(loadWatcher);
   
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
