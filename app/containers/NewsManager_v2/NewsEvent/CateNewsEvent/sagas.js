import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_LIST_CATE_NEWS_ACTION,
  ADD_CATE_NEWS_ACTION,
  DEL_CATE_NEWS_ACTION,
} from './constants';

import { 
  getListCateNewsSuccess,
  addCateNewsSuccess,
  delCateNewsSuccess,
} from './actions';

import {
  callAPIGetListCategoryNews,
  callAPIAddCategoryNews,
  callAPIDelCategoryNews,
} from 'utils/request';
import {
  selectCategoryNewsName,
  selectIdCategoryNewsDel,
} from './selectors';

import {message,} from 'antd';

export function* getListCategoryNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const response = yield call(callAPIGetListCategoryNews,userInfo.phone,userInfo.password);
  try{
    if (response.data.data.e==0) {
        yield put(getListCateNewsSuccess(response.data.data.array));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi đăng nhập !');
  }
  
}
export function* getListCategoryNewsWatcher() {
  while (yield take(GET_LIST_CATE_NEWS_ACTION)) {
    yield call(getListCategoryNews);
  }
}

export function* addCategoryNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const name = yield select(selectCategoryNewsName());
  const response = yield call(callAPIAddCategoryNews,userInfo.phone,userInfo.password,name);
  try{
    if (response.data.data.e==0) {
        yield put(addCateNewsSuccess(response.data.data.data));
        message.success("Thêm thành công.")
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi đăng nhập !');
  }
  
}
export function* addCategoryNewsWatcher() {
  while (yield take(ADD_CATE_NEWS_ACTION)) {
    yield call(addCategoryNews);
  }
}

export function* delCategoryNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdCategoryNewsDel());
  const response = yield call(callAPIDelCategoryNews,userInfo.phone,userInfo.password,id);
  try{
    if (response.data.data.e==0) {
        yield put(delCateNewsSuccess(id));
        message.success("Xóa thành công.")
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
    message.error(response.data.data.e);
    message.error('Lỗi đăng nhập !');
  }
  
}
export function* delCategoryNewsWatcher() {
  while (yield take(DEL_CATE_NEWS_ACTION)) {
    yield call(delCategoryNews);
  }
}

export function* cateNewsEventData() {
  const watchergetListCategoryNews = yield fork(getListCategoryNewsWatcher);
  const watcheraddCategoryNews = yield fork(addCategoryNewsWatcher);
  const watcherdelCategoryNews = yield fork(delCategoryNewsWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListCategoryNews);
    yield cancel(watcheraddCategoryNews);
    yield cancel(watcherdelCategoryNews);
  }
}

export default [
  cateNewsEventData,
];
