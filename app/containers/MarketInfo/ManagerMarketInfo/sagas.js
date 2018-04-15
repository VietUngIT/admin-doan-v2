import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_LIST_CATE_NEWS_MK_ACTION,
  ADD_CATE_NEWS_MK_ACTION,
  DEL_CATE_NEWS_MK_ACTION,
  EDIT_CATE_NEWS_MK_ACTION,
} from './constants';
import { 
  getListCateNewsMKSuccess,
  addCateNewsMKSuccess,
  delCateNewsMKSuccess,
  editCateNewsMKSuccess,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetListCategoryNewsMK,
  callAPIAddCategoryNewsMK,
  callAPIDelCategoryNewsMK,
  callAPIEditCategoryNewsMK,
} from 'utils/request';
import {
  selectNameCategoryAdd,
  selectIdCategoryDel,
  selectIdCategoryEdit,
  selectNameCategoryEdit,
} from './selectors';

export function* getListCategoryNewsMK() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const response = yield call(callAPIGetListCategoryNewsMK,userInfo.phone,userInfo.password);
  try{
    if (response.data.data.e==0) {
        yield put(getListCateNewsMKSuccess(response.data.data.array));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi đăng nhập !');
  }
  
}
export function* getListCategoryNewsMKWatcher() {
  while (yield take(GET_LIST_CATE_NEWS_MK_ACTION)) {
    yield call(getListCategoryNewsMK);
  }
}

export function* addCategoryNewsMK() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const name = yield select(selectNameCategoryAdd()); 
  const response = yield call(callAPIAddCategoryNewsMK,userInfo.phone,userInfo.password,name);
  try{
    if (response.data.data.e==0) {
        yield put(addCateNewsMKSuccess(response.data.data.data));
        message.success("Thêm thành công.");
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi trong quá trình thêm!');
  }
  
}
export function* addCategoryNewsMKWatcher() {
  while (yield take(ADD_CATE_NEWS_MK_ACTION)) {
    yield call(addCategoryNewsMK);
  }
}

export function* delCategoryNewsMK() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdCategoryDel()); 
  const response = yield call(callAPIDelCategoryNewsMK,userInfo.phone,userInfo.password,id);
  try{
    if (response.data.data.e==0) {
        yield put(delCateNewsMKSuccess(id));
        message.success("Xóa thành công.");
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi trong quá trình xử lý!');
  }
  
}
export function* delCategoryNewsMKWatcher() {
  while (yield take(DEL_CATE_NEWS_MK_ACTION)) {
    yield call(delCategoryNewsMK);
  }
}

export function* editCategoryNewsMK() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdCategoryEdit()); 
  const name = yield select(selectNameCategoryEdit()); 
  const response = yield call(callAPIEditCategoryNewsMK,userInfo.phone,userInfo.password,id,name);
  try{
    if (response.data.data.e==0) {
        yield put(editCateNewsMKSuccess(response.data.data.data));
        message.success("Sửa thành công.");
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi trong quá trình xử lý!');
  }
  
}
export function* editCategoryNewsMKWatcher() {
  while (yield take(EDIT_CATE_NEWS_MK_ACTION)) {
    yield call(editCategoryNewsMK);
  }
}

export function* defaultSaga() {
  const watchergetListCategoryNewsMK = yield fork(getListCategoryNewsMKWatcher);
  const watcheraddCategoryNewsMK = yield fork(addCategoryNewsMKWatcher);
  const watcherdelCategoryNewsMK = yield fork(delCategoryNewsMKWatcher);
  const watchereditCategoryNewsMK = yield fork(editCategoryNewsMKWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListCategoryNewsMK);
    yield cancel(watcheraddCategoryNewsMK);
    yield cancel(watcherdelCategoryNewsMK);
    yield cancel(watchereditCategoryNewsMK);
  }
}

export default [
  defaultSaga,
];
