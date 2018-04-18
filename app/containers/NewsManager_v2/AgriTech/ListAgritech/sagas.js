import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_LIST_AGRI_TECH_ACTION,
  GET_LIST_SUB_CATE_AGRI_TECH_ACTION,
  GET_LIST_CATE_AGRI_TECH_ACTION,
  DELETE_NEWS_AGRI_TECH_ACTION,
  ADD_NEWS_AGRI_TECH_ACTION,
} from './constants';
import { 
  getListNewsAgriTechSuccess,
  getListSubCateAgriTechSuccess,
  getListCateAgriTechSuccess,
  deleteNewsSuccess,
  addNewsAgriTechSuccess,
  addNewsNotDataAgriTechSuccess,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetListNewsAgriTech,
  callAPIGetListSubCateAgriTech,
  callAPIGetListCateAgriTech,
  callAPIDeleteNewsAgriTech,
  callAPIAddNewsAgriTech,
} from 'utils/request';
import {
  selectidSubCateNewsAgriTech,
  selectPageNewsAgriTech,
  selectIdCateGetSubCate,
  selectidNewsAgriTech,
  selectIdNewsATDel,
  selectNewsAddAgriTech,
} from './selectors';

export function* getListCateAgriTech() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const response = yield call(callAPIGetListCateAgriTech,userInfo.phone,userInfo.password);
  try{
    if (response.data.data.e==0) {
        yield put(getListCateAgriTechSuccess(response.data.data.array));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi đăng nhập !');
  }
  
}
export function* getListCateAgriTechWatcher() {
  while (yield take(GET_LIST_CATE_AGRI_TECH_ACTION)) {
    yield call(getListCateAgriTech);
  }
}
export function* getListNewsAgriTech() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectidSubCateNewsAgriTech());
  const page = yield select(selectPageNewsAgriTech());
  const response = yield call(callAPIGetListNewsAgriTech,userInfo.phone,userInfo.password,id,page);
  try{
    if (response.data.data.e==0) {
      yield put(getListNewsAgriTechSuccess(response.data.data.array,response.data.data.total));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
    message.error(response.data.data.e);
    message.error('Load danh sách tin tức lỗi !');
  }
  
}
export function* getListNewsAgriTechWatcher() {
  while (yield take(GET_LIST_AGRI_TECH_ACTION)) {
    yield call(getListNewsAgriTech);
  }
}
export function* getListSubCategoryNewsAgriTech() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdCateGetSubCate());
  const response = yield call(callAPIGetListSubCateAgriTech,userInfo.phone,userInfo.password,id);
  try{
    if (response.data.data.e==0) {
        yield put(getListSubCateAgriTechSuccess(response.data.data.array));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi đăng nhập !');
  }
  
}
export function* getListSubCategoryNewsAgriTechWatcher() {
  while (yield take(GET_LIST_SUB_CATE_AGRI_TECH_ACTION)) {
    yield call(getListSubCategoryNewsAgriTech);
  }
}
export function* deleteNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdNewsATDel());
  const response = yield call(callAPIDeleteNewsAgriTech,userInfo.phone,userInfo.password,id);
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
  while (yield take(DELETE_NEWS_AGRI_TECH_ACTION)) {
    yield call(deleteNews);
  }
}
export function* addNewsAgriTech() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const newsAdd = yield select(selectNewsAddAgriTech());
  const response = yield call(callAPIAddNewsAgriTech,userInfo.phone,userInfo.password,newsAdd.get("title"),
      newsAdd.get("author"),newsAdd.get("image"),
      newsAdd.get("tags"), newsAdd.get("idsubcate"), newsAdd.get("content"));
  try{
    if (response.data.data.e==0) {
      if(newsAdd.get("idSubCateLink")!==newsAdd.get("idsubcate")){
        yield put(addNewsNotDataAgriTechSuccess(0))
      }else{
        yield put(addNewsAgriTechSuccess(response.data.data.data,0));
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
export function* addNewsAgriTechWatcher() {
  while (yield take(ADD_NEWS_AGRI_TECH_ACTION)) {
    yield call(addNewsAgriTech);
  }
}

export function* defaultSaga() {
  const watchergetListCateAgriTech = yield fork(getListCateAgriTechWatcher);
  const watchergetListNewsAgriTech = yield fork(getListNewsAgriTechWatcher);
  const watchergetListSubCategoryNewsAgriTech = yield fork(getListSubCategoryNewsAgriTechWatcher);
  const watcherdeleteNews = yield fork(deleteNewsWatcher);
  const watcheraddNewsAgriTech = yield fork(addNewsAgriTechWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListCateAgriTech);
    yield cancel(watchergetListNewsAgriTech);
    yield cancel(watchergetListSubCategoryNewsAgriTech);
    yield cancel(watcherdeleteNews);
    yield cancel(watcheraddNewsAgriTech);
  }
}
export default [
  defaultSaga,
];
