import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { LOGIN_PHONE } from './constants';
import { 
  loginSuccess,
  loginError,
} from './actions';
import {message,} from 'antd';
import {
  callAPILoginPhone
} from 'utils/request';
import {
  selectPhone,
  selectPassword,
  selectIsRemember,
} from './selectors';
import { sha256 } from 'js-sha256';

export function* loginPhone() {
  const phone = yield select(selectPhone());
  const password =(yield select(selectPassword()));
  const response = yield call(callAPILoginPhone,phone,sha256(password));
  const remember = yield select(selectIsRemember());
  try{
    console.log("response.data.data: "+response.data.data.e)
    if (response.data.data.e==0) {
        yield put(loginSuccess(response.data.data.data));
        sessionStorage.setItem('userInfo',(JSON.stringify(response.data.data.data)));
        if(remember){
          localStorage.setItem('userInfo',(JSON.stringify(response.data.data.data)));
        }
        message.info('Xin chào ' + response.data.data.data.name);
        yield put(push("/"));

    } else {
      message.error(response.data.data.msg);
    }
  } catch(error){
          message.error(response.data.data.e);
          message.error('Lỗi đăng nhập !');
  }
  
}

export function* loginPhoneWatcher() {
  while (yield take(LOGIN_PHONE)) {
    yield call(loginPhone);
  }
}

export function* loginData() {
  const watcherloginPhone = yield fork(loginPhoneWatcher);
  if(yield take(LOCATION_CHANGE)){
    yield cancel(watcherloginPhone);

  }
}

export default [
  loginData,
];
