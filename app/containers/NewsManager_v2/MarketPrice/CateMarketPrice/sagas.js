import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_CATE_ACTION,
} from './constants';
import { 
  getListCateMPSuccess,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetListCateMP,
} from 'utils/request';
import {
} from './selectors';

export function* getListCateMP() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const response = yield call(callAPIGetListCateMP,userInfo.phone,userInfo.password);
  try{
    if (response.data.data.e==0) {
        yield put(getListCateMPSuccess(response.data.data.array));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lấy thông tin lỗi !');
  }
  
}
export function* getListCateMPWatcher() {
  while (yield take(GET_CATE_ACTION)) {
    yield call(getListCateMP);
  }
}

export function* defaultSaga() {
  const watchergetListCateMP = yield fork(getListCateMPWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListCateMP);
  }
}
export default [
  defaultSaga,
];
