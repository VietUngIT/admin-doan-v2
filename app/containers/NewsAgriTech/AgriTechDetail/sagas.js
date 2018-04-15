import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_LIST_AGRI_TECH_ACTION,
  GET_LIST_SUB_CATE_AGRI_TECH_ACTION,
  EDIT_TAGS_NEWS_AGRI_TECH_ACTION,
  EDIT_IMAGE_NEWS_AGRI_TECH_ACTION,
  DELETE_NEWS_AGRI_TECH_ACTION,
  SUBMIT_EDIT_NEWS_AGRI_TECH_ACTION,
  ADD_NEWS_AGRI_TECH_ACTION,
} from './constants';
import { 
  getListNewsAgriTechSuccess,
  getListSubCateAgriTechSuccess,
  editNewsAgriTech,
  edittagsNewsSuccess,
  editImageNewsSuccess,
  deleteNewsSuccess,
  submitEditNewsSuccess,
  addNewsAgriTechSuccess,
  addNewsNotDataAgriTechSuccess,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetListNewsAgriTech,
  callAPIGetListSubCateAgriTech,
  callAPIEditTagsNewsAgriTech,
  callAPIEditImageNewsAgriTech,
  callAPIDeleteNewsAgriTech,
  callAPISubmitEditNewsAgriTech,
  callAPIAddNewsAgriTech,
} from 'utils/request';
import {
  selectidSubCateNewsAgriTech,
  selectPageNewsAgriTech,
  selectIdCateGetSubCate,
  selectidNewsAgriTech,
  selectIdEditNews,
  selectTagsEditNews,
  selectImageEditNews,
  selectIdDelNews,
  selectIdSubCateNewsEditSubmit,
  selectEditNewsAgriTech,
  selectNewsAddAgriTech,
} from './selectors';

export function* getListNewsAgriTech() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectidSubCateNewsAgriTech());
  const idNews = yield select(selectidNewsAgriTech());
  const page = yield select(selectPageNewsAgriTech());
  const response = yield call(callAPIGetListNewsAgriTech,userInfo.phone,userInfo.password,id,page);
  try{
    if (response.data.data.e==0) {
      let item = false;
      item = response.data.data.array.filter((item)=>{
        if(item.id===idNews){
          return item;
        }
      });
      if(item && (item.size>0 || item.length>0)){
        yield put(editNewsAgriTech(item[0].title,item[0].author,item[0].idSubCate,item[0].content));
      }
        yield put(getListNewsAgriTechSuccess(response.data.data.array,response.data.data.total));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
    console.log("error: "+error)
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

export function* editTagsNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdEditNews());
  const tags = yield select(selectTagsEditNews());
  const response = yield call(callAPIEditTagsNewsAgriTech,userInfo.phone,userInfo.password,id,tags);
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
  while (yield take(EDIT_TAGS_NEWS_AGRI_TECH_ACTION)) {
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
  const response = yield call(callAPIEditImageNewsAgriTech,userInfo.phone,userInfo.password,id,image);
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
  while (yield take(EDIT_IMAGE_NEWS_AGRI_TECH_ACTION)) {
    yield call(editImageNews);
  }
}

export function* deleteNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdDelNews());
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

export function* submitEditNews() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdEditNews());
  const idSubCate = yield select(selectIdSubCateNewsEditSubmit());
  const newsEdit = yield select(selectEditNewsAgriTech());
  const response = yield call(callAPISubmitEditNewsAgriTech,userInfo.phone,userInfo.password,id,newsEdit.get("title"),newsEdit.get("author"),newsEdit.get("idsubcate"),newsEdit.get("content"));
  try{
    if (response.data.data.e==0) {
      if(idSubCate!==newsEdit.get("idsubcate")){
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
  while (yield take(SUBMIT_EDIT_NEWS_AGRI_TECH_ACTION)) {
    yield call(submitEditNews);
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
  const watchergetListNewsAgriTech = yield fork(getListNewsAgriTechWatcher);
  const watchergetListSubCategoryNewsAgriTech = yield fork(getListSubCategoryNewsAgriTechWatcher);
  const watchereditTagsNews = yield fork(editTagsNewsWatcher);
  const watchereditImageNews = yield fork(editImageNewsWatcher);
  const watcherdeleteNews = yield fork(deleteNewsWatcher);
  const watchersubmitEditNews = yield fork(submitEditNewsWatcher);
  const watcheraddNewsAgriTech = yield fork(addNewsAgriTechWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListNewsAgriTech);
    yield cancel(watchergetListSubCategoryNewsAgriTech);
    yield cancel(watchereditTagsNews);
    yield cancel(watchereditImageNews);
    yield cancel(watcherdeleteNews);
    yield cancel(watchersubmitEditNews);
    yield cancel(watcheraddNewsAgriTech);
  }
}

export default [
  defaultSaga,
];
