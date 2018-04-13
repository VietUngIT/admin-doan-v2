import { LOAD_IP, ADD_IP, DEL_IP } from "./constants";
import { callAPiGetIp, callAPiAddIp, callAPiDelIp } from "../../utils/request";
import { load_ip_success, add_ip_success, del_ip_success } from "./actions";
import { selectIP, selectReason, selectIPDel } from "./selectors";
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import {
  message,
} from 'antd';
export function* getIp() {

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  
  
  var response = yield call(callAPiGetIp,nn,sessionKey);

  try{
     if (response.data.e==0) {
        if(response.data.data){
          yield put(load_ip_success(response.data.data));
          
        }         
           
    } else {
      message.error(response.data.e);
      yield put(load_ip_success(false));
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    yield put(load_ip_success(false));
    
  }
  
}
export function* getWatcher() {  
  while (yield take(LOAD_IP)) {
    yield call(getIp);
  }
}

export function* addIp() {
  const ip = (yield select(selectIP()));
  const r = (yield select(selectReason()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  
  
  var response = yield call(callAPiAddIp,nn,sessionKey,ip,r);

  try{
        if (response.data.e==0) {
        
          yield put(add_ip_success());
          message.success("Thêm thành công !")
          yield call(getIp);
          
        }else{
          if(response.data.e==78){
            message.error("Ip đã bị chặn !")
          }
        }         
           
   
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    yield put(add_ip_success());
    
  }
  
}
export function* addWatcher() {  
  while (yield take(ADD_IP)) {
    yield call(addIp);
  }
}

export function* delIp() {
  const ip_del = (yield select(selectIPDel()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)  
  
  var response = yield call(callAPiDelIp,nn,sessionKey,ip_del);

  try{
     if (response.data.e==0) {
        yield put(del_ip_success(ip_del));
        yield call(getIp);
        message.success("Xóa thành công !")
        
    } else{
      if(response.data.e==79){
        message.error("Ip không tồn tại !")
      }
    }   
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    yield put(del_ip_success(ip_del));
  }
  
}
export function* delWatcher() {  
  while (yield take(DEL_IP)) {
    yield call(delIp);
  }
}
export function* defaultSaga() {
  const add = yield fork(addWatcher);
  const get = yield fork(getWatcher);
  const del = yield fork(delWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(add);
    yield cancel(get);
    yield cancel(del);
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
