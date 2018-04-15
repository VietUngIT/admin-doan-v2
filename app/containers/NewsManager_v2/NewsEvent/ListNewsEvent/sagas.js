import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_LIST_NEWS_ACTION,
  DELETE_NEWS_ACTION,
  ADD_NEWS_ACTION,
  GET_LIST_CATE_ACTION,
} from './constants';
import { 
  getListNewsSuccess,
  deleteNewsSuccess,
  addNewsNotDataSuccess,
  addNewsSuccess,
  getListCateNewsSuccess,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetListNewsByCate,
  callAPIDeleteNews,
  callAPIAddNews,
  callAPIGetListCategoryNews,
} from 'utils/request';
import {
  selectidCateNewsEvent,
  selectPageNewsEvent,
  selectIdNewsEventDel,
  selectNewsAdd,
} from './selectors';

export function* deleteNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdNewsEventDel());
  const response = yield call(callAPIDeleteNews,userInfo.phone,userInfo.password,id);
  try{
    if (response.data.data.e==0) {
        yield put(deleteNewsSuccess(id));
        message.success('Xóa tin tức thành công !');
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Xóa tin tức lỗi !');
  }
  
}
export function* deleteNewsWatcher() {
  while (yield take(DELETE_NEWS_ACTION)) {
    yield call(deleteNews);
  }
}

export function* getListNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectidCateNewsEvent());
  const page = yield select(selectPageNewsEvent());
  const response = yield call(callAPIGetListNewsByCate,userInfo.phone,userInfo.password,id,page);
  try{
    if (response.data.data.e==0) {
      yield put(getListNewsSuccess(response.data.data.array,response.data.data.total));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Load danh sách tin tức lỗi !');
  }
  
}
export function* getListNewsWatcher() {
  while (yield take(GET_LIST_NEWS_ACTION)) {
    yield call(getListNews);
  }
}

export function* addNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const newsAdd = yield select(selectNewsAdd());
  const response = yield call(callAPIAddNews,userInfo.phone,userInfo.password,newsAdd.get("title"),
      newsAdd.get("shortDesc"),newsAdd.get("author"),newsAdd.get("image"),newsAdd.get("source"),
      newsAdd.get("tags"), newsAdd.get("idcate"), newsAdd.get("content"));
  try{
    if (response.data.data.e==0) {
      if(newsAdd.get("idCateLink")!==newsAdd.get("idcate")){
        yield put(addNewsNotDataSuccess(0))
      }else{
        yield put(addNewsSuccess(response.data.data.data,0));
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
export function* addNewsWatcher() {
  while (yield take(ADD_NEWS_ACTION)) {
    yield call(addNews);
  }
}

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
          message.error('Lấy danh mục tin tức thất bại !');
  }
  
}
export function* getListCategoryNewsWatcher() {
  while (yield take(GET_LIST_CATE_ACTION)) {
    yield call(getListCategoryNews);
  }
}

export function* defaultSaga() {
  const watchergetListNews = yield fork(getListNewsWatcher);
  const watcherdeleteNews = yield fork(deleteNewsWatcher);
  const watcheraddNews = yield fork(addNewsWatcher);
  const watchergetListCategoryNews = yield fork(getListCategoryNewsWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListNews);
    yield cancel(watcherdeleteNews);
    yield cancel(watcheraddNews);
    yield cancel(watchergetListCategoryNews);
  }
}

export default [
  defaultSaga,
];
