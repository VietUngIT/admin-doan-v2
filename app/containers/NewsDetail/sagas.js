
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_LIST_NEWS_ACTION,
  GET_LIST_CATE_ACTION,
  EDIT_TAGS_NEWS_ACTION,
  EDIT_IMAGE_NEWS_ACTION,
  DELETE_NEWS_ACTION,
  SUBMIT_EDIT_NEWS_ACTION,
  ADD_NEWS_ACTION,
} from './constants';
import { 
  getListNewsSuccess,
  getListCateNewsSuccess,
  edittagsNewsSuccess,
  editImageNewsSuccess,
  deleteNewsSuccess,
  editNews,
  submitEditNewsSuccess,
  addNewsSuccess,
  addNewsNotDataSuccess,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetListNewsByCate,
  callAPIGetListCategoryNews,
  callAPIEditTagsNews,
  callAPIEditImageNews,
  callAPIDeleteNews,
  callAPISubmitEditNews,
  callAPIAddNews,
} from 'utils/request';
import {
  selectidCateNewsNews,
  selectPageNewsNews,
  selectTagsNews,
  selectIdEditNews,
  selectImageEditNews,
  selectidNewsNews,
  selectIdDeleteNews,
  selectIdEditNewsSubmit,
  selectEditNews,
  selectIdCateNewsSubmit,
  selectNewsAdd,
} from './selectors';

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
  while (yield take(GET_LIST_CATE_ACTION)) {
    yield call(getListCategoryNews);
  }
}

export function* getListNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectidCateNewsNews());
  const idNews = yield select(selectidNewsNews());
  const page = yield select(selectPageNewsNews());
  const response = yield call(callAPIGetListNewsByCate,userInfo.phone,userInfo.password,id,page);
  try{
    if (response.data.data.e==0) {
      let item = false;
      item = response.data.data.array.filter((item)=>{
        if(item.id===idNews){
          return item;
        }
      });
      if(item && (item.size>0 || item.length>0)){
        yield put(editNews(item[0].title,item[0].shortDescription,item[0].author,item[0].source,item[0].idCateNews,item[0].content));
      }
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

export function* editTagsNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdEditNews());
  const tags = yield select(selectTagsNews());
  const response = yield call(callAPIEditTagsNews,userInfo.phone,userInfo.password,id,tags);
  try{
    if (response.data.data.e==0) {
        yield put(edittagsNewsSuccess(response.data.data.data));
        message.success('Sửa tin tức thành công !');
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Sửa tin tức lỗi !');
  }
  
}

export function* editTagsNewsWatcher() {
  while (yield take(EDIT_TAGS_NEWS_ACTION)) {
    yield call(editTagsNews);
  }
}

export function* editImageNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdEditNews());
  const image = yield select(selectImageEditNews());
  const response = yield call(callAPIEditImageNews,userInfo.phone,userInfo.password,id,image);
  try{
    if (response.data.data.e==0) {
        yield put(editImageNewsSuccess(response.data.data.data));
        message.success('Sửa tin tức thành công !');
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Sửa tin tức lỗi !');
  }
  
}

export function* editImageNewsWatcher() {
  while (yield take(EDIT_IMAGE_NEWS_ACTION)) {
    yield call(editImageNews);
  }
}

export function* deleteNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdDeleteNews());
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
          message.error('Sửa tin tức lỗi !');
  }
  
}

export function* deleteNewsWatcher() {
  while (yield take(DELETE_NEWS_ACTION)) {
    yield call(deleteNews);
  }
}

export function* submitEditNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdEditNewsSubmit());
  const idCate = yield select(selectIdCateNewsSubmit());
  const newsEdit = yield select(selectEditNews());
  const response = yield call(callAPISubmitEditNews,userInfo.phone,userInfo.password,id,newsEdit.get("title"),newsEdit.get("shortDesc"),newsEdit.get("author"),newsEdit.get("source"),newsEdit.get("idcate"),newsEdit.get("content"));
  try{
    if (response.data.data.e==0) {
      if(idCate!==newsEdit.get("idcate")){
        yield put(deleteNewsSuccess(id))
      }else{
        yield put(submitEditNewsSuccess(response.data.data.data));
      }
      message.success('Sửa tin tức thành công !');
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Sửa tin tức lỗi !');
  }
  
}

export function* submitEditNewsWatcher() {
  while (yield take(SUBMIT_EDIT_NEWS_ACTION)) {
    yield call(submitEditNews);
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
          message.error('Sửa tin tức lỗi !');
  }
  
}

export function* addNewsWatcher() {
  while (yield take(ADD_NEWS_ACTION)) {
    yield call(addNews);
  }
}

export function* defaultSaga() {
  const watchergetListNews = yield fork(getListNewsWatcher);
  const watchergetListCategoryNews = yield fork(getListCategoryNewsWatcher);
  const watchereditTagsNews = yield fork(editTagsNewsWatcher);
  const watchereditImageNews = yield fork(editImageNewsWatcher);
  const watcherdeleteNews = yield fork(deleteNewsWatcher);
  const watchersubmitEditNews = yield fork(submitEditNewsWatcher);
  const watcheraddNews = yield fork(addNewsWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListNews);
    yield cancel(watchergetListCategoryNews);
    yield cancel(watchereditTagsNews);
    yield cancel(watchereditImageNews);
    yield cancel(watcherdeleteNews);
    yield cancel(watchersubmitEditNews);
    yield cancel(watcheraddNews);
  }
}

export default [
  defaultSaga,
];
