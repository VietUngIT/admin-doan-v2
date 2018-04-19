import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_LIST_MP_ACTION,
  DEL_LIST_MP_ACTION,
} from './constants';
import { 
  getListMPSuccess,
  deleteNewsMPSuccess,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetListNewsMP,
  callAPIDellNewsMP,
} from 'utils/request';
import {
  selectIdCateGetListMP,
  selectPageGetListMP,
  selectIdNewsMPDel,
} from './selectors';

export function* deleteNewsMP() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdNewsMPDel());
  const response = yield call(callAPIDellNewsMP,userInfo.phone,userInfo.password,id);
  try{
    if (response.data.data.e==0) {
        yield put(deleteNewsMPSuccess(id));
        message.success('Xóa tin tức thành công !');
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Xóa tin tức lỗi !');
  }
  
}
export function* deleteNewsMPWatcher() {
  while (yield take(DEL_LIST_MP_ACTION)) {
    yield call(deleteNewsMP);
  }
}
export function* getListNewsMP() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdCateGetListMP());
  const page = yield select(selectPageGetListMP());
  const response = yield call(callAPIGetListNewsMP,userInfo.phone,userInfo.password,id,page);
  try{
    if (response.data.data.e==0) {
      yield put(getListMPSuccess(response.data.data.array,response.data.data.total));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
    message.error(response.data.data.e);
    message.error('Load danh sách tin tức lỗi !');
  }
  
}
export function* getListNewsMPWatcher() {
  while (yield take(GET_LIST_MP_ACTION)) {
    yield call(getListNewsMP);
  }
}

export function* defaultSaga() {
  const watchergetListNewsMP = yield fork(getListNewsMPWatcher);
  const watcherdeleteNewsMP = yield fork(deleteNewsMPWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListNewsMP);
    yield cancel(watcherdeleteNewsMP);
  }
}
export default [
  defaultSaga,
];
