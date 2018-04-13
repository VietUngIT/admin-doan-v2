import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 
  GET_ALL_MESS,
  SEND_ALL_MESS,
  DEL_MESS,
  SEND_SOME_MESS,
  SUGGEST_USER_BY_NN,
 } from './constants';
 import {
  get_all_mess_success,
  send_all_mess_suceess,
  del_mess_suceess,
  send_some_mess_success,
  suggest_user_by_nickname_success,
} from './actions';
import {
        message,
} from 'antd';
import {
  selectTitle,
  selectMess,
  selectId,
  selectLu,
  selectKey,
} from './selectors';
import {  
  callAPISendAllMess,
  callAPIGetAllMess,
  callAPIDelMess,
  callAPISendSomeMess,
  callAPiSuggestUserByNN,
} from 'utils/request';

export function* getAllMes() {
  // const tt =(yield select(selectTitle()));
  // const mgs =(yield select(selectMess()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPIGetAllMess,nn,sessionKey);
  // console.log("response:\n",response)
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(get_all_mess_success(response.data.data));
        
        }       
    } else {
      message.error(response.data.e);
    yield put(get_all_mess_success(false));
    
    }
  } catch(error){
    message.error('Lỗi ! Hãy thử lại !');
    yield put(get_all_mess_success(false));
  }
  
}
export function* getAllWatcher() {
  
  while (yield take(GET_ALL_MESS)) {
    yield call(getAllMes);
  }
}

export function* sendAllMes() {
  const tt =(yield select(selectTitle()));
  const mgs =(yield select(selectMess()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPISendAllMess,nn,sessionKey,tt,mgs);
  // console.log("response-send:\n",response)
  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(send_all_mess_suceess(response.data.data[0]));
          message.success("Gửi thành công !")
          yield call(getAllMes);
        }       
    } else {
      message.error(response.data.e);
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
  }
  
}
export function* sendAllWatcher() {
  
  while (yield take(SEND_ALL_MESS)) {
    yield call(sendAllMes);
  }
}

export function* delMes() {
  const id =(yield select(selectId()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPIDelMess,nn,sessionKey,id);
  // console.log("response-del:\n",response)
  try{
     if (response.data.e==0) {
      yield put(del_mess_suceess(id));
      message.success("Xóa thành công !")
      yield call(getAllMes);
    } else {
      message.error(response.data.e);
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
  }
  
}
export function* delMesWatcher() {
  
  while (yield take(DEL_MESS)) {
    yield call(delMes);
  }
}

export function* sendSomeMess() {
  const lu =(yield select(selectLu()));
  const tt =(yield select(selectTitle()));
  const mgs =(yield select(selectMess()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPISendSomeMess,nn,sessionKey,lu,tt,mgs);
  // console.log("response-del:\n",response)
  try{
     if (response.data.e==0) {
      yield put(send_some_mess_success(response.data.data));
      message.success("Gửi thành công !")
      yield call(getAllMes);
 
      
    } else {
      message.error(response.data.e);
      yield put(send_some_mess_success(false));
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
  }
  
}
export function* sendSomeMessWatcher() {
  
  while (yield take(SEND_SOME_MESS)) {
    yield call(sendSomeMess);
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
export function* defaultSaga() {
  const allMesWatcher = yield fork(getAllWatcher);
  const sendallMesWatcher = yield fork(sendAllWatcher);
  const delWatcher = yield fork(delMesWatcher);
  const sendSomeWatcher = yield fork(sendSomeMessWatcher);
  const suggest = yield fork(suggestWatcher);

  if(yield take(LOCATION_CHANGE)){
    yield cancel(allMesWatcher);
    yield cancel(sendallMesWatcher);
    yield cancel(delWatcher);
    yield cancel(sendSomeWatcher);
    yield cancel(suggest);
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
