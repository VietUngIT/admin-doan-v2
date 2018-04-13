import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { SEARCH_CURRENT,
         SEARCH_HISTORY,
         TOTAL_MONEY,
 } from './constants';
import { search_current_success,
         search_history_success,
         total_money_success,
       } from './actions';
import {message,
       } from 'antd';
//import {callAPILogin,callAPIResetPassStep1} from 'utils/request';
import {selectETime,
        selectSTime,
        selectCcuLog,
        selectDateMoney,
      } from './selectors';
import {callAPISearchCurentCcu,
        callAPISearchHistoryCcu,
        callAPIGetTotalMoney,
} from 'utils/request';


export function* searchCurrent() {
  // const et = yield select(selectETime());
  // const st =(yield select(selectSTime()));
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  const response = yield call(callAPISearchCurentCcu,nn,sessionKey);
  // console.log("r--:\n",response)
  try{
     if (response.data.e==0) { 
       if(response.data.data){
          yield put(search_current_success(response.data.data));
        
       }    
        
    } else {
      message.error(response.data.e);
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
  }
  
}

export function* currentWatcher() {
  while (yield take(SEARCH_CURRENT)) {
    
    yield call(searchCurrent);
  }
}

//--------------
export function* searchHistory() {
  const st =(yield select(selectSTime()));
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  var start = new Date().getTime();
  const response = yield call(callAPISearchHistoryCcu,nn,sessionKey,start);
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(search_history_success(response.data.data));
        
        }       
    } else {
      
        message.error(response.data.e);
        
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
  }
  
}

export function* historyWatcher() {
  while (yield take(SEARCH_HISTORY)) {
    
    yield call(searchHistory);
  }
}

//-----------


//--------------
export function* defaultSaga() {
  const watcherCurent = yield fork(currentWatcher);
  const historyCurent = yield fork(historyWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watcherCurent);
    yield cancel(historyCurent);
  }
}

export default [
  defaultSaga,
];
