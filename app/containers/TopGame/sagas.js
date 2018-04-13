import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 
  TOP_WIN,
 } from './constants';
 import {
  top_win_success,
       } from './actions';
import {message,
       } from 'antd';
//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {
  selectFromDate,
  selectToDate,
  selectGameName,
  selectUser,
      } from './selectors';
import {  
  callAPITopWin,
} from 'utils/request';


export function* topWin() {
  const date =(yield select(selectFromDate()));
  const todate =(yield select(selectToDate()));
  const gn =(yield select(selectGameName()));
  const un =(yield select(selectUser()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPITopWin,nn,sessionKey,gn,date,todate);
  // console.log("response-top:\n",response)
  
  try{
     if (response.data.e==0) {
        if(response.data.User && response.data.Bot){
          yield put(top_win_success(response.data.User,response.data.Bot));
        
        }       
    } else {
      message.error(response.data.e);
      yield put(top_win_success(false,false));
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    yield put(top_win_success(false,false));
    
  }
  
}
export function* topWinWatcher() {
  
  while (yield take(TOP_WIN)) {
    yield call(topWin);
  }
}


export function* defaultSaga() {
  const winWatcher = yield fork(topWinWatcher);

  if(yield take(LOCATION_CHANGE)){
    yield cancel(winWatcher);

  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
