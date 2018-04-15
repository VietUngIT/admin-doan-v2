import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { 
  GET_INFO_ADMIN_ACTION,
  CHANGE_NAME_ACTION,
  CHANGE_PHONE_ACTION,
  CHANGE_ADDRESS_ACTION,
  SUBMIT_CHANGE_AVATAR_ACTION,
  CHANGE_PASS_ACTION,
} from './constants';
import { 
  getinfoAdminSuccess,
  changeNameAdminSuccess,
  changePhoneAdminSuccess,
  changeAddressAdminSuccess,
  changeAvatarAdminSuccess,
  changePassAdminSuccess,
} from './actions';
import {message,} from 'antd';
import {
  callAPIGetUserInfo,
  callAPIChangeNameUserInfo,
  callAPIChangePhoneUserInfo,
  callAPIChangeAddressUserInfo,
  callAPIChangeAvatarUserInfo,
  callAPIChangePassUserInfo,
} from 'utils/request';
import {
  selectName,
  selectNewPhone,
  selectAddress,
  selectAvatar,
  selectOldPass,
  selectNewPass,
} from './selectors';

export function* getinfoAdmin() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const response = yield call(callAPIGetUserInfo,userInfo.phone,userInfo.password);
  try{
    if (response.data.data.e==0) {
        yield put(getinfoAdminSuccess(response.data.data.data));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi đăng nhập !');
  }
  
}

export function* getinfoAdminWatcher() {
  while (yield take(GET_INFO_ADMIN_ACTION)) {
    yield call(getinfoAdmin);
  }
}

export function* changeNameAdmin() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const name = yield select(selectName());
  const response = yield call(callAPIChangeNameUserInfo,userInfo.phone,userInfo.password,name);
  try{
    if (response.data.data.e==0) {
      message.success("Update thành công.")
      yield put(changeNameAdminSuccess(response.data.data.data));
      if(localStorage.getItem('userInfo')){
        localStorage.setItem('userInfo',(JSON.stringify(response.data.data.data)));
      }
      sessionStorage.setItem('userInfo',(JSON.stringify(response.data.data.data)));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi đăng nhập !');
  }
  
}

export function* changeNameAdminWatcher() {
  while (yield take(CHANGE_NAME_ACTION)) {
    yield call(changeNameAdmin);
  }
}

export function* changePhoneAdmin() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const newPhone = yield select(selectNewPhone());
  const response = yield call(callAPIChangePhoneUserInfo,userInfo.phone,userInfo.password,newPhone);
  try{
    if (response.data.data.e==0) {
      message.success("Update thành công.")
      yield put(changePhoneAdminSuccess(response.data.data.data));
      if(localStorage.getItem('userInfo')){
        localStorage.setItem('userInfo',(JSON.stringify(response.data.data.data)));
      }
      sessionStorage.setItem('userInfo',(JSON.stringify(response.data.data.data)));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi đăng nhập !');
  }
  
}

export function* changePhoneAdminWatcher() {
  while (yield take(CHANGE_PHONE_ACTION)) {
    yield call(changePhoneAdmin);
  }
}

export function* changeAddressAdmin() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const address = yield select(selectAddress());
  const response = yield call(callAPIChangeAddressUserInfo,userInfo.phone,userInfo.password,address);
  try{
    if (response.data.data.e==0) {
      message.success("Update thành công.")
      yield put(changeAddressAdminSuccess(response.data.data.data));
      if(localStorage.getItem('userInfo')){
        localStorage.setItem('userInfo',(JSON.stringify(response.data.data.data)));
      }
      sessionStorage.setItem('userInfo',(JSON.stringify(response.data.data.data)));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi đăng nhập !');
  }
  
}

export function* changeAddressAdminWatcher() {
  while (yield take(CHANGE_ADDRESS_ACTION)) {
    yield call(changeAddressAdmin);
  }
}

export function* changeAvatarAdmin() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const avatar = yield select(selectAvatar());
  const response = yield call(callAPIChangeAvatarUserInfo,userInfo.phone,userInfo.password,avatar);
  try{
    if (response.data.data.e==0) {
      message.success("Update thành công.")
      yield put(changeAvatarAdminSuccess(response.data.data.data));
      if(localStorage.getItem('userInfo')){
        localStorage.setItem('userInfo',(JSON.stringify(response.data.data.data)));
      }
      sessionStorage.setItem('userInfo',(JSON.stringify(response.data.data.data)));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi đăng nhập !');
  }
  
}

export function* changeAvatarAdminWatcher() {
  while (yield take(SUBMIT_CHANGE_AVATAR_ACTION)) {
    yield call(changeAvatarAdmin);
  }
}

export function* changePassAdmin() {
  let userInfo = null;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo == null){
    userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  const oldPass = yield select(selectOldPass());
  const newPass = yield select(selectNewPass());
  const response = yield call(callAPIChangePassUserInfo,userInfo.phone,userInfo.password,oldPass,newPass);
  try{
    if (response.data.data.e==0) {
      message.success("Update thành công.")
      yield put(changePassAdminSuccess(response.data.data.data));
      if(localStorage.getItem('userInfo')){
        localStorage.setItem('userInfo',(JSON.stringify(response.data.data.data)));
      }
      sessionStorage.setItem('userInfo',(JSON.stringify(response.data.data.data)));
    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi đăng nhập !');
  }
  
}

export function* changePassAdminWatcher() {
  while (yield take(CHANGE_PASS_ACTION)) {
    yield call(changePassAdmin);
  }
}


export function* infoAdminData() {
  const watchergetinfoAdmin = yield fork(getinfoAdminWatcher);
  const watcherchangeNameAdmin = yield fork(changeNameAdminWatcher);
  const watcherchangePhoneAdmin = yield fork(changePhoneAdminWatcher);
  const watcherchangeAddressAdmin = yield fork(changeAddressAdminWatcher);
  const watcherchangeAvatarAdmin = yield fork(changeAvatarAdminWatcher);
  const watcherchangePassAdmin = yield fork(changePassAdminWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watchergetinfoAdmin);
    yield cancel(watcherchangeNameAdmin);
    yield cancel(watcherchangePhoneAdmin);
    yield cancel(watcherchangeAddressAdmin);
    yield cancel(watcherchangeAvatarAdmin);
    yield cancel(watcherchangePassAdmin);
  }
}

export default [
  infoAdminData,
];
