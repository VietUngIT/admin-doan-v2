import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_CATE_ACTION,
  ADD_CATE_ACTION,
  DELETE_CATE_ACTION,
} from './constants';
import { 
  getListCateMPSuccess,
  addCateMPSuccess,
  delCateMPSuccess,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetListCateMP,
  callAPIAddCateMP,
  callAPIDellCateMP,
} from 'utils/request';
import {
  selectImageCateAdd,
  selectNameCateAdd,
  selectIdDelCate,
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

export function* addCateMP() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const name = yield select(selectNameCateAdd()); 
  const image = yield select(selectImageCateAdd()); 
  const response = yield call(callAPIAddCateMP,userInfo.phone,userInfo.password,name,image);
  try{
    if (response.data.data.e==0) {
        yield put(addCateMPSuccess(response.data.data.data));
        message.success("Thêm thành công.");
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi trong quá trình thêm!');
  }
  
}
export function* addCateMPWatcher() {
  while (yield take(ADD_CATE_ACTION)) {
    yield call(addCateMP);
  }
}

export function* delCateMP() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdDelCate()); 
  const response = yield call(callAPIDellCateMP,userInfo.phone,userInfo.password,id);
  try{
    if (response.data.data.e==0) {
        yield put(delCateMPSuccess(id));
        message.success("Xóa thành công.");
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi trong quá trình xử lý!');
  }
  
}
export function* delCateMPWatcher() {
  while (yield take(DELETE_CATE_ACTION)) {
    yield call(delCateMP);
  }
}

export function* defaultSaga() {
  const watchergetListCateMP = yield fork(getListCateMPWatcher);
  const watcheraddCateMP = yield fork(addCateMPWatcher);
  const watcherdelCateMP = yield fork(delCateMPWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListCateMP);
    yield cancel(watcheraddCateMP);
    yield cancel(watcherdelCateMP);
  }
}
export default [
  defaultSaga,
];
