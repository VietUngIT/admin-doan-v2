import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_LIST_MK_ACTION,
  GET_LIST_CATE_MK_ACTION,
  DELETE_NEWS_MK_ACTION,
  ADD_NEWS_MK_ACTION,
} from './constants';
import { 
  getListNewsMKSuccess,
  getListCateNewsMKSuccess,
  deleteNewsMKSuccess,
  addNewsMKSuccess,
  addNewsNotDataMKSuccess,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetListNewsMKByCate,
  callAPIGetListCategoryNewsMK,
  callAPIDeleteNewsMK,
  callAPIAddNewsMK,
} from 'utils/request';
import {
  selectidCateNewsMK,
  selectPageNews,
  selectIdNewsMKDel,
  selectNewsAddMK,
} from './selectors';

export function* addNewsMK() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const newsAdd = yield select(selectNewsAddMK());
  const response = yield call(callAPIAddNewsMK,userInfo.phone,userInfo.password,newsAdd.get("title"),
      newsAdd.get("author"),newsAdd.get("image"),newsAdd.get("source"),
      newsAdd.get("tags"), newsAdd.get("idcate"), newsAdd.get("content"));
  try{
    if (response.data.data.e==0) {
      if(newsAdd.get("idCateLink")!==newsAdd.get("idcate")){
        yield put(addNewsNotDataMKSuccess(0))
      }else{
        yield put(addNewsMKSuccess(response.data.data.data,0));
      }
      message.success('Thêm tin tức thành công !');
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Thêm tin tức lỗi !');
  }
  
}
export function* addNewsMKWatcher() {
  while (yield take(ADD_NEWS_MK_ACTION)) {
    yield call(addNewsMK);
  }
}
export function* deleteNewsMK() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdNewsMKDel());
  const response = yield call(callAPIDeleteNewsMK,userInfo.phone,userInfo.password,id);
  try{
    if (response.data.data.e==0) {
        yield put(deleteNewsMKSuccess(id));
        message.success('Xóa tin tức thành công !');
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Xóa tin tức lỗi !');
  }
  
}
export function* deleteNewsMKWatcher() {
  while (yield take(DELETE_NEWS_MK_ACTION)) {
    yield call(deleteNewsMK);
  }
}
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
  while (yield take(GET_LIST_CATE_MK_ACTION)) {
    yield call(getListCategoryNewsMK);
  }
}
export function* getListNewsMK() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectidCateNewsMK());
  const page = yield select(selectPageNews());
  const response = yield call(callAPIGetListNewsMKByCate,userInfo.phone,userInfo.password,id,page);
  try{
    if (response.data.data.e==0) {
      yield put(getListNewsMKSuccess(response.data.data.array,response.data.data.total));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Load danh sách tin tức lỗi !');
  }
  
}
export function* getListNewsMKWatcher() {
  while (yield take(GET_LIST_MK_ACTION)) {
    yield call(getListNewsMK);
  }
}

export function* defaultSaga() {
  const watchergetListNewsMK = yield fork(getListNewsMKWatcher);
  const watchergetListCategoryNewsMK = yield fork(getListCategoryNewsMKWatcher);
  const watcherdeleteNewsMK = yield fork(deleteNewsMKWatcher);
  const watcheraddNewsMK = yield fork(addNewsMKWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListNewsMK);
    yield cancel(watchergetListCategoryNewsMK);
    yield cancel(watcherdeleteNewsMK);
    yield cancel(watcheraddNewsMK);
  }
}
export default [
  defaultSaga,
];
