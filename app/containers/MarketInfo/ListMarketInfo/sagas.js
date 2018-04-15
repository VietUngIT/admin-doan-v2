import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_LIST_NEWS_MK_BY_CATE_ACTION,
} from './constants';
import { 
  getListNewsByCateMKSuccess,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetListNewsMKByCate,
} from 'utils/request';
import {
  selectidCateNewsMK,
  selectPageNewsMK,
} from './selectors';

export function* getListNewsMK() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectidCateNewsMK());
  const page = yield select(selectPageNewsMK());
  const response = yield call(callAPIGetListNewsMKByCate,userInfo.phone,userInfo.password,id,page);
  try{
    if (response.data.data.e==0) {
        yield put(getListNewsByCateMKSuccess(response.data.data.array,response.data.data.total));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Load danh sách tin tức lỗi !');
  }
  
}

export function* getListNewsMKWatcher() {
  while (yield take(GET_LIST_NEWS_MK_BY_CATE_ACTION)) {
    yield call(getListNewsMK);
  }
}
export function* defaultSaga() {
  const watchergetListNewsMK = yield fork(getListNewsMKWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListNewsMK);
  }
}

export default [
  defaultSaga,
];
