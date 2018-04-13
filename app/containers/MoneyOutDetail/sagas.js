import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 

  DETAIL_OUTPUT_MONEY,
 } from './constants';
 import {

   detail_ouput_money_success,
       } from './actions';
import {message,
       } from 'antd';
//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {
  selectDateDetail,
  selectToDateDetail, 
  selectUserDetail,
      } from './selectors';
import {  
  callAPIGetDetailOuputMoney,
} from 'utils/request';

export function* detailMoney() {
  const date =(yield select(selectDateDetail()));
  const todate =(yield select(selectToDateDetail()));
  const un = (yield select(selectUserDetail()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)

  const response = yield call(callAPIGetDetailOuputMoney,nn,sessionKey,date,todate,un);
  // console.log("response-detail:\n",response)
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(detail_ouput_money_success(response.data.data));
        
        }       
    } else {
      message.error(response.data.e);
      yield put(detail_ouput_money_success(false));
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    yield put(detail_ouput_money_success(false));
    
  }
  
}
export function* detailWatcher() {  
  while (yield take(DETAIL_OUTPUT_MONEY)) {
    yield call(detailMoney);
  }
}

export function* defaultSaga() { 
  const detailMoneyWatcher = yield fork(detailWatcher);
  if(yield take(LOCATION_CHANGE)){    
    yield cancel(detailMoneyWatcher);
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
