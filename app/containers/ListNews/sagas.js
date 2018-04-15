
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_LIST_NEWS_BY_CATE_ACTION,
} from './constants';
import { 
  getListNewsByCateSuccess,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetListNewsByCate,
} from 'utils/request';
import {
  selectidCateNews,
  selectPageNews,
} from './selectors';

export function* getListNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectidCateNews());
  const page = yield select(selectPageNews());
  const response = yield call(callAPIGetListNewsByCate,userInfo.phone,userInfo.password,id,page);
  try{
    if (response.data.data.e==0) {
        yield put(getListNewsByCateSuccess(response.data.data.array,response.data.data.total));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Load danh sách tin tức lỗi !');
  }
  
}

export function* getListNewsWatcher() {
  while (yield take(GET_LIST_NEWS_BY_CATE_ACTION)) {
    yield call(getListNews);
  }
}

export function* defaultSaga() {
  const watchergetListNews = yield fork(getListNewsWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListNews);
  }
}
export default [
  defaultSaga,
];
