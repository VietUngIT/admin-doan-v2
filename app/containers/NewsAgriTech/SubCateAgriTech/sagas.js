import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_LIST_SUB_CATE_AGRI_TECH_ACTION,
  ADD_SUB_CATE_AGRI_TECH_ACTION,
  DEL_SUB_CATE_AGRI_TECH_ACTION,
  EDIT_SUB_CATE_AGRI_TECH_ACTION,
} from './constants';
import { 
  getListSubCateSuccess,
  addSubCateSuccess,
  delSubCateSuccess,
  editSubCateSuccess,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetListSubCateAgriTech,
  callAPIAddSubCateAgriTech,
  callAPIDelSubCateAgriTech,
  callAPIEditSubCateAgriTech,
} from 'utils/request';
import {
  selectIdCateGetSubCate,
  selectIdCateAddSubCate,
  selectNameAddSubCate,
  selectidSubCateDel,
  selectidSubCateEdit,
  selectNameSubCateEdit,
} from './selectors';

export function* getListSubCateAgriTech() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdCateGetSubCate()); 
  const response = yield call(callAPIGetListSubCateAgriTech,userInfo.phone,userInfo.password,id);
  try{
    if (response.data.data.e==0) {
        yield put(getListSubCateSuccess(response.data.data.array));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi đăng nhập !');
  }
  
}
export function* getListSubCateAgriTechWatcher() {
  while (yield take(GET_LIST_SUB_CATE_AGRI_TECH_ACTION)) {
    yield call(getListSubCateAgriTech);
  }
}

export function* addSubCateAgriTech() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectIdCateAddSubCate());
  const name = yield select(selectNameAddSubCate()); 
  const response = yield call(callAPIAddSubCateAgriTech,userInfo.phone,userInfo.password,id,name);
  try{
    if (response.data.data.e==0) {
        yield put(addSubCateSuccess(response.data.data.data));
        message.success("Thêm thành công.");
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi trong quá trình thêm!');
  }
  
}
export function* addSubCateAgriTechWatcher() {
  while (yield take(ADD_SUB_CATE_AGRI_TECH_ACTION)) {
    yield call(addSubCateAgriTech);
  }
}

export function* delSubCateAgritech() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectidSubCateDel()); 
  const response = yield call(callAPIDelSubCateAgriTech,userInfo.phone,userInfo.password,id);
  try{
    if (response.data.data.e==0) {
        yield put(delSubCateSuccess(id));
        message.success("Xóa thành công.");
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi trong quá trình xử lý!');
  }
  
}
export function* delSubCateAgritechWatcher() {
  while (yield take(DEL_SUB_CATE_AGRI_TECH_ACTION)) {
    yield call(delSubCateAgritech);
  }
}

export function* editSubCateAgriTech() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectidSubCateEdit()); 
  const name = yield select(selectNameSubCateEdit()); 
  const response = yield call(callAPIEditSubCateAgriTech,userInfo.phone,userInfo.password,id,name);
  try{
    if (response.data.data.e==0) {
        yield put(editSubCateSuccess(response.data.data.data));
        message.success("Sửa thành công.");
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi trong quá trình xử lý!');
  }
  
}
export function* editSubCateAgriTechWatcher() {
  while (yield take(EDIT_SUB_CATE_AGRI_TECH_ACTION)) {
    yield call(editSubCateAgriTech);
  }
}

export function* defaultSaga() {
  const watchergetListSubCateAgriTech = yield fork(getListSubCateAgriTechWatcher);
  const watcheraddSubCateAgriTech = yield fork(addSubCateAgriTechWatcher);
  const watcherdelSubCateAgritech = yield fork(delSubCateAgritechWatcher);
  const watchereditSubCateAgriTech = yield fork(editSubCateAgriTechWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListSubCateAgriTech);
    yield cancel(watcheraddSubCateAgriTech);
    yield cancel(watcherdelSubCateAgritech);
    yield cancel(watchereditSubCateAgriTech);
  }
}

export default [
  defaultSaga,
];
