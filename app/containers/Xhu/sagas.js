import {
  message,
} from 'antd';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { LOAD_LIST, ADD_XHU, DEL_XHU } from './constants';
import { callAPiLoadListXHu, callAPiAddXHu, callAPiDelXHu } from '../../utils/request';
import { load_list_success, add_xhu_success, del_xhu_success } from './actions';
import { selectID, selectST, selectHave100, selectCHu100, selectXHu100, selectHave1000, selectCHu1000, selectXHu1000, selectHave10000, selectCHu10000, selectXHu10000, selectGID, selectActive, selectNE } from './selectors';

export function* delXHu() {
  const ID = yield(select(selectID()));
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPiDelXHu,nn,sessionKey,ID);
  // console.log("response-out:\n",response)
  try{
     if (response.data.e==0) {
        yield put(del_xhu_success());
        
    } else {
      message.error(response.data.e);
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    
  }
  
}
export function* delWatcher() {
  
  while (yield take(DEL_XHU)) {
    yield call(delXHu);
  }
}
export function* addXHu() {
  const st = yield(select(selectST()));
  const gid = yield(select(selectGID()));
  const ne = yield(select(selectNE()));

  const active = yield(select(selectActive()));
  const cHu100 = yield(select(selectCHu100()));
  const xHu100 = yield(select(selectXHu100()));

  const cHu1000 = yield(select(selectCHu1000()));
  const xHu1000 = yield(select(selectXHu1000()));

  const cHu10000 = yield(select(selectCHu10000()));
  const xHu10000 = yield(select(selectXHu10000()));

  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPiAddXHu,nn,sessionKey,ne,gid,st,cHu100,cHu1000,cHu10000,xHu100,xHu1000,xHu10000,active);
  // console.log("response-out:\n",response)
  try{
     if (response.data.e==0) {
      yield put(add_xhu_success());
      message.success("Kích hoạt sự kiện thành công !")
      yield call(loadList);
        
    } else {
      if(response.data.e==88){
        message.error("Ngày được thêm đã có sự kiện !");

      }else{
        message.error(response.data.e);

      }
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    
  }
  
}
export function* addWatcher() {
  
  while (yield take(ADD_XHU)) {
    yield call(addXHu);
  }
}
export function* loadList() {
  // const st_list = yield(select(selectSTList()));
  
  let sessionKey = localStorage.getItem('sessionkey');
  let userInfo = localStorage.getItem('userInfo');
  let length = localStorage.getItem('userInfo').length;
  let nn = userInfo.substr(1,length-2)
  
  const response = yield call(callAPiLoadListXHu,nn,sessionKey);
  // console.log("response-out:\n",response)
  try{
     if (response.data.e==0) {
        if(response.data.info){
          yield put(load_list_success(response.data.info));
        
        }       
    } else {
      message.error(response.data.e);
      yield put(load_list_success(false));
      
    }
  } catch(error){
    //yield put(showNotify(503,'error','error'));
    message.error('Lỗi ! Hãy thử lại !');
    yield put(load_list_success(false));
    
  }
  
}
export function* loadWatcher() {
  
  while (yield take(LOAD_LIST)) {
    yield call(loadList);
  }
}
export function* defaultSaga() {
  const load = yield fork(loadWatcher);
  const add = yield fork(addWatcher);
  const del = yield fork(delWatcher);

  if(yield take(LOCATION_CHANGE)){
    yield cancel(load);
    yield cancel(add);
    yield cancel(del);

  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
