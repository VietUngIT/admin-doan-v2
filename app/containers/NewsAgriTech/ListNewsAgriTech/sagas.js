import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { 
  GET_LIST_NEWS_AGRI_TECH_ACTION,
} from './constants';
import { 
  getListNewsAgriTechSuccess,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetListNewsAgriTech,
} from 'utils/request';
import {
  selectidSubCate,
  selectPageNewsAgriTech,
} from './selectors';

export function* getListNewsAgriTech() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const id = yield select(selectidSubCate());
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
  while (yield take(GET_LIST_NEWS_AGRI_TECH_ACTION)) {
    yield call(getListNewsAgriTech);
  }
}

export function* defaultSaga() {
  const watchergetListNewsAgriTech = yield fork(getListNewsAgriTechWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetListNewsAgriTech);
  }
}

export default [
  defaultSaga,
];
